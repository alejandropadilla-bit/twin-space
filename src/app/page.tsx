// src/app/page.tsx
import Image from "next/image";
import InteractiveDemo from "@/components/ui/InteractiveDemo";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#2e2e2e]">
      {/* HERO / TOP NAV */}
      <header className="w-full border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Twin Space" width={40} height={40} className="rounded-full" />
            <span className="text-sm font-semibold tracking-tight text-[#5c0a0a]">Twin Space</span>
          </div>
          <nav className="hidden gap-5 text-sm md:flex text-[#5c0a0a]">
            <a href="#how" className="hover:underline">How it works</a>
            <a href="#features" className="hover:underline">Features</a>
            <a href="#target" className="hover:underline">Target Market</a>
            <a href="#investor" className="hover:underline">Investor</a>
            <a href="#ai" className="hover:underline">AI Reflection</a>
          </nav>
          <a href="#waitlist" className="rounded-md bg-[#5c0a0a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7a1313]">
            Join waitlist
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#f9eaea] px-4 py-1 text-xs font-semibold text-[#5c0a0a]">
          Digital Dorm Designer • Made for Twin XL life
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[#3a0606]">
          Design your dorm room
          <br /> in minutes.
        </h1>
        <p className="max-w-2xl text-base text-[#555] md:text-lg">
          Drag, drop, and visualize layouts before you buy. Built for roommates, tight spaces, and move-in day.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {/* Smooth scroll via CSS (no onClick) */}
          <a href="#interactive-demo" className="rounded-md bg-[#5c0a0a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7a1313]">
            Try the demo
          </a>
          <a href="#waitlist" className="rounded-md border border-[#5c0a0a] px-5 py-2.5 text-sm font-medium text-[#5c0a0a] hover:bg-[#f9eaea]">
            Join waitlist
          </a>
        </div>
      </section>

      {/* SEE IT IN ACTION — PROTOTYPE VIDEO */}
      <section id="demo" className="mx-auto max-w-4xl px-4 pb-14">
        <h2 className="text-xl font-semibold tracking-tight mb-3 text-[#3a0606]">See it in action</h2>
        <p className="text-sm text-[#666] mb-5">
          Watch how Twin Space lets students visualize their dorm, arrange furniture, and personalize their setup before move-in.
        </p>
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-4 shadow-sm">
          <div className="aspect-video w-full overflow-hidden rounded-md border border-[#eaeaea]">
            <iframe
              className="h-full w-full"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/mHC-BsCV8vA"
              title="Twin Space Prototype Demo"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-xs text-center text-[#666]">
            <em>Prototype demo built for the 4impact Challenge — showcasing Twin Space’s drag-and-drop dorm designer.</em>
          </p>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section id="interactive-demo" className="mx-auto max-w-5xl px-4 py-14 border-t border-[#eee]">
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-[#3a0606]">Try the interactive demo</h2>
        <InteractiveDemo />
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-[#fafafa] py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold tracking-tight mb-6 text-[#3a0606]">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-5 shadow-sm border border-[#eee]">
              <p className="text-4xl font-bold text-[#5c0a0a]">1</p>
              <h3 className="mt-3 text-base font-semibold">Choose your room</h3>
              <p className="mt-2 text-sm text-[#666]">Select your dorm from our database of real college floor plans or enter dimensions manually.</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm border border-[#eee]">
              <p className="text-4xl font-bold text-[#5c0a0a]">2</p>
              <h3 className="mt-3 text-base font-semibold">Drag &amp; drop furniture</h3>
              <p className="mt-2 text-sm text-[#666]">Everything is scaled to dorm-standard Twin XL and desk sizes, so you know it fits.</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm border border-[#eee]">
              <p className="text-4xl font-bold text-[#5c0a0a]">3</p>
              <h3 className="mt-3 text-base font-semibold">Share with your roommate</h3>
              <p className="mt-2 text-sm text-[#666]">Collaborate in real time or export your layout for move-in planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight mb-2 text-[#3a0606]">Features</h2>
        <p className="text-[#666] mb-8">These features directly support the value proposition of reducing move-in stress and wasted spending.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-5 shadow-sm border border-[#eee]">
            <h3 className="text-sm font-semibold">Smart Fit</h3>
            <p className="mt-2 text-xs text-[#666]">Snap-to-grid &amp; auto-spacing for tight dorms.</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm border border-[#eee]">
            <h3 className="text-sm font-semibold">Real Scale</h3>
            <p className="mt-2 text-xs text-[#666]">Furniture sized to dorm-standard dimensions.</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm border border-[#eee]">
            <h3 className="text-sm font-semibold">AI Layouts</h3>
            <p className="mt-2 text-xs text-[#666]">AI suggests layouts like “cozy under $200” or “desk by the window.”</p>
            <p className="mt-2 text-[10px] text-[#666]">4IR Tech: Artificial Intelligence</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm border border-[#eee]">
            <h3 className="text-sm font-semibold">Share &amp; Print</h3>
            <p className="mt-2 text-xs text-[#666]">Send to roommates or export for move-in planning.</p>
          </div>
        </div>
      </section>

      {/* COMMERCIAL (under Features) */}
      <section id="commercial" className="mx-auto max-w-5xl px-4 pb-14">
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-[#3a0606]">Watch our commercial</h2>
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-4 shadow-sm">
          <div className="aspect-video w-full overflow-hidden rounded-md border border-[#eaeaea]">
            <iframe
              className="h-full w-full"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/mASEhNE7NK0"
              title="Twin Space Commercial"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2 text-[#3a0606]">Join the waitlist for early access</h2>
        <p className="text-[#666] mb-4">Be the first to design your perfect dorm room.</p>
        <form className="mx-auto flex max-w-md gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 rounded-md border border-[#d9d9d9] bg-white px-3 py-2 text-sm outline-none focus:border-[#5c0a0a]"
          />
          <button
            type="submit"
            className="rounded-md bg-[#5c0a0a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7a1313]"
          >
            Notify me
          </button>
        </form>
      </section>

      <footer className="border-t border-[#eee] py-5 text-center text-xs text-[#777] bg-white">
        © 2025 Twin Space · Dorm-first design platform · AI + XR
      </footer>
    </main>
  );
}
