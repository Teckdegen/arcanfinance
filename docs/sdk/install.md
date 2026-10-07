# Install

The app package is `@arcan/sdk`. The contract package is `@arcan/solidity`.

```bash
npm install @arcan/sdk
```

In a contract project:

```bash
npm install @arcan/solidity
```

Foundry can depend on the same Solidity library through your usual Git or npm remapping. Map `@arcan/solidity/` at the installed package.

## Create an instance

```ts
import { createArcan } from "@arcan/sdk";

const arcan = await createArcan({
  chain: "robinhood",
  rpcUrl: process.env.ROBINHOOD_RPC_URL,
});
```

`createArcan` fetches the public key and the host contract addresses. Encrypt and decrypt on this instance so the ciphertext matches the contracts you will call.

For tests, pass the local RPC and the addresses the Hardhat or Foundry plugin printed. Do not reuse a Robinhood instance against a local executor.
