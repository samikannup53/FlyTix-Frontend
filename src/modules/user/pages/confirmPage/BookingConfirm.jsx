import React from 'react'
import { BookingFooter, BookingHeader } from '../../components'
import { ConfirmationSection } from './sections/ConfirmationSection'

export const BookingConfirm = () => {
  return (
    <>
      <BookingHeader/>
      <section className='min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-6 px-4'>
        <ConfirmationSection/>
      </section>
      <BookingFooter/>
    </>
  )
}
