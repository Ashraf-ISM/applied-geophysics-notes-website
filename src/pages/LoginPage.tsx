import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { setLocalAuthSession, clearLocalAuthSession } from "@/lib/authSession";


export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isRegister = searchParams.get("register") === "true";
  const [activeTab, setActiveTab] = useState(isRegister ? "register" : "login");
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* =========================
     LOGIN HANDLER
  ========================== */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = loginData;
    const usernameOrEmail = email.trim();

    // Local admin fallback login
    if (usernameOrEmail.toLowerCase() === "ashraf" && password === "23mc0049") {
      setLocalAuthSession({
        username: "Ashraf",
        role: "ADMIN",
        loggedInAt: new Date().toISOString(),
      });
      toast.success("Admin login successful");
      navigate("/admin");
      return;
    }

    // ISM local student login:
    // Pattern: 2**mc****@iitism.ac.in
    // Password: same as email prefix (before @iitism.ac.in)
    const ismPattern = /^2\d*mc\d{4}@iitism\.ac\.in$/i;
    if (ismPattern.test(usernameOrEmail)) {
      const expectedPassword = usernameOrEmail.split("@")[0].toLowerCase();
      if (password.toLowerCase() === expectedPassword) {
        setLocalAuthSession({
          username: expectedPassword,
          role: "ISM_STUDENT",
          loggedInAt: new Date().toISOString(),
        });
        toast.success("ISM login successful");
        navigate("/ism-library");
        return;
      }
      toast.error("Invalid ISM credentials");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: usernameOrEmail,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    clearLocalAuthSession();
    toast.success("Login successful");
    navigate("/ism-library");
  };

  /* =========================
     REGISTER HANDLER
  ========================== */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = registerData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // ISM email restriction
    if (!email.endsWith("@iitism.ac.in")) {
      toast.error("Only @iitism.ac.in email is allowed");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "ISM_STUDENT",
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Registration successful. Check your email to verify.");
    setActiveTab("login");
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-12 flex items-center justify-center bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Welcome to GeoPhysics
              </h1>
              <p className="text-muted-foreground">
                Access academic resources for IIT (ISM) Dhanbad
              </p>
            </div>

            {/* Card */}
            <div className="bg-card border border-border rounded-2xl shadow-card p-6 md:p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <div className="relative mt-1.5">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Username or your.email@iitism.ac.in"
                          className="pl-10"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Password</Label>
                      <div className="relative mt-1.5">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData((p) => ({
                              ...p,
                              password: e.target.value,
                            }))
                          }
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Sign In <ArrowRight className="w-4 h-4" />
                    </Button>

                    <p className="text-xs text-muted-foreground">
                      Admin access: use username <span className="font-semibold">Ashraf</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ISM access: email <span className="font-semibold">2*mc****@iitism.ac.in</span> and password = email prefix
                    </p>
                  </form>
                </TabsContent>

                {/* REGISTER */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={registerData.fullName}
                      onChange={(e) =>
                        setRegisterData((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }))
                      }
                      required
                    />

                    <Input
                      placeholder="email@iitism.ac.in"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData((p) => ({
                          ...p,
                          email: e.target.value,
                        }))
                      }
                      required
                    />

                    <Input
                      type="password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData((p) => ({
                          ...p,
                          password: e.target.value,
                        }))
                      }
                      required
                    />

                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                    />

                    <Button type="submit" className="w-full" size="lg">
                      Create Account <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
