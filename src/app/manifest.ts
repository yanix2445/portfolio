import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Yanis Mohamed-Amine Harrat | Portfolio',
        short_name: 'Yanis.dev',
        description: 'Portfolio of Yanis Mohamed-Amine Harrat - Systems & Networks Specialist & Software Logic Engineer.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#CC9400',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
