import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { buttonVariants } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={150} height={150} />
        {/* <h3 className="text-3xl font-semibold">
          Invoice<span className="text-blue-500">Marshal</span>
        </h3> */}
      </Link>
      <Link href="https://cp.tradejini.com/Ox1Ux9">
        <RainbowButton>Open your Account Online</RainbowButton>
      </Link>
    </div>
  );
}
