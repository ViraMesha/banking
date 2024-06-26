export const HeaderBox = ({
  type = "title",
  title,
  subtext,
  userName,
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient">&nbsp;{userName}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};
