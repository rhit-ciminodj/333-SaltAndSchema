export function Card({ children, className = '', hover = true, onClick }) {
  return (
    <div 
      className={`
        bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden
        ${hover ? 'transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`p-6 border-b border-zinc-800 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-6 border-t border-zinc-800 ${className}`}>
      {children}
    </div>
  );
}
