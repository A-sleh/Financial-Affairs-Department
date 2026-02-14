import { useState } from "react";

import { Search } from "@/components/inputs/Search";
import { FaPlus } from "react-icons/fa6";
import BreackerPanelCard from "./components/BreackerPanelCard";
import AddNewBreakerPanel from "./components/AddNewBreakerPanel";
import getAllBreakerPannels from "./api/get-breaker-pannels";
import SkeletonBreakerPannel from "@/components/skeleton/Breaker-pannel-container.sk";

export default function BreakerPanels() {
  const { breakerPannels, isLoading } = getAllBreakerPannels();
  const [name, setName] = useState("");

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <Search
          type="secondary"
          placeholder="بحث"
          value={name}
          setValue={setName}
        />
        <h3 className="hidden md:block text-2xl self-end before:content-['--'] after:content-['--'] before:text-primary after:text-primary ">
          يوجد <b>{breakerPannels?.length}</b> لوحات
        </h3>
        <AddNewBreakerPanel
          openingButton={
            <button className="flex gap-2 items-center border-2 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all px-2 py-1 rounded-sm cursor-pointer">
              <FaPlus size={22} />
              <p className="hidden lg:block"> إضافة علبة</p>
            </button>
          }
        />
      </header>
      <div className="flex gap-4 flex-wrap">
        {isLoading ? (
          <SkeletonBreakerPannel />
        ) : (
          breakerPannels?.map((breakerPannel, Idx) => {
            return (
              <BreackerPanelCard key={Idx} breakerPannel={breakerPannel} />
            );
          })
        )}
      </div>
    </section>
  );
}
