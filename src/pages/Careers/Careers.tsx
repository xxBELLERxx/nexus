import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Careers.css'

const positions = [
  {
    number: '01',
    title: 'SENIOR AI ENGINEER',
    department: 'INTELLIGENCE / RESEARCH',
    location: 'EUROPE / HYBRID',
    type: 'FULL TIME',
    description:
      'Build adaptive intelligence systems that learn from complex environments and operate reliably in the real world.',
    skills:
      'MACHINE LEARNING / PYTHON / SYSTEM DESIGN',
  },
  {
    number: '02',
    title: 'CREATIVE TECHNOLOGIST',
    department: 'EXPERIENCE / DESIGN',
    location: 'EUROPE / HYBRID',
    type: 'FULL TIME',
    description:
      'Create interfaces and digital experiences that translate advanced technology into meaningful human interactions.',
    skills:
      'WEBGL / THREE.JS / GSAP / CREATIVE CODE',
  },
  {
    number: '03',
    title: 'ROBOTICS SYSTEMS ENGINEER',
    department: 'ROBOTICS / HARDWARE',
    location: 'EUROPE / ON SITE',
    type: 'FULL TIME',
    description:
      'Develop robotic systems capable of navigating dynamic environments and collaborating alongside people.',
    skills:
      'ROBOTICS / EMBEDDED SYSTEMS / CONTROL',
  },
  {
    number: '04',
    title: 'FRONTEND ENGINEER',
    department: 'DIGITAL / INTERFACE',
    location: 'EUROPE / HYBRID',
    type: 'FULL TIME',
    description:
      'Engineer high-performance interfaces that make complex systems feel intuitive, responsive and human.',
    skills:
      'REACT / TYPESCRIPT / WEBGL / MOTION',
  },
  {
    number: '05',
    title: 'RESEARCH SCIENTIST',
    department: 'QUANTUM / COMPUTATION',
    location: 'EUROPE / ON SITE',
    type: 'FULL TIME',
    description:
      'Explore computational architectures designed to push the boundaries of what classical systems can achieve.',
    skills:
      'QUANTUM COMPUTING / MATHEMATICS / RESEARCH',
  },
]

function Careers() {
  const sectionRef = useRef<HTMLElement>(null)

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
            '.careers__eyebrow',
            '.careers__title-line',
            '.careers__description',
            '.careers__statement',
            '.careers__position',
          ],
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
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
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      intro
        .from('.careers__eyebrow', {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
        })
        .from(
          '.careers__title-line',
          {
            autoAlpha: 0,
            yPercent: 100,
            duration: 0.85,
            stagger: 0.08,
          },
          '-=0.25',
        )
        .from(
          '.careers__description',
          {
            autoAlpha: 0,
            y: 25,
            duration: 0.7,
          },
          '-=0.4',
        )

      gsap.from('.careers__statement', {
        autoAlpha: 0,
        x: -50,
        duration: 0.9,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: '.careers__statement',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.careers__position', {
        autoAlpha: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: '.careers__positions',
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    {
      scope: sectionRef,
  },
)

  return (
    <section
      ref={sectionRef}
      className="careers"
    >
      <div className="careers__background" />

      <header className="careers__header">
        <div>
          <span className="careers__section-number">
            06
          </span>

          <span>
            CAREERS
          </span>
        </div>

        <span>
          NEXUS // HUMAN SYSTEMS
        </span>
      </header>

      <div className="careers__hero">
        <div className="careers__hero-copy">
          <span className="careers__eyebrow">
            JOIN THE INITIATIVE
          </span>

          <h1 className="careers__title">
            <span className="careers__title-line">
              BUILD
            </span>

            <span className="careers__title-line">
              THE
            </span>

            <span className="careers__title-line">
              <em>FUTURE.</em>
            </span>
          </h1>

          <p className="careers__description">
            We are building the systems that will define
            the relationship between humanity and
            technology.
          </p>
        </div>

        <div className="careers__hero-meta">
          <span>
            06 / 07
          </span>

          <span>
            OPEN POSITIONS
          </span>

          <span>
            {String(positions.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="careers__statement">
        <span className="careers__statement-label">
          WHO WE ARE LOOKING FOR
        </span>

        <p>
          Engineers, researchers and designers who are
          comfortable working at the edge of what is
          currently possible.
        </p>

        <span className="careers__statement-mark">
          +
        </span>
      </div>

      <section className="careers__positions">
        <div className="careers__positions-header">
          <span>
            OPEN POSITIONS
          </span>

          <span>
            SELECT A ROLE
          </span>
        </div>

        <div className="careers__list">
          {positions.map((position) => (
            <article
              key={position.number}
              className="careers__position"
              tabIndex={0}
            >
              <div className="careers__position-main">
                <span className="careers__position-number">
                  {position.number}
                </span>

                <div className="careers__position-title">
                  <h2>
                    {position.title}
                  </h2>

                  <span>
                    {position.department}
                  </span>
                </div>

                <span className="careers__position-arrow">
                  ↗
                </span>
              </div>

              <div className="careers__position-details">
                <div className="careers__position-info">
                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {position.location}
                  </strong>
                </div>

                <div className="careers__position-info">
                  <span>
                    TYPE
                  </span>

                  <strong>
                    {position.type}
                  </strong>
                </div>

                <div className="careers__position-description">
                  <p>
                    {position.description}
                  </p>

                  <span>
                    {position.skills}
                  </span>
                </div>

                <button
                  type="button"
                  className="careers__position-apply"
                >
                  <span>
                    VIEW POSITION
                  </span>

                  <span>
                    ↗
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="careers__footer">
        <span>
          OPEN TO THE CURIOUS
        </span>

        <div className="careers__footer-line" />

        <span>
          {String(positions.length).padStart(2, '0')} ROLES
        </span>

        <span>
          06 / 07
        </span>
      </footer>
    </section>
  )
}

export default Careers