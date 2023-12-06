import Message from "@/components/character/Message";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";
import { inboxMessageType } from "@/types/inboxMessageType";

const page = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id, playerName: session?.user?.player });
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

  return <section className="p-5">{messagesList}</section>;
};

export default page;
