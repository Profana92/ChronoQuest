import Link from "next/link";
type Props = {
  to: string;
  additionalClasses?: string;
  children: React.ReactNode | string;
};
const LinkPrimary = ({ children, to, additionalClasses }: Props) => {
  return (
    <div className="shadow-lg rounded-md bg-gradient-to-br from-[#927CEB] to-[#F4928D] p-[1px] w-32 my-5">
      <Link href={to} className={`w-full h-fullfont-lato ${additionalClasses ? additionalClasses : ""}`}>
        <div className="rounded-[5px] text-center bg-Neutral-Dark hover:bg-Tetriary py-2">{children}</div>
      </Link>{" "}
    </div>
  );
};

export default LinkPrimary;
