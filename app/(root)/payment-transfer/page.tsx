import { HeaderBox } from "@/components/index";
import { PaymentTransferForm } from "@/components/PaymentTransferForm";
import { getAccounts, getLoggedInUser } from "@/lib/actions";

export default async function Transfer() {
  let loggedIn: User = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData: Account[] = accounts?.data;

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer."
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  );
}
