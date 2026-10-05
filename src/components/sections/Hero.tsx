import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Hero.css'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        // Фоновое изображение
        .from('.hero__background', {
          scale: 1.12,
          opacity: 0,
          duration: 2,
        })

        // Верхний label
        .from(
          '.hero__eyebrow',
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          '-=1.2',
        )

        // Заголовок
        .from(
          '.hero__title-line',
          {
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
          },
          '-=0.5',
        )

        // Описание
        .from(
          '.hero__description',
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.45',
        )

        // Кнопка
        .from(
          '.hero__button',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.25',
        )

        // Нижняя информация
        .from(
          '.hero__meta',
          {
            opacity: 0,
            duration: 0.8,
          },
          '-=0.2',
        )
    },
    {
      scope: heroRef,
    },
  )

  return (
    <section
      ref={heroRef}
      className="hero"
    >
      <div className="hero__background" />

      <div className="hero__overlay" />

      <div className="hero__noise" />

      <div className="hero__content">
        <p className="hero__eyebrow">
          NEXT GENERATION TECHNOLOGY
        </p>

        <h1 className="hero__title">
          <span className="hero__title-line">
            WE ENGINEER
          </span>

          <span className="hero__title-line">
            WHAT COMES
          </span>

          <span className="hero__title-line hero__title-line--accent">
            NEXT.
          </span>
        </h1>

        <p className="hero__description">
          NEXUS Technologies develops advanced systems
          designed to redefine the relationship between
          humans and machines.
        </p>

        <button
          className="hero__button"
          type="button"
          onClick={() => {
            document
              .getElementById('manifesto')
              ?.scrollIntoView({
                behavior: 'smooth',
              })
          }}
        >
          <span>EXPLORE</span>

          <span className="hero__button-arrow">
            →
          </span>
        </button>
      </div>

      <div className="hero__meta">
        <div className="hero__counter">
          <span>01 / 07</span>

          <div className="hero__progress">
            <span />
          </div>
        </div>

        <div className="hero__scroll">
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  )
}

export default Hero