"use client";

import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore, type ThemeName } from "@/lib/store";
import { cn } from "@/lib/utils";

const THEMES: { id: ThemeName; label: string; labelBn: string; swatch: string; description: string }[] = [
  { id: "orange", label: "White-Orange", labelBn: "সাদা-কমলা", swatch: "swatch-orange", description: "Bengali heritage maroon-saffron" },
  { id: "blue", label: "White-Blue", labelBn: "সাদা-নীল", swatch: "swatch-blue", description: "Trust, professionalism, calm" },
  { id: "green", label: "White-Green", labelBn: "সাদা-সবুজ", swatch: "swatch-green", description: "Growth, hope, environment" },
];

export function ThemeSelector({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, language } = useAppStore();
  const isBn = language === "bn";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={compact ? "icon" : "sm"} className="h-8 gap-1.5" aria-label="Select theme">
          <Palette className="h-3.5 w-3.5" />
          {!compact && (
            <span className="hidden sm:inline">{isBn ? "থিম" : "Theme"}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>{isBn ? "থিম নির্বাচন করুন" : "Select Theme"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className="flex items-center gap-3 py-2 cursor-pointer"
          >
            <div className={cn("h-8 w-8 rounded-md flex-shrink-0 border", t.swatch)} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{isBn ? t.labelBn : t.label}</p>
              <p className="text-[11px] text-muted-foreground">{t.description}</p>
            </div>
            {theme === t.id && (
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
