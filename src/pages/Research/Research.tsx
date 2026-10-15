import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
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
    focus: 'LEARNING / ADAPTATION',
    detail:
      'Explore intelligent systems that learn from feedback, adjust to changing conditions and support complex decision-making.',
  },
  {
    number: '02',
    code: 'NX-RS-02',
    title: 'NEURAL ARCHITECTURE',
    description:
      'Research into interfaces that allow biological and digital systems to exchange information.',
    metric: '2.7',
    metricLabel: 'MS',
    focus: 'SIGNAL / INTERFACE',
    detail:
      'Investigate new approaches to communication between biological signals and digital systems, with a focus on responsive interfaces and information exchange.',
  },
  {
    number: '03',
    code: 'NX-RS-03',
    title: 'QUANTUM SYSTEMS',
    description:
      'Exploring new computational models capable of solving problems beyond classical architectures.',
    metric: '128',
    metricLabel: 'QUBITS',
    focus: 'COMPUTATION / MODELS',
    detail:
      'Explore computational models inspired by quantum mechanics and investigate how alternative architectures could approach demanding computational problems.',
  },
  {
    number: '04',
    code: 'NX-RS-04',
    title: 'HUMAN / MACHINE',
    description:
      'Designing systems where advanced technology operates as an extension of human capability.',
    metric: '18.4',
    metricLabel: 'HOURS',
    focus: 'COLLABORATION / DESIGN',
    detail:
      'Study how intelligent systems, robotic platforms and people can work together through intuitive interaction and human-centred design.',
  },
]

type ResearchArea = (typeof researchAreas)[number]

/* ==========================================
   RESEARCH DETAIL MODAL
========================================== */

type ResearchModalProps = {
  area: ResearchArea
  onClose: () => void
}

function ResearchModal({
  area,
  onClose,
}: ResearchModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const closingRef = useRef(false)

  /* ========================================
     OPEN ANIMATION
  ======================================== */

  useGSAP(
    () => {
      const backdrop = backdropRef.current
      const dialog = dialogRef.current

      if (!backdrop || !dialog) return

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reduceMotion) {
        gsap.set([backdrop, dialog], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        })

        gsap.set('.research-modal__reveal', {
          autoAlpha: 1,
          y: 0,
        })

        closeButtonRef.current?.focus()

        return
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          closeButtonRef.current?.focus()
        },
      })

      timeline
        .fromTo(
          backdrop,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.3,
            ease: 'power2.out',
          },
        )
        .fromTo(
          dialog,
          {
            autoAlpha: 0,
            y: 22,
            scale: 0.975,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'power3.out',
          },
          '-=0.12',
        )
        .fromTo(
          '.research-modal__reveal',
          {
            autoAlpha: 0,
            y: 12,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.055,
            ease: 'power2.out',
          },
          '-=0.2',
        )
    },
    {
      scope: modalRef,
    },
  )

  /* ========================================
     CLOSE ANIMATION
  ======================================== */

  const closeModal = useCallback(() => {
    if (closingRef.current) return

    const backdrop = backdropRef.current
    const dialog = dialogRef.current

    if (!backdrop || !dialog) {
      onClose()
      return
    }

    closingRef.current = true

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      onClose()
      return
    }

    gsap.timeline({
      onComplete: onClose,
    })
      .to(
        dialog,
        {
          autoAlpha: 0,
          y: 12,
          scale: 0.985,
          duration: 0.22,
          ease: 'power2.in',
        },
      )
      .to(
        backdrop,
        {
          autoAlpha: 0,
          duration: 0.22,
          ease: 'power2.in',
        },
        0,
      )
  }, [onClose])

  /* ========================================
     KEYBOARD / SCROLL MANAGEMENT
  ======================================== */

  useEffect(() => {
    const previousBodyOverflow =
      document.body.style.overflow

    const previousHtmlOverflow =
      document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )

      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault()
        last.focus()
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow =
        previousHtmlOverflow

      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal])

  return createPortal(
    <div
      ref={modalRef}
      className="research-modal"
    >
      <button
        ref={backdropRef}
        type="button"
        className="research-modal__backdrop"
        aria-label="Close research details"
        tabIndex={-1}
        onClick={closeModal}
      />

      <section
        ref={dialogRef}
        className="research-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-modal-title"
        aria-describedby="research-modal-description"
      >
        {/* VISUAL PANEL */}

        <div className="research-modal__visual">
          <div className="research-modal__visual-grid" />

          <div className="research-modal__orbit research-modal__orbit--outer" />
          <div className="research-modal__orbit research-modal__orbit--middle" />
          <div className="research-modal__orbit research-modal__orbit--inner" />

          <div className="research-modal__visual-core">
            <span />
          </div>

          <span className="research-modal__visual-number">
            {area.number}
          </span>

          <div className="research-modal__visual-footer">
            <span>RESEARCH NODE</span>
            <span>{area.code}</span>
          </div>
        </div>

        {/* DETAIL PANEL */}

        <div className="research-modal__content">
          <header className="research-modal__header research-modal__reveal">
            <div>
              <span className="research-modal__eyebrow">
                RESEARCH RECORD
              </span>

              <span className="research-modal__code">
                {area.code}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className="research-modal__close"
              onClick={closeModal}
              aria-label="Close research details"
            >
              <span>CLOSE</span>
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <span className="research-modal__category research-modal__reveal">
            <span />
            RESEARCH AREA / {area.number}
          </span>

          <h2
            id="research-modal-title"
            className="research-modal__title research-modal__reveal"
          >
            {area.title}
          </h2>

          <p
            id="research-modal-description"
            className="research-modal__description research-modal__reveal"
          >
            {area.detail}
          </p>

          <div className="research-modal__specs research-modal__reveal">
            <div>
              <span className="research-modal__spec-label">
                KEY METRIC
              </span>

              <span className="research-modal__metric">
                {area.metric}
              </span>

              <span className="research-modal__spec-unit">
                {area.metricLabel}
              </span>
            </div>

            <div>
              <span className="research-modal__spec-label">
                RESEARCH FOCUS
              </span>

              <span className="research-modal__focus">
                {area.focus}
              </span>

              <span className="research-modal__spec-unit">
                NEXUS / R&D
              </span>
            </div>
          </div>

          <footer className="research-modal__footer research-modal__reveal">
            <span>
              NEXUS // R&amp;D DIVISION
            </span>

            <button
              type="button"
              className="research-modal__return"
              onClick={closeModal}
            >
              <span>RETURN TO RESEARCH</span>
              <span aria-hidden="true">↗</span>
            </button>
          </footer>
        </div>
      </section>
    </div>,
    document.body,
  )
}

/* ==========================================
   RESEARCH PAGE
========================================== */

function Research() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  const [activeArea, setActiveArea] =
    useState<ResearchArea | null>(null)

  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const handleCloseModal = useCallback(() => {
    setActiveArea(null)

    requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }, [])

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
    <>
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
          {researchAreas.map((area, index) => (
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

                <button
                  ref={
                    activeArea?.number === area.number
                      ? triggerRef
                      : undefined
                  }
                  type="button"
                  className="research-card__arrow"
                  aria-label={`Explore ${area.title}`}
                  aria-haspopup="dialog"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget
                    setActiveArea(area)
                  }}
                >
                  <span aria-hidden="true">↗</span>
                </button>
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

      {activeArea && (
        <ResearchModal
          area={activeArea}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}

export default Research