# Transfer

A confidential transfer is an ERC-20 transfer with a sealed amount. From and to are public. The value is a handle.

## Contract

```solidity
function confidentialTransfer(
    address to,
    externalEuint64 encryptedAmount,
    bytes calldata inputProof
) external returns (euint64) {
    euint64 amount = FHE.fromExternal(encryptedAmount, inputProof);
    euint64 senderNext = FHE.sub(balances[msg.sender], amount);
    euint64 recipientNext = FHE.add(balances[to], amount);
    balances[msg.sender] = senderNext;
    balances[to] = recipientNext;
    FHE.allowThis(senderNext);
    FHE.allowThis(recipientNext);
    FHE.allow(senderNext, msg.sender);
    FHE.allow(recipientNext, to);
    return senderNext;
}
```

The subtraction and addition are recorded on Robinhood. The coprocessor evaluates them. If the sender does not hold enough, write that rule with `FHE.select` so the balances stay unchanged when the comparison is false. The comparison result stays encrypted.

## App

```ts
const input = arcan.createEncryptedInput(tokenAddress, signer.address);
input.add64(amount);
const { handles, inputProof } = await input.encrypt();

const tx = await token.confidentialTransfer(recipient, handles[0], inputProof);
await tx.wait();
```

## What the explorer shows

| Field | Visible |
| --- | --- |
| Transaction hash | Yes |
| From | Yes |
| To | Yes |
| Value | `****` |
| Token | The token symbol |

`confidentialBalanceOf` returns a handle for the caller to decrypt. It is the sealed form of `balanceOf`.
