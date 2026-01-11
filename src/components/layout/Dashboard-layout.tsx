import { Outlet } from "react-router";
import { Navbar } from "../common/Navbar";
import { Sidebar } from "../common/Sidebar";

export const DashboardLayout = () => {
  return (
    <section className="flex">
      <aside>
        <Sidebar />
      </aside>
      <section>
        <nav>
          <Navbar />
        </nav>
        <main>
            <h1>main</h1>
          <Outlet />

        </main>
      </section>
    </section>
  );
};
