import Speaker from "@/components/SpeakerComponent/SpeakerComponent";
import QuestionForm from "@/components/question-component/QuestionForm";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function EventPage() {
    return (
        <main className="min-h-screen bg-[#020817] text-white px-4 py-6 md:px-8">
            <div className="mx-auto max-w-7xl">
                <button className="mb-6 text-sm text-slate-400 hover:text-white transition">
                    <IoMdArrowRoundBack className="inline" /> Back to sessions
                </button>

                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#07152d] via-[#081126] to-[#160a2f] p-6 md:p-10 shadow-2xl">
                    <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />

                    <div className="relative z-10">
                        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-slate-400">
                            <span className="rounded-full bg-red-500 px-3 py-1 font-medium text-white">
                                Live Now
                            </span>

                            <span>S-024</span>
                            <span>Track A</span>
                            <span>Frontend</span>
                        </div>

                        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                            Building Modern SaaS with React & Tailwind
                        </h1>

                        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
                            A working tour of the patterns we use to ship multi-tenant SaaS
                            products with React 19 and Tailwind v4.
                        </p>

                        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black">
                            <video
                                className="h-[250px] w-full object-cover md:h-[500px]"
                                controls
                                autoPlay
                                muted
                            >
                                <source src="/videos/event-demo.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                            <div> 09:00 - 12:00</div>
                            <div> Main Room</div>
                            <div> Streaming on stage A</div>
                        </div>
                    </div>
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
                    <QuestionForm />
                    <Speaker />
                </section>
            </div>
        </main>
    );
}