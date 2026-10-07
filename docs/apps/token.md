# Confidential token

The confidential token follows ERC-7984. It is an ERC-20 with the amounts encrypted.

| ERC-20 | Arcan |
| --- | --- |
| `balanceOf` | `confidentialBalanceOf` returns an `euint64` handle |
| `transfer` | `confidentialTransfer` takes an encrypted amount and an input proof |
| public `uint256` balance | `euint64` handle |

The wallet prints `****` for a balance it cannot open.

## State

```solidity
mapping(address => euint64) private balances;
```

The mapping key is the public address. The value is the handle.

## Transfer

`confidentialTransfer(to, encryptedAmount, inputProof)`:

1. `FHE.fromExternal` checks the input.
2. `FHE.sub` on the sender and `FHE.add` on the recipient.
3. `FHE.allowThis` for the contract and `FHE.allow` for each party.

Use `FHE.select` when a comparison should refuse the transfer without revealing the balance or the amount. Both the success path and the unchanged path stay encrypted.

## Read

`confidentialBalanceOf(account)` returns the handle. The caller still needs a decrypt right to see the number. The SDK [user decrypt](../sdk/decrypt.md) is that step.

## Supply

If total supply is public, store it as a `uint256` and only seal the individual balances. If total supply is sealed, store an `euint64` and grant the contract access. Do not mix those two without an explicit lift through `FHE.asEuint64`, and remember that a lift of a public supply does not hide it.
