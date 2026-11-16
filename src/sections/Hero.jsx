
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-primary)] px-6 pt-24 transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B35]">
          Independent Creative Digital Agency — 2026
        </p>

        <h1 className="max-w-5xl text-6xl leading-[0.95] font-bold tracking-tighter md:text-8xl lg:text-[110px]">
          WE TURN IDEAS
          <br />
          INTO DIGITAL
          <br />
          <span className="text-[#FF6B35]">REALITY.</span>
        </h1>

        <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)]">
            We build meaningful digital experiences through
            creative design, modern technology, and bold ideas.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-[var(--text-primary)] px-8 py-4 font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[#FF6B35] hover:text-white"
            >
              Explore Our Work ↗
            </a>

            <a
              href="#contact"
              className="rounded-full border border-[var(--text-primary)] px-8 py-4 font-semibold transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
            >
              Let's Talk
            </a>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-[var(--border-primary)] pt-6 text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)]">
          <span>Design · Development · Innovation</span>
          <span>Scroll to explore ↓</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
