# Host chain

Robinhood is the host. It is the ledger users already call. Arcan does not ask it to run fully homomorphic encryption.

## What Robinhood stores

* Contract bytecode and the confidential token state
* Handles in place of amounts
* The access list: who may use or open each handle
* The symbolic trace of each FHE operation

## What a node can answer

A node can return the transaction, the sender, the recipient, and the handle. `confidentialBalanceOf` returns a handle. It does not return the decrypted balance to the RPC.

An explorer can render the token symbol and `****` for the value. That is the honest public view.

## Symbolic execution

The executor contract is the host component that applies FHE calls. It checks permissions, allocates the next handle, and logs the operation. It does not add the hidden integers. If the executor and the coprocessor ever disagree, the ciphertext committed by the coprocessor is recomputed from the trace. The handle on the host must match that recomputation.

## Addresses

`ArcanConfig` is the single list of host addresses: access list, executor, and decryption verifier. Contracts inherit it. The input verifier address is read from the executor.
