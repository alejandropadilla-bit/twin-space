'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [beforeAfterSlide, setBeforeAfterSlide] = useState(50);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist submission
    alert(`Thanks ${name}! We'll notify you at ${email}`);
    setName('');
    setEmail('');
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#6A0000] text-[#FAF4EC] min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border-2 border-[#FAF4EC] rounded-lg rotate-12"></div>
          <div className="absolute bottom-32 right-20 w-48 h-48 border-2 border-[#FAF4EC] rounded-lg -rotate-6"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-[#FAF4EC] rounded-lg rotate-45"></div>
        </div>

        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <div className="flex justify-center mb-12">
            <div className="w-56 h-56 md:w-64 md:h-64 relative">
              <Image
                src="/logo.png"
                alt="Twin Space Logo"
                fill
                className="object-fill bg-[#6A0000]"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
            Design your dorm room<br />in minutes.
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-[#FAF4EC]/90 max-w-3xl mx-auto font-light">
            Drag, drop, and visualize layouts before you buy.
          </p>

          <p className="text-lg md:text-xl mb-12 text-[#FAF4EC]/80 font-light">
            Made for Twin XL life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[#FAF4EC] text-[#6A0000] hover:bg-[#FAF4EC]/90 text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Try the Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-[#FAF4EC] text-[#FAF4EC] hover:bg-[#FAF4EC] hover:text-[#6A0000] text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Join Waitlist
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#FAF4EC]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-0 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <div className="w-16 h-16 bg-[#6A0000] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#FAF4EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center text-[#6A0000]">Smart Fit</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Snap-to-grid & auto-spacing for tight dorms.
              </p>
            </Card>

            <Card className="p-8 border-0 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <div className="w-16 h-16 bg-[#6A0000] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#FAF4EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center text-[#6A0000]">Real Scale</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Furniture sized to dorm-standard dimensions.
              </p>
            </Card>

            <Card className="p-8 border-0 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <div className="w-16 h-16 bg-[#6A0000] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#FAF4EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center text-[#6A0000]">Share & Print</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Send to roommates or export for move-in planning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#6A0000] text-[#FAF4EC] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Live Demo (Read-Only)
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#6A0000] mb-4">
                See it in action
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="aspect-video bg-gray-100 rounded-2xl relative overflow-hidden border-2 border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-8 grid-rows-6 gap-2 w-full h-full p-8">
                    {/* Grid visualization */}
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-gray-200 rounded"></div>
                    ))}

                    {/* Bed */}
                    <div className="absolute top-12 left-12 w-32 h-48 bg-[#6A0000] rounded-lg shadow-lg flex items-center justify-center text-[#FAF4EC] font-semibold animate-pulse">
                      Bed
                    </div>

                    {/* Desk */}
                    <div className="absolute top-12 right-12 w-40 h-24 bg-[#6A0000] rounded-lg shadow-lg flex items-center justify-center text-[#FAF4EC] font-semibold animate-pulse" style={{ animationDelay: '0.5s' }}>
                      Desk
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#6A0000] mb-16">
            How It Works
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#6A0000] rounded-full flex items-center justify-center text-[#FAF4EC] text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#6A0000]">Choose your room</h3>
              <p className="text-gray-600 leading-relaxed">
                Select your dorm dimensions from our database of college floor plans.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#6A0000] rounded-full flex items-center justify-center text-[#FAF4EC] text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#6A0000]">Drag & drop furniture</h3>
              <p className="text-gray-600 leading-relaxed">
                Add beds, desks, and storage with real-world Twin XL dimensions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#6A0000] rounded-full flex items-center justify-center text-[#FAF4EC] text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#6A0000]">Share with your roommate</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaborate in real-time or export your layout for move-in day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#6A0000] mb-16">
            Transform Your Space
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-full h-64 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-gray-400 text-xl font-semibold">Empty Dorm</span>
                      </div>
                      <p className="text-gray-500 font-semibold">Before</p>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-square bg-gradient-to-br from-[#FAF4EC] to-white overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center w-full">
                      <div className="w-full h-64 bg-white rounded-2xl shadow-lg p-4 mb-4 relative">
                        <div className="absolute top-4 left-4 w-24 h-32 bg-[#6A0000] rounded-lg"></div>
                        <div className="absolute top-4 right-4 w-28 h-16 bg-[#6A0000] rounded-lg"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#6A0000] rounded-lg"></div>
                        <div className="absolute bottom-4 right-4 w-20 h-20 bg-[#6A0000] rounded-lg"></div>
                      </div>
                      <p className="text-[#6A0000] font-semibold">After</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-24 bg-[#6A0000] text-[#FAF4EC]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the waitlist for early access
            </h2>
            <p className="text-xl mb-12 text-[#FAF4EC]/90">
              Be the first to design your perfect dorm room.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/10 border-2 border-[#FAF4EC]/30 text-[#FAF4EC] placeholder:text-[#FAF4EC]/60 h-14 text-lg rounded-xl focus:border-[#FAF4EC] focus:ring-[#FAF4EC]"
              />
              <Input
                type="email"
                placeholder="Your .edu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern=".*\.edu$"
                className="bg-white/10 border-2 border-[#FAF4EC]/30 text-[#FAF4EC] placeholder:text-[#FAF4EC]/60 h-14 text-lg rounded-xl focus:border-[#FAF4EC] focus:ring-[#FAF4EC]"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#FAF4EC] text-[#6A0000] hover:bg-[#FAF4EC]/90 text-lg py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Notify Me
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-[#6A0000] transition-colors">Privacy</a>
            <span className="text-gray-300">·</span>
            <a href="#" className="hover:text-[#6A0000] transition-colors">Terms</a>
            <span className="text-gray-300">·</span>
            <a href="#" className="hover:text-[#6A0000] transition-colors">Contact</a>
            <span className="text-gray-300">·</span>
            <span>© 2025 Twin Space</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
