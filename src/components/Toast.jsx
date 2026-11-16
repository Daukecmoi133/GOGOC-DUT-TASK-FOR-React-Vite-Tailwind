import { useEffect } from 'react'

/**
 * Toast notification nổi ở góc màn hình với hiệu ứng trượt và tự biến mất
 */
export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast || !toast.show) return

    const timer = setTimeout(() => {
      onClose()
    }, toast.duration || 4000)

    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast || !toast.show) return null

  const typeStyles = {
    success: {
      bg: 'bg-neutral-900 border-[#FF6B35]/40 text-white',
      accent: 'text-[#FF6B35]',
      bar: 'bg-[#FF6B35]',
      icon: (
        <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-neutral-900 border-red-500/40 text-white',
      accent: 'text-red-400',
      bar: 'bg-red-500',
      icon: (
        <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    info: {
      bg: 'bg-neutral-900 border-blue-500/40 text-white',
      accent: 'text-blue-400',
      bar: 'bg-blue-500',
      icon: (
        <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  }

  const currentStyle = typeStyles[toast.type] || typeStyles.success

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-6 right-6 z-[120] max-w-md animate-bounce-subtle"
    >
      <div
        className={`relative overflow-hidden rounded-xl border p-4 shadow-2xl backdrop-blur-md transition-all ${currentStyle.bg}`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0 rounded-full bg-white/10 p-1">
            {currentStyle.icon}
          </div>

          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold tracking-wide">
              {toast.title || (toast.type === 'error' ? 'Notice' : 'Success')}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-300">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="shrink-0 rounded p-1 text-neutral-400 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Thanh đếm thời gian tự đóng */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className={`h-full ${currentStyle.bar} animate-shrink-bar`}
            style={{
              animationDuration: `${toast.duration || 4000}ms`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Toast
