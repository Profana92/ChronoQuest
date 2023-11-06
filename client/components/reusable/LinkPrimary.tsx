import Link from "next/link";
type Props = {
  to: string;
  additionalClasses?: string;
  children?: React.ReactNode | string;
};
const LinkPrimary = ({ children, to, additionalClasses }: Props) => {
  return (
    <div>
      <Link
        href={to}
        className={`font-lato ${additionalClasses ? additionalClasses : ""}`}
      >
        {children}
      </Link>
    </div>
  );
};

export default LinkPrimary;
