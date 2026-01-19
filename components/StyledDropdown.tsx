import React from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  tooltips?: Record<string, string>;
  className?: string;
  width?: string;
};

const StyledDropdown = ({ value, onChange, options, className = '', width = 'w-full' }: Props) => {
  return (
    <div className={`${width} ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 text-sm"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default StyledDropdown;
