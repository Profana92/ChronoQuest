import { ReactNode } from "react";

type Props = { children: ReactNode; classes?: string };
const FullWidthContainer = ({ children, classes }: Props) => {
  return (
    <div className={`w-full ${classes}`} data-testid="FullWidthDiv">
      {children}
    </div>
  );
};

export default FullWidthContainer;
