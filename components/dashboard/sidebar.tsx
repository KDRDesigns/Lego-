"use client"

import React, { useState } from "react"
import { theme, Text, Stack, Badge } from "@/components/lego"
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Blocks,
} from "lucide-react"

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  badge?: { text: string; tone: "brand" | "success" | "warning" | "danger" | "neutral" }
  active?: boolean
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        href: "#",
        active: true,
      },
      {
        label: "Analytics",
        icon: <BarChart3 size={20} />,
        href: "#",
        badge: { text: "New", tone: "brand" },
      },
    ],
  },
  {
    title: "Manage",
    items: [
      {
        label: "Components",
        icon: <Package size={20} />,
        href: "#",
        badge: { text: "12", tone: "neutral" },
      },
      {
        label: "Team",
        icon: <Users size={20} />,
        href: "#",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Notifications",
        icon: <Bell size={20} />,
        href: "#",
        badge: { text: "3", tone: "warning" },
      },
      {
        label: "Settings",
        icon: <Settings size={20} />,
        href: "#",
      },
    ],
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      style={{
        width: collapsed ? 72 : 260,
        minHeight: "100vh",
        background: theme.bg,
        borderRight: `${theme.border}px solid ${theme.tones.neutral.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width 200ms ease",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Logo area */}
      <div
        style={{
          padding: collapsed ? "20px 16px" : "20px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `${theme.border}px solid ${theme.tones.neutral.border}`,
        }}
      >
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
            flexShrink: 0,
          }}
        >
          <Blocks size={22} color={theme.tones.brand.fg} />
        </div>
        {!collapsed && (
          <Text as="span" size={18} weight={950}>
            Lego DS
          </Text>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: collapsed ? "12px 8px" : "12px 12px", overflowY: "auto" }}>
        <Stack gap={20}>
          {navSections.map((section) => (
            <Stack key={section.title} gap={4}>
              {!collapsed && (
                <Text
                  as="span"
                  size={11}
                  weight={900}
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    color: theme.tones.neutral.fg,
                    opacity: 0.5,
                    padding: "0 8px",
                  }}
                >
                  {section.title}
                </Text>
              )}
              {section.items.map((item) => (
                <NavButton
                  key={item.label}
                  item={item}
                  collapsed={collapsed}
                />
              ))}
            </Stack>
          ))}
        </Stack>
      </nav>

      {/* Collapse toggle */}
      <div
        style={{
          padding: collapsed ? "16px 8px" : "16px 12px",
          borderTop: `${theme.border}px solid ${theme.tones.neutral.border}`,
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "10px 12px",
            borderRadius: theme.radius,
            border: `${theme.border}px solid ${theme.tones.neutral.border}`,
            background: theme.tones.neutral.bg,
            boxShadow: theme.shadow,
            cursor: "pointer",
            fontFamily: theme.font,
            fontWeight: 800,
            fontSize: 13,
            color: theme.text,
            outline: "none",
            transition: "transform 120ms ease, box-shadow 120ms ease",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(3px)"
            e.currentTarget.style.boxShadow = theme.shadowPressed
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = theme.shadow
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = `${theme.shadow}, ${theme.focusRing}`
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = theme.shadow
          }}
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

function NavButton({
  item,
  collapsed,
}: {
  item: NavItem
  collapsed: boolean
}) {
  const activeBg = item.active ? theme.tones.brand.bg : "transparent"
  const activeBorder = item.active
    ? `${theme.border}px solid ${theme.tones.brand.border}`
    : `${theme.border}px solid transparent`
  const activeShadow = item.active ? theme.shadow : "none"

  return (
    <a
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: collapsed ? "10px" : "10px 12px",
        borderRadius: theme.radius,
        border: activeBorder,
        background: activeBg,
        boxShadow: activeShadow,
        textDecoration: "none",
        fontFamily: theme.font,
        fontWeight: item.active ? 900 : 700,
        fontSize: 14,
        color: theme.text,
        cursor: "pointer",
        outline: "none",
        transition: "background 120ms ease, border 120ms ease, box-shadow 120ms ease",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
      onMouseEnter={(e) => {
        if (!item.active) {
          e.currentTarget.style.background = theme.tones.neutral.bg
          e.currentTarget.style.border = `${theme.border}px solid ${theme.tones.neutral.border}`
          e.currentTarget.style.boxShadow = theme.shadow
        }
      }}
      onMouseLeave={(e) => {
        if (!item.active) {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.border = `${theme.border}px solid transparent`
          e.currentTarget.style.boxShadow = "none"
        }
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `${item.active ? theme.shadow : "none"}, ${theme.focusRing}`
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = item.active ? theme.shadow : "none"
      }}
    >
      <span style={{ flexShrink: 0, display: "grid", placeItems: "center" }}>
        {item.icon}
      </span>
      {!collapsed && (
        <>
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge && (
            <Badge tone={item.badge.tone} style={{ fontSize: 11, padding: "2px 8px" }}>
              {item.badge.text}
            </Badge>
          )}
        </>
      )}
    </a>
  )
}
