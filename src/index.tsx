import React, { CSSProperties, useId, useMemo, useState } from "react";

/**
 * Lego Design System (fictional)
 * Simple + playful “blocks” aesthetic
 * - chunky borders
 * - rounded corners
 * - soft shadow
 * - high-contrast focus ring
 */

type Tone = "neutral" | "brand" | "success" | "warning" | "danger";

const theme = {
  radius: 14,
  border: 3,
  shadow: "0 6px 0 rgba(0,0,0,0.20)",
  shadowPressed: "0 2px 0 rgba(0,0,0,0.20)",
  focusRing: "0 0 0 4px rgba(59,130,246,0.45)",
  font: `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"`,
  text: "#111827",
  bg: "#ffffff",
  tones: {
    neutral: { bg: "#F3F4F6", fg: "#111827", border: "#111827" },
    brand: { bg: "#60A5FA", fg: "#0B1220", border: "#0B1220" },
    success: { bg: "#34D399", fg: "#052014", border: "#052014" },
    warning: { bg: "#FBBF24", fg: "#1F1400", border: "#1F1400" },
    danger: { bg: "#F87171", fg: "#260606", border: "#260606" },
  } as Record<Tone, { bg: string; fg: string; border: string }>,
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function baseBlockStyle(tone: Tone = "neutral"): CSSProperties {
  const t = theme.tones[tone];
  return {
    fontFamily: theme.font,
    color: t.fg,
    background: t.bg,
    border: `${theme.border}px solid ${t.border}`,
    borderRadius: theme.radius,
    boxShadow: theme.shadow,
    transition: "transform 120ms ease, box-shadow 120ms ease, filter 120ms ease",
  };
}

function focusableStyle(disabled?: boolean): CSSProperties {
  return disabled
    ? { opacity: 0.55, cursor: "not-allowed" }
    : { cursor: "pointer" };
}

/* =======================================================================================
 * 1) Box — layout primitive
 * ======================================================================================= */
export function Box({
  as: Comp = "div",
  tone = "neutral",
  padding = 16,
  style,
  ...rest
}: {
  as?: keyof JSX.IntrinsicElements;
  tone?: Tone;
  padding?: number;
  style?: CSSProperties;
  [key: string]: any;
}) {
  return (
    <Comp
      style={{
        ...baseBlockStyle(tone),
        padding,
        ...style,
      }}
      {...rest}
    />
  );
}

/* =======================================================================================
 * 2) Stack — vertical spacing primitive
 * ======================================================================================= */
export function Stack({
  gap = 12,
  align = "stretch",
  style,
  ...rest
}: {
  gap?: number;
  align?: CSSProperties["alignItems"];
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
        alignItems: align,
        ...style,
      }}
      {...rest}
    />
  );
}

/* =======================================================================================
 * 3) Inline — horizontal spacing primitive
 * ======================================================================================= */
export function Inline({
  gap = 10,
  align = "center",
  wrap = true,
  style,
  ...rest
}: {
  gap?: number;
  align?: CSSProperties["alignItems"];
  wrap?: boolean;
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        gap,
        alignItems: align,
        ...style,
      }}
      {...rest}
    />
  );
}

/* =======================================================================================
 * 4) Text — basic typography
 * ======================================================================================= */
export function Text({
  as: Comp = "p",
  size = 14,
  weight = 600,
  style,
  ...rest
}: {
  as?: keyof JSX.IntrinsicElements;
  size?: number;
  weight?: number;
  style?: CSSProperties;
  [key: string]: any;
}) {
  return (
    <Comp
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
  );
}

/* =======================================================================================
 * 5) Button
 * ======================================================================================= */
