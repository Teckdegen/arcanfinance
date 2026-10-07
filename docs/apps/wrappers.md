# Wrappers

A wrapper holds a public asset and issues a confidential balance against it. The public asset sits in the wrapper contract. The claim on it is an `euint64`.

## Shield

The user deposits a public amount. The wrapper escrows that amount and credits an encrypted balance.

```solidity
function shield(externalEuint64 encryptedAmount, bytes calldata inputProof) external {
    euint64 amount = FHE.fromExternal(encryptedAmount, inputProof);
    balances[msg.sender] = FHE.add(balances[msg.sender], amount);
    FHE.allowThis(balances[msg.sender]);
    FHE.allow(balances[msg.sender], msg.sender);
}
```

The deposit transaction still reveals whatever public token transfer funded the escrow. The confidential balance after the credit does not.

## Move

Transfers between confidential balances use the same `confidentialTransfer` path as the [token](token.md). The escrowed public asset does not move per transfer.

## Unshield

Unshield burns a sealed balance and sends the public asset out. The moment you unshield, the outgoing public transfer reveals that amount. Only unshield what the user intends to make public.

If the burned amount must match the withdrawal, the contract checks that equality with encrypted comparison and `FHE.select`, then submits a public decrypt of the withdrawal size when the public token transfer needs a clear integer.

## Registry

A registry contract can list wrapper and token addresses so an app can discover them. The registry stores addresses. It does not store balances. Listing a contract does not grant decrypt rights. Each wrapper still writes its own access list.
