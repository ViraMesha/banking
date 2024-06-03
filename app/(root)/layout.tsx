import { MobileNav, SideBar } from "@/components/index";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    // redirect("/sign-in");
    loggedIn = {
      $id: "sdfg",
      email: "john.doe@example.com",
      userId: "qsdfgh",
      dwollaCustomerUrl: "https://api.dwolla.com/customers/sdfgh",
      dwollaCustomerId: "sdfgh",
      firstName: "John",
      lastName: "Doe",
      name: "John Doe",
      address1: "123 Main St",
      city: "Springfield",
      state: "IL",
      postalCode: "62704",
      dateOfBirth: "1985-08-15",
      ssn: "123-45-6789",
    };
  }
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
