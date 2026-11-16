import { useEffect } from 'react'

/**
 * Hook khóa và ẩn toàn bộ thanh cuộn của trang web khi Modal hoặc Drawer mở,
 * đồng thời bù padding-right để chống giật layout (layout shift).
 * @param {boolean} isLocked Trạng thái khóa
 */
export function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return

    const originalBodyOverflow = document.body.style.overflow
    const originalBodyPaddingRight = document.body.style.paddingRight
    const originalHtmlOverflow = document.documentElement.style.overflow

    // Tính bề rộng thanh cuộn của trình duyệt
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    // Khóa và ẩn hoàn toàn thanh cuộn trên cả html và body
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.body.style.paddingRight = originalBodyPaddingRight
      document.documentElement.style.overflow = originalHtmlOverflow
    }
  }, [isLocked])
}

export default useScrollLock
