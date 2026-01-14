import { useState } from "react";

import { Search } from "@/components/inputs/Search";
import { FaPlus } from "react-icons/fa6";
import BreackerPanelCard from "./components/BreackerPanelCard";
import AddNewBreakerPanel from "./components/AddNewBreakerPanel";

export default function BreakerPanels() {
  const [name,setName] = useState('')
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <Search type="secondary" placeholder="بحث" value={name} setValue={setName} />
        <h3 className="text-2xl self-end before:content-['--'] after:content-['--'] before:text-primary after:text-primary ">يوجد <b>10</b> لوحات</h3>
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
        <BreackerPanelCard />
        <BreackerPanelCard />
        <BreackerPanelCard />
        <BreackerPanelCard />
        <BreackerPanelCard />
      </div>
    </section>
  );
}
