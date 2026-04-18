import React from 'react';
import FormPanel from '../Sidebar/FormPanel';
import A4Document from '../Preview/A4Document';

function MainGrid(props) {
  return (
    <div className="w-full flex">
      {/* Left Sidebar */}
      <div className="w-full max-w-md bg-white border-r border-gray-200 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
        <FormPanel {...props} />
      </div>
      
      {/* Right Preview */}
      <div className="flex-1 overflow-y-auto bg-gray-200 p-8 flex justify-center" style={{ height: 'calc(100vh - 64px)' }}>
        <A4Document {...props} />
      </div>
    </div>
  );
}

export default MainGrid;
