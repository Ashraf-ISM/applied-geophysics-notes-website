import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Layers, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage academic resources and uploads
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <FileText className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-2xl font-bold">48</h3>
              <p className="text-sm text-muted-foreground">Total PYQs</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-2xl font-bold">32</h3>
              <p className="text-sm text-muted-foreground">Class Notes</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Layers className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-2xl font-bold">16</h3>
              <p className="text-sm text-muted-foreground">Semester Papers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Upload className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-2xl font-bold">96</h3>
              <p className="text-sm text-muted-foreground">Total Uploads</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Actions */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

          <Link to="/admin/upload">
            <Button>Upload New Material</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
