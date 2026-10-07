# Arcan

Arcan is the build guide for confidential apps on Robinhood. Contracts are written in Solidity. Amounts stay encrypted. The chain stores a handle. Coprocessors run the fully homomorphic encryption.

If you have written an ERC-20, the calls are the same shape. The amount is not a public number.

## Where to go next

* New to the system: read the [Litepaper](litepaper.md).
* Write a first contract: follow the [Quick start](start/quick-start.md).
* Learn the Solidity surface: start with [What is FHEVM](solidity/fhevm.md).
* See what to ship: [What you can build](apps/build.md).
* Build the web app: use the [Arcan SDK](sdk/overview.md).
* See how a transfer moves: read [FHE on the host chain](protocol/overview.md).
* Stuck on a call: [Support](help.md).

## What runs where

| Piece | Role |
| --- | --- |
| Your contract | Decides the transfer, the check, and who may open a handle |
| Robinhood | Records the call and stores the new handle. It does not run FHE |
| Coprocessors | Add, subtract, and compare the ciphertext |
| Access list | Names the accounts allowed to decrypt |

A normal `if` on a plaintext amount would leak the number. Branch with `FHE.select`.
