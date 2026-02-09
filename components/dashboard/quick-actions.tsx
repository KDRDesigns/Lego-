"use client"

import React, { useState } from "react"
import {
  Card,
  Stack,
  Inline,
  Text,
  Button,
  Badge,
  Toggle,
  theme,
  type Tone,
} from "@/components/lego"
import {
  Plus,
  FileSearch,
  Palette,
  Download,
  CheckCircle,
  Clock,
} from "lucide-react"

interface QuickAction {
  label: string
  description: string
  icon: React.ReactNode
  tone: Tone
}

const quickActions: QuickAction[] = [
  {
    label: "New Component",
    description: "Add a new block to the system",
    icon: <Plus size={18} />,
    tone: "brand",
  },
  {
    label: "Run Audit",
    description: "Check WCAG AA compliance",
    icon: <FileSearch size={18} />,
    tone: "success",
  },
  {
    label: "Token Editor",
    description: "Edit design tokens and themes",
    icon: <Palette size={18} />,
    tone: "warning",
  },
  {
    label: "Export Bundle",
    description: "Download latest build",
    icon: <Download size={18} />,
    tone: "neutral",
  },
]

interface ComponentStatus {
  name: string
  version: string
  status: "stable" | "beta" | "deprecated"
}

const components: ComponentStatus[] = [
  { name: "Box", version: "1.0.0", status: "stable" },
  { name: "Stack", version: "1.0.0", status: "stable" },
  { name: "Inline", version: "1.0.0", status: "stable" },
  { name: "Button", version: "1.0.0", status: "stable" },
  { name: "Card", version: "1.0.0", status: "stable" },
  { name: "Badge", version: "1.0.0", status: "stable" },
  { name: "Input", version: "1.0.0", status: "stable" },
  { name: "Toggle", version: "1.0.0", status: "stable" },
  { name: "Modal", version: "1.0.0", status: "stable" },
  { name: "ProgressBar", version: "1.0.0", status: "beta" },
]

const statusTone: Record<string, Tone> = {
  stable: "success",
  beta: "warning",
  deprecated: "danger",
}

export function QuickActions() {
  return (
    <Card title="Quick Actions" subtitle="Common tasks at your fingertips">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {quickActions.map((action) => (
          <Button
            key={action.label}
            tone={action.tone}
            size="md"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            {action.icon}
            <Stack gap={2} style={{ alignItems: "flex-start" }}>
              <span style={{ fontSize: 13, fontWeight: 900 }}>
                {action.label}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.75 }}>
                {action.description}
              </span>
            </Stack>
          </Button>
        ))}
      </div>
    </Card>
  )
}

export function ComponentRegistry() {
  return (
    <Card title="Component Registry" subtitle="All blocks in the system">
      <Stack gap={0}>
        {/* Table header */}
        <Inline
          gap={0}
          wrap={false}
          style={{
            padding: "8px 0",
            borderBottom: `2px solid ${theme.tones.neutral.bg}`,
          }}
        >
          <Text size={11} weight={900} style={{ flex: 1, opacity: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>
            Component
          </Text>
          <Text size={11} weight={900} style={{ width: 80, textAlign: "center", opacity: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>
            Version
          </Text>
          <Text size={11} weight={900} style={{ width: 80, textAlign: "right", opacity: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>
            Status
          </Text>
        </Inline>

        {/* Table rows */}
        {components.map((comp, idx) => (
          <Inline
            key={comp.name}
            gap={0}
            wrap={false}
            style={{
              padding: "10px 0",
              borderBottom:
                idx < components.length - 1
                  ? `1px solid ${theme.tones.neutral.bg}`
                  : "none",
            }}
          >
            <Inline gap={8} style={{ flex: 1 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: theme.tones[statusTone[comp.status]].bg,
                  border: `2px solid ${theme.tones[statusTone[comp.status]].border}`,
                  flexShrink: 0,
                }}
              />
              <Text size={14} weight={800}>
                {comp.name}
              </Text>
            </Inline>
            <Text
              size={13}
              weight={700}
              style={{ width: 80, textAlign: "center", opacity: 0.6, fontFamily: "monospace" }}
            >
              {comp.version}
            </Text>
            <div style={{ width: 80, textAlign: "right" }}>
              <Badge tone={statusTone[comp.status]}>{comp.status}</Badge>
            </div>
          </Inline>
        ))}
      </Stack>
    </Card>
  )
}

export function SystemHealth() {
  const [autoAudit, setAutoAudit] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const healthChecks = [
    { label: "WCAG AA Compliance", status: "passed", icon: <CheckCircle size={16} /> },
    { label: "Color Contrast Ratios", status: "passed", icon: <CheckCircle size={16} /> },
    { label: "Keyboard Navigation", status: "passed", icon: <CheckCircle size={16} /> },
    { label: "Build Pipeline", status: "running", icon: <Clock size={16} /> },
  ]

  return (
    <Card title="System Health" subtitle="Design system compliance status">
      <Stack gap={16}>
        {/* Health checks */}
        <Stack gap={8}>
          {healthChecks.map((check) => (
            <Inline
              key={check.label}
              gap={10}
              style={{
                padding: "8px 12px",
                borderRadius: theme.radius,
                background:
                  check.status === "passed"
                    ? `${theme.tones.success.bg}33`
                    : `${theme.tones.warning.bg}33`,
                border: `2px solid ${
                  check.status === "passed"
                    ? theme.tones.success.bg
                    : theme.tones.warning.bg
                }`,
              }}
            >
              <span
                style={{
                  color:
                    check.status === "passed"
                      ? theme.tones.success.border
                      : theme.tones.warning.border,
                }}
              >
                {check.icon}
              </span>
              <Text size={13} weight={800} style={{ flex: 1 }}>
                {check.label}
              </Text>
              <Badge tone={check.status === "passed" ? "success" : "warning"}>
                {check.status}
              </Badge>
            </Inline>
          ))}
        </Stack>

        {/* Settings toggles */}
        <Stack gap={12}>
          <Text size={12} weight={900} style={{ opacity: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>
            Preferences
          </Text>
          <Toggle
            label="Auto-run audits on changes"
            checked={autoAudit}
            onChange={setAutoAudit}
            toneOn="success"
          />
          <Toggle
            label="Compliance notifications"
            checked={notifications}
            onChange={setNotifications}
            toneOn="brand"
          />
        </Stack>
      </Stack>
    </Card>
  )
}
