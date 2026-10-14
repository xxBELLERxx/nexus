import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Manifesto.css'

const IMAGE_BASE = `${import.meta.env.BASE_URL}images/manifesto`

const concepts = [
  {
    word: 'HUMANITY',
    label: 'THE FOUNDATION',
    description:
      'Technology begins with the people it is designed to serve.',
    image: `${IMAGE_BASE}/humanity.webp`,
  },
  {
    word: 'INTELLIGENCE',
    label: 'THE MIND',
    description:
      'Systems that learn, adapt and extend human capability.',
    image: `${IMAGE_BASE}/intelligence.webp`,
  },
  {
    word: 'CONNECTION',
    label: 'THE NETWORK',
    description:
      'Machines, people and information brought into one ecosystem.',
    image: `${IMAGE_BASE}/connection.webp`,
  },
  {
    word: 'EVOLUTION',
    label: 'THE NEXT STEP',
    description:
      'Continuous progress without a defined final state.',
    image: `${IMAGE_BASE}/evolution.webp`,
  },
]

function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = stageRef.current

      if (!section || !stage) return

      const words = gsap.utils.toArray<HTMLElement>(
        '.manifesto__word',
        section,
      )

      const images = gsap.utils.toArray<HTMLElement>(
        '.manifesto__image',
        section,
      )

      const descriptions = gsap.utils.toArray<HTMLElement>(
        '.manifesto__description',
        section,
      )

      const visualInner = section.querySelector(
        '.manifesto__visual-inner',
      )

      if (
        words.length !== concepts.length ||
        images.length !== concepts.length ||
        descriptions.length !== concepts.length ||
        !visualInner
      ) {
        return
      }

      /* ========================================
         INITIAL STATE
      ======================================== */

      gsap.set(words, {
        autoAlpha: 0,
        y: 36,
      })

      gsap.set(images, {
        autoAlpha: 0,
        scale: 1.06,
      })

      gsap.set(descriptions, {
        autoAlpha: 0,
        y: 16,
      })

      gsap.set(words[0], {
        autoAlpha: 1,
        y: 0,
      })

      gsap.set(images[0], {
        autoAlpha: 1,
        scale: 1,
      })

      gsap.set(descriptions[0], {
        autoAlpha: 1,
        y: 0,
      })

      /* ========================================
         SCROLL TIMELINE
      ======================================== */

      const transitionGap = 1.25
      const wordDuration = 0.8
      const imageDuration = 0.9
      const descriptionDuration = 0.65
      const overlap = 0.12

      /*
       * Each transition gets its own time slot.
       * This prevents chained tweens from
       * unintentionally stretching the sequence.
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',

          /*
           * The scroll distance is tied to the
           * actual section height.
           *
           * CSS and ScrollTrigger therefore
           * remain aligned on different screens.
           */
          end: 'bottom bottom',

          pin: stage,
          pinSpacing: true,

          /*
           * Direct scrubbing avoids a delayed
           * animation on mobile when the user
           * reaches the end of the section.
           */
          scrub: true,

          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      concepts.slice(1).forEach((_, index) => {
        const previousWord = words[index]
        const currentWord = words[index + 1]

        const previousImage = images[index]
        const currentImage = images[index + 1]

        const previousDescription =
          descriptions[index]

        const currentDescription =
          descriptions[index + 1]

        const start = index * transitionGap

        /* WORD OUT */

        timeline.to(
          previousWord,
          {
            autoAlpha: 0,
            y: -36,
            duration: wordDuration,
            ease: 'power2.inOut',
          },
          start,
        )

        /* WORD IN */

        timeline.to(
          currentWord,
          {
            autoAlpha: 1,
            y: 0,
            duration: wordDuration,
            ease: 'power2.out',
          },
          start + overlap,
        )

        /* IMAGE OUT */

        timeline.to(
          previousImage,
          {
            autoAlpha: 0,
            scale: 0.97,
            duration: imageDuration,
            ease: 'power2.inOut',
          },
          start,
        )

        /* IMAGE IN */

        timeline.to(
          currentImage,
          {
            autoAlpha: 1,
            scale: 1,
            duration: imageDuration,
            ease: 'power2.out',
          },
          start + overlap,
        )

        /* DESCRIPTION OUT */

        timeline.to(
          previousDescription,
          {
            autoAlpha: 0,
            y: -12,
            duration: descriptionDuration,
            ease: 'power2.inOut',
          },
          start,
        )

        /* DESCRIPTION IN */

        timeline.to(
          currentDescription,
          {
            autoAlpha: 1,
            y: 0,
            duration: descriptionDuration,
            ease: 'power2.out',
          },
          start + overlap,
        )
      })

      /* ========================================
         FINAL STATE HOLD
      ======================================== */

      /*
       * The final transition completes at this
       * point. We extend the timeline beyond it,
       * so EVOLUTION remains visible at the end
       * instead of changing at the last instant.
       */

      const finalTransitionEnd =
        (concepts.length - 2) * transitionGap +
        overlap +
        imageDuration

      const finalHoldDuration = 0.85

      const fullTimelineDuration =
        finalTransitionEnd + finalHoldDuration

      timeline.to(
        visualInner,
        {
          y: -30,
          duration: fullTimelineDuration,
          ease: 'none',
        },
        0,
      )
    },
    {
      scope: sectionRef,
    },
  )

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="manifesto"
    >
      <div
        ref={stageRef}
        className="manifesto__stage"
      >
        <header className="manifesto__header">
          <span>01</span>
          <span>THE NEXUS MANIFESTO</span>
        </header>

        <div className="manifesto__layout">
          <div className="manifesto__content">
            <p className="manifesto__eyebrow">
              WE DON'T PREDICT THE FUTURE.
            </p>

            <h2 className="manifesto__title">
              WE ENGINEER
              <br />
              WHAT COMES
            </h2>

            <div className="manifesto__word-container">
              {concepts.map((concept) => (
                <span
                  key={concept.word}
                  className="manifesto__word"
                >
                  {concept.word}
                </span>
              ))}
            </div>

            <div className="manifesto__description-container">
              {concepts.map((concept) => (
                <div
                  key={concept.label}
                  className="manifesto__description"
                >
                  <span className="manifesto__description-label">
                    {concept.label}
                  </span>

                  <p>
                    {concept.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="manifesto__visual">
            <div className="manifesto__visual-grid" />

            <div className="manifesto__visual-inner">
              {concepts.map((concept) => (
                <div
                  key={concept.image}
                  className="manifesto__image"
                >
                  <img
                    src={concept.image}
                    alt=""
                  />

                  <div className="manifesto__image-overlay" />
                </div>
              ))}
            </div>

            <div className="manifesto__visual-meta">
              <span>NX / MANIFESTO</span>
              <span>VISUAL SYSTEM</span>
            </div>
          </div>
        </div>

        <footer className="manifesto__footer">
          <span>SCROLL TO CONTINUE</span>

          <div className="manifesto__footer-line" />

          <span>02 / 07</span>
        </footer>
      </div>
    </section>
  )
}

export default Manifesto