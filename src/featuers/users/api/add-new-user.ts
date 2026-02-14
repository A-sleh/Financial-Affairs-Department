import { domain } from "@/api-client/server";
import { useMutation } from "@tanstack/react-query";

export interface INewUserPayload {
  full_name: string;
  phone: string | number;
  breaker_pannel_id: number;
  subscribe_type: "counter" | "breaker";
  counter_intial_value: number | null;
  quantity: number | null ;
}

async function addNewUserToPannelApi(payload: INewUserPayload) {
  const response = await fetch(`${domain}/breaker-pannels-user`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export default function addNewUserToPannel() {
  return useMutation({
    mutationKey: ["add-new-user"],
    mutationFn: addNewUserToPannelApi,
  });
}
