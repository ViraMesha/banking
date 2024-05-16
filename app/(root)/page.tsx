import { HeaderBox, TotalBalanceBox } from "@/components/index";

const Home = () => {
  const loggedIn = {
    firstName: "Vira",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            userName={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={25000.98}
          />
        </header>
      </div>
    </section>
  );
};

export default Home;
