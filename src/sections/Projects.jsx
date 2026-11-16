import { useEffect, useState } from 'react'
import projects from '../data/projects'

const categories = [
  'All',
  'Web Development',
  'UI/UX Design',
  'AI & Data',
]

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

  // Kết hợp điều kiện category và search
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' ||
      project.category === activeCategory

    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Xử lý phím Escape và khóa scroll khi modal mở
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  return (
    <section id="projects" className="bg-[#171717] px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B35]">
            Selected Works
          </p>

          <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
            OUR PROJECTS<span className="text-[#FF6B35]">.</span>
          </h2>

          <p className="mt-5 max-w-md text-white/50">
            A selection of creative concepts and digital experiences.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search projects..."
            className="w-full border-b border-white/30 bg-transparent px-2 py-4 text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#FF6B35]"
          />
        </div>

        {/* Category filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                activeCategory === category
                  ? 'border-[#FF6B35] bg-[#FF6B35] text-white'
                  : 'border-white/30 text-white/70 hover:border-[#FF6B35] hover:text-[#FF6B35]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mb-6 text-sm text-white/50">
          Showing {filteredProjects.length} projects
        </p>

        {/* Project cards */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group text-left"
              >
                <div className="aspect-[16/10] overflow-hidden bg-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-widest text-[#FF6B35]">
                      {project.category}
                    </p>

                    <h3 className="text-2xl font-bold">
                      {project.title}
                    </h3>
                  </div>

                  <span className="text-2xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl font-semibold">No projects found.</p>
            <p className="mt-2 text-sm text-white/50">
              Try another keyword or category.
            </p>
          </div>
        )}
      </div>

      {/* Project detail modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop là button thật để bấm ra ngoài thì đóng modal */}
          <button
            type="button"
            aria-label="Close modal backdrop"
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 h-full w-full cursor-default border-none bg-black/80"
          />

          {/* Thẻ <dialog open> chuẩn HTML5 thay cho role="dialog" */}
          <dialog
            open
            aria-labelledby="project-modal-title"
            className="relative z-10 m-0 max-h-[90vh] w-full max-w-2xl overflow-y-auto border-none bg-[#F5F1EB] p-6 text-[#171717] md:p-10"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
              className="absolute right-5 top-5 text-2xl hover:text-[#FF6B35]"
            >
              ×
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="mb-8 aspect-video w-full object-cover"
            />

            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">
              {selectedProject.category} · {selectedProject.year}
            </p>

            <h3
              id="project-modal-title"
              className="mt-3 text-3xl font-bold md:text-4xl"
            >
              {selectedProject.title}
            </h3>

            <p className="mt-5 leading-relaxed text-[#737373]">
              {selectedProject.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D6D0C7] px-4 py-2 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </dialog>
        </div>
      )}
    </section>
  )
}

export default Projects