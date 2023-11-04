import { ReactNode } from "react";

type Props = { children: ReactNode; additionalClasses?: string };
const FullWidthContainer = ({ children, additionalClasses }: Props) => {
  return (
    <div
      className={`w-full ${additionalClasses ? additionalClasses : ""}`}
      data-testid="FullWidthDiv"
    >
      {children}
    </div>
  );
};

export default FullWidthContainer;
