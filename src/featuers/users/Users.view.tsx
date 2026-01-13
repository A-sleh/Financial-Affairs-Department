import Table from "@/components/tables/Table";
import { Card } from "./components/Card";

import { LiaUsersCogSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";
import { TbUserShare } from "react-icons/tb";
import { SiElectron } from "react-icons/si";
import { TfiPanel } from "react-icons/tfi";

export default function Users() {
  const columns = [
    { Header: "المعرف", accessor: "id" },
    { Header: "الأسم", accessor: "name" },
    { Header: "رقم الهاتف", accessor: "phone" },
    { Header: "نوع الأشتلراك", accessor: "sucscrib_type" },
    { Header: "الكمية", accessor: "amount" },
    { Header: "العلبة", accessor: "breaker_panel" },
    { Header: "المبلغ المترتب عليه", accessor: "total_cost_should_payed" },
    { Header: "عدد الأسابيع المتراكمة", accessor: "total_weeks_missed" },
  ];
  const data = [
    {
      id: "مشترك_001",
      name: "أحمد محمود",
      phone: "0599123456",
      sucscrib_type: "أسبوعي",
      amount: "5 كجم",
      breaker_panel: "علبة A",
      total_cost_should_payed: "200 ريال",
      total_weeks_missed: "2",
    },
    {
      id: "مشترك_002",
      name: "سارة خالد",
      phone: "0567234890",
      sucscrib_type: "شهري",
      amount: "10 كجم",
      breaker_panel: "علبة B",
      total_cost_should_payed: "450 ريال",
      total_weeks_missed: "0",
    },
    {
      id: "مشترك_003",
      name: "محمد علي",
      phone: "0555678321",
      sucscrib_type: "يومي",
      amount: "3 كجم",
      breaker_panel: "علبة C",
      total_cost_should_payed: "120 ريال",
      total_weeks_missed: "5",
    },
    {
      id: "مشترك_004",
      name: "فاطمة عمر",
      phone: "0544987654",
      sucscrib_type: "أسبوعي",
      amount: "7 كجم",
      breaker_panel: "علبة A",
      total_cost_should_payed: "280 ريال",
      total_weeks_missed: "1",
    },
    {
      id: "مشترك_005",
      name: "خالد سعيد",
      phone: "0501122334",
      sucscrib_type: "شهري",
      amount: "15 كجم",
      breaker_panel: "علبة D",
      total_cost_should_payed: "600 ريال",
      total_weeks_missed: "3",
    },
    {
      id: "مشترك_006",
      name: "نورة عبدالله",
      phone: "0598877665",
      sucscrib_type: "أسبوعي",
      amount: "4 كجم",
      breaker_panel: "علبة B",
      total_cost_should_payed: "160 ريال",
      total_weeks_missed: "0",
    },
    {
      id: "مشترك_007",
      name: "يوسف راشد",
      phone: "0566554433",
      sucscrib_type: "يومي",
      amount: "2 كجم",
      breaker_panel: "علبة C",
      total_cost_should_payed: "80 ريال",
      total_weeks_missed: "7",
    },
    {
      id: "مشترك_008",
      name: "لينا وليد",
      phone: "0544321567",
      sucscrib_type: "شهري",
      amount: "12 كجم",
      breaker_panel: "علبة D",
      total_cost_should_payed: "480 ريال",
      total_weeks_missed: "2",
    },
    {
      id: "مشترك_009",
      name: "طارق حسن",
      phone: "0509876543",
      sucscrib_type: "أسبوعي",
      amount: "6 كجم",
      breaker_panel: "علبة A",
      total_cost_should_payed: "240 ريال",
      total_weeks_missed: "4",
    },
    {
      id: "مشترك_010",
      name: "هديل كمال",
      phone: "0597766554",
      sucscrib_type: "يومي",
      amount: "3.5 كجم",
      breaker_panel: "علبة B",
      total_cost_should_payed: "140 ريال",
      total_weeks_missed: "6",
    },
    {
      id: "مشترك_001",
      name: "أحمد محمود",
      phone: "0599123456",
      sucscrib_type: "أسبوعي",
      amount: "5 كجم",
      breaker_panel: "علبة A",
      total_cost_should_payed: "200 ريال",
      total_weeks_missed: "2",
    },
    {
      id: "مشترك_002",
      name: "سارة خالد",
      phone: "0567234890",
      sucscrib_type: "شهري",
      amount: "10 كجم",
      breaker_panel: "علبة B",
      total_cost_should_payed: "450 ريال",
      total_weeks_missed: "0",
    },
    {
      id: "مشترك_003",
      name: "محمد علي",
      phone: "0555678321",
      sucscrib_type: "يومي",
      amount: "3 كجم",
      breaker_panel: "علبة C",
      total_cost_should_payed: "120 ريال",
      total_weeks_missed: "5",
    },
    {
      id: "مشترك_004",
      name: "فاطمة عمر",
      phone: "0544987654",
      sucscrib_type: "أسبوعي",
      amount: "7 كجم",
      breaker_panel: "علبة A",
      total_cost_should_payed: "280 ريال",
      total_weeks_missed: "1",
    },
    {
      id: "مشترك_005",
      name: "خالد سعيد",
      phone: "0501122334",
      sucscrib_type: "شهري",
      amount: "15 كجم",
      breaker_panel: "علبة D",
      total_cost_should_payed: "600 ريال",
      total_weeks_missed: "3",
    },
    {
      id: "مشترك_006",
      name: "نورة عبدالله",
      phone: "0598877665",
      sucscrib_type: "أسبوعي",
      amount: "4 كجم",
      breaker_panel: "علبة B",
      total_cost_should_payed: "160 ريال",
      total_weeks_missed: "0",
    },
    {
      id: "مشترك_007",
      name: "يوسف راشد",
      phone: "0566554433",
      sucscrib_type: "يومي",
      amount: "2 كجم",
      breaker_panel: "علبة C",
      total_cost_should_payed: "80 ريال",
      total_weeks_missed: "7",
    },
    {
      id: "مشترك_008",
      name: "لينا وليد",
      phone: "0544321567",
      sucscrib_type: "شهري",
      amount: "12 كجم",
      breaker_panel: "علبة D",
      total_cost_should_payed: "480 ريال",
      total_weeks_missed: "2",
    },
    {
      id: "مشترك_009",
      name: "طارق حسن",
      phone: "0509876543",
      sucscrib_type: "أسبوعي",
      amount: "6 كجم",
      breaker_panel: "علبة A",
      total_cost_should_payed: "240 ريال",
      total_weeks_missed: "4",
    },
    {
      id: "مشترك_010",
      name: "هديل كمال",
      phone: "0597766554",
      sucscrib_type: "يومي",
      amount: "3.5 كجم",
      breaker_panel: "علبة B",
      total_cost_should_payed: "140 ريال",
      total_weeks_missed: "6",
    },
  ];
  return (
    <section>
      <header className="flex flex-wrap gap-5 my-4">
        <Card
          title="مشتركين المقطوعه"
          value="100"
          icon={<LiaUsersCogSolid />}
          iconColor="#df0f0f"
        />
        <Card
          title="مشتركين العدادات"
          value="30"
          icon={<TbUserShare />}
          iconColor="#df8c0f"
        />
        <Card
          title="عدد الأمبيرات المباعه"
          value="400"
          icon={<SiElectron />}
          iconColor="#0fdf0f"
        />
        <Card
          title="عدد اللوحات الموزعة"
          value="13"
          icon={<TfiPanel />}
          iconColor="#700fdf"
        />
      </header>
      <Table columns={columns} data={data} intialTotalRows={5}>
        <div className="flex items-center justify-between mx-2">
          <div className="flex gap-2">
            <Table.RowsControlers />
            <Table.Search />
          </div>
          <div className="flex gap-2">
            <Table.FilterList />
            <button className="flex gap-2 items-center border-2 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all px-2 py-1 rounded-sm cursor-pointer">
              <FaPlus size={22} />
              <p className="hidden lg:block"> إضافة زبون</p>
            </button>
          </div>
        </div>
        <Table.ReactTable />
        <Table.PagesControlers />
      </Table>
    </section>
  );
}
