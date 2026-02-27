import { Link } from "react-router-dom";
import { 
  Activity, 
  Magnet, 
  Zap, 
  Layers, 
  Compass, 
  Globe,
  FileText,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  activity: Activity,
  magnet: Magnet,
  zap: Zap,
  layers: Layers,
  compass: Compass,
  globe: Globe,
};

interface SubjectCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  materialCount: number;
  delay?: number;
}

export function SubjectCard({ id, name, description, icon, materialCount, delay = 0 }: SubjectCardProps) {
  const IconComponent = iconMap[icon] || FileText;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/ism-library?subject=${id}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full p-6 rounded-xl bg-card border border-border shadow-card transition-all duration-500 hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-1 overflow-hidden">
        
        {/* Animated gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated border glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 blur-sm animate-pulse" />
        </div>

        {/* Floating particles effect */}
        {isHovered && (
          <>
            <div className="absolute top-4 right-8 w-1 h-1 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0ms' }} />
            <div className="absolute top-12 right-16 w-1 h-1 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: '150ms' }} />
            <div className="absolute top-20 right-12 w-1 h-1 bg-primary/50 rounded-full animate-ping" style={{ animationDelay: '300ms' }} />
          </>
        )}

        <div className="relative z-10">
          {/* Icon with enhanced effects */}
          <div className="relative w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <IconComponent className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Icon glow effect */}
            <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content with staggered animations */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                {name}
              </h3>
              {isHovered && (
                <Sparkles className="w-4 h-4 text-primary animate-pulse flex-shrink-0" />
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
              {description}
            </p>
          </div>

          {/* Enhanced Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50 group-hover:border-primary/20 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                {materialCount} materials
              </span>
            </div>
            
            <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Explore
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Link>
  );
}
