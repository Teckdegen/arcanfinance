"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#how", label: "ERC-7984" },
  { href: "#uses", label: "Uses" },
  { href: "#fhe", label: "FHE" },
  { href: "#fhevm", label: "FHEVM" },
  { href: "#acl", label: "ACL" },
  { href: "#calls", label: "Calls" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    if (!contact) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContact(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contact]);

  function showContact() {
    setOpen(false);
    setContact(true);
  }

  return (
    <header className="border-b border-[#e6e6e6] bg-white">
      <div className="relative mx-auto flex h-[76px] max-w-[1180px] items-center px-6 sm:px-8">
        <a href="/" className="text-[22px] font-semibold tracking-[0.14em] text-black">
          ARCAN
        </a>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
                className="px-2.5 py-2 text-[12px] font-medium tracking-[0.08em] text-[#6b6b6b] uppercase transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={showContact}
            className="px-2.5 py-2 text-[12px] font-medium tracking-[0.08em] text-black uppercase"
          >
            Contact us
          </button>
          <button
            type="button"
            onClick={showContact}
            className="rounded-full bg-[#f2f2f2] px-4 py-2 text-[14px] font-medium text-black"
          >
            Buy $ANC
          </button>
        </div>

        <button
          type="button"
          className="ml-auto flex h-9 w-9 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex w-4 flex-col gap-[5px]">
            <span className={`h-px bg-black transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px bg-black transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav aria-label="Primary mobile" className="border-t border-[#ececec] px-5 py-3 lg:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[16px] font-medium text-black"
            >
              {link.label}
            </a>
          ))}
          <button type="button" onClick={showContact} className="block py-3 text-left text-[16px] font-medium text-black">
            Contact us
          </button>
          <button
            type="button"
            onClick={showContact}
            className="mt-2 rounded-full bg-[#f2f2f2] px-4 py-2 text-[14px] font-medium text-black"
          >
            Buy $ANC
          </button>
        </nav>
      ) : null}

      {contact ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          onClick={() => setContact(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="w-full max-w-md bg-white px-8 py-8"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="contact-title" className="text-[1.7rem] font-medium tracking-[-0.03em] text-[#242424]">
              Contact us
            </h2>
            <div className="mt-4 h-[3px] w-12 bg-black" />
            <p className="mt-5 text-[16px] leading-7 text-[#3a3a3a]">
              The tech is still in private testing. Email{" "}
              <a href="mailto:support@arcan.finance" className="whitespace-nowrap text-black underline">
                support@arcan.finance
              </a>{" "}
              to get access.
            </p>
            <p className="mt-4 text-[16px] leading-7 text-[#3a3a3a]">
              Everything will be public when it is fully released.
            </p>
            <button
              type="button"
              onClick={() => setContact(false)}
              className="mt-6 text-[13px] font-medium tracking-[0.08em] text-black uppercase"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
