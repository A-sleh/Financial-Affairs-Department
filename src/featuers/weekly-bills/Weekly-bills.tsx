import Table from "@/components/tables/Table";
import { MdAddCard } from "react-icons/md";

export default function WeeklyBills() {
  const columns = [
    { Header: "اسم الزبون", accessor: "bill_date" },
    { Header: "تاريخ الفاتورة", accessor: "amper_price" },
    { Header: "المبلغ المطلوب", accessor: "counter_privce_per_K" },
    { Header: "المبلغ المسدد", accessor: "total_price" },
    { Header: "تاريخ التسديد", accessor: "recived_price" },
    {
      Header: "إجرائيات",
      accessor: "action",
      Cell: ({ row }: { row: any }) => (
        <div className="flex gap-1 items-center text-2xl">
          <MdAddCard className="p-1 rounded-full text-blue-600 hover:bg-blue-600/20" />
        </div>
      ),
    },
  ];
  const test = [
    {
      id: 1,
      amper_price: "2.5 دينار",
      counter_privce_per_K: "0.05 دينار",
      total_price: "150 دينار",
      recived_price: "150 دينار",
      bill_date: "2025-22-1",
    },
    {
      id: 2,
      amper_price: "3.0 دينار",
      counter_privce_per_K: "0.06 دينار",
      total_price: "225 دينار",
      recived_price: "200 دينار",
      bill_date: "2025-22-5",
    },
    {
      id: 3,
      amper_price: "2.0 دينار",
      counter_privce_per_K: "0.04 دينار",
      total_price: "120 دينار",
      recived_price: "80 دينار",
      bill_date: "2025-1-1",
    },
    {
      id: 4,
      amper_price: "2.8 دينار",
      counter_privce_per_K: "0.055 دينار",
      total_price: "180 دينار",
      recived_price: "180 دينار",
      bill_date: "2025-2-1",
    },
    {
      id: 5,
      amper_price: "3.5 دينار",
      counter_privce_per_K: "0.07 دينار",
      total_price: "300 دينار",
      recived_price: "250 دينار",
      bill_date: "2025-3-1",
    },
    {
      id: 6,
      amper_price: "2.2 دينار",
      counter_privce_per_K: "0.045 دينار",
      total_price: "135 دينار",
      recived_price: "100 دينار",
      bill_date: "2025-4-1",
    },
    {
      id: 7,
      amper_price: "2.7 دينار",
      counter_privce_per_K: "0.052 دينار",
      total_price: "195 دينار",
      recived_price: "195 دينار",
      bill_date: "2025-5-1",
    },
    {
      id: 8,
      amper_price: "3.2 دينار",
      counter_privce_per_K: "0.065 دينار",
      total_price: "260 دينار",
      recived_price: "200 دينار",
      bill_date: "2025-6-1",
    },
    {
      id: 9,
      amper_price: "2.4 دينار",
      counter_privce_per_K: "0.048 دينار",
      total_price: "165 دينار",
      recived_price: "120 دينار",
      bill_date: "2025-22-1",
    },
    {
      id: 10,
      amper_price: "2.9 دينار",
      counter_privce_per_K: "0.058 دينار",
      total_price: "210 دينار",
      recived_price: "210 دينار",
      bill_date: "2025-22-12",
    },
  ];
  let data: any[] = [];
  for (let i = 25; i > 0; --i) {
    data = [...data, ...test];
  }
  return (
    <section>
      <Table columns={columns} data={data} intialTotalRows={5}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mx-2">
          <div className="flex gap-2 max-sm:w-full">
            <Table.RowsControlers />
            <Table.Search />
          </div>
          <div className="flex gap-2 max-sm:w-full">
            <Table.FilterList />
          </div>
        </div>
        <Table.ReactTable />
        <Table.PagesControlers />
      </Table>
    </section>
  );
}
