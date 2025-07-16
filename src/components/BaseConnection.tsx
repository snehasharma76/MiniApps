"use client";

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BaseConnection: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string>('');
  
  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Get the current network
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        
        setAccount(accounts[0]);
        setNetworkName(network.name);
        setIsConnected(true);
      } else {
        alert('Please install MetaMask to connect to Base network');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };
  
  // Check if already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();
            
            setAccount(accounts[0]);
            setNetworkName(network.name);
            setIsConnected(true);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };
    
    checkConnection();
  }, []);
  
  return (
    <div className="base-connection mb-4">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
        >
          Connect to Base
        </button>
      ) : (
        <div className="flex items-center space-x-2 text-sm">
          <div className="bg-green-500 w-2 h-2 rounded-full"></div>
          <span className="font-medium">Connected to {networkName}</span>
          <span className="text-gray-500">
            {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
          </span>
        </div>
      )}
    </div>
  );
};

export default BaseConnection;
