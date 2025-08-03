"use client"

import * as React from "react"
import { TiWeatherSunny } from "react-icons/ti";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "next-themes"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <SwitchPrimitives.Root
      checked={isDark}
      onCheckedChange={toggleTheme}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        isDark ? "bg-slate-600" : "bg-blue-400"
      )}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform flex items-center justify-center",
          isDark ? "translate-x-5" : "translate-x-0"
        )}
      >
        {isDark ? (
          <TiWeatherSunny className="h-3 w-3 text-yellow-500" />
        ) : (
          <BsFillMoonStarsFill className="h-3 w-3 text-slate-600" />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
}