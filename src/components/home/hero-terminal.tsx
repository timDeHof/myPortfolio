import { Link } from "@tanstack/react-router";
import { m, useReducedMotion } from "framer-motion";
import { Download, MapPin, MessageCircle } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { env } from "@/lib/env";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

/* ─── Terminal line data ─── */

interface TerminalLine {
  type: "prompt" | "success" | "output" | "dim" | "warn" | "accent" | "empty";
  text: string;
}

const TERMINAL_LINES: TerminalLine[] = [
  { type: "prompt", text: "deploy --production" },
  { type: "dim", text: "  Running pre-deploy checks..." },
  { type: "success", text: "  ✓ Lint passed (0 warnings)" },
  { type: "success", text: "  ✓ Type-check passed" },
  { type: "empty", text: "" },
  { type: "output", text: "  Bundling assets..." },
  { type: "dim", text: "    index.js        14.2 kB  (gzipped)" },
  { type: "dim", text: "    vendor.js       38.7 kB  (gzipped)" },
  { type: "dim", text: "    styles.css       6.1 kB  (gzipped)" },
  { type: "success", text: "  ✓ Build complete — 59.0 kB total" },
  { type: "empty", text: "" },
  { type: "success", text: "  ✓ Uploaded to Cloudflare" },
  { type: "success", text: "  ✓ Deployed to edge" },
  { type: "warn", text: "  ⚠ Cache purge pending (~30s)" },
  { type: "success", text: "  ✓ Health check passed" },
  { type: "accent", text: "  → https://timdehof.dev" },
  { type: "empty", text: "" },
  { type: "success", text: "  ✓ Live — 0 errors, 14.8s" },
  { type: "prompt", text: "" },
];

/* ─── Typing speed helpers ─── */

function getTypingDelay(char: string): number {
  if (char === "-" || char === "/" || char === ".")
    return 100 + Math.random() * 60;
  if (char === char.toUpperCase() && char !== char.toLowerCase())
    return 80 + Math.random() * 50;
  return 45 + Math.random() * 35;
}

/* ─── Line rendering helpers ─── */

function buildLineHtml(line: TerminalLine, isLast: boolean): string {
  const cursorHtml = isLast
    ? "<span class=\"terminal-cursor\"></span>"
    : "";

  if (line.type === "prompt") {
    return `<span class="text-emerald-500 dark:text-emerald-400">❯ </span><span class="text-foreground">${line.text}</span>${cursorHtml}`;
  }

  if (line.type === "empty") {
    return `<span>&nbsp;</span>`;
  }

  const colorClass = getLineColorClass(line.type);
  return `<span class="${colorClass}">${line.text}</span>`;
}

function getLineColorClass(type: TerminalLine["type"]): string {
  switch (type) {
    case "success":
      return "text-emerald-500 dark:text-emerald-400";
    case "output":
      return "text-muted-foreground";
    case "dim":
      return "text-muted-foreground/70";
    case "warn":
      return "text-amber-500 dark:text-amber-400";
    case "accent":
      return "text-primary";
    default:
      return "text-foreground";
  }
}

/* ─── Reduced-motion variants ─── */

const containerVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ─── CSS for terminal animations (injected once) ─── */

const TERMINAL_STYLES = `
  .terminal-line {
    white-space: pre;
    line-height: 1.7;
  }

  .terminal-cursor {
    display: inline-block;
    width: 7px;
    height: 15px;
    background: hsl(var(--primary));
    vertical-align: text-bottom;
    animation: terminal-blink 1s step-end infinite;
  }

  @keyframes terminal-blink {
    50% {
      opacity: 0;
    }
  }
`;

export function HeroTerminal() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const activeContainerVariants = shouldReduceMotion
    ? containerVariantsReduced
    : containerVariants;
  const activeItemVariants = shouldReduceMotion
    ? itemVariantsReduced
    : itemVariants;

  const clearAllTimeouts = useCallback(() => {
    for (const id of timeoutsRef.current) {
      clearTimeout(id);
    }
    timeoutsRef.current = [];
  }, []);

  const scheduleTimeout = useCallback(
    (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
      return id;
    },
    [],
  );

  /* ─── Animation orchestration ─── */
  useEffect(() => {
    const body = terminalBodyRef.current;
    if (!body) {
      return;
    }

    /* Reset */
    body.innerHTML = "";
    clearAllTimeouts();

    if (shouldReduceMotion) {
      /* Render all lines immediately with no animation */
      const fragment = document.createDocumentFragment();
      TERMINAL_LINES.forEach((line, i) => {
        const div = document.createElement("div");
        div.className = "terminal-line opacity-100 translate-y-0";
        div.innerHTML = buildLineHtml(line, i === TERMINAL_LINES.length - 1);
        fragment.appendChild(div);
      });
      body.appendChild(fragment);
      return;
    }

    /* Phase 1: Typing the first command */
    const firstLine = document.createElement("div");
    firstLine.className = "terminal-line opacity-0 translate-y-2";
    const cmdTarget = document.createElement("span");
    cmdTarget.className = "text-foreground";
    const cursor = document.createElement("span");
    cursor.className = "terminal-cursor";
    firstLine.innerHTML = `<span class="text-emerald-500 dark:text-emerald-400">❯ </span>`;
    firstLine.appendChild(cmdTarget);
    firstLine.appendChild(cursor);
    body.appendChild(firstLine);

    /* Transition line in */
    scheduleTimeout(() => {
      firstLine.classList.remove("opacity-0", "translate-y-2");
      firstLine.classList.add(
        "opacity-100",
        "translate-y-0",
        "transition-all",
        "duration-200",
      );
    }, 100);

    const command = "deploy --production";
    let charIndex = 0;

    function typeChar() {
      if (charIndex < command.length) {
        cmdTarget.textContent += command[charIndex];
        charIndex++;
        scheduleTimeout(typeChar, getTypingDelay(command[charIndex - 1]));
      }
      else {
        /* Typing done — remove cursor from first line */
        cursor.remove();
        scheduleTimeout(startStreaming, 500);
      }
    }

    scheduleTimeout(typeChar, 500);

    /* Phase 2: Stream the remaining lines */
    function startStreaming() {
      const remaining = TERMINAL_LINES.slice(1);
      const fragment = document.createDocumentFragment();

      remaining.forEach((line, i) => {
        const div = document.createElement("div");
        const isLast = i === remaining.length - 1;
        div.className = "terminal-line opacity-0 translate-y-2 transition-all duration-300";
        div.innerHTML = buildLineHtml(line, isLast);
        div.style.transitionDelay = `${i * 80}ms`;
        fragment.appendChild(div);
      });

      body.appendChild(fragment);

      /* Trigger reflow then animate in */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          body.querySelectorAll(".terminal-line.opacity-0").forEach((el) => {
            el.classList.remove("opacity-0", "translate-y-2");
            el.classList.add("opacity-100", "translate-y-0");
          });
        });
      });
    }

    return clearAllTimeouts;
  }, [shouldReduceMotion, scheduleTimeout, clearAllTimeouts]);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-[hsl(var(--background))]">
      {/* Background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23000%27%20fill-opacity=%271%27%3E%3Cpath%20d=%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      />
      <MaxWidthWrapper>
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16">
          {/* ─── Left: Text content (mirrors hero-section) ─── */}
          <m.div
            variants={activeContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <m.div variants={activeItemVariants} className="mb-5">
              <Badge
                variant="outline"
                className="border-amber-500/50 bg-amber-500/10 px-4 py-1 text-amber-600 dark:border-amber-400/50 dark:bg-amber-400/10 dark:text-amber-400"
              >
                <m.span
                  className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                  }
                  transition={
                    shouldReduceMotion
                      ? {}
                      : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                />
                Available for opportunities
              </Badge>
            </m.div>

            <m.h1
              variants={activeItemVariants}
              className="mb-1 font-bold tracking-tight"
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                Tim DeHof
              </span>
            </m.h1>

            <m.p
              variants={activeItemVariants}
              className="mb-4 text-xl text-muted-foreground sm:text-2xl md:text-3xl"
            >
              Full-Stack Developer
            </m.p>

            <m.div
              variants={activeItemVariants}
              className="mb-5 flex flex-col gap-1.5 text-sm text-muted-foreground xl:flex-row xl:flex-wrap xl:items-center xl:gap-x-2 xl:gap-y-1 xl:text-base"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>Remote · Jacksonville, FL</span>
              </span>
              <span aria-hidden="true" className="hidden xl:inline text-muted-foreground/40">·</span>
              <span>3+ Years Experience</span>
              <span aria-hidden="true" className="hidden xl:inline text-muted-foreground/40">·</span>
              <span>20+ Projects Delivered</span>
            </m.div>

            <m.p
              variants={activeItemVariants}
              className="mb-8 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              Building scalable web applications that solve real problems.
              Focused on clean code and maintainable architecture.
            </m.p>

            <m.div
              variants={activeItemVariants}
              className="flex flex-wrap gap-3"
            >
              {env.VITE_RESUME_URL && (
                <Button asChild size="lg" className="group">
                  <a
                    href={env.VITE_RESUME_URL}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                    Download Resume
                  </a>
                </Button>
              )}
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  <MessageCircle className="h-5 w-5" />
                  Let's Talk
                </Link>
              </Button>
            </m.div>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Glow backdrop */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)]"
                />

                {/* Terminal shell */}
                <div className="relative overflow-hidden rounded-lg border border-border bg-card font-mono text-[13px] shadow-lg [box-shadow:0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.6),0_1px_3px_rgba(0,0,0,0.08)] dark:[box-shadow:var(--shadow-lg)]">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3.5 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="ml-2 text-[11px] text-muted-foreground/70">
                      ~/portfolio
                    </span>
                  </div>

                  {/* Terminal body */}
                  <div
                    ref={terminalBodyRef}
                    className="min-h-[360px] p-4 leading-[1.7]"
                  />
                </div>
              </div>
            </m.div>
        </div>
      </MaxWidthWrapper>

      {/* Inject terminal animation styles */}
      <style dangerouslySetInnerHTML={{ __html: TERMINAL_STYLES }} />
    </section>
  );
}
