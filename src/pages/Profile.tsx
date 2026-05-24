import React, { useEffect } from 'react';

export const Profile = () => {
  useEffect(() => {
    // Optional: communicate with iframe if needed
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 'calc(100vh - 72px)',
      margin: '-1.5rem',
      width: 'calc(100% + 3rem)'
    }}>
      <iframe
        src="/profile/profile.html"
        style={{
          width: '100%',
          height: 'calc(100vh - 72px)',
          border: 'none',
          display: 'block'
        }}
        title="Profile Dashboard"
      />
    </div>
  );
};
