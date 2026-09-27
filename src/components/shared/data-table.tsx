"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  filterOptions?: {
    key: keyof T;
    label: string;
    options: string[];
  };
  title?: string;
  onAdd?: () => void;
  addLabel?: string;
  onExport?: () => void;
  pageSize?: number;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKeys,
  filterOptions,
  title,
  onAdd,
  addLabel = "Add New",
  onExport,
  pageSize = 8,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = data;
    if (search && searchKeys) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        searchKeys.some((k) =>
          String(row[k] ?? "").toLowerCase().includes(q)
        )
      );
    }
    if (filter !== "all" && filterOptions) {
      result = result.filter((row) =>
        String(row[filterOptions.key]) === filter
      );
    }
    return result;
  }, [data, search, filter, searchKeys, filterOptions]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        {(title || onAdd || onExport) && (
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            {title && (
              <h3 className="text-lg font-semibold">{title}</h3>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {onExport && (
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              )}
              {onAdd && (
                <Button size="sm" onClick={onAdd}>
                  <Plus className="mr-2 h-4 w-4" /> {addLabel}
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 md:flex-row md:items-center mb-4">
          {searchKeys && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>
          )}
          {filterOptions && (
            <Select
              value={filter}
              onValueChange={(v) => {
                setFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder={filterOptions.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={col.className}
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-muted-foreground py-8"
                  >
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                paged.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    {columns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        {col.render
                          ? col.render(row)
                          : String((row as Record<string, unknown>)[col.key] ?? "—")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {filtered.length > pageSize && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} of{" "}
              {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  tone = "primary",
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "accent" | "amber" | "rose" | "sky";
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-accent-foreground",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    sky: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  };
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {change && (
              <p className="text-xs text-emerald-600 font-medium">{change}</p>
            )}
          </div>
          <div className={`rounded-lg p-2.5 ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
