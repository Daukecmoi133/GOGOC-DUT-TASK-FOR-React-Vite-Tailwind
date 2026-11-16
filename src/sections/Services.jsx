import services from '../data/services'

function Services() {
  return (
    <section id="services" className="bg-[#F5F1EB] px-6 py-28">
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

          <p className="max-w-sm text-[#737373]">
            From strategy to execution, we create digital solutions
            that move businesses forward.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex min-h-[350px] flex-col border border-[#D6D0C7] p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-[#171717] hover:text-white"
            >
              <span className="text-sm font-semibold text-[#FF6B35]">
                / {service.number}
              </span>

              <h3 className="mt-12 text-3xl font-bold">
                {service.title}
              </h3>

              <p className="mt-5 leading-relaxed text-[#737373] group-hover:text-white/60">
                {service.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#D6D0C7] px-3 py-1 text-xs group-hover:border-white/30"
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