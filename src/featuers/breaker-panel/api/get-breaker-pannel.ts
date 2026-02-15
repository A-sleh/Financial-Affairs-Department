import { domain } from "@/api-client/server";
import type {
  IBreakerPannel,
  IPannelInfo,
} from "@/featuers/breaker-panels/api/get-breaker-pannels";
import type { INewUserPayload } from "@/featuers/users/api/add-new-user";
import { useQuery } from "@tanstack/react-query";

interface IBreakerPannelDetails extends IPannelInfo, IBreakerPannel {
  users: INewUserPayload[];
}

async function getBreakerPannelDetailsApi(
  breaker_id: number,
): Promise<IBreakerPannelDetails> {
  const res = await fetch(`${domain}/breaker-pannels-user/${breaker_id}`);
  const data = await res.json();
  return data as IBreakerPannelDetails;
}

export function useGetBreakerPannelDetails(breaker_id: number) {
  const { isLoading, data: breakerPannelDetails } = useQuery({
    queryKey: ["breaker-pannel-details",breaker_id],
    queryFn: () => getBreakerPannelDetailsApi(breaker_id),
    enabled: breaker_id != 0
  });
  return { isLoading, breakerPannelDetails };
}
