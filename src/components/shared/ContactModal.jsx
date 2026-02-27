import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState('idle') // idle | success | error

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    // Field names MUST match the hidden form in index.html
    const body = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': '',
      'first-name': formData.firstName,
      'last-name': formData.lastName,
      email: formData.email,
      message: formData.message,
    })

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (response.ok) {
        setSubmitResult('success')
        setFormData({ firstName: '', lastName: '', email: '', message: '' })
      } else {
        setSubmitResult('error')
      }
    } catch {
      setSubmitResult('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleOpenChange(open) {
    if (!open) {
      onClose()
      // Reset state after close animation
      setTimeout(() => setSubmitResult('idle'), 300)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[1000] data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[90vw] max-w-[500px] max-h-[90vh] overflow-y-auto z-[1001] p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-bold text-secondary m-0">
              Schedule a call
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-secondary/50 hover:text-secondary text-2xl leading-none cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>
            </Dialog.Close>
          </div>

          {submitResult === 'success' ? (
            <div className="text-center py-8">
              <p className="text-lg font-bold text-secondary">Thank you!</p>
              <p className="text-secondary">Your message has been sent. We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              <div className="mb-3">
                <label htmlFor="first-name" className="block text-sm text-secondary mb-1">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  id="first-name"
                  required
                  maxLength={100}
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="last-name" className="block text-sm text-secondary mb-1">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  required
                  maxLength={100}
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="block text-sm text-secondary mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm text-secondary mb-1">Message:</label>
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  required
                  maxLength={1000}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {submitResult === 'error' && (
                <p className="text-red-600 text-sm mb-3">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-5 py-2 rounded text-sm font-normal cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
