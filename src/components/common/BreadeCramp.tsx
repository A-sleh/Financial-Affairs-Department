import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";

const mappingRoutesToArabic: any = {
  "breaker-panels": "لواحات القواطع",
  users: "الزباين",
  billing: "الفواتير",
  statistics: "الإحصائيات",
  setting: "الإعدادات",
  user: "المستخدم",
  "weekly-bills": "الفواتير الأسبوعية",
  "new-bill": "الفواتير الأسبوعية المفتوحة"
};

export default function BreadeCramp() {
  const changePathTo = useNavigate();
  const currentPath = window.location.pathname;
  const routes = currentPath.split("/");
  const hasIdInPathPramas = isNaN(+routes[routes.length - 1]) ? 0 : 1;
  const indexLastItems = routes.length - (1 + hasIdInPathPramas);

  /**
   * this function will do:
   * endpath: the index of sub path which user was clicked and ! check if the path has :id and the click on last sub path i will add the id in the final path or dosen't put it)
   * subRoutes: create the new URL route will go to there
   * @param routeIndex the sub path which user click on it
   * @returns will not return any thing just change the navigation
   */

  const handleRouteClicked = (routeIndex: number) => {
    const endPath =
      routeIndex + (hasIdInPathPramas && routeIndex == indexLastItems ? 1 : 0);
    const subRoutes = routes.slice(0, endPath + 1).join("/");
    if (currentPath == subRoutes) return;
    changePathTo(subRoutes as string);
  };

  return (
    <div className="my-3 flex items-center">
      {routes.map((route, Idx) => {
        if (route && isNaN(+route))
          return (
            <button
              key={Idx}
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
