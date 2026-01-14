import { Outlet } from "react-router";
import { Navbar } from "../common/Navbar";
import { Sidebar } from "../common/Sidebar/Sidebar";
import BreadeCramp from "../common/BreadeCramp";

export const DashboardLayout = () => {
  return (
    <section className="flex font-arabic" dir="rtl">
      <aside className="m-[1vh] ml-0">
        <Sidebar />
      </aside>
      <section className="m-[1vh] mr-0 w-full">
        <nav className="sticky top-0">
          <Navbar />
        </nav>
        <main className="m-2">
          <BreadeCramp />
          <Outlet />
        </main>
      </section>
    </section>
  );
};
