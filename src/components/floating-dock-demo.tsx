import { FloatingDock } from "./ui/floating-dock";
import {
  IconCertificate,
  IconCpu,
  IconCreditCard,
  IconHome,
  IconScale,
  IconShieldCheck,
  IconTerminal2,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#top",
    },
    {
      title: "Why Ethica",
      icon: (
        <IconShieldCheck className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#why-ethica",
    },
    {
      title: "EU AI Act & ISO",
      icon: (
        <IconScale className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#regulatory-crosswalk",
    },
    {
      title: "Live Sandbox",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#sandbox",
    },
    {
      title: "Zero-Trust CLI",
      icon: (
        <IconCpu className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#architecture",
    },
    {
      title: "Verify Registry",
      icon: (
        <IconCertificate className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#verification",
    },
    {
      title: "Pricing",
      icon: (
        <IconCreditCard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#pricing",
    },
  ];
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <FloatingDock
        desktopClassName="border border-white/[0.14] bg-neutral-900/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        mobileClassName="fixed bottom-6 right-6"
        items={links}
      />
    </div>
  );
}
