const items = [
  {
    title: "Real-world assets",
    body: "Investors, terms, and the cap table stay sealed.",
    image: "/use-rwa.png",
    alt: "A building behind a sealed deed",
  },
  {
    title: "Payroll",
    body: "Pay onchain without publishing the amount.",
    image: "/use-pay.png",
    alt: "Sealed pay envelopes in a tray",
  },
  {
    title: "Trading",
    body: "The position stays off the public book.",
    image: "/use-trade.png",
    alt: "A candlestick chart",
  },
  {
    title: "Distributions",
    body: "Who received what stays encrypted.",
    image: "/use-dist.png",
    alt: "One coin stack split into three",
  },
];

export function Checks() {
  return (
    <section id="uses" className="bg-[#f6f6f6] px-6 pb-24 sm:px-10">
      <div className="mx-auto max-w-5xl border-t border-[#e4e4e4] pt-20">
        <h2 className="text-center text-[2.15rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2a2a2a] sm:text-[2.7rem]">
          Where it is used
        </h2>
        <p className="mt-4 text-center text-[17px] text-[#6a6a6a]">
          Confidentiality is the requirement.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`px-6 text-center ${index > 0 ? "lg:border-l lg:border-[#e3e3e3]" : ""}`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="mx-auto h-28 w-28 object-contain"
              />
              <h3 className="mt-5 text-[16px] font-semibold text-[#1a1a1a]">{item.title}</h3>
              <p className="mx-auto mt-2 max-w-[14rem] text-[14px] leading-6 text-[#8d8d8d]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
