import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(' ')

type Variant = 'primary' | 'secondary' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary/90',
  secondary: 'border border-line bg-white text-ink hover:bg-surface',
  inverse: 'bg-white text-primary hover:bg-white/90 focus-visible:ring-white/40',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-7 text-base',
}

type ButtonProps = {
  variant?: Variant
  size?: Size
  href?: string
  className?: string
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export function Button({ variant = 'primary', size = 'md', href, className, children, ...rest }: ButtonProps) {
  const cls = cx(base, variants[variant], sizes[size], className)
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function Section({
  id,
  children,
  className,
  tone = 'plain',
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: 'plain' | 'alt'
}) {
  return (
    <section
      id={id}
      className={cx('scroll-mt-16 py-16 md:py-24', tone === 'alt' && 'border-y border-line bg-surface', className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  center,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
  center?: boolean
}) {
  return (
    <div className={cx('mb-10 max-w-2xl md:mb-14', center && 'mx-auto text-center')}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted">{children}</p>}
    </div>
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('rounded-2xl border border-line bg-white p-6', className)}>{children}</div>
}
