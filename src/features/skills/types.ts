export interface Tool {
    name: string;
    icon: string; // Icon name key
    color: string;
}

export interface SkillCategory {
    name: string;
    icon: string; // Icon name key
    skills: string[];
    tools: Tool[];
}

export interface Language {
    name: string;
    level: string;
    percentage: number;
}

export interface Education {
    school: string;
    degree: string;
    year: string;
}
