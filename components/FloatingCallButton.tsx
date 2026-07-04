import { siteConfig } from "@/lib/site-config";
import { PhoneIcon } from "./icons";

export default function FloatingCallButton() {
  return (
    <div
      className="sm:hidden fixed bottom-0 inset-x-0 z-50 px-4 pb-4 pt-8 bg-gradient-to-t from-ink/25 to-transparent pointer-events-none"
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={siteConfig.phoneHref}
        aria-label={`חייגו עכשיו ל${siteConfig.name}: ${siteConfig.phoneDisplay}`}
        className="btn-lux ring-pulse pointer-events-auto flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-lg font-extrabold text-ink"
      >
        <PhoneIcon className="h-5 w-5" />
        חייגו עכשיו {siteConfig.phoneDisplay}
      </a>
    </div>
  );
}
