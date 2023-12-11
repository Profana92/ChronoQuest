"use client";

import { moveMessageAttachmentToInventory, removeMessageFromInbox } from "@/actions/playerActions";

import Item from "../global/Item";
import { inboxMessageType } from "@/types/inboxMessageType";
import { useRouter } from "next/navigation";

const Message = ({ message, player }: { message: string; player: string }) => {
  const messageObj = JSON.parse(message) as inboxMessageType;
  const router = useRouter();
  return (
    <div className="border border-solid">
      <p>Sender: {messageObj?.sender}</p>
      <p>Message: {messageObj?.message}</p>
      {messageObj?.attachment ? <Item itemData={messageObj?.attachment} /> : ""}
      {messageObj?.attachment ? (
        <p
          onClick={async () => {
            await moveMessageAttachmentToInventory({
              characterName: player,
              itemToMove: messageObj.attachment,
              idToDelete: messageObj._id,
            });
            router.refresh();
          }}
        >
          Move item into inventory
        </p>
      ) : (
        ""
      )}
      <p
        onClick={async () => {
          await removeMessageFromInbox({ characterName: player, idToDelete: messageObj._id });
          router.refresh();
        }}
      >
        Delete message
      </p>
    </div>
  );
};

export default Message;
