import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600",
    quote:
      "Finally, a space that gets it. No fluff, just real value and great conversations. Joining was the best decision I made this year.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600",
    quote: "It feels different here. Real people, real ideas, and meaningful connections.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600",
    quote: "I didn’t expect much at first, but this community genuinely surprised me.",
  },
];

export default function UserAuthCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative hidden h-screen w-full overflow-hidden lg:block">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image */}
          <img src={slide.image} alt="" className="h-full w-full object-cover" />

          {/* Bottom caption box */}
          <div className="absolute right-0 bottom-0 left-0 h-[212px] bg-[#282828]/60 backdrop-blur-sm">
            <div className="flex h-full flex-col justify-between px-10 py-8 text-white">
              {/* Quote */}
              <p className="max-w-xl text-lg leading-relaxed">“{slide.quote}”</p>

              {/* Pagination dots */}
              <div className="flex gap-2 self-end">
                {slides.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => setCurrent(dotIndex)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      dotIndex === current ? "bg-white" : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
