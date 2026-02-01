import { motion } from "framer-motion";
import { useState, useEffect, type ReactElement } from "react";

import TESTIMONIAL_IMAGE_1 from "@/assets/images/testimonial-img-1.jpg";
import TESTIMONIAL_IMAGE_2 from "@/assets/images/testimonial-img-2.jpg";
import TESTIMONIAL_IMAGE_3 from "@/assets/images/testimonial-img-3.jpg";

const ACTIVE_WIDTH = 341;
const SIDE_WIDTH = 227;
const GAP = 14;

// const testimonials = [
//   {
//     name: "Community Member",
//     role: "Toronto, Canada",
//     image: TESTIMONIAL_IMAGE_1,
//     text: (
//       <>
//         I’ve donated to causes before, but Coterie is the first place where I actually{" "}
//         <span className="italic">feel part of something</span>. I can see how my actions matter, who
//         I’m connected to, and how the community grows. It doesn’t feel transactional. It feels
//         human.
//       </>
//     ),
//     time: "12:15 PM - Jan 4, 2025",
//     rating: 5,
//   },
//   {
//     name: "Donor & Volunteer",
//     role: "Global Citizen",
//     image: TESTIMONIAL_IMAGE_2,
//     text: "What surprised me most is how often I come back. Not because I’m asked to donate again, but because something is always happening. A vote, a new person joining, an update that shows progress. It feels alive",
//     time: "9:30 PM - Jan 6, 2025",
//     rating: 5,
//   },
//   {
//     name: "Executive Director",
//     role: "UK Nonprofit Organization",
//     image: TESTIMONIAL_IMAGE_3,
//     text: "Before Coterie, we were running campaigns blindly. We had numbers, but no clarity. Now we actually understand what’s driving engagement and who our real champions are.",
//     time: "7:45 PM - Jan 9, 2025",
//     rating: 5,
//   },
// ];

// MVP TESTIMONIALS

