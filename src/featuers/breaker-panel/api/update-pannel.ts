import { domain } from "@/api-client/server";
import { useMutation } from "@tanstack/react-query";

interface IChangeUserPannelPayload {
  breaker_pannel_id: number;
  user_id: number;
}

async function changeUserPannelApi(payload: IChangeUserPannelPayload) {
  const res = await fetch(`${domain}/breaker-pannels-user/${payload.user_id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();

  return data;
}

export function useChangeUserPannel() {
  return useMutation({
    mutationKey: ["change-user-pannle"],
    mutationFn: changeUserPannelApi,
  });
}
