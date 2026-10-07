# Encrypted counter

A counter is the smallest confidential contract. It shows an input, an add, and an allow, without token accounting.

```solidity
import { FHE, euint32, externalEuint32 } from "@arcan/solidity/lib/FHE.sol";
import { ArcanConfig } from "@arcan/solidity/config/ArcanConfig.sol";

contract SealedCounter is ArcanConfig {
    euint32 private count;

    function increment(externalEuint32 step, bytes calldata inputProof) external {
        euint32 value = FHE.fromExternal(step, inputProof);
        count = FHE.add(count, value);
        FHE.allowThis(count);
        FHE.allow(count, msg.sender);
    }

    function getCount() external view returns (euint32) {
        return count;
    }
}
```

## App

```ts
const input = arcan.createEncryptedInput(counterAddress, user);
input.add32(1n);
const { handles, inputProof } = await input.encrypt();
await counter.increment(handles[0], inputProof);

const handle = await counter.getCount();
const clear = await arcan.userDecrypt(handle, counterAddress, user);
```

`getCount` is a handle. `clear` is the number, and only for `user`.

The step-by-step build is the [quick start](../start/quick-start.md).
