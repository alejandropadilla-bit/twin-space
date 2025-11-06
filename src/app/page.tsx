// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO / TOP NAV */}
      <header className="w-full border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Twin Space"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-semibold tracking-tight">
              Twin Space
            </span>
          </div>
          <nav className="hidden gap-5 text-sm md:flex">
            <a href="#how" className="hover:text-primary">
              How it works
            </a>
            <a href="#features" className="hover:text-primary">
              Features
            </a>
            <a href="#target" className="hover:text-primary">
              Target Market
            </a>
            <a href="#investor" className="hover:text-primary">
              Investor
            </a>
            <a href="#ai" className="hover:text-primary">
              AI Reflection
            </a>
          </nav>
          <a
            href="#waitlist"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Join waitlist
          </a>
        </div>
      </header>

      {/* HERO SECTION like your vercel site */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
          Digital Dorm Designer • Made for Twin XL life
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Design your dorm room
          <br />
          in minutes.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Drag, drop, and visualize layouts before you buy. Built for roommates,
          tight spaces, and move-in day.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#demo"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Try the demo
          </a>
          <a
            href="#waitlist"
            className="rounded-md border px-5 py-2.5 text-sm font-medium"
          >
            Join waitlist
          </a>
        </div>
      </section>

      {/* SIMPLE DEMO / READ-ONLY BLOCK */}
      <section
        id="demo"
        className="mx-auto max-w-4xl px-4 pb-14"
      >
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          See it in action
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Choose a dorm layout, drag furniture, and share with your roommate.
        </p>
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-md bg-muted px-3 py-1">Bed</span>
            <span className="rounded-md bg-muted px-3 py-1">Desk</span>
            <span className="rounded-md bg-muted px-3 py-1">Dresser</span>
            <span className="rounded-md bg-muted px-3 py-1">Mini fridge</span>
          </div>
          <div className="rounded-lg border bg-background p-4 text-sm text-muted-foreground">
            This is a placeholder for your Phase 2 prototype — in class, you can
            show a Figma flow or quick video that demonstrates drag-and-drop.
          </div>
        </div>
      </section>

      {/* HOW IT WORKS like your live site */}
      <section
        id="how"
        className="bg-muted/40 py-14"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            How it works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-card p-5 shadow-sm">
              <p className="text-4xl font-bold text-primary">1</p>
              <h3 className="mt-3 text-base font-semibold">Choose your room</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select your dorm from our database of real college floor plans
                or enter dimensions manually.
              </p>
            </div>
            <div className="rounded-lg bg-card p-5 shadow-sm">
              <p className="text-4xl font-bold text-primary">2</p>
              <h3 className="mt-3 text-base font-semibold">
                Drag &amp; drop furniture
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Everything is scaled to dorm-standard Twin XL and desk sizes,
                so you know it fits.
              </p>
            </div>
            <div className="rounded-lg bg-card p-5 shadow-sm">
              <p className="text-4xl font-bold text-primary">3</p>
              <h3 className="mt-3 text-base font-semibold">
                Share with your roommate
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Collaborate in real time or export your layout for move-in
                planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — rubric wants this */}
      <section id="features" className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Features</h2>
        <p className="text-muted-foreground mb-8">
          These features directly support the value proposition of reducing
          move-in stress and wasted spending.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Smart Fit</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Snap-to-grid &amp; auto-spacing for tight dorms.
            </p>
          </div>
          <div className="rounded-lg bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Real Scale</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Furniture sized to dorm-standard dimensions.
            </p>
          </div>
          <div className="rounded-lg bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold">AI Layouts</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              AI suggests layouts like “cozy under $200” or “desk by the
              window.”
            </p>
            <p className="mt-2 text-[10px] text-muted-foreground">
              4IR Tech: Artificial Intelligence
            </p>
          </div>
          <div className="rounded-lg bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Share &amp; Print</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Send to roommates or export for move-in planning.
            </p>
          </div>
        </div>
      </section>

      {/* TARGET MARKET — rubric wants this */}
      <section id="target" className="bg-muted/30 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Target Market
          </h2>
          <p className="text-muted-foreground mb-6">
            We serve U.S. college students — especially first-year dorm
            residents — who spend $800–$1,200 on move-in and want their space to
            match their personality.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-card p-5 shadow-sm">
              <h3 className="text-sm font-semibold">Primary Customer</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>• Incoming freshmen (17–19)</li>
                <li>• Highly active on TikTok / IG / Pinterest</li>
                <li>• Care about aesthetic + function</li>
                <li>• Want to know “what fits” before buying</li>
              </ul>
            </div>
            <div className="rounded-lg bg-card p-5 shadow-sm">
              <h3 className="text-sm font-semibold">
                Why it solves their problem
              </h3>
              <p className="mt-3 text-xs text-muted-foreground">
                Move-in is stressful, unclear, and expensive. Designing first
                and buying second removes uncertainty and reduces wasted spend.
              </p>
              <p className="mt-3 text-[10px] text-muted-foreground">
                (Add primary research from your survey here.)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTOR MATERIALS */}
