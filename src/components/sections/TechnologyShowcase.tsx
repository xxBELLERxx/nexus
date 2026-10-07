import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'
import { technologies } from '../../data/technologies'
import NexusCore from './NexusCore'

import './TechnologyShowcase.css'

function TechnologyShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const coreProgress = useRef(0)

  const transitionSize = 0.12

  const activeNumberRef =
    useRef<HTMLSpanElement>(null)

  const activeNameRef =
    useRef<HTMLSpanElement>(null)

  const activeCodeRef =
    useRef<HTMLSpanElement>(null)

  const activeStatusRef =
    useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const panels =
        gsap.utils.toArray<HTMLElement>(
          '.technology-panel',
        )

      const numbers =
        gsap.utils.toArray<HTMLElement>(
          '.technology-index__item',
        )

      if (
        !panels.length ||
        !numbers.length ||
        !sectionRef.current ||
        !stageRef.current
      ) {
        return
      }

      gsap.set(panels, {
        autoAlpha: 0,
        y: 40,
        scale: 0.97,
      })

      gsap.set(panels[0], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      })

      gsap.set(numbers, {
        color: 'var(--color-text-muted)',
      })

      gsap.set(numbers[0], {
        color: 'var(--color-accent)',
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: 'top top',
          end: 'bottom bottom',

          pin: stageRef.current,
          scrub: 1,

          anticipatePin: 1,
        },
        onUpdate: () => {
  const progress =
    timeline.progress()

  coreProgress.current =
    progress

const position =
  progress *
  (technologies.length - 1)

let activeIndex = Math.min(
  Math.floor(position),
  technologies.length - 1,
)

for (
  let boundary = 1;
  boundary < technologies.length;
  boundary++
) {
  const transitionMidpoint =
    boundary -
    transitionSize / 2

  if (
    position >=
    transitionMidpoint
  ) {
    activeIndex = boundary
  }
}

  const technology =
    technologies[activeIndex]

  if (
    !technology ||
    !activeNumberRef.current ||
    !activeNameRef.current ||
    !activeCodeRef.current ||
    !activeStatusRef.current
  ) {
    return
  }
  if (
    activeNumberRef.current.dataset.index ===
    technology.number
  ) {
    return
  }

  activeNumberRef.current.dataset.index =
    technology.number

  activeNumberRef.current.textContent =
    `${technology.number} / 04`

  activeNameRef.current.textContent =
    technology.name

  activeCodeRef.current.textContent =
    technology.code

  activeStatusRef.current.textContent =
    technology.status
},
      })

      timeline.fromTo(
        '.technology__progress-fill',
        {
          scaleX: 0,
          transformOrigin:
            'left center',
        },
        {
          scaleX: 1,
          duration: 3,
          ease: 'none',
        },
        0,
      )
      timeline.to(
        '.technology__visual-grid',
        {
          rotationZ: 8,
          scale: 1.08,
          duration: 3,
          ease: 'none',
        },
        0,
      )

      panels.slice(1).forEach(
        (panel, index) => {
          const previousPanel =
            panels[index]

          const previousNumber =
            numbers[index]

          const currentNumber =
            numbers[index + 1]
          const boundary =
            index + 1
          const start =
            boundary -
            transitionSize
          timeline.to(
            previousPanel,
            {
              autoAlpha: 0,
              y: -35,
              scale: 1.03,
              duration: transitionSize,
              ease: 'power2.inOut',
            },
            start,
          )
          timeline.to(
            panel,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: transitionSize,
              ease: 'power2.out',
            },
            start,
          )
          timeline.to(
            previousNumber,
            {
              color:
                'var(--color-text-muted)',
              duration: transitionSize,
              ease: 'none',
            },
            start,
          )
          timeline.to(
            currentNumber,
            {
              color:
                'var(--color-accent)',
              duration: transitionSize,
              ease: 'none',
            },
            start,
          )
        },
      )
    },
    {
      scope: sectionRef,
    },
  )

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="technology"
    >
      <div
        ref={stageRef}
        className="technology__stage"
      >

        <header className="technology__header">
          <span>02</span>

          <span>
            THE NEXUS TECHNOLOGY
          </span>
        </header>

        <div className="technology__intro">
          <span className="technology__eyebrow">
            FOUR FOUNDATIONS
          </span>

          <h2>
            THE FOUR
            <br />
            FOUNDATIONS
            <br />
            <span>OF TOMORROW.</span>
          </h2>

          <p className="technology__intro-description">
            Four disciplines. One
            interconnected technological
            ecosystem.
          </p>
        </div>

        <div className="technology-index">
          {technologies.map(
            (technology) => (
              <div
                key={technology.number}
                className="technology-index__item"
              >
                <span>
                  {technology.number}
                </span>

                <span>
                  {technology.shortName}
                </span>
              </div>
            ),
          )}
        </div>

        <div className="technology-hud">
  <div className="technology-hud__header">
    <span>ACTIVE SYSTEM</span>

    <span
      ref={activeNumberRef}
      data-index="01"
    >
      01 / 04
    </span>
  </div>

  <div className="technology-hud__name">
    <span ref={activeNameRef}>
      ARTIFICIAL INTELLIGENCE
    </span>
  </div>

  <div className="technology-hud__divider" />

  <div className="technology-hud__row">
    <span>NODE</span>

    <span ref={activeCodeRef}>
      NX-AI-01
    </span>
  </div>

  <div className="technology-hud__row">
    <span>STATUS</span>

    <span
      ref={activeStatusRef}
      className="technology-hud__status"
    >
      OPERATIONAL
    </span>
  </div>
</div>

        <div className="technology__showcase">
          <div className="technology__visual">
            <NexusCore
              progressRef={
                coreProgress
              }
            />

            <div className="technology__visual-grid" />

            <div className="technology__visual-label">
  <span>NEXUS CORE</span>
  <span>ONLINE</span>
</div>
          </div>

          <div className="technology__panels">
            {technologies.map(
              (technology) => (
                <article
                  key={technology.number}
                  className="technology-panel"
                >
                  <div className="technology-panel__top">
                    <span>
                      {technology.number}
                    </span>

                    <span>
                      {technology.shortName}
                    </span>
                  </div>

                  <div className="technology-panel__body">
                    <span className="technology-panel__category">
                      NEXUS TECHNOLOGY
                    </span>

                    <h3>
                      {technology.name}
                    </h3>

                    <p>
                      {
                        technology.description
                      }
                    </p>
                  </div>

                  <div className="technology-panel__metric">
                    <div>
                      <span className="technology-panel__metric-value">
                        {
                          technology.metric
                        }
                      </span>

                      <span className="technology-panel__metric-unit">
                        {
                          technology.metricLabel
                        }
                      </span>
                    </div>

                    <span className="technology-panel__metric-label">
                      {
                        technology.label
                      }
                    </span>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>

        <footer className="technology__footer">
  <div className="technology__progress">
    <div className="technology__progress-fill" />
  </div>

  <span>
    SCROLL TO EXPLORE
  </span>

  <span>
    SYSTEM 04 ONLINE
  </span>

  <span>
    03 / 07
  </span>
</footer>
      </div>
    </section>
  )
}

export default TechnologyShowcase