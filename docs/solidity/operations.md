# Operations

Operations on encrypted values return a new handle. They do not return a Solidity integer.

Functions that perform FHE work change state. They are not `view`.

## Arithmetic

Available on `euint*` values:

* `FHE.add`
* `FHE.sub`
* `FHE.mul`
* `FHE.min`
* `FHE.max`
* `FHE.neg`

`FHE.div` and `FHE.rem` require a plaintext divisor. Two ciphertexts cannot be divided.

A plaintext operand is allowed when it is no wider than the ciphertext. `FHE.add(encrypted, 10)` is valid. Mixing a wide plaintext into a narrow ciphertext is not.

Ciphertext-plaintext math is cheaper than ciphertext-ciphertext math, because one side is already known.

## Comparison

Comparisons return an `ebool`, not a Solidity `bool`.

* `FHE.eq`, `FHE.ne`
* `FHE.lt`, `FHE.gt`, `FHE.le`, `FHE.ge`

You can compare encrypted integers and encrypted addresses. You cannot feed the `ebool` into `require`. The chain would have to know the bit.

## Select

`FHE.select` is the branch.

```solidity
ebool enough = FHE.ge(balance, amount);
balance = FHE.select(enough, FHE.sub(balance, amount), balance);
```

If `enough` is an encryption of true, the result is the reduced balance. Otherwise the result is the old balance. Both branches are computed as handles. The chain does not learn which one was chosen.

## Bitwise

`FHE.and`, `FHE.or`, `FHE.xor`, `FHE.not`, `FHE.shl`, `FHE.shr`, `FHE.rotl`, and `FHE.rotr` operate on encrypted integers.

If you pass a plaintext to a bitwise function, the library encrypts that plaintext first. Shifts and rotates move bits inside the ciphertext.

## Random handles

`FHE.randEuint64` and the other `randEuint*` helpers draw an encrypted random integer during a transaction. The draw updates on-chain state, so it is not available in a read-only call. The plaintext of the draw is not published.

## After every write

Grant access on the new handle or the next call cannot use it.

```solidity
FHE.allowThis(nextBalance);
FHE.allow(nextBalance, msg.sender);
```
