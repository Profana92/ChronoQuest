"use client";

import { inboxMessageType } from "@/types/inboxMessageType";
import { removeMessageFromInbox } from "@/actions/playerActions";
import { useRouter } from "next/navigation";

const Message = ({ message, player }: { message: string; player: string }) => {
  const messageObj = JSON.parse(message) as inboxMessageType;
  const router = useRouter();
  return (
    <div className="border border-solid">
      <p>Sender: {messageObj?.sender}</p>
      <p>Message: {messageObj?.message}</p>
      {messageObj?.attachment ? <p>attachment: {messageObj?.sender}</p> : ""}
      <p
        onClick={async () => {
          await removeMessageFromInbox({ characterName: player, idToDelete: messageObj._id });
          router.refresh();
        }}
      >
        Delete Message
      </p>
    </div>
  );
};

export default Message;
