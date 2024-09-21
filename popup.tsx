import React, { useState, useEffect } from 'react';
import { useFirebase } from "~firebase/hook"
import TokenList from './components/TokenList';
import useTokens from './hooks/useTokens';
import "./style.css"

export default function IndexPopup() {
  const { user, isLoading, onLogin, onLogout } = useFirebase()
  const [showConnected, setShowConnected] = useState(true);
  const { tokens, isLoadingTokens } = useTokens(user);

  useEffect(() => {
    if (user) {
      setShowConnected(true);
      const timer = setTimeout(() => {
        setShowConnected(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className="flex flex-col w-80 h-96 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      {user && (
        <div 
          className={`bg-green-500 text-white px-4 py-2 text-sm font-semibold transition-opacity duration-300 ${
            showConnected ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Logged In
        </div>
      )}
      {user ? (
        <div className="flex-1 p-6 flex flex-col">
          <h1 className="text-xl font-bold mb-4 text-gray-800">
            Welcome, {user.displayName}
          </h1>
          <div className="bg-white p-4 rounded-lg shadow mb-4 flex-1 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Your Tokens</h2>
            <TokenList tokens={tokens} isLoading={isLoadingTokens} />
          </div>
          <button 
            onClick={() => onLogout()} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Welcome to your <a href="https://www.okto.tech/" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Okto</a> personalized analytics wallet
          </h1>
          {isLoading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <button 
              onClick={() => onLogin()} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
            >
              Log in with Google
            </button>
          )}
        </div>
      )}
      <footer className="bg-gray-200 py-2 px-4 text-center text-gray-500 text-sm">
        web3bytes.dev
      </footer>
    </div>
  )
}
