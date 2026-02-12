import { StaticImageData } from "next/image";

export interface JobProject {
    name: string;
    description: string;
    link: string;
    image: string | StaticImageData;
}

export interface Job {
    title: string;
    period: string;
    company: string;
    description: string;
    achievements: string[];
    selectedProjects: JobProject[];
}
