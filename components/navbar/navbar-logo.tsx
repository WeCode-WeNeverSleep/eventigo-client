import Image from "next/image";
import Link from "next/link";

export function NavbarLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 select-none group"
      aria-label="EventiGO home"
    >
      <div className="group flex items-center gap-4 cursor-pointer">
        <Image
          src="/logo.png"
          alt="EventiGO Logo"
          width={50}
          height={50}
          className="border border-primary rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="font-black text-xl">
            Eventi<span className="text-primary">GO</span>
          </h1>
          <p className="font-extralight text-sm">v.2026</p>
        </div>
      </div>
    </Link>
  );
}
