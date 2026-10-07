# Opening a handle

Computation never needs the plaintext. Opening does. Arcan keeps those steps apart.

## Who can ask

The access list is the authority. A user decrypt succeeds only when that user and the contract both have persistent permission on the handle. A public decrypt succeeds only when the contract called `FHE.makePubliclyDecryptable`.

A denied account cannot open a handle even if an older grant exists.

## What the key service returns

The service decrypts the ciphertext for that request and returns the clear value to the requester. For a user decrypt, the requester is the allowed account, through the SDK. For a public decrypt, the cleartext may also be submitted on-chain with a proof. The contract checks the proof with `FHE.checkSignatures` before it trusts the number.

The service does not choose the business rule. The contract already did, inside `add`, `sub`, and `select`.

## What never happens

* The host does not decrypt in order to execute the transfer.
* A node does not learn a balance because it stored the handle.
* An account off the list does not receive the cleartext because it can see the ciphertext bytes.

Delegation lets a contract lend its decrypt right to another account until an expiry. Revocation removes it. See the [access list](../solidity/acl.md) for the calls.
