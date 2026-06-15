import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { Customer } from '../types'

interface CustomerContextType {
  customer: Customer | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<Customer>) => Promise<void>
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data } = await supabase
          .from('customer_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setCustomer(data)
      }
      setIsLoading(false)
    }
    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data } = await supabase
            .from('customer_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          setCustomer(data)
        } else {
          setCustomer(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
  }

  const register = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) throw error

    if (data.user) {
      await supabase.from('customer_profiles').insert({
        id: data.user.id,
        email,
        name
      })
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setCustomer(null)
  }

  const updateProfile = async (data: Partial<Customer>) => {
    if (!customer) return
    const { error } = await supabase
      .from('customer_profiles')
      .update(data)
      .eq('id', customer.id)
    if (error) throw error
    setCustomer({ ...customer, ...data })
  }

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        isLoading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer() {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider')
  }
  return context
}
