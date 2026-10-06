"use client";

import { useState } from "react";

const cases = [
  {
    id: "device",
    number: "01",
    title: "On the device.",
    body: "The amount is encrypted before it is sent. The chain gets a handle.",
    image: "/use-device.png",
    alt: "A coin entering a vault slot",
  },
  {
    id: "math",
    number: "02",
    title: "On ciphertext.",
    body: "The token checks, subtracts, and adds. The number stays hidden.",
    image: "/use-math.png",
    alt: "A balance scale holding two sealed cubes",
  },
  {
    id: "open",
    number: "03",
    title: "Who can open it.",
    body: "The recipient, an auditor, or a regulator. Everyone else sees a handle.",
    image: "/use-open.png",
    alt: "Three keys, one lifted from the hook",
  },
];

export function UseCases() {
  const [active, setActive] = useState(0);

  return (
    <section id="how" className="bg-[#f6f6f6] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-[2.4rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#242424] sm:text-[3rem]">
          ERC-7984
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-[17px] leading-7 text-[#6a6a6a]">
          The ERC-20 token, with the amounts encrypted.
        </p>

        <div className="relative mt-12 flex h-[240px] items-center justify-center overflow-hidden rounded-2xl bg-[#ececec] sm:h-[340px]">
          {cases.map((item, index) => (
            <img
              key={item.id}
              src={item.image}
              alt={index === active ? item.alt : ""}
              className={`max-h-[90%] w-auto max-w-[86%] object-contain transition-opacity duration-200 ${
                index === active ? "opacity-100" : "pointer-events-none absolute opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-8">
          {cases.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={selected}
                className="cursor-pointer text-left"
              >
                <span
                  className={`block text-[28px] font-medium tracking-[-0.03em] ${
                    selected ? "text-black" : "text-[#cfcfcf]"
                  }`}
                >
                  {item.number}
                </span>
                <span
                  className={`mt-3 block text-[17px] font-semibold ${
                    selected ? "text-black" : "text-[#d0d0d0]"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`mt-2 block max-w-xs text-[14px] leading-6 ${
                    selected ? "text-[#3c3c3c]" : "text-[#d8d8d8]"
                  }`}
                >
                  {item.body}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
