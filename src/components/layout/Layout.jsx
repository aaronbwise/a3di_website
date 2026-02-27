import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactModal from '../shared/ContactModal'
import CookieConsent from '../shared/CookieConsent'

export default function Layout() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      <Outlet context={{ openContactModal: () => setIsContactModalOpen(true) }} />
      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <CookieConsent />
    </>
  )
}
