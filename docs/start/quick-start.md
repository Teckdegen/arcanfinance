# Quick start

This walkthrough turns a public counter into a sealed one. The count is an `euint32`. The chain stores a handle. The coprocessor adds the encrypted step.

## 1. Start from a public counter

```solidity
contract Counter {
    uint32 public count;

    function increment(uint32 value) external {
        count += value;
    }
}
```

Anyone can read `count`. That is the leak.

## 2. Use the Arcan library

```solidity
import { FHE, euint32, externalEuint32 } from "@arcan/solidity/lib/FHE.sol";
import { ArcanConfig } from "@arcan/solidity/config/ArcanConfig.sol";

contract SealedCounter is ArcanConfig {
    euint32 private count;

    function increment(externalEuint32 encryptedValue, bytes calldata inputProof) external {
        euint32 value = FHE.fromExternal(encryptedValue, inputProof);
        count = FHE.add(count, value);
        FHE.allowThis(count);
        FHE.allow(count, msg.sender);
    }

    function getCount() external view returns (euint32) {
        return count;
    }
}
```

`ArcanConfig` wires the contract to the Arcan host contracts on Robinhood: the access list and the executor that records FHE operations.

## 3. What changed

* `count` is no longer a public `uint32`.
* The user encrypts `value` in the app and sends the ciphertext with an input proof.
* `FHE.fromExternal` checks the proof and returns a handle.
* `FHE.add` records an addition. Robinhood does not add the plaintext. The coprocessor does.
* `FHE.allowThis` lets this contract keep using the new handle.
* `FHE.allow` lets the caller decrypt their own resulting count.

## 4. Call it from the app

The [Arcan SDK](../sdk/encrypt.md) encrypts the step on the device and submits `increment`. A later [user decrypt](../sdk/decrypt.md) opens the handle only if the access list includes that account.

`getCount` returns a handle. It is not a `view` that reveals the number.
