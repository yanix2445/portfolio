import { SkillCategory, Language, Education } from "../types";

// Tool/tech names are universal — only category names, language levels, and education labels change per locale

const categoriesEn: SkillCategory[] = [
    {
        name: "Systems & Network Administration",
        icon: "Network",
        skills: ["Switch/Router Config", "LAN/WAN", "Active Directory", "DHCP/DNS"],
        tools: [
            { name: "Cisco", icon: "SiCisco", color: "#1BA0D7" },
            { name: "Debian", icon: "SiDebian", color: "#A81D33" },
            { name: "Windows Server", icon: "Monitor", color: "#0078D4" },
            { name: "Ubuntu", icon: "SiUbuntu", color: "#E94333" },
            { name: "Linux", icon: "SiLinux", color: "#FCC624" },
            { name: "Packet Tracer", icon: "Network", color: "#1BA0D7" }
        ]
    },
    {
        name: "Low-Level & Logic (42 Piscine)",
        icon: "Cpu",
        skills: ["C Programming", "Shell Scripting", "Algorithmics", "Unit Testing"],
        tools: [
            { name: "C", icon: "SiC", color: "#A8B9CC" },
            { name: "Bash", icon: "SiGnubash", color: "#4EAA25" },
            { name: "Vim", icon: "SiVim", color: "#199C21" },
            { name: "Git", icon: "SiGit", color: "#F05032" },
            { name: "Zsh", icon: "SiZsh", color: "#FFFFFF" },
            { name: "GNU", icon: "SiGnu", color: "#A42E2B" }
        ]
    },
    {
        name: "Cloud & Virtualization",
        icon: "Cloud",
        skills: ["Hyper-V", "Containerization", "Cloud Infrastructure"],
        tools: [
            { name: "VMware", icon: "SiVmware", color: "#607078" },
            { name: "VirtualBox", icon: "SiVirtualbox", color: "#188FFF" },
            { name: "Proxmox", icon: "SiProxmox", color: "#E57000" },
            { name: "Azure", icon: "Cloud", color: "#0078D4" },
            { name: "Docker", icon: "SiDocker", color: "#2496ED" },
            { name: "LXC", icon: "SiLinuxcontainers", color: "#FFFFFF" }
        ]
    },
    {
        name: "Cybersecurity & Infrastructure",
        icon: "Shield",
        skills: ["VPN/SSH", "Firewalling", "Network Forensics"],
        tools: [
            { name: "Wireshark", icon: "Activity", color: "#1679A7" },
            { name: "Kali", icon: "Shield", color: "#557CF2" },
            { name: "Nmap", icon: "Search", color: "#82AD27" },
            { name: "OpenVPN", icon: "SiOpenvpn", color: "#EA7E20" },
            { name: "OpenSSH", icon: "Lock", color: "#FFFFFF" },
            { name: "Security", icon: "Eye", color: "#CC9400" }
        ]
    },
    {
        name: "Web & App Development",
        icon: "Globe",
        skills: ["Fullstack Dev", "Responsive UI", "REST APIs"],
        tools: [
            { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF" },
            { name: "React", icon: "SiReact", color: "#61DAFB" },
            { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
            { name: "Tailwind", icon: "SiTailwindcss", color: "#06B6D4" },
            { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
            { name: "Javascript", icon: "SiJavascript", color: "#F7DF1E" }
        ]
    },
    {
        name: "DevOps & Automation",
        icon: "Code2",
        skills: ["CI/CD", "Scripting", "Version Control"],
        tools: [
            { name: "GitHub", icon: "SiGithub", color: "#FFFFFF" },
            { name: "Python", icon: "SiPython", color: "#3776AB" },
            { name: "PowerShell", icon: "Terminal", color: "#5391FE" },
            { name: "Ansible", icon: "SiAnsible", color: "#EE0000" },
            { name: "VS Code", icon: "Code2", color: "#007ACC" },
            { name: "Trello", icon: "SiTrello", color: "#0052CC" }
        ]
    },
    {
        name: "Database Management",
        icon: "Database",
        skills: ["SQL Administration", "Relational Models"],
        tools: [
            { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
            { name: "MySQL", icon: "SiMysql", color: "#4479A1" },
            { name: "MariaDB", icon: "SiMariadb", color: "#003545" },
            { name: "SQLite", icon: "SiSqlite", color: "#003B57" },
            { name: "DBeaver", icon: "SiDbeaver", color: "#FFFFFF" },
            { name: "Redis", icon: "SiRedis", color: "#DC382D" }
        ]
    },
    {
        name: "Peer-to-Peer Learning",
        icon: "Users",
        skills: ["Collective Intelligence", "Problem Solving", "Autonomy"],
        tools: [
            { name: "42", icon: "Si42", color: "#FFFFFF" },
            { name: "Slack", icon: "SiSlack", color: "#4A154B" },
            { name: "Discord", icon: "SiDiscord", color: "#5865F2" },
            { name: "Notion", icon: "SiNotion", color: "#FFFFFF" },
            { name: "Teams", icon: "Users", color: "#6264A7" },
            { name: "Outlook", icon: "Mail", color: "#0078D4" }
        ]
    }
];

const categoriesFr: SkillCategory[] = [
    {
        name: "Administration Systèmes & Réseaux",
        icon: "Network",
        skills: ["Config Switch/Routeur", "LAN/WAN", "Active Directory", "DHCP/DNS"],
        tools: categoriesEn[0].tools
    },
    {
        name: "Bas Niveau & Logique (42 Piscine)",
        icon: "Cpu",
        skills: ["Programmation C", "Scripting Shell", "Algorithmique", "Tests Unitaires"],
        tools: categoriesEn[1].tools
    },
    {
        name: "Cloud & Virtualisation",
        icon: "Cloud",
        skills: ["Hyper-V", "Conteneurisation", "Infrastructure Cloud"],
        tools: categoriesEn[2].tools
    },
    {
        name: "Cybersécurité & Infrastructure",
        icon: "Shield",
        skills: ["VPN/SSH", "Pare-feu", "Forensique Réseau"],
        tools: categoriesEn[3].tools
    },
    {
        name: "Développement Web & Apps",
        icon: "Globe",
        skills: ["Dev Fullstack", "UI Responsive", "APIs REST"],
        tools: categoriesEn[4].tools
    },
    {
        name: "DevOps & Automatisation",
        icon: "Code2",
        skills: ["CI/CD", "Scripting", "Gestion de Version"],
        tools: categoriesEn[5].tools
    },
    {
        name: "Gestion de Bases de Données",
        icon: "Database",
        skills: ["Administration SQL", "Modèles Relationnels"],
        tools: categoriesEn[6].tools
    },
    {
        name: "Apprentissage Pair-à-Pair",
        icon: "Users",
        skills: ["Intelligence Collective", "Résolution de Problèmes", "Autonomie"],
        tools: categoriesEn[7].tools
    }
];

const languagesEn: Language[] = [
    { name: "French", level: "Native", percentage: 100 },
    { name: "Arabic", level: "Native (Fluent)", percentage: 92 },
    { name: "English", level: "Basic (School Level)", percentage: 45 },
];

const languagesFr: Language[] = [
    { name: "Français", level: "Langue maternelle", percentage: 100 },
    { name: "Arabe", level: "Langue maternelle (courant)", percentage: 92 },
    { name: "Anglais", level: "Basique (niveau scolaire)", percentage: 45 },
];

const educationEn: Education[] = [
    {
        school: "Fénelon Sup Paris",
        degree: "BTS SIO SISR (Systems & Networks)",
        year: "2025 - 2027"
    },
    {
        school: "42 Paris",
        degree: "La Piscine (Intensive C/Logic)",
        year: "2024"
    },
    {
        school: "Lycée Polyvalent",
        degree: "Bac Pro SN ARED (Networks & Home Automation)",
        year: "Obtained in 2022"
    }
];

const educationFr: Education[] = [
    {
        school: "Fénelon Sup Paris",
        degree: "BTS SIO SISR (Systèmes & Réseaux)",
        year: "2025 - 2027"
    },
    {
        school: "42 Paris",
        degree: "La Piscine (C/Logique Intensif)",
        year: "2024"
    },
    {
        school: "Lycée Polyvalent",
        degree: "Bac Pro SN ARED (Réseaux & Domotique)",
        year: "Obtenu en 2022"
    }
];

export const skillCategories: Record<string, SkillCategory[]> = {
    en: categoriesEn,
    fr: categoriesFr
};

export const languages: Record<string, Language[]> = {
    en: languagesEn,
    fr: languagesFr
};

export const education: Record<string, Education[]> = {
    en: educationEn,
    fr: educationFr
};
