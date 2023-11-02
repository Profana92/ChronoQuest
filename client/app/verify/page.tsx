import { verifyWithCredentials } from "@/actions/authActions";

const page = async ({ searchParams: { token } }: { searchParams: { token: string } }) => {
  const res = await verifyWithCredentials(token);

  return <h1>{res?.msg}</h1>;
};

export default page;
