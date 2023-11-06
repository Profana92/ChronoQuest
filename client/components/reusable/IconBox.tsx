import Link from "next/link";
type Props = {
  children: React.ReactNode | string;
  additionalClasses?: string;
  link?: string;
};
const IconBox = ({ link, children, additionalClasses }: Props) => {
  if (link)
    return (
      <div
        data-testid="IconBoxId"
        className={`border border-white rounded-md bg-stone-600 w-10 h-10 flex justify-center items-center p-2 ${
          additionalClasses ? additionalClasses : ""
        }`}
      >
        <Link href={link}>{children}</Link>
      </div>
    );
  return (
    <div
      data-testid="IconBoxId"
      className={`border border-white rounded-md bg-stone-600 w-10 h-10 flex justify-center items-center p-2 ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      {children}
    </div>
  );
};

export default IconBox;
