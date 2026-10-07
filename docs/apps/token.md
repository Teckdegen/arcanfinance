# Private token standard

ERC-7984 is Arcan's confidential fungible token. It is the ERC-20 shape with every amount encrypted. A balance is an `euint64` handle. A transfer moves that handle. From and to stay public. The value on the explorer is `****`.

Robinhood stores the handles and records the call. It does not run the FHE. Coprocessors add and subtract the ciphertext. The access list decides who may open a handle.

A private DEX, AMM, NFT sale, loan, or payroll is this standard with another contract around it. The list is in [What you can build](build.md).

## What is public

| Public | Sealed |
| --- | --- |
| Token name, symbol, decimals, contract URI | Balances |
| Sender and recipient addresses | Transfer amounts |
| The fact that a transfer happened | Total supply, unless you choose to disclose it |
| Operator addresses and the expiry time | The amount an operator actually moved |

The chain still has an audit trail. The trail is addresses, timestamps, and handles. It is not the numbers.

## Amounts are 64 bits

Every confidential amount is an `euint64`. The supply cannot exceed `type(uint64).max` (18,446,744,073,709,551,615). Pick decimals that leave room under that cap. Six decimals is the usual choice. A token with 18 decimals runs out of range at a much smaller whole-unit supply.

`decimals()` returns that scale. It is a public `uint8`, not a handle.

## Metadata

| Call | Returns |
| --- | --- |
| `name()` | Token name |
| `symbol()` | Token symbol |
| `decimals()` | Decimal places, usually 6 |
| `contractURI()` | A URI for contract-level metadata |
| `supportsInterface(interfaceId)` | ERC-165 check that this contract is ERC-7984 |

`contractURI` follows the contract-metadata URI pattern. It describes the token. It does not reveal balances.

## Reading a balance

```solidity
function confidentialBalanceOf(address account) external view returns (euint64);
function confidentialTotalSupply() external view returns (euint64);
```

Both return handles. The RPC does not return the number. The holder decrypts `confidentialBalanceOf` through the [SDK](../sdk/decrypt.md) when the access list includes them.

An account that is not allowed still receives the handle. Opening it fails.

## Transfers

A transfer takes the amount in one of two forms.

A fresh ciphertext from the user, plus an input proof:

```solidity
function confidentialTransfer(
    address to,
    externalEuint64 encryptedAmount,
    bytes calldata inputProof
) external returns (euint64 transferred);
```

Or a handle the caller is already allowed to use:

```solidity
function confidentialTransfer(address to, euint64 amount) external returns (euint64 transferred);
```

The second form reverts with `ERC7984UnauthorizedUseOfEncryptedAmount` when the caller has no access to that handle. Use the input-proof form for a new user amount.

`confidentialTransferFrom` is the same pair, with a `from` address. The caller must be `from`, or an operator for `from`. Otherwise it reverts with `ERC7984UnauthorizedSpender`.

```solidity
function confidentialTransferFrom(
    address from,
    address to,
    externalEuint64 encryptedAmount,
    bytes calldata inputProof
) external returns (euint64 transferred);
```

### How much actually moves

`_update` moves **up to** the requested amount. If the encrypted balance is smaller than the request, the transferred handle is the smaller figure, not a revert that would tell the chain the balance was short. Mint and burn are the same function with the zero address on one side.

The returned `euint64` is the amount that moved. It can differ from the amount that was requested. That difference stays encrypted.

The zero address is rejected as a sender or receiver on a normal transfer: `ERC7984InvalidSender`, `ERC7984InvalidReceiver`. Mint uses a zero `from`. Burn uses a zero `to`. Those are internal.

Each successful update emits `ConfidentialTransfer(from, to, amount)` where `amount` is the transferred handle, not a public integer.

## Operators

An operator may call `confidentialTransferFrom` for a holder until a timestamp. This is the sealed stand-in for `approve` and `transferFrom`. The approval is the right to move tokens, not a public allowance number. There is no `uint256` allowance to read.

```solidity
function setOperator(address operator, uint48 until) external;
function isOperator(address holder, address spender) external view returns (bool);
```

`until` is a unix time. When it passes, `isOperator` is false. Keep the window short. A DEX or a payroll contract should get its own operator, not a shared wallet.

Setting an operator emits `OperatorSet(holder, operator, until)`.

