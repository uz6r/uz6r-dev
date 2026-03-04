import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

import { cn } from "../lib/utils";

export const Collapsible = ({ ...props }: BaseCollapsible.Root.Props) => {
    return <BaseCollapsible.Root data-slot="collapsible" {...props} />;
};

export const CollapsibleTrigger = ({ ...props }: BaseCollapsible.Trigger.Props) => {
    return <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />;
};

export const CollapsibleContent = ({ className, ...props }: BaseCollapsible.Panel.Props) => {
    return (
        <BaseCollapsible.Panel
            data-slot="collapsible-content"
            className={cn(
                "h-(--collapsible-panel-height) overflow-hidden text-sm transition-all duration-200 data-ending-style:h-0 data-starting-style:h-0 [&[hidden]:not([hidden='until-found'])]:hidden",
                className
            )}
            {...props}
        />
    );
};
