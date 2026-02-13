import Input from "@/components/inputs/Input";
import DiscoverChanges from "@/components/model/DiscoverChanges.model";

import { usePendingForm } from "@/hooks/usePendingFormValues";
import { getSetting, type Setting } from "./api/get-setting";
import { updateSetting } from "./api/update-setting";
import { SuccessMessageToast, ErrorMessageToast } from "@/utils/dialogs";
import { QueryClient } from "@tanstack/react-query";
import { formatNumberWithSpaces } from "@/utils/helpers";

export default function Setting() {
  const quaryClient = new QueryClient();
  const { isLoading, setting } = getSetting();
  const { isPending: updateSettingIsPending, mutate: updateSettingFn } =
    updateSetting();
  const { handleApplyChange, handleIgnoreChange, showConfirmation, form } =
    usePendingForm(setting, {
      values: setting,
      mode: "onChange",
      criteriaMode: "all",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: Setting) => {
    updateSettingFn(data, {
      onSuccess: (_: any) => {
        SuccessMessageToast("تم تحديث البيانات بنجاح");
        quaryClient.invalidateQueries({
          queryKey: ["setting"],
        });
        handleApplyChange(data);
      },
      onError: (_: any) => {
        handleIgnoreChange();
        ErrorMessageToast("حدث خطأ أثناء تحديث البيانات");
      },
    });
  };

  return (
    <div className="">
      <div className=" p-3 shadow ">
        <h2 className="mb-4 font-bold">تعديل سعر الأمبير الأسبوعي</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-3 w-full "
        >
          <Input
            label="سعر الأمبير"
            type="text"
            className="w-full"
            unit="ل.س"
            fieldName="amper_price"
            errors={errors}
            loadInitalValue={isLoading}
            {...register("amper_price", {
              required: "يجب تحديد قيمة هذا الحقل",
              // @ts-ignore
              pattern: {
                value: /^\d+$/,
                message: "يجب ان يكون الرقم موجب وخالي من الرموز",
              },
            })}
          />
          <Input
            label="سعر العداد"
            type="text"
            className="w-full"
            unit="ل.س"
            fieldName="counter_price"
            errors={errors}
            loadInitalValue={isLoading}
            {...register("counter_price", {
              required: "يجب تحديد قيمة هذا الحقل",
              //@ts-ignore
              pattern: {
                value: /^\d+$/,
                message: "يجب ان يكون الرقم موجب وخالي من الرموز",
              },
            })}
          />
          <DiscoverChanges
            onCancel={handleIgnoreChange}
            isOpened={showConfirmation}
            startingLoader={updateSettingIsPending}
          />
        </form>
      </div>
    </div>
  );
}
