import { domain } from "@/api-client/server";
import { useMutation } from "@tanstack/react-query";

interface UpdateSettingPayload {
  amper_price: number;
  counter_price: number;
}

async function updateSettingApi(payload: UpdateSettingPayload) {
  const response = await fetch(`${domain}/setting`, {
    body: JSON.stringify(payload),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const result = await response.json();
  return result;
}

export function updateSetting() {
  return useMutation({
    mutationKey: ["update-setting"],
    mutationFn: updateSettingApi,
  });
}
