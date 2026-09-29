import { Benefits, CTA, FAQ, FinalCTA, Footer, FormSection, Hero, HowItWorks, Navbar, PainPoints } from './components/Sections'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Benefits />
        <HowItWorks />
        <CTA />
        <FormSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
