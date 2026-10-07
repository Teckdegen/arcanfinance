# What you can build

The confidential token standard is an ERC-20 with the amounts encrypted. Balances are handles. Transfers move those handles. The wallet shows `****` unless the account is allowed to open it. The calls are in [Confidential token standard](token.md).

Anything that moves a number can keep that number sealed. Addresses can stay public. The amount does not.

## On the standard

* **Confidential tokens.** A confidential balance and a confidential transfer.
* **Confidential DEX.** A swap where the trade size stays encrypted.
* **Confidential AMM.** Pool reserves and swap amounts stay handles. The curve still runs. The size does not hit the book.
* **Confidential NFTs.** A mint, a sale, or a bid where the price stays sealed.
* **Confidential lending.** Collateral and debt stored as handles. A liquidation check uses `FHE.select`, so the shortfall is not published.
* **Confidential auctions.** Bids stay encrypted until the contract marks the winning price public.
* **Confidential payroll.** Each payment is a sealed transfer. The salary is not on the explorer.
* **Confidential distributions.** A pool split across holders without listing each share.
* **Confidential real-world assets.** The position and the terms stay ciphertext. The asset record can stay public.
* **Sealed votes.** A tally on encrypted ballots. The result can be opened when the vote ends.

Each of these is a contract on the same token standard: encrypt the amount, update handles, and name who may decrypt. Robinhood stores the handles. Coprocessors run the FHE.
