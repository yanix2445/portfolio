import { Certification } from "../types";

const googleBadge = "/assets/images/certifications/google-cybersecurity.png";
const ciscoBadge = "/assets/images/certifications/cisco-cybersecurity.png";
const googleItBadge = "/assets/images/certifications/google-it-support.png";

const certificationsEn: Certification[] = [
    {
        name: "Google Cybersecurity Professional Certificate",
        issuer: "Google / Coursera",
        date: "2025",
        image: googleBadge,
        link: "https://www.coursera.org/account/accomplishments/professional-cert/N4BB50WZXZTE"
    },
    {
        name: "Google IT Support Professional Certificate",
        issuer: "Google / Coursera",
        date: "2025",
        image: googleItBadge,
        link: "https://www.coursera.org/account/accomplishments/professional-cert/N4BB50WZXZTE"
    },
    {
        name: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        date: "2026",
        image: ciscoBadge,
        link: "https://www.credly.com/users/yanis-harrat"
    }
];

const certificationsFr: Certification[] = [
    {
        name: "Certificat Professionnel Google Cybersécurité",
        issuer: "Google / Coursera",
        date: "2025",
        image: googleBadge,
        link: "https://www.coursera.org/account/accomplishments/professional-cert/N4BB50WZXZTE"
    },
    {
        name: "Certificat Professionnel Google Support IT",
        issuer: "Google / Coursera",
        date: "2025",
        image: googleItBadge,
        link: "https://www.coursera.org/account/accomplishments/professional-cert/N4BB50WZXZTE"
    },
    {
        name: "Introduction à la Cybersécurité",
        issuer: "Cisco Networking Academy",
        date: "2026",
        image: ciscoBadge,
        link: "https://www.credly.com/users/yanis-harrat"
    }
];

export const certifications: Record<string, Certification[]> = {
    en: certificationsEn,
    fr: certificationsFr
};
