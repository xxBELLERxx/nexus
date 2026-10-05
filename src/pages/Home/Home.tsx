import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'

import Manifesto from './Manifesto'

import './Home.css'

function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .from('.hero__background', {
          scale: 1.12,
          duration: 2,
          opacity: 0,
        })
        .from(
          '.hero__eyebrow',
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=1.1',
        )
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
        .from(
          '.hero__description',
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.4',
        )
        .from(
          '.hero__button',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.25',
        )
    },
    {
      scope: heroRef,
    },
  )

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero__background" />

        <div className="hero__overlay" />

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

          <button className="hero__button">
            <span>EXPLORE</span>
            <span className="hero__button-arrow">→</span>
          </button>
        </div>

        <div className="hero__counter">
          <span>01 / 07</span>

          <div className="hero__progress">
            <span />
          </div>
        </div>

        <div className="hero__scroll">
          SCROLL TO EXPLORE
        </div>
      </section>

      <Manifesto />
    </>
  )
}

export default Home