import { useState } from 'react'
import faqs from '../data/faqs'

const categories = ['All', 'Services', 'Process', 'Engagement', 'Pricing']

export function Faq() {
  // Quản lý danh sách ID đang mở để hỗ trợ mở nhiều câu hoặc 1 câu
  const [openIds, setOpenIds] = useState([1]) // Mặc định mở câu 1
  const [activeCategory, setActiveCategory] = useState('All')
  const [allowMultiple, setAllowMultiple] = useState(true)

  const toggleFAQ = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  const expandAll = () => {
    const allFilteredIds = filteredFaqs.map((f) => f.id)
    setOpenIds(allFilteredIds)
  }

  const collapseAll = () => {
    setOpenIds([])
  }

  const filteredFaqs =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory)

  return (
    <section
      id="faq"
      className="bg-[var(--bg-primary)] px-6 py-28 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Cột trái: Tiêu đề & Giới thiệu */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B35]">
                Got Questions?
              </p>

              <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
                FREQUENTLY
                <br />
                ASKED
                <br />
                QUESTIONS<span className="text-[#FF6B35]">.</span>
              </h2>

              <p className="mt-6 max-w-sm leading-relaxed text-[var(--text-secondary)]">
                Everything you need to know about working with NEXA DIGITAL, from our
                design process to project timelines and costs.
              </p>

              {/* Tùy chọn Accordion controls */}
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={expandAll}
                  className="rounded-full border border-[var(--border-primary)] px-3 py-1.5 font-medium transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                >
                  Expand All
                </button>

                <button
                  type="button"
                  onClick={collapseAll}
                  className="rounded-full border border-[var(--border-primary)] px-3 py-1.5 font-medium transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
                >
                  Collapse All
                </button>

                <label className="ml-2 flex cursor-pointer items-center gap-2 text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    checked={allowMultiple}
                    onChange={(e) => {
                      setAllowMultiple(e.target.checked)
                      if (!e.target.checked && openIds.length > 1) {
                        setOpenIds(openIds.slice(0, 1))
                      }
                    }}
                    className="accent-[#FF6B35]"
                  />
                  <span>Multi-expand</span>
                </label>
              </div>

              {/* Direct inquiry box */}
              <div className="mt-10 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 shadow-sm">
                <h4 className="font-bold text-[var(--text-primary)]">
                  Still have questions?
                </h4>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Can&apos;t find the answer you&apos;re looking for? Reach out directly.
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#FF6B35] hover:underline"
                >
                  <span>Chat with our team</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Cột phải: Bộ lọc category & Danh sách Accordion */}
          <div className="lg:col-span-7">
            {/* Filter tags theo topic */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-[#FF6B35] text-white shadow'
                      : 'border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[#FF6B35]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="divide-y divide-[var(--border-primary)] rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-6 shadow-sm">
              {filteredFaqs.map((faq) => {
                const isOpen = openIds.includes(faq.id)

                return (
                  <div key={faq.id} className="py-2 first:pt-4 last:pb-4">
                    <button
                      type="button"
                      onClick={() => toggleFAQ(faq.id)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-[var(--bg-primary)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF6B35]">
                          {faq.category}
                        </span>
                        <span className="text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-[#FF6B35] md:text-lg">
                          {faq.question}
                        </span>
                      </div>

                      {/* Rotating Chevron Icon mượt mà */}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-primary)] text-sm transition-transform duration-300 ${
                          isOpen
                            ? 'rotate-180 border-[#FF6B35] bg-[#FF6B35] text-white'
                            : 'text-[var(--text-secondary)] group-hover:border-[#FF6B35] group-hover:text-[#FF6B35]'
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Smooth CSS Grid Height Transition (0fr -> 1fr) */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pt-1 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
