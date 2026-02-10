import { Timeline } from "@/components/ui/Timeline";
import { PortfolioCard } from "@/components/ui/PortfolioCard";

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

                <Timeline>
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
