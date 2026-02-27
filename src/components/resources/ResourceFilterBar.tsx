import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
}

interface ResourceFilter {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

interface ResourceFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onClear: () => void;
  queryPlaceholder?: string;
  filters?: ResourceFilter[];
  className?: string;
}

export function ResourceFilterBar({
  query,
  onQueryChange,
  onClear,
  queryPlaceholder = "Search resources...",
  filters = [],
  className = "",
}: ResourceFilterBarProps) {
  const hasActive = query || filters.some((filter) => filter.value !== "all");

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="relative block md:col-span-2 xl:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={queryPlaceholder}
            className="pl-10"
          />
        </label>

        {filters.map((filter) => (
          <div key={filter.id}>
            <Select value={filter.value} onValueChange={filter.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={`${filter.id}-${option.value}`} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {hasActive ? (
        <div className="mt-3">
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-slate-600">
            <X className="mr-1 h-3 w-3" />
            Clear filters
          </Button>
        </div>
      ) : null}
    </div>
  );
}
