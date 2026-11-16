/**
 * ProjectCard hiển thị thông tin dự án, hình ảnh, tag và nút Bookmark yêu thích
 */
export function ProjectCard({ project, onSelect, isBookmarked, onToggleBookmark }) {
  const handleBookmarkClick = (e) => {
    e.stopPropagation()
    onToggleBookmark(project.id)
  }

  return (
    <div
      onClick={onSelect}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6B35]/50 hover:bg-white/[0.08] hover:shadow-xl"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      aria-label={`View details of ${project.title}`}
    >
      {/* Container ảnh */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-800">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Lớp phủ gradient nhẹ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

        {/* Nút Bookmark ở góc trên ảnh */}
        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          title={isBookmarked ? 'Saved to bookmarks' : 'Bookmark this project'}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all ${
            isBookmarked
              ? 'bg-[#FF6B35] text-white shadow-md scale-105'
              : 'bg-black/50 text-white/80 hover:bg-black/80 hover:text-white'
          }`}
        >
          <span className="text-base leading-none">
            {isBookmarked ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Badge năm thực hiện */}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      {/* Nội dung card */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">
            {project.category}
          </p>

          <span className="text-lg text-white/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF6B35]">
            ↗
          </span>
        </div>

        <h3 className="mt-2 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#FF6B35]">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/60">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
