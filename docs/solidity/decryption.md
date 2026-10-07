# Decryption

Decryption is separate from the transfer. The coprocessor can add two ciphertexts without anyone learning the sum. Opening the sum is a later request, and only if the access list allows it.

There are two ways to open a handle.

## User decrypt

The account named on the handle asks the Arcan SDK to decrypt. The SDK sends the handle, the user, and the contract. The result comes back to that user. An explorer, a node, or another wallet does not receive it.

Use this for balances, salaries, and position size.

## Public decrypt

The contract first calls `FHE.makePubliclyDecryptable`. Anyone can then request the plaintext through the SDK. The cleartext can be submitted back on-chain with a decryption proof. `FHE.checkSignatures` checks that the proof matches the handle. The order of handles in the list must match the order used off-chain.

Use this for a value that is supposed to become public. Do not use it for a confidential balance.

`FHE.isPubliclyDecryptable` reads the flag. `FHE.isPublicDecryptionResultValid` is the read-only check. Prefer `checkSignatures` when the contract accepts the cleartext, and guard the call so the same proof cannot be applied twice.

## What the chain learns

A user decrypt does not write the number into Robinhood. A public decrypt writes the cleartext only if your contract submits it. Until then, the chain still holds a handle.

## Rights

`FHE.isUserDecryptable` is true only when both the user and the contract have persistent access to the handle. A transient grant is not enough to open the value after the transaction.

See [Opening a handle](../protocol/keys.md) for the service that performs the opening, and the [SDK decrypt guide](../sdk/decrypt.md) for the app code.