export function Button({
  tone = "brand",
  size = "md",
  disabled,
  children,
  style,
  ...rest
}: {
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
  style?: CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const padY = size === "sm" ? 8 : size === "lg" ? 14 : 10;
  const padX = size === "sm" ? 12 : size === "lg" ? 18 : 14;

  return (
    <button
      disabled={disabled}
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
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(3px)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = theme.shadowPressed;
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = theme.shadow;
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = theme.shadow;
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
      }}
      onFocus={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `${theme.shadow}, ${theme.focusRing}`;
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* =======================================================================================
 * 6) IconButton — accessible icon-only button
 * ======================================================================================= */
export function IconButton({
  label,
  tone = "neutral",
  disabled,
  children,
  size = 40,
  style,
  ...rest
}: {
  label: string; // required for accessibility
  tone?: Tone;
  disabled?: boolean;
  children: React.ReactNode; // icon
  size?: number;
  style?: CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={label}
      disabled={disabled}
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
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `${theme.shadow}, ${theme.focusRing}`;
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = theme.shadow;
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* =======================================================================================
 * 7) Input — text input with label + help + error
 * ======================================================================================= */
export function Input({
  label,
  description,
  error,
  tone = "neutral",
  required,
  id,
  style,
  ...rest
}: {
  label: string;
  description?: string;
  error?: string;
  tone?: Tone;
  required?: boolean;
  id?: string;
  style?: CSSProperties;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId();
  const inputId = id ?? `lego-input-${autoId}`;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;

  return (
    <Stack gap={6} style={{ ...style }}>
      <label htmlFor={inputId} style={{ fontFamily: theme.font, fontWeight: 800 }}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>

      <input
        id={inputId}
        aria-describedby={[descId, errId].filter(Boolean).join(" ") || undefined}
        aria-invalid={!!error}
        style={{
          ...baseBlockStyle(tone),
          padding: "10px 12px",
          fontSize: 14,
          fontWeight: 700,
          outline: "none",
          boxShadow: theme.shadow,
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLInputElement).style.boxShadow = `${theme.shadow}, ${theme.focusRing}`;
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLInputElement).style.boxShadow = theme.shadow;
        }}
        {...rest}
      />

      {description ? (
        <div id={descId} style={{ fontFamily: theme.font, fontSize: 12, opacity: 0.85 }}>
          {description}
        </div>
      ) : null}

      {error ? (
        <div
          id={errId}
          role="alert"
          style={{ fontFamily: theme.font, fontSize: 12, fontWeight: 800 }}
        >
          {error}
        </div>
      ) : null}
    </Stack>
  );
}

/* =======================================================================================
 * 8) Textarea — multi-line input
 * ======================================================================================= */
export function Textarea({
  label,
  description,
  error,
  tone = "neutral",
  required,
  id,
  rows = 4,
  style,
  ...rest
}: {
  label: string;
  description?: string;
  error?: string;
  tone?: Tone;
  required?: boolean;
  id?: string;
  rows?: number;
  style?: CSSProperties;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const autoId = useId();
  const textareaId = id ?? `lego-textarea-${autoId}`;
  const descId = description ? `${textareaId}-desc` : undefined;
  const errId = error ? `${textareaId}-err` : undefined;

  return (
    <Stack gap={6} style={{ ...style }}>
      <label htmlFor={textareaId} style={{ fontFamily: theme.font, fontWeight: 800 }}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>

      <textarea
        id={textareaId}
        rows={clamp(rows, 2, 12)}
        aria-describedby={[descId, errId].filter(Boolean).join(" ") || undefined}
        aria-invalid={!!error}
        style={{
          ...baseBlockStyle(tone),
          padding: "10px 12px",
          fontSize: 14,
          fontWeight: 700,
          outline: "none",
          resize: "vertical",
          boxShadow: theme.shadow,
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLTextAreaElement).style.boxShadow = `${theme.shadow}, ${theme.focusRing}`;
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLTextAreaElement).style.boxShadow = theme.shadow;
        }}
        {...rest}
      />

      {description ? (
        <div id={descId} style={{ fontFamily: theme.font, fontSize: 12, opacity: 0.85 }}>
          {description}
        </div>
      ) : null}

      {error ? (
        <div
          id={errId}
          role="alert"
          style={{ fontFamily: theme.font, fontSize: 12, fontWeight: 800 }}
        >
          {error}
        </div>
      ) : null}
    </Stack>
  );
}

/* =======================================================================================
 * 9) Card — content container
 * ======================================================================================= */
export function Card({
  title,
  subtitle,
  tone = "neutral",
  children,
  style,
  ...rest
}: {
  title?: string;
  subtitle?: string;
  tone?: Tone;
  children: React.ReactNode;
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Box tone={tone} padding={16} style={{ ...style }} {...rest}>
      {(title || subtitle) && (
        <Stack gap={4} style={{ marginBottom: 12 }}>
          {title ? <Text as="h3" size={16} weight={900}>{title}</Text> : null}
          {subtitle ? <Text as="p" size={13} weight={700} style={{ opacity: 0.9 }}>{subtitle}</Text> : null}
        </Stack>
      )}
      {children}
    </Box>
  );
}

/* =======================================================================================
 * 10) Badge — small status label
 * ======================================================================================= */
export function Badge({
  tone = "neutral",
  children,
  style,
  ...rest
}: {
  tone?: Tone;
  children: React.ReactNode;
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const t = theme.tones[tone];
  return (
    <span
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
  );
}

/* =======================================================================================
 * 11) Toggle — checkbox-like switch
 * ======================================================================================= */
export function Toggle({
  label,
  checked,
  onChange,
  disabled,
  toneOn = "success",
  toneOff = "neutral",
  style,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  toneOn?: Tone;
  toneOff?: Tone;
  style?: CSSProperties;
}) {
  const t = theme.tones[checked ? toneOn : toneOff];

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: theme.font,
        fontWeight: 800,
        ...style,
        ...(disabled ? { opacity: 0.55, cursor: "not-allowed" } : { cursor: "pointer" }),
      }}
    >
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        onClick={() => {
          if (disabled) return;
          onChange(!checked);
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
          if (disabled) return;
          (e.currentTarget as HTMLSpanElement).style.boxShadow = `${theme.shadow}, ${theme.focusRing}`;
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLSpanElement).style.boxShadow = theme.shadow;
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
  );
}

/* =======================================================================================
 * 12) Modal — simple accessible dialog scaffold
 * ======================================================================================= */
export function Modal({
  open,
  title,
  children,
  onClose,
  tone = "neutral",
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  tone?: Tone;
}) {
  const titleId = useId();

  if (!open) return null;

  return (
    <div
      role="presentation"
      onMouseDown={(e) => {
        // click backdrop to close
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          width: "min(560px, 100%)",
        }}
      >
        <Card tone={tone} style={{ padding: 16 }}>
          <Inline style={{ justifyContent: "space-between", marginBottom: 10 }}>
            <Text as="h2" size={18} weight={950} id={titleId}>
              {title}
            </Text>
            <IconButton label="Close dialog" onClick={onClose}>
              ✕
            </IconButton>
          </Inline>
          <div>{children}</div>
        </Card>
      </div>
    </div>
  );
}

/* =======================================================================================
 * 13) SkillsDashboard — example “dashboard” composition
 * ======================================================================================= */

export type SkillsDashboardStat = {
  id: string;
  label: string;
  value: string;
  tone?: Tone;
  badge?: { label: string; tone?: Tone };
};

export type SkillsDashboardSkill = {
  id: string;
  name: string;
  level: number; // 0..100
  tone?: Tone;
  tag?: { label: string; tone?: Tone };
};

export type SkillsDashboardActivityItem = {
  id: string;
  tone?: Tone;
  label: string;
  timestamp?: string;
};

function ProgressBar({
  value,
  tone = "brand",
}: {
  value: number;
  tone?: Tone;
}) {
  const pct = clamp(value, 0, 100);
  const t = theme.tones[tone];
  return (
    <div
      role="progressbar"
      aria-label="Skill progress"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        height: 14,
        borderRadius: 999,
        border: `${theme.border}px solid ${t.border}`,
        background: "#fff",
        boxShadow: "0 3px 0 rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: `${pct}%`,
          height: "100%",
          background: t.bg,
        }}
      />
    </div>
  );
}

const defaultStats: SkillsDashboardStat[] = [
  {
    id: "streak",
    label: "Streak",
    value: "12 days",
    tone: "brand",
    badge: { label: "🔥 On fire", tone: "success" },
  },
  {
    id: "skills",
    label: "Skills tracked",
    value: "8",
    tone: "success",
    badge: { label: "+2 this week", tone: "brand" },
  },
  {
    id: "focus",
    label: "Focus score",
    value: "78%",
    tone: "warning",
    badge: { label: "Needs a push", tone: "neutral" },
  },
];

const defaultSkills: SkillsDashboardSkill[] = [
  { id: "react", name: "React", level: 82, tone: "brand", tag: { label: "Core", tone: "brand" } },
  { id: "ts", name: "TypeScript", level: 74, tone: "success", tag: { label: "Daily", tone: "success" } },
  { id: "a11y", name: "Accessibility", level: 58, tone: "warning", tag: { label: "Improve", tone: "warning" } },
  { id: "testing", name: "Testing", level: 46, tone: "danger", tag: { label: "Priority", tone: "danger" } },
];

const defaultActivity: SkillsDashboardActivityItem[] = [
  { id: "a1", tone: "success", label: "Completed a TypeScript kata", timestamp: "Today" },
  { id: "a2", tone: "brand", label: "Reviewed a PR for accessibility fixes", timestamp: "Yesterday" },
  { id: "a3", tone: "warning", label: "Missed a practice session", timestamp: "2 days ago" },
];

export function SkillsDashboard({
  title = "Skills Dashboard",
  subtitle = "Build consistent, playful UI blocks—one stud at a time.",
  stats = defaultStats,
  skills = defaultSkills,
  activity = defaultActivity,
  style,
  ...rest
}: {
  title?: string;
  subtitle?: string;
  stats?: SkillsDashboardStat[];
  skills?: SkillsDashboardSkill[];
  activity?: SkillsDashboardActivityItem[];
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) {
  // Spacing scale (aligned to the “stud” idea from BUILD SKILL.md)
  const STUD = 12;

  const [query, setQuery] = useState("");
  const [showOnlyNeedsWork, setShowOnlyNeedsWork] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [addedSkills, setAddedSkills] = useState<SkillsDashboardSkill[]>([]);

  const [newName, setNewName] = useState("");
  const [newLevel, setNewLevel] = useState(50);
  const [newError, setNewError] = useState<string | undefined>(undefined);

  const allSkills = useMemo(() => [...addedSkills, ...skills], [addedSkills, skills]);

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allSkills.filter((s) => {
      if (showOnlyNeedsWork && s.level >= 60) return false;
      if (!q) return true;
      return s.name.toLowerCase().includes(q);
    });
  }, [allSkills, query, showOnlyNeedsWork]);

  return (
    <div
      style={{
        fontFamily: theme.font,
        color: theme.text,
        background: "#f9fafb",
        padding: STUD * 2,
        minHeight: "100vh",
        ...style,
      }}
      {...rest}
    >
      <Stack gap={STUD * 2} style={{ maxWidth: 1040, margin: "0 auto" }}>
        {/* Header */}
        <Inline gap={STUD} style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <Stack gap={6} style={{ minWidth: 260 }}>
            <Text as="h1" size={24} weight={900}>
              {title}
            </Text>
            <Text as="p" size={14} weight={400} style={{ opacity: 0.9 }}>
              {subtitle}
            </Text>
          </Stack>

          <Inline gap={STUD} style={{ justifyContent: "flex-end" }}>
            <Toggle
              label="Show needs work"
              checked={showOnlyNeedsWork}
              onChange={setShowOnlyNeedsWork}
              toneOn="warning"
              toneOff="neutral"
            />
            <Button tone="brand" onClick={() => setAddOpen(true)}>
              Add skill
            </Button>
          </Inline>
        </Inline>

        {/* KPI cards */}
        <Inline gap={STUD} wrap={true}>
          {stats.map((s) => (
            <Card key={s.id} tone={s.tone ?? "neutral"} style={{ flex: 1, minWidth: 240 }}>
              <Stack gap={STUD}>
                <Text as="h2" size={18} weight={400}>
                  {s.label}
                </Text>
                <Text as="p" size={32} weight={900}>
                  {s.value}
                </Text>
                {s.badge ? <Badge tone={s.badge.tone ?? "neutral"}>{s.badge.label}</Badge> : null}
              </Stack>
            </Card>
          ))}
        </Inline>

        {/* Skills */}
        <Card
          title="Skills"
          subtitle="Filter, track progress, and keep a steady cadence."
          style={{ padding: STUD + 4 }}
        >
          <Stack gap={STUD + 4}>
            <Input
              label="Search"
              value={query}
              onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
              placeholder="Type a skill name…"
              description="Tip: enable “Show needs work” to focus on skills under 60%."
            />

            <Stack gap={STUD}>
              {filteredSkills.length === 0 ? (
                <Box tone="neutral" padding={STUD}>
                  <Text as="p" size={14} weight={400}>
                    No matching skills.
                  </Text>
                </Box>
              ) : (
                filteredSkills.map((s) => (
                  <Box key={s.id} tone="neutral" padding={STUD}>
                    <Stack gap={8}>
                      <Inline gap={STUD} style={{ justifyContent: "space-between" }}>
                        <Text as="h3" size={14} weight={900}>
                          {s.name}
                        </Text>
                        {s.tag ? <Badge tone={s.tag.tone ?? "neutral"}>{s.tag.label}</Badge> : null}
                      </Inline>

                      <ProgressBar value={s.level} tone={s.tone ?? "brand"} />

                      <Inline gap={8} style={{ justifyContent: "space-between" }}>
                        <Text as="p" size={12} weight={400} style={{ opacity: 0.85 }}>
                          Current level
                        </Text>
                        <Text as="p" size={12} weight={900}>
                          {clamp(s.level, 0, 100)}%
                        </Text>
                      </Inline>
                    </Stack>
                  </Box>
                ))
              )}
            </Stack>
          </Stack>
        </Card>

        {/* Recent activity */}
        <Card title="Recent activity" subtitle="Keep an eye on momentum." style={{ padding: STUD + 4 }}>
          <Stack gap={STUD}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {activity.map((a) => (
                <li key={a.id} style={{ marginBottom: STUD }}>
                  <Inline gap={STUD} style={{ alignItems: "baseline" }}>
                    <Badge tone={a.tone ?? "neutral"}>•</Badge>
                    <Stack gap={4} style={{ flex: 1 }}>
                      <Text as="p" size={14} weight={400}>
                        {a.label}
                      </Text>
                      {a.timestamp ? (
                        <Text as="p" size={12} weight={400} style={{ opacity: 0.75 }}>
                          {a.timestamp}
                        </Text>
                      ) : null}
                    </Stack>
                  </Inline>
                </li>
              ))}
            </ul>
          </Stack>
        </Card>
      </Stack>

      <Modal
        open={addOpen}
        title="Add a skill"
        onClose={() => {
          setAddOpen(false);
          setNewError(undefined);
        }}
        tone="brand"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = newName.trim();
            if (!name) {
              setNewError("Please enter a skill name.");
              return;
            }
            const level = clamp(Number.isFinite(newLevel) ? newLevel : 0, 0, 100);
            setAddedSkills((prev) => [
              {
                id: `custom-${Date.now()}`,
                name,
                level,
                tone: level < 60 ? "warning" : "success",
                tag: { label: "Custom", tone: "neutral" },
              },
              ...prev,
            ]);
            setNewName("");
            setNewLevel(50);
            setNewError(undefined);
            setAddOpen(false);
          }}
        >
          <Stack gap={STUD + 4}>
            <Input
              label="Skill name"
              value={newName}
              onChange={(e) => setNewName((e.target as HTMLInputElement).value)}
              required
              error={newError}
              placeholder="e.g. UI Architecture"
            />
            <Input
              label="Starting level (0–100)"
              type="number"
              min={0}
              max={100}
              value={String(newLevel)}
              onChange={(e) => setNewLevel(Number((e.target as HTMLInputElement).value))}
              description="You can adjust later—start with an honest baseline."
            />
            <Inline gap={STUD} style={{ justifyContent: "flex-end" }}>
              <Button type="button" tone="neutral" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" tone="brand">
                Save
              </Button>
            </Inline>
          </Stack>
        </form>
      </Modal>
    </div>
  );
}
