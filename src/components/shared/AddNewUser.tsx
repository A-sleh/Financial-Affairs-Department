import { useState, type ReactNode } from "react";

import Input from "../inputs/Input";
import Model from "../model/Model";
import { IoCloseCircleOutline } from "react-icons/io5";
import Selector from "../inputs/Selector";
import TabsAsCheckBox from "../inputs/TabsAsCheckBox";

export default function AddNewUser({
  openingButton,
}: {
  openingButton: ReactNode;
}) {
  const [name, setName] = useState("");
  const subscribTypeSelected: string = "switcher";

  return (
    <Model>
      <Model.Open opens="new-user">{openingButton}</Model.Open>
      <Model.Window name="new-user">
        <header className="flex justify-between items-center mb-4">
          <Model.Close>
            <button className="hover:text-red-600 transition-all cursor-pointer">
              <IoCloseCircleOutline size={25} />
            </button>
          </Model.Close>
          <h1 className="text-xl">أدخل معلومات الزبون</h1>
        </header>
        <form action="" className="space-y-4" dir="rtl">
          {/* Row one ( name & phone number ) */}
          <div className="flex gap-5">
            <Input
              value={name}
              setValue={setName}
              type={"text"}
              label="اسم الزبون"
              required={true}
            />
            <Input
              value={name}
              setValue={setName}
              type={"text"}
              label="رقم الهاتف"
              required={true}
            />
          </div>

          {/* Row Two ( breaker panel position ) */}
          <div className="flex gap-5">
            <Selector value={name} setValue={setName} label="تحديد مكان اللوحة">
              <option value="hello">hello</option>
              <option value="hello">hello</option>
            </Selector>
          </div>

          {/* Row Three ( Subscrib type & amount ) */}
          <div className="flex gap-5">
            <TabsAsCheckBox
              values={[
                {
                  title: "مقطوعه",
                  value: "switcher",
                },
                {
                  title: "عداد",
                  value: "counter",
                },
              ]}
              value={name}
              required={true}
              setValue={setName}
              label="نوع الأشتراك"
            />
            <Input
              value={name}
              setValue={setName}
              type={"number"}
              label={
                subscribTypeSelected === "counter"
                  ? "القيمة السابقة للعداد"
                  : "كمية الأشتراك"
              }
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
