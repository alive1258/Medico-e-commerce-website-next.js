export type Billing = "monthly" | "annually";

export interface IPricingPlanVariant {
    title: string;
    description: string;
    price: string;
    subtitle: string;
    features: string[];
    badge?: string;
    highlighted?: boolean;
};

export interface IPricingPlan {
    id: string;
    monthly: IPricingPlanVariant;
    annually: IPricingPlanVariant;
};