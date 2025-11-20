import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { hasError:false, error:null };
  }
  static getDerivedStateFromError(error){
    return { hasError:true, error };
  }
  componentDidCatch(error, info){
    console.error('[VALTREX] Runtime error boundary caught:', error, info);
  }
  render(){
    if(this.state.hasError){
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
            <h1 className="text-2xl font-bold mb-3">Algo salió mal</h1>
            <p className="text-sm text-gray-600 mb-6">Intenta recargar la página o volver al inicio.</p>
            <button onClick={()=>window.location.href='/'} className="px-6 py-3 bg-black text-white rounded-lg font-semibold">Volver al inicio</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}