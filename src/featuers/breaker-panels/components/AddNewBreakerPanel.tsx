import { useState, type ReactNode } from "react";

import Input from "@/components/inputs/Input";
import Model from "@/components/model/Model";
import { IoCloseCircleOutline } from "react-icons/io5";

const OPEN_MODEL_KEY = "new-breaker-panel";

export default function AddNewBreakerPanel({
  openingButton,
}: {
  openingButton: ReactNode;
}) {
  const [name, setName] = useState("");

  return (
    <Model>
      <Model.Open opens={OPEN_MODEL_KEY}>{openingButton}</Model.Open>
      <Model.Window name={OPEN_MODEL_KEY}>
        <header className="flex justify-between items-center mb-4">
          <Model.Close>
            <button className="hover:text-red-600 transition-all cursor-pointer">
              <IoCloseCircleOutline size={25} />
            </button>
          </Model.Close>
          <h1 className="text-xl">أدخل معلومات اللوحة</h1>
        </header>
        <form action="" className="space-y-4" dir="rtl">
          {/* Row one ( name & phone number ) */}
          <div className="flex flex-col md:flex-row gap-5">
            <Input
              value={name}
              setValue={setName}
              type={"text"}
              label="عنوان اللوحة"
              required={true}
            />
            <Input
              value={name}
              setValue={setName}
              type={"text"}
              label="العدد الأعظمي لكمية الأمبيرات"
              required={true}
            />
          </div>
          <hr className="opacity-30" />
          <input
            type="submit"
            value="إضافة"
            className="px-4 py-1 w-full rounded-sm bg-primary text-white hover:opacity-65 transition-all cursor-pointer"
          />
        </form>
      </Model.Window>
    </Model>
  );
}
