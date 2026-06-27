import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300',
  success: 'bg-success-100 text-success-700 dark:bg-success-900/50 dark:text-success-300',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/50 dark:text-warning-300',
  error: 'bg-error-100 text-error-700 dark:bg-error-900/50 dark:text-error-300',
  info: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-xs'}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'success' ? 'bg-success-500' :
          variant === 'warning' ? 'bg-warning-500' :
          variant === 'error' ? 'bg-error-500' :
          variant === 'primary' ? 'bg-primary-500' :
          'bg-slate-500'
        }`} />
      )}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'draft' | 'confirmed' | 'cancelled' | 'pending' | 'active';
}

const statusConfig: Record<StatusBadgeProps['status'], { label: string; variant: BadgeVariant }> = {
  draft: { label: 'Draft', variant: 'default' },
  confirmed: { label: 'Confirmed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'error' },
  pending: { label: 'Pending', variant: 'warning' },
  active: { label: 'Active', variant: 'success' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} dot>
      {config.label}
    </Badge>
  );
}
