import { ReactNode } from "react";

type Props = { children: ReactNode; classes?: string };
const HalfWidthContainer = ({ children, classes }: Props) => {
  return (
    <div className={`w-1/2 ${classes}`} data-testid="HalfWidthContainerDiv">
      {children}
    </div>
  );
};

export default HalfWidthContainer;
