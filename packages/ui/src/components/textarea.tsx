import * as React from "react";

import { cn } from "../lib/utils";

function Textarea({ className, disabled, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "placeholder:text-muted-foreground hover:border-ring/70 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/50 aria-invalid:border-destructive bg-input block min-h-16 w-full rounded-md border border-input px-3 py-3 text-base shadow-xs transition-colors duration-200 outline-none focus-visible:ring-[3px] resize-y box-border data-disabled:pointer-events-none data-disabled:opacity-50 md:text-sm",
                className
            )}
            data-disabled={disabled}
            disabled={disabled}
            {...props}
        />
    );
}

export { Textarea };
