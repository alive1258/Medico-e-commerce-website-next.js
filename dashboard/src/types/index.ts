export interface NavigationItem {
    name: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    href?: string;
    current?: boolean;
    children?: NavigationItem[];
}

export interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    color: 'primary' | 'success' | 'warning' | 'info';
    icon: string;
}

export interface ActivityItem {
    user: string;
    action: string;
    time: string;
}

export interface ChartProps {
    type: 'line' | 'bar';
}