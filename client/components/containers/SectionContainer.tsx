import { ReactNode } from "react";

type Props = { children: ReactNode; additionalClasses?: string };
const SectionContainer = ({ children, additionalClasses }: Props) => {
  return (
    <section
      data-testid="section"
      className={`w-full ${additionalClasses ? additionalClasses : ""}`}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
