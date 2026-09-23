"use client";

import { useAppStore } from "@/lib/store";
import { PublicSite } from "@/components/public/PublicSite";
import { AdminConsole } from "@/components/admin/AdminConsole";

export default function Home() {
  const { mode } = useAppStore();

  return mode === "public" ? <PublicSite /> : <AdminConsole />;
}
