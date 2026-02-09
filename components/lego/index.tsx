"use client"

import React, { CSSProperties, useId } from "react"

/**
 * Lego Design System
 * Playful "blocks" aesthetic - chunky borders, rounded corners, soft shadows, high-contrast focus ring
 * Per BUILD SKILL.md and DESIGN_AUDIT_SKILL.md standards
 */

export type Tone = "neutral" | "brand" | "success" | "warning" | "danger"

export const theme = {
  radius: 14,
  border: 3,
  shadow: "0 6px 0 rgba(0,0,0,0.20)",
  shadowPressed: "0 2px 0 rgba(0,0,0,0.20)",
  focusRing: "0 0 0 4px rgba(59,130,246,0.45)",
  font: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"`,
  text: "#111827",
  bg: "#ffffff",
  tones: {
    neutral: { bg: "#F3F4F6", fg: "#111827", border: "#111827" },
    brand: { bg: "#60A5FA", fg: "#0B1220", border: "#0B1220" },
    success: { bg: "#34D399", fg: "#052014", border: "#052014" },
    warning: { bg: "#FBBF24", fg: "#1F1400", border: "#1F1400" },
    danger: { bg: "#F87171", fg: "#260606", border: "#260606" },
  } as Record<Tone, { bg: string; fg: string; border: string }>,
}

function baseBlockStyle(tone: Tone = "neutral"): CSSProperties {
  const t = theme.tones[tone]
  return {
    fontFamily: theme.font,
    color: t.fg,
    background: t.bg,
    border: `${theme.border}px solid ${t.border}`,
    borderRadius: theme.radius,
    boxShadow: theme.shadow,
    transition:
      "transform 120ms ease, box-shadow 120ms ease, filter 120ms ease",
  }
}

function focusableStyle(disabled?: boolean): CSSProperties {
  return disabled
    ? { opacity: 0.55, cursor: "not-allowed" }
    : { cursor: "pointer" }
}

/* Box */
export function Box({
  as: Comp = "div",
  tone = "neutral",
  padding = 16,
  style,
  className,
  ...rest
}: {
  as?: React.ElementType
  tone?: Tone
  padding?: number
  style?: CSSProperties
  className?: string
  [key: string]: unknown
}) {
  return (
    <Comp
      className={className}
      style={{ ...baseBlockStyle(tone), padding, ...style }}
      {...rest}
    />
  )
}

/* Stack */
export function Stack({
  gap = 12,
  align = "stretch",
  style,
  className,
  ...rest
}: {
  gap?: number
  align?: CSSProperties["alignItems"]
  style?: CSSProperties
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
        alignItems: align,
        ...style,
      }}
      {...rest}
    />
  )
}

/* Inline */
export function Inline({
  gap = 10,
  align = "center",
  wrap = true,
  style,
  className,
  ...rest
}: {
  gap?: number
  align?: CSSProperties["alignItems"]
  wrap?: boolean
  style?: CSSProperties
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        gap,
        alignItems: align,
        ...style,
      }}
      {...rest}
    />
  )
}

/* Text */
export function Text({
  as: Comp = "p",
  size = 14,
  weight = 600,
  style,
  className,
  ...rest
}: {
  as?: React.ElementType
  size?: number
  weight?: number
  style?: CSSProperties
  className?: string
  [key: string]: unknown
}) {
  return (
    <Comp
      className={className}
      style={{
        fontFamily: theme.font,
        margin: 0,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.25,
        color: theme.text,
        ...style,
      }}
      {...rest}
    />
  )
}

