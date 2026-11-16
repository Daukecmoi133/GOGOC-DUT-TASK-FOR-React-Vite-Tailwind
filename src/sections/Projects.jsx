import { useState, useMemo } from 'react'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import useDebounce from '../hooks/useDebounce'

const baseCategories = [
  'All',
  'Web Development',
  'UI/UX Design',
  'AI & Data',
]

export function Projects({
  activeCategory = 'All',
  onSelectCategory = () => {},
  bookmarks = [],
  isBookmarked = () => false,
  onToggleBookmark = () => {},
  onRequestQuote = () => {},
}) {
  const [searchInput, setSearchInput] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

  // Debounce giá trị tìm kiếm 250ms để tối ưu hiệu năng
  const debouncedSearch = useDebounce(searchInput, 250)

  // Tính số lượng dự án theo từng danh mục
  const categoryCounts = useMemo(() => {
    const counts = {
      All: projects.length,
      Saved: bookmarks.length,
    }
    baseCategories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = projects.filter((p) => p.category === cat).length
      }
    })
    return counts
  }, [bookmarks])

  // Lọc danh sách dự án với useMemo kết hợp Category, Bookmarks & Debounced Search
  const filteredProjects = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase()

    return projects.filter((project) => {
      // Điều kiện lọc theo Category hoặc Bookmarks
      let matchesCategory = false
      if (activeCategory === 'All') {
        matchesCategory = true
      } else if (activeCategory === 'Saved') {
        matchesCategory = bookmarks.includes(project.id)
      } else {
        matchesCategory = project.category === activeCategory
      }

      // Điều kiện tìm kiếm thông minh: title, description, category, tags
      const matchesSearch =
        term === '' ||
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.category.toLowerCase().includes(term) ||
        project.tags.some((tag) => tag.toLowerCase().includes(term))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, debouncedSearch, bookmarks])

  const clearFilters = () => {
    onSelectCategory('All')
    setSearchInput('')
  }

  const isSearching = searchInput !== debouncedSearch

  return (
    <section id="projects" className="bg-[#171717] px-6 py-28 text-white transition-colors">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B35]">
                Selected Works
              </p>
              <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
                OUR PROJECTS<span className="text-[#FF6B35]">.</span>
              </h2>
            </div>

            {/* Quick stats / Saved note */}
            {bookmarks.length > 0 && (
              <button
                type="button"
                onClick={() => onSelectCategory('Saved')}
                className="flex items-center gap-2 rounded-full border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-4 py-2 text-xs font-semibold text-[#FF6B35] transition hover:bg-[#FF6B35] hover:text-white"
              >
                <span>❤️</span>
                <span>You have {bookmarks.length} bookmarked project(s)</span>
              </button>
            )}
          </div>

          <p className="mt-5 max-w-md text-white/50">
            A curated selection of high-impact digital experiences, web apps, and brand solutions.
          </p>
        </div>

        {/* Search Bar with Debounce indicator & Clear button */}
        <div className="relative mb-8">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-white/40">
              {isSearching ? (
                <span className="inline-block animate-spin text-[#FF6B35]">⟳</span>
              ) : (
                '🔍'
              )}
            </span>

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search projects by title, tech stack (#React, #Python), or category..."
              className="w-full rounded-xl border border-white/20 bg-white/5 py-4 pl-11 pr-12 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#FF6B35] focus:bg-white/[0.08]"
            />

            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute right-4 text-xs font-bold text-white/50 hover:text-white"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs with Badges */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          {baseCategories.map((category) => {
            const count = categoryCounts[category] || 0
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'border-[#FF6B35] bg-[#FF6B35] text-white shadow-sm'
                    : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}

          {/* Tab Saved (Bookmarks) */}
          <button
            type="button"
            onClick={() => onSelectCategory('Saved')}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              activeCategory === 'Saved'
                ? 'border-[#FF6B35] bg-[#FF6B35] text-white shadow-sm'
                : 'border-white/20 text-white/70 hover:border-[#FF6B35] hover:text-[#FF6B35]'
            }`}
          >
            <span>❤️ Saved</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                activeCategory === 'Saved'
                  ? 'bg-black/30 text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {bookmarks.length}
            </span>
          </button>
        </div>

        {/* Counter feedback */}
        <div className="mb-6 flex items-center justify-between text-xs text-white/50">
          <span>
            Showing <strong className="text-white">{filteredProjects.length}</strong> of{' '}
            {projects.length} projects
            {debouncedSearch && ` matching "${debouncedSearch}"`}
          </span>

          {(searchInput || activeCategory !== 'All') && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[#FF6B35] underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={() => setSelectedProject(project)}
                isBookmarked={isBookmarked(project.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 py-20 text-center">
            <span className="text-4xl">📂</span>
            <p className="mt-4 text-xl font-bold">No projects matched your criteria.</p>
            <p className="mt-2 text-sm text-white/50">
              {activeCategory === 'Saved'
                ? "You haven't bookmarked any projects yet. Click the heart icon on any project to save it here!"
                : 'Try adjusting your search terms or selecting another category.'}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[#FF6B35] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isBookmarked={selectedProject ? isBookmarked(selectedProject.id) : false}
        onToggleBookmark={onToggleBookmark}
        onRequestQuote={onRequestQuote}
      />
    </section>
  )
}

export default Projects
