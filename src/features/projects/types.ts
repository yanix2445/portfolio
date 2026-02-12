import { StaticImageData } from "next/image";



export interface ProjectStepConfig {
    code?: string; // Terminal commands or code snippets
    language?: string; // e.g., "bash", "cisco", "sql"
    image?: string | StaticImageData;
}

export interface ProjectConfig {
    slug: string;
    image: string | StaticImageData;
    link: string;
    demoLink?: string;
    tech?: string[];
    // We need to know how many achievements to render from translations
    achievementCount?: number;
    // We need to know the topology image if any (description is in JSON)
    topology?: {
        image?: string | StaticImageData;
    };
    steps?: ProjectStepConfig[];
}

export interface CategoryConfig {
    id: "school" | "personal";
    achievementCount: number;
    projects: ProjectConfig[];
}
