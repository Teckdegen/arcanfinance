# Foundry

Use Foundry when you want Solidity tests and `forge` scripts. The Arcan Foundry library deploys the host contracts in the test: access list, executor, input verifier, and the decryption verifier. It also exposes encrypt and decrypt helpers so a test can act as a user.

## Base test

Inherit the Arcan test base. In `setUp`, call the base setup so the host contracts exist and `ArcanConfig` points at them.

```solidity
import { ArcanTest } from "@arcan/foundry/ArcanTest.sol";

contract TokenTest is ArcanTest {
    function setUp() public override {
        super.setUp();
    }
}
```

## Helpers

* Encrypt a plaintext as a given account and receive the external ciphertext plus the input proof.
* Call the contract under test.
* `decrypt` for an allowed user.
* `publicDecrypt` only after the contract has marked the handle publicly decryptable.

The helpers use the test coprocessor. They are not a shortcut that skips the access list. A decrypt for an account that was never granted the handle fails in the test the same way it fails in production.

## Scripts

A Forge script can deploy to a local Anvil node with the same host contracts. For Robinhood, the script uses the Arcan config for that host and an RPC URL you supply. Keep the deployer key out of the repository.

## What to assert

Compare decrypted plaintexts in the test, not handles, when you care about the amount. Compare handles when you care that storage changed. Never assert that a transaction log contains the user amount. It should not.
