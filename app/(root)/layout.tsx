import { MobileNav, SideBar } from "@/components/index";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    $id: "sdfg",
    email: "dfgh",
    userId: "qsdfgh",
    dwollaCustomerUrl: "wfgh",
    dwollaCustomerId: "sdfgh",
    firstName: "Vira",
    lastName: "Mesha",
    address1: "werfgh",
    city: "ergh",
    state: "Sdf",
    postalCode: "71679",
    dateOfBirth: "fghj",
    ssn: "dfghj",
  };
  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src="/icons/logo.svg"
            alt="Horizon logo"
            width={30}
            height={30}
          />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
