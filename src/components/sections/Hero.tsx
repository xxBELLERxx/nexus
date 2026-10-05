import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Hero.css'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = heroRef.current

      if (!section) {
        return
      }

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const supportsHover = window.matchMedia(
        '(hover: hover)',
      ).matches

      /*
       * ==========================================
       * INTRO ANIMATION
       * ==========================================
       */

      if (!prefersReducedMotion) {
        const timeline = gsap.timeline({
          defaults: {
            ease: 'power3.out',
          },
        })

        timeline
          .from('.hero__background', {
            scale: 1.12,
            opacity: 0,
            duration: 2,
          })

          .from(
            '.hero__eyebrow',
            {
              y: 25,
              opacity: 0,
              duration: 0.7,
            },
            '-=1.2',
          )

          .from(
            '.hero__title-line',
            {
              y: 80,
              opacity: 0,
              duration: 1,
              stagger: 0.12,
            },
            '-=0.5',
          )

          .from(
            '.hero__description',
            {
              y: 25,
              opacity: 0,
              duration: 0.7,
            },
            '-=0.45',
          )

          .from(
            '.hero__button',
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
            },
            '-=0.25',
          )

          .from(
            '.hero__meta',
            {
              opacity: 0,
              duration: 0.8,
            },
            '-=0.2',
          )

        /*
         * ==========================================
         * HERO SCROLL PARALLAX
         * ==========================================
         */

        gsap.to('.hero__background', {
          yPercent: 10,
          ease: 'none',

          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      /*
       * ==========================================
       * MOUSE PARALLAX
       * ==========================================
       */

      if (!prefersReducedMotion && supportsHover) {
        const background = section.querySelector<HTMLElement>(
          '.hero__background',
        )

        const content = section.querySelector<HTMLElement>(
          '.hero__content',
        )

        const button = section.querySelector<HTMLButtonElement>(
          '.hero__button',
        )

        if (!background || !content || !button) {
          return
        }

        /*
         * quickTo() идеально подходит для mousemove,
         * когда одно и то же свойство обновляется
         * очень часто.
         */
        const backgroundX = gsap.quickTo(
          background,
          'x',
          {
            duration: 0.8,
            ease: 'power3.out',
          },
        )

        const backgroundY = gsap.quickTo(
          background,
          'y',
          {
            duration: 0.8,
            ease: 'power3.out',
          },
        )

        const contentX = gsap.quickTo(
          content,
          'x',
          {
            duration: 1,
            ease: 'power3.out',
          },
        )

        const contentY = gsap.quickTo(
          content,
          'y',
          {
            duration: 1,
            ease: 'power3.out',
          },
        )

        /*
         * ==========================================
         * HERO POINTER
         * ==========================================
         */

        const handlePointerMove = (
          event: PointerEvent,
        ) => {
          const x =
            event.clientX / window.innerWidth - 0.5

          const y =
            event.clientY / window.innerHeight - 0.5

          /*
           * Фон двигается сильнее.
           */
          backgroundX(x * -22)
          backgroundY(y * -14)

          /*
           * Контент двигается значительно слабее.
           */
          contentX(x * 7)
          contentY(y * 5)
        }

        const resetHero = () => {
          backgroundX(0)
          backgroundY(0)

          contentX(0)
          contentY(0)
        }

        section.addEventListener(
          'pointermove',
          handlePointerMove,
        )

        section.addEventListener(
          'pointerleave',
          resetHero,
        )

        /*
         * ==========================================
         * MAGNETIC BUTTON
         * ==========================================
         */

        const buttonX = gsap.quickTo(
          button,
          'x',
          {
            duration: 0.35,
            ease: 'power3.out',
          },
        )

        const buttonY = gsap.quickTo(
          button,
          'y',
          {
            duration: 0.35,
            ease: 'power3.out',
          },
        )

        const handleButtonMove = (
          event: PointerEvent,
        ) => {
          const rect =
            button.getBoundingClientRect()

          const x =
            event.clientX -
            rect.left -
            rect.width / 2

          const y =
            event.clientY -
            rect.top -
            rect.height / 2

          /*
           * Коэффициент 0.18 означает,
           * что кнопка двигается только на 18%
           * от положения курсора внутри неё.
           */
          buttonX(x * 0.18)
          buttonY(y * 0.18)
        }

        const resetButton = () => {
          buttonX(0)
          buttonY(0)
        }

        button.addEventListener(
          'pointermove',
          handleButtonMove,
        )

        button.addEventListener(
          'pointerleave',
          resetButton,
        )

        /*
         * ==========================================
         * CLEANUP
         * ==========================================
         */

        return () => {
          section.removeEventListener(
            'pointermove',
            handlePointerMove,
          )

          section.removeEventListener(
            'pointerleave',
            resetHero,
          )

          button.removeEventListener(
            'pointermove',
            handleButtonMove,
          )

          button.removeEventListener(
            'pointerleave',
            resetButton,
          )
        }
      }
    },
    {
      scope: heroRef,
    },
  )

  return (
    <section
      ref={heroRef}
      className="hero"
    >
      <div className="hero__background" />

      <div className="hero__overlay" />

      <div className="hero__noise" />

      <div className="hero__content">
        <p className="hero__eyebrow">
          NEXT GENERATION TECHNOLOGY
        </p>

        <h1 className="hero__title">
          <span className="hero__title-line">
            WE ENGINEER
          </span>

          <span className="hero__title-line">
            WHAT COMES
          </span>

          <span className="hero__title-line hero__title-line--accent">
            NEXT.
          </span>
        </h1>

        <p className="hero__description">
          NEXUS Technologies develops advanced systems
          designed to redefine the relationship between
          humans and machines.
        </p>

        <button
          className="hero__button"
          type="button"
          onClick={() => {
            document
              .getElementById('manifesto')
              ?.scrollIntoView({
                behavior: 'smooth',
              })
          }}
        >
          <span>EXPLORE</span>

          <span className="hero__button-arrow">
            →
          </span>
        </button>
      </div>

      <div className="hero__meta">
        <div className="hero__counter">
          <span>01 / 07</span>

          <div className="hero__progress">
            <span />
          </div>
        </div>

        <div className="hero__scroll">
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  )
}

export default Hero