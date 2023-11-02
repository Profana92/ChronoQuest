import SignIn from "@/components/auth/SignIn";

type Props = {
  params: {};
  searchParams: { callbackUrl: string };
};
const SignInPage = ({ searchParams: { callbackUrl } }: Props) => {
  return <SignIn callbackUrl={callbackUrl || "/"} />;
};

export default SignInPage;
