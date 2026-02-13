import { useQuery } from "@tanstack/react-query";
import { domain } from "@/api-client/server";

export type Setting = {
  amper_price: number;
  counter_price: number;
};

async function getSettingApi() {
  let res = await fetch(`${domain}/setting`);
  let data = await res.json();
  return data;
}

export function getSetting() {
  let { data: setting, isLoading } = useQuery<any, any, Setting>({
    queryKey: ["Setting"],
    queryFn: getSettingApi
  });

  return { setting, isLoading };
}
