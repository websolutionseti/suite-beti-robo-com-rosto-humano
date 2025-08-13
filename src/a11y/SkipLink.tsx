import React from 'react';

const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium z-50 transition-all duration-200"
      tabIndex={1}
    >
      Pular para o conteúdo principal
    </a>
  );
};

export default SkipLink;