import type { Material } from "@/data/materials";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export function openMaterialFile(material: Material): boolean {
  const url = material.fileUrl?.trim();
  if (!url) return false;

  const anchor = document.createElement("a");

  // Chrome can block window.open on data: URLs; force direct download click instead.
  if (url.startsWith("data:")) {
    const ext = url.includes("application/pdf") ? "pdf" : url.includes("image/") ? "png" : "txt";
    anchor.href = url;
    anchor.download = `${slugify(material.title || material.id)}.${ext}`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return true;
  }

  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return true;
  }

  return false;
}
