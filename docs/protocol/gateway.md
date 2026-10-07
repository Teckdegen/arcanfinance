# Gateway

The gateway is the front door between an app, Robinhood, and the coprocessors. It does not run FHE and it does not hold user balances.

## Jobs

* Accept an encrypted input and route the proof check to the input verifier
* Track which ciphertext belongs on the host after a coprocessor finishes
* Carry a decrypt request to the key service and back to the allowed user
* Move a ciphertext when a contract on the host must consume a handle that was produced elsewhere

## What users call

Most apps never address the gateway directly. The SDK and the contract do.

* Encrypt and send a transaction to the token contract on Robinhood
* Read a handle from the contract
* Ask the SDK to decrypt

The gateway is the path those calls take once they leave the device.

## Consensus on results

Coprocessors must agree on the output ciphertext for a handle. The gateway waits for that agreement before it treats the result as final. Agreement is on the ciphertext, which is public as bytes and still unreadable as a number.

## Bridging a ciphertext

A handle is meaningful where it was created. To use it from another context, the gateway carries the ciphertext and the access-list rights, and the destination records a new handle. It does not decrypt in the middle.
