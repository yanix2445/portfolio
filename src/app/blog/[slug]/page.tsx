// ✅ src/app/blog/[slug]/page.tsx

import BlogPostClient from "./BlogPostClient";

const mockPost = {
  id: "post-001",
  slug: "mon-super-projet-tech",
  title: "Mon Super Projet Tech en 2025",
  contentHtml: `
    <p>Bienvenue sur mon blog ! Voici un article avec <strong>texte enrichi</strong>, images, vidéos, GIFs, et même audio.</p>
    <h2>Introduction</h2>
    <p>Je vous présente un projet passionnant sur lequel j’ai travaillé récemment.</p>
    <blockquote>“Le code, c’est de l’art et de la rigueur à la fois.”</blockquote>
    <ul>
      <li>Stack : Next.js, TypeScript, Supabase</li>
      <li>Déploiement : Vercel</li>
    </ul>
    <p>Profitez de la lecture !</p>
  `,
  media: [
    {
      id: "m1",
      type: "image",
      url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80",
      alt: "Photo projet",
    },
    {
      id: "m2",
      type: "gif",
      url: "https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif",
      alt: "GIF animé",
    },
    {
      id: "m3",
      type: "video",
      url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    },
    {
      id: "m4",
      type: "audio",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ],
  author: {
    name: "Yanis Harrat",
    avatar: "https://avatars.githubusercontent.com/u/123456?v=4",
  },
  date: "2025-08-06",
  tags: ["Next.js", "TypeScript", "Supabase", "WebDev"],
  likesCount: 12,
  comments: [
    {
      id: "c1",
      author: "Alice",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Super article, merci pour le partage !",
      date: "2025-08-07",
    },
    {
      id: "c2",
      author: "Bob",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "J’adore la section vidéo, très bien intégrée.",
      date: "2025-08-08",
    },
  ],
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient post={mockPost} />;
}