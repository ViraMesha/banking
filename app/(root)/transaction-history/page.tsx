import { redirect } from "next/navigation";
import { HeaderBox, TransactionsTable } from "@/components/index";
import { getAccount, getAccounts, getLoggedInUser } from "@/lib/actions";
import { formatAmount } from "@/lib/utils";

export default async function TransactionHistory({
  searchParams: { id, page },
}: SearchParamProps) {
  const currentPage = Number(page as string) || 1;
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
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              **** **** ****
              <span className="text-16">{account?.data.mask}</span>
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>
        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={account?.transactions} />
        </section>
      </div>
    </div>
  );
}
