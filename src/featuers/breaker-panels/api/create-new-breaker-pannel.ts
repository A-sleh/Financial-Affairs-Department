import { domain } from "@/api-client/server";
import { useMutation } from "@tanstack/react-query";


export interface IBreakerPannelPayload {
  location: string;
  max_breakers: string | number;
}

async function addNewBreakerPannelApi(payload: IBreakerPannelPayload) {
  const response = await fetch(`${domain}/breaker-pannel`, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const result = await response.json();
  return result;
}

export function addNewBreakerPannel() {
  return useMutation({
    mutationKey: ["new-brealer-pannel"],
    mutationFn: addNewBreakerPannelApi,
  });
}
