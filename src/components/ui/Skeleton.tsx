import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'pulse',
}) => {
  const baseStyles = 'bg-slate-200 dark:bg-slate-700';
  
  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const getDefaultHeight = () => {
    switch (variant) {
      case 'text':
        return '1rem';
      case 'circular':
        return width || '3rem';
      case 'rectangular':
        return '100px';
      default:
        return height;
    }
  };

  const styles = {
    width: width || (variant === 'text' ? '100%' : '3rem'),
    height: height || getDefaultHeight(),
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${animations[animation]}
        relative overflow-hidden
        ${className}
      `}
      style={styles}
    >
      {animation === 'wave' && (
        <div className="absolute inset-0">
          <div className="h-full w-full animate-wave bg-gradient-to-r from-transparent via-slate-300/10 dark:via-slate-600/10 to-transparent" />
        </div>
      )}
    </div>
  );
};

// Preset components for common use cases
export const SkeletonText: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="text" {...props} />
);

export const SkeletonCircle: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="circular" {...props} />
);

export const SkeletonRect: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="rectangular" {...props} />
);

// Skeleton group for multiple lines of text
interface SkeletonTextGroupProps {
  lines?: number;
  spacing?: 'tight' | 'normal' | 'loose';
  lastLineWidth?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const SkeletonTextGroup: React.FC<SkeletonTextGroupProps> = ({
  lines = 3,
  spacing = 'normal',
  lastLineWidth = '75%',
  className = '',
  animation = 'pulse',
}) => {
  const spacingStyles = {
    tight: 'space-y-1',
    normal: 'space-y-2',
    loose: 'space-y-4',
  };

  return (
    <div className={`${spacingStyles[spacing]} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
          animation={animation}
        />
      ))}
    </div>
  );
};

export default Skeleton;