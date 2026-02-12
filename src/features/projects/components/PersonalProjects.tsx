import { Timeline, TimelineItem, TimelineHeader, TimelineContent, TimelineGallery, TimelineAchievements } from "@/components/ui/Timeline";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { MarkdownText } from "@/components/ui/MarkdownText";
import { CategoryConfig } from "../types";
import { useTranslations } from "next-intl";

interface PersonalProjectsProps {
    projects: CategoryConfig;
}

export function PersonalProjects({ projects }: PersonalProjectsProps) {
    const t = useTranslations("Projects");
    const categoryId = projects.id;

    return (
        <section id="personal-projects" className="relative z-10 px-6 py-16 md:px-12 lg:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#CC9400] tracking-tight">{t(`${categoryId}.title`)}</h2>
                </div>

                <Timeline>
                    <TimelineItem>
                        <TimelineHeader
                            title={t(`${categoryId}.title`)}
                            period={t(`${categoryId}.period`)}
                            subtitle={t(`${categoryId}.school`)}
                        />

                        <TimelineContent>
                            <MarkdownText content={t(`${categoryId}.description`)} />
                        </TimelineContent>

                        <TimelineGallery>
                            {projects.projects.map((project) => (
                                <PortfolioCard
                                    key={project.slug}
                                    name={t(`${categoryId}.items.${project.slug}.name`)}
                                    description={t(`${categoryId}.items.${project.slug}.description`)}
                                    image={project.image}
                                    link={`/projects/${project.slug}`}
                                />
                            ))}
                        </TimelineGallery>

                        <TimelineAchievements
                            items={Array.from({ length: projects.achievementCount }).map((_, i) =>
                                t(`${categoryId}.achievements.${i}`)
                            )}
                        />
                    </TimelineItem>
                </Timeline>
            </div>
        </section>
    );
}
