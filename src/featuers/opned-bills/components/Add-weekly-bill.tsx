import { useState, type ReactNode } from "react";

import Input from "@/components/inputs/Input";
import Model from "@/components/model/Model";
import { IoCloseCircleOutline } from "react-icons/io5";
import { getCurrentDate } from "@/utils/helpers";

const OPEN_MODEL_KEY = "add-weekly-bill";

export default function AddWeeklyBill({
  openingButton,
  intialState = null,
}: {
  openingButton: ReactNode;
  intialState?: any;
}) {
  const [name, setName] = useState(intialState);
  const [manulPickDate, setManulPickDate] = useState(false);

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
          <h1 className="text-xl">أدخل معلومات الفاتورة</h1>
        </header>
        <form action="" className="space-y-4" dir="rtl">
          {/* Row one ( amper & counter price ) */}
          <div className="flex flex-col md:flex-row gap-5">
            <Input
              value={name}
              setValue={setName}
              type={"number"}
              label="سعر الأمبير الواحد"
              required={true}
            />
            <Input
              value={name}
              setValue={setName}
              type={"number"}
              label="سعر الكيلو للعداد"
              required={true}
            />
          </div>
          <div className="w-full">
            <Input
              value={name}
              setValue={setName}
              type={"date"}
              label="تاريخ الفاتورة"
              required={true}
              disabled={manulPickDate}
            />
            <label
              htmlFor="data-picker"
              className="flex items-center gap-1 cursor-pointer mt-1"
              onClick={() => setName(getCurrentDate())}
            >
              <input
                type="checkbox"
                checked={manulPickDate}
                onChange={(e) => setManulPickDate(e.target.checked)}
                id="data-picker"
                className="mt-1"
              />
              تحديد تاريخ اليوم
            </label>
          </div>
          <hr className="opacity-30" />
          <input
            type="submit"
            value={intialState ? "تعديل" : "إضافة"}
            className="px-4 py-1 w-full rounded-sm bg-primary text-white hover:opacity-65 transition-all cursor-pointer"
          />
        </form>
      </Model.Window>
    </Model>
  );
}
