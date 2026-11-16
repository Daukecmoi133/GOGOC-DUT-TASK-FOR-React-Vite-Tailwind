
import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)

    setFormData({
      name: '',
      email: '',
      service: '',
      message: '',
    })
  }

  return (
    <section id="contact" className="bg-[#FF6B35] px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em]">
            Get In Touch
          </p>

          <h2 className="text-6xl font-bold leading-tight tracking-tight md:text-8xl">
            LET'S
            <br />
            MAKE IT
            <br />
            HAPPEN.
          </h2>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-black/70">
            Have an idea? Let's turn it into something meaningful.
            Tell us about your next project.
          </p>
        </div>

        <div className="bg-[#171717] p-8 text-white md:p-10">
          <h3 className="mb-8 text-2xl font-bold">
            Tell us about your project.
          </h3>

          {submitted && (
            <div
              role="status"
              className="mb-6 border border-green-500/50 bg-green-500/10 p-4 text-green-400"
            >
              Thank you! Your message has been received.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm">
                Your Name
              </label>

              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full border-b border-white/30 bg-transparent py-3 outline-none focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full border-b border-white/30 bg-transparent py-3 outline-none focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <label htmlFor="service" className="mb-2 block text-sm">
                Interested Service
              </label>

              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full border-b border-white/30 bg-[#171717] py-3 outline-none focus:border-[#FF6B35]"
              >
                <option value="">Select a service</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="AI & Data">AI & Data Solutions</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm">
                Your Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Tell us about your idea..."
                className="w-full resize-none border-b border-white/30 bg-transparent py-3 outline-none focus:border-[#FF6B35]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6B35] px-8 py-4 font-bold text-white transition-colors hover:bg-white hover:text-[#171717]"
            >
              Send Message ↗
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
