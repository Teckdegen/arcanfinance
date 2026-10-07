# Apps

Arcan apps are contracts that move value without publishing the amount. The protocol pieces underneath them are the same: handles on Robinhood, FHE on coprocessors, an access list for who may open a result.

## Included here

* [Confidential token](token.md), the ERC-7984 shape.
* [Wrappers](wrappers.md), contracts that put an existing asset behind a sealed balance.

## How an app should behave

* Addresses of the parties can be public.
* Amounts stay handles.
* The holder can decrypt their own position.
* An auditor or regulator is added with `FHE.allow` only when the product needs that name.
* A public decrypt is reserved for a value the app has decided to reveal.

Compose apps by passing handles, not by decrypting in the middle. The shared public key is what makes a token and a wrapper able to use the same ciphertext.
