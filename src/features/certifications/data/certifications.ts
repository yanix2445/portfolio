import { Certification } from "../types";

const googleBadge = "/Certification/GOOGLE/badge certificat google cybersecurtite.png";
const ciscoBadge = "/Certification/CISC0/badge introduction-to-cybersecurity.png";
const googleItBadge = "/Certification/GOOGLE/google certificate IT support certificat .png";

const certificationsEn: Certification[] = [
    {
        name: "Google Cybersecurity Professional Certificate",
        issuer: "Google / Coursera",
        date: "2025",
        image: googleBadge,
        link: "/Certification/GOOGLE/Foundations of Cybersecurity.pdf"
    },
    {
        name: "Google IT Support Professional Certificate",
        issuer: "Google / Coursera",
        date: "2025",
        image: googleItBadge,
        link: googleItBadge // Link to badge if no PDF
    },
    {
        name: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        date: "2026",
        image: ciscoBadge,
        link: "/Certification/CISC0/I2CSUpdate20260315-33-lds15j.pdf"
    }
];

const certificationsFr: Certification[] = [
    {
        name: "Certificat Professionnel Google Cybersécurité",
        issuer: "Google / Coursera",
        date: "2025",
        image: googleBadge,
        link: "/Certification/GOOGLE/Foundations of Cybersecurity.pdf"
    },
    {
        name: "Certificat Professionnel Google Support IT",
        issuer: "Google / Coursera",
        date: "2025",
        image: googleItBadge,
        link: googleItBadge
    },
    {
        name: "Introduction à la Cybersécurité",
        issuer: "Cisco Networking Academy",
        date: "2026",
        image: ciscoBadge,
        link: "/Certification/CISC0/I2CSUpdate20260315-33-lds15j.pdf"
    }
];

export const certifications: Record<string, Certification[]> = {
    en: certificationsEn,
    fr: certificationsFr
};
