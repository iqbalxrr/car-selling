
"use client";

import { usePathname } from "next/navigation";

export default function HideOnDashboard({ children }) {
  const pathname = usePathname();
  const hide = pathname.startsWith("/dashboard");

  if (hide) return null;
  return <>{children}</>;
}
