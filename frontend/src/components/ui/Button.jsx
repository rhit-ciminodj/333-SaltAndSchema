export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button'
}) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-amber-500 text-black hover:bg-amber-400 active:bg-amber-600',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
    outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black',
    ghost: 'text-zinc-400 hover:text-white hover:bg-zinc-800',
    danger: 'bg-red-600 text-white hover:bg-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
