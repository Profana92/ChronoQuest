const HeadingSecondary = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return (
    <h2
      className={`font-oswald text-5xl text-center max-w-2xl mx-auto mb-8 ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      {children}
    </h2>
  );
};

export default HeadingSecondary;
