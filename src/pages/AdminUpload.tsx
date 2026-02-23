import { Layout } from "@/components/layout/Layout";

export default function AdminUpload() {
  return (
    <Layout>
      <section className="py-20 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Upload Material</h1>
        <p className="text-muted-foreground">
          Upload PYQs, notes, and semester papers here.
        </p>

        <div className="mt-10 border border-dashed rounded-xl p-10 text-center">
          Upload form will go here
        </div>
      </section>
    </Layout>
  );
}
