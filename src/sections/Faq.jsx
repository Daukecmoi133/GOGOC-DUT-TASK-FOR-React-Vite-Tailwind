import { useState } from 'react'
import faqs from '../data/faqs'

function Faq() {
  const [openId, setOpenId] = useState(null)

  const toggleFAQ = (id) => {
    setOpenId((currentId) => currentId === id ? null : id)
  }

  return (
    <section id="faq" className="bg-[#F5F1EB] px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B35]">
            Got Questions?
          </p>

          <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
            FREQUENTLY
            <br />
            ASKED
            <br />
            QUESTIONS<span className="text-[#FF6B35]">.</span>
          </h2>

          <p className="mt-6 max-w-sm leading-relaxed text-[#737373]">
            Everything you need to know about working with NEXA DIGITAL.
          </p>
        </div>

        <div>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id

            return (
              <div key={faq.id} className="border-b border-[#D6D0C7]">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-semibold">
                    {faq.question}
                  </span>

                  <span className="text-2xl text-[#FF6B35]">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <p className="max-w-xl pb-6 leading-relaxed text-[#737373]">
                    {faq.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Faq