import Link from "next/link";
type Props = {
  children: React.ReactNode | string;
  additionalClasses?: string;
  link?: string;
};
const IconBox = ({ link, children, additionalClasses }: Props) => {
  if (link)
    return (
      <div className="rounded-md bg-gradient-to-br from-[#927CEB] to-[#F4928D] p-[1px]">
        <div
          data-testid="IconBoxId"
          className={`bg-[#2b2433] rounded-[4px] w-10 h-10 flex justify-center items-center p-2 ${
            additionalClasses ? additionalClasses : ""
          }`}
        >
          <Link href={link}>{children}</Link>
        </div>
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
