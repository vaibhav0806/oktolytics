import React from 'react';

interface Token {
  token_name: string;
  quantity: string;
  token_image?: string;
}

interface TokenListProps {
  tokens: Token[];
  isLoading: boolean;
}

const TokenList: React.FC<TokenListProps> = ({ tokens, isLoading }) => {
  if (isLoading) {
    return <p className="text-gray-600">Loading tokens...</p>;
  }

  if (tokens.length === 0) {
    return <p className="text-gray-600">No tokens found.</p>;
  }

  return (
    <>
      {tokens.map((token, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
          <div className="flex items-center">
            {token.token_image && (
              <img src={token.token_image} alt={token.token_name} className="w-6 h-6 mr-2 rounded-full" />
            )}
            <span className="font-medium">{token.token_name}</span>
          </div>
          <span className="text-gray-600">{parseFloat(token.quantity).toFixed(4)}</span>
        </div>
      ))}
    </>
  );
};

export default TokenList;
