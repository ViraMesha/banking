import { Fragment } from "react";
import Link from "next/link";

// shadcn components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// custom components
import { BankTabItem, BankInfo, TransactionsTable, Pagination } from "./index";

export const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

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
                <TransactionsTable transactions={currentTransactions} />
                {totalPages > 1 && (
                  <div className="my-4 w-full">
                    <Pagination totalPages={totalPages} page={page} />
                  </div>
                )}
              </TabsContent>
            </Fragment>
          );
        })}
      </Tabs>
    </section>
  );
};
