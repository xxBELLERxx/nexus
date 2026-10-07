import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Company.css'

const principles = [
  {
    number: '01',
    title: 'HUMAN FIRST',
    description:
      'Technology should expand human potential, never replace the value of human experience.',
  },
  {
    number: '02',
    title: 'RADICAL CURIOSITY',
    description:
      'We question established limits and explore what becomes possible beyond them.',
  },
  {
    number: '03',
    title: 'RESPONSIBLE POWER',
    description:
      'Every capability we create carries a responsibility to use it with intent.',
  },
]

const milestones = [
  {
    year: '2048',
    code: 'NX-FOUNDATION',
    title: 'THE BEGINNING',
    description:
      'NEXUS is founded with a singular objective: create technology capable of evolving alongside humanity.',
  },
  {
    year: '2052',
    code: 'NX-AI',
    title: 'ADAPTIVE INTELLIGENCE',
    description:
      'The first NEXUS adaptive intelligence architecture becomes operational.',
  },
  {
    year: '2058',
    code: 'NX-CORE',
    title: 'THE CORE',
    description:
      'NEXUS introduces a unified computational architecture connecting its major research divisions.',
  },
  {
    year: '2064',
    code: 'NX-GLOBAL',
    title: 'BEYOND THE LAB',
    description:
      'NEXUS technology moves from research environments into real-world systems designed to operate alongside people.',
  },
]

function Company() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

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
            '.company__eyebrow',
            '.company__title-line',
            '.company__description',
            '.company__visual',
            '.company__principle',
            '.company__timeline',
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
        .from('.company__eyebrow', {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
        })
        .from(
          '.company__title-line',
          {
            autoAlpha: 0,
            yPercent: 100,
            duration: 0.9,
            stagger: 0.08,
          },
          '-=0.3',
        )
        .from(
          '.company__description',
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.7,
          },
          '-=0.45',
        )
        .from(
          '.company__visual',
          {
            autoAlpha: 0,
            scale: 0.9,
            duration: 1.1,
            ease: 'power2.out',
          },
          '-=0.6',
        )

      gsap.from('.company__principle', {
        autoAlpha: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: '.company__principles',
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })

      if (visualRef.current) {
        gsap.to('.company__visual-ring--outer', {
          rotate: 360,
          duration: 32,
          repeat: -1,
          ease: 'none',
        })

        gsap.to('.company__visual-ring--inner', {
          rotate: -360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        })

        gsap.to('.company__visual-core', {
          scale: 1.08,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      if (
        timelineRef.current &&
        progressRef.current
      ) {
        const items =
          gsap.utils.toArray<HTMLElement>(
            '.company__timeline-item',
          )

        gsap.to(progressRef.current, {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',

          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        })

        items.forEach((item, index) => {
          gsap.from(item, {
            autoAlpha: 0,
            x: 50,
            duration: 0.8,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions:
                'play none none reverse',
            },

            delay: index * 0.04,
          })
        })
      }
    },
    {
      scope: sectionRef,
    },
  )

  return (
    <section
      ref={sectionRef}
      className="company"
    >
      <div className="company__background" />

      <header className="company__header">
        <div>
          <span className="company__section-number">
            05
          </span>

          <span>
            COMPANY
          </span>
        </div>

        <span>
          NEXUS // CORPORATE SYSTEM
        </span>
      </header>

      <div className="company__hero">
        <div className="company__hero-copy">
          <span className="company__eyebrow">
            THE NEXUS INITIATIVE
          </span>

          <h1 className="company__title">
            <span className="company__title-line">
              WE BUILD
            </span>

            <span className="company__title-line">
              WHAT <em>COMES</em>
            </span>

            <span className="company__title-line">
              NEXT.
            </span>
          </h1>

          <p className="company__description">
            NEXUS is an independent technology company
            focused on intelligence, computation,
            robotics and the systems that connect them.
          </p>
        </div>

        <div className="company__visual">
          <div
            ref={visualRef}
            className="company__visual-system"
          >
            <div className="company__visual-ring company__visual-ring--outer" />
            <div className="company__visual-ring company__visual-ring--middle" />
            <div className="company__visual-ring company__visual-ring--inner" />

            <div className="company__visual-axis company__visual-axis--vertical" />
            <div className="company__visual-axis company__visual-axis--horizontal" />

            <div className="company__visual-core">
              <span />
            </div>
          </div>

          <div className="company__visual-label">
            <span>
              NEXUS SYSTEM
            </span>

            <span>
              EST. 2048
            </span>
          </div>
        </div>
      </div>

      <section className="company__principles">
        <div className="company__subheading">
          <span>
            02
          </span>

          <span>
            OUR PRINCIPLES
          </span>
        </div>

        <div className="company__principles-list">
          {principles.map((principle) => (
            <article
              key={principle.number}
              className="company__principle"
            >
              <div className="company__principle-number">
                {principle.number}
              </div>

              <div className="company__principle-main">
                <h2>
                  {principle.title}
                </h2>

                <p>
                  {principle.description}
                </p>
              </div>

              <span className="company__principle-arrow">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={timelineRef}
        className="company__timeline"
      >
        <div className="company__subheading">
          <span>
            03
          </span>

          <span>
            EVOLUTION
          </span>
        </div>

        <div className="company__timeline-layout">
          <div className="company__timeline-years">
            <span>
              2048
            </span>

            <span>
              2064
            </span>
          </div>

          <div className="company__timeline-track">
            <div className="company__timeline-line" />

            <div
              ref={progressRef}
              className="company__timeline-progress"
            />

            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="company__timeline-item"
              >
                <div className="company__timeline-dot" />

                <span className="company__timeline-year">
                  {milestone.year}
                </span>

                <div className="company__timeline-content">
                  <span className="company__timeline-code">
                    {milestone.code}
                  </span>

                  <h3>
                    {milestone.title}
                  </h3>

                  <p>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="company__footer">
        <span>
          NEXUS CORPORATION
        </span>

        <div className="company__footer-line" />

        <span>
          HUMAN × MACHINE
        </span>

        <span>
          05 / 07
        </span>
      </footer>
    </section>
  )
}

export default Company