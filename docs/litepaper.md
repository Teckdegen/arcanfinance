# Litepaper

Arcan lets a public chain hold confidential assets. The asset still moves. The amount stays ciphertext from the user to the contract and back.

The encryption is fully homomorphic. A contract can add, subtract, multiply, and compare without decrypting. The result is a new ciphertext. Anyone can recompute that result from the recorded operation and get the same handle.

## Why the chain does not run the math

FHE is heavy. Robinhood does not execute it. The contract runs in symbolic mode: it checks the call, updates handles, and records the operation. A coprocessor network performs the encrypted arithmetic and commits the result. The host chain keeps the handle, not the number.

## What a developer writes

A confidential contract is ordinary Solidity plus the Arcan FHE library.

* A balance is an `euint64`, not a `uint256`.
* An input from a user arrives as an `externalEuint64` plus an input proof. `FHE.fromExternal` turns that into a handle the contract can use.
* Transfers use `FHE.add` and `FHE.sub`.
* Conditions use `FHE.select`, which returns one sealed value or the other.
* `FHE.allow` writes the access list: holder, auditor, contract, or anyone else who may later open that handle.

## What a user sees

Addresses are public. The from and to of a transfer are public. The value is `****` unless the account is on the access list for that handle.

A read such as `confidentialBalanceOf` returns the handle. It does not return the amount to the chain, to an indexer, or to a stranger.

## Composition

One public encryption key is used across contracts. A sealed output from one contract can be an input to another, as long as the access list grants the next contract the handle. That is how a token, a payroll contract, and a wrapper can sit on the same ciphertext.

## What this system is for

* Confidential tokens that mirror ERC-20 calls with sealed amounts.
* Payroll that pays without publishing the salary.
* Trades where the position size stays off the public book.
* Distributions that split a pool without listing each share in the clear.

The protocol does not put the plaintext on Robinhood in order to compute it. Opening a value is a separate step, and only for a name on the list.
