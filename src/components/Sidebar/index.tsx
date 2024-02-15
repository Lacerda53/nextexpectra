import { FunctionComponent } from "react";
import { RxGear, RxLightningBolt } from "react-icons/rx";

export const Sidebar: FunctionComponent = () => {
  return (
    <div className="w-21 bg-[#15161E]/95 text-2xl p-6 px-6 items-center text-gray-300/30 hidden justify-between md:flex md:flex-col">
      <div className="cursor-pointer shadow">
        <RxLightningBolt className="text-white/80" />
      </div>

      <div className="cursor-pointer">
        <RxGear />
      </div>
    </div>
  );
};
