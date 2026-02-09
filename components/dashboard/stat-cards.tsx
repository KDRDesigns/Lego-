"use client"

import React from "react"
import { Card, Stack, Text, Badge, Inline, ProgressBar, type Tone } from "@/components/lego"
import { TrendingUp, TrendingDown, Users, Package, Zap, AlertTriangle } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  tone: Tone
  icon: React.ReactNode
  progress?: number
}

const stats: StatCardProps[] = [
  {
    title: "Total Components",
    value: "12",
    change: "+4 this release",
    changeType: "positive",
    tone: "brand",
    icon: <Package size={22} />,
    progress: 75,
  },
  {
    title: "Active Users",
    value: "2,453",
    change: "+12% this week",
    changeType: "positive",
    tone: "success",
    icon: <Users size={22} />,
    progress: 88,
  },
  {
    title: "Build Score",
    value: "98.9%",
    change: "Excellent quality",
    changeType: "positive",
    tone: "brand",
    icon: <Zap size={22} />,
    progress: 99,
  },
  {
    title: "Open Issues",
    value: "7",
    change: "3 need attention",
    changeType: "negative",
    tone: "warning",
    icon: <AlertTriangle size={22} />,
    progress: 30,
  },
]

export function StatCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
      }}
    >
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  changeType,
  tone,
  icon,
  progress,
}: StatCardProps) {
  const changeTone: Tone =
    changeType === "positive"
      ? "success"
      : changeType === "negative"
        ? "danger"
        : "neutral"

  return (
    <Card tone={tone} style={{ flex: 1 }}>
      <Stack gap={12}>
        <Inline style={{ justifyContent: "space-between" }}>
          <Text size={13} weight={800} style={{ opacity: 0.8 }}>
            {title}
          </Text>
          <span style={{ opacity: 0.7 }}>{icon}</span>
        </Inline>
        <Text size={32} weight={950}>
          {value}
        </Text>
        {progress !== undefined && (
          <ProgressBar value={progress} tone={tone === "warning" ? "warning" : "brand"} height={12} />
        )}
        <Inline gap={8}>
          {changeType === "positive" ? (
            <TrendingUp size={14} />
          ) : changeType === "negative" ? (
            <TrendingDown size={14} />
          ) : null}
          <Badge tone={changeTone}>{change}</Badge>
        </Inline>
      </Stack>
    </Card>
  )
}
