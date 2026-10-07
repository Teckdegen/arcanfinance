# Configuration

A contract that calls `FHE` must point at the Arcan host contracts. Inherit `ArcanConfig`. The constructor calls `FHE.setCoprocessor` with the access-list contract, the executor, and the verifier for Robinhood.

```solidity
import { ArcanConfig } from "@arcan/solidity/config/ArcanConfig.sol";

contract Payroll is ArcanConfig {
    // FHE calls are available
}
```

You do not pass those addresses in every function. The config contract resolves them for the Arcan host.

## What the config contains

| Contract | Role |
| --- | --- |
| Access list | Stores `allow`, deny, and decrypt rights |
| Executor | Records symbolic FHE operations and handle updates |
| Verifier | Checks decryption proofs when a cleartext is submitted |

The input verifier is read from the executor at call time. It is the contract that `FHE.fromExternal` uses to check an input proof.

## One host

Arcan configuration targets Robinhood. Do not point a contract at another chain's executor and expect the same ciphertexts to resolve. Handles are meaningful on the host that recorded them. Cross-host movement is a bridge of ciphertext, described in the [gateway](../protocol/gateway.md), not a shared address list.

## Override

`FHE.setCoprocessor` exists for tests and for a contract that must retarget. Production contracts should inherit `ArcanConfig` and leave the addresses in one place.
