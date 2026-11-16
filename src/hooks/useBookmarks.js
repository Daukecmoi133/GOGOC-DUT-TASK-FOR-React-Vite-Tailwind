import { useEffect, useState } from 'react'

const STORAGE_KEY = 'nexa_bookmarked_projects'

/**
 * Hook quản lý danh sách Bookmark (Dự án đã lưu) lưu trữ trong localStorage
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Lưu vào localStorage khi bookmarks thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    } catch (err) {
      console.error('Failed to save bookmarks to localStorage', err)
    }
  }, [bookmarks])

  // Lắng nghe thay đổi storage từ các tab khác
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          setBookmarks(JSON.parse(event.newValue))
        } catch {
          // ignore error
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        return prev.filter((item) => item !== id)
      }
      return [...prev, id]
    })
  }

  const isBookmarked = (id) => bookmarks.includes(id)

  const clearBookmarks = () => setBookmarks([])

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    clearBookmarks,
    bookmarkCount: bookmarks.length,
  }
}

export default useBookmarks
