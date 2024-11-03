import React from 'react';

const Skeleton = () => {
  return (
    <div className="animate-pulse flex space-x-4 p-4 border rounded shadow">
      <div className="rounded-full bg-gray-300 h-10 w-10"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;
