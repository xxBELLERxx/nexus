import { useRef, useState } from 'react'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useGSAP } from '@gsap/react'

import { gsap } from '../../lib/gsap'

import './Navbar.css'

type NavItem =
  | {
      label: string
      type: 'route'
      path: string
    }
  | {
      label: string
      type: 'section'
      sectionId: string
    }

const navItems: NavItem[] = [
  {
    label: 'TECHNOLOGY',
    type: 'section',
    sectionId: 'technology',
  },
  {
    label: 'PRODUCTS',
    type: 'section',
    sectionId: 'products',
  },
  {
    label: 'RESEARCH',
    type: 'route',
    path: '/research',
  },
  {
    label: 'COMPANY',
    type: 'route',
    path: '/company',
  },
  {
    label: 'CAREERS',
    type: 'route',
    path: '/careers',
  },
  {
    label: 'CONTACT',
    type: 'route',
    path: '/contact',
  },
]

function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  /*
   * ==========================================
   * NAVBAR INTRO
   * ==========================================
   */

  useGSAP(
    () => {
      if (!navRef.current) return

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reduceMotion) {
        gsap.set(
          [
            '.navbar__logo',
            '.navbar__links > *',
            '.navbar__menu',
          ],
          {
            autoAlpha: 1,
            y: 0,
          },
        )

        return
      }

      const intro = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      intro
        .from('.navbar__logo', {
          autoAlpha: 0,
          y: -12,
          duration: 0.5,
        })
        .from(
          '.navbar__links > *',
          {
            autoAlpha: 0,
            y: -10,
            duration: 0.4,
            stagger: 0.05,
          },
          '-=0.2',
        )
        .from(
          '.navbar__menu',
          {
            autoAlpha: 0,
            y: -10,
            duration: 0.4,
          },
          '-=0.25',
        )
    },
    {
      scope: navRef,
    },
  )

  /*
   * ==========================================
   * MOBILE MENU ANIMATION
   * ==========================================
   */

  useGSAP(
    () => {
      if (!navRef.current) return

      const menu =
        navRef.current.querySelector(
          '.navbar__mobile-menu',
        )

      if (!menu) return

      if (isOpen) {
        gsap.set(menu, {
          display: 'flex',
        })

        gsap.fromTo(
          menu,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
        )

        gsap.fromTo(
          '.navbar__mobile-link',
          {
            autoAlpha: 0,
            y: 35,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.1,
          },
        )
      } else {
        gsap.to(menu, {
          autoAlpha: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(menu, {
              display: 'none',
            })
          },
        })
      }
    },
    {
      scope: navRef,
      dependencies: [isOpen],
    },
  )

  /*
   * ==========================================
   * HELPERS
   * ==========================================
   */

  const closeMenu = () => {
    setIsOpen(false)
  }

  /*
   * Scroll to top of Home.
   */
  const handleLogoClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault()

    closeMenu()

    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    navigate('/')
  }

  /*
   * Scroll to a section on Home.
   *
   * If we are already on Home,
   * scroll immediately.
   *
   * If we are on another page,
   * navigate to Home first and then
   * scroll to the requested section.
   */
  const scrollToSection = (
    sectionId: string,
  ) => {
    closeMenu()

    if (location.pathname === '/') {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

      return
    }

    navigate('/')

    window.setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 100)
  }

  /*
   * Normal route navigation.
   */
  const navigateToPage = (
    path: string,
  ) => {
    closeMenu()

    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    navigate(path)
  }

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <nav
      ref={navRef}
      className={`navbar ${
        isOpen
          ? 'navbar--open'
          : ''
      }`}
    >
      <div className="navbar__inner">
        {/* ======================================
            LOGO
        ====================================== */}

        <a
          href="/"
          className="navbar__logo"
          onClick={handleLogoClick}
          aria-label="NEXUS — Home"
        >
          <span className="navbar__logo-mark">
            N
          </span>

          <span className="navbar__logo-text">
            NEXUS
          </span>
        </a>

        {/* ======================================
            DESKTOP NAVIGATION
        ====================================== */}

        <div className="navbar__links">
          {navItems.map((item) => {
            if (item.type === 'section') {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="navbar__link navbar__section-link"
                  onClick={() =>
                    scrollToSection(
                      item.sectionId,
                    )
                  }
                >
                  {item.label}
                </button>
              )
            }

            return (
              <button
                key={item.label}
                type="button"
                className={`navbar__link ${
                  location.pathname ===
                  item.path
                    ? 'navbar__link--active'
                    : ''
                }`}
                onClick={() =>
                  navigateToPage(
                    item.path,
                  )
                }
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* ======================================
            MENU BUTTON
        ====================================== */}

        <button
          type="button"
          className="navbar__menu"
          aria-label={
            isOpen
              ? 'Close navigation'
              : 'Open navigation'
          }
          aria-expanded={isOpen}
          onClick={() =>
            setIsOpen(
              (value) => !value,
            )
          }
        >
          <span />
          <span />
        </button>
      </div>

      {/* ========================================
          MOBILE MENU
      ======================================== */}

      <div className="navbar__mobile-menu">
        <div className="navbar__mobile-header">
          <span>
            NAVIGATION
          </span>

          <span>
            NEXUS / SYSTEM
          </span>
        </div>

        <div className="navbar__mobile-links">
          {/* HOME */}

          <button
            type="button"
            className="navbar__mobile-link"
            onClick={() => {
              closeMenu()

              if (
                location.pathname === '/'
              ) {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              } else {
                navigate('/')
              }
            }}
          >
            <span>00</span>
            <span>HOME</span>
            <span>↗</span>
          </button>

          {/* NAVIGATION ITEMS */}

          {navItems.map(
            (item, index) => {
              if (
                item.type ===
                'section'
              ) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="navbar__mobile-link"
                    onClick={() =>
                      scrollToSection(
                        item.sectionId,
                      )
                    }
                  >
                    <span>
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </span>

                    <span>
                      {item.label}
                    </span>

                    <span>
                      ↗
                    </span>
                  </button>
                )
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`navbar__mobile-link ${
                    location.pathname ===
                    item.path
                      ? 'navbar__mobile-link--active'
                      : ''
                  }`}
                  onClick={() =>
                    navigateToPage(
                      item.path,
                    )
                  }
                >
                  <span>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <span>
                    {item.label}
                  </span>

                  <span>
                    ↗
                  </span>
                </button>
              )
            },
          )}
        </div>

        <div className="navbar__mobile-footer">
          <span>
            HUMAN × MACHINE
          </span>

          <span>
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar