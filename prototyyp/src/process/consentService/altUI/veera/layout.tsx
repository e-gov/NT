import React from 'react';
import Footer from './footer';
import Header from './header';

const VeeraLayout = ({ children, backend }: any) => {
  let backendUse = backend.use();
  return (
    <div className={"wrapper " + (backendUse && backendUse.mem && backendUse.mem.ui.user ? 'push' : '')}>
      {backendUse && backendUse.mem && backendUse.mem.ui.user &&
        <Header backend={backend} />
      }
      <div className="content-wrapper">
        <div className="workarea">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default VeeraLayout;