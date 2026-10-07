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

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(
        '.technology-panel',
      )

      const numbers = gsap.utils.toArray<HTMLElement>(
        '.technology-index__item',
      )

      if (
        !panels.length ||
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

      gsap.set(numbers, {
        color: 'var(--color-text-muted)',
      })

      gsap.set(panels[0], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
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
    coreProgress.current = timeline.progress()
  },
})

      /*
       * Progress line.
       */
      timeline.fromTo(
        '.technology__progress-fill',
        {
          scaleX: 0,
          transformOrigin: 'left center',
        },
        {
          scaleX: 1,
          duration: panels.length - 1,
          ease: 'none',
        },
        0,
      )

      /*
       * Grid movement.
       */
      timeline.to(
        '.technology__visual-grid',
        {
          rotationZ: 8,
          scale: 1.08,
          duration: panels.length - 1,
          ease: 'none',
        },
        0,
      )

      /*
       * Panel transitions.
       */
      panels.slice(1).forEach(
        (panel, index) => {
          const previousPanel = panels[index]
          const previousNumber = numbers[index]
          const currentNumber = numbers[index + 1]

          timeline
            .to(
              previousPanel,
              {
                autoAlpha: 0,
                y: -35,
                scale: 1.03,
                duration: 1,
                ease: 'power2.inOut',
              },
            )

            .to(
              panel,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
              },
              '<0.15',
            )

            .to(
              previousNumber,
              {
                color:
                  'var(--color-text-muted)',
                duration: 0.4,
              },
              '<',
            )

            .to(
              currentNumber,
              {
                color:
                  'var(--color-accent)',
                duration: 0.4,
              },
              '<',
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
            Four disciplines. One interconnected
            technological ecosystem.
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

        <div className="technology__showcase">
          <div className="technology__visual">
  <NexusCore
    progressRef={coreProgress}
  />

  <div className="technology__visual-grid" />

  <div className="technology__visual-label">
    NEXUS CORE
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
                      {technology.description}
                    </p>
                  </div>

                  <div className="technology-panel__metric">
                    <div>
                      <span className="technology-panel__metric-value">
                        {technology.metric}
                      </span>

                      <span className="technology-panel__metric-unit">
                        {technology.metricLabel}
                      </span>
                    </div>

                    <span className="technology-panel__metric-label">
                      {technology.label}
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

          <span>03 / 07</span>
        </footer>
      </div>
    </section>
  )
}

export default TechnologyShowcase