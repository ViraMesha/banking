"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Footer, PlaidLink } from "./index";

export const SideBar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/icons/logo.svg"
            alt="Horizon logo"
            width={34}
            height={34}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        <ul>
          {sidebarLinks.map(({ imgURL, route, label }, index) => {
            const isActive =
              pathname === route || pathname.startsWith(`${route}/`);
            return (
              <li key={index}>
                <Link
                  href={route}
                  className={cn("sidebar-link", {
                    "bg-bank-gradient": isActive,
                  })}
                >
                  <div className="relative size-6">
                    <Image
                      src={imgURL}
                      alt={label}
                      fill
                      className={cn({ "brightness-[3] invert-0": isActive })}
                    />
                  </div>
                  <p
                    className={cn("sidebar-label", {
                      "!text-white": isActive,
                    })}
                  >
                    {label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
        <PlaidLink user={user} />
      </nav>
      <Footer user={user} />
    </section>
  );
};
