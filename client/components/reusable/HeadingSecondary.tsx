const HeadingSecondary = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return (
    <h2 className={`font-oswald ${additionalClasses ? additionalClasses : ""}`}>
      {children}
    </h2>
  );
};

export default HeadingSecondary;
