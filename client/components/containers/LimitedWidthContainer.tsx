import { ReactNode } from "react";

type Props = { children: ReactNode; classes?: string };
const LimitedWidthContainer = ({ children, classes }: Props) => {
  return (
    <div
      className={`max-w-[1920px] mx-auto ${classes}`}
      data-testid="FullWidthDiv"
    >
      {children}
    </div>
  );
};

export default LimitedWidthContainer;
