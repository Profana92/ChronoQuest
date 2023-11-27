export type CharacterDataType = {
  msg: string;
  userData: {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    player: string;
  };
  playerData: {
    health: {
      amount: number;
      maxAmount: number;
      lastUpdatedAt: Date;
    };
    companion: { companionName: string; companionType: string; xp: number; level: number };
    str: { amount: number; maxAmount: number };
    dex: { amount: number; maxAmount: number };
    int: { amount: number; maxAmount: number };
    cha: { amount: number; maxAmount: number };
    spd: { amount: number; maxAmount: number };
    acc: { amount: number; maxAmount: number };
    ap: {
      amount: number;
      maxAmount: number;
      lastUpdatedAt: Date;
    };
    _id: string;
    title: string;
    armor: number;
    level: number;
    xp: number;
    sex: string;
    gold: number;
    inbox: [];
    __v: number;
  };
};
