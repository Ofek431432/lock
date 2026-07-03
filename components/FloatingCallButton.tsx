import { siteConfig } from "@/lib/site-config";
import { PhoneIcon } from "./icons";

export default function FloatingCallButton() {
  return (
    <a
      href={siteConfig.phoneHref}
      aria-label={`חייגו עכשיו ל${siteConfig.name}: ${siteConfig.phoneDisplay}`}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-2 rounded-full bg-gold px-10 sm:px-8 py-4 text-lg font-bold text-ink shadow-xl shadow-gold/40 hover:bg-gold-dark hover:scale-[1.04] transition-all w-[90vw] sm:w-auto justify-center"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <PhoneIcon className="h-5 w-5" />
      חייגו עכשיו {siteConfig.phoneDisplay}
    </a>
  );
}
