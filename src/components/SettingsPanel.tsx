import React from 'react';
import { Settings } from 'lucide-react';
import { useAppStore } from '../store';
import type { Note, TriadQuality, Inversion, StringGroup } from '../types';

const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useAppStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const allRoots: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const allQualities: TriadQuality[] = ['major', 'minor', 'diminished'];
  const allInversions: Inversion[] = ['root', 'first', 'second'];
  const allStringGroups: StringGroup[] = ['654', '543', '432', '321'];

  const handleCheckboxChange = <T,>(
    category: keyof typeof settings,
    value: T,
    currentValues: T[]
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    updateSettings({ [category]: newValues });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <Settings size={20} />
        Settings
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 min-w-80 z-10">
          <h3 className="text-lg font-bold mb-4">Exercise Settings</h3>
          
          <div className="space-y-4">
            {/* Roots */}
            <div>
              <h4 className="font-semibold mb-2">Roots</h4>
              <div className="grid grid-cols-4 gap-2">
                {allRoots.map(root => (
                  <label key={root} className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={settings.roots.includes(root)}
                      onChange={() => handleCheckboxChange('roots', root, settings.roots)}
                    />
                    <span className="text-sm">{root}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Qualities */}
            <div>
              <h4 className="font-semibold mb-2">Triad Qualities</h4>
              <div className="space-y-1">
                {allQualities.map(quality => (
                  <label key={quality} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.qualities.includes(quality)}
                      onChange={() => handleCheckboxChange('qualities', quality, settings.qualities)}
                    />
                    <span className="text-sm capitalize">{quality}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Inversions */}
            <div>
              <h4 className="font-semibold mb-2">Inversions</h4>
              <div className="space-y-1">
                {allInversions.map(inversion => (
                  <label key={inversion} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.inversions.includes(inversion)}
                      onChange={() => handleCheckboxChange('inversions', inversion, settings.inversions)}
                    />
                    <span className="text-sm capitalize">{inversion} position</span>
                  </label>
                ))}
              </div>
            </div>

            {/* String Groups */}
            <div>
              <h4 className="font-semibold mb-2">String Groups</h4>
              <div className="space-y-1">
                {allStringGroups.map(group => (
                  <label key={group} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.stringGroups.includes(group)}
                      onChange={() => handleCheckboxChange('stringGroups', group, settings.stringGroups)}
                    />
                    <span className="text-sm">Strings {group.split('').join('-')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
