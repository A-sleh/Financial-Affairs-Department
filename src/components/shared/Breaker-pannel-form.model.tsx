import Input from "@/components/inputs/Input";
import Model from "@/components/model/Model";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  addNewBreakerPannel,
} from "@/featuers/breaker-panels/api/create-new-breaker-pannel";
import { useUpdateBreakerPannel, type IUpdateBreakerPannelPayload } from "@/featuers/breaker-panels/api/update-pannel-metadata";
import { useForm } from "react-hook-form";
import { SuccessMessageToast, ErrorMessageToast } from "@/utils/dialogs";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

const OPEN_MODEL_KEY = "new-breaker-panel";

export default function AddNewBreakerPanel({
  openingButton,
  intialState = null,
}: {
  openingButton: React.ReactNode;
  intialState?: IUpdateBreakerPannelPayload | null;
}) {
  const closebtnRef = useRef<null | HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const { mutate: updateBreakerPannelMetaData, isPending: updateDataIsPending } =
    useUpdateBreakerPannel();
  const { mutate: addBreakerPannelToServer, isPending } = addNewBreakerPannel();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateBreakerPannelPayload>({
    mode: "onSubmit",
    criteriaMode: "all",
    values: intialState != null ? intialState : ({} as IUpdateBreakerPannelPayload),
  });

  const onSubmit = (data: IUpdateBreakerPannelPayload) => {
    if (intialState) {
      updateBreakerPannelMetaData(data, {
        onSuccess: (_: any) => {
          SuccessMessageToast("تم تعديل بيانات العلبة بنجاح");
            queryClient.invalidateQueries({
              queryKey: ["breaker-pannel-details", +data.breaker_pannel_id],
            });
          queryClient.invalidateQueries({
            queryKey: ["breaker-pannels-stats"],
          });
          closebtnRef.current?.click();
          reset({});
        },
        onError: (_: any) => {
          ErrorMessageToast("حدث خطأ اثناء حفظ المعلوات");
        },
      });
    } else {
      addBreakerPannelToServer(data, {
        onSuccess: (_: any) => {
          SuccessMessageToast("تم اضافة العلبة بنجاح");
          queryClient.invalidateQueries({
            queryKey: ["breaker-pannels-stats"],
          });
          closebtnRef.current?.click();
          reset({});
        },
        onError: (_: any) => {
          ErrorMessageToast("حدث خطأ اثناء حفظ المعلوات");
        },
      });
    }
  };

  return (
    <Model>
      <Model.Open opens={OPEN_MODEL_KEY}>{openingButton}</Model.Open>
      <Model.Window name={OPEN_MODEL_KEY}>
        <header className="flex justify-between items-center mb-4">
          <Model.Close>
            <button
              ref={closebtnRef}
              className="hover:text-red-600 transition-all cursor-pointer"
            >
              <IoCloseCircleOutline size={25} />
            </button>
          </Model.Close>
          <h1 className="text-xl">أدخل معلومات اللوحة</h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
          {/* Row one ( name & phone number ) */}
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <Input
              type={"text"}
              label="عنوان اللوحة"
              required={true}
              errors={errors}
              fieldName="location"
              {...register("location", {
                required: "يجب تحديد قيمة هذا الحقل",
              })}
            />
            <Input
              type={"text"}
              label="العدد الأعظمي لكمية الأمبيرات"
              required={true}
              errors={errors}
              fieldName="max_breakers"
              {...register("max_breakers", {
                required: "يجب تحديد قيمة هذا الحقل",
                // @ts-ignore
                pattern: {
                  value: /^\d+$/,
                  message: "يجب ان يكون الرقم موجب وخالي من الرموز",
                },
              })}
            />
          </div>
          <hr className="opacity-30" />
          <input
            disabled={isPending}
            type="submit"
            value={
              isPending || updateDataIsPending ? "جاري التحميل ..." : intialState ? "تعديل" : "إضافة"
            }
            className="px-4 py-1 w-full rounded-sm bg-primary text-white hover:opacity-65 transition-all cursor-pointer"
          />
        </form>
      </Model.Window>
    </Model>
  );
}
