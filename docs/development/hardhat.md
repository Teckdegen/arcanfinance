# Hardhat

Use Hardhat when the contract tests and the app share one repository. The Arcan Hardhat plugin starts a local host and a local coprocessor, deploys the access list and the executor, and gives the SDK a way to encrypt fixtures.

## Project layout

```text
contracts/      Solidity, inheriting ArcanConfig
test/           Hardhat tests
sdk usage       @arcan/sdk encrypts the inputs in the tests
```

Install `@arcan/solidity` and `@arcan/sdk`. Point Hardhat at the Arcan plugin so `ArcanConfig` resolves to the local host contracts during tests.

## A test flow

1. Deploy the contract. The plugin has already deployed the host.
2. Create an SDK instance against the local node.
3. Encrypt the amount with the test account.
4. Send `confidentialTransfer` with the ciphertext and the input proof.
5. Read `confidentialBalanceOf`. Assert that the return value is a handle, not the amount.
6. User-decrypt as the recipient and assert the plaintext. Decrypt as a third account and assert that it fails.

## Deploying

A deploy script should inherit addresses from `ArcanConfig` for Robinhood. Do not hard-code another chain's executor into the artifact.

The script sends the contract creation transaction to the Robinhood RPC you configure. The FHE library inside the contract still records operations for the coprocessors. Deployment does not turn Robinhood into an FHE computer.

## Debugging

If `fromExternal` reverts, the input proof does not match the user, the contract, or the ciphertext. Rebuild the input with the SDK against the same contract address.

If a later `FHE.add` reverts on permissions, the new handle was not passed to `allowThis` or `allow`.
