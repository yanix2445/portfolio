'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const t = useTranslations('Error')

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-widest text-[#CC9400] text-center">
                {t('title')}
            </h2>
            <p className="text-gray-400 mb-10 text-center max-w-md">
                {t('description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
                <Button
                    onClick={() => reset()}
                    className="bg-[#CC9400] hover:bg-[#B88600] text-black font-bold px-8 h-14 rounded-none uppercase tracking-widest transition-transform hover:scale-[1.02]"
                >
                    {t('tryAgain')}
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="border-[#CC9400] text-[#CC9400] hover:bg-[#CC9400]/10 font-bold px-8 h-14 rounded-none uppercase tracking-widest transition-transform hover:scale-[1.02]"
                >
                    <a href="/">{t('backHome')}</a>
                </Button>
            </div>
        </div>
    )
}
