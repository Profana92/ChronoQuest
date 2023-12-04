import GameMenu from "@/components/global/GameMenu";

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-14 grid grid-cols-[288px_1fr] grid-rows-[56px_1fr] gap-4">
      <div className="col-span-2">
        <GameMenu />
      </div>
      <div className="">3</div>
      <div className="">{children}</div>
    </div>
  );
}