An operator that initiates a transfer is allowed to decrypt the amount of that transfer. Do not treat an operator as blind. If the contract must not see the size, use [transfer and call](#transfer-and-call) instead of a standing operator.

## Transfer and call

Use this when the recipient is a contract that must react in the same transaction: a vault, a pool, a splitter. The token moves and the recipient is notified together. You do not grant a standing operator so the contract can pull funds later.

```solidity
function confidentialTransferAndCall(
    address to,
    externalEuint64 encryptedAmount,
    bytes calldata inputProof,
    bytes calldata data
) external returns (euint64 transferred);
```

There is a handle form, and `confidentialTransferFromAndCall` for an operator. `data` is forwarded as-is. The token does not interpret it. The receiver defines the layout.

The recipient implements:

```solidity
function onConfidentialTransferReceived(
    address operator,
    address from,
    euint64 amount,
    bytes calldata data
) external returns (ebool);
```

`amount` here is the amount that was actually sent, which may be less than requested.

If the hook returns an encrypted true, nothing is refunded. If it returns an encrypted false, the token tries to move that amount back. The refund is best-effort. A receiver that spends or burns the tokens inside the hook, then returns false, can leave the refund at zero. The sender does not get the tokens back. Hooks that reject a transfer must not spend it first.

The value returned to the caller is `sent - refund`, and the caller only has transient access to that handle. It is meant to be used in the same transaction.

## Mint and burn

The base keeps mint and burn internal. Your token exposes the policy.

`_mint(to, amount)` is an update from the zero address. `_burn(from, amount)` is an update to the zero address. Both return the encrypted amount that was actually minted or burned.

Three ways to issue supply:

* No supply at construction. The owner mints later. Simplest.
* Public genesis. Amounts are clear in the constructor and lifted with `FHE.asEuint64`. Recipients and sizes are visible at deployment. Later transfers stay sealed.
* Sealed genesis. The first amounts arrive as external ciphertexts and input proofs, so the allocation is never a public integer.

A clear mint is visible in the transaction input. Use it only when that amount is supposed to be public.

```solidity
function confidentialMint(
    address to,
    externalEuint64 encryptedAmount,
    bytes calldata inputProof
) external onlyOwner returns (euint64) {
    return _mint(to, FHE.fromExternal(encryptedAmount, inputProof));
}

function burn(
    externalEuint64 encryptedAmount,
    bytes calldata inputProof
) external returns (euint64) {
    return _burn(msg.sender, FHE.fromExternal(encryptedAmount, inputProof));
}
```

Burning someone else's balance is a privileged action. Prefer a burn the holder signs themselves.

## Disclosure

Disclosure is how a sealed amount becomes a public integer. Balances should not use it. A settlement figure, a winning bid, or an unwrap amount can.

`requestDiscloseEncryptedAmount` marks a handle publicly decryptable and emits `AmountDiscloseRequested`. Both the caller and the token contract must already have access to that handle.

`discloseEncryptedAmount` submits the clear `uint64` and a decryption proof. The contract checks the proof against the handle and emits `AmountDisclosed`. A disclose does not have to follow a request, but the proof still has to match the ciphertext.

Until one of these runs, the chain does not learn the number.

## Access list

Every new handle needs permission or the next call cannot reuse it. `FHE.fromExternal` checks the input proof and binds the ciphertext to this token and this user. Generate the proof against the token address you will call. A proof made for another contract fails.

After a balance update, the token allows itself and the holder. Missing `allow` calls are the usual reason a later decrypt or transfer reverts. The rules are in [Access list](../solidity/acl.md).

## A native token

A native confidential token is this standard with its own supply. It does not wrap a public ERC-20. Inherit the ERC-7984 base and `ArcanConfig`, so the contract points at the Arcan access list and executor on Robinhood.

```solidity
import { FHE, euint64, externalEuint64 } from "@arcan/solidity/lib/FHE.sol";
import { ArcanConfig } from "@arcan/solidity/config/ArcanConfig.sol";

contract PrivateToken is ArcanConfig, ERC7984, Ownable2Step {
    constructor(address owner, string memory name_, string memory symbol_, string memory uri)
        ERC7984(name_, symbol_, uri)
        Ownable(owner)
    {}
}
```

Without `ArcanConfig`, encrypted operations have no executor to record them against.

If the owner should be able to read total supply, allow them on the new supply handle inside `_update`. That is privileged access. Document who holds it. If ownership moves, the allow must follow the new owner.

An immutable token cannot change its rules later. An upgradeable token can, which means the upgrade key is the most sensitive role on the contract. If you upgrade, use a UUPS proxy, two-step ownership, and initialize `ArcanConfig` from `initialize` rather than the constructor. Prefer a multisig over a single key.

## Wrapper

A wrapper is an ERC-7984 token backed by a public ERC-20 sitting in the contract. Wrapping credits a sealed balance. Unwrapping burns it and sends the public token out, which reveals that outgoing amount.

The confidential unit is coarser than a typical 18-decimal ERC-20. The wrapper converts at a fixed rate and rounds the deposit down to a multiple of that rate. Excess public tokens are refunded. Decimals on the confidential side stay at most 6.

If the public token supports `transferAndCall`, a single transfer into the wrapper can wrap. Otherwise the user approves the wrapper and then wraps.

Unwrapping is two steps. `unwrap` burns the sealed amount and records the request. `finalizeUnwrap` sends the public tokens after the amount has been disclosed. The public transfer is the moment the number becomes visible.

Details and the Arcan calls are in [Wrappers](wrappers.md).

## Extensions

These are optional modules on the same standard. Each one still stores amounts as `euint64`.

| Extension | What it adds |
| --- | --- |
| Freezable | A freezer can freeze part of a balance. A transfer only moves the unfrozen part. If that part is too small, zero moves. |
| Observer | A holder names an account that may see their balance and transfer amounts. |
| Restricted | Accounts can be blocked from sending or receiving. |
| Omnibus | Transfer events can carry encrypted sub-account addresses under one public holder. |
| Real-world asset | Compliance checks and enforcement around a sealed position. |
| Votes | Encrypted voting weight and delegation. |
| Hooked | Modules that run before and after a transfer. |

Hook modules are trusted. They can see handles the token can see, and an allowance they grant remains after the module is removed. A balance-cap module can enforce an encrypted maximum per account. A holder-cap module can enforce a maximum number of holders, and it has to be installed before the first mint.

## Events

| Event | When |
| --- | --- |
| `ConfidentialTransfer(from, to, amount)` | A mint, burn, or transfer. `amount` is the handle that moved. |
| `OperatorSet(holder, operator, until)` | An operator expiry changes. |
| `AmountDiscloseRequested(encryptedAmount, requester)` | Someone asked to open a handle. |
| `AmountDisclosed(encryptedAmount, amount)` | A clear amount was accepted for that handle. |

## Errors

| Error | Meaning |
| --- | --- |
| `ERC7984InvalidReceiver` | Transfer to the zero address |
| `ERC7984InvalidSender` | Transfer from the zero address |
| `ERC7984UnauthorizedSpender` | Caller is not an operator for that holder |
| `ERC7984UnauthorizedUseOfEncryptedAmount` | Caller may not use that handle. Pass an input proof instead. |
| `ERC7984UnauthorizedCaller` | Caller is not allowed to perform this action |

A wrapper can also revert with `ERC7984TotalSupplyOverflow` when the sealed supply would not fit in an `euint64`.

## From the SDK

`@arcan/sdk` wraps the standard so an app can pass a number and let the SDK encrypt it.

```ts
const token = arcan.createToken(tokenAddress);

const clear = await token.balanceOf(owner);
const handle = await token.confidentialBalanceOf(owner);

await token.confidentialTransfer(recipient, 500n);
await token.setOperator(operator, until);
const allowed = await token.isOperator(holder, operator);
await token.confidentialTransferFrom(holder, recipient, 500n);
```

`balanceOf` decrypts for the connected account. The first call asks the wallet to sign a decrypt permit. Later calls reuse it. `confidentialBalanceOf` returns the handle and does not decrypt.

`confidentialTransfer` encrypts, then sends the transaction. It checks the decrypted balance first. Skip that check with `{ skipBalanceCheck: true }` when the wallet cannot sign the permit. If the check runs and the balance is low, the SDK throws before the transaction. The chain itself still uses the up-to-amount rule above. The SDK check is there so the app can fail with a clear error instead of moving a smaller hidden amount.

`setOperator` without a timestamp approves for one hour.

`confidentialTransferAndCall(to, amount, data)` delivers and notifies in one transaction. `data` must already be encoded for the receiver. If the recipient is a contract with no receiver hook, the transaction reverts.

`name`, `symbol`, and `decimals` are public reads. `isConfidential` reports the ERC-7984 interface. `isWrapper` reports a wrapper.

Batch helpers decrypt many token balances for one owner in one permit.

Lower-level encrypt and decrypt, without the token helper, are in [Encrypt an input](../sdk/encrypt.md) and [Decrypt](../sdk/decrypt.md).
