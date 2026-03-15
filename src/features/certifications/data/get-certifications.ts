import { cacheLife } from "next/cache";
import { certifications } from "./certifications";

export async function getCertificationsData(locale: string = 'fr') {
    "use cache";
    cacheLife("max");

    return {
        items: certifications[locale] || certifications['fr'],
    };
}
