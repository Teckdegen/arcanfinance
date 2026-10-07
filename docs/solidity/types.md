# Encrypted types

Encrypted types are the private counterparts of Solidity values. A confidential token balance is an `euint64`. A hidden flag is an `ebool`. A hidden recipient can be an `eaddress`.

## In the contract

| Type | Meaning |
| --- | --- |
| `ebool` | Encrypted boolean |
| `euint8` … `euint256` | Encrypted unsigned integers |
| `eaddress` | Encrypted address |
| `ebytes` | Encrypted byte array, where the operation supports it |

## From the user

Inputs that were encrypted off-chain use the external form:

| Type | Meaning |
| --- | --- |
| `externalEbool` | Encrypted boolean input |
| `externalEuint8` … `externalEuint256` | Encrypted integer inputs |
| `externalEaddress` | Encrypted address input |

An external value is not usable in `FHE.add` until `FHE.fromExternal` checks the input proof and returns the internal type.

## Lifting a public value

Sometimes a public number has to enter an encrypted expression. `FHE.asEuint64` and `FHE.asEbool` lift it. This is a trivial encryption. The original number is still visible, because it was public. Use it for constants and plaintext arguments, not for hiding a user amount.

```solidity
euint64 unit = FHE.asEuint64(1);
ebool yes = FHE.asEbool(true);
```

## Casting

`FHE.asEuint32` can widen or narrow another encrypted integer. Narrowing drops the high bits inside the ciphertext. Widening pads with encrypted zeros. The width change does not reveal the value.

## Initialization

`FHE.isInitialized` reports whether a handle has been set. An uninitialized integer behaves as an encryption of zero in arithmetic. Initialize balances explicitly before you depend on them.

## Token balances

Use `euint64` for confidential token amounts. That matches the ERC-7984 shape: the call looks like an ERC-20 call, and the amount is a 64-bit ciphertext handle.
