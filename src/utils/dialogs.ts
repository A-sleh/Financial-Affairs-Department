import toast from "react-hot-toast";

export function SuccessMessageToast(message: string) {
  toast.success(message);
}

export function ErrorMessageToast(message: string) {
  toast.error(message);
}
