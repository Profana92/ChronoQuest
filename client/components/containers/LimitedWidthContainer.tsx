import { ReactNode } from "react";

type Props = { children: ReactNode; additionalClasses?: string };
const LimitedWidthContainer = ({ children, additionalClasses }: Props) => {
  return (
    <div
      className={`${
        additionalClasses ? additionalClasses : ""
      } max-w-[1920px] mx-auto p-5`}
      data-testid="FullWidthDiv"
    >
      {children}
    </div>
  );
};

export default LimitedWidthContainer;
