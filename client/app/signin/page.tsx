import SignIn from "@/components/auth/SignIn";

type Props = {
  params: {};
  searchParams: { callbackUrl: string };
};
const SignInPage = ({ searchParams: { callbackUrl } }: Props) => {
  return (
    <section className="pt-14">
      <SignIn callbackUrl={callbackUrl || "/"} />
    </section>
  );
};

export default SignInPage;
