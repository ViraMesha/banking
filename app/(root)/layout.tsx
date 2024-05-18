import { SideBar } from "@/components/index";

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
      {children}
    </main>
  );
}
