# FHE library

The on-chain library is the Solidity `FHE` API. It is the only way a contract should touch ciphertext. Calling it does not decrypt.

## Operations the coprocessor must honor

Arithmetic on encrypted integers, comparisons that return an encrypted boolean, `select`, bitwise shifts and rotates, and encrypted randomness. The full list is the [API reference](../solidity/api.md).

Division and remainder are defined only with a plaintext divisor. A Solidity `if` on an encrypted boolean is not an operation. `select` is.

## What the library writes

Each call emits a symbolic step:

* the opcode, such as add or select
* the input handles
* the output handle
* the contract that asked

Robinhood stores that step with the transaction. The coprocessor reads the step, loads the ciphertexts, and writes the output ciphertext under the new handle.

## Access beside the math

`allow`, `allowThis`, and `allowTransient` are part of the same library so a contract cannot produce a handle and forget who may use it. The access list is a host contract. The library is the interface.
