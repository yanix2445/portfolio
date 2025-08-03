import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground pt-40 bg-background ">

      {/* Hero Section */}
      <section className=" flex items-center justify-around text-center px-24 py-24">
        <div className="max-w-lg"> 
          <h1 className="pb-4 text-5xl font-bold">
            hello , je suis Yanis Harrat
          </h1>
          <h3 className="pb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
            autem facere laborum et ad adipisci fuga,
          </h3>
          <Badge> sé</Badge><Badge> sé</Badge><Badge> sé</Badge><Badge> sé</Badge>
        </div>
        <div>
          <Image 
            src="/IMG_5834-2.png"
            alt="photo de yanis harrat"
            width={500}
            height={500}
            className="rounded-full shadow-lg transition-transform duration-300"
          />
        </div>
      </section>
    </main>
  );
}
