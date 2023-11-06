import { ReactNode } from "react";

type Props = { children: ReactNode; additionalClasses?: string };
const SectionContainer = ({ children, additionalClasses }: Props) => {
  return (
    <section
      data-testid="section"
      className={`${additionalClasses ? additionalClasses : ""} w-full`}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
