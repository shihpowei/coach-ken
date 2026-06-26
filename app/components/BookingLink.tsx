"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}

type BookingLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventLabel: string;
};

export function BookingLink({
  children,
  eventLabel,
  href,
  onClick,
  ...props
}: BookingLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        window.gtag?.("event", "booking_click", {
          event_category: "lead",
          event_label: eventLabel,
          link_url: String(href ?? ""),
          page_path: window.location.pathname,
        });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
