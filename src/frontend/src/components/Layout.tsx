import type { ReactNode } from "react";
import { DelegateModal } from "./DelegateModal";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 h-12 flex items-center px-6">
        <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
          {/* Wordmark */}
          <div className="flex items-center gap-2.5" data-ocid="nav.wordmark">
            <div className="w-5 h-5 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-primary" />
            </div>
            <span className="font-display font-semibold text-sm tracking-tight text-foreground">
              Second
            </span>
          </div>

          {/* Right side: date + avatar */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-mono hidden sm:block">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
            <button
              type="button"
              data-ocid="nav.avatar"
              aria-label="Account"
              className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-semibold text-muted-foreground hover:border-primary/50 transition-smooth"
            >
              F
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 px-6">
        <div className="max-w-3xl mx-auto w-full">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200 underline-offset-2 hover:underline"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Global delegate modal */}
      <DelegateModal />
    </div>
  );
}
