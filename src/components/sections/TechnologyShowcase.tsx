import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'
import { technologies } from '../../data/technologies'

import './TechnologyShowcase.css'

function TechnologyShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(
        '.technology-panel',
      )

      if (!panels.length || !sectionRef.current) {
        return
      }

      /*
       * Начальное состояние.
       *
       * Все панели скрыты,
       * первая становится видимой.
       */
      gsap.set(panels, {
        autoAlpha: 0,
        y: 40,
        scale: 0.96,
      })

      gsap.set(panels[0], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      })

      /*
       * Основной ScrollTrigger timeline.
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: 'top top',

          end: `+=${(panels.length - 1) * 1200}`,

          pin: stageRef.current,

          scrub: 1,

          anticipatePin: 1,
        },
      })

      /*
       * Общая progress bar.
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
       * Смена технологий.
       */
      panels.slice(1).forEach(
        (panel, index) => {
          const previousPanel = panels[index]

          timeline
            .to(previousPanel, {
              autoAlpha: 0,
              y: -50,
              scale: 1.04,
              duration: 1,
              ease: 'power2.inOut',
            })

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
        },
      )

      /*
       * Анимация центрального Core.
       *
       * Он вращается по мере движения timeline.
       */
      timeline.to(
        '.technology__orb',
        {
          rotation: 180,
          duration: panels.length - 1,
          ease: 'none',
        },
        0,
      )

      /*
       * Лёгкое движение сетки.
       */
      timeline.to(
        '.technology__visual-grid',
        {
          rotationZ: 8,
          scale: 1.1,
          duration: panels.length - 1,
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
      ref={sectionRef}
      className="technology"
    >
      <div
        ref={stageRef}
        className="technology__stage"
      >
        {/* HEADER */}

        <header className="technology__header">
          <span>02</span>

          <span>
            THE NEXUS TECHNOLOGY
          </span>
        </header>

        {/* INTRO */}

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
        </div>

        {/* SHOWCASE */}

        <div className="technology__showcase">

          {/* VISUAL */}

          <div className="technology__visual">
            <div className="technology__orb">
              <div className="technology__orb-core" />

              <div className="technology__orb-ring technology__orb-ring--one" />

              <div className="technology__orb-ring technology__orb-ring--two" />

              <div className="technology__orb-ring technology__orb-ring--three" />
            </div>

            <div className="technology__visual-grid" />
          </div>

          {/* PANELS */}

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
                    <h3>
                      {technology.name}
                    </h3>

                    <p>
                      {technology.description}
                    </p>
                  </div>

                  <div className="technology-panel__metric">
                    <span className="technology-panel__metric-value">
                      {technology.metric}
                    </span>

                    <span className="technology-panel__metric-unit">
                      {technology.metricLabel}
                    </span>

                    <span className="technology-panel__metric-label">
                      {technology.label}
                    </span>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>

        {/* FOOTER */}

        <footer className="technology__footer">
          <div className="technology__progress">
            <div className="technology__progress-fill" />
          </div>

          <span>
            SCROLL TO EXPLORE
          </span>

          <span>
            04 / 07
          </span>
        </footer>
      </div>
    </section>
  )
}

export default TechnologyShowcase