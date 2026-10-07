export function Footer() {
  return (
    <footer className="bg-[#f2f2f2]">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-6 sm:px-8">
        <a href="/" className="text-[18px] font-semibold tracking-[0.14em] text-black">
          ARCAN
        </a>
        <a href="https://x.com/arcanfinance" target="_blank" rel="noopener noreferrer" aria-label="Arcan on X" className="text-black">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
