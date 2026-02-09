"use client"

import React from "react"
import { Card, Stack, Inline, Text, Badge, type Tone, theme } from "@/components/lego"

interface ActivityItem {
  id: number
  action: string
  description: string
  time: string
  tone: Tone
  tag: string
}

const activities: ActivityItem[] = [
  {
    id: 1,
    action: "Component Added",
    description: "ProgressBar component was added to the design system",
    time: "2 min ago",
    tone: "success",
    tag: "New",
  },
  {
    id: 2,
    action: "Accessibility Audit",
    description: "All 12 components passed WCAG AA compliance check",
    time: "15 min ago",
    tone: "brand",
    tag: "Audit",
  },
  {
    id: 3,
    action: "Design Token Updated",
    description: "Warning tone contrast ratio improved to 4.8:1",
    time: "1 hour ago",
    tone: "warning",
    tag: "Update",
  },
  {
    id: 4,
    action: "Bug Report",
    description: "Modal focus trap not working on Firefox - assigned to team",
    time: "3 hours ago",
    tone: "danger",
    tag: "Bug",
  },
  {
    id: 5,
    action: "Release Published",
    description: "v1.0.0 published to npm with 12 components",
    time: "1 day ago",
    tone: "success",
    tag: "Release",
  },
  {
    id: 6,
    action: "Team Member Joined",
    description: "New contributor joined the Lego DS project",
    time: "2 days ago",
    tone: "brand",
    tag: "Team",
  },
]

export function ActivityFeed() {
  return (
    <Card title="Recent Activity" subtitle="Latest updates across the design system">
      <Stack gap={0}>
        {activities.map((item, idx) => (
          <div
            key={item.id}
            style={{
              padding: "14px 0",
              borderBottom:
                idx < activities.length - 1
                  ? `2px solid ${theme.tones.neutral.bg}`
                  : "none",
            }}
          >
            <Inline gap={12} style={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
              <Inline gap={12} wrap={false} style={{ flex: 1, minWidth: 0 }}>
                {/* Indicator dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: theme.tones[item.tone].bg,
                    border: `2px solid ${theme.tones[item.tone].border}`,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
                <Stack gap={4} style={{ minWidth: 0 }}>
                  <Inline gap={8}>
                    <Text size={14} weight={800}>
                      {item.action}
                    </Text>
                    <Badge tone={item.tone}>{item.tag}</Badge>
                  </Inline>
                  <Text
                    size={13}
                    weight={600}
                    style={{
                      opacity: 0.7,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.description}
                  </Text>
                </Stack>
              </Inline>
              <Text
                size={12}
                weight={700}
                style={{ opacity: 0.5, whiteSpace: "nowrap", flexShrink: 0 }}
              >
                {item.time}
              </Text>
            </Inline>
          </div>
        ))}
      </Stack>
    </Card>
  )
}
