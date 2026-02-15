import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

const THUMB_UNCHECKED = "translate-x-px";
const THUMB_CHECKED = "translate-x-[calc(100%-3px)]";

function Switch({ className, ...props }: React.ComponentProps<typeof BaseSwitch.Root>) {
    return (
        <BaseSwitch.Root
            data-slot="switch"
            className={cn(
                "data-checked:bg-secondary focus-visible:border-ring focus-visible:ring-ring/50 data-unchecked:bg-input data-unchecked:hover:border-ring/70 data-checked:border-secondary inline-flex h-5 w-8 shrink-0 items-center rounded-full border shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] data-disabled:pointer-events-none data-disabled:opacity-50",
                className
            )}
            {...props}
        >
            <BaseSwitch.Thumb
                data-slot="switch-thumb"
                className={(state) =>
                    cn(
                        "pointer-events-none block size-4 rounded-full ring-0 transition-transform duration-200 ease-in-out",
                        state.checked ? "bg-primary" : "bg-foreground",
                        state.checked ? THUMB_CHECKED : THUMB_UNCHECKED
                    )
                }
            />
        </BaseSwitch.Root>
    );
}

export { Switch };
