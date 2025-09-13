import React from 'react';
import { useAppStore } from '../store';

export const RootHistoryPane: React.FC = () => {
  const { sessionHistory, allowRepeatRoots, clearHistory } = useAppStore();

  const toggleRepeatMode = () => {
    useAppStore.setState({ allowRepeatRoots: !allowRepeatRoots });
  };

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium text-gray-600">Session</h3>
          <label className="flex items-center text-xs text-gray-500">
            <input
              type="checkbox"
              checked={allowRepeatRoots}
              onChange={toggleRepeatMode}
              className="mr-1.5 scale-75"
            />
            Allow repeats
          </label>
        </div>
        <button
          onClick={clearHistory}
          className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
          disabled={sessionHistory.length === 0}
        >
          Clear
        </button>
      </div>
      
      <div className="w-full">       
        {sessionHistory.length === 0 ? (
          <div className="text-gray-400 text-xs italic">
            No roots practiced yet
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 w-full">
            {sessionHistory.map((root, index) => (
              <span
                key={`${root}-${index}`}
                className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
              >
                {root}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
