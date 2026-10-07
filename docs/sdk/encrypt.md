# Encrypt an input

Encrypt on the device, then pass the ciphertext into the contract.

```ts
const input = arcan.createEncryptedInput(contractAddress, userAddress);
input.add64(amount);
const { handles, inputProof } = await input.encrypt();
```

* `contractAddress` is the contract that will call `FHE.fromExternal`.
* `userAddress` is the account that will send the transaction.
* `add64` matches an `externalEuint64` argument.
* `handles[0]` is the external ciphertext.
* `inputProof` is the bytes argument beside it.

Use `addBool`, `addAddress`, or another `add*` when the Solidity argument is the matching external type. The order of `add` calls is the order of `handles`.

## Passing it to Solidity

```ts
await token.confidentialTransfer(to, handles[0], inputProof);
```

The wallet signs that transaction. The amount is not an ABI integer. A block explorer shows the call and a ciphertext blob.

## One input, one contract

An input proof is bound to the contract and the user. Reusing it against a second contract fails `fromExternal`. Create a new input for each contract.
