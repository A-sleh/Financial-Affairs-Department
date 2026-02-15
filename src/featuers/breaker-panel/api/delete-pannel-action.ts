import { domain } from "@/api-client/server";
import { useMutation } from "@tanstack/react-query";

async function deleteBreakerPannelApi(breaker_id: number) {
  const res = await fetch(`${domain}/breaker-pannel/${breaker_id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

export function useDeleteBreakerPannel() {
  return useMutation({
    mutationKey: ["delete-pannel"],
    mutationFn: deleteBreakerPannelApi,
  });
}
