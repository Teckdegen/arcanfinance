# Arcan SDK

The Arcan SDK is the library apps use to encrypt inputs and open handles. Contracts do not see plaintext amounts. The SDK holds that work on the device or on your server.

Package name: `@arcan/sdk`.

## What it does

* Loads the Arcan public key and host addresses for Robinhood.
* Encrypts a number into an `externalEuint64` and an input proof.
* Builds the call data for `confidentialTransfer` and `confidentialBalanceOf`.
* Decrypts a handle for an account on the access list.
* Requests a public decrypt when the contract has allowed it.

## What it does not do

* It does not run the FHE for the token math. Coprocessors do that.
* It does not put the plaintext into the transaction.
* It does not decrypt a handle the access list has not granted.

## Guides

* [Install](install.md)
* [Encrypt an input](encrypt.md)
* [Transfer](transfer.md)
* [Decrypt](decrypt.md)
