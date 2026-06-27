import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700
        shadow-card ${hoverable ? 'hover:shadow-elevated hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function CardHeader({ children, className = '', action }: CardHeaderProps) {
  return (
    <div className={`flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 ${className}`}>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{children}</h3>
      {action}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  prefix?: string;
  suffix?: string;
  onClick?: () => void;
}

export function StatCard({ title, value, icon, trend, prefix, suffix, onClick }: StatCardProps) {
  return (
    <Card hoverable={!!onClick} onClick={onClick} className="relative overflow-hidden">
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {title}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {prefix && <span className="text-lg text-slate-500">{prefix}</span>}
              {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
              {suffix && <span className="text-sm text-slate-500 ml-1">{suffix}</span>}
            </p>
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4 text-success-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-error-500" />
                )}
                <span className={`text-sm font-medium ${trend.isPositive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
                  {Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">vs last month</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`} />
  );
}

export function LoadingCard() {
  return (
    <Card>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  );
}
