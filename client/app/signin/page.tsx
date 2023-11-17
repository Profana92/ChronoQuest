import SignIn from "@/components/auth/SignIn";
import HalfWidthContainer from "@/components/containers/HalfWidthContainer";
import LimitedWidthContainer from "@/components/containers/LimitedWidthContainer";
import Image from "next/image";
import backgroundImage from "@/public/backgrounds/signInPage/background.jpg";
type Props = {
  params: {};
  searchParams: { callbackUrl: string };
};
const SignInPage = ({ searchParams: { callbackUrl } }: Props) => {
  return (
    <section className="pt-14">
      <LimitedWidthContainer additionalClasses="shadow:lg flex min-h-[clamp(500px,75vh,700px)]">
        <HalfWidthContainer additionalClasses="flex justify-center items-center bg-Neutral-White bg-opacity-5 p-12">
          <SignIn callbackUrl={callbackUrl || "/"} />
        </HalfWidthContainer>
        <HalfWidthContainer additionalClasses="relative ">
          <Image src={backgroundImage} fill={true} alt="logo" className="cover h-full border border-white" />
        </HalfWidthContainer>
      </LimitedWidthContainer>
    </section>
  );
};

export default SignInPage;
