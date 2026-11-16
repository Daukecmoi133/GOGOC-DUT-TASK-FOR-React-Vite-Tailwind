import { useEffect } from 'react'
import useScrollLock from '../hooks/useScrollLock'

/**
 * Modal hiển thị chi tiết dự án với phím Escape, scroll lock, ẩn thanh cuộn và chuyển hướng báo giá
 */
export function ProjectModal({
  project,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onRequestQuote,
}) {
  // Khóa và ẩn hoàn toàn thanh cuộn trang nền khi modal mở
  useScrollLock(Boolean(project))

  // Đóng modal khi nhấn Escape
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      {/* Backdrop mờ - Click để đóng */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content - Ẩn thanh cuộn nhưng vẫn cuộn nội dung mượt mà */}
      <div className="no-scrollbar relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1e1e1e] p-6 text-white shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:p-8">
        {/* Nút đóng góc phải */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal (Press Esc)"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white transition hover:bg-[#FF6B35]"
        >
          ✕
        </button>

        {/* Ảnh Banner dự án */}
        <div className="relative mb-6 overflow-hidden rounded-xl bg-neutral-900">
          <img
            src={project.image}
            alt={project.title}
            className="aspect-video w-full object-cover"
          />

          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              type="button"
              onClick={() => onToggleBookmark(project.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-md transition ${
                isBookmarked
                  ? 'bg-[#FF6B35] text-white shadow'
                  : 'bg-black/60 text-white hover:bg-black/90'
              }`}
            >
              <span>{isBookmarked ? '❤️ Saved' : '🤍 Bookmark Project'}</span>
            </button>
          </div>
        </div>

        {/* Thông tin Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#FF6B35]">
          <span>{project.category}</span>
          <span>•</span>
          <span className="text-white/60">Delivered in {project.year}</span>
        </div>

        {/* Tiêu đề */}
        <h3
          id="project-modal-title"
          className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
        >
          {project.title}
        </h3>

        {/* Mô tả chi tiết */}
        <p className="mt-4 text-base leading-relaxed text-neutral-300">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Technologies & Deliverables
          </h4>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Báo giá dự án tương tự */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-400">
            Want a tailored solution like this for your brand?
          </p>

          <button
            type="button"
            onClick={() => {
              onClose()
              if (onRequestQuote) {
                onRequestQuote(project)
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white hover:text-neutral-900"
          >
            <span>Request Quote for Similar Project</span>
            <span>↗</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
