import { Link } from "react-router-dom";
import { GraduationCap, Mail, MapPin, ExternalLink, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">GeoPhysics</span>
                <span className="text-xs text-primary-foreground/70 leading-tight">
                  IIT (ISM) Dhanbad
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              A centralized digital library for Geophysics academic resources,
              serving IIT (ISM) Dhanbad students and the wider geophysics community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/subjects" className="footer-link">
                  Browse Subjects
                </Link>
              </li>
              <li>
                <Link to="/materials" className="footer-link">
                  All Materials
                </Link>
              </li>
              <li>
                <Link to="/materials?type=pyq" className="footer-link">
                  Previous Year Questions
                </Link>
              </li>
              <li>
                <Link to="/interview-prep" className="footer-link">
                  Interview Preparation
                </Link>
              </li>
              <li>
                <Link to="/ism-library" className="footer-link">
                  ISM Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Founder */}
          <div>
            <h3 className="font-semibold mb-4">Founder</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Md Ashraf Ali<br />
              M.Sc (Tech) Applied Geophysics <br />
              IIT (ISM) Dhanbad <br />
            </p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://github.com/Ashraf-ISM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/ashraf-iit-ism/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Department of Applied Geophysics, IIT (ISM) Dhanbad, Jharkhand 826004
                </span>
              </li>
              <li>
                <a
                  href="mailto:ashraf.ism49@gmail.com"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  ashraf.ism49@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://ash-geophysics.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Portfolio
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60 text-center md:text-left">
          <div>
            <p>
              © {new Date().getFullYear()} GeoPhysics Resources. All rights reserved.
            </p>
            <p className="text-xs mt-1">
              This platform is student-led and not officially affiliated with IIT (ISM) Dhanbad.
            </p>
          </div>

          <p className="text-xs">
            Built with ❤️ by  Ashraf {" "}
          </p>
        </div>
      </div>
    </footer>
  );
} 