const testimonials = [
  {
    name: "Campaign Manager",
    role: "Toronto, Canada",
    image: TESTIMONIAL_IMAGE_1,
    text: (
      <>
        Coterie made us feel like strategists instead of underdogs. We don’t just launch campaigns
        anymore. We build <span className="italic">momentum</span>, activate the right people, and
        learn what works.
      </>
    ),
    time: "12:15 PM - Jan 4, 2025",
    rating: 5,
  },
  {
    name: "Top Referrer",
    role: "Global Citizen",
    image: TESTIMONIAL_IMAGE_2,
    text: "I’ve shared causes before, but this is the first time I could actually see the ripple effect. Who joined because of me, how far it spread, and what changed.",
    time: "9:30 PM - Jan 6, 2025",
    rating: 5,
  },
  {
    name: "Founder",
    role: "Community-Led Initiative",
    image: TESTIMONIAL_IMAGE_3,
    text: "What we love is that fundraising is just one part of the experience. The community comes first. That trust translates naturally into support.",
    time: "7:45 PM - Jan 9, 2025",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative w-full overflow-hidden pb-10">
      <div className="relative w-full overflow-hidden">
        {/* Left edge gradient overlay */}
        <div
          className="pointer-events-none absolute top-1/2 bottom-0 left-0 z-10 -translate-y-1/2 opacity-50"
          style={{
            width: "24px",
            height: "122px",
            background: "linear-gradient(to right, #12AA5B, transparent)",
          }}
        />

        {/* Right edge gradient overlay */}
        <div
          className="pointer-events-none absolute top-1/2 right-0 bottom-0 z-10 -translate-y-1/2 opacity-50"
          style={{
            width: "24px",
            height: "122px",
            background: "linear-gradient(to left, #12AA5B, transparent)",
          }}
        />

        {/* TRACK */}
        <motion.div
          className="flex items-center"
          animate={{
            x: -((current + testimonials.length) * (SIDE_WIDTH + GAP) - SIDE_WIDTH * 0.4 - GAP),
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {extendedTestimonials.map((t, i) => {
            const isActive = i === current + testimonials.length;

            return (
              <motion.div
                key={i}
                className="shrink-0"
                animate={{
                  width: isActive ? ACTIVE_WIDTH : SIDE_WIDTH,
                  height: isActive ? 183 : 122,
                  opacity: isActive ? 1 : 0.8,
                }}
                transition={{ duration: 0.4 }}
                style={{ marginRight: GAP }}
              >
                <Card {...t} isActive={isActive} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Card({
  name,
  role,
  image,
  text,
  // time,
  // rating,
  isActive,
}: {
  name: string;
  role: string;
  image: string;
  text: string | ReactElement;
  time?: string;
  rating?: number;
  isActive?: boolean;
}) {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-lg"
      style={{ padding: isActive ? "16px" : "12px" }}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="rounded-full bg-gray-200 object-cover"
            style={{
              width: isActive ? "38px" : "22px",
              height: isActive ? "38px" : "22px",
            }}
          />
          <div>
            <p
              className="font-semibold text-[#1A1A1A]"
              style={{ fontSize: isActive ? "14px" : "10px" }}
            >
              {name}
            </p>
            <p className="text-gray-400" style={{ fontSize: isActive ? "12px" : "10px" }}>
              {role}
            </p>
          </div>
        </div>

        {/* Text */}
        <p
          className="mt-3 line-clamp-5 leading-relaxed text-gray-600"
          style={{ fontSize: isActive ? "12px" : "10px" }}
        >
          "{text}"
        </p>

        {/* Footer */}
        {/* {isActive && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-400" style={{ fontSize: isActive ? "12px" : "9px" }}>
              {time}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: rating }).map((_, i) => (
                <span
                  key={i}
                  className="text-[#026451]"
                  style={{ fontSize: isActive ? "16px" : "12px" }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'

// const ACTIVE_WIDTH = 341
// const SIDE_WIDTH = 227
// const GAP = 14

// const testimonials = [
//   {
//     name: 'Eliska Trebalska',
//     role: 'Mother',
//     image: 'https://i.pravatar.cc/100?img=47',
//     text: 'With Realitoo we have been able move to another country in a 4 weeks. Incredible!',
//     time: '8:35 PM - Jan 4, 2022',
//     rating: 5,
//   },
//   {
//     name: 'Jurek Jalio',
//     role: 'Father',
//     image: 'https://i.pravatar.cc/100?img=12',
//     text: 'First touch with Realito was great. Their team really did help our family dream living abroad.',
//     time: '8:35 PM - Jan 6, 2022',
//     rating: 5,
//   },
//   {
//     name: 'Anna Novak',
//     role: 'Designer',
//     image: 'https://i.pravatar.cc/100?img=32',
//     text: 'Professional, fast and friendly service. Highly recommended.',
//     time: '8:35 PM - Jan 9, 2022',
//     rating: 5,
//   },
// ]

// export default function TestimonialCarousel() {
//   const [current, setCurrent] = useState(1)

//   // Auto-advance every 3 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % testimonials.length)
//     }, 3000)

//     return () => clearInterval(timer)
//   }, [])

//   // Create extended array and rendering 3 copies so there's always items on both sides
//   const extendedTestimonials = [
//     ...testimonials,
//     ...testimonials,
//     ...testimonials,
//   ]

//   return (
//     <section className='w-full overflow-hidden'>
//       <div className='relative w-full overflow-hidden'>
//         {/* TRACK */}
//         <motion.div
//           className='flex items-center'
//           animate={{
//             x: -(
//               (current + testimonials.length) * (SIDE_WIDTH + GAP) -
//               SIDE_WIDTH * 0.4 -
//               GAP
//             ),
//           }}
//           transition={{ type: 'spring', stiffness: 120, damping: 20 }}
//         >
//           {extendedTestimonials.map((t, i) => {
//             // The active card is in the middle set (offset by testimonials.length)
//             const isActive = i === current + testimonials.length

//             return (
//               <motion.div
//                 key={i}
//                 className='shrink-0'
//                 animate={{
//                   width: isActive ? ACTIVE_WIDTH : SIDE_WIDTH,
//                   height: isActive ? 183 : 122,
//                   opacity: isActive ? 1 : 0.4,
//                 }}
//                 transition={{ duration: 0.4 }}
//                 style={{ marginRight: GAP }}
//               >
//                 <Card {...t} isActive={isActive} />
//               </motion.div>
//             )
//           })}
//         </motion.div>
//       </div>

//       {/* DOTS */}
//       <div className='mt-5 flex justify-center gap-2'>
//         {testimonials.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrent(i)}
//             className={`h-2 w-2 rounded-full transition-colors ${
//               i === current ? 'bg-white' : 'bg-white'
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }

// function Card({
//   name,
//   role,
//   image,
//   text,
//   time,
//   rating,
//   isActive,
// }: {
//   name: string
//   role: string
//   image: string
//   text: string
//   time: string
//   rating: number
//   isActive?: boolean
// }) {
//   return (
//     <div
//       className='h-full w-full rounded-2xl bg-white shadow-lg flex flex-col justify-between relative overflow-hidden'
//       style={{ padding: isActive ? '24px' : '16px' }}
//     >
//       {/* Edge gradient for inactive cards */}
//       {!isActive && (
//         <div className='absolute inset-0 bg-linear-to-r from-[#12AA5B]/60 via-transparent to-gray-200/60 pointer-events-none' />
//       )}

//       <div className='relative z-10'>
//         {/* Header */}
//         <div className='flex items-center gap-3'>
//           <img
//             src={image}
//             alt={name}
//             className='rounded-full object-cover'
//             style={{
//               width: isActive ? '48px' : '32px',
//               height: isActive ? '48px' : '32px',
//             }}
//           />
//           <div>
//             <p
//               className='font-semibold text-[#1A1A1A]'
//               style={{ fontSize: isActive ? '16px' : '12px' }}
//             >
//               {name}
//             </p>
//             <p
//               className='text-gray-400'
//               style={{ fontSize: isActive ? '14px' : '10px' }}
//             >
//               {role}
//             </p>
//           </div>
//         </div>

//         {/* Text */}
//         <p
//           className='mt-3 text-gray-600 leading-relaxed'
//           style={{ fontSize: isActive ? '14px' : '11px' }}
//         >
//           "{text}"
//         </p>

//         {/* Footer */}
//         {isActive && (
//           <div className='mt-4 flex items-center justify-between'>
//             <span
//               className='text-gray-400'
//               style={{ fontSize: isActive ? '12px' : '9px' }}
//             >
//               {time}
//             </span>
//             <div className='flex gap-1'>
//               {Array.from({ length: rating }).map((_, i) => (
//                 <span
//                   key={i}
//                   className='text-[#18B35C]'
//                   style={{ fontSize: isActive ? '16px' : '12px' }}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
