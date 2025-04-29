"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export const ReactQueryProvider = ({children} : {children:React.ReactNode}) => {
    return (
          <QueryClientProvider client={queryClient}> 
            {children}
          </QueryClientProvider>

    )

}