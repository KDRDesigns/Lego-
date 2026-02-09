"use client"

import React from "react"
import { Stack } from "@/components/lego"
import { DashboardHeader } from "./header"
import { StatCards } from "./stat-cards"
import { ActivityFeed } from "./activity-feed"
import { QuickActions, ComponentRegistry, SystemHealth } from "./quick-actions"

export function DashboardContent() {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <DashboardHeader />
      <main
        style={{
          flex: 1,
          padding: 24,
          overflowY: "auto",
          background: "#f9fafb",
        }}
      >
        <Stack gap={24}>
          {/* Stat Cards Row */}
          <StatCards />

          {/* Main Content Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            {/* Left column */}
            <Stack gap={20}>
              <ActivityFeed />
              <ComponentRegistry />
            </Stack>

            {/* Right column */}
            <Stack gap={20}>
              <QuickActions />
              <SystemHealth />
            </Stack>
          </div>
        </Stack>
      </main>
    </div>
  )
}
