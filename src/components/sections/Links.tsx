import { Mail, Phone } from "lucide-react";
import { SiLinkedin, SiDribbble, SiX, SiInstagram, SiBehance } from "react-icons/si";

const socialLinks = [
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/yanis",
        Icon: SiLinkedin
    },
    {
        name: "Dribbble",
        url: "https://dribbble.com",
        Icon: SiDribbble
    },
    {
        name: "X",
        url: "https://x.com/yanis_dev",
        Icon: SiX
    },
    {
        name: "Instagram",
        url: "https://instagram.com",
        Icon: SiInstagram
    },
    {
        name: "Behance",
        url: "https://behance.net",
        Icon: SiBehance
    }
];

export function Links() {
    return (
        <section id="links" className="relative z-10 px-6 pt-32 pb-40 md:pt-40 md:pb-48">
            <div className="max-w-4xl mx-auto">
                <h2 className="mb-12 text-4xl md:text-5xl font-bold text-[#CC9400] tracking-tight">Links</h2>

                {/* Social Icons Row */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-[#CC9400] rounded-xl w-12 h-12 flex items-center justify-center transition-all duration-300 group"
                        >
                            <link.Icon className="w-6 h-6 text-white group-hover:text-black transition-all" />
                        </a>
                    ))}
                </div>

                {/* Contact Info Row */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-lg md:text-xl font-medium text-white mb-24">
                    <a href="mailto:contact@yanis.dev" className="flex items-center gap-4 hover:text-[#CC9400] transition-colors">
                        <Mail className="w-6 h-6 text-[#CC9400]" />
                        <span>contact@yanis.dev</span>
                    </a>
                    <a href="tel:+33612345678" className="flex items-center gap-4 hover:text-[#CC9400] transition-colors">
                        <Phone className="w-6 h-6 text-[#CC9400]" />
                        <span>+33 6 12 34 56 78</span>
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-gray-500 text-sm font-medium">
                    <p>© {new Date().getFullYear()} Framer template by Yanis Harrat</p>
                </div>
            </div>
        </section>
    );
}
