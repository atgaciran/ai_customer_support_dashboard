import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-brand-dark flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Atmosferik arka plan ışıması */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand-light/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center space-y-10 text-center px-6">
        
        {/* Logo Alanı */}
        <div className="relative w-56 h-20">
          <Image
            src="/images/logo_light.png"
            alt="Attimo Support Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Vurucu Metin (Slogan) */}
        <div className="space-y-4 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-light">
            Redefine Customer Support Experience
          </h1>
          <p className="text-brand-light/70 text-lg">
            Generate professional responses in seconds with our AI-powered assistant and elevate your operational efficiency.
          </p>
        </div>

        {/* Yönlendirme Butonu */}
        <Link
          href="/login"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-brand-dark bg-brand-light rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(232,232,232,0.1)] hover:shadow-[0_0_50px_rgba(232,232,232,0.25)]"
        >
          Access Dashboard
          <svg
            className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

      </div>
    </div>
  );
}