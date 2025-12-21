import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, errorCount: 0 };
  }

  static getDerivedStateFromError(error){
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo){
    console.error('[VALTREX] Runtime error boundary caught:', error, errorInfo);
    this.setState(prev => ({
      errorInfo,
      errorCount: prev.errorCount + 1
    }));
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render(){
    if(this.state.hasError){
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-md w-full bg-white border border-red-200 rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-4">
              <div className="bg-red-50 p-3 rounded-full">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Algo salió mal
            </h1>
            
            <p className="text-sm text-gray-600 text-center mb-2">
              Hemos encontrado un error inesperado. Por favor, intenta una de estas opciones:
            </p>

            {isDevelopment && this.state.error && (
              <details className="mt-4 p-3 bg-red-50 rounded text-xs text-red-700 border border-red-200 mb-4">
                <summary className="font-semibold cursor-pointer">Detalles técnicos</summary>
                <pre className="mt-2 overflow-auto max-h-40 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="space-y-3 mt-6">
              <button 
                onClick={this.handleReset}
                className="w-full px-4 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Reintentar
              </button>

              <button 
                onClick={this.handleReload}
                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Recargar página
              </button>

              <button 
                onClick={() => window.location.href = '/'}
                className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <Home size={18} />
                Volver al inicio
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              Error #{this.state.errorCount} | Si el problema persiste, contacta con soporte
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}