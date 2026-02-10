'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-widest text-[#CC9400] text-center">
                Something went wrong!
            </h2>
            <p className="text-gray-400 mb-10 text-center max-w-md">
                An unexpected error occurred. We've been notified and are looking into it.
            </p>
            <Button
                onClick={() => reset()}
                className="bg-[#CC9400] hover:bg-[#B88600] text-black font-bold px-8 py-6 rounded-none uppercase tracking-widest transition-transform hover:scale-105"
            >
                Try again
            </Button>
        </div>
    )
}
