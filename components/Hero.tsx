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
      <p className="shrink-0 px-4 pb-6 pt-3 text-center sm:pb-7">
        <span className="inline-block bg-black px-2.5 py-1 text-[15px] leading-none text-white sm:text-[20px]">
          A Zama fork deployed on Robinhood
        </span>
      </p>
    </section>
  );
}
