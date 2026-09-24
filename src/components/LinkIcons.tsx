import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className ?? ""}`}
    >
      {children}
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M9 19c-4 1.5-4-2.5-6-3m12 6v-3.9a3.1 3.1 0 0 0-.9-2.4c3-.3 6.1-1.5 6.1-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.5s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.7 0C6.4 2.7 5.3 3 5.3 3a4.8 4.8 0 0 0-.1 3.5 5.2 5.2 0 0 0-1.4 3.6c0 5.1 3.1 6.2 6.1 6.6a3.1 3.1 0 0 0-.9 2.4V22" />
    </Icon>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v5M8 8h.01M12 16v-3a2 2 0 0 1 4 0v3" />
    </Icon>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z" />
      <path d="M9 10.2c.4 1.5 1.6 2.7 3.1 3.1" />
    </Icon>
  );
}

export function EmailIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  );
}

export function ResumeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M8 13h8M8 17h5" />
    </Icon>
  );
}
