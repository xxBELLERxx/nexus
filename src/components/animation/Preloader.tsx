import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Preloader.css'

function Preloader() {
  const [visible, setVisible] = useState(true)

  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reduceMotion) {
        setVisible(false)
        return
      }

      const counter = {
        value: 0,
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          setVisible(false)
        },
      })

      timeline.to(counter, {
        value: 100,

        duration: 1.35,

        ease: 'power2.inOut',

        onUpdate: () => {
          const element =
            ref.current?.querySelector(
              '.preloader__value',
            )

          if (element) {
            element.textContent = `${Math.round(
              counter.value,
            )}%`
          }
        },
      })

      timeline
        .to(
          '.preloader__line-fill',
          {
            scaleX: 1,

            duration: 1.2,

            ease: 'power3.inOut',
          },
          0,
        )
        .to(
          '.preloader__content',
          {
            autoAlpha: 0,

            y: -15,

            duration: 0.35,
          },
          '-=0.2',
        )
        .to(
          ref.current,
          {
            yPercent: -100,

            duration: 0.85,

            ease: 'power4.inOut',
          },
          '-=0.05',
        )
    },
    {
      scope: ref,
    },
  )

  if (!visible) return null

  return (
    <div
      ref={ref}
      className="preloader"
    >
      <div className="preloader__content">
        <div className="preloader__top">
          <span>
            NEXUS
          </span>

          <span>
            SYSTEM INITIALIZATION
          </span>
        </div>

        <div className="preloader__center">
          <span className="preloader__name">
            NEXUS
          </span>

          <span className="preloader__value">
            0%
          </span>
        </div>

        <div className="preloader__line">
          <div className="preloader__line-fill" />
        </div>

        <div className="preloader__bottom">
          <span>
            HUMAN × MACHINE
          </span>

          <span>
            INITIALIZING
          </span>
        </div>
      </div>
    </div>
  )
}

export default Preloader