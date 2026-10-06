"use client";

import { useState } from "react";

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
        </nav>
      ) : null}
    </header>
  );
}
