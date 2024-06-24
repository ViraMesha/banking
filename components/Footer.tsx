"use client";
import { logOutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const { firstName, email } = user;

  const handleLogOut = async () => {
    const loggedOut = await logOutAccount();

    if (!loggedOut) {
      router.push("/sign-in");
    }
  };

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{firstName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h4 className="text-14 truncate text-gray-700 font-semibold">
          {firstName}
        </h4>
        <p className="text-14 truncate font-normal text-gray-600">{email}</p>
      </div>
      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" alt="" fill />
      </div>
    </footer>
  );
};
