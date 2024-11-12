export { default as Alert } from './Alert';
export { default as Badge } from './Badge';
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Dropdown } from './Dropdown';
export { default as Input } from './Input';
export { default as Modal, ModalFooter } from './Modal';
export { default as Progress } from './Progress';
export { default as Select } from './Select';
export { 
  default as Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonRect,
  SkeletonTextGroup 
} from './Skeleton';
export { default as Switch } from './Switch';
export { default as Tabs } from './Tabs';
export { default as Tooltip } from './Tooltip';

// Types
export type { AlertProps } from './Alert';
export type { BadgeProps } from './Badge';
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
export type { DropdownProps } from './Dropdown';
export type { InputProps } from './Input';
export type { ModalProps } from './Modal';
export type { ProgressProps } from './Progress';
export type { SelectProps } from './Select';
export type { 
  SkeletonProps,
  SkeletonTextGroupProps 
} from './Skeleton';
export type { SwitchProps } from './Switch';
export type { TabsProps } from './Tabs';
export type { TooltipProps } from './Tooltip';

// Add keyframe animations to tailwind config
const animations = {
  shimmer: {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  wave: {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '50%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
};

export { animations };
