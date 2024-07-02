import { Fragment } from "react";
import Link from "next/link";

// shadcn components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// custom components
import { BankTabItem, BankInfo, TransactionsTable } from "./index";

export const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account: Account) => {
            const { id } = account;
            return (
              <Fragment key={id}>
                <TabsTrigger value={account.appwriteItemId}>
                  <BankTabItem
                    key={id}
                    account={account}
                    appwriteItemId={appwriteItemId}
                  />
                </TabsTrigger>
              </Fragment>
            );
          })}
        </TabsList>
        {accounts.map((account: Account) => {
          const { id, appwriteItemId } = account;
          return (
            <Fragment key={id}>
              <TabsContent
                value={appwriteItemId}
                key={id}
                className="space-y-4"
              >
                <BankInfo
                  account={account}
                  appwriteItemId={appwriteItemId}
                  type="full"
                />
                <TransactionsTable transactions={transactions} />
              </TabsContent>
            </Fragment>
          );
        })}
      </Tabs>
    </section>
  );
};
