# Coprocessors

Coprocessors are the machines that run FHE for Arcan. They are not Robinhood validators, and Robinhood does not execute this work.

## What a coprocessor does

* Reads the symbolic trace from the host
* Loads the input ciphertexts
* Runs add, sub, mul, compare, select, and the rest of the library
* Writes the output ciphertext under the handle the host already stored
* Serves a decrypt only when the access list allows that account

Anyone can recompute a step. Given the same inputs and the same opcode, the output handle is fixed. The coprocessor is there because the arithmetic is too heavy for the host, not because the result is a private opinion.

## What it stores

Each coprocessor keeps a local database of ciphertexts keyed by handle, plus the public inputs needed to recompute. A public data mirror can hold the same ciphertexts so a new coprocessor can catch up without asking one operator for a favor.

## What it refuses

* An operation whose caller is not allowed to use the input handles
* A user decrypt for an account that is absent from the access list
* A public decrypt for a handle the contract did not mark as public

The plaintext of a user balance is not written to the host as part of computation.
