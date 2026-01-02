import React, { useState, useEffect } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1627012898015-aa708e5c53ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Art of the Latkan",
    subtitle: "Exquisite Hand-Threaded Mastery",
  },
  {
    image:
      "https://images.unsplash.com/photo-1525169087805-031a4da0623c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Heritage Embroidery",
    subtitle: "Zardosi & Tilla Work Traditions",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517472292914-9570a594783b?q=80&w=1133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Luxury Silk Textures",
    subtitle: "Defining Elegance in Every Thread",
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[750px] overflow-hidden border-b border-slate-50">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={slide.title}
          />
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <span className="text-white text-[11px] md:text-sm uppercase tracking-[0.6em] font-bold mb-6 block animate-in fade-in slide-in-from-bottom-6 duration-700">
                {slide.subtitle}
              </span>
              <h2 className="text-5xl md:text-9xl text-white font-bold serif italic animate-in fade-in slide-in-from-bottom-10 duration-1000 leading-[1.1]">
                {slide.title}
              </h2>
              <div className="flex justify-center mt-12 animate-in fade-in duration-1000 delay-500">
                <button className="px-14 py-5 bg-white text-slate-900 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] hover:bg-maroon hover:text-white transition-all shadow-2xl">
                  Explore The Atelier
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Decorative Royal Progress Bar */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[1px] transition-all duration-700 ${
              i === current ? "bg-[#b8860b] w-20" : "bg-white/20 w-8"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
