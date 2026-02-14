import { useRef } from "react";
import { useForm } from "react-hook-form";

import Input from "../inputs/Input";
import Model from "../model/Model";
import Selector from "../inputs/Selector";
import TabsAsCheckBox from "../inputs/TabsAsCheckBox";
import { IoCloseCircleOutline } from "react-icons/io5";
import addNewUserToPannel, {
  type INewUserPayload,
} from "@/featuers/users/api/add-new-user";
import { getAllExsitPannels } from "@/featuers/breaker-panels/api/get-breaker-pannels";
import { ErrorMessageToast, SuccessMessageToast } from "@/utils/dialogs";

export default function AddNewUser({
  openingButton,
}: {
  openingButton: React.ReactNode;
}) {
  const closeBtnRef = useRef<null | HTMLButtonElement>(null);
  const { breakerPannels, isLoading } = getAllExsitPannels();
  const { mutate: saveUserInDB, isPending, reset } = addNewUserToPannel();
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<INewUserPayload>({
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      subscribe_type: "breaker",
      quantity: 0,
      breaker_pannel_id: Number(
        breakerPannels && breakerPannels[0].breaker_pannel_id,
      ),
    },
  });
  const { subscribe_type } = watch();
  const counterSelected = subscribe_type === "counter";

  const handleChangeSubscribtionType = (value: "counter" | "breaker") => {
    if (value == "counter") {
      setValue("quantity", null);
    } else {
      setValue("counter_intial_value", null);
    }
    setValue("subscribe_type", value);
  };

  const handleChangeBreakerPannel = (breakerId: number) => {
    setValue("breaker_pannel_id", breakerId);
  };

  const onSubmit = (data: INewUserPayload) => {
    saveUserInDB(data, {
      onSuccess: (_: any) => {
        SuccessMessageToast("تمت اضافة الزبون بنجاح");
        closeBtnRef.current?.click();
        reset();
      },
      onError: (_: any) => {
        ErrorMessageToast("حدث خطأ أثناء حفظ البانات");
      },
    });
  };

  return (
    <Model>
      <Model.Open opens="new-user">{openingButton}</Model.Open>
      <Model.Window name="new-user">
        <header className="flex justify-between items-center mb-4">
          <Model.Close>
            <button
              ref={closeBtnRef}
              className="hover:text-red-600 transition-all cursor-pointer"
            >
              <IoCloseCircleOutline size={25} />
            </button>
          </Model.Close>
          <h1 className="text-xl">أدخل معلومات الزبون</h1>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 transition-all "
          dir="rtl"
        >
          {/* Row one ( name & phone number ) */}
          <div className="flex flex-col md:flex-row gap-5">
            <Input
              type={"text"}
              label="اسم الزبون"
              required={true}
              errors={errors}
              fieldName="full_name"
              {...register("full_name", {
                required: "يجب ادخال اسم الزبون",
              })}
            />
            <Input
              type={"text"}
              label="رقم الهاتف"
              required={true}
              errors={errors}
              fieldName="phone"
              {...register("phone", {
                required: "يجب تحديد رقم هاتف الزبون",
                minLength: {
                  value: 10,
                  message: "يجب ان يتألف الرقم على القل من 10 ارقام",
                },
                maxLength: {
                  value: 10,
                  message: "يجب ان يتألف الرقم على الاكثر من 10 ارقام",
                },
              })}
            />
          </div>

          {/* Row Two ( breaker panel position ) */}
          <div className="flex flex-col md:flex-row gap-5">
            <Selector
              value={getValues("breaker_pannel_id")}
              setValue={handleChangeBreakerPannel}
              loadingIntialValue={isLoading}
              label="تحديد مكان اللوحة"
            >
              {breakerPannels?.map((pannel) => (
                <option value={pannel.breaker_pannel_id}>
                  {pannel.location}
                </option>
              ))}
            </Selector>
          </div>

          {/* Row Three ( Subscrib type & amount ) */}
          <div className="flex flex-col md:flex-row gap-5">
            <TabsAsCheckBox
              value={subscribe_type}
              setValue={handleChangeSubscribtionType}
              values={[
                {
                  title: "مقطوعه",
                  value: "breaker",
                },
                {
                  title: "عداد",
                  value: "counter",
                },
              ]}
              required={true}
              label="نوع الأشتراك"
            />
            <Input
              className={counterSelected ? "" : "hidden"}
              type={"text"}
              label="القيمة السابقة للعداد"
              required={true}
              errors={errors}
              fieldName="counter_intial_value"
              {...register("counter_intial_value", {
                required: "يجب تحديد قيمة هذا الحقل",
                // @ts-ignore
                pattern: {
                  value: /^\d+$/,
                  message: "يجب ان يكون الرقم موجب وخالي من الرموز",
                },
              })}
            />
            <Input
              className={counterSelected ? "hidden" : ""}
              type={"text"}
              label="كمية الأشتراك"
              required={true}
              errors={errors}
              fieldName="quantity"
              {...register("quantity", {
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
            type="submit"
            disabled={isPending}
            value={isPending ? "جاري المعالجة ..." : "إضافة"}
            className="px-4 py-1 w-full rounded-sm bg-primary text-white hover:opacity-65 transition-all cursor-pointer"
          />
        </form>
      </Model.Window>
    </Model>
  );
}
