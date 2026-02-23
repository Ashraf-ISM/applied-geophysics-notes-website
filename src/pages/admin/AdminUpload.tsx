import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminUpload() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Upload PYQ / Material</h1>

        <div className="space-y-4">
          <Input placeholder="Title" />
          <Input placeholder="Exam (gate / net / gsi / semester)" />
          <Input placeholder="Year" />
          <Input placeholder="PDF URL" />

          <Button className="w-full">Upload</Button>
        </div>
      </section>
    </Layout>
  );
}
