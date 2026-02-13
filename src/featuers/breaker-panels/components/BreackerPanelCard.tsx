import { Card } from "@/components/shared/Card";
import { SiElectron } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { LiaUsersCogSolid } from "react-icons/lia";
import { AiTwotoneContainer } from "react-icons/ai";
import { Link } from "react-router";
import type { IBreakerPannel } from "../api/get-breaker-pannels";

export default function BreackerPanelCard({
  breakerPannel,
}: {
  breakerPannel: IBreakerPannel;
}) {
  const {
    breaker_pannel_id,
    location,
    max_breakers,
    total_ameper,
    total_counter_users,
    total_users,
  } = breakerPannel;

  return (
    <div className=" bg-white rounded-md rounded-bl-none rounded-br-none shadow-[0_2px_5px_rgb(0,0,0,0.1)] border border-primary flex-1">
      <h1 className="p-4 mx-6 text-2xl text-center">{location}</h1>
      <header className="flex flex-col gap-2 px-2">
        <Card
          title="إجمالي المشتركين"
          value={total_users}
          icon={<FaUsers />}
          iconColor="#fc7100"
          variant="small"
        />
        <Card
          title="عدد الأمبيرات ضمن اللوحة"
          value={total_ameper}
          icon={<SiElectron />}
          iconColor="#223344"
          variant="small"
        />
        <Card
          title="عدد مشتركي العداد"
          value={total_counter_users}
          icon={<LiaUsersCogSolid />}
          iconColor="#400094"
          variant="small"
        />
        <Card
          title="عدد الأمبيرات التقريبي المخصص"
          value={max_breakers}
          icon={<AiTwotoneContainer />}
          iconColor="#00be29"
          variant="small"
        />
      </header>
      <Link to={"user/" + breaker_pannel_id}>
        <button className="w-full px-2 py-1 bg-primary text-white hover:bg-white hover:text-primary transition-all border-t border-primary mt-3 cursor-pointer">
          عرض تفاصيل اللوحة
        </button>
      </Link>
    </div>
  );
}
