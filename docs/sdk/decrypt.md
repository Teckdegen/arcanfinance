# Decrypt

The SDK opens a handle for an account that the access list allows. The plaintext stays in the app. It is not written back to Robinhood unless the contract submits a public decrypt on purpose.

## User decrypt

```ts
const balanceHandle = await token.confidentialBalanceOf(userAddress);
const clear = await arcan.userDecrypt(balanceHandle, tokenAddress, userAddress);
```

`clear` is the amount. Show it in the wallet that owns `userAddress`. A different account gets a rejected decrypt, even if it can read the handle from chain state.

The user and the contract both need persistent access. `FHE.allow` on the user and `FHE.allowThis` on the contract are the usual pair.

## Public decrypt

Only for handles the contract has marked with `FHE.makePubliclyDecryptable`.

```ts
const clear = await arcan.publicDecrypt([handle]);
```

To consume that cleartext in a contract, submit it with the decryption proof and call `FHE.checkSignatures`. Keep the handle order identical to the SDK request.

## Display

Wallets that are not allowed to decrypt should render `****`. Do not replace that with zero. Zero is a real amount. The asterisks mean the number is sealed.
