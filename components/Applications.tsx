const rows = [
  {
    number: "1",
    title: "Balances",
    body: "An euint64 handle. Not a public number. The wallet shows **** because the balance stays ciphertext.",
    image: "/sec-balance.png",
    alt: "A balance shown as four asterisks",
    panel: true,
    flip: false,
  },
  {
    number: "2",
    title: "Transfers",
    body: "confidentialTransfer, instead of transfer. From and to stay visible. The value on the explorer is ****.",
    image: "/sec-transfer.png",
    alt: "An explorer table whose values are four asterisks",
    panel: true,
    flip: true,
  },
  {
    number: "3",
    title: "A read",
    body: "confidentialBalanceOf, instead of balanceOf. You still ask for a balance. The answer is a sealed handle, not the amount.",
    image: "/sec-read.png",
    alt: "A glass over a redacted balance",
    panel: true,
    flip: false,
  },
];

export function Applications() {
  return (
    <section id="calls" className="bg-white px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-[2.3rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2a2a2a] sm:text-[2.9rem]">
          Same calls. Sealed amounts.
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-16 bg-black" />
        <p className="mx-auto mt-5 max-w-2xl text-center text-[17px] leading-7 text-[#5e5e5e]">
          If you have written an ERC-20, this is the same token. Balance, transfer, and read are the same calls. The amount stays sealed, so the chain records the move and never the number.
        </p>

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
          {rows.map((row) => (
            <div key={row.number} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className={row.flip ? "md:order-2" : ""}>
                <div className={row.panel ? "rounded-2xl bg-[#ececec] px-6 py-8" : "px-2 py-4"}>
                  <img src={row.image} alt={row.alt} className="mx-auto h-64 w-full object-contain sm:h-72" />
                </div>
              </div>
              <div className={row.flip ? "md:order-1" : ""}>
                <span className="inline-flex h-7 w-7 items-center justify-center bg-black text-[14px] font-medium text-white">
                  {row.number}
                </span>
                <h3 className="mt-4 text-[1.85rem] font-medium leading-tight tracking-[-0.03em] text-[#242424] sm:text-[2.15rem]">
                  {row.title}
                </h3>
                <p className="mt-3 max-w-md text-[16px] leading-7 text-[#4a4a4a]">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
