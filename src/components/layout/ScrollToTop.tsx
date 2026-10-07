import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [pathname])

  return null
}

export default ScrollToTop