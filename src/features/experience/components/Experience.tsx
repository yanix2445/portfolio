"use client";

import { Timeline } from "@/components/ui/Timeline";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { useTranslations } from "next-intl";

import { Job } from "../types";

interface ExperienceProps {
    jobs: Job[];
}

export function Experience({ jobs }: ExperienceProps) {
    const t = useTranslations("Experience");
    return (
        <section id="experience" className="relative z-10 px-6 py-16 md:px-12 lg:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#CC9400] tracking-tight text-center uppercase">{t("title")}</h2>
                </div>

                <Timeline variant="dense">
                    {jobs.map((item, index) => (
                        <Timeline.Item key={index}>
                            <Timeline.Header
                                title={item.title}
                                period={item.period}
                                subtitle={item.company}
                            />

                            <Timeline.Content className="italic">
                                {item.description}
                            </Timeline.Content>

                            <Timeline.Gallery title="Establishment">
                                {item.selectedProjects.map((project, idx) => (
                                    <PortfolioCard
                                        key={idx}
                                        name={project.name}
                                        description={project.description}
                                        image={project.image}
                                        link={project.link}
                                    />
                                ))}
                            </Timeline.Gallery>

                            <Timeline.Achievements items={item.achievements} />
                        </Timeline.Item>
                    ))}
                </Timeline>
            </div>
        </section>
    );
}
