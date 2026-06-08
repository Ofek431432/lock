import { siteConfig } from "@/lib/site-config";
import { PhoneIcon } from "./icons";

export default function StickyContactBar() {
  return (
    <a
      href={siteConfig.phoneHref}
      aria-label={`חייגו עכשיו ל${siteConfig.name}: ${siteConfig.phoneDisplay}`}
      className="fixed bottom-5 start-5 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-xl shadow-black/30 hover:bg-gold-dark hover:scale-110 active:scale-95 transition-all"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <PhoneIcon className="h-7 w-7" />
    </a>
  );
}
