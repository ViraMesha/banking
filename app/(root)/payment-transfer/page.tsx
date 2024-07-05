import { HeaderBox } from "@/components/index";

export default function Transfer() {
  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer."
      />
      <section className="size-full pt-5"></section>
    </section>
  );
}
