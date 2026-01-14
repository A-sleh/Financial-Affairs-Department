import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";

const mappingRoutesToArabic: any = {
  "breaker-panels": "لواحات القواطع",
  users: "الزباين",
  billing: "الفواتير",
  statistics: "الإحصائيات",
  setting: "الإعدادات",
};

export default function BreadeCramp() {
  const changePathTo = useNavigate();
  const currentPath = window.location.pathname;
  const routes = currentPath.split("/");
  const indexLastItems = routes.length - 1;

  const handleRouteClicked = (routeIndex: number) => {
    const subRoutes = routes.slice(0, routeIndex + 1).join("/");
    if (currentPath == subRoutes) return;
    changePathTo(subRoutes as string);
  };

  return (
    <div className="my-3">
      {routes.map((route, Idx) => {
        if (route)
          return (
            <button
              onClick={() => handleRouteClicked(Idx)}
              className={`flex items-center gap-2 text-xl cursor-pointer ${
                Idx == indexLastItems ? "text-primary" : "text-black"
              }`}
            >
              {mappingRoutesToArabic[route]}
              {Idx < indexLastItems && (
                <MdKeyboardArrowLeft size={25} className="mt-1" />
              )}
            </button>
          );
      })}
    </div>
  );
}
