// Hermes session source pill — replaces the project field for Hermes sessions
// in the sessions list, and renders in the detail-page cross-cutting header.
//
// Spec wireframes used emoji + word; we render lucide icons instead because
// it matches the rest of the app, doesn't fight Tailwind theming, and renders
// consistently across platforms.

import {
  Terminal, Globe, Server, Send, MessageSquare, Hash, MessageCircle,
  Shield, Triangle, Clock, Webhook, HelpCircle, type LucideIcon,
} from "lucide-react";

export type HermesSource =
  | "cli" | "tui" | "webui" | "api_server"
  | "telegram" | "discord" | "slack" | "whatsapp" | "signal" | "matrix"
  | "cron" | "webhook";

interface SourceMeta {
  label: string;
  icon: LucideIcon;
  /** Tailwind classes for text + background pill */
  cls: string;
}

const SOURCES: Record<HermesSource, SourceMeta> = {
  cli:        { label: "CLI",       icon: Terminal,       cls: "text-amber-300 bg-amber-500/10 border-amber-500/30" },
  tui:        { label: "TUI",       icon: Terminal,       cls: "text-amber-300 bg-amber-500/10 border-amber-500/30" },
  webui:      { label: "WEBUI",     icon: Globe,          cls: "text-violet-300 bg-violet-500/10 border-violet-500/30" },
  api_server: { label: "API",       icon: Server,         cls: "text-violet-300 bg-violet-500/10 border-violet-500/30" },
  telegram:   { label: "TELEGRAM",  icon: Send,           cls: "text-sky-300 bg-sky-500/10 border-sky-500/30" },
  discord:    { label: "DISCORD",   icon: MessageSquare,  cls: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30" },
  slack:      { label: "SLACK",     icon: Hash,           cls: "text-pink-300 bg-pink-500/10 border-pink-500/30" },
  whatsapp:   { label: "WHATSAPP",  icon: MessageCircle,  cls: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30" },
  signal:     { label: "SIGNAL",    icon: Shield,         cls: "text-blue-300 bg-blue-500/10 border-blue-500/30" },
  matrix:     { label: "MATRIX",    icon: Triangle,       cls: "text-green-300 bg-green-500/10 border-green-500/30" },
  cron:       { label: "CRON",      icon: Clock,          cls: "text-orange-300 bg-orange-500/10 border-orange-500/30" },
  webhook:    { label: "WEBHOOK",   icon: Webhook,        cls: "text-orange-300 bg-orange-500/10 border-orange-500/30" },
};

const FALLBACK: SourceMeta = {
  label: "UNKNOWN", icon: HelpCircle,
  cls: "text-[var(--tt-fg-muted)] bg-[var(--tt-panel)] border-[var(--tt-border)]",
};

export default function SourceBadge({
  source,
  size = "sm",
}: {
  source: string | null | undefined;
  size?: "xs" | "sm" | "md";
}) {
  const meta = (source && SOURCES[source as HermesSource]) || FALLBACK;
  const Icon = meta.icon;
  const sizing =
    size === "xs" ? "text-[9px] px-1.5 py-[1px] gap-1" :
    size === "md" ? "text-[11px] px-2.5 py-1 gap-1.5" :
    "text-[10px] px-2 py-[2px] gap-1";
  const iconSize = size === "xs" ? 9 : size === "md" ? 13 : 11;
  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-wider rounded border ${sizing} ${meta.cls}`}
      title={`Hermes session source: ${meta.label.toLowerCase()}`}
    >
      <Icon size={iconSize} />
      {meta.label}
    </span>
  );
}
