import { ArrowUpRight } from "lucide-react";

// Placeholder data for Professional Experience
const jobs = [
    {
        title: "FRONTEND DEVELOPER INTERN",
        period: "2023 - Present",
        company: "Tech Solutions Agency",
        description: "Contributed to the development of client websites and internal tools. Collaborated with senior developers to implement responsive designs and optimize performance.",
        achievements: [
            "Assisted in migrating legacy code to Next.js.",
            "Implemented reusable UI components using Tailwind CSS.",
            "Participated in code reviews and team agile meetings."
        ],
        selectedProjects: [
            {
                name: "Client Portal",
                description: "B2B Customer Dashboard",
                image: "/project-client.png"
            },
            {
                name: "Agency Site",
                description: "Corporate Website Redesign",
                image: "/project-agency.png"
            }
        ]
    }
];

export function Experience() {
    return (
        <section id="experience" className="relative z-10 px-6 py-16 md:px-12 lg:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#CC9400] tracking-tight">Professional Experience</h2>
                </div>

                <div className="space-y-16">
                    {jobs.map((item, index) => (
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

                                <div className="text-[#CC9400] text-xs font-medium mb-6 uppercase tracking-wide">{item.company}</div>

                                <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl text-sm">
                                    {item.description}
                                </p>

                                {/* Selected Projects Cards */}
                                <div className="mb-8">
                                    <div className="mb-3 text-[#CC9400] text-xs font-bold uppercase tracking-widest">Selected Projects</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {item.selectedProjects.map((project, idx) => (
                                            <div key={idx} className="group/card relative h-48 overflow-hidden rounded-lg bg-neutral-900 border border-white/5 hover:border-[#CC9400]/30 transition-all duration-300">
                                                {/* Background Image/Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 group-hover/card:scale-105 transition-transform duration-500">
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <span className="text-white/5 font-bold text-3xl -rotate-12 select-none">{project.name}</span>
                                                    </div>
                                                </div>

                                                {/* Arrow Icon */}
                                                <div className="absolute top-3 right-3 z-20">
                                                    <ArrowUpRight className="text-white/70 w-4 h-4 group-hover/card:text-[#CC9400] group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all" />
                                                </div>

                                                {/* Text Overlay */}
                                                <div className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-10">
                                                    <h4 className="text-white font-bold text-base mb-0.5 group-hover/card:text-[#CC9400] transition-colors">{project.name}</h4>
                                                    <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">{project.description}</p>
                                                </div>
                                            </div>
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
