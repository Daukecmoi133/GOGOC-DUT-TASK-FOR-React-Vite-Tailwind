import { useEffect } from 'react'
import useScrollLock from '../hooks/useScrollLock'

/**
 * Mobile Drawer trượt từ bên phải với Backdrop, phím Escape và khóa Scroll Lock chống giật
 */
export function MobileDrawer({
  isOpen,
  onClose,
  navItems,
  activeSection,
  theme,
  onToggleTheme,
  bookmarkCount,
  onSelectBookmarkFilter,
}) {
  // Khóa cuộn trang khi drawer mở
  useScrollLock(isOpen)

  // Lắng nghe phím Escape để đóng drawer
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[110] flex justify-end md:hidden"
    >
      {/* Backdrop mờ - Click ra ngoài để đóng */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content trượt ra */}
      <div className="relative z-10 flex h-full w-[80%] max-w-sm flex-col justify-between border-l border-white/10 bg-[#171717] p-6 text-white shadow-2xl transition-transform duration-300">
        <div>
          {/* Header của Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <a
              href="#top"
              onClick={onClose}
              className="text-2xl font-bold tracking-tighter"
            >
              NEXA<span className="text-[#FF6B35]">.</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu (Press Esc)"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl transition-colors hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              ✕
            </button>
          </div>

          {/* Danh sách Links */}
          <div className="mt-8 flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between text-lg font-medium transition-colors ${
                    isActive ? 'font-bold text-[#FF6B35]' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-neutral-500">→</span>
                </a>
              )
            })}

            {/* Mục Saved Projects nếu có */}
            {bookmarkCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  onClose()
                  if (onSelectBookmarkFilter) onSelectBookmarkFilter()
                }}
                className="flex items-center justify-between rounded-lg bg-white/5 p-3 text-left text-sm font-semibold text-[#FF6B35] transition hover:bg-white/10"
              >
                <span>❤️ Saved Projects</span>
                <span className="rounded-full bg-[#FF6B35] px-2 py-0.5 text-xs text-white">
                  {bookmarkCount}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Footer của Drawer */}
        <div className="space-y-4 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => {
              onToggleTheme()
            }}
            className="flex w-full items-center justify-between rounded-full border border-white/20 px-5 py-3 text-sm font-medium transition-colors hover:border-[#FF6B35]"
          >
            <span>Appearance</span>
            <span>{theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
          </button>

          <a
            href="#contact"
            onClick={onClose}
            className="block w-full rounded-full bg-[#FF6B35] py-3.5 text-center text-sm font-bold text-white transition-transform hover:scale-102"
          >
            Let&apos;s Talk ↗
          </a>

          <p className="text-center text-xs text-neutral-500">
            Esc to close · © 2026 NEXA DIGITAL
          </p>
        </div>
      </div>
    </div>
  )
}

export default MobileDrawer
