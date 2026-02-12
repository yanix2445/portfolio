export default function Loading() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-black overflow-hidden">
            <div className="h-full bg-[#CC9400] w-full origin-left animate-[loading_2s_infinite_linear] shadow-[0_0_8px_#CC9400]" />
        </div>
    )
}
