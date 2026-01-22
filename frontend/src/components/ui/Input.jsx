import { Search } from 'lucide-react';

export function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  icon,
  ...props 
}) {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-zinc-400 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5
            text-white placeholder-zinc-500
            focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
            transition-colors duration-200
            ${icon ? 'pl-10' : ''}
          `}
          {...props}
        />
      </div>
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      icon={<Search className="w-5 h-5 text-zinc-500" />}
    />
  );
}

export function Select({ label, value, onChange, options, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-zinc-400 mb-1.5">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="
          w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5
          text-white
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
          transition-colors duration-200
          cursor-pointer
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextArea({ label, placeholder, value, onChange, rows = 4, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-zinc-400 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5
          text-white placeholder-zinc-500
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
          transition-colors duration-200
          resize-none
        "
      />
    </div>
  );
}
