import { HeaderBox, RightSideBar, TotalBalanceBox } from "@/components/index";

const Home = () => {
  const loggedIn = {
    $id: "sdfg",
    email: "john.doe@example.com",
    userId: "qsdfgh",
    dwollaCustomerUrl: "https://api.dwolla.com/customers/sdfgh",
    dwollaCustomerId: "sdfgh",
    firstName: "John",
    lastName: "Doe",
    address1: "123 Main St",
    city: "Springfield",
    state: "IL",
    postalCode: "62704",
    dateOfBirth: "1985-08-15",
    ssn: "123-45-6789",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome,"
            userName={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={25000.98}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSideBar user={loggedIn} transactions={[]} banks={[]} />
    </section>
  );
};

export default Home;
