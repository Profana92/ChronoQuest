const ParagraphRegular = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return (
    <p className={`font-normal ${additionalClasses ? additionalClasses : ""}`}>
      {children}
    </p>
  );
};

export default ParagraphRegular;
