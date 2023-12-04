import Link from "next/link";

const GameMenu = () => {
  const menuFirstSectionData = [
    { link: "/game/overview", title: "Overview" },
    { link: "/game/messages", title: "Messages" },
    { link: "/game/leaderboard", title: "Leaderboard" },
    { link: "/game/arena", title: "Arena" },
  ];
  const menuFirstSectionContent = menuFirstSectionData.map((item) => {
    return (
      <Link key={item.title} href={item.link}>
        <li>{item.title}</li>
      </Link>
    );
  });
  return (
    <div className="absolute w-72 h-full bg-slate-400">
      <ul>
        {menuFirstSectionContent}
        <hr />
      </ul>
    </div>
  );
};

export default GameMenu;
