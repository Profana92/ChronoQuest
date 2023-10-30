import { verifyWithCredentials } from "@/actions/authActions";

const page = async ({ searchParams: { token } }: { searchParams: { token: string } }) => {
  const res = await verifyWithCredentials(token);

  return <div>Verify Page</div>;
};

export default page;
