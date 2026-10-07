# Development

Write and test confidential contracts before you point them at Robinhood.

The local stack deploys the same host contracts your app will call: the access list, the executor, and the input verifier. The local coprocessor evaluates the FHE so tests can encrypt, transfer, and decrypt.

## Guides

* [Hardhat](hardhat.md) for a JavaScript test suite and the Arcan SDK in the same repo.
* [Foundry](foundry.md) for Solidity tests.

Both use `@arcan/solidity` for the library and `ArcanConfig` for addresses. In tests, the config points at the local host contracts, not at a public network.

## What a test should prove

* An input with a bad proof is rejected.
* A transfer changes the sender and recipient handles.
* The plaintext amount never appears in the transaction receipt.
* An account on the access list can decrypt.
* An account that was not granted the handle cannot.
* A `FHE.select` branch does not reveal which side was taken.

## Keys in tests

Generate a throwaway key for the local node. Do not reuse a key that has ever held value. Do not commit a shared test mnemonic into the repository.
