import { CategoryConfig } from "../types";
import { StaticImageData } from "next/image";

// Static Imports for Automatic Blur Optimization
import networkInfraImg from "../../../../public/network-infra.png";
import portfolioV2Img from "../../../../public/portfolio-v2.png";
import portfolioV1Img from "../../../../public/portfolio-v1.png";
import legalDocsImg from "../../../../public/legal-docs.png";
import linktreeImg from "../../../../public/linktree.png";
import vmNetworkImg from "../../../../public/vm-network.png";
import zshBoostImg from "../../../../public/zsh-boost.png";
import homelabsImg from "../../../../public/homelabs.png";

export const schoolProjectsConfig: CategoryConfig = {
    id: "school",
    achievementCount: 4,
    projects: [
        {
            slug: "network-infrastructure",
            image: networkInfraImg,
            link: "#",
            tech: ["Cisco IOS", "OSPF", "802.1Q (Dot1Q)", "Inter-VLAN Routing", "CLI Mastery"],
            achievementCount: 5,
            topology: {}, // Description is in JSON
            steps: [
                {
                    language: "cisco",
                    code: `! --- ISOLATION CREATION ---
vlan 2
 name SERVER_FARM ! The core of the system
vlan 3
 name MGMT_NET    ! Administration network
exit

! --- TRUNK CONFIGURATION (High-Speed Link) ---
interface GigabitEthernet0/1
 switchport trunk encapsulation dot1q
 switchport mode trunk

! --- PORT OPTIMIZATION ---
interface GigabitEthernet0/2
 switchport mode access
 switchport access vlan 2
 spanning-tree portfast  ! Instant connection without STP delay`
                },
                {
                    language: "cisco",
                    code: `! ON THE ROUTER
interface GigabitEthernet0/1
 no shutdown

! --- GATEWAY CONFIGURATION ---
interface GigabitEthernet0/1.2          ! Gateway for VLAN 2
 encapsulation dot1Q 2                  ! Decoding VLAN 2 tags
 ip address 192.168.20.1 255.255.255.0
 description GW_SERVER_VLAN2

interface GigabitEthernet0/1.3          ! Gateway for VLAN 3
 encapsulation dot1Q 3                  ! Decoding VLAN 3 tags
 ip address 192.168.10.1 255.255.255.0
 description GW_MGMT_VLAN3`
                },
                {
                    language: "cisco",
                    code: `! --- NETWORK BRAIN CONFIGURATION (OSPF) ---
router ospf 1
 router-id 1.1.1.1
 network 192.168.10.0 0.0.0.255 area 0 ! Local Announcement (Site A)
 network 192.168.20.0 0.0.0.255 area 0 ! Local Announcement (Site A)
 network 10.10.1.0 0.0.0.3 area 0      ! Point-to-Point WAN Link`
                },
                {
                    language: "bash",
                    code: `# ROUTING TABLE VERIFICATION
R1# show ip route
! Validating presence of remote routes (marked 'O')
# O  192.168.30.0/24 [110/2] via 10.10.1.2

# REAL CONNECTIVITY TEST
PC_CLIENT> ping 192.168.20.10
! Reply: Stable communication across the entire infrastructure`
                }
            ]
        },
        {
            slug: "vm-network-lab",
            image: vmNetworkImg,
            link: "#",
            tech: ["CLI (Cisco IOS)", "GUI (Active Directory)", "VMware Mac", "AD DS", "OSPF"],
            achievementCount: 5,
            topology: {},
            steps: [
                {
                    language: "cisco",
                    code: `! --- REAL HARDWARE CONFIGURATION ---
Switch(config)# vlan 2
Switch(config-vlan)# name SERVER_VLAN
Router(config)# router ospf 1
Router(config-router)# network 10.10.1.0 0.0.0.3 area 0`
                },
                {
                    language: "text",
                    code: `# SYSTEM ADMINISTRATION (Windows Interface)
1. AD DS Role Installation and Domain Promotion
2. Creation of Organizational Units (OU) by department
3. Deployment of GPOs for access management and security
4. Visual audit via Active Directory Management Console`
                },
                {
                    language: "text",
                    code: `# MANAGEMENT CONSOLES (MMC)
- DHCP: Graphical creation of scopes by VLAN
- DNS: Definition of Forward Lookup Zones (DNS Forwarding)
- IP Helper: Network bridging configuration on Cisco terminals`
                },
                {
                    language: "bash",
                    code: `# CROSS-VERIFICATION
Network (CLI): show ip ospf neighbor (OSPF Neigborship OK)
System (GUI): AD Users and Computers (Client synchronized OK)
Client: Login to corp.local domain... Success!`
                }
            ]
        }
    ]
};

