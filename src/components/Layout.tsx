import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      {/* Add your header, navigation, etc. here */}
      <main>
        <Outlet />
      </main>
      {/* Add your footer here */}
    </div>
  );
} 