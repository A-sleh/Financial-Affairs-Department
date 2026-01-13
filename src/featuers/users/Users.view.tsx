import { Table } from "@/components/tables/Table";

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
  ];
  return (
    <h1>
      <Table
        columns={columns}
        data={data}
        intialTotalRows={5}
      />
    </h1>
  );
}
