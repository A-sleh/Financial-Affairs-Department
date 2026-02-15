import { domain } from "@/api-client/server";
import { useQuery } from "@tanstack/react-query";

export interface IPannelInfo {
  breaker_pannel_id: number;
  location: string;
  max_breakers: number;
}
export interface IBreakerPannel {
  breaker_pannel_id: number;
  location: string;
  total_users: number;
  total_ameper: number;
  total_counter_users: number;
  max_breakers: number;
}

async function getAllExsitPannelsApi() {
  const res = await fetch(`${domain}/breaker-pannel`);
  const data = await res.json();
  return data;
}

async function getAllBreakerPannelsApi() {
  const res = await fetch(`${domain}/breaker-pannels-user/stats`);
  const data = await res.json();
  return data;
}

export function getAllExsitPannels() {
  const { data: breakerPannels, isLoading } = useQuery<
    any,
    Error,
    IPannelInfo[],
    any
  >({
    queryKey: ["breaker-pannels"],
    queryFn: getAllExsitPannelsApi,
  });
  return { breakerPannels, isLoading };
}

export function getAllBreakerPannels() {
  const { data: breakerPannels, isLoading } = useQuery<
    any,
    Error,
    IBreakerPannel[],
    any
  >({
    queryKey: ["breaker-pannels-stats"],
    queryFn: getAllBreakerPannelsApi,
  });
  return { breakerPannels, isLoading };
}
