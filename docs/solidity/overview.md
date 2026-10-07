# Solidity guides

These guides are for confidential contracts on Arcan. You write Solidity. The FHE library supplies encrypted types and the operations on them.

Robinhood executes the contract in symbolic mode. Each FHE call updates a handle and records the operation. Coprocessors run the encrypted math.

## Read in this order

1. [What is FHEVM](fhevm.md)
2. [Encrypted types](types.md)
3. [Operations](operations.md)
4. [Inputs](inputs.md)
5. [Access list](acl.md)
6. [Decryption](decryption.md)
7. [Configuration](configure.md)
8. [API reference](api.md)

Local setup is in the [development guides](../development/overview.md). The web app is in the [SDK](../sdk/overview.md).
