import { cacheLife } from "next/cache";
import { schoolProjectsConfig, personalProjectsConfig } from "./projects";

export async function getSchoolProjects() {
    "use cache";
    cacheLife("max");

    return schoolProjectsConfig;
}

export async function getPersonalProjects() {
    "use cache";
    cacheLife("max");

    return personalProjectsConfig;
}

