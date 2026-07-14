'use client'

import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

function getLocale(): string {
  if (typeof window === 'undefined') return 'es'
  const path = window.location.pathname
  if (/^\/en(\/|$)/.test(path)) return 'en'
  return 'es'
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      const locale = getLocale()
      const isEs = locale === 'es'

      return (
        <div className="flex min-h-[400px] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <h3 className="text-[15px] font-semibold text-[#f2eee7]">
              {isEs ? 'Algo ha salido mal' : 'Something went wrong'}
            </h3>
            <p className="mt-1.5 text-[13px] text-[#8791a1]">
              {isEs ? 'No te preocupes, puedes intentar de nuevo.' : 'Don\'t worry, you can try again.'}
            </p>
            <button
              onClick={this.handleRetry}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-[13px] font-semibold text-[#d1d8e2] transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <RefreshCw size={13} />
              {isEs ? 'Intentar de nuevo' : 'Try again'}
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
