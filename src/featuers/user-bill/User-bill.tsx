import { Message } from "@/components/common/Message";
import { Search } from "@/components/inputs/Search";
import { useState } from "react";

export default function UserBill() {
  const [userName, setUserName] = useState("");
  const [userBills, setUserBills] = useState([
    {
      data: "2025-1-1",
      price: "300,000",
      payed_price: "0",
      statue: "no-paid",
    },
    {
      data: "2025-1-1",
      price: "300,000",
      payed_price: "0",
      statue: "no-paid",
    },
    {
      data: "2025-1-1",
      price: "300,000",
      payed_price: "0",
      statue: "npaid",
    },
  ]);

  return (
    <section className="space-y-3">
      <form action="" className="flex gap-1 items-center float-left">
        <Search
          value={userName}
          setValue={setUserName}
          placeholder="اسم الزبون"
          type="secondary"
        />
        <input
          type="submit"
          value="بحث"
          className="px-3 py-0.5 rounded-sm bg-primary text-white cursor-pointer"
        />
      </form>
      <section className="m-1">
        <h1 className="border-b-2 border-b-primary py-2 text-2xl mb-3">
          الفواتير
        </h1>
        {userBills.length ? (
          <div className="flex flex-col gap-2">
            {userBills.map((bill, Idx) => {
              const isPaid = bill.statue == "npaid";
              return (
                <div
                  key={Idx}
                  className={`p-2 flex items-center justify-between ${isPaid ? "bg-green-400/30" : "bg-red-400/30"}`}
                >
                  <h1 className="text-xl">
                    <b>{Idx + 1}. </b>
                    فاتورة <b>{new Date(bill.data).toLocaleDateString()}</b>
                    المبلغ الإجمالي <b> {bill.price} </b>
                    المبلغ المدفوع <b>{bill.payed_price}</b>
                  </h1>
                  <button
                    disabled={isPaid}
                    className={`px-2 cursor-pointer rounded-sm text-white ${isPaid ? "bg-green-400" : "bg-red-400"}`}
                    style={{
                      cursor: isPaid ? "not-allowed" : "",
                    }}
                  >
                    {isPaid ? "مسددة" : "تسديد"}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <Message
            message="أدخل اسم الزبون في حقل البحث ليتم عرض الفواتير المترتبة علية"
            type="info"
          />
        )}
      </section>
    </section>
  );
}
