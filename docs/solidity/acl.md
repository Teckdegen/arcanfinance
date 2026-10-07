# Access list

The access list decides who may use a handle and who may open it. A name that is not on the list never gets the amount.

The list is written from the contract with the `FHE` helpers. The host keeps the list. Coprocessors follow it when they compute and when a decrypt is requested.

## Grant

| Call | Effect |
| --- | --- |
| `FHE.allow(handle, account)` | Persistent access for `account` |
| `FHE.allowThis(handle)` | Persistent access for the current contract |
| `FHE.allowTransient(handle, account)` | Access for this transaction only |

`allowThis` is required after you create a new handle the contract must touch again. `allow` is how the holder, an auditor, or another contract receives the handle.

Transient access is for a single transaction. It costs less because it does not stay in storage. Clear it with `FHE.cleanTransientStorage` when the call is done and you do not want the permission to linger.

## Check

| Call | Effect |
| --- | --- |
| `FHE.isAllowed(handle, account)` | True if `account` may use the handle |
| `FHE.isSenderAllowed(handle)` | True if `msg.sender` may use the handle |

Both see persistent and transient grants.

## Deny

`FHE.isAccountDenied` reports whether an account is blocked from encrypted values. A denied account cannot be granted a handle.

## Public decrypt flag

`FHE.makePubliclyDecryptable` puts a handle on the public-decrypt list. After that, anyone can ask for the plaintext. Use it only when the value is meant to become public, such as a final auction price. A balance should not be marked this way.

## Delegation

A contract can delegate its user-decrypt right to another account with `FHE.delegateUserDecryption`. The delegate can open handles the contract could open, until the delegation expires or is revoked. An externally owned account delegates on the access-list contract directly, not through `FHE`, because the caller must be the delegator.

## Pattern for a transfer

```solidity
euint64 nextSender = FHE.sub(balances[from], amount);
euint64 nextRecipient = FHE.add(balances[to], amount);
balances[from] = nextSender;
balances[to] = nextRecipient;
FHE.allowThis(nextSender);
FHE.allowThis(nextRecipient);
FHE.allow(nextSender, from);
FHE.allow(nextRecipient, to);
```

The sender can open their new balance. The recipient can open theirs. The chain still cannot.
