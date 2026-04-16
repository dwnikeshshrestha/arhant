// This is a SERVER component — no "use client" here
import { notFound } from "next/navigation";
import { getSolutionBySlug, solutions } from "@/lib/solutions-data";
import SolutionDetailView from "@/components/blocks/SolutionDetailView";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Validate that the slug exists — notFound() if not
  const exists = getSolutionBySlug(slug);
  if (!exists) notFound();
  // Pass only the serializable slug string to the client component.
  // The client component will look up the full solution (including icon functions) itself.
  return <SolutionDetailView slug={slug} />;
}
