# Inputs

A user amount is encrypted before the transaction is signed. The contract receives two arguments:

* the external ciphertext, such as `externalEuint64`
* the input proof, `bytes`

The proof binds the ciphertext to the user, the contract, and the call. `FHE.fromExternal` checks it and returns an `euint64` handle. Reject the call if the proof does not match.

```solidity
function confidentialTransfer(
    address to,
    externalEuint64 encryptedAmount,
    bytes calldata inputProof
) external {
    euint64 amount = FHE.fromExternal(encryptedAmount, inputProof);
}
```

## Who encrypts

The [Arcan SDK](../sdk/encrypt.md) encrypts in the app with the Arcan public key. The contract never receives the plaintext amount.

Do not build the ciphertext by hand. A ciphertext without a valid input proof will not pass `fromExternal`.

## Public values

If the amount is already public, do not pretend it is a user secret. Lift it with `FHE.asEuint64`. Everyone can see a value that was plaintext in the transaction.

## Checks that stay sealed

After `fromExternal`, compare and select inside FHE. A Solidity `require(amount > 0)` cannot be written on the handle. Compare against an encrypted or trivial zero and `FHE.select` the failure path, or keep the business rule in a form that does not need the plaintext.

A transfer that must move the full sealed amount does not need to reveal it. Subtract the handle from the sender and add the same handle to the receiver.
