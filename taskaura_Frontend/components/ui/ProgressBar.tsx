import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, size = 'md', showLabel = false }) => {
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Progress</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{Math.round(progress)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full ${heightClass[size]}`}>
        <div 
          className="bg-primary-600 h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        ></div>
      </div>
    </div>
  );
};