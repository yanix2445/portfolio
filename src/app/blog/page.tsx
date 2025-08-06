import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: "post-001",
    slug: "mon-super-projet-tech",
    title: "Mon Super Projet Tech en 2025",
    excerpt: "Un projet ambitieux avec Next.js, Supabase et React...",
    date: "2025-08-06",
  },
  {
    id: "post-002",
    slug: "optimisation-seo-portfolio",
    title: "Optimisation SEO de mon Portfolio",
    excerpt: "Techniques simples pour booster la visibilité sur Google.",
    date: "2025-07-21",
  },
];

export default function BlogHomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold mb-8">📝 Mon blog tech</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="p-6 bg-zinc-800 rounded-md">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-zinc-400 text-sm mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500">{post.date}</span>
              <Link href={`/blog/${post.slug}`}>
                <Button variant="outline">Lire l’article →</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}