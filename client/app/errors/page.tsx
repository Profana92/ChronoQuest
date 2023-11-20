"use client";

import { useRouter, useSearchParams } from "next/navigation";
const Error = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errMsg = searchParams.get("error");
  return (
    <div className="pt-14">
      <h1>Errors: {errMsg}</h1>
      <button onClick={() => router.back()}>Try Again</button>
    </div>
  );
};

export default Error;
