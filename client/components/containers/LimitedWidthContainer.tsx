import { ReactNode } from "react";

type Props = { children: ReactNode; additionalClasses?: string };
const LimitedWidthContainer = ({ children, additionalClasses }: Props) => {
  return (
    <div
      className={`max-w-[1920px] mx-auto ${
        additionalClasses ? additionalClasses : ""
      }`}
      data-testid="FullWidthDiv"
    >
      {children}
    </div>
  );
};

export default LimitedWidthContainer;
