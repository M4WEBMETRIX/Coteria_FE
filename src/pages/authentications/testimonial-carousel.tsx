import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const ACTIVE_WIDTH = 341
const SIDE_WIDTH = 227
const GAP = 14
const CONTAINER_WIDTH = ACTIVE_WIDTH + 2 * (SIDE_WIDTH * 0.4) + 2 * GAP

const testimonials = [
  {
    name: 'Eliska Trebalska',
    role: 'Mother',
    image: 'https://i.pravatar.cc/100?img=47',
    text: 'With Realitoo we have been able move to another country in a 4 weeks. Incredible!',
    time: '8:35 PM - Jan 4, 2022',
    rating: 5,
  },
  {
    name: 'Jurek Jalio',
    role: 'Father',
    image: 'https://i.pravatar.cc/100?img=12',
    text: 'First touch with Realito was great. Their team really did help our family dream living abroad.',
    time: '8:35 PM - Jan 6, 2022',
    rating: 5,
  },
  {
    name: 'Anna Novak',
    role: 'Designer',
    image: 'https://i.pravatar.cc/100?img=32',
    text: 'Professional, fast and friendly service. Highly recommended.',
    time: '8:35 PM - Jan 9, 2022',
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(1)

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  // Create extended array and rendering 3 copies so there's always items on both sides
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ]

  return (
    <section className='w-full overflow-hidden'>
      <div
        className='relative mx-auto overflow-hidden'
        style={{ width: CONTAINER_WIDTH }}
      >
        {/* TRACK */}
        <motion.div
          className='flex items-center'
          animate={{
            x: -(
              (current + testimonials.length) * (SIDE_WIDTH + GAP) -
              SIDE_WIDTH * 0.4 -
              GAP
            ),
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          {extendedTestimonials.map((t, i) => {
            // The active card is in the middle set (offset by testimonials.length)
            const isActive = i === current + testimonials.length

            return (
              <motion.div
                key={i}
                className='shrink-0'
                animate={{
                  width: isActive ? ACTIVE_WIDTH : SIDE_WIDTH,
                  height: isActive ? 183 : 122,
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.4 }}
                style={{ marginRight: GAP }}
              >
                <Card {...t} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* DOTS */}
      <div className='mt-5 flex justify-center gap-2'>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === current ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

function Card({
  name,
  role,
  image,
  text,
  time,
  rating,
}: {
  name: string
  role: string
  image: string
  text: string
  time: string
  rating: number
}) {
  return (
    <div className='h-full w-full rounded-2xl bg-white p-6 shadow-lg flex flex-col justify-between'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <img
          src={image}
          alt={name}
          className='h-12 w-12 rounded-full object-cover'
        />
        <div>
          <p className='font-semibold text-[#1A1A1A]'>{name}</p>
          <p className='text-sm text-gray-400'>{role}</p>
        </div>
      </div>

      {/* Text */}
      <p className='mt-3 text-sm text-gray-600 leading-relaxed'>"{text}"</p>

      {/* Footer */}
      <div className='mt-4 flex items-center justify-between'>
        <span className='text-xs text-gray-400'>{time}</span>
        <div className='flex gap-1'>
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className='text-[#18B35C]'>
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
