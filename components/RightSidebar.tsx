import Image from "next/image";
import Link from "next/link";

// components
import { BankCard } from "./BankCard";

export const RightSidebar = ({
  user,
  transactions,
  banks,
}: RightSidebarProps) => {
  const { name, email } = user;

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">{name[0]}</span>
          </div>
          <div className="profile-details">
            <h1 className="profile-name">{name}</h1>
            <p className="profile-email">{email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2 items-center">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h3 className="text-14 font-semibold text-gray-600">Add bank</h3>
          </Link>
        </div>
        {banks?.length > 0 && (
          <div className="relative flex-center flex-1 flex-col gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={name}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={name}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};
