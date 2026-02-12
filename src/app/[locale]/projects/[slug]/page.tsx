import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs, getProjectCategory, ProjectDetail } from "@/features/projects";
// cacheLife/cacheTag removed: incompatible with next-intl's headers() in Header
import { ExternalLink, Github, Terminal, CheckCircle2, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { MarkdownText } from "@/components/ui/MarkdownText";

// Force static params to enable static generation for each project
export async function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const project = getProjectBySlug(slug);
    const category = getProjectCategory(slug);
    const t = await getTranslations({ locale });

    if (!project || !category) {
        return {
            title: t("ProjectDetail.projectNotFound"),
        };
    }

    const name = t(`Projects.${category}.items.${slug}.name`);
    const description = t(`Projects.${category}.items.${slug}.description`);

    return {
        title: `${name} | Yanis Harrat`,
        description: description,
        alternates: {
            canonical: `/${locale}/projects/${slug}`,
            languages: {
                'fr': `/fr/projects/${slug}`,
                'en': `/en/projects/${slug}`,
            },
        },
        openGraph: {
            title: name,
            description: description,
            images: [
                {
                    url: typeof project.image === "string" ? project.image : project.image.src,
                },
            ],
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    setRequestLocale(locale);

    const project = getProjectBySlug(slug);
    const category = getProjectCategory(slug);
    const t = await getTranslations({ locale });

    if (!project || !category) {
        notFound();
    }

    const isGithub = project.link.includes("github.com");

    // Helper to get translated string paths
    const p = (path: string) => `Projects.${category}.items.${slug}.${path}`;

    // Construct detailed objects from translations + config
    const name = t(p("name"));
    const description = t(p("description"));
    // Get raw string for MarkdownText
    const fullDescription = t(p("fullDescription"));
    const topologyDescription = t(p("topology"));

    const steps = project.steps?.map((step, index) => ({
        ...step,
        title: t(p(`steps.${index}.title`)),
        description: t(p(`steps.${index}.description`))
    }));

    const achievements = Array.from({ length: project.achievementCount || 0 }).map((_, i) =>
        t(p(`achievements.${i}`))
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#CC9400] selection:text-black">
            <Header />

            <main className="pt-32 pb-24 px-6 md:px-12">
                <ProjectDetail>
                    <ProjectDetail.BackLink href="/#projects" label={t("ProjectDetail.backToPortfolio")} />

                    <ProjectDetail.Header title={name} tech={project.tech} />

                    <ProjectDetail.Hero src={project.image} alt={`Screenshot of ${name} project`} />

                    <ProjectDetail.Grid>
                        <ProjectDetail.Main>
                            <ProjectDetail.Section title={t("ProjectDetail.overview")} icon={Terminal}>
                                <MarkdownText content={fullDescription} className="whitespace-pre-wrap" />
                            </ProjectDetail.Section>

                            <ProjectDetail.Section title={t("ProjectDetail.networkTopology")} icon={Network}>
                                <MarkdownText content={topologyDescription} className="whitespace-pre-wrap" />
                            </ProjectDetail.Section>

                            {steps && steps.length > 0 && (
                                <ProjectDetail.Section title={t("ProjectDetail.configStrategy")} icon={Terminal}>
                                    <ProjectDetail.Steps steps={steps} />
                                </ProjectDetail.Section>
                            )}

                            {achievements.length > 0 && (
                                <ProjectDetail.Section title={t("ProjectDetail.keyResults")} icon={CheckCircle2}>
                                    <ProjectDetail.Achievements items={achievements} />
                                </ProjectDetail.Section>
                            )}
                        </ProjectDetail.Main>

                        <ProjectDetail.Sidebar>
                            <ProjectDetail.Card title={t("ProjectDetail.projectActions")}>
                                <div className="space-y-4">
                                    {project.demoLink && (
                                        <Button asChild className="w-full bg-[#CC9400] hover:bg-[#B88600] text-black font-bold h-14 rounded-none uppercase tracking-widest transition-transform hover:scale-[1.02]">
                                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                                <ExternalLink className="w-5 h-5" />
                                                {t("ProjectDetail.visitLiveSite")}
                                            </a>
                                        </Button>
                                    )}

                                    {project.link !== "#" ? (
                                        <Button asChild variant={project.demoLink ? "outline" : "default"} className={project.demoLink ? "w-full border-white/20 hover:bg-white/5 text-white h-14 rounded-none uppercase tracking-widest" : "w-full bg-[#CC9400] hover:bg-[#B88600] text-black font-bold h-14 rounded-none uppercase tracking-widest transition-transform hover:scale-[1.02]"}>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                                {isGithub ? <Github className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                                                {isGithub ? t("ProjectDetail.viewOnGithub") : t("ProjectDetail.visitProject")}
                                            </a>
                                        </Button>
                                    ) : (
                                        <div className="py-4 text-center border border-dashed border-white/10 rounded-lg">
                                            <p className="text-white/30 text-xs uppercase font-mono tracking-widest italic">{t("ProjectDetail.linkRestricted")}</p>
                                        </div>
                                    )}
                                </div>


                            </ProjectDetail.Card>

                            {/* Tech Stack List */}
                            <div className="px-4 py-2">
                                <h4 className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-4">{t("ProjectDetail.coreTechnology")}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech?.map((t, i) => (
                                        <div key={i} className="px-2 py-1 text-white/70 text-xs font-mono">
                                            ./{t.toLowerCase().replace(/\s+/g, '-')}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ProjectDetail.Sidebar>
                    </ProjectDetail.Grid>
                </ProjectDetail>
            </main>

            <Footer />
        </div>
    );
}
