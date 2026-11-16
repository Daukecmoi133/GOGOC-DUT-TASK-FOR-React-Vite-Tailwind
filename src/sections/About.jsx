function About() {
  return (
    <section id="about" className="bg-[#171717] px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B35]">
          Who We Are
        </p>

        <h2 className="max-w-5xl text-4xl leading-tight font-bold tracking-tight md:text-6xl">
          WE DON'T JUST BUILD WEBSITES. <span className="text-[#FF6B35]"> WE BUILD DIGITAL EXPERIENCES.</span>
        </h2>

        <div className="mt-16 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-2">
          <p className="text-2xl font-semibold">
            Turning bold ideas into digital experiences.
          </p>

          <p className="leading-relaxed text-white/60">
            NEXA DIGITAL is a creative digital agency concept focused on
            combining design, technology, and innovation. We believe
            great digital products should not only look good but also
            solve meaningful problems.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About