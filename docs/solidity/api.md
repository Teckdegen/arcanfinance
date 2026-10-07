# API reference

`FHE` is the Solidity library for encrypted types. Operations return handles. They run symbolically on Robinhood and concretely on the coprocessors.

## Types

`ebool`, `euint8`, `euint16`, `euint32`, `euint64`, `euint128`, `euint256`, `eaddress`.

External inputs: `externalEbool`, `externalEuint8` through `externalEuint256`, `externalEaddress`.

## Casting

* `FHE.asEuint8` … `FHE.asEuint256` lift a plaintext, resize a ciphertext, or accept ciphertext bytes.
* `FHE.asEbool` does the same for booleans.
* `FHE.asEaddress` lifts a public address.
* `FHE.toBytes32` exposes the raw handle for decrypt proofs.

A trivial encryption of a public value does not hide that value.

## Arithmetic

`add`, `sub`, `mul`, `min`, `max`, `neg` on encrypted integers.

`div` and `rem` take a plaintext divisor.

## Bitwise

`and`, `or`, `xor`, `not`, `shl`, `shr`, `rotl`, `rotr`.

## Comparison and branch

`eq`, `ne`, `lt`, `le`, `gt`, `ge` return `ebool`.

`FHE.select(condition, ifTrue, ifFalse)` returns one of the two encrypted values.

## Random

`FHE.randEuint8` through `FHE.randEuint256` during a transaction.

## Inputs and setup

* `FHE.fromExternal(externalValue, inputProof)` returns the internal handle.
* `FHE.setCoprocessor(config)` sets the access list, executor, and verifier. Prefer inheriting `ArcanConfig`.
* `FHE.isInitialized(value)` reports whether the handle was set.

## Access

* `FHE.allow(handle, account)`
* `FHE.allowThis(handle)`
* `FHE.allowTransient(handle, account)`
* `FHE.cleanTransientStorage()`
* `FHE.isAllowed(handle, account)`
* `FHE.isSenderAllowed(handle)`
* `FHE.isAccountDenied(account)`

## Decrypt

* `FHE.makePubliclyDecryptable(handle)`
* `FHE.isPubliclyDecryptable(handle)`
* `FHE.checkSignatures(handles, cleartexts, proof)`
* `FHE.isPublicDecryptionResultValid(...)`
* `FHE.delegateUserDecryption(...)`
* `FHE.revokeUserDecryptionDelegation(...)`
* `FHE.isDelegatedForUserDecryption(...)`
* `FHE.isUserDecryptable(handle, user, contractAddress)`

## Notes

Uninitialized integers act as encrypted zero. Uninitialized booleans act as encrypted false. FHE functions are not `view`.
