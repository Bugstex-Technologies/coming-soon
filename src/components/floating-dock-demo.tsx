import { FloatingDock } from "./ui/floating-dock";
import {
  IconCertificate,
  IconCpu,
  IconCreditCard,
  IconHome,
  IconScale,
  IconShieldCheck,
  IconTerminal2,
  IconUsers,
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
      title: "Compliance",
      icon: (
        <IconScale className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#regulatory-crosswalk",
    },
    {
      title: "Sandbox",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#sandbox",
    },
    {
      title: "Architecture",
      icon: (
        <IconCpu className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#architecture",
    },
    {
      title: "Registry",
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
    {
      title: "About Bugstex",
      icon: (
        <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
  ];
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50 pointer-events-auto pb-[env(safe-area-inset-bottom,0px)]">
      <FloatingDock
        desktopClassName="border border-white/[0.14] bg-neutral-900/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        mobileClassName=""
        items={links}
      />
    </div>
  );
}
