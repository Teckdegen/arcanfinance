# Apps

Arcan apps are contracts that move value without publishing the amount. The protocol pieces underneath them are the same: handles on Robinhood, FHE on coprocessors, an access list for who may open a result.

The private token standard is that contract: ERC-20 calls, encrypted amounts. [What you can build](build.md) lists the apps that sit on it, from a private token to a private DEX, AMM, or NFT.

## Included here

* [What you can build](build.md).
* [Private token standard](token.md), the ERC-7984 shape.
* [Wrappers](wrappers.md), contracts that put an existing asset behind a sealed balance.

## How an app should behave

* Addresses of the parties can be public.
* Amounts stay handles.
* The holder can decrypt their own position.
* An auditor or regulator is added with `FHE.allow` only when the product needs that name.
* A public decrypt is reserved for a value the app has decided to reveal.

Compose apps by passing handles, not by decrypting in the middle. The shared public key is what makes a token and a wrapper able to use the same ciphertext.
