import { CategoryConfig } from "../types";
import { StaticImageData } from "next/image";

// Static Imports for Automatic Blur Optimization
import techWatchImg from "../../../../public/assets/images/projects/tech-watch-v1.png";
import networkInfraImg from "../../../../public/assets/images/projects/network-infra-pt.png";
import portfolioV2Img from "../../../../public/assets/images/projects/portfolio-v2.png";
import portfolioV1Img from "../../../../public/assets/images/projects/portfolio-v1.png";
import legalDocsImg from "../../../../public/assets/images/projects/legal-docs.png";
import linktreeImg from "../../../../public/assets/images/projects/linktree.png";
import vmNetworkImg from "../../../../public/assets/images/projects/vm-network.png";
import zshBoostImg from "../../../../public/assets/images/projects/zsh-boost.png";
import homelabsImg from "../../../../public/assets/images/projects/homelabs.png";

export const schoolProjectsConfig: CategoryConfig = {
    id: "school",
    achievementCount: 5,
    projects: [
        {
            slug: "tech-watch",
            image: techWatchImg,
            link: "https://github.com/yanix2445/Home-labs/tree/main",
            tech: ["n8n", "OpenRouter (GLM-4.5)", "Docker", "YouTube RSS", "Cyberveille", "Gmail API"],
            achievementCount: 5,
            topology: {},
            steps: [
                {
                    language: "json",
                    code: `{
  "nodes": [
    {
      "parameters": {
        "rule": { "interval": [{ "triggerAtHour": 8 }] }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "name": "Schedule Trigger"
    },
    {
      "parameters": {
        "model": "z-ai/glm-4.5-air:free"
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
      "name": "OpenRouter Chat Model"
    }
  ]
}`
                },
                {
                    language: "javascript",
                    code: `// 🕒 Filter: Last 48 hours only
const fortyEightHoursAgo = new Date();
fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

return items.filter(item => {
  const pubDate = new Date(item.json.pubDate);
  return pubDate >= fortyEightHoursAgo;
});`
                },
                {
                    language: "markdown",
                    code: `## SYSTEM PROMPT (GLM-4.5)
You are an expert tech analyst. 
1. **Analyze** relevance (Score 1-5)
2. **Categorize**: IA, DevOps, Cyber, Cloud, Products, Data
3. **Summarize**: 2-3 sentences
4. **Actionable Insights**: 3-5 key points
5. **Output**: Pure HTML for Gmail delivery.`
                },
                {
                    language: "yaml",
                    code: `# Deployment Snippet
services:
  n8n:
    image: n8nio/n8n:latest
    environment:
      - N8N_ENCRYPTION_KEY=\${N8N_KEY}
      - OPENROUTER_API_KEY=\${OR_KEY}
    networks:
      - home-labs`
                }
            ]
        },
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
                    code: `! --- SWITCH CONFIGURATION ---
conf t

int range f0/1-5
 switchport mode access
 switchport access vlan 2

int range f0/6-10
 switchport mode access
 switchport access vlan 3

int g0/1
 switchport mode trunk

end
wr mem`
                },
                {
                    language: "cisco",
                    code: `! --- ROUTER CONFIGURATION ---
conf t
int g0/0
 no shut
exit

int g0/0.2
 encapsulation dot1q 2
 ip address 192.168.10.254 255.255.255.0
 ip nat inside

int g0/0.3
 encapsulation dot1q 3
 ip address 192.168.20.254 255.255.255.0
 ip helper-address 192.168.10.1
 ip nat inside`
                },
                {}, // Step 3: DHCP Relay (Text Only)
                {
                    // Step 4: NAT & Routing
                    language: "cisco",
                    code: `! --- NAT & ROUTING ---
int g0/1
 ip address 172.16.1.254 255.255.255.0
 ip nat outside
 no shut

access-list 1 permit 192.168.10.0 0.0.0.255
access-list 1 permit 192.168.20.0 0.0.0.255

ip nat inside source list 1 interface g0/1 overload
ip route 0.0.0.0 0.0.0.0 172.16.1.1

end
wr mem`
                },
                {}, // Step 5: Evolutions & Redundancy (Text Only)
                {
                    // Step 6: Validation
                    language: "bash",
                    code: `PC_CLIENT> ip dhcp
! IP Address: 192.168.20.10
! Subnet Mask: 255.255.255.0
! Default Gateway: 192.168.20.254

PC_CLIENT> ping 172.16.1.1
! Reply from 172.16.1.1: bytes=32 time=1ms TTL=127`
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
