import { Star, StarHalf } from 'lucide-react';

export function StarRating({ rating, maxStars = 5, size = 'md', showValue = true }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star 
            key={`full-${i}`} 
            className={`${sizeClasses[size]} text-amber-400 fill-amber-400`} 
          />
        ))}
        {hasHalfStar && (
          <StarHalf 
            className={`${sizeClasses[size]} text-amber-400 fill-amber-400`} 
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star 
            key={`empty-${i}`} 
            className={`${sizeClasses[size]} text-zinc-600`} 
          />
        ))}
      </div>
      {showValue && (
        <span className="text-zinc-400 text-sm ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}

export function InteractiveStarRating({ rating, onRate, size = 'lg' }) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <Star 
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? 'text-amber-400 fill-amber-400' 
                : 'text-zinc-600 hover:text-amber-300'
            }`} 
          />
        </button>
      ))}
    </div>
  );
}
