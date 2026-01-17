import { SubNavigationHeader } from "@/components/shared/SubNavigationHeader";
import { Outlet } from "react-router";

const SUB_LINKS = [
  {
    path: "",
    title: "عرض أخر الفواتير",
  },
  {
    path: "weekly-bills",
    title: "الفواتير الأسبوعية",
  },
  {
    path: "new-user-bill",
    title: "إدراج فاتورة زبون",
  },
];

export default function Billing() {
  return (
    <section className="space-y-4">
      <SubNavigationHeader links={SUB_LINKS} />
      <Outlet />
    </section>
  );
}
