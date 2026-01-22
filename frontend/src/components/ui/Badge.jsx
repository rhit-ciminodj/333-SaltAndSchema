export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-zinc-800 text-zinc-300',
    primary: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    warning: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </span>
  );
}
