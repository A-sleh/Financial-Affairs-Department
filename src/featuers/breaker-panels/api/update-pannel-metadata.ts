import { domain } from "@/api-client/server";
import { useMutation } from "@tanstack/react-query";
import type { IBreakerPannelPayload } from "./create-new-breaker-pannel";


export interface IUpdateBreakerPannelPayload extends IBreakerPannelPayload  {
    breaker_pannel_id: number;
}

async function updateBreakerPannelApi(payload: IUpdateBreakerPannelPayload) {
  const response = await fetch(`${domain}/breaker-pannel/${payload.breaker_pannel_id}`, {
    body: JSON.stringify(payload),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const result = await response.json();
  return result;
}

export function useUpdateBreakerPannel() {
  return useMutation({
    mutationKey: ["update-brealer-pannel"],
    mutationFn: updateBreakerPannelApi,
  });
}
