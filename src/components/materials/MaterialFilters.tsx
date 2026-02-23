import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Filters {
  search: string;
  subject: string;
  type: string;
  accessLevel: string;
}

interface MaterialFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const subjects = [
  { value: "seismology", label: "Seismology" },
  { value: "gravity-magnetics", label: "Gravity & Magnetics" },
  { value: "electrical-em", label: "Electrical & EM Methods" },
  { value: "well-logging", label: "Well Logging & Petrophysics" },
  { value: "exploration", label: "Exploration Geophysics" },
  { value: "geodynamics", label: "Geodynamics & GNSS" },
];

const types = [
  { value: "pyq", label: "Previous Year Questions" },
  { value: "notes", label: "Class Notes" },
  { value: "reference", label: "Reference Notes" },
  { value: "textbook", label: "Textbooks" },
];

const accessLevels = [
  { value: "public", label: "Public" },
  { value: "ism-only", label: "ISM Only" },
];

export function MaterialFilters({ filters, setFilters }: MaterialFiltersProps) {
  const hasActiveFilters = filters.search || filters.subject || filters.type || filters.accessLevel;

  const clearFilters = () => {
    setFilters({
      search: "",
      subject: "",
      type: "",
      accessLevel: "",
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-card sticky top-20">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-card-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
            <X className="w-3 h-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* Search */}
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search materials..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="pl-9"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Subject</Label>
        <Select
            value={filters.subject || "all"}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, subject: value === "all" ? "" : value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Material Type</Label>
        <Select
            value={filters.type || "all"}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value === "all" ? "" : value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Access Level */}
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Access Level</Label>
        <Select
            value={filters.accessLevel || "all"}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, accessLevel: value === "all" ? "" : value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="All access levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All access levels</SelectItem>
              {accessLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
