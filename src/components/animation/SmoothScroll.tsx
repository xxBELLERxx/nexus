import { useEffect, useRef, type PropsWithChildren } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'

import { gsap, ScrollTrigger } from '../../lib/gsap'

function SmoothScroll({ children }: PropsWithChildren) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const lenis = lenisRef.current?.lenis

    if (!lenis) {
      return
    }

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    const updateScrollTrigger = () => {
      ScrollTrigger.update()
    }

    lenis.on('scroll', updateScrollTrigger)
    gsap.ticker.add(updateLenis)

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', updateScrollTrigger)
      gsap.ticker.remove(updateLenis)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.08,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll