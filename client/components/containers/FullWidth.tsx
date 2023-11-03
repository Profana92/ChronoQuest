import { ReactNode } from "react";

type Props = { children: ReactNode };
const FullWidth = ({ children }: Props) => {
  return (
    <div className="w-full" data-testid="FullWidthDiv">
      {children}
    </div>
  );
};

export default FullWidth;
