import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <p className="text-muted-foreground mb-8">
          Manage PYQs, notes, and study materials.
        </p>

        <div className="flex gap-4">
          <Link to="/admin/upload">
            <Button>Upload Materials</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
