# Protocol

Arcan splits one confidential transfer across four places. None of them is allowed to skip the others.

```text
app  ->  Robinhood  ->  coprocessors
              |
              v
         access list
```

## The path of an amount

1. The SDK encrypts the amount with the Arcan public key and attaches an input proof.
2. The user calls the contract on Robinhood. From and to are plaintext. The amount is a ciphertext.
3. The contract checks the proof, updates balances as handles, and writes the access list.
4. Coprocessors run `add` and `sub` on the ciphertext and commit the new ciphertext.
5. The wallet shows `****` until an allowed account decrypts.

The result is publicly recomputable. A third party can replay the recorded operation on the ciphertext and reach the same handle. They still cannot read the number.

## Pages

* [FHE library](library.md) is the operation set contracts call.
* [Host chain](host.md) is Robinhood, which stores handles.
* [Coprocessors](coprocessors.md) run the FHE.
* [Gateway](gateway.md) moves ciphertexts and decrypt requests between the user, the host, and the coprocessors.
* [Opening a handle](keys.md) is how an allowed account gets the plaintext.
