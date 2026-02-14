import { cn } from "@repo/ui/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    as?: "section" | "div";
}

export function Section({
    children,
    className,
    as: Component = "section",
    ...props
}: SectionProps) {
    return (
        <Component className={cn("py-12 md:py-16", className)} {...props}>
            {children}
        </Component>
    );
}
