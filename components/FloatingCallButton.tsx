import { siteConfig } from "@/lib/site-config";
import { PhoneIcon, WhatsappIcon } from "./icons";

export default function FloatingCallButton() {
  return (
    <>
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`שלחו הודעת ווטסאפ ל${siteConfig.name}`}
        className="fixed bottom-[6.5rem] right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:scale-110 active:scale-95 transition-all"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <WhatsappIcon className="h-6 w-6" />
      </a>
      <a
        href={siteConfig.phoneHref}
        aria-label={`חייגו עכשיו ל${siteConfig.name}: ${siteConfig.phoneDisplay}`}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-2 rounded-full bg-gold px-10 sm:px-8 py-4 text-lg font-bold text-ink shadow-xl shadow-gold/40 hover:bg-gold-dark hover:scale-[1.04] transition-all w-[90vw] sm:w-auto justify-center"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <PhoneIcon className="h-5 w-5" />
        חייגו עכשיו {siteConfig.phoneDisplay}
      </a>
    </>
  );
}
