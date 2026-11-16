import { useState } from 'react'
import MobileDrawer from './MobileDrawer'
import useScrollSpy from '../hooks/useScrollSpy'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar({ theme, onToggleTheme, bookmarkCount = 0, onSelectBookmarkFilter }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { scrolled, scrollProgress, activeSection } = useScrollSpy(
    ['about', 'services', 'projects', 'faq', 'contact'],
    40
  )

  const isDark = theme === 'dark'

  // Dynamic glassmorphism style based on scroll & current theme
  const navStyle = scrolled
    ? isDark
      ? 'bg-[#171717]/85 text-white border-b border-white/10 shadow-lg backdrop-blur-md'
      : 'bg-[#F5F1EB]/85 text-[#171717] border-b border-[#D6D0C7]/70 shadow-sm backdrop-blur-md'
    : isDark
      ? 'bg-transparent text-white'
      : 'bg-transparent text-[#171717]'

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${navStyle}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-1 text-2xl font-bold tracking-tighter"
          >
            <span>NEXA</span>
            <span className="text-[#FF6B35] transition-transform duration-300 group-hover:scale-150">.</span>
          </a>

          {/* Desktop Navigation with Active Section Spy */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors hover:text-[#FF6B35] ${
                    isActive ? 'font-semibold text-[#FF6B35]' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#FF6B35]" />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Action buttons (Right side) */}
          <div className="flex items-center gap-3">
            {/* Bookmark button badge (Desktop) */}
            {bookmarkCount > 0 && (
              <a
                href="#projects"
                onClick={onSelectBookmarkFilter}
                className="hidden items-center gap-1.5 rounded-full border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-3 py-1.5 text-xs font-semibold text-[#FF6B35] transition hover:bg-[#FF6B35] hover:text-white lg:inline-flex"
                title="View your saved projects"
              >
                <span>❤️</span>
                <span>{bookmarkCount} Saved</span>
              </a>
            )}

            {/* Dark / Light Mode Switcher */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="hidden items-center gap-1.5 rounded-full border border-current/20 px-3.5 py-1.5 text-xs font-medium transition hover:border-[#FF6B35] hover:text-[#FF6B35] md:inline-flex"
              aria-label="Toggle color theme"
            >
              <span>{isDark ? '☀️' : '🌙'}</span>
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {/* CTA Button */}
            <a
              href="#contact"
              className="hidden rounded-full bg-[#FF6B35] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#e05522] hover:shadow-lg md:inline-block"
            >
              Let&apos;s Talk ↗
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-current/20 text-xl transition-colors md:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={drawerOpen}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar (2px indicator) */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-[#FF6B35] via-amber-500 to-[#FF6B35] transition-[width] duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer (Slide-in with Esc & Scroll lock) */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={onToggleTheme}
        bookmarkCount={bookmarkCount}
        onSelectBookmarkFilter={onSelectBookmarkFilter}
      />
    </>
  )
}

export default Navbar
