import Link from "next/link";

const GameMenu = () => {
  const menuFirstSectionData = [
    { link: "/game/overview", title: "Overview" },
    { link: "/game/messages", title: "Messages" },
    { link: "/game/leaderboard", title: "Leaderboard" },
    { link: "/game/arena", title: "Arena" },
  ];
  const menuSecondSectionData = [
    { link: "/game/armory", title: "Armory" },
    { link: "/game/geneticslab", title: "Genetics Lab" },
    { link: "/game/refinery", title: "Refinery" },
    { link: "/game/timeshop", title: "Time Shop" },
  ];
  const menuThirdSectionData = [
    { link: "/game/stoneage", title: "Stone Age" },
    { link: "/game/bronzeage", title: "Bronze Age" },
    { link: "/game/ironage", title: "Iron Age" },
    { link: "/game/classicaltimes", title: "Classical Times" },
    { link: "/game/medievaltimes", title: "Medieval Times" },
    { link: "/game/modernera", title: "Modern Times" },
    { link: "/game/spacera", title: "Space Era" },
    { link: "/game/timetravelera", title: "Time Travel Era" },
  ];
  const menuFirstSectionContent = menuFirstSectionData.map((item) => {
    return (
      <Link key={item.title} href={item.link}>
        <li>{item.title}</li>
      </Link>
    );
  });
  const menuSecondSectionContent = menuSecondSectionData.map((item) => {
    return (
      <Link key={item.title} href={item.link}>
        <li>{item.title}</li>
      </Link>
    );
  });
  const menuThirdSectionContent = menuThirdSectionData.map((item) => {
    return (
      <Link key={item.title} href={item.link}>
        <li>{item.title}</li>
      </Link>
    );
  });
  return (
    <div className="absolute w-72 h-[calc(100%-56px)] p-5">
      <ul>
        {menuFirstSectionContent}
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        {menuSecondSectionContent}
      </ul>
      <div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <p>Expeditions</p>
        <ul> {menuThirdSectionContent}</ul>
      </div>
    </div>
  );
};

export default GameMenu;
