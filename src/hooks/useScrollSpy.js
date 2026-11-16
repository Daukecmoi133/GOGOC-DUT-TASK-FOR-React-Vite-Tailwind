import { useEffect, useState } from 'react'

/**
 * Hook theo dõi vị trí cuộn trang, thanh tiến trình đọc và section đang active
 * @param {string[]} sectionIds Danh sách ID các section cần theo dõi
 * @param {number} offset Ngưỡng pixel để kích hoạt trạng thái scrolled
 */
export function useScrollSpy(sectionIds = ['about', 'services', 'projects', 'faq', 'contact'], offset = 40) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > offset)

      // Tính toán tiến trình cuộn trang theo phần trăm (0 - 100%)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100))
        setScrollProgress(progress)
      }

      // Xác định section hiện tại
      // Header offset ~ 100px
      const scrollPosition = scrollY + 140
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(id)
            return
          }
        }
      }
      setActiveSection('')
    }

    // Chạy 1 lần ngay khi mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds, offset])

  return { scrolled, scrollProgress, activeSection }
}

export default useScrollSpy
