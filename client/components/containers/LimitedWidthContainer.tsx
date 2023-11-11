import { ReactNode } from "react";

type Props = { children: ReactNode; additionalClasses?: string };
const LimitedWidthContainer = ({ children, additionalClasses }: Props) => {
  return (
    <div
      className={`${
        additionalClasses ? additionalClasses : ""
      } max-w-[1320px] mx-auto p-10 lg:px-5 lg:py-10`}
      data-testid="FullWidthDiv"
    >
      {children}
    </div>
  );
};

export default LimitedWidthContainer;
