# What is FHEVM

FHEVM is the Solidity environment for Arcan. It is how a contract computes on ciphertext.

The library exposes encrypted types (`ebool`, `euint64`, `eaddress`, and the rest) and functions on them (`FHE.add`, `FHE.select`, `FHE.allow`). The contract stays normal Solidity. The privacy is in the types.

## Handles

An encrypted value in storage is a handle. The handle is a `bytes32` reference to a ciphertext that lives with the coprocessors. The host chain stores the handle. It does not store the plaintext amount.

A new operation returns a new handle. The previous ciphertext is not overwritten in the clear. The coprocessor computes the new ciphertext and the chain points at it.

## Symbolic execution

When a transaction calls `FHE.add`, Robinhood:

* checks that the contract may use those handles
* writes the new handle into contract storage
* records the operation for the coprocessors

The numeric result is not known to the block, the explorer, or the node. The explorer can show the call, the from, and the to. The value stays sealed.

## What you cannot do

* You cannot use an encrypted value as the condition of a Solidity `if` or `require`. That would force the chain to learn the bit. Use `FHE.select`.
* You cannot mark a function `view` if it performs an FHE operation. The operation changes the handle state.
* You cannot divide two ciphertexts. `FHE.div` and `FHE.rem` take a plaintext divisor.
* You cannot treat an `externalEuint64` as an `euint64`. Convert it with `FHE.fromExternal` and the input proof.

## Where the pieces sit

| Name | What it is |
| --- | --- |
| `FHE` | The Solidity library |
| Host contracts | Access list and executor on Robinhood |
| Coprocessors | Machines that run the FHE |
| SDK | Browser and server code that encrypts inputs and opens allowed handles |
