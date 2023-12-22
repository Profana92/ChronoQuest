import { actionPointsNaturalRegeneration, healthPointsNaturalRegeneration } from "@/actions/playerActions";

import Message from "@/components/character/Message";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";
import { inboxMessageType } from "@/types/inboxMessageType";

const page = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id });
  const player = characterData?.playerData?.title;
  const intervalPerPoint = 60000;
  if (characterData?.playerData) {
    healthPointsNaturalRegeneration({ player, intervalPerPoint });
    actionPointsNaturalRegeneration({ player, intervalPerPoint });
  }

  const messages = characterData?.playerData?.inbox;
  const messagesList = messages.map((message: inboxMessageType) => {
    return (
      <Message
        key={message._id.toString()}
        message={JSON.stringify(message)}
        player={characterData?.playerData?.title}
      />
    );
  });
  messagesList.reverse();
  return <section className="p-5">{messagesList}</section>;
};

export default page;
