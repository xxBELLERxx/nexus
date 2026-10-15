import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'
import { products, type Product } from '../../data/products'

import './ProductsShowcase.css'

function ProductsShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [activeProduct, setActiveProduct] =
    useState<Product | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)
  const modalBackdropRef = useRef<HTMLButtonElement>(null)
  const modalDialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const closingRef = useRef(false)

  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = stageRef.current
      const viewport = viewportRef.current
      const track = trackRef.current

      if (!section || !stage || !viewport || !track) {
        return
      }

      const media = gsap.matchMedia()

      media.add('(min-width: 701px)', () => {
        const getHorizontalDistance = () =>
          Math.max(
            track.scrollWidth - viewport.clientWidth,
            0,
          )

        gsap.set(track, {
          x: 0,
        })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getHorizontalDistance()}`,
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline.to(
          track,
          {
            x: () => -getHorizontalDistance(),
            ease: 'none',
            duration: 1,
          },
          0,
        )

        timeline.to(
          '.product-card__visual img',
          {
            xPercent: -8,
            ease: 'none',
            duration: 1,
          },
          0,
        )

        timeline.to(
          '.products__header-line',
          {
            scaleX: 1,
            duration: 1,
            ease: 'none',
          },
          0,
        )

        return () => {
          timeline.kill()
        }
      })

      return () => {
        media.revert()
      }
    },
    {
      scope: sectionRef,
    },
  )

  const openModal = (
    product: Product,
    trigger: HTMLButtonElement,
  ) => {
    closingRef.current = false
    openButtonRef.current = trigger
    setActiveProduct(product)
  }

  const closeModal = useCallback(() => {
    if (!activeProduct || closingRef.current) {
      return
    }

    const backdrop = modalBackdropRef.current
    const dialog = modalDialogRef.current

    if (!backdrop || !dialog) {
      setActiveProduct(null)
      return
    }

    closingRef.current = true

    gsap.timeline({
      onComplete: () => {
        setActiveProduct(null)
        closingRef.current = false

        openButtonRef.current?.focus()
      },
    })
      .to(
        backdrop,
        {
          autoAlpha: 0,
          duration: 0.22,
          ease: 'power2.in',
        },
      )
      .to(
        dialog,
        {
          autoAlpha: 0,
          y: 16,
          scale: 0.985,
          duration: 0.22,
          ease: 'power2.in',
        },
        0,
      )
  }, [activeProduct])

  useEffect(() => {
    if (!activeProduct || !modalRef.current) {
      return
    }

    const modal = modalRef.current

    const context = gsap.context(() => {
      gsap.fromTo(
        '.product-modal__backdrop',
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
      )

      gsap.fromTo(
        '.product-modal__dialog',
        {
          autoAlpha: 0,
          y: 24,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.05,
        },
      )

      gsap.fromTo(
        '.product-modal__reveal',
        {
          autoAlpha: 0,
          y: 12,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.18,
        },
      )
    }, modal)

    closeButtonRef.current?.focus()

    return () => {
      context.revert()
    }
  }, [activeProduct])

  useEffect(() => {
    if (!activeProduct) {
      return
    }

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

      if (event.key !== 'Tab' || !modalRef.current) {
        return
      }

      const focusableElements =
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        )

      if (!focusableElements.length) {
        return
      }

      const first = focusableElements[0]
      const last = focusableElements[
        focusableElements.length - 1
      ]

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
      document.body.style.overflow =
        previousBodyOverflow

      document.documentElement.style.overflow =
        previousHtmlOverflow

      document.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [activeProduct, closeModal])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="products"
    >
      <div
        ref={stageRef}
        className="products__stage"
      >
        <header className="products__header">
          <div>
            <span className="products__section-number">
              04
            </span>

            <span className="products__section-label">
              NEXUS PRODUCTS
            </span>
          </div>

          <span>
            DESIGNED FOR WHAT COMES NEXT
          </span>
        </header>

        <div className="products__intro">
          <span className="products__eyebrow">
            OUR SYSTEMS
          </span>

          <h2>
            INNOVATION
            <br />
            INTO
            <br />
            <span>REALITY.</span>
          </h2>

          <p>
            From personal intelligence to quantum
            computing. Every NEXUS system is
            designed as part of a larger ecosystem.
          </p>
        </div>

        <div
          ref={viewportRef}
          className="products__viewport"
        >
          <div
            ref={trackRef}
            className="products__track"
          >
            {products.map((product, index) => (
              <article
                key={product.number}
                className={`product-card product-card--${index + 1}`}
              >
                <div className="product-card__top">
                  <span>
                    {product.number}
                  </span>

                  <span>
                    {product.code}
                  </span>
                </div>

                <div className="product-card__visual">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  <div className="product-card__visual-overlay" />
                </div>

                <div className="product-card__content">
                  <span className="product-card__category">
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <div className="product-card__bottom">
                    <div>
                      <span className="product-card__metric">
                        {product.metric}
                      </span>

                      <span className="product-card__metric-label">
                        {product.metricLabel}
                      </span>
                    </div>

                    <button
                      className="product-card__button"
                      type="button"
                      aria-haspopup="dialog"
                      aria-label={`Explore ${product.name}`}
                      onClick={(event) => {
                        openModal(
                          product,
                          event.currentTarget,
                        )
                      }}
                    >
                      <span>
                        EXPLORE
                      </span>

                      <span aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <footer className="products__footer">
          <span>
            04 / 07
          </span>

          <div className="products__header-line" />

          <span>
            DRAG / SCROLL TO EXPLORE
          </span>

          <span>
            {products.length
              .toString()
              .padStart(2, '0')}{' '}
            SYSTEMS
          </span>
        </footer>
      </div>

      {activeProduct && (
        <div
          ref={modalRef}
          className="product-modal"
          role="presentation"
        >
          <button
            ref={modalBackdropRef}
            type="button"
            className="product-modal__backdrop"
            aria-label="Close product details"
            tabIndex={-1}
            onClick={closeModal}
          />

          <section
            ref={modalDialogRef}
            className="product-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            aria-describedby="product-modal-description"
          >
            {/* VISUAL */}

            <div className="product-modal__visual">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
              />

              <div className="product-modal__image-overlay" />

              <div className="product-modal__visual-grid" />

              <div className="product-modal__visual-meta">
                <span>
                  NEXUS SYSTEM
                </span>

                <span>
                  {activeProduct.code}
                </span>
              </div>

              <span className="product-modal__visual-index">
                {activeProduct.number} / {String(products.length).padStart(2, '0')}
              </span>
            </div>

            {/* CONTENT */}

            <div className="product-modal__content">
              <div className="product-modal__top product-modal__reveal">
                <span className="product-modal__eyebrow">
                  PRODUCT SPECIFICATION
                </span>

                <button
                  ref={closeButtonRef}
                  type="button"
                  className="product-modal__close"
                  aria-label="Close product details"
                  onClick={closeModal}
                >
                  <span>CLOSE</span>
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <span className="product-modal__category product-modal__reveal">
                <span />
                {activeProduct.category}
              </span>

              <h2
                id="product-modal-title"
                className="product-modal__title product-modal__reveal"
              >
                {activeProduct.name}
              </h2>

              <p
                id="product-modal-description"
                className="product-modal__description product-modal__reveal"
              >
                {activeProduct.description}
              </p>

              <div className="product-modal__specs product-modal__reveal">
                <div>
                  <span className="product-modal__spec-label">
                    PERFORMANCE METRIC
                  </span>

                  <span className="product-modal__spec-value">
                    {activeProduct.metric}
                  </span>

                  <span className="product-modal__spec-unit">
                    {activeProduct.metricLabel}
                  </span>
                </div>

                <div>
                  <span className="product-modal__spec-label">
                    SYSTEM IDENTIFIER
                  </span>

                  <span className="product-modal__spec-code">
                    {activeProduct.code}
                  </span>

                  <span className="product-modal__spec-unit">
                    NEXUS / ACTIVE SYSTEM
                  </span>
                </div>
              </div>

              <div className="product-modal__bottom product-modal__reveal">
                <span>
                  NEXUS // HUMAN × MACHINE
                </span>

                <a
                  href={`mailto:hello@nexus.systems?subject=${encodeURIComponent(
                    `Product inquiry: ${activeProduct.name}`,
                  )}`}
                  className="product-modal__inquiry"
                >
                  <span>REQUEST INFORMATION</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default ProductsShowcase