import { cacheLife } from "next/cache";
import { skillCategories, languages, education } from "./skills";

export async function getSkillsData(locale: string = 'fr') {
    "use cache";
    cacheLife("max");

    return {
        categories: skillCategories[locale] || skillCategories['fr'],
        languages: languages[locale] || languages['fr'],
        education: education[locale] || education['fr']
    };
}
