import { ReactNode } from "react";

type Props = { children: ReactNode };
const FullWidth = ({ children }: Props) => {
  return <div className="w-full bg-cyan-300">{children}</div>;
};

export default FullWidth;
