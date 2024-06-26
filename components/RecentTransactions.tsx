import Link from "next/link";

// shadcn components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fragment } from "react";
import { BankTabItem } from "./BankTabItem";

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
            const { id, appwriteItemId } = account;
            return (
              <Fragment key={id}>
                <TabsTrigger value={appwriteItemId}>
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
              ></TabsContent>
            </Fragment>
          );
        })}
      </Tabs>
    </section>
  );
};
