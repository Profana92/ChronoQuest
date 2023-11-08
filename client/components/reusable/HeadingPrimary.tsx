const HeadingPrimary = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return (
    <h1 className={`font-oswald text-6xl text-center max-w-2xl mx-auto ${additionalClasses ? additionalClasses : ""}`}>
      {children}
    </h1>
  );
};

export default HeadingPrimary;
