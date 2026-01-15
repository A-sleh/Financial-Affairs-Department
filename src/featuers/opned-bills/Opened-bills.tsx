import Table from "@/components/tables/Table";
import AddWeeklyBill from "./components/Add-weekly-bill";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const OpendedBills = () => {
  const columns = [
    { Header: "تاريخ الفاتورة", accessor: "bill_date" },
    { Header: "سعر الأمبير الواحد", accessor: "amper_price" },
    { Header: "سعر الكيلو للعداد", accessor: "counter_privce_per_K" },
    { Header: "المبلغ الإجمالي", accessor: "total_price" },
    { Header: "المبلغ المسدد", accessor: "recived_price" },
    {
      Header: "إجرائيات",
      accessor: "action",
      Cell: ({ row }: { row: any }) => (
        <div className="flex gap-1 items-center text-2xl">
          <MdOutlineDeleteOutline className="p-1 rounded-full text-red-600 hover:bg-red-600/20" />
          <span className="h-3.75 mx-2 w-px bg-primary"></span>
          <AddWeeklyBill
            intialState={row.original}
            openingButton={
              <FaPenToSquare className="p-1 rounded-full text-blue-600 hover:bg-blue-600/20" />
            }
          />
        </div>
      ),
    },
  ];
  const data = [
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

  return (
    <section >
      <Table columns={columns} data={data} intialTotalRows={5}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mx-2">
          <div className="flex gap-2 max-sm:w-full">
            <Table.RowsControlers />
            <Table.Search />
          </div>
          <div className="flex gap-2 max-sm:w-full">
            <Table.FilterList />
            <AddWeeklyBill
              openingButton={
                <button className="flex gap-2 items-center border-2 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all px-2 py-1 rounded-sm cursor-pointer">
                  <FaPlus size={22} />
                  <p className="hidden lg:block"> انشاء فاتورة</p>
                </button>
              }
            />
          </div>
        </div>
        <Table.ReactTable />
        <Table.PagesControlers />
      </Table>
    </section>
  );
};

export default OpendedBills;
