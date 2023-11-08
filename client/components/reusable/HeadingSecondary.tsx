const HeadingSecondary = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return (
    <h2
      className={`font-oswald text-center max-w-2xl mx-auto ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      {children}
    </h2>
  );
};

export default HeadingSecondary;
