import Table from "@/components/tables/Table";
import { useState } from "react";
import { Card } from "@/components/shared/Card";
import { useNavigate, useParams } from "react-router";
import { AiTwotoneContainer } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { LiaUsersCogSolid } from "react-icons/lia";
import { SiElectron } from "react-icons/si";
import { FaExchangeAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import type { Column } from "react-table";
import { useGetBreakerPannelDetails } from "./api/get-breaker-pannel";
import ChangeUserPannel from "@/components/shared/Change-user-pannel.model";
import UpdateBreakerPannelModel from "@/components/shared/Breaker-pannel-form.model";
import { Message } from "@/components/common/Message";
import { useDeleteBreakerPannel } from "./api/delete-pannel-action";
import { ErrorMessageToast, SuccessMessageToast } from "@/utils/dialogs";
import ConfirmDetelteModel from "@/components/model/Confirm-delelte.model";
import { useQueryClient } from "@tanstack/react-query";

export default function BreakerPanel() {
  const goto = useNavigate();
  const queryClient = useQueryClient();
  const { id: breaker_pannel_id } = useParams();
  const [unableToDeletePannel, setUnableToDeletePannel] = useState(false);
  const { mutate: deletePannel, isPending } = useDeleteBreakerPannel();
  const { breakerPannelDetails, isLoading } = useGetBreakerPannelDetails(
    Number(breaker_pannel_id),
  );

  const handleDeleteBreakerPannel = () => {
    if (Number(breakerPannelDetails?.users.length) > 0) {
      setUnableToDeletePannel(true);
      setTimeout(() => setUnableToDeletePannel(false), 3000);
    } else {
      deletePannel(Number(breaker_pannel_id), {
        onSuccess: () => {
          SuccessMessageToast("تم حذف اللوحة بنجاح");
          goto("/breaker-panels", { replace: true });
          queryClient.invalidateQueries({
            queryKey: ["breaker-pannels-stats"],
          });
          queryClient.invalidateQueries({
            queryKey: ["breaker-pannels"],
          });
        },
        onError: () => {
          ErrorMessageToast("حدث خطأ اثناء الحذف");
        },
      });
    }
  };

  const columns: Column[] = [
    { Header: "المعرف", accessor: "user_id" },
    { Header: "الأسم", accessor: "full_name" },
    { Header: "رقم الهاتف", accessor: "phone" },
    {
      Header: "نوع الأشتلراك",
      accessor: "subscribe_type",
      Cell: ({ row: { original } }) =>
        //@ts-ignore
        original?.subscribe_type == "counter" ? "عداد" : "قاطع",
    },

    {
      Header: "الكمية",
      accessor: "quantity",
      Cell: ({ row: { original } }) =>
        //@ts-ignore
        !original?.quantity
          ? "---"
          : //@ts-ignore
            `${original?.quantity} ${Number(original?.quantity) > 1 ? "أمبيرات" : "امبير"}`,
    },
    {
      Header: "قيمة العداد الأولية",
      accessor: "counter_intial_value",
      Cell: ({ row: { original } }) =>
        //@ts-ignore
        !original?.counter_intial_value
          ? "---"
          : //@ts-ignore
            original?.counter_intial_value,
    },
    {
      Header: "نقل الى علبة ثانيه",
      Cell: ({ row: { original } }) => {
        return (
          <ChangeUserPannel
            //@ts-ignore
            user_id={original.user_id}
            breaker_pannel_id={breaker_pannel_id}
            openingButton={
              <FaExchangeAlt
                className="text-blue-500 ml-3 w-full"
                size={20}
                title="تحديد العلبة"
              />
            }
          />
        );
      },
    },
  ];

  return (
    <section>
      {unableToDeletePannel && (
        <Message
          message="لايمكنك حذف اللوحة, يجب ان تكون خالية من المشتركين"
          type="error"
        />
      )}
      <header className="flex flex-wrap gap-5 my-4 max-sm:ml-4">
        <Card
          title="إجمالي المشتركين"
          value={breakerPannelDetails?.total_users}
          icon={<FaUsers />}
          iconColor="#fc7100"
          variant="medium"
          loadingValue={isLoading}
        />
        <Card
          title="عدد الأمبيرات ضمن اللوحة"
          value={breakerPannelDetails?.total_ameper}
          icon={<SiElectron />}
          iconColor="#223344"
          variant="medium"
          loadingValue={isLoading}
        />
        <Card
          title="عدد مشتركي العداد"
          value={breakerPannelDetails?.total_counter_users}
          icon={<LiaUsersCogSolid />}
          iconColor="#400094"
          variant="medium"
          loadingValue={isLoading}
        />
        <Card
          title="عدد الأمبيرات التقريبي المخصص"
          value={breakerPannelDetails?.max_breakers}
          icon={<AiTwotoneContainer />}
          iconColor="#00be29"
          variant="medium"
          loadingValue={isLoading}
        />
      </header>

      <Table
        columns={columns}
        data={breakerPannelDetails?.users || []}
        intialTotalRows={5}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mx-2">
          <div className="flex gap-2 max-sm:w-full">
            <Table.RowsControlers />
            <Table.Search />
          </div>
          <h3 className="hidden md:block text-2xl self-end before:content-['--'] after:content-['--'] before:text-primary after:text-primary ">
            {breakerPannelDetails?.location}
          </h3>
          <div className="flex gap-1">
            <ConfirmDetelteModel
              delete_message={`هذا الحدث سيؤدي الى حذف اللوحة ${breakerPannelDetails?.location}, يمكنك التراجع بالنقر على الغاء `}
              item_id={Number(breaker_pannel_id)}
              onConfirme={handleDeleteBreakerPannel}
              openButton={
                <button
                  disabled={isPending}
                  className="flex gap-2 items-center border-2 border-red-400 bg-red-400 text-white hover:bg-transparent hover:text-red-400 transition-all px-2 py-1 rounded-sm cursor-pointer"
                >
                  <AiOutlineDelete size={20} title="حذف اللوحة" />
                </button>
              }
            />

            <UpdateBreakerPannelModel
              openingButton={
                <button className="flex gap-2 items-center border-2 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all px-2 py-1 rounded-sm cursor-pointer w-full">
                  <FaPenToSquare size={20} />
                  <p className="">تعديل معلومات اللوحة</p>
                </button>
              }
              intialState={{
                location: breakerPannelDetails?.location as string,
                max_breakers: breakerPannelDetails?.max_breakers as number,
                breaker_pannel_id:
                  breakerPannelDetails?.breaker_pannel_id as number,
              }}
            />
          </div>
        </div>

        <Table.ReactTable />
        <Table.PagesControlers />
      </Table>
    </section>
  );
}
