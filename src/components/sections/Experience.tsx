import { ArrowUpRight } from "lucide-react";

// Placeholder data for Professional Experience
const jobs = [
    {
        title: "CONSULTANT TECHNIQUE & NO-CODE/FULLSTACK BUILDER",
        period: "2025 - 2025",
        company: "IUT MEAUX",
        description: "Advising on technical architecture and building fullstack/no-code solutions to optimize academic and administrative workflows.",
        achievements: [
            "Analyzed business needs and functional scoping using Agile methodology.",
            "Architected a complete IS overhaul using a hybrid stack (Airtable + n8n + JS + Python).",
            "Designed relational databases and developed complex custom automations.",
            "Managed secure administration, functional testing, and technical documentation.",
            "Delivered a turnkey system including user training and ongoing maintenance."
        ],
        selectedProjects: [
            {
                name: "Technical Consulting",
                description: "Fullstack & No-Code Development",
                link: "#",
                image: "/iut-meaux.png"
            }
        ]
    },
    {
        title: "Chef de Rang",
        period: "2023 - 2025",
        company: "Coco Rocco",
        description: "Delivering high-end hospitality in a fast-paced Italian bistro environment, maintaining rigorous standards of service and operational efficiency.",
        achievements: [
            "Welcomed and advised guests to ensure maximum satisfaction.",
            "Managed menu presentation, order taking, and specific guest requests.",
            "Coordinated service workflow with the kitchen for optimal timing.",
            "Supervised and mentored floor staff to ensure mission success.",
            "Handled complex billing and ensured professional guest departures."
        ],
        selectedProjects: [
            {
                name: "Coco Rocco Bistro",
                description: "Authentic Italian Dining in Puteaux",
                link: "https://www.cocorocco.fr/",
                image: "/cocorocco.png"
            }
        ]
    },
    {
        title: "Technicien Fibre Optique",
        period: "2022 - 2023",
        company: "Fibrouss",
        description: "Specialized in the installation and commissioning of subscriber fiber networks and LAN/WAN infrastructure.",
        achievements: [
            "Installed and maintained FTTH infrastructure (cabling, PTO, optical splicing).",
            "Commissioned network equipment including routers, ONTs, and modems.",
            "Diagnosed and resolved technical incidents (connectivity, throughput).",
            "Provided L1/L2 technical support and hardware troubleshooting.",
            "Performed performance testing via reflectometry and TCP/IP analysis.",
            "Managed autonomous field interventions and client training."
        ],
        selectedProjects: [
            {
                name: "Fiber Infrastructure",
                description: "Optical Network Deployment",
                link: "#",
                image: "/fibrouss.png"
            }
        ]
    },
    {
        title: "Chef de Rang",
        period: "2022 - 2023",
        company: "Golf de Saint-Nom-la-Bretèche",
        description: "Delivering high-end service in a prestigious and exclusive sporting club environment, ensuring meticulous attention to detail and member satisfaction.",
        achievements: [
            "Provided premium table service and member advisory in an exclusive club.",
            "Coordinated orders and timed service with precise kitchen synchronization.",
            "Supervised the floor and monitored service flow for excellence.",
            "Managed floor organization and mentored junior staff members.",
            "Guaranteed member satisfaction through impeccable professional standards."
        ],
        selectedProjects: [
            {
                name: "Saint-Nom-la-Bretèche",
                description: "Full-Service Private Sports Club",
                link: "https://www.golfdesaintnomlabreteche.com/",
                image: "/golf-stnom.png"
            }
        ]
    }
];

export function Experience() {
    return (
        <section id="experience" className="relative z-10 px-6 py-16 md:px-12 lg:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#CC9400] tracking-tight text-center uppercase">Professional Experience</h2>
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

                                <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl text-sm italic">
                                    {item.description}
                                </p>

                                {/* Experience Gallery/Links */}
                                <div className="mb-8">
                                    <div className="mb-3 text-[#CC9400] text-xs font-bold uppercase tracking-widest">Establishment</div>
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
