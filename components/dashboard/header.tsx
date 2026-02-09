"use client"

import React from "react"
import { theme, Text, Badge, IconButton } from "@/components/lego"
import { Bell, Search, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        background: theme.bg,
        borderBottom: `${theme.border}px solid ${theme.tones.neutral.border}`,
      }}
    >
      <div>
        <Text as="h1" size={24} weight={950}>
          Dashboard
        </Text>
        <Text as="p" size={13} weight={600} style={{ opacity: 0.6, marginTop: 2 }}>
          Welcome back to your Lego Design System overview
        </Text>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: theme.radius,
            border: `${theme.border}px solid ${theme.tones.neutral.border}`,
            background: theme.tones.neutral.bg,
            boxShadow: theme.shadow,
          }}
        >
          <Search size={16} color={theme.text} style={{ opacity: 0.5 }} />
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search dashboard"
            style={{
              border: "none",
              background: "transparent",
              fontFamily: theme.font,
              fontWeight: 700,
              fontSize: 13,
              color: theme.text,
              outline: "none",
              width: 140,
            }}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <IconButton label="View notifications" tone="neutral">
            <Bell size={18} />
          </IconButton>
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: 999,
              background: theme.tones.danger.bg,
              border: `2px solid ${theme.bg}`,
              display: "grid",
              placeItems: "center",
              fontSize: 10,
              fontWeight: 900,
              fontFamily: theme.font,
              color: theme.tones.danger.fg,
            }}
          >
            3
          </span>
        </div>

        {/* Profile */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: theme.radius,
            background: theme.tones.brand.bg,
            border: `${theme.border}px solid ${theme.tones.brand.border}`,
            boxShadow: theme.shadow,
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <User size={20} color={theme.tones.brand.fg} />
        </div>
      </div>
    </header>
  )
}
