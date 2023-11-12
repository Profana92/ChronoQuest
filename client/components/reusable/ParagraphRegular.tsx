const ParagraphRegular = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return (
    <p
      className={`lg:max-w-[70vw] font-normal max-w-7xl mx-auto text-base lg:text-lg 2xl:text-2xl ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      {children}
    </p>
  );
};

export default ParagraphRegular;
