import { Link } from "react-router-dom";
import { GraduationCap, Mail, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">GeoPhysics</span>
                <span className="text-xs text-primary-foreground/70 leading-tight">IIT (ISM) Dhanbad</span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              A centralized digital library for Geophysics academic resources, serving IIT (ISM) Dhanbad students and the wider geophysics community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/subjects" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Browse Subjects
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  All Materials
                </Link>
              </li>
              <li>
                <Link to="/materials?type=pyq" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Previous Year Questions
                </Link>
              </li>
              <li>
                <Link to="/ism-library" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  ISM Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about#disclaimer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.iitism.ac.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-flex items-center gap-1"
                >
                  IIT (ISM) Official
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Department of Applied Geophysics, IIT (ISM) Dhanbad, Jharkhand 826004</span>
              </li>
              <li>
                <a 
                  href="mailto:geophysics@iitism.ac.in" 
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  geophysics@iitism.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} GeoPhysics Resources. All rights reserved.</p>
          <p>Built for IIT (ISM) Dhanbad Geophysics Community</p>
        </div>
      </div>
    </footer>
  );
}
