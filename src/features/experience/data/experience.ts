import { Job } from "../types";

const jobsEn: Job[] = [
    {
        title: "TECHNICAL CONSULTANT & NO-CODE/FULLSTACK BUILDER",
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
        title: "Head Waiter",
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
        title: "Fiber Optic Technician",
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
        title: "Head Waiter",
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

const jobsFr: Job[] = [
    {
        title: "CONSULTANT TECHNIQUE & NO-CODE/FULLSTACK BUILDER",
        period: "2025 - 2025",
        company: "IUT MEAUX",
        description: "Conseil en architecture technique et développement de solutions fullstack/no-code pour optimiser les flux académiques et administratifs.",
        achievements: [
            "Analyse des besoins métier et cadrage fonctionnel en méthodologie Agile.",
            "Architecture d'une refonte complète du SI avec un stack hybride (Airtable + n8n + JS + Python).",
            "Conception de bases de données relationnelles et développement d'automatisations complexes.",
            "Administration sécurisée, tests fonctionnels et documentation technique.",
            "Livraison d'un système clé en main incluant formation utilisateur et maintenance."
        ],
        selectedProjects: [
            {
                name: "Consulting Technique",
                description: "Développement Fullstack & No-Code",
                link: "#",
                image: "/iut-meaux.png"
            }
        ]
    },
    {
        title: "Chef de Rang",
        period: "2023 - 2025",
        company: "Coco Rocco",
        description: "Service haut de gamme dans un bistro italien dynamique, maintien de standards rigoureux de service et d'efficacité opérationnelle.",
        achievements: [
            "Accueil et conseil des clients pour garantir une satisfaction maximale.",
            "Gestion de la carte, prise de commandes et demandes spécifiques.",
            "Coordination du service avec la cuisine pour un timing optimal.",
            "Supervision et mentorat de l'équipe de salle.",
            "Gestion de la facturation complexe et départ professionnel des clients."
        ],
        selectedProjects: [
            {
                name: "Coco Rocco Bistro",
                description: "Cuisine Italienne Authentique à Puteaux",
                link: "https://www.cocorocco.fr/",
                image: "/cocorocco.png"
            }
        ]
    },
    {
        title: "Technicien Fibre Optique",
        period: "2022 - 2023",
        company: "Fibrouss",
        description: "Spécialisé dans l'installation et la mise en service de réseaux fibre abonnés et d'infrastructures LAN/WAN.",
        achievements: [
            "Installation et maintenance d'infrastructures FTTH (câblage, PTO, soudure optique).",
            "Mise en service d'équipements réseau : routeurs, ONT et modems.",
            "Diagnostic et résolution d'incidents techniques (connectivité, débit).",
            "Support technique L1/L2 et dépannage matériel.",
            "Tests de performance par réflectométrie et analyse TCP/IP.",
            "Interventions terrain autonomes et formation clients."
        ],
        selectedProjects: [
            {
                name: "Infrastructure Fibre",
                description: "Déploiement Réseau Optique",
                link: "#",
                image: "/fibrouss.png"
            }
        ]
    },
    {
        title: "Chef de Rang",
        period: "2022 - 2023",
        company: "Golf de Saint-Nom-la-Bretèche",
        description: "Service haut de gamme dans un club sportif prestigieux et exclusif, avec une attention méticuleuse aux détails et à la satisfaction des membres.",
        achievements: [
            "Service premium à table et conseil aux membres dans un club exclusif.",
            "Coordination des commandes et timing précis avec la cuisine.",
            "Supervision de la salle et suivi du flux de service.",
            "Organisation de la salle et mentorat des membres juniors.",
            "Garantie de la satisfaction des membres par des standards professionnels impeccables."
        ],
        selectedProjects: [
            {
                name: "Saint-Nom-la-Bretèche",
                description: "Club Sportif Privé Full-Service",
                link: "https://www.golfdesaintnomlabreteche.com/",
                image: "/golf-stnom.png"
            }
        ]
    }
];

export const jobs: Record<string, Job[]> = {
    en: jobsEn,
    fr: jobsFr
};
