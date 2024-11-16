import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import React from 'react'

const PaymentTransfer = () => {
  return (
    <section className="payment-transfer">
      <HeaderBox title="Payment Transfer" subtext="Kindly provide detials to make a transfer"/>
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={[]}/>
      </section>
    </section>
  )
}

export default PaymentTransfer