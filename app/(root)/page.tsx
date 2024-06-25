import {
  HeaderBox,
  RecentTransactions,
  RightSidebar,
  TotalBalanceBox,
} from "@/components/index";
import { getAccount, getAccounts, getLoggedInUser } from "@/lib/actions";

import { redirect } from "next/navigation";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  let loggedIn: User = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!loggedIn) {
    redirect("/sign-in");
  }

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

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
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions />
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
