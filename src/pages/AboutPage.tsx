import { Layout } from "@/components/layout/Layout";
import { GraduationCap, Target, Users, Shield, Mail, ExternalLink } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Us
            </h1>
            <p className="text-lg text-primary-foreground/80">
              A student-driven initiative to make geophysics education accessible
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent mb-4">
                  <Target className="h-4 w-4" />
                  <span className="text-sm font-medium">Our Mission</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Empowering Geophysics Students
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The GeoPhysics Resources platform was created to centralize academic materials 
                  for students of the Department of Applied Geophysics at IIT (Indian Institute of Technology) 
                  (Indian School of Mines) Dhanbad.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our goal is to provide easy access to previous year questions, class notes, 
                  reference materials, and textbooks, helping students excel in their academic journey.
                </p>
              </div>
              <div className="bg-secondary/50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">IIT (ISM)</div>
                    <div className="text-sm text-muted-foreground">Dhanbad</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">500+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Academic Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Curated materials to support comprehensive learning in geophysics
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Verified Content</h3>
                <p className="text-sm text-muted-foreground">
                  All materials are reviewed for accuracy and relevance
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Built by students, for students, with continuous improvements
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div id="disclaimer" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
              <div className="p-6 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-amber-800 leading-relaxed mb-4">
                  <strong>Educational Purpose Only:</strong> All materials provided on this platform 
                  are for educational purposes only. The content is meant to supplement learning 
                  and should not be considered as a substitute for official course materials.
                </p>
                <p className="text-amber-800 leading-relaxed mb-4">
                  <strong>Copyright Notice:</strong> We respect intellectual property rights. 
                  If you believe any content infringes on your copyright, please contact us 
                  immediately for removal.
                </p>
                <p className="text-amber-800 leading-relaxed">
                  <strong>No Warranty:</strong> While we strive for accuracy, we make no 
                  representations or warranties about the completeness, reliability, or 
                  accuracy of the materials.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-12 p-8 rounded-xl bg-primary text-primary-foreground">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Have Questions?</h3>
                  <p className="text-primary-foreground/80">
                    Reach out to us for any queries, suggestions, or feedback
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:geophysics@iitism.ac.in"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                  <a 
                    href="https://www.iitism.ac.in/department/applied-geophysics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Department
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
