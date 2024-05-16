"use client";
import CountUp from "react-countup";
type Props = {
  amount: number;
};
export const AnimatedCounter = ({ amount }: Props) => {
  return (
    <div className="w-full">
      <CountUp
        duration={2.75}
        decimals={2}
        decimal=","
        prefix="$"
        end={amount}
      />
    </div>
  );
};