/* Button */
export function Button({
  tone = "brand",
  size = "md",
  disabled,
  children,
  style,
  className,
  ...rest
}: {
  tone?: Tone
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  children: React.ReactNode
  style?: CSSProperties
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const padY = size === "sm" ? 8 : size === "lg" ? 14 : 10
  const padX = size === "sm" ? 12 : size === "lg" ? 18 : 14

  return (
    <button
      disabled={disabled}
      className={className}
      style={{
        ...baseBlockStyle(tone),
        ...focusableStyle(disabled),
        padding: `${padY}px ${padX}px`,
        fontSize: size === "sm" ? 13 : size === "lg" ? 16 : 14,
        fontWeight: 800,
        letterSpacing: 0.2,
        outline: "none",
        userSelect: "none",
        transform: "translateY(0)",
        ...style,
      }}
      onMouseDown={(e) => {
        if (disabled) return
        ;(e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(3px)"
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
          theme.shadowPressed
      }}
      onMouseUp={(e) => {
        if (disabled) return
        ;(e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(0)"
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = theme.shadow
      }}
      onBlur={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = theme.shadow
        ;(e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(0)"
      }}
      onFocus={(e) => {
        if (disabled) return
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
          `${theme.shadow}, ${theme.focusRing}`
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

/* IconButton */
export function IconButton({
  label,
  tone = "neutral",
  disabled,
  children,
  size = 40,
  style,
  className,
  ...rest
}: {
  label: string
  tone?: Tone
  disabled?: boolean
  children: React.ReactNode
  size?: number
  style?: CSSProperties
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      className={className}
      style={{
        ...baseBlockStyle(tone),
        ...focusableStyle(disabled),
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
        padding: 0,
        outline: "none",
        ...style,
      }}
      onFocus={(e) => {
        if (disabled) return
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
          `${theme.shadow}, ${theme.focusRing}`
      }}
      onBlur={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = theme.shadow
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

/* Card */
export function Card({
  title,
  subtitle,
  tone = "neutral",
  children,
  style,
  className,
  ...rest
}: {
  title?: string
  subtitle?: string
  tone?: Tone
  children: React.ReactNode
  style?: CSSProperties
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Box tone={tone} padding={16} style={style} className={className} {...rest}>
      {(title || subtitle) && (
        <Stack gap={4} style={{ marginBottom: 12 }}>
          {title ? (
            <Text as="h3" size={16} weight={900}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              as="p"
              size={13}
              weight={700}
              style={{ opacity: 0.9 }}
            >
              {subtitle}
            </Text>
          ) : null}
        </Stack>
      )}
      {children}
    </Box>
  )
}

/* Badge */
export function Badge({
  tone = "neutral",
  children,
  style,
  className,
  ...rest
}: {
  tone?: Tone
  children: React.ReactNode
  style?: CSSProperties
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>) {
  const t = theme.tones[tone]
  return (
    <span
      className={className}
      style={{
        fontFamily: theme.font,
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        border: `${theme.border}px solid ${t.border}`,
        background: t.bg,
        color: t.fg,
        fontWeight: 900,
        fontSize: 12,
        boxShadow: "0 3px 0 rgba(0,0,0,0.18)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  )
}

/* Toggle */
export function Toggle({
  label,
  checked,
  onChange,
  disabled,
  toneOn = "success",
  toneOff = "neutral",
  style,
}: {
  label: string
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
  toneOn?: Tone
  toneOff?: Tone
  style?: CSSProperties
}) {
  const t = theme.tones[checked ? toneOn : toneOff]

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: theme.font,
        fontWeight: 800,
        ...style,
        ...(disabled
          ? { opacity: 0.55, cursor: "not-allowed" }
          : { cursor: "pointer" }),
      }}
    >
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onChange(!checked)
          }
        }}
        onClick={() => {
          if (disabled) return
          onChange(!checked)
        }}
        style={{
          width: 54,
          height: 34,
          borderRadius: 999,
          border: `${theme.border}px solid ${t.border}`,
          background: t.bg,
          boxShadow: theme.shadow,
          position: "relative",
          outline: "none",
        }}
        onFocus={(e) => {
          if (disabled) return
          ;(e.currentTarget as HTMLSpanElement).style.boxShadow =
            `${theme.shadow}, ${theme.focusRing}`
        }}
        onBlur={(e) => {
          ;(e.currentTarget as HTMLSpanElement).style.boxShadow = theme.shadow
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: "#fff",
            border: `${theme.border}px solid ${t.border}`,
            position: "absolute",
            top: 4,
            left: checked ? 28 : 4,
            transition: "left 120ms ease",
            boxShadow: "0 3px 0 rgba(0,0,0,0.18)",
          }}
        />
      </span>
      <span>{label}</span>
    </label>
  )
}

/* ProgressBar */
export function ProgressBar({
  value,
  max = 100,
  tone = "brand",
  height = 16,
  style,
}: {
  value: number
  max?: number
  tone?: Tone
  height?: number
  style?: CSSProperties
}) {
  const t = theme.tones[tone]
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      style={{
        width: "100%",
        height,
        borderRadius: 999,
        border: `${theme.border}px solid ${t.border}`,
        background: theme.tones.neutral.bg,
        overflow: "hidden",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
        ...style,
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: t.bg,
          borderRadius: 999,
          transition: "width 300ms ease",
        }}
      />
    </div>
  )
}
