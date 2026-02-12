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
    Monitor, Terminal, Lock, Search, Mail, Activity, Eye
} from "lucide-react";

export const iconMap: Record<string, any> = {
    // Lucide Icons
    Network, Shield, Cpu, Cloud, Globe, Code2, Database, Users,
    Monitor, Terminal, Lock, Search, Mail, Activity, Eye,

    // React Icons (Simple Icons)
    SiCisco, SiDebian, SiUbuntu, SiLinux, SiGnubash,
    SiC, SiVim, SiGit, SiZsh, SiGnu, SiVmware, SiVirtualbox,
    SiProxmox, SiDocker, SiLinuxcontainers,
    SiOpenvpn, SiNextdotjs, SiReact, SiTypescript,
    SiTailwindcss, SiNodedotjs, SiJavascript, SiGithub,
    SiPython, SiAnsible, SiPostgresql, SiMysql, SiMariadb, SiSqlite,
    SiDbeaver, SiRedis, Si42, SiSlack, SiDiscord, SiNotion, SiTrello
};

interface SkillIconProps {
    name: string;
    className?: string;
}

export function SkillIcon({ name, className }: SkillIconProps) {
    const Icon = iconMap[name];

    if (!Icon) {
        console.warn(`Icon not found: ${name}`);
        return null;
    }

    return <Icon className={className} />;
}
