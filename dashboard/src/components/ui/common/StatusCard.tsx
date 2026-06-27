import { memo } from "react";
import { TrendingUp } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";

const StatsCard = memo(({ title, value, subtitle }: any) => (
    <div className="primary-card space-y-4">
        <div className="flex justify-between items-center gap-4">
            <p className="text-neutral-500">{title}</p>
            <PrimaryButton className="flex gap-2 items-center text-primary-muted">
                <TrendingUp className="w-4 h-4" />
                <span>+17%</span>
            </PrimaryButton>
        </div>

        <h2 className="text-4xl font-bold text-primary-muted">{value}</h2>

        <div className="space-y-2">
            <h6 className="text-primary-muted flex gap-2 items-center">
                View all results <TrendingUp className="w-4 h-4" />
            </h6>
            <p className="text-neutral-500">{subtitle}</p>
        </div>
    </div>
));

export default StatsCard;
