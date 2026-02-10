"use client";

import {
    SiCisco, SiDebian, SiUbuntu, SiLinux, SiGnubash,
    SiC, SiVim, SiGit, SiZsh, SiGnu, SiVmware, SiVirtualbox,
    SiProxmox, SiDocker, SiLinuxcontainers,
    SiOpenvpn, SiNextdotjs, SiReact, SiTypescript,
    SiTailwindcss, SiNodedotjs, SiJavascript, SiGithub,
    SiPython, SiAnsible, SiPostgresql, SiMysql, SiMariadb, SiSqlite,
    SiDbeaver, SiRedis, Si42, SiSlack, SiDiscord, SiNotion, SiTrello
} from "react-icons/si";
import {
    Network, Shield, Cpu, Cloud, Globe, Code2, Database, Users,
    Monitor, Terminal, Lock, Search, Mail, Sparkles, Layout, MousePointer2,
    Server, Activity, Eye
} from "lucide-react";
import { useEffect, useState, FC } from "react";

interface Tool {
    name: string;
    icon: any; // Can be IconType or LucideIcon
    color: string;
}

// Categorized Skills & Tools with Brand Colors
const skillCategories = [
    {
        name: "Systems & Network Administration",
        icon: Network,
        skills: ["Switch/Router Config", "LAN/WAN", "Active Directory", "DHCP/DNS"],
        tools: [
            { name: "Cisco", icon: SiCisco, color: "#1BA0D7" },
            { name: "Debian", icon: SiDebian, color: "#A81D33" },
            { name: "Windows Server", icon: Monitor, color: "#0078D4" },
            { name: "Ubuntu", icon: SiUbuntu, color: "#E94333" },
            { name: "Linux", icon: SiLinux, color: "#FCC624" },
            { name: "Packet Tracer", icon: Network, color: "#1BA0D7" }
        ]
    },
    {
        name: "Low-Level & Logic (42 Piscine)",
        icon: Cpu,
        skills: ["C Programming", "Shell Scripting", "Algorithmics", "Unit Testing"],
        tools: [
            { name: "C", icon: SiC, color: "#A8B9CC" },
            { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
            { name: "Vim", icon: SiVim, color: "#199C21" },
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Zsh", icon: SiZsh, color: "#FFFFFF" },
            { name: "GNU", icon: SiGnu, color: "#A42E2B" }
        ]
    },
    {
        name: "Cloud & Virtualization",
        icon: Cloud,
        skills: ["Hyper-V", "Containerization", "Cloud Infrastructure"],
        tools: [
            { name: "VMware", icon: SiVmware, color: "#607078" },
            { name: "VirtualBox", icon: SiVirtualbox, color: "#188FFF" },
            { name: "Proxmox", icon: SiProxmox, color: "#E57000" },
            { name: "Azure", icon: Cloud, color: "#0078D4" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "LXC", icon: SiLinuxcontainers, color: "#FFFFFF" }
        ]
    },
    {
        name: "Cybersecurity & Infrastructure",
        icon: Shield,
        skills: ["VPN/SSH", "Firewalling", "Network Forensics"],
        tools: [
            { name: "Wireshark", icon: Activity, color: "#1679A7" },
            { name: "Kali", icon: Shield, color: "#557CF2" },
            { name: "Nmap", icon: Search, color: "#82AD27" },
            { name: "OpenVPN", icon: SiOpenvpn, color: "#EA7E20" },
            { name: "OpenSSH", icon: Lock, color: "#FFFFFF" },
            { name: "Security", icon: Eye, color: "#CC9400" }
        ]
    },
    {
        name: "Web & App Development",
        icon: Globe,
        skills: ["Fullstack Dev", "Responsive UI", "REST APIs"],
        tools: [
            { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
            { name: "Javascript", icon: SiJavascript, color: "#F7DF1E" }
        ]
    },
    {
        name: "DevOps & Automation",
        icon: Code2,
        skills: ["CI/CD", "Scripting", "Version Control"],
        tools: [
            { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
            { name: "Python", icon: SiPython, color: "#3776AB" },
            { name: "PowerShell", icon: Terminal, color: "#5391FE" },
            { name: "Ansible", icon: SiAnsible, color: "#EE0000" },
            { name: "VS Code", icon: Code2, color: "#007ACC" },
            { name: "Trello", icon: SiTrello, color: "#0052CC" }
        ]
    },
    {
        name: "Database Management",
        icon: Database,
        skills: ["SQL Administration", "Relational Models"],
        tools: [
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
            { name: "MariaDB", icon: SiMariadb, color: "#003545" },
            { name: "SQLite", icon: SiSqlite, color: "#003B57" },
            { name: "DBeaver", icon: SiDbeaver, color: "#FFFFFF" },
            { name: "Redis", icon: SiRedis, color: "#DC382D" }
        ]
    },
    {
        name: "Peer-to-Peer Learning",
        icon: Users,
        skills: ["Collective Intelligence", "Problem Solving", "Autonomy"],
        tools: [
            { name: "42", icon: Si42, color: "#FFFFFF" },
            { name: "Slack", icon: SiSlack, color: "#4A154B" },
            { name: "Discord", icon: SiDiscord, color: "#5865F2" },
            { name: "Notion", icon: SiNotion, color: "#FFFFFF" },
            { name: "Teams", icon: Users, color: "#6264A7" },
            { name: "Outlook", icon: Mail, color: "#0078D4" }
        ]
    }
];

const languages = [
    { name: "French", level: "Native", percentage: 100 },
    { name: "Arabic", level: "Native (Fluent)", percentage: 92 },
    { name: "English", level: "Basic (School Level)", percentage: 45 },
];

const education = [
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

export function Skills() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="skills" className="relative z-10 px-6 py-12 md:px-12 lg:py-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-16 text-3xl md:text-4xl font-bold text-[#CC9400] tracking-tight text-center uppercase">Competencies</h2>

                {/* --- Categorized Skills Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {skillCategories.map((cat, idx) => (
                        <div key={idx} className="flex flex-col gap-4 border-l border-white/10 pl-6 group">
                            <div className="flex items-center gap-2 mb-1">
                                <cat.icon className="w-4 h-4 text-[#CC9400] opacity-70" />
                                <h3 className="text-[#CC9400] text-[10px] font-bold uppercase tracking-widest">{cat.name}</h3>
                            </div>
                            <ul className="flex flex-col gap-1.5">
                                {cat.skills.map((s, i) => (
                                    <li key={i} className="text-white/70 text-sm font-medium leading-tight">{s}</li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-4 mt-3">
                                {cat.tools.map((t, i) => (
                                    <div key={i} className="group/tool relative flex items-center justify-center">
                                        <t.icon
                                            className="w-5 h-5 transition-all duration-300 opacity-100 grayscale-0 md:opacity-50 md:grayscale group-hover:opacity-100 group-hover:grayscale-0"
                                            style={{ color: t.color }}
                                            title={t.name}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Languages & Education Subsection --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 border-t border-white/5 pt-12">

                    {/* Languages Column */}
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-wider">Languages</h3>
                        <div className="space-y-5">
                            {languages.map((lang, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-1.5 align-bottom">
                                        <span className="text-white font-bold text-sm md:text-base">{lang.name}</span>
                                        <span className="text-gray-500 text-[10px] uppercase font-mono tracking-wider">{lang.level}</span>
                                    </div>
                                    <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#CC9400] rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: mounted ? `${lang.percentage}%` : "0%" }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-wider">Education</h3>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div key={index} className="flex gap-4 group">
                                    <div className="flex flex-col items-center mt-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#CC9400] shrink-0 group-hover:shadow-[0_0_8px_#CC9400] transition-shadow"></span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm md:text-base leading-tight mb-1 group-hover:text-[#CC9400] transition-colors">{edu.school}</h4>
                                        <p className="text-white/70 font-medium text-xs md:text-sm mb-0.5">{edu.degree}</p>
                                        <p className="text-gray-600 text-[10px] uppercase font-mono tracking-wide">{edu.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
