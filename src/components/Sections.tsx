import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Clock, Eye, FileText, Layers, MessageSquare, Minus, Plus, Search, ShieldCheck } from 'lucide-react'
import { Button, Card, Eyebrow, Reveal, Section, SectionHeading } from './ui'
import LeadForm from './LeadForm'

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2z" className="fill-primary" />
      </svg>
      <span className="text-lg">Northstar</span>
    </a>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-6" aria-label="Main">
          <a href="#how-it-works" className="hidden text-sm font-medium text-muted transition hover:text-ink md:block">How it works</a>
          <a href="#faq" className="hidden text-sm font-medium text-muted transition hover:text-ink md:block">FAQ</a>
          <Button href="#get-started" size="sm">Get Started</Button>
        </nav>
      </div>
    </header>
  )
}

export function Hero() {
  const points = [
    'A plain-English summary of where your books stand',
    'A clear scope and estimate before any work begins',
    'One point of contact from start to finish',
  ]
  return (
    <section id="top" className="pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Bookkeeping for small business owners</Eyebrow>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Clear books and calm month-ends for owner-run businesses
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Northstar keeps your records accurate and up to date, so you can make decisions with confidence and stop
            dreading tax season.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#get-started" size="lg" className="w-full sm:w-auto">
              Get Your Free Estimate
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
              See how it works
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">Free estimate. No obligation. Takes about a minute to request.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-muted">What you can expect</p>
            <ul className="grid gap-5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium leading-snug">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function PainPoints() {
  const items = [
    { icon: Layers, title: 'Receipts and statements pile up', text: 'Records get pushed aside until they turn into a weekend-long clean-up.' },
    { icon: Search, title: 'You are not sure where you stand', text: 'Without current numbers, every spending decision feels like a guess.' },
    { icon: Clock, title: 'Admin steals your best hours', text: 'Time spent on paperwork is time not spent on your customers.' },
  ]
  return (
    <Section tone="alt">
      <SectionHeading eyebrow="The problem" title="Sound familiar?" />
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06}>
            <div className="border-t-2 border-ink/10 pt-5">
              <it.icon className="mb-4 h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{it.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-12 flex items-center gap-2 text-lg font-medium">
        There is a simpler way to handle it.
        <ArrowRight className="h-5 w-5 rotate-90 text-primary md:rotate-0" aria-hidden="true" />
      </p>
    </Section>
  )
}

export function Benefits() {
  const items = [
    { icon: Clock, title: 'Time back', text: 'Hand off the routine work and get your evenings and weekends back.' },
    { icon: Eye, title: 'Numbers you can read', text: 'Simple reports that show what is coming in, what is going out, and what is left.' },
    { icon: ShieldCheck, title: 'Ready for tax time', text: 'Organized records mean fewer surprises and a smoother handoff to your accountant.' },
    { icon: MessageSquare, title: 'A real person', text: 'Questions go to someone who knows your business, not a ticket queue.' },
  ]
  return (
    <Section>
      <SectionHeading eyebrow="The solution" title="Less paperwork. More clarity.">
        Northstar takes care of the books so you can focus on running the business.
      </SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.05}>
            <Card className="h-full transition hover:border-primary/30">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <it.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{it.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function HowItWorks() {
  const steps = [
    { n: '01', title: 'Tell us what you need', text: 'Fill out the short form. It takes about a minute.' },
    { n: '02', title: 'We create the right solution', text: 'We review your request and outline a plan that fits your business.' },
    { n: '03', title: 'Get the result', text: 'Your books are organized and you know exactly where you stand.' },
  ]
  return (
    <Section id="how-it-works" tone="alt">
      <SectionHeading eyebrow="How it works" title="Three steps, no complicated setup" />
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div className="flex gap-5 md:block">
              <span className="text-3xl font-semibold tabular-nums text-accent md:mb-4 md:block">{s.n}</span>
              <div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function CTA() {
  return (
    <section className="bg-primary py-14 text-white md:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Get a clear plan for your books</h2>
          <p className="mt-3 text-lg text-white/80">Tell us what you need and we will put together a free estimate.</p>
        </div>
        <Button href="#get-started" variant="inverse" size="lg" className="w-full md:w-auto">
          Get Your Free Estimate
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </section>
  )
}

export function FormSection() {
  const next = ['We review your request', 'Someone contacts you to talk through the details', 'You get a clear plan and estimate']
  return (
    <Section id="get-started" tone="alt">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Get started</Eyebrow>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Request your free estimate</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            A few quick details is all we need to point you in the right direction.
          </p>
          <ul className="mt-8 grid gap-4">
            {next.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="font-medium leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <LeadForm />
        </Reveal>
      </div>
    </Section>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-14 w-full items-center justify-between gap-4 rounded-md py-5 text-left text-base font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 sm:text-lg"
        >
          {q}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted">
            {open ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const faqs = [
    { q: 'How does it work?', a: 'You send a short request. We review it, reach out to talk through your situation, and share a plan and estimate. Work only starts after you approve it.' },
    { q: 'How long does it take?', a: 'You will hear back after submitting the form. How long the work itself takes depends on the scope, and we confirm that in your plan.' },
    { q: 'What does it cost?', a: 'It depends on what you need. The estimate is free, and you will see the full cost before anything begins.' },
    { q: 'What happens after I submit the form?', a: 'You will see a confirmation right away, then someone from our team will contact you to talk through the details. There is no obligation.' },
  ]
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Common questions" center />
        <div className="border-t border-line">
          {faqs.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>
      </div>
    </Section>
  )
}

export function FinalCTA() {
  return (
    <Section className="pt-0 md:pt-0">
      <Reveal>
        <div className="rounded-2xl bg-surface px-6 py-14 text-center md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted">Send a quick request and we will take it from there.</p>
          <Button href="#get-started" size="lg" className="mt-8 w-full sm:w-auto">
            Get Your Free Estimate
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Logo />
        <p className="text-sm text-muted">&copy; {new Date().getFullYear()} Northstar. All rights reserved.</p>
        <nav className="flex gap-6 text-sm text-muted" aria-label="Legal">
          <a href="#top" className="transition hover:text-ink">Privacy Policy</a>
          <a href="#top" className="transition hover:text-ink">Terms</a>
        </nav>
      </div>
    </footer>
  )
}
