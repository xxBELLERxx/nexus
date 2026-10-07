import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Research.css'

const researchAreas = [
  {
    number: '01',
    code: 'NX-RS-01',
    title: 'ADAPTIVE INTELLIGENCE',
    description:
      'Systems capable of learning from complex environments and continuously adapting their behavior.',
    metric: '42.8',
    metricLabel: 'PFLOPS',
  },
  {
    number: '02',
    code: 'NX-RS-02',
    title: 'NEURAL ARCHITECTURE',
    description:
      'Research into interfaces that allow biological and digital systems to exchange information.',
    metric: '2.7',
    metricLabel: 'MS',
  },
  {
    number: '03',
    code: 'NX-RS-03',
    title: 'QUANTUM SYSTEMS',
    description:
      'Exploring new computational models capable of solving problems beyond classical architectures.',
    metric: '128',
    metricLabel: 'QUBITS',
  },
  {
    number: '04',
    code: 'NX-RS-04',
    title: 'HUMAN / MACHINE',
    description:
      'Designing systems where advanced technology operates as an extension of human capability.',
    metric: '18.4',
    metricLabel: 'HOURS',
  },
]

function Research() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const section = sectionRef.current

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reduceMotion) {
        gsap.set(
          [
            '.research__eyebrow',
            '.research__title-line',
            '.research__description',
            '.research__visual',
            '.research-card',
          ],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          },
        )

        return
      }

      const intro = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })

      intro
        .from('.research__eyebrow', {
          autoAlpha: 0,
          y: 18,
          duration: 0.6,
        })
        .from(
          '.research__title-line',
          {
            autoAlpha: 0,
            y: 45,
            duration: 0.9,
            stagger: 0.08,
          },
          '-=0.3',
        )
        .from(
          '.research__description',
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.7,
          },
          '-=0.45',
        )
        .from(
          '.research__visual',
          {
            autoAlpha: 0,
            scale: 0.92,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=0.75',
        )

      gsap.utils.toArray<HTMLElement>('.research-card').forEach(
        (card, index) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 70,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.05,
          })
        },
      )

      if (visualRef.current) {
        gsap.to(visualRef.current, {
          rotate: 360,
          duration: 35,
          repeat: -1,
          ease: 'none',
        })

        gsap.to('.research__visual-core', {
          scale: 1.15,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      gsap.to('.research__signal', {
        y: -20,
        opacity: 0.35,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: 'sine.inOut',
      })
    },
    {
      scope: sectionRef,
    },
  )

  return (
    <section
      ref={sectionRef}
      className="research"
    >
      <div className="research__grid" />

      <header className="research__header">
        <div>
          <span className="research__section-number">
            04
          </span>

          <span>
            RESEARCH
          </span>
        </div>

        <span>
          NEXUS // R&amp;D DIVISION
        </span>
      </header>

      <div className="research__intro">
        <span className="research__eyebrow">
          THE NEXT FRONTIER
        </span>

        <h2 className="research__title">
          <span className="research__title-line">
            BEYOND
          </span>

          <span className="research__title-line">
            THE <em>KNOWN</em>
          </span>
        </h2>

        <p className="research__description">
          NEXUS research explores the boundaries between
          intelligence, computation and human capability.
        </p>
      </div>

      <div className="research__visual-wrapper">
        <div
          ref={visualRef}
          className="research__visual"
        >
          <div className="research__orbit research__orbit--outer" />
          <div className="research__orbit research__orbit--middle" />
          <div className="research__orbit research__orbit--inner" />

          <div className="research__crosshair research__crosshair--top" />
          <div className="research__crosshair research__crosshair--right" />
          <div className="research__crosshair research__crosshair--bottom" />
          <div className="research__crosshair research__crosshair--left" />

          <div className="research__visual-core">
            <span />
          </div>

          <div className="research__signal research__signal--1" />
          <div className="research__signal research__signal--2" />
          <div className="research__signal research__signal--3" />
        </div>

        <div className="research__visual-label">
          <span>
            NEXUS RESEARCH CORE
          </span>

          <span>
            R&amp;D / 04
          </span>
        </div>
      </div>

      <div className="research__areas">
        {researchAreas.map((area) => (
          <article
            key={area.number}
            className="research-card"
          >
            <div className="research-card__top">
              <span>
                {area.number}
              </span>

              <span>
                {area.code}
              </span>
            </div>

            <div className="research-card__body">
              <span className="research-card__label">
                RESEARCH AREA
              </span>

              <h3>
                {area.title}
              </h3>

              <p>
                {area.description}
              </p>
            </div>

            <div className="research-card__bottom">
              <div>
                <span className="research-card__metric">
                  {area.metric}
                </span>

                <span className="research-card__metric-label">
                  {area.metricLabel}
                </span>
              </div>

              <span className="research-card__arrow">
                ↗
              </span>
            </div>
          </article>
        ))}
      </div>

      <footer className="research__footer">
        <span>
          ACTIVE RESEARCH
        </span>

        <div className="research__footer-line" />

        <span>
          04 AREAS
        </span>

        <span>
          NEXUS // R&amp;D
        </span>
      </footer>
    </section>
  )
}

export default Research