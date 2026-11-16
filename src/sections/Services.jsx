import services from '../data/services'

function Services() {
  return (
    <section id="services" className="bg-[var(--bg-primary)] px-6 py-28 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B35]">
              What We Do
            </p>

            <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
              OUR SERVICES<span className="text-[#FF6B35]">.</span>
            </h2>
          </div>

          <p className="max-w-sm text-[var(--text-secondary)]">
            From strategy to execution, we create digital solutions
            that move businesses forward.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex min-h-[350px] flex-col border border-[var(--border-primary)] p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
            >
              <span className="text-sm font-semibold text-[#FF6B35]">
                / {service.number}
              </span>

              <h3 className="mt-12 text-3xl font-bold">
                {service.title}
              </h3>

              <p className="mt-5 leading-relaxed text-[var(--text-secondary)] group-hover:text-[var(--bg-primary)]">
                {service.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-primary)] px-3 py-1 text-xs group-hover:border-current"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services