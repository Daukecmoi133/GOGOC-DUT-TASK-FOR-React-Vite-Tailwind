import { useState } from 'react'

const budgetOptions = [
  { id: 'b1', label: '< $3,000', desc: 'MVP / Landing Page' },
  { id: 'b2', label: '$3k - $5k', desc: 'Standard Product' },
  { id: 'b3', label: '$5k - $10k', desc: 'Complex Platform' },
  { id: 'b4', label: '$10k+', desc: 'Enterprise / Custom' },
]

const timelineOptions = [
  { id: 't1', label: 'Urgent (< 1 month)' },
  { id: 't2', label: '1 - 3 months' },
  { id: 't3', label: 'Flexible timeline' },
]

export function Contact({ onShowToast, quoteProject = null, onClearQuoteProject = () => {} }) {
  const [formData, setFormData] = useState(() => ({
    name: '',
    email: '',
    phone: '',
    service: quoteProject ? quoteProject.category : '',
    budget: '',
    timeline: '',
    message: quoteProject
      ? `Hello NEXA team, I am interested in building a project similar to "${quoteProject.title}". Please send me a consultation and quote.`
      : '',
  }))

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Hàm kiểm tra tính hợp lệ của từng trường
  const validate = (values) => {
    const errs = {}

    // Validate Name
    if (!values.name.trim()) {
      errs.name = 'Please enter your full name.'
    } else if (values.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.'
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim()) {
      errs.email = 'Please provide an email address.'
    } else if (!emailRegex.test(values.email.trim())) {
      errs.email = 'Please enter a valid email (e.g. name@domain.com).'
    }

    // Validate Service
    if (!values.service) {
      errs.service = 'Please select a service you need.'
    }

    // Validate Message
    if (!values.message.trim()) {
      errs.message = 'Please provide details about your project.'
    } else if (values.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.'
    }

    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Xóa lỗi tức thời khi người dùng sửa
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const currentErrors = validate(formData)
    if (currentErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: currentErrors[name] }))
    }
  }

  const handleSelectBudget = (label) => {
    setFormData((prev) => ({ ...prev, budget: label }))
  }

  const handleSelectTimeline = (label) => {
    setFormData((prev) => ({ ...prev, timeline: label }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Đánh dấu tất cả các trường là đã chạm
    const allTouched = {
      name: true,
      email: true,
      service: true,
      message: true,
    }
    setTouched(allTouched)

    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Form Validation Error',
          message: 'Please review the highlighted fields before submitting.',
        })
      }
      return
    }

    // Bắt đầu Loading State
    setIsSubmitting(true)

    // Giả lập network request 1000ms
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Kích hoạt Toast notification thành công
      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'Quote Request Sent!',
          message: `Thank you, ${formData.name}! Our team will analyze your project details and get back to you within 24 hours.`,
          duration: 5000,
        })
      }

      // Reset form sạch sẽ
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
      })
      setTouched({})
      setErrors({})
      onClearQuoteProject()
    } catch {
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Submission Failed',
          message: 'An unexpected error occurred. Please try again.',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-[#FF6B35] px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Cột trái: Headline & Agency Mission */}
          <div className="lg:col-span-5">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-neutral-900">
              Get In Touch & Request a Quote
            </p>

            <h2 className="text-5xl font-bold leading-[0.95] tracking-tight text-neutral-950 md:text-7xl lg:text-8xl">
              LET&apos;S
              <br />
              MAKE IT
              <br />
              HAPPEN.
            </h2>

            <p className="mt-8 max-w-md text-base leading-relaxed text-neutral-900/80 md:text-lg">
              Have an ambitious vision or MVP in mind? Share your goals with us.
              We provide upfront scope definition, technical architecture, and transparent pricing.
            </p>

            <div className="mt-12 space-y-4 border-t border-black/10 pt-8 text-neutral-950">
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">📍</span>
                <span>Da Nang / Ho Chi Minh City · Global Remote</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">⚡</span>
                <span>Response guarantee within 24 business hours</span>
              </div>
            </div>
          </div>

          {/* Cột phải: Form Báo Giá & Liên Hệ */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#171717] p-8 text-white shadow-2xl md:p-10">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Tell us about your project.
                </h3>
                <p className="mt-2 text-xs text-neutral-400">
                  Fill in the details below to receive a customized estimate and technical consultation.
                </p>

                {/* Badge thông báo nếu form được điền từ Project cụ thể */}
                {quoteProject && (
                  <div className="mt-4 flex items-center justify-between rounded-lg border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-3.5 py-2 text-xs text-[#FF6B35]">
                    <span>
                      Prefilled reference: <strong>{quoteProject.title}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={onClearQuoteProject}
                      className="ml-2 text-xs underline hover:text-white"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name & Email Fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                      Your Name <span className="text-[#FF6B35]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Sarah Connor"
                      className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white outline-none transition ${
                        touched.name && errors.name
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-white/20 focus:border-[#FF6B35]'
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                      Work Email <span className="text-[#FF6B35]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="sarah@company.com"
                      className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white outline-none transition ${
                        touched.email && errors.email
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-white/20 focus:border-[#FF6B35]'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Interested Service <span className="text-[#FF6B35]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-lg border bg-[#171717] px-4 py-3 text-sm text-white outline-none transition ${
                      touched.service && errors.service
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/20 focus:border-[#FF6B35]'
                    }`}
                  >
                    <option value="">Select primary service</option>
                    <option value="Web Development">Web Development (React / Next.js / Fullstack)</option>
                    <option value="UI/UX Design">UI/UX Product Design & Design System</option>
                    <option value="AI & Data">AI & Data Solutions / Analytics Dashboard</option>
                    <option value="Full Project / MVP">End-to-End MVP (Design + Code)</option>
                  </select>
                  {touched.service && errors.service && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.service}</p>
                  )}
                </div>

                {/* Interactive Budget Range Cards */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Estimated Budget (USD)
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {budgetOptions.map((b) => {
                      const isSelected = formData.budget === b.label
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => handleSelectBudget(b.label)}
                          className={`rounded-xl border p-3 text-left transition ${
                            isSelected
                              ? 'border-[#FF6B35] bg-[#FF6B35]/20 text-white'
                              : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{b.label}</div>
                          <div className="mt-0.5 text-[10px] text-neutral-400">{b.desc}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Timeline Selection */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Target Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timelineOptions.map((t) => {
                      const isSelected = formData.timeline === t.label
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleSelectTimeline(t.label)}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                            isSelected
                              ? 'border-[#FF6B35] bg-[#FF6B35] text-white'
                              : 'border-white/15 bg-white/5 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Project Description Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Project Goals & Scope <span className="text-[#FF6B35]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us what you're building, target audience, key features..."
                    className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white outline-none transition ${
                      touched.message && errors.message
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/20 focus:border-[#FF6B35]'
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button with Loading Spinner */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#FF6B35] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-white hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Sending Your Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Request & Get Quote</span>
                      <span>↗</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-neutral-500">
                  🔒 Strictly confidential. We respect your privacy and sign NDAs upon request.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
