import { useState, useEffect } from 'react';

interface Token {
  token_name: string;
  quantity: string;
  token_image?: string;
}

const useTokens = (user: any) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);

  const getTokenId = async () => {
    return await user?.getIdToken();
  };

  const fetchTokens = async () => {
    setIsLoadingTokens(true);
    try {
      const token = await getTokenId();
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setTokens(data.tokens);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setIsLoadingTokens(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTokens();
    }
  }, [user]);

  return { tokens, isLoadingTokens };
};

export default useTokens;
