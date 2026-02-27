import { Download, Lock, Calendar, BookOpen, Bookmark, ScrollText, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Material } from "@/data/materials";

const typeConfig = {
  pyq: { label: "PYQ", icon: ScrollText, color: "bg-blue-100 text-blue-700" },
  notes: { label: "Class Notes", icon: BookOpen, color: "bg-green-100 text-green-700" },
  reference: { label: "Reference", icon: Bookmark, color: "bg-purple-100 text-purple-700" },
  textbook: { label: "Textbook", icon: Book, color: "bg-orange-100 text-orange-700" },
};

interface MaterialCardProps {
  material: Material;
  delay?: number;
  isBookmarked?: boolean;
  onBookmark?: (material: Material) => void;
  onOpen?: (material: Material) => void;
}

export function MaterialCard({ material, delay = 0, isBookmarked = false, onBookmark, onOpen }: MaterialCardProps) {
  const typeInfo = typeConfig[material.type];
  const TypeIcon = typeInfo.icon;
  const isRestricted = material.accessLevel === "ism-only";

  return (
    <div
      className="group p-5 rounded-xl bg-card border border-border shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={typeInfo.color}>
            <TypeIcon className="w-3 h-3 mr-1" />
            {typeInfo.label}
          </Badge>
          {isRestricted && (
            <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
              <Lock className="w-3 h-3 mr-1" />
              ISM Only
            </Badge>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {material.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {material.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="inline-flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(material.uploadDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1">
          <Download className="w-3.5 h-3.5" />
          {material.downloads} downloads
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs font-medium text-primary">
          {material.subjectLabel}
        </span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => onBookmark?.(material)}>
            <Bookmark className="w-3.5 h-3.5 mr-1" />
            {isBookmarked ? "Saved" : "Save"}
          </Button>
          <Button size="sm" variant={isRestricted ? "outline" : "default"} onClick={() => onOpen?.(material)}>
            {isRestricted ? (
              <>
                <Lock className="w-3.5 h-3.5 mr-1" />
                Login Required
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 mr-1" />
                Download
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
