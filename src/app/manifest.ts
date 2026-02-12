import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Yanis Harrat | Portfolio Étudiant',
        short_name: 'Yanis.dev',
        description: 'Portfolio de Yanis Harrat - Étudiant en Systèmes & Réseaux et Logique Logicielle.',
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
