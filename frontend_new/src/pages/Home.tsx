import { Features } from '../components/landing/Features'
import { Hero } from '../components/landing/Hero'
import { HowItWorks } from '../components/landing/HowItWorks'
import CTA from "../components/landing/CTA"
import Footer from "../components/landing/Footer"


function App() {
  return (
    <main
      className="min-h-screen w-full bg-[#ededed] p-3 sm:p-4"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
