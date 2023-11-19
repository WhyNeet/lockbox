import { cn } from "@/lib/classMerge";
import { ClassValue } from "clsx";
import { ReactNode, forwardRef } from "react";
// import { type LucideIcon } from "lucide-react";
import { NavLink, NavLinkProps } from "react-router-dom";

export interface SidebarItemProps extends NavLinkProps {
  icon?: string;
  iconDefaultColor?: ClassValue;
  children: ReactNode;
}

export const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(
  function SidebarItem(
    { iconDefaultColor, icon, children, className, ...props },
    ref
  ) {
    return (
      <NavLink
        className={({ isActive, isPending }) =>
          cn(
            "px-2.5 py-1.5 flex items-center gap-2 rounded-lg w-full text-sm drag-none ring-0 transition-none",
            isPending
              ? "bg-neutral-750 opacity-80 pointer-events-none"
              : isActive
              ? "bg-[#007AFF]"
              : "hover:bg-neutral-750",
            className
          )
        }
        {...props}
        ref={ref}
      >
        {({ isActive }) => (
          <>
            {icon ? (
              <span
                className={`text-[20px] icon ${
                  isActive ? "text-white" : iconDefaultColor
                }`}
                style={{
                  fontVariationSettings: `'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48`,
                }}
              >
                {icon}
              </span>
            ) : null}
            <span className="translate-y-[1px]">{children}</span>
          </>
        )}
      </NavLink>
    );
  }
);
