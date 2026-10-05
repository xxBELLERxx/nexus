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

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(
        '.manifesto__word',
      )

      const images = gsap.utils.toArray<HTMLElement>(
        '.manifesto__image',
      )

      const descriptions = gsap.utils.toArray<HTMLElement>(
        '.manifesto__description',
      )

      if (
        !words.length ||
        !images.length ||
        !descriptions.length
      ) {
        return
      }

      /*
       * Initial state.
       */
      gsap.set(words, {
        autoAlpha: 0,
        y: 50,
      })

      gsap.set(images, {
        autoAlpha: 0,
        scale: 1.08,
      })

      gsap.set(descriptions, {
        autoAlpha: 0,
        y: 20,
      })

      gsap.set(
        [words[0], images[0], descriptions[0]],
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        },
      )

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3600',
          scrub: 1,
          pin: '.manifesto__stage',
          anticipatePin: 1,
        },
      })

      /*
       * Each concept becomes a complete visual state.
       */
      concepts.slice(1).forEach((_, index) => {
        const previousWord = words[index]
        const currentWord = words[index + 1]

        const previousImage = images[index]
        const currentImage = images[index + 1]

        const previousDescription =
          descriptions[index]

        const currentDescription =
          descriptions[index + 1]

        timeline
          .to(previousWord, {
            autoAlpha: 0,
            y: -45,
            duration: 1,
          })

          .to(
            currentWord,
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
            },
            '<0.15',
          )

          .to(
            previousImage,
            {
              autoAlpha: 0,
              scale: 0.96,
              duration: 1,
            },
            '<',
          )

          .to(
            currentImage,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1,
            },
            '<0.15',
          )

          .to(
            previousDescription,
            {
              autoAlpha: 0,
              y: -15,
              duration: 0.7,
            },
            '<',
          )

          .to(
            currentDescription,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
            },
            '<0.15',
          )
      })

      /*
       * Slow movement of the visual image area.
       */
      timeline.to(
        '.manifesto__visual-inner',
        {
          y: -30,
          duration: concepts.length - 1,
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
      <div className="manifesto__stage">
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