import React from 'react'
import { FlightSummary } from './FlightSummary'
import { PassengerSummary } from './PassengerSummary'
import { FareSummary } from './FareSummary'

export const ConfirmPaySection = () => {
  return (
    <section className='max-w-[1600px] px-6 mx-auto mt-4'>
        <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8 border border-orange-100'>        
            
            {/* Title */}
            <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-orange-600">Confirm & Pay</h2>
            <p className="text-sm text-gray-500">Review your details and complete the payment securely</p>
            </div>

            {/* Main Layout */}
            <div className='flex flex-col md:flex-row gap-6'>

                {/* Flight & Passenger Summary Section */}
                <div className='flex-1 space-y-5'>
                    <FlightSummary/>
                    <PassengerSummary/>
                </div>

                {/* Fare Summary Section */}
                <div className='w-full md:w-[320px] space-y-5 sticky top-[64px]'>
                    <FareSummary/>
                </div>

            </div>

        </div>
    </section>
  )
}
