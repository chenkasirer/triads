import React from 'react';
import { useAppStore } from '../store';

export const RootHistoryPane: React.FC = () => {
  const { sessionHistory, allowRepeatRoots, clearHistory } = useAppStore();

  const toggleRepeatMode = () => {
    useAppStore.setState({ allowRepeatRoots: !allowRepeatRoots });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Session History</h3>
        <button
          onClick={clearHistory}
          className="px-3 py-1 text-sm bg-flame text-white rounded hover:bg-opacity-90 transition-colors"
          disabled={sessionHistory.length === 0}
        >
          Clear
        </button>
      </div>
      
      <div className="mb-3">
        <label className="flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            checked={allowRepeatRoots}
            onChange={toggleRepeatMode}
            className="mr-2"
          />
          Allow repeat roots
        </label>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-500">
          Practiced roots ({sessionHistory.length}):
        </div>
        
        {sessionHistory.length === 0 ? (
          <div className="text-gray-400 text-sm italic">
            No roots practiced yet
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {sessionHistory.map((root, index) => (
              <span
                key={`${root}-${index}`}
                className="inline-flex items-center justify-center w-8 h-8 bg-sunset text-gray-800 rounded-full text-sm font-medium"
              >
                {root}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {!allowRepeatRoots && sessionHistory.length > 0 && (
        <div className="mt-3 text-xs text-gray-500">
          💡 Random selection avoids practiced roots
        </div>
      )}
    </div>
  );
};
