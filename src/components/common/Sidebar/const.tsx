import { IoStatsChart } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa6";

const ICON_SIZE = 25;

export const sidebarLinks = [
  {
    path: "statistics",
    icon: <IoStatsChart size={ICON_SIZE} />,
    text: "الإحصائيات",
  },
  {
    path: "billing",
    icon: <FaMoneyBillTrendUp size={ICON_SIZE} />,
    text: "الفواتير",
  },
  {
    path: "users",
    icon: <FaUsersCog size={ICON_SIZE} />,
    text: "المستخدمين",
  },
  {
    path: "breaker-panels",
    icon: <FaSwatchbook size={ICON_SIZE} />,
    text: "لوحات الأمبيرات",
  },
  {
    path: "setting",
    icon: <IoSettingsSharp size={ICON_SIZE} />,
    text: "إعدادات",
  },
];
