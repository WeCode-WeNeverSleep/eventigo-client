import { NavbarLanding } from "@/components/navbar/navbar-landing";
import { Footer } from "@/components/UI/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUsers, faVideo, faComments, faGlobe, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarLanding />

      <main className="flex-1 w-full xl:px-[150px] lg:px-[150px] px-4 sm:px-6 py-12 md:py-20">
        
        <div className="mb-16 md:mb-24 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold font-title text-text-main leading-tight mb-6">
            Connecting builders,<br />
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              one event at a time.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl">
            EventiGO is the premier platform designed specifically for the tech community. We curate, host, and manage world-class conferences, technical workshops, and developer meetups globally.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold font-title tracking-wide text-text-main mb-10 border-b border-border pb-4">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl border border-border bg-surface/30 hover:bg-surface transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-main">Event Curation</h3>
              <p className="text-text-muted leading-relaxed">
                Handpicked conferences and exclusive workshops without the fluff. We focus on high-signal content for engineers and designers.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border bg-surface/30 hover:bg-surface transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faVideo} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-main">Live Streaming</h3>
              <p className="text-text-muted leading-relaxed">
                High-definition, low-latency streams for global access. Never miss a keynote, whether you are in Paris, Tokyo, or San Francisco.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border bg-surface/30 hover:bg-surface transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faComments} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-main">Real-time Q&A</h3>
              <p className="text-text-muted leading-relaxed">
                Interact with speakers in real-time. Our integrated Q&A system bridges the gap between the stage and the audience.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border bg-surface/30 hover:bg-surface transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-main">Networking Hubs</h3>
              <p className="text-text-muted leading-relaxed">
                Dedicated spaces for community building. Find co-founders, hire top talent, or just talk tech over a virtual coffee.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border bg-surface/30 hover:bg-surface transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-main">Global Reach</h3>
              <p className="text-text-muted leading-relaxed">
                From local meetups to international summits, our infrastructure scales globally to deliver seamless experiences anywhere.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border bg-surface/30 hover:bg-surface transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faShieldHalved} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-main">Secure Ticketing</h3>
              <p className="text-text-muted leading-relaxed">
                Frictionless registration and fast, secure access control. We handle the logistics so you can focus on the learning.
              </p>
            </div>

          </div>
        </div>

        <div className="p-12 md:p-16 rounded-4xl border border-border bg-surface relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          <h2 className="text-3xl font-bold font-title text-text-main mb-4 z-10">
            Ready to join the next event?
          </h2>
          <p className="text-text-muted mb-8 max-w-xl z-10">
            Explore our curated calendar and secure your spot before tickets run out. 
          </p>
          <Link
            href="/events"
            className="z-10 bg-primary text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Browse Calendar
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
