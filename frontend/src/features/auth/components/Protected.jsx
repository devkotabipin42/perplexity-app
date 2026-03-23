import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { Sparkles } from 'lucide-react'

const Protected = ({ children }) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
  return (
    <div className="flex items-center justify-center h-screen" style={{ background: '#060608' }}>
      <div className="flex flex-col items-center gap-4">
        {/* Logo pulse */}
        <div
          className="flex items-center justify-center rounded-2xl animate-pulse"
          style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#7c6af7,#38bdf8)', boxShadow: '0 0 40px rgba(124,106,247,0.5)' }}
        >
          <Sparkles size={24} className="text-white" />
        </div>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>

        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>Loading...</p>
      </div>
    </div>
  )
}

    if (!user) {
        return <Navigate to="/login" replace />
    }


    return children
}

export default Protected