const HeadingPrimary = ({
  children,
  additionalClasses,
}: {
  children: React.ReactNode | string;
  additionalClasses?: string;
}) => {
  return (
    <h1
      className={`font-oswald text-4xl lg:leading-[1.2] lg:text-5xl text-center max-w-2xl mx-auto mb-8 ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      {children}
    </h1>
  );
};

export default HeadingPrimary;
