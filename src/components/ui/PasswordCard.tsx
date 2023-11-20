import { Password } from "@/app/features/passwords/password";
import { KeyRound } from "lucide-react";
import { HTMLAttributes, forwardRef } from "react";
import { NavLink } from "react-router-dom";

export interface PasswordCardProps extends HTMLAttributes<HTMLAnchorElement> {
  password: Password;
}

export const PasswordCard = forwardRef<HTMLAnchorElement, PasswordCardProps>(
  function PasswordCard({ className, password, ...props }, ref) {
    const name = () => {
      if (password.metadata.type === "Empty") return "Password";

      const hostname = new URL(password.metadata.website).hostname;
      return hostname[0].toUpperCase() + hostname.slice(1);
    };

    const description = () => {
      if (password.metadata.type === "Empty") return "No info";

      return password.metadata.account;
    };

    return (
      <NavLink
        to={`/all/${password.id}`}
        className={({ isActive }) =>
          `px-2.5 py-2 rounded-lg cursor-pointer ${
            isActive ? "bg-blue-500" : "hover:bg-neutral-800"
          } transition-colors flex items-center gap-3`
        }
        ref={ref}
        {...props}
      >
        <div className="h-10 w-10 rounded-lg bg-neutral-750 flex items-center justify-center relative">
          <KeyRound
            strokeWidth={2.5}
            className="h-4.5 w-4.5 absolute text-neutral-500"
          />
          {password.metadata.type === "Login" ? (
            <img
              alt={`${password.metadata.website}'s favicon`}
              src={`${password.metadata.website}/favicon.ico`}
              className="h-6 w-6 z-10 bg-neutral-750"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null}
        </div>
        <div>
          <h3 className="font-semibold">{name()}</h3>
          <p className="text-neutral-300 text-xs font-semibold">
            {description()}
          </p>
        </div>
      </NavLink>
    );
  }
);
