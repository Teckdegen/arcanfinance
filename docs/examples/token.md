# Confidential transfer

This example is a minimal ERC-7984 style token. It seals balances and transfers. It does not publish the amount.

```solidity
import { FHE, euint64, externalEuint64 } from "@arcan/solidity/lib/FHE.sol";
import { ArcanConfig } from "@arcan/solidity/config/ArcanConfig.sol";

contract ConfidentialToken is ArcanConfig {
    mapping(address => euint64) internal balances;

    function confidentialTransfer(
        address to,
        externalEuint64 encryptedAmount,
        bytes calldata inputProof
    ) external {
        euint64 amount = FHE.fromExternal(encryptedAmount, inputProof);
        euint64 senderNext = FHE.sub(balances[msg.sender], amount);
        euint64 recipientNext = FHE.add(balances[to], amount);

        ebool ok = FHE.le(amount, balances[msg.sender]);
        balances[msg.sender] = FHE.select(ok, senderNext, balances[msg.sender]);
        balances[to] = FHE.select(ok, recipientNext, balances[to]);

        FHE.allowThis(balances[msg.sender]);
        FHE.allowThis(balances[to]);
        FHE.allow(balances[msg.sender], msg.sender);
        FHE.allow(balances[to], to);
    }

    function confidentialBalanceOf(address account) external view returns (euint64) {
        return balances[account];
    }
}
```

`FHE.le` and `FHE.select` keep a failed transfer from moving value and from revealing why. The sender's balance and the amount stay ciphertext either way.

## App call

```ts
const input = arcan.createEncryptedInput(tokenAddress, signer.address);
input.add64(amount);
const { handles, inputProof } = await input.encrypt();
await token.confidentialTransfer(recipient, handles[0], inputProof);
```

The recipient decrypts with [user decrypt](../sdk/decrypt.md). Anyone else reading the chain sees the handle and, in a wallet, `****`.

More on the standard is in [Confidential token standard](../apps/token.md). The SDK walkthrough is [Transfer](../sdk/transfer.md).
