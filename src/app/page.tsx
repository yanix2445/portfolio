import Head from "next/head";



const ComingSoonPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yanis Harrat",
    jobTitle: "Développeur Full-Stack & Technicien IT",
    description:
      "Étudiant BTS SIO SISR, développeur JavaScript/Python, spécialisé en automatisation et infrastructure réseau. Recherche alternance Paris 2025-2027.",
    url: "https://yanis-harrat.vercel.app",
    sameAs: [
      "https://www.linkedin.com/in/yanis-harrat",
      "https://github.com/yanix2445",
      "https://instagram.com/yanix2445",
      "https://twitter.com/yanix2445",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Next.js",
      "React",
      "PostgreSQL",
      "n8n",
      "Automatisation",
      "Réseau",
      "FTTH",
    ],
  };

  return (
    <>
      <Head>
        <title>Portfolio - Yanis Harrat</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="pt-32 pb-16 px-6">
        <div className=" flex flex-col justify-center items-center ">
          <h1>qsfdd</h1>
        <h1>qsfdd</h1>
        <h1>qsfdd</h1>
        <h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1><h1>qsfdd</h1>
        </div>
        
      </main>
    </>
  );
};

export default ComingSoonPage;