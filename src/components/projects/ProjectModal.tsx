import { AnimatePresence, m } from "framer-motion";
import React, { Suspense } from "react";

import type { Project } from "../../types/project";

interface ProjectModalProps {
  isOpen: boolean;
  project: Project | null;
  isLoading: boolean;
  onClose: () => void;
  children: (project: Project) => React.ReactNode;
}

function ModalLoadingSkeleton({ variant }: { variant: "mobile" | "desktop" }) {
  if (variant === "mobile") {
    return (
      <div className="p-4 space-y-4">
        <div className="h-8 w-48 bg-border rounded animate-pulse" />
        <div className="h-48 bg-border rounded-lg animate-pulse" />
      </div>
    );
  }
  return (
    <div className="p-8 space-y-4">
      <div className="h-8 w-48 bg-border rounded animate-pulse" />
      <div className="h-64 bg-border rounded-lg animate-pulse" />
    </div>
  );
}

function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Close modal"
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
    />
  );
}

export function ProjectModal({ isOpen, project, isLoading, onClose, children }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile: Full-screen bottom sheet */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <Backdrop onClose={onClose} />
            <Suspense
              fallback={(
                <div className="absolute inset-0 md:hidden bg-muted p-4 space-y-4">
                  <div className="h-8 w-48 bg-border rounded animate-pulse" />
                  <div className="h-48 bg-border rounded-lg animate-pulse" />
                </div>
              )}
            >
              <m.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute inset-0 md:hidden bg-muted overflow-y-scroll"
              >
                {isLoading
                  ? (
                      <ModalLoadingSkeleton variant="mobile" />
                    )
                  : project
                    ? (
                        children(project)
                      )
                    : (
                        <div className="p-4 text-center">
                          <p className="text-muted-foreground">Project not found</p>
                        </div>
                      )}
              </m.div>
            </Suspense>
          </m.div>

          {/* Desktop: Centered overlay */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden md:block fixed inset-0 z-50"
          >
            <Backdrop onClose={onClose} />
            <Suspense
              fallback={(
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl max-h-[90vh] rounded-xl bg-muted p-8 space-y-4">
                  <div className="h-8 w-48 bg-border rounded animate-pulse" />
                  <div className="h-64 bg-border rounded-lg animate-pulse" />
                </div>
              )}
            >
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl max-h-[90vh] rounded-xl bg-muted overflow-y-auto shadow-2xl"
              >
                {isLoading
                  ? (
                      <ModalLoadingSkeleton variant="desktop" />
                    )
                  : project
                    ? (
                        children(project)
                      )
                    : (
                        <div className="p-8 text-center">
                          <p className="text-muted-foreground">Project not found</p>
                        </div>
                      )}
              </m.div>
            </Suspense>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
