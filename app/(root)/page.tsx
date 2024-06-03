import { HeaderBox, RightSidebar, TotalBalanceBox } from "@/components/index";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Home = async () => {
  let loggedIn = await getLoggedInUser();

  console.log(loggedIn);

  if (!loggedIn) {
    redirect("/sign-in");
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome,"
            userName={loggedIn?.name || "Guest"}
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
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 1578 }, { currentBalance: 5875 }]}
      />
    </section>
  );
};

export default Home;
