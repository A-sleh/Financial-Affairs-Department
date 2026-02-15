import { IoWarningOutline } from "react-icons/io5";
import Model from "./Model";
import { useRef } from "react";

interface IConfirmDetelteModelProps {
  item_id: number;
  onConfirme: () => void;
  openButton: React.ReactNode;
  delete_message: string;
}

export default function ConfirmDetelteModel({
  item_id,
  onConfirme,
  openButton,
  delete_message = "",
}: IConfirmDetelteModelProps) {
  const closeBtnRef = useRef<null | HTMLButtonElement>(null);
  const open_key = "delete-model-" + item_id;

  const handleConfirmClicked = () => {
    onConfirme();
    closeBtnRef.current?.click();
  };
  
  return (
    <Model>
      <Model.Open opens={open_key}>{openButton}</Model.Open>
      <Model.Window name={open_key} model_width="md:max-w-[40vw]">
        <div className="flex flex-col items-center">
          <IoWarningOutline className="text-8xl text-red-600" />
          <p className="text-center text-xl mb-3">{delete_message}</p>
          <div className="space-x-2">
            <Model.Close>
              <button
                ref={closeBtnRef}
                className="px-3 py-1 bg-red-600 rounded-sm text-white hover:opacity-70 transition-all cursor-pointer"
              >
                الغاء
              </button>
            </Model.Close>
            <button
              onClick={handleConfirmClicked}
              className="px-3 py-1 bg-blue-600 rounded-sm text-white hover:opacity-70 transition-all cursor-pointer"
            >
              تأكيد
            </button>
          </div>
        </div>
      </Model.Window>
    </Model>
  );
}
