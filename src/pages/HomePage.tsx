import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SubjectCard } from "@/components/home/SubjectCard";
import { FeatureCard } from "@/components/home/FeatureCard";
import { StatsSection } from "@/components/home/StatsSection";
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Download, 
  Shield, 
  Users, 
  Search,
  ChevronRight
} from "lucide-react";
import heroImage from "@/assets/hero-geophysics.jpg";

const subjects = [
  {
    id: "seismology",
    name: "Seismology",
    description: "Study of earthquakes and seismic wave propagation through Earth's interior",
    icon: "activity",
    materialCount: 45,
  },
  {
    id: "gravity-magnetics",
    name: "Gravity & Magnetics",
    description: "Potential field methods for subsurface exploration and crustal studies",
    icon: "magnet",
    materialCount: 38,
  },
  {
    id: "electrical-em",
    name: "Electrical & EM Methods",
    description: "Electromagnetic techniques for groundwater and mineral exploration",
    icon: "zap",
    materialCount: 42,
  },
  {
    id: "well-logging",
    name: "Well Logging & Petrophysics",
    description: "Borehole geophysical measurements and rock property analysis",
    icon: "layers",
    materialCount: 35,
  },
  {
    id: "exploration",
    name: "Exploration Geophysics",
    description: "Applied geophysics for oil, gas, and mineral resource exploration",
    icon: "compass",
    materialCount: 52,
  },
  {
    id: "geodynamics",
    name: "Geodynamics & GNSS",
    description: "Earth dynamics, plate tectonics, and satellite geodesy applications",
    icon: "globe",
    materialCount: 28,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Library",
    description: "Access PYQs, class notes, reference materials, and standard textbooks in one place",
  },
  {
    icon: Shield,
    title: "Verified Content",
    description: "All materials are curated and verified by faculty and senior students",
  },
  {
    icon: Download,
    title: "Easy Downloads",
    description: "Download PDFs instantly with organized categorization by subject and type",
  },
  {
    icon: Users,
    title: "ISM Community",
    description: "Exclusive access to internal materials for verified IIT (ISM) students",
  },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Geophysics visualization" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <span className="text-sm font-medium text-primary-foreground">IIT (ISM) Dhanbad</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-sm text-primary-foreground/80">Department of Applied Geophysics</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-8 leading-tight">
              Academic Resources for
              <span className="block text-accent">Next Generation of Geophysicists</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl">
              A centralized digital library for academic resources — PYQs, class notes, reference materials, 
              and textbooks curated for geophysics students and researchers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/materials">
                <Button variant="hero" size="xl">
                  Browse Resources
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/subjects">
                <Button variant="heroOutline" size="xl">
                  Explore Subjects
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 pt-8 border-t border-primary-foreground/20 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">240+</div>
                <div className="text-sm text-primary-foreground/70">Study Materials</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">6+</div>
                <div className="text-sm text-primary-foreground/70">Core Subjects</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">50+</div>
                <div className="text-sm text-primary-foreground/70">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive academic resources organized for efficient learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={feature.title} 
                {...feature} 
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Browse by Subject
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Explore our comprehensive collection organized by core geophysics disciplines
              </p>
            </div>
            <Link to="/subjects" className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
              View All Subjects
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <SubjectCard 
                key={subject.id} 
                {...subject} 
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Access Premium Resources?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            IIT (ISM) students get exclusive access to internal class notes and materials. 
            Verify your institutional email to unlock the complete library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login?register=true">
              <Button variant="hero" size="xl">
                Register with ISM Email
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/materials">
              <Button variant="heroOutline" size="xl">
                Browse Public Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
