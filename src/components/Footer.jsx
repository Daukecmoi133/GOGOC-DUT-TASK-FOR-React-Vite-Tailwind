
function Footer() {
  return (
    <footer className="bg-[#171717] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 border-b border-white/20 pb-12 md:flex-row">
          <div>
            <a href="#end" className="text-4xl font-bold tracking-tighter">
              NEXA<span className="text-[#FF6B35]">.</span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Turning bold ideas into digital experiences.
            </p>
          </div>

          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-[#FF6B35]">
              Explore
            </p>

            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a href="#about" className="hover:text-[#FF6B35]">About</a>
              <a href="#services" className="hover:text-[#FF6B35]">Services</a>
              <a href="#projects" className="hover:text-[#FF6B35]">Projects</a>
              <a href="#faq" className="hover:text-[#FF6B35]">FAQ</a>
              <a href="#contact" className="hover:text-[#FF6B35]">Contact</a>
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-[#FF6B35]">
              Let's Connect
            </p>

            <p className="text-sm text-white/60">
              Have a project in mind?
            </p>

            <a
              href="#contact"
              className="mt-3 inline-block font-semibold hover:text-[#FF6B35]"
            >
              Let's talk ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-8 text-xs text-white/40 md:flex-row">
          <p>© 2026 NEXA DIGITAL. All rights reserved.</p>
          <p>Designed with creativity. Built with technology.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
