import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUserProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code === 'PGRST116') {
        // User doesn't exist, create profile
        const { data: authUser } = await supabase.auth.getUser()
        if (authUser.user) {
          const { data: newProfile, error: createError } = await supabase
            .from('users')
            .insert([
              {
                id: authUser.user.id,
                email: authUser.user.email,
                first_name: authUser.user.user_metadata?.firstName || 'User',
                last_name: authUser.user.user_metadata?.lastName || '',
                company: authUser.user.user_metadata?.company || '',
                address: authUser.user.user_metadata?.address || '',
                role: 'client',
                status: 'pending',
                validated: false,
                language: 'FR',
                credits: 0
              }
            ])
            .select()
            .single()

          if (!createError) {
            setUserProfile(newProfile)
          }
        }
      } else if (!error) {
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      setUserProfile(null)
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}