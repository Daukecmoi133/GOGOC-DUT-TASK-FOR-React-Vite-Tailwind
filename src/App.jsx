
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Faq from './sections/Faq'
import Contact from './sections/Contact'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
