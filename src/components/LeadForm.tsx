import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { AlertCircle, Check, ChevronDown, Loader2, Lock } from 'lucide-react'
import { Button, cx } from './ui'

type Values = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  need: string
  message: string
}
type Name = keyof Values
type Errors = Partial<Record<Name, string>>

const empty: Values = { firstName: '', lastName: '', email: '', phone: '', company: '', need: '', message: '' }

const needs = ['Monthly bookkeeping', 'Clean-up of past records', 'Tax-ready reports', 'Something else']

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.firstName.trim()) e.firstName = 'Please enter your first name.'
  if (!v.lastName.trim()) e.lastName = 'Please enter your last name.'
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (v.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a phone number we can reach you on.'
  if (!v.need) e.need = 'Choose the option that fits best.'
  return e
}

const control =
  'w-full rounded-lg border bg-white px-3.5 text-base text-ink outline-none transition placeholder:text-muted/70 focus:ring-4 disabled:bg-surface disabled:opacity-70'
const okState = 'border-line focus:border-primary focus:ring-primary/15'
const validState = 'border-success/60 focus:border-primary focus:ring-primary/15'
const errState = 'border-danger focus:border-danger focus:ring-danger/15'

type FieldProps = {
  name: Name
  label: string
  value: string
  error?: string
  valid?: boolean
  onChange: (n: Name, v: string) => void
  onBlur: (n: Name) => void
  kind?: 'input' | 'select' | 'textarea'
  type?: string
  placeholder?: string
  autoComplete?: string
  inputMode?: 'text' | 'tel' | 'email'
  optional?: boolean
  options?: string[]
  disabled?: boolean
}

function Field({
  name,
  label,
  value,
  error,
  valid,
  onChange,
  onBlur,
  kind = 'input',
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  optional,
  options,
  disabled,
}: FieldProps) {
  const id = useId()
  const errId = `${id}-err`
  const state = error ? errState : valid ? validState : okState
  const shared = {
    id,
    name,
    disabled,
    autoComplete,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? errId : undefined,
    onBlur: () => onBlur(name),
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>

      {kind === 'input' && (
        <input
          {...shared}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={cx(control, 'h-12', state)}
        />
      )}

      {kind === 'select' && (
        <div className="relative">
          <select
            {...shared}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={cx(control, 'h-12 appearance-none pr-10', !value && 'text-muted/70', state)}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options?.map((o) => (
              <option key={o} value={o} className="text-ink">
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
        </div>
      )}

      {kind === 'textarea' && (
        <textarea
          {...shared}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={cx(control, 'min-h-28 resize-y py-3', state)}
        />
      )}

      {error && (
        <p id={errId} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger" aria-live="polite">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function LeadForm({ variant = 'card' }: { variant?: 'card' | 'plain' }) {
  const [values, setValues] = useState<Values>(empty)
  const [touched, setTouched] = useState<Partial<Record<Name, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  const errors = validate(values)
  const err = (n: Name) => (touched[n] ? errors[n] : undefined)
  const ok = (n: Name) => Boolean(touched[n] && !errors[n] && values[n].trim())

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const onChange = (n: Name, v: string) => setValues((p) => ({ ...p, [n]: v }))
  const onBlur = (n: Name) => setTouched((p) => ({ ...p, [n]: true }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setTouched({ firstName: true, lastName: true, email: true, phone: true, company: true, need: true, message: true })
    if (Object.keys(errors).length > 0) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setStatus('loading')
    // Demo only. In a real build, send `values` to your endpoint or GoHighLevel webhook here.
    window.setTimeout(() => setStatus('success'), 1400)
  }

  const reset = () => {
    setValues(empty)
    setTouched({})
    setStatus('idle')
  }

  const wrapper = cx(variant === 'card' && 'rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8')
  const loading = status === 'loading'

  if (status === 'success') {
    return (
      <div className={cx(wrapper, 'text-center')}>
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 ref={successRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">
          Request received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          Thanks, {values.firstName.trim()}. We will review your details and contact you at {values.email.trim()} to talk
          through the next step.
        </p>
        <Button variant="secondary" className="mt-6" onClick={reset}>
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={wrapper} aria-busy={loading}>
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="firstName" label="First name" placeholder="Jane" autoComplete="given-name" value={values.firstName} error={err('firstName')} valid={ok('firstName')} onChange={onChange} onBlur={onBlur} disabled={loading} />
          <Field name="lastName" label="Last name" placeholder="Smith" autoComplete="family-name" value={values.lastName} error={err('lastName')} valid={ok('lastName')} onChange={onChange} onBlur={onBlur} disabled={loading} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="email" label="Email" type="email" inputMode="email" placeholder="jane@company.com" autoComplete="email" value={values.email} error={err('email')} valid={ok('email')} onChange={onChange} onBlur={onBlur} disabled={loading} />
          <Field name="phone" label="Phone" type="tel" inputMode="tel" placeholder="(555) 000-0000" autoComplete="tel" value={values.phone} error={err('phone')} valid={ok('phone')} onChange={onChange} onBlur={onBlur} disabled={loading} />
        </div>
        <Field name="company" label="Company" optional placeholder="Your business name" autoComplete="organization" value={values.company} onChange={onChange} onBlur={onBlur} disabled={loading} />
        <Field name="need" label="What do you need help with?" kind="select" placeholder="Select one" options={needs} value={values.need} error={err('need')} valid={ok('need')} onChange={onChange} onBlur={onBlur} disabled={loading} />
        <Field name="message" label="Project details" kind="textarea" optional placeholder="A few lines about your business and what you are hoping to fix." value={values.message} onChange={onChange} onBlur={onBlur} disabled={loading} />

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Get Your Free Estimate'
          )}
        </Button>

        <p className="flex items-center justify-center gap-2 text-center text-sm text-muted">
          <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
          Your details stay private and are only used to reply to your request.
        </p>
      </div>
    </form>
  )
}