export const personalProjectsConfig: CategoryConfig = {
    id: "personal",
    achievementCount: 4,
    projects: [
        {
            slug: "portfolio-v2",
            image: portfolioV2Img,
            link: "https://github.com/yanix2445/portfolio",
            demoLink: "https://yanis-harrat.com/",
            tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
            achievementCount: 5,
            topology: {},
            steps: [
                {
                    language: "bash",
                    code: `src/features/projects/
├── components/   # Internal Components (ProjectDetail, etc.)
├── data/         # Fetching Logic (get-projects.ts)
├── types.ts      # Domain TypeScript Contracts
└── index.ts      # Public Module Facade`
                },
                {
                    language: "typescript",
                    code: `// In src/features/projects/data/get-projects.ts
export async function getSchoolProjects() {
  'use cache'
  cacheLife('max')
  return schoolProjectsData;
}`
                },
                {
                    language: "tsx",
                    code: `// Ultra-flexible declarative usage
<ProjectDetail>
  <ProjectDetail.Header title={...} />
  <ProjectDetail.Hero src={...} />
  <ProjectDetail.Grid>...</ProjectDetail.Grid>
</ProjectDetail>`
                },
                {
                    language: "typescript",
                    code: `export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  return {
    title: \`\${project.name} | Yanis Harrat\`,
    openGraph: { images: [project.image.src] }
  };
}`
                },
                {
                    language: "tsx",
                    code: `<motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <PortfolioCard />
</motion.div>`
                },
                {
                    language: "tsx",
                    code: `function FormattedText({ text }) {
  const parts = text.split(/(\*\*.*?\)/g);
  return (
    <>
      {parts.map((part, i) => (
        part.startsWith("**") ? <strong>...</strong> : part
      ))}
    </>
  );
}`
                }
            ]
        },
        {
            slug: "homelabs",
            image: homelabsImg,
            link: "https://github.com/yanix2445/Home-labs",
            tech: ["Docker Compose", "Cloudflare Tunnel", "S3 (MinIO)", "PostgreSQL", "Next.js 16", "Shell Scripting"],
            achievementCount: 6,
            topology: {},
            steps: [
                {
                    language: "yaml",
                    code: `services:
  tunnel:
    image: cloudflare/cloudflared
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=\${CF_TUNNEL_TOKEN}
    networks:
      - home-labs
    security_opt:
      - no-new-privileges:true`
                },
                {
                    language: "yaml",
                    code: `services:
  excalidraw:
    image: excalidraw/excalidraw:latest
    networks:
      - home-labs
    deploy:
      resources:
        limits:
          memory: 512M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"`
                },
                {
                    language: "yaml",
                    code: `services:
  legal-app:
    build: .
    environment:
      - NODE_ENV=production
    networks:
      - home-labs
    restart: always`
                },
                {
                    language: "yaml",
                    code: `services:
  calcom:
    image: calcom/cal.com
    depends_on:
      calcom-db:
        condition: service_healthy
    networks:
      - home-labs

  calcom-db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s`
                },
                {
                    language: "bash",
                    code: `# Démarrage complet de l'infrastructure
./scripts/start-all.sh

# Ordre d'exécution du script :
# 1. Verification du réseau 'home-labs'
# 2. Start Infrastructure (Gateway/Tunnel)
# 3. Start Services (00_legal, 01_excalidraw...)`
                }
            ]
        },
        {
            slug: "zsh-boost",
            image: zshBoostImg,
            link: "https://github.com/yanix2445/zsh-boost",
            tech: ["ZSH", "Shell Scripting", "Homebrew", "Gum CLI", "Oh My Zsh", "Fzf Tab"],
            achievementCount: 6,
            topology: {},
            steps: [
                {
                    language: "zsh",
                    code: `# Detection automatique du ZDOTDIR
if [[ -L "\${HOME}/.zshrc" ]]; then
    export ZDOTDIR="\${\$(readlink "\${HOME}/.zshrc"):A:h}"
else
    export ZDOTDIR="\${0:A:h}"
fi`
                },
                {
                    language: "zsh",
                    code: `ZSH_MODULES=(
  core/omz           # Oh My Zsh Engine
  aliases/navigation # eza, ls, cd
  aliases/search     # fzf, rg, bat
  utils/ports        # Port management
  utils/update       # Auto-updater
)`
                },
                {
                    language: "bash",
                    code: `# Installateur interactif avec Gum
gum style --border normal --header "🚀 ZSH BOOST INSTALLER"
if gum confirm "Voulez-vous installer les outils recommandés (eza, bat, fzf) ?"; then
  brew install eza bat fzf zoxide ripgrep fd
fi`
                },
                {
                    language: "zsh",
                    code: `# Exemple de fallback intelligent pour ls
if (( $+commands[eza] )); then
    alias ls='eza --icons --group-directories-first'
    alias ll='eza -l --icons --git'
else
    alias ls='ls -G'
    alias ll='ls -lh'
fi`
                },
                {
                    language: "zsh",
                    code: `function up() {
  gum spin --spinner dot --title "Brew update..." -- brew update
  gum spin --spinner dot --title "OMZ update..." -- omz update
  gum spin --spinner dot --title "Rust update..." -- rustup update
  # ... et plus encore
}`
                }
            ]
        },
        {
            slug: "portfolio-v1",
            image: portfolioV1Img,
            link: "https://github.com/yanix2445/portfolio-v1",
            demoLink: "https://yanix2445.github.io/portfolio-v1/",
            tech: ["Next.js 13/14", "React 18", "Tailwind CSS", "Framer Motion", "Vercel"],
            achievementCount: 6,
            topology: {},
            steps: [
                {
                    language: "tsx",
                    code: `// app/layout.tsx
export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={inter.variable}>
            <body>
                <Navigation />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}`
                },
                {
                    language: "tsx",
                    code: `// app/projects/page.tsx (Async Server Component)
async function getProjects() {
    const res = await fetch('https://api.example.com/projects', {
        next: { revalidate: 3600 }
    });
    return res.json();
}

export default async function Page() {
    const projects = await getProjects();
    return <ProjectGrid data={projects} />;
}`
                },
                {
                    language: "tsx",
                    code: `// components/animated-card.tsx
"use client"
import { motion } from 'framer-motion';

export const Card = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);`
                },
                {
                    language: "tsx",
                    code: `// discovery of next/image
import Image from 'next/image';

export const Avatar = () => (
    <Image
        src="/profile.jpg"
        alt="Yanis"
        width={128}
        height={128}
        placeholder="blur"
        priority
    />
);`
                }
            ]
        },
        {
            slug: "legal-documentation",
            image: legalDocsImg,
            link: "https://github.com/yanix2445/legal-app",
            demoLink: "https://legal-app-v1.vercel.app/",
            tech: ["Bun", "Next.js 16", "Better Auth", "Prisma", "Supabase", "Tiptap", "MDX 3.0"],
            achievementCount: 6,
            topology: {},
            steps: [
                {
                    language: "typescript",
                    code: `// lib/auth.ts configuration
export const auth = createAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    plugins: [
        passkey(),
        admin(),
        emailOTP({
            async sendVerificationEmail(data) {
                await resend.emails.send({ ... })
            }
        })
    ]
})`
                },
                {
                    language: "typescript",
                    code: `// Loading and parsing MDX content
const { content, frontmatter } = await readMdxFile(activity, page);
const { compiledSource } = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    }
});`
                },
                {
                    language: "typescript",
                    code: `// Saving content via Server Action
export async function saveContent(activity: string, page: string, html: string) {
    const markdown = convertHtmlToMarkdown(html);
    await fs.writeFile(getPath(activity, page), markdown);
    
    // Targeted cache invalidation
    updateTag(\`legal-\${activity}-\${page}\`);
    revalidatePath(\`/[activity]/[page]\`);
}`
                },
                {
                    language: "yaml",
                    code: `# docker-compose.yml security bits
security_opt:
  - no-new-privileges:true
cap_drop:
  - ALL
tmpfs:
  - /tmp:rw,noexec,nosuid,size=128m
read_only: true
volumes:
  - legal-content:/app/content:rw`
                }
            ]
        },
        {
            slug: "personal-linktree",
            image: linktreeImg,
            link: "https://github.com/yanix2445/links",
            demoLink: "https://links.yanis.dev/",
            tech: ["Next.js 16", "React 19", "Tailwind CSS 4", "Node.js (Bun)", "GraphQL", "Resend", "shadcn/ui"],
            achievementCount: 6,
            topology: {},
            steps: [
                {
                    language: "typescript",
                    code: `// src/app/api/contact/route.ts
export async function POST(req: Request) {
    const body = await req.json();
    const validated = contactSchema.parse(body); // Zod validation
    
    await resend.emails.send({
        from: 'Contact <onboarding@resend.dev>',
        to: 'yanis.amine.harrat@gmail.com',
        subject: \`Nouveau message de \${validated.name}\`,
        html: renderEmail(validated)
    });
    return Response.json({ success: true });
}`
                },
                {
                    language: "typescript",
                    code: `// lib/github.ts - GraphQL Query
const query = \`query($username: String!) {
    user(login: $username) {
        contributionsCollection {
            contributionCalendar {
                totalContributions
                weeks { contributionDays { contributionCount date color } }
            }
        }
    }
}\`;

export async function getContributions(username: string) {
    const res = await fetch('https://api.github.com/graphql', {
        headers: { Authorization: \`Bearer \${process.env.GITHUB_TOKEN}\` },
        body: JSON.stringify({ query, variables: { username } }),
        next: { revalidate: 3600 }
    });
    // ... parse and returns
}`
                },
                {
                    language: "tsx",
                    code: `// linkedin-carousel.tsx - Auto-scroll logic
const [current, setCurrent] = useState(0);
useEffect(() => {
    const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % posts.length);
        setProgressKey(prev => prev + 1); // Reset progress bar animation
    }, 6000);
    return () => clearInterval(timer);
}, [posts.length]);`
                },
                {
                    language: "tsx",
                    code: `// cal-floating-button.tsx
useEffect(() => {
    (async function () {
        const cal = await getCalApi({"namespace":"premier-contact"});
        cal("ui", {
            "theme": "dark",
            "layout": "month_view",
            "styles": {"branding": {"brandColor": "#000000"}}
        });
    })();
}, []);`
                }
            ]
        }
    ]
};

// Index projects for O(1) lookups
import { ProjectConfig } from "../types";

const projectMap = new Map<string, ProjectConfig>(
    [...schoolProjectsConfig.projects, ...personalProjectsConfig.projects].map((project) => [project.slug, project])
);

export function getProjectBySlug(slug: string): ProjectConfig | undefined {
    return projectMap.get(slug);
}

export function getAllProjectSlugs(): string[] {
    return Array.from(projectMap.keys());
}

export function getProjectCategory(slug: string): "school" | "personal" | undefined {
    if (schoolProjectsConfig.projects.some(p => p.slug === slug)) return "school";
    if (personalProjectsConfig.projects.some(p => p.slug === slug)) return "personal";
    return undefined;
}
