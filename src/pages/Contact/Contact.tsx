import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Contact.css'

const contacts = [
  {
    number: '01',
    label: 'GENERAL',
    value: 'hello@nexus.systems',
    href: 'mailto:hello@nexus.systems',
  },
  {
    number: '02',
    label: 'RESEARCH',
    value: 'research@nexus.systems',
    href: 'mailto:research@nexus.systems',
  },
  {
    number: '03',
    label: 'CAREERS',
    value: 'careers@nexus.systems',
    href: 'mailto:careers@nexus.systems',
  },
]

function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)

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
            '.contact__eyebrow',
            '.contact__title-line',
            '.contact__description',
            '.contact__email',
            '.contact__contact',
            '.contact__footer',
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
          start: 'top 78%',
          toggleActions:
            'play none none reverse',
        },
      })

      intro
        .from('.contact__eyebrow', {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
        })
        .from(
          '.contact__title-line',
          {
            autoAlpha: 0,
            yPercent: 100,
            duration: 0.9,
            stagger: 0.08,
          },
          '-=0.25',
        )
        .from(
          '.contact__description',
          {
            autoAlpha: 0,
            y: 22,
            duration: 0.7,
          },
          '-=0.4',
        )
        .from(
          '.contact__email',
          {
            autoAlpha: 0,
            y: 25,
            duration: 0.8,
          },
          '-=0.35',
        )

      gsap.from('.contact__contact', {
        autoAlpha: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: '.contact__contacts',
          start: 'top 82%',
          toggleActions:
            'play none none reverse',
        },
      })

      if (coreRef.current) {
        gsap.to(coreRef.current, {
          rotate: 360,
          duration: 30,
          repeat: -1,
          ease: 'none',
        })

        gsap.to('.contact__core-center', {
          scale: 1.12,
          opacity: 0.8,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      gsap.to('.contact__signal', {
        x: 20,
        opacity: 0.2,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
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
      className="contact"
    >
      <div className="contact__background" />

      <header className="contact__header">
        <div>
          <span className="contact__section-number">
            07
          </span>

          <span>
            CONTACT
          </span>
        </div>

        <span>
          NEXUS // COMMUNICATION SYSTEM
        </span>
      </header>

      <div className="contact__hero">
        <div className="contact__hero-copy">
          <span className="contact__eyebrow">
            START A CONVERSATION
          </span>

          <h1 className="contact__title">
            <span className="contact__title-line">
              LET&apos;S
            </span>

            <span className="contact__title-line">
              BUILD
            </span>

            <span className="contact__title-line">
              WHAT&apos;S <em>NEXT.</em>
            </span>
          </h1>

          <p className="contact__description">
            Have a project, research idea or question
            about NEXUS? Start a conversation with our
            team.
          </p>

          <a
            className="contact__email"
            href="mailto:hello@nexus.systems"
          >
            <span>
              hello@nexus.systems
            </span>

            <span className="contact__email-arrow">
              ↗
            </span>
          </a>
        </div>

        <div className="contact__visual">
          <div
            ref={coreRef}
            className="contact__core"
          >
            <div className="contact__core-ring contact__core-ring--outer" />
            <div className="contact__core-ring contact__core-ring--middle" />
            <div className="contact__core-ring contact__core-ring--inner" />

            <div className="contact__core-axis contact__core-axis--vertical" />
            <div className="contact__core-axis contact__core-axis--horizontal" />

            <div className="contact__core-center">
              <span />
            </div>
          </div>

          <div className="contact__visual-label">
            <span>
              COMMUNICATION NODE
            </span>

            <span>
              ONLINE
            </span>
          </div>
        </div>
      </div>

      <section className="contact__contacts">
        <div className="contact__contacts-header">
          <span>
            COMMUNICATION CHANNELS
          </span>

          <span>
            SELECT CHANNEL
          </span>
        </div>

        <div className="contact__contact-list">
          {contacts.map((contact) => (
            <a
              key={contact.number}
              href={contact.href}
              className="contact__contact"
            >
              <span className="contact__contact-number">
                {contact.number}
              </span>

              <span className="contact__contact-label">
                {contact.label}
              </span>

              <span className="contact__contact-value">
                {contact.value}
              </span>

              <span className="contact__contact-arrow">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="contact__signals">
        <span className="contact__signal contact__signal--1" />
        <span className="contact__signal contact__signal--2" />
        <span className="contact__signal contact__signal--3" />
      </div>

      <footer className="contact__footer">
        <span>
          NEXUS CORPORATION
        </span>

        <div className="contact__footer-line" />

        <span>
          HUMAN × MACHINE
        </span>

        <span>
          07 / 07
        </span>
      </footer>
    </section>
  )
}

export default Contact