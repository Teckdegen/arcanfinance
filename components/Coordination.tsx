const topics = [
  {
    id: "fhe",
    title: "FHE",
    body: "This is the calculation. The token adds, subtracts, and compares while every amount stays ciphertext. Coprocessors run that work, and anyone can recompute it. The numbers stay hidden from the chain.",
    image: "/sec-fhe.png",
    alt: "Two locked amounts added into a third locked amount",
    flip: false,
  },
  {
    id: "fhevm",
    title: "FHEVM",
    body: "This is the Solidity the token is written in. A balance is an euint64 handle, not a public uint256. The contract still checks and moves value. The chain records the operation and hands back a new handle.",
    image: "/sec-fhevm.png",
    alt: "A contract page with the figures blocked out",
    flip: true,
  },
  {
    id: "acl",
    title: "ACL",
    body: "This is who may open a handle. The token writes the list: the holder, an auditor, a regulator. A name that is not on it never gets the amount.",
    image: "/sec-acl.png",
    alt: "A gate with name plates and one key",
    flip: false,
  },
];

export function Coordination() {
  return (
    <div>
      {topics.map((topic) => (
        <section key={topic.id} id={topic.id} className="bg-white px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-8 border-t border-[#e4e4e4] pt-16 md:grid-cols-2 md:gap-16">
            <div className={topic.flip ? "md:order-2" : ""}>
              <div className="rounded-2xl bg-[#f6f6f6] px-6 py-8">
                <img src={topic.image} alt={topic.alt} className="mx-auto h-64 w-full object-contain sm:h-72" />
              </div>
            </div>
            <div className={topic.flip ? "md:order-1" : ""}>
              <h2 className="text-[2.2rem] font-medium leading-none tracking-[-0.03em] text-[#242424] sm:text-[2.8rem]">
                {topic.title}
              </h2>
              <div className="mt-4 h-[3px] w-12 bg-black" />
              <p className="mt-5 max-w-md text-[16px] leading-7 text-[#3a3a3a]">{topic.body}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
