import React from 'react';
import { BarChart, Users, BookOpen, Brain } from 'lucide-react';
import StatCard from './StatCard';

const UsageMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Active Users',
      value: '2,847',
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Analyses Run',
      value: '156,287',
      icon: BarChart,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Publications',
      value: '342',
      icon: BookOpen,
      trend: { value: 4, isPositive: true }
    },
    {
      title: 'ML Models',
      value: '89',
      icon: Brain,
      trend: { value: 15, isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <StatCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          trend={metric.trend}
        />
      ))}
    </div>
  );
};

export default UsageMetrics;