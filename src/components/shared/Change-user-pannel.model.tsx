import { IoCloseCircleOutline } from "react-icons/io5";
import Model from "../model/Model";
import { getAllExsitPannels } from "@/featuers/breaker-panels/api/get-breaker-pannels";
import Selector from "../inputs/Selector";
import { useRef, useState, type FormEvent } from "react";
import { useChangeUserPannel } from "@/featuers/breaker-panel/api/update-pannel";
import { ErrorMessageToast, SuccessMessageToast } from "@/utils/dialogs";
import { useQueryClient } from "@tanstack/react-query";

interface IChangeUserPannelProps {
  user_id: number;
  breaker_pannel_id: number;
  openingButton: React.ReactNode;
}
const OPEN_MODEL_KEY = "change-user-pannel";

export default function ChangeUserPannel({
  breaker_pannel_id,
  user_id,
  openingButton,
}: IChangeUserPannelProps) {
  const queryClient = useQueryClient();
  const closeBtnRef = useRef<null | HTMLButtonElement>(null);
  const { mutate: changeUserPannel, isPending } = useChangeUserPannel();
  const { breakerPannels, isLoading } = getAllExsitPannels();
  const [selectedPannel, setSelectedPannel] =
    useState<number>(breaker_pannel_id);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Close the model if the user doesn't select any pannel but click on submit
    if (selectedPannel == breaker_pannel_id) {
      closeBtnRef.current?.click();
    } else {
      changeUserPannel(
        { user_id, breaker_pannel_id: selectedPannel },
        {
          onSuccess: (_: any) => {
            SuccessMessageToast("تم نقل الزبون بنجاح");
            closeBtnRef.current?.click();
            queryClient.invalidateQueries({
              queryKey: ["breaker-pannel-details", +breaker_pannel_id],
            });
            queryClient.invalidateQueries({
              queryKey: ["breaker-pannels-stats"],
            });
          },
          onError: (_: any) => {
            ErrorMessageToast("حدث خطأ في نقل الزبون");
          },
        },
      );
    }
  };

  return (
    <Model>
      <Model.Open opens={OPEN_MODEL_KEY}>{openingButton}</Model.Open>
      <Model.Window name={OPEN_MODEL_KEY}>
        <header className="flex justify-between items-center mb-4">
          <Model.Close>
            <button
              ref={closeBtnRef}
              className="hover:text-red-600 transition-all cursor-pointer"
            >
              <IoCloseCircleOutline size={25} />
            </button>
          </Model.Close>
          <h1 className="text-xl">أدخل معلومات الفاتورة</h1>
        </header>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4" dir="rtl">
          {/* Row Two ( breaker panel position ) */}
          <div className="flex flex-col md:flex-row gap-5">
            <Selector
              value={selectedPannel}
              setValue={setSelectedPannel}
              loadingIntialValue={isLoading}
              label="حدد اللوحة التي تريد نقل الزبون اليها"
            >
              {breakerPannels
                ?.filter(
                  (pannel) => pannel.breaker_pannel_id != breaker_pannel_id,
                )
                .map((pannel) => (
                  <option value={pannel.breaker_pannel_id}>
                    {pannel.location}
                  </option>
                ))}
            </Selector>
          </div>
          <hr className="opacity-30" />
          <input
            disabled={isPending}
            type="submit"
            value={isPending ? "جاري المعالجه ..." : "نقل"}
            className="px-4 py-1 w-full rounded-sm bg-primary text-white hover:opacity-65 transition-all cursor-pointer"
          />
        </form>
      </Model.Window>
    </Model>
  );
}
