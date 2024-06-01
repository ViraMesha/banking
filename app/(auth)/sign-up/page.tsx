import { AuthForm } from "@/components/index";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const SingUp = async () => {
  const user = await getLoggedInUser();

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SingUp;