<section id="investor" className="mx-auto max-w-5xl px-4 py-14">
  <h2 className="text-2xl font-bold tracking-tight mb-3">Investor Materials</h2>
  <p className="text-muted-foreground mb-6">
    Explore our final 4impact deliverables — the investor pitch, executive summary, and working prototype demo.
  </p>

  <div className="grid gap-6 md:grid-cols-3">
    {/* Pitch Deck */}
    <div className="rounded-lg bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold">Pitch Deck</h3>
      <p className="mt-2 text-xs text-muted-foreground">
        7-minute investor presentation highlighting the problem, solution, market, and business model.
      </p>
      <a
        href="https://www.canva.com/design/DAG3xAfGuog/73-dHlY35dsZeSG-QabZYg/view?utm_content=DAG3xAfGuog&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=haf31ad074e"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-[11px] font-medium text-primary underline"
      >
        🔗 View Pitch Deck on Canva →
      </a>
    </div>

    {/* Executive Summary */}
    <div className="rounded-lg bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold">Executive Summary</h3>
      <p className="mt-2 text-xs text-muted-foreground">
        One-page overview of the problem, solution, target market, and 4IR integration.
      </p>
      <a
        href="/Bussiness%20Idea%20Pitch.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-[11px] font-medium text-primary underline"
      >
        📄 Open Executive Summary (PDF) →
      </a>
    </div>

    {/* Prototype */}
    <div className="rounded-lg bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold">Prototype Demo</h3>
      <p className="mt-2 text-xs text-muted-foreground">
        A walkthrough of our digital twin dorm designer prototype — showing how students can scan, design, and shop before move-in.
      </p>
      <a
        href="https://youtu.be/mHC-BsCV8vA"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-[11px] font-medium text-primary underline"
      >
        ▶️ Watch Prototype Demo on YouTube →
      </a>
    </div>
  </div>

  {/* Embedded Previews */}
  <div className="mt-10 space-y-10">
    {/* Executive Summary Preview */}
    <div className="rounded-lg border bg-card p-4">
      <h4 className="text-sm font-semibold mb-2">Executive Summary Preview</h4>
      <iframe
        src="/Bussiness%20Idea%20Pitch.pdf"
        className="h-96 w-full rounded-md border"
      />
    </div>

    {/* Embedded Prototype Video */}
    <div className="rounded-lg border bg-card p-4">
      <h4 className="text-sm font-semibold mb-2">Prototype Video</h4>
      <div className="aspect-video w-full rounded-md overflow-hidden border">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/mHC-BsCV8vA"
          title="Twin Space Prototype"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        ></iframe>
      </div>
    </div>
  </div>
</section>

      {/* AI REFLECTION — rubric wants this */}
      <section id="ai" className="bg-muted/40 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Learning &amp; Reflection on AI
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Generative AI helped us draft sections quickly, but human editing
            made it relevant to college students and our specific business idea.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">
                Tools used:
              </span>{" "}
              ChatGPT (content), image generation for dorm visuals, Next.js AI
              layout suggestions.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Strengths:
              </span>{" "}
              fast structure, consistent voice, helped match the 4impact rubric.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Limitations:
              </span>{" "}
              AI didn&apos;t know our exact dorm floor plans, so we added those
              manually.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Human input:
              </span>{" "}
              we customized the problem statement, target market, and investor
              content to use our own primary and secondary research.
            </li>
          </ul>
        </div>
      </section>

      {/* WAITLIST / FOOTER */}
      <section id="waitlist" className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Join the waitlist for early access
        </h2>
        <p className="text-muted-foreground mb-4">
          Be the first to design your perfect dorm room.
        </p>
        <form className="mx-auto flex max-w-md gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 rounded-md border px-3 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Notify me
          </button>
        </form>
      </section>

      <footer className="border-t py-5 text-center text-xs text-muted-foreground">
        © 2025 Twin Space · Dorm-first design platform · AI + XR
      </footer>
    </main>
  );
}