import { Roboto, Montserrat } from 'next/font/google'

export const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const montserrat = Montserrat({
  weight: ['400','600','700'],
  subsets: ['latin'],
})
