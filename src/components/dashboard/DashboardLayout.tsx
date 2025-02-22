import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { SiteHeader } from "../site-header";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="">
        <AppSidebar />

        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1">{children || <Outlet />}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
