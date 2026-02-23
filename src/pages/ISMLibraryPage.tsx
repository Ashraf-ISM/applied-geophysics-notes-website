import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function ISMLibraryPage() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-4">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">Restricted Access</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ISM Library
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Exclusive academic resources for verified IIT (ISM) Dhanbad students
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Authentication Required
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              This section contains internal class notes, reference materials, and resources 
              exclusively for IIT (ISM) Dhanbad students. Please login with your institutional 
              email (@iitism.ac.in) to access these materials.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login to Access
                </Button>
              </Link>
              <Link to="/login?register=true">
                <Button variant="outline" size="lg">
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 p-6 rounded-xl bg-secondary/50 border border-border">
              <h3 className="font-semibold text-foreground mb-3">What's included in ISM Library?</h3>
              <ul className="text-left text-muted-foreground space-y-2 max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Internal class notes from faculty
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Lab manuals and practical guides
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Solved assignments and tutorials
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Department-specific reference materials
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
