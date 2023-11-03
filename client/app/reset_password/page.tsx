import ResetPasswordComponent from "@/components/auth/ResetPassword";
type Props = { searchParams: { token: string } };
const ResetPasswordPage = ({ searchParams: { token } }: Props) => {
  return <ResetPasswordComponent token={token} />;
};

export default ResetPasswordPage;
