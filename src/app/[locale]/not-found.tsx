'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function NotFound() {
    const t = useTranslations('NotFound')

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
            <h1 className="text-9xl font-extrabold text-[#CC9400] mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-widest text-wrap-balance text-center">
                {t('title')}
            </h2>
            <p className="text-gray-400 mb-10 text-center max-w-md">
                {t('description')}
            </p>
            <Button asChild className="bg-[#CC9400] hover:bg-[#B88600] text-black font-bold px-8 py-6 rounded-none uppercase tracking-widest transition-transform hover:scale-105">
                <Link href="/">{t('backHome')}</Link>
            </Button>
        </div>
    )
}
