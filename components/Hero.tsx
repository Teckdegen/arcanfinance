export function Hero() {
  return (
    <section className="flex h-[calc(100svh-76px)] w-full shrink-0 flex-col bg-white">
      <div className="flex min-h-0 w-full flex-1 items-center">
        <img
          src="/hero-institution.png"
          alt="Hand-drawn financial institution inside a circle, with heavy clouds"
          className="mx-auto h-auto w-[70%] max-w-[70%] object-contain object-center"
        />
      </div>
      <div className="flex shrink-0 flex-col items-center gap-5 px-4 pb-8 pt-3">
        <p className="text-center">
          <span className="inline-block bg-black px-2.5 py-1 text-[15px] leading-none text-white sm:text-[20px]">
            A Zama fork deployed on Robinhood
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://docs.arcan.finance/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-[15px] font-medium text-white"
          >
            Read docs
          </a>
          <a
            href="https://ponsfamily.com/launchpad/0xf11d9b4ecc3e07f0beef0f176dd641d2e0fc3f37"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-black bg-white px-7 py-3 text-[15px] font-medium text-black"
          >
            Buy $ANC
          </a>
        </div>
      </div>
    </section>
  );
}
