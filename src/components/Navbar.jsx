
import { useEffect, useState } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#projects' },
    { label: 'FAQ', href: '#faq' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#171717] text-white shadow-lg'
          : 'bg-transparent text-[#171717]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="#top"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tighter"
        >
          NEXA<span className="text-[#FF6B35]">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-[#FF6B35]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 md:block"
        >
          Let's Talk ↗
        </a>

        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-5 bg-[#171717] px-6 pb-7 text-white md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="hover:text-[#FF6B35]"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className="font-semibold text-[#FF6B35]"
          >
            Let's Talk ↗
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
