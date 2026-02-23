import { BookOpen, Users, Download, FileText } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "240+", label: "Study Materials" },
  { icon: FileText, value: "120+", label: "Previous Year Questions" },
  { icon: Users, value: "500+", label: "Active Students" },
  { icon: Download, value: "5000+", label: "Downloads" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
