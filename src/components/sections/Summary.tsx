import { Button } from "@/components/ui/button";

export function Summary() {
    return (
        <section id="summary" className="relative z-10 px-6 py-16 md:px-12 lg:py-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="mb-8 text-2xl md:text-3xl font-bold text-[#CC9400] uppercase tracking-widest">About Me</h2>
                <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed font-light">
                    <p>
                        I’m an <span className="text-white font-medium">energetic and social "bon vivant"</span> with a deep passion for understanding how technology works at its core.
                        My journey is defined by a <span className="text-white font-medium">double dimension</span>: balancing the technical rigor of <span className="text-white font-medium">Systems & Networks (BTS SIO SISR)</span> with the advanced logic and algorithmic grit of <span className="text-white font-medium">Ecole 42 Paris</span>.
                        I don't just use tech; I deconstruct it, build it, and live it.
                    </p>
                    <p>
                        From my first lines of code to <span className="text-white font-medium">self-hosting</span> my own ecosystems, I’ve always been drawn to the <span className="text-white font-medium">Open Source</span> philosophy.
                        I believe in technology that is accessible, communal, and transparent. My interests are continuously evolving, currently centered around the frontiers of <span className="text-white font-medium">AI</span> and <span className="text-white font-medium">Cybersecurity</span>.
                    </p>
                    <p>
                        Outside the terminal, I’m a <span className="text-white font-medium">hyperactive sports enthusiast</span>. Whether I'm tackling a complex infrastructure problem or pushing my limits on the field, I bring the same "all-in" energy.
                        I thrive on social connection and believe that the best solutions are born from collective intelligence and a positive, high-energy atmosphere.
                    </p>
                </div>
            </div>
        </section>
    );
}
