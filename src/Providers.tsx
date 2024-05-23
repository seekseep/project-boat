'use client'

import { Amplify } from 'aws-amplify'
import { PropsWithChildren } from "react"

import configuration from '../amplify_outputs.json'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

Amplify.configure(configuration)

const client = new QueryClient()

export default function Providers ({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}
