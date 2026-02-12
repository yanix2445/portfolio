import { cacheLife } from "next/cache";
import { jobs } from "./experience";

export async function getExperience(locale: string = 'fr') {
    "use cache";
    cacheLife("max");

    return jobs[locale] || jobs['fr'];
}
