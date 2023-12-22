import { LeaderBoardDataFetch } from "@/actions/playerActions";

const page = async () => {
  const characterData = await LeaderBoardDataFetch();
  console.log(characterData);
  let playerList;
  if (characterData) {
    playerList = characterData.topPlayers.map((item) => <p key={item.playerName}>{item.playerName}</p>);
  }
  return <div>{playerList}</div>;
};

export default page;
