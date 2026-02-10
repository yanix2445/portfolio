import { ArrowUpRight } from "lucide-react";

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

                <div className="space-y-16">
                    {schoolProjects.map((item, index) => (
                        <div key={index} className="relative group">
                            {/* Timeline Line */}
                            <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-white/10 group-last:bottom-auto group-last:h-full"></div>

                            {/* Timeline Dot */}
                            <div className="hidden md:block absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-[#CC9400] ring-4 ring-black"></div>

                            <div className="md:pl-10">
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
                                        <span className="text-[#CC9400] mr-2 md:hidden">•</span> {item.title}
                                    </h3>
                                    <span className="text-white font-medium text-sm mt-1 md:mt-0">{item.period}</span>
                                </div>

                                <div className="text-[#CC9400] text-xs font-medium mb-6 uppercase tracking-wide">{item.school}</div>

                                <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl text-sm">
                                    {item.description}
                                </p>

                                {/* Selected Projects Cards */}
                                <div className="mb-8">
                                    <div className="mb-3 text-[#CC9400] text-xs font-bold uppercase tracking-widest">Selected Projects</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {item.selectedProjects.map((project: any, idx) => (
                                            <a
                                                key={idx}
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/card relative aspect-video overflow-hidden rounded-lg bg-neutral-900 border border-white/5 hover:border-[#CC9400]/30 transition-all duration-300 block"
                                            >
                                                {/* Background Image */}
                                                <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                                                    <img
                                                        src={project.image}
                                                        alt={project.name}
                                                        className="w-full h-full object-cover opacity-80 group-hover/card:scale-110 group-hover/card:opacity-100 transition-all duration-700"
                                                    />
                                                </div>

                                                {/* Arrow Icon */}
                                                <div className="absolute top-3 right-3 z-20">
                                                    <ArrowUpRight className="text-white/70 w-4 h-4 group-hover/card:text-[#CC9400] group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all" />
                                                </div>

                                                {/* Text Overlay */}
                                                <div className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-10">
                                                    <h4 className="text-white font-bold text-base mb-0.5 group-hover/card:text-[#CC9400] transition-colors">{project.name}</h4>
                                                    <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">{project.description}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Achievements List */}
                                <ul className="space-y-2">
                                    {item.achievements.map((achievement, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                            <span className="mt-2 h-0.5 w-2 bg-[#CC9400] shrink-0"></span>
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
