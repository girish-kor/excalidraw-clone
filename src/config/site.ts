export const siteConfig = {
  name: "Excalidraw Clone",
  description:
    "A production-ready, open-source collaborative virtual whiteboard built with Next.js, TypeScript, and shadcn/ui.",
  url: "https://excalidraw.yourdomain.com",
  links: {
    github: "https://github.com/girish-kor/excalidraw-clone",
  },
} as const;

export type SiteConfig = typeof siteConfig;
