import React from 'react';

interface StringGroupToggleProps {
  showAllGroups: boolean;
  onToggle: () => void;
}

const StringGroupToggle: React.FC<StringGroupToggleProps> = ({ showAllGroups, onToggle }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-gray-600 font-medium">View Mode</div>
      <button
        onClick={onToggle}
        className={`
          relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
          font-medium text-sm transition-all duration-200 w-40
          ${showAllGroups 
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm' 
            : 'bg-flame text-white shadow-md hover:bg-opacity-90'
          }
        `}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          className="transition-transform duration-200"
        >
          {showAllGroups ? (
            // Show single row icon when in all groups mode (clicking will go to single)
            <rect x="2" y="8" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          ) : (
            // Show grid/stack icon when in single group mode (clicking will go to all groups)
            <>
              <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <rect x="12" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <rect x="2" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <rect x="12" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </>
          )}
        </svg>
        <span>{showAllGroups ? 'Single Group' : 'All Groups'}</span>
      </button>
    </div>
  );
};

export default StringGroupToggle;
