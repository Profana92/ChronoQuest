import Link from "next/link";
type Props = {
  children: React.ReactNode | string;
  additionalClasses?: string;
  link?: string;
};
const IconBox = ({ link, children, additionalClasses }: Props) => {
  if (link)
    return (
      <div className="shadow-lg rounded-md bg-gradient-to-br from-[#927CEB] to-[#F4928D] p-[1px]">
        <div
          data-testid="IconBoxId"
          className={`bg-Neutral-Dark hover:bg-Tetriary rounded-[5px] w-10 h-10 flex justify-center items-center p-2 ${
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
      className={`shadow-lg  bg-Neutral-Dark hover:bg-Tetriary rounded-[5px] w-10 h-10 flex justify-center items-center p-2 ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      {children}
    </div>
  );
};

export default IconBox;
