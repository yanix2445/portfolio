export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            <div className="relative h-12 w-12">
                <div className="absolute inset-0 border-t-2 border-[#CC9400] rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-t-2 border-[#CC9400]/40 rounded-full animate-spin [animation-duration:1.5s]"></div>
            </div>
        </div>
    )
}
