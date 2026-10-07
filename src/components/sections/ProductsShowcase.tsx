import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'
import { products } from '../../data/products'

import './ProductsShowcase.css'

function ProductsShowcase() {
  const sectionRef =
    useRef<HTMLElement>(null)

  const stageRef =
    useRef<HTMLDivElement>(null)

  const viewportRef =
    useRef<HTMLDivElement>(null)

  const trackRef =
    useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section =
        sectionRef.current

      const stage =
        stageRef.current

      const viewport =
        viewportRef.current

      const track =
        trackRef.current

      if (
        !section ||
        !stage ||
        !viewport ||
        !track
      ) {
        return
      }

      const media =
        gsap.matchMedia()

      media.add(
        '(min-width: 701px)',
        () => {
          const getHorizontalDistance =
            () => {
              return Math.max(
                track.scrollWidth -
                  viewport.clientWidth,
                0,
              )
            }
          gsap.set(track, {
            x: 0,
          })

          const timeline =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,

                start: 'top top',
                end: () =>
                  `+=${getHorizontalDistance()}`,

                pin: stage,

                scrub: 1,

                anticipatePin: 1,

                invalidateOnRefresh: true,
              },
            })

          timeline.to(
            track,
            {
              x: () =>
                -getHorizontalDistance(),

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
        },
      )

      return () => {
        media.revert()
      }
    },
    {
      scope: sectionRef,
    },
  )

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
            {products.map(
              (product, index) => (
                <article
                  key={product.number}
                  className={`product-card product-card--${
                    index + 1
                  }`}
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
                      loading={
                        index === 0
                          ? 'eager'
                          : 'lazy'
                      }
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
                      >
                        <span>
                          EXPLORE
                        </span>

                        <span>
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              ),
            )}
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
    </section>
  )
}

export default ProductsShowcase