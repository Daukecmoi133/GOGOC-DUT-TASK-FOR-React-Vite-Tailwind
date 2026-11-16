import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'

import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Faq from './sections/Faq'
import Contact from './sections/Contact'

import useBookmarks from './hooks/useBookmarks'

function App() {
  // 1. Quản lý Dark / Light mode hỗ trợ System Preferences & localStorage
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
      }
      // Tự động nhận diện theme của hệ điều hành
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    } catch {
      // ignore
    }
    return 'light'
  })

  // Đồng bộ theme lên root DOM và localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  // Lắng nghe thay đổi theme từ hệ điều hành
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e) => {
      // Chỉ tự động đổi nếu user chưa set cứng trong localStorage
      const userChoice = localStorage.getItem('theme')
      if (!userChoice) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // 2. Quản lý Bookmarks dự án lưu trữ trong localStorage
  const { bookmarks, isBookmarked, toggleBookmark, bookmarkCount } = useBookmarks()

  // 3. Category đang active trong danh sách Projects
  const [activeCategory, setActiveCategory] = useState('All')

  // 4. Hệ thống Toast thông báo toàn cục
  const [toast, setToast] = useState({
    show: false,
    type: 'success',
    title: '',
    message: '',
  })

  const showToast = ({ type = 'success', title = '', message = '', duration = 4000 }) => {
    setToast({
      show: true,
      type,
      title,
      message,
      duration,
    })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }))
  }

  // 5. Dự án được chọn để yêu cầu báo giá
  const [quoteProject, setQuoteProject] = useState(null)

  const handleRequestQuote = (project) => {
    setQuoteProject(project)
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSelectBookmarkFilter = () => {
    setActiveCategory('Saved')
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-[#171717]' : 'bg-[#F5F1EB]'}`}>
      {/* 1. Navbar với cuộn đổi nền, Scroll Spy, Progress Bar & Mobile Drawer */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        bookmarkCount={bookmarkCount}
        onSelectBookmarkFilter={handleSelectBookmarkFilter}
      />

      <main>
        <Hero />
        <About />
        <Services />

        {/* 2. Projects với Filter / Debounce / Modal chi tiết / Bookmarks */}
        <Projects
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          bookmarks={bookmarks}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
          onRequestQuote={handleRequestQuote}
        />

        {/* 3. Accordion FAQ với CSS Grid transitions & Multi-expand */}
        <Faq />

        {/* 4. Form liên hệ / Báo giá với validation, loading & toast */}
        <Contact
          key={quoteProject ? quoteProject.id : 'default-quote'}
          onShowToast={showToast}
          quoteProject={quoteProject}
          onClearQuoteProject={() => setQuoteProject(null)}
        />
      </main>

      <Footer />

      {/* 5. Floating Toast Notification */}
      <Toast toast={toast} onClose={hideToast} />
    </div>
  )
}

export default App
