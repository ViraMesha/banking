import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import { Fragment } from "react";
import { CategoryBadge } from "./CategoryBadge";

export const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => {
          const { id, name, type, paymentChannel, category } = transaction;
          const status = getTransactionStatus(new Date(transaction.date));
          const amount = formatAmount(transaction.amount);
          const isDebit = type === "debit";
          const isCredit = type === "credit";
          const date = formatDateTime(new Date(transaction.date));

          return (
            <Fragment key={id}>
              <TableRow
                className={`${
                  isDebit || amount[0] === "-" ? "bg-[#FFfbfa]" : "bg-[#f6fef9]"
                } !over:bg-none !border-b-default`}
              >
                <TableCell className="max-w-[250px] pl-2 pr-10">
                  <div className="flex items-center gap-3">
                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                      {removeSpecialCharacters(name)}
                    </h1>
                  </div>
                </TableCell>
                <TableCell
                  className={`pl-2 pr-10 font-semibold ${
                    isDebit || amount[0] === "-"
                      ? "text-[#f04438]"
                      : "text-[#039855]"
                  }`}
                >
                  {isDebit ? `-${amount}` : isCredit ? amount : amount}
                </TableCell>

                <TableCell className="pl-2 pr-10">
                  <CategoryBadge category={status} />
                </TableCell>

                <TableCell className="pl-2 pr-10 min-w-32">
                  {date.dateTime}
                </TableCell>
                <TableCell className="pl-2 pr-10 capitalize min-w-24">
                  {paymentChannel}
                </TableCell>
                <TableCell className="pl-2 pr-10 max-md:hidden">
                  <CategoryBadge category={category} />
                </TableCell>
              </TableRow>
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};
