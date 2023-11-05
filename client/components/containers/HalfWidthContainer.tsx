import { ReactNode } from "react";

type Props = { children?: ReactNode; additionalClasses?: string };
const HalfWidthContainer = ({ children, additionalClasses }: Props) => {
  return (
    <div
      className={`w-1/2 inline-block ${
        additionalClasses ? additionalClasses : ""
      }`}
      data-testid="HalfWidthContainerDiv"
    >
      {children}
    </div>
  );
};

export default HalfWidthContainer;
