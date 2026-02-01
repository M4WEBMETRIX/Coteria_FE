import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600",
    quote:
      "A total game-changer. I came for the networking but stayed for the people. It’s rare to find a community that feels this supportive and high-energy.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600",
    quote:
      "It feels different here. A total game-changer. I came for the networking but stayed for the people. It’s rare to find a community that feels this supportive and high-energy.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600",
    quote:
      "I didn’t expect a total game-changer. I came for the networking but stayed for the people. It’s rare to find a community that feels this supportive and high-energy.",
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
          <div className="absolute right-0 bottom-0 left-0 h-[182px] bg-[#282828]/60 backdrop-blur-xs">
            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2 pt-4.5">
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
            <div className="flex h-full flex-col justify-between px-10 py-8 text-white">
              {/* Quote */}
              <p className="w-full text-lg leading-relaxed">“{slide.quote}”</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
