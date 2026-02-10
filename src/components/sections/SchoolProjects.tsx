import { Timeline } from "@/components/ui/Timeline";
import { PortfolioCard } from "@/components/ui/PortfolioCard";

const schoolProjects = [
    {
        title: "Systems & Networks Infrastructure",
        period: "2025 - 2027",
        school: "Fénelon Sup Paris",
        description: "Engaging in advanced laboratory projects and real-world simulations focused on core infrastructure management, security, and network orchestration.",
        achievements: [
            "Deployed and optimized enterprise-grade Active Directory Domain Services.",
            "Integrated complex DNS and DHCP architectures within virtualized environments.",
            "Automated system administration tasks using modern scripting and logic.",
            "Documented and managed infrastructure deployments via GitHub."
        ],
        selectedProjects: [
            {
                name: "Network Infrastructure",
                description: "AD DS, DNS, & DHCP deployment on VMware",
                link: "#",
                image: "/network-infra.png"
            },
            {
                name: "Portfolio V2",
                description: "Polished iteration with advanced Next.js patterns",
                link: "https://github.com/yanix2445/portfolio",
                image: "/portfolio-v2.png"
            },
            {
                name: "Portfolio V1",
                description: "Initial exploratory draft to grasp Next.js fundamentals",
                link: "https://github.com/yanix2445/portfolio2",
                image: "/portfolio-v1.png"
            },
            {
                name: "Legal Documentation",
                description: "Centralized legal compliance for tech infrastructure",
                link: "https://legal.yanis-harrat.com/",
                image: "/legal-docs.png"
            },
            {
                name: "Personal Linktree",
                description: "Centralized hub for professional social links",
                link: "https://linktree.yanis-harrat.com/",
                image: "/linktree.png"
            },
            {
                name: "VM Network Lab",
                description: "Cisco routing & Windows Server infrastructure",
                link: "#",
                image: "/vm-network.png"
            }
        ]
    },
    {
        title: "Software Logic & Shell Scripting",
        period: "2024",
        school: "42 Paris",
        description: "Intensive training focused on algorithmic logic, C programming, and Unix system mastery. Developing high-performance tools and custom environments.",
        achievements: [
            "Mastered shell environment customization and automation.",
            "Implemented modular and optimized configuration systems.",
            "Solved complex low-level programming challenges during 'La Piscine'.",
            "Built portable and lightweight tools for developers."
        ],
        selectedProjects: [
            {
                name: "ZSH Boost",
                description: "Clean, modular, and high-performance ZSH config",
                link: "https://github.com/yanix2445/zsh-boost",
                image: "/zsh-boost.png"
            }
        ]
    }
];

export function SchoolProjects() {
    return (
        <section id="projects" className="relative z-10 px-6 py-16 md:px-12 lg:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#CC9400] tracking-tight">School Projects</h2>
                </div>

                <Timeline>
                    {schoolProjects.map((item, index) => (
                        <Timeline.Item key={index}>
                            <Timeline.Header
                                title={item.title}
                                period={item.period}
                                subtitle={item.school}
                            />

                            <Timeline.Content>
                                {item.description}
                            </Timeline.Content>

                            <Timeline.Gallery>
                                {item.selectedProjects.map((project: any, idx) => (
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
