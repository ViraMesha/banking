import { BankCard, HeaderBox } from "@/components/index";
import { getAccounts, getLoggedInUser } from "@/lib/actions";
import { Fragment } from "react";

export default async function MyBanks() {
  let loggedIn: User = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });
  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My bank accounts"
          subtext="Effortlessly manage your banking activities."
        />
        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((account: Account) => (
                <Fragment key={account.id}>
                  <BankCard account={account} userName={loggedIn?.firstName} />
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
