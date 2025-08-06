// ✅ src/app/blog/[slug]/BlogPostClient.tsx

"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";
import { TwitterShareButton, LinkedinShareButton } from "react-share";

export default function BlogPostClient({ post }: { post: any }) {
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [likes, setLikes] = useState(post.likesCount);
  const [liked, setLiked] = useState(false);

  function handleAddComment() {
    if (!pseudo.trim() || !newComment.trim()) return alert("Pseudo et commentaire obligatoires");
    const comment = {
      id: Date.now().toString(),
      author: pseudo.trim(),
      text: newComment.trim(),
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${pseudo.trim()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    setComments([comment, ...comments]);
    setNewComment("");
  }

  function toggleLike() {
    setLikes((l: number) => liked ? l - 1 : l + 1);
        setLiked(!liked);
  }

  function exportPdf() {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(post.title, 10, 20);
    const textContent = post.contentHtml.replace(/<[^>]+>/g, "");
    doc.setFontSize(12);
    doc.text(textContent, 10, 30);
    doc.save(`${post.slug}.pdf`);
  }
  type CommentType = {
    id: string;
    author: string;
    avatar: string;
    text: string;
    date: string;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-zinc-900 text-white min-h-screen">
      <Card className="p-6 bg-zinc-800 mb-8 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-sm text-zinc-400">
              Par {post.author.name} — {post.date}
            </p>
          </div>
        </div>

        <div
          className="prose prose-invert max-w-full"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-6 space-y-6">
          {post.media.map((m: any) => {
            if (m.type === "image" || m.type === "gif")
              return (
                <img
                  key={m.id}
                  src={m.url}
                  alt={m.alt || ""}
                  className="rounded-md mx-auto max-h-96 object-contain"
                />
              );
            if (m.type === "video")
              return (
                <video
                  key={m.id}
                  src={m.url}
                  controls
                  className="rounded-md mx-auto max-h-96"
                />
              );
            if (m.type === "audio")
              return <audio key={m.id} src={m.url} controls className="mx-auto" />;
            return null;
          })}
        </div>

        <div className="mt-8 flex items-center space-x-4">
          <Button onClick={toggleLike} variant={liked ? "default" : "outline"}>
            {liked ? "❤️" : "🤍"} {likes}
          </Button>

          <TwitterShareButton url={typeof window !== "undefined" ? window.location.href : ""} title={post.title}>
            <Button variant="outline">Partager Twitter</Button>
          </TwitterShareButton>

          <LinkedinShareButton url={typeof window !== "undefined" ? window.location.href : ""} title={post.title}>
            <Button variant="outline">Partager LinkedIn</Button>
          </LinkedinShareButton>

          <Button onClick={exportPdf} variant="outline">Exporter PDF</Button>

          <Button onClick={() => window.print()} variant="outline" className="ml-auto">Imprimer</Button>
        </div>
      </Card>

      <section className="mt-10">
        <h2 className="text-2xl mb-4">Commentaires</h2>

        <div className="mb-6 flex space-x-4">
          <input
            type="text"
            placeholder="Ton pseudo"
            className="rounded bg-zinc-800 p-2 flex-1 text-white"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <Textarea
            placeholder="Écris un commentaire..."
            className="flex-[3] bg-zinc-800 text-white"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>Envoyer</Button>
        </div>

        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {comments.length === 0 && (
            <p className="text-zinc-400 italic">Pas encore de commentaires.</p>
          )}

{comments.map((c: CommentType) => (
            <div key={c.id} className="p-3 bg-zinc-700 rounded flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={c.avatar} alt={c.author} />
                <AvatarFallback>{c.author.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{c.author}</span>
                  <span className="text-xs text-zinc-400">{c.date}</span>
                </div>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}