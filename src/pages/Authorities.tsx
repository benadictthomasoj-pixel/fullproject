import React from 'react';
import './Authorities.css';

export const Authorities: React.FC = () => {
  return (
    <div style={{ margin: '-5.5rem -2rem -2rem -2rem', height: 'calc(100vh - 90px)' }}>
      <iframe 
        src="/authority/index.html" 
        title="Road Management Directory"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  );
};
