import { cn } from "@repo/ui/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
    return (
        <div className={cn("mx-auto w-full max-w-3xl px-4 sm:px-6", className)} {...props}>
            {children}
        </div>
    );
}
