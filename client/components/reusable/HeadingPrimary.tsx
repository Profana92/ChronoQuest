const HeadingPrimary = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return (
    <h1 className={`font-oswald ${additionalClasses ? additionalClasses : ""}`}>
      {children}
    </h1>
  );
};

export default HeadingPrimary;
