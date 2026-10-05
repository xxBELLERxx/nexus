import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Manifesto.css'

const concepts = [
  'HUMANITY',
  'INTELLIGENCE',
  'CONNECTION',
  'EVOLUTION',
]

function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(
        '.manifesto__word',
      )

      gsap.set(words, {
        autoAlpha: 0,
        y: 50,
      })

      gsap.set(words[0], {
        autoAlpha: 1,
        y: 0,
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: 1,
          pin: '.manifesto__stage',
          anticipatePin: 1,
        },
      })

      words.slice(1).forEach((word, index) => {
        const previousWord = words[index]

        timeline
          .to(previousWord, {
            autoAlpha: 0,
            y: -50,
            duration: 1,
          })
          .to(
            word,
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
            },
            '<0.2',
          )
      })
    },
    {
      scope: sectionRef,
    },
  )

  return (
    <section
      ref={sectionRef}
      className="manifesto"
    >
      <div className="manifesto__stage">
        <div className="manifesto__header">
          <span>01</span>

          <span>THE NEXUS MANIFESTO</span>
        </div>

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
                key={concept}
                className="manifesto__word"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        <div className="manifesto__footer">
          <span>SCROLL TO CONTINUE</span>

          <span>02 / 07</span>
        </div>
      </div>
    </section>
  )
}

export default Manifesto