const ParagraphRegular = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return <p className={`font-normal max-w-7xl mx-auto ${additionalClasses ? additionalClasses : ""}`}>{children}</p>;
};

export default ParagraphRegular;
