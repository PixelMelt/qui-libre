/*
 * Copyright (c) 2025, s0up and the autobrr contributors.
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { themes, type Theme } from "@/config/themes"
import { useTheme } from "@/hooks/useTheme"
import { Check, Palette } from "lucide-react"

interface ThemeCardProps {
  theme: Theme
  isSelected: boolean
  onSelect: () => void
}

// Helper to extract color preview from theme
function getThemeColors(theme: Theme) {
  // Check if dark mode is active by looking at the document element
  const isDark = document.documentElement.classList.contains("dark")
  const cssVars = isDark ? theme.cssVars.dark : theme.cssVars.light

  // Extract the actual color values from the theme
  const primary = cssVars["--primary"]
  const secondary = cssVars["--secondary"]
  const accent = cssVars["--accent"]

  return { primary, secondary, accent }
}

function ThemeCard({ theme, isSelected, onSelect }: ThemeCardProps) {
  const colors = getThemeColors(theme)

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md h-full ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base flex items-center gap-1 sm:gap-2">
            {theme.name}
            {isSelected && (
              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            )}
          </CardTitle>
        </div>
        {theme.description && (
          <CardDescription className="text-xs">
            {theme.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-2 sm:pb-3">
        {/* Color Preview */}
        <div className="flex gap-1 sm:gap-2">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full ring-1 ring-black/10 dark:ring-white/10"
            style={{
              backgroundColor: colors.primary,
              backgroundImage: "none",
              background: colors.primary + " !important",
            }}
          />
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full ring-1 ring-black/10 dark:ring-white/10"
            style={{
              backgroundColor: colors.secondary,
              backgroundImage: "none",
              background: colors.secondary + " !important",
            }}
          />
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full ring-1 ring-black/10 dark:ring-white/10"
            style={{
              backgroundColor: colors.accent,
              backgroundImage: "none",
              background: colors.accent + " !important",
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function ThemeSelector() {
  const { theme: currentTheme, setTheme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Selection
        </CardTitle>
        <CardDescription>
          Choose from available themes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Themes</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={currentTheme === theme.id}
                onSelect={() => setTheme(theme.id)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
