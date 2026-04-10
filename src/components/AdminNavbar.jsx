"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Coffee, Grid } from "lucide-react";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/admin/login");
  };

  const navs = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Menu Items", href: "/admin/menu", icon: Coffee },
    { name: "Tables & QRs", href: "/admin/tables", icon: Grid },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-10">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Cafe Admin System</span>
            </div>
            <div className="hidden md:flex space-x-6">
               {navs.map(nav => (
                   <Link key={nav.href} href={nav.href} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${pathname === nav.href ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} `}>
                      <nav.icon className="w-4 h-4 mr-2" />
                      {nav.name}
                   </Link>
               ))}
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm font-semibold bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
