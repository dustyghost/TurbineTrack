import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

const Select: React.FC<SelectProps> = ({ label, children, ...props }) => (
  <div className="flex flex-col">
    {label && <label className="mb-1 font-medium text-sm text-gray-700">{label}</label>}
    <select
      {...props}
      className="appearance-none border border-gray-300 rounded px-3 py-2 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    >
      {children}
    </select>
  </div>
);

export default Select;
