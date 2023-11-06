import { ReactNode } from "react";

type Props = { children: ReactNode; additionalClasses?: string };
const FullWidthContainer = ({ children, additionalClasses }: Props) => {
  return (
    <div
      className={`${additionalClasses ? additionalClasses : ""} w-full`}
      data-testid="FullWidthDiv"
    >
      {children}
    </div>
  );
};

export default FullWidthContainer;
