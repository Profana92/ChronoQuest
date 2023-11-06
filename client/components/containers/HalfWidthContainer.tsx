import { ReactNode } from "react";

type Props = { children?: ReactNode; additionalClasses?: string };
const HalfWidthContainer = ({ children, additionalClasses }: Props) => {
  return (
    <div
      className={`${
        additionalClasses ? additionalClasses : ""
      } w-1/2 inline-block`}
      data-testid="HalfWidthContainerDiv"
    >
      {children}
    </div>
  );
};

export default HalfWidthContainer;
