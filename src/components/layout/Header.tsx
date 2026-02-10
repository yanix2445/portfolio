import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 lg:px-20 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]">
            <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-white tracking-wide">Open to work</span>
            </div>

            <Button
                asChild
                className="bg-[#CC9400] hover:bg-[#CC9400]/90 text-black rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-transform hover:scale-105"
            >
                <Link href="Cv-alternance-Yanis-Harrat-copie.pdf" target="_blank">
                    Download CV
                </Link>
            </Button>
        </header>
    );
}
