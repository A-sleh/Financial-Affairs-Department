import { useState } from "react";
import { Search } from "../inputs/Search";
import { MdAddCard } from "react-icons/md";
import AddNewUser from "../shared/AddNewUser";
import { AiOutlineUserAdd } from "react-icons/ai";

export const Navbar = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex justify-between items-center p-2 w-full shadow-md bg-white">
      <Search setValue={setValue} value={value} placeholder="البحث عن زبون" />
      <div className="flex gap-2 items-center">
        <button className="flex gap-2 items-center border-2 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all px-2 py-1 rounded-sm cursor-pointer">
          <MdAddCard size={22} />
          <p className="hidden lg:block"> إضافة فاتورة</p>
        </button>
        <AddNewUser
          openingButton={
            <button className="flex gap-2 items-center border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all px-2 py-1 rounded-sm cursor-pointer ml-1">
              <AiOutlineUserAdd size={22} />
              <p className="hidden lg:block"> إضافة زبون</p>
            </button>
          }
        />
      </div>
    </div>
  );
};
