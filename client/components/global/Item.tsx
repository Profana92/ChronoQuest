import Image from "next/image";

const Item = ({ itemData }) => {
  if (itemData)
    return (
      <div className="w-24 h-24 relative group bg-Tetriary ">
        <Image
          src={itemData?.image}
          alt={itemData?.itemName}
          fill={true}
          className={`border border-solid ${
            itemData?.rarity === 0
              ? "border-gray-400"
              : itemData?.rarity === 1
              ? "border-green-400"
              : itemData?.rarity === 2
              ? "border-blue-600"
              : itemData?.rarity === 3
              ? "border-purple-600"
              : itemData?.rarity === 4
              ? "border-orange-400"
              : ""
          }`}
        />

        <div
          className={`z-10 w-[200%] min-h-full left-full absolute p-5 bg-Tetriary hidden group-hover:flex border border-solid flex-col ${
            itemData?.rarity === 0
              ? "border-gray-400"
              : itemData?.rarity === 1
              ? "border-green-400"
              : itemData?.rarity === 2
              ? "border-blue-600"
              : itemData?.rarity === 3
              ? "border-purple-600"
              : itemData?.rarity === 4
              ? "border-orange-400"
              : ""
          }`}
        >
          <p>{itemData.itemName}</p>
          <p
            className={`${
              itemData?.rarity === 0
                ? "text-gray-400"
                : itemData?.rarity === 1
                ? "text-green-400"
                : itemData?.rarity === 2
                ? "text-blue-600"
                : itemData?.rarity === 3
                ? "text-purple-600"
                : itemData?.rarity === 4
                ? "text-orange-400"
                : ""
            }`}
          >
            {itemData?.rarity === 0
              ? "Common"
              : itemData?.rarity === 1
              ? "Uncommon"
              : itemData?.rarity === 2
              ? "Rare"
              : itemData?.rarity === 3
              ? "Epic"
              : "Legendary"}
          </p>
          <p>Slot: {itemData?.slot}</p>
          <p>Item Level: {itemData?.itemLevel}</p>
          <div className="">
            {itemData?.stats?.attack ? (
              <p>
                Attack: {itemData?.stats?.attack?.from}-{itemData?.stats?.attack?.to}
              </p>
            ) : (
              ""
            )}
            {itemData?.stats?.armor ? <p>Armor: {itemData?.stats?.armor}</p> : ""}
            <p>Strength: {itemData?.stats?.str}</p>
            <p>Dexterity: {itemData?.stats?.dex}</p>
            <p>Intelligence: {itemData?.stats?.int}</p>
            <p>Charisma: {itemData?.stats?.cha}</p>
            <p>Speed: {itemData?.stats?.spd}</p>
            <p>Accuracy: {itemData?.stats?.acc}</p>
            <p>Value: {itemData?.basisValue} Gold</p>
          </div>
        </div>
      </div>
    );
  return <div className="w-24 h-24 relative group bg-Tetriary border border-solid border-white"></div>;
};

export default Item;
