import { ReactNode } from "react";

type Props = { children: ReactNode; additionalClasses?: string; grainy?: boolean };
const FullWidthContainer = ({ children, additionalClasses, grainy, ref }: Props) => {
  if (grainy)
    return (
      <div
        className={`${additionalClasses ? additionalClasses : ""} h-full w-full`}
        data-testid="FullWidthDiv"
        ref={ref}
      >
        <div className="bg-grainy h-full">{children}</div>
      </div>
    );
  return (
    <div className={`${additionalClasses ? additionalClasses : ""} w-full`} data-testid="FullWidthDiv" ref={ref}>
      {children}
    </div>
  );
};

export default FullWidthContainer;
