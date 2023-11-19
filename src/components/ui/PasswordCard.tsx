import { Password } from "@/app/features/passwords/password";
import { KeyRound } from "lucide-react";
import { HTMLAttributes, forwardRef } from "react";

export interface PasswordCardProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  password: Password;
}

export const PasswordCard = forwardRef<HTMLDivElement, PasswordCardProps>(
  function PasswordCard({ className, password, isActive, ...props }, ref) {
    const name = () => {
      if (password.metadata.type === "Empty") return "Password";

      const hostname = new URL(password.metadata.website).hostname;
      return hostname[0].toUpperCase() + hostname.slice(1);
    };

    const description = () => {
      if (password.metadata.type === "Empty") return "Unknown password";

      return password.metadata.account;
    };

    return (
      <div
        className={`px-4 py-3 rounded-lg cursor-pointer ${
          isActive ? "bg-blue-500" : "hover:bg-neutral-800"
        } transition-colors flex items-center gap-4`}
        ref={ref}
        {...props}
      >
        <div className="h-10 w-10 rounded-lg bg-neutral-750 flex items-center justify-center relative">
          <KeyRound
            strokeWidth={2.5}
            className="h-4 w-4 absolute text-neutral-500"
          />
          {password.metadata.type === "Login" ? (
            <img
              alt={`${password.metadata.website}'s favicon`}
              src={`${password.metadata.website}/favicon.ico`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null}
        </div>
        <div>
          <h3 className="font-semibold mb-0.5">{name()}</h3>
          <p className="text-neutral-400 text-xs font-semibold">
            {description()}
          </p>
        </div>
      </div>
    );
  }
);
