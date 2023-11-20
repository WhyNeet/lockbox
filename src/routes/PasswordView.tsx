import { usePassword } from "@/app/features/passwords/passwordsSlice";
import { Typography } from "@/components/ui/Typography";
import { KeyRound, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function PasswordView() {
  const location = useLocation();
  const passId = location.pathname.split("/").at(-1);
  const password = useSelector((state) => usePassword(state, passId ?? null));

  if (!password)
    return (
      <div className="flex items-center justify-center flex-col w-[calc(100%-16rem-20rem)] text-neutral-400 text-sm font-semibold">
        No password selected.
      </div>
    );

  const name = () => {
    if (password.metadata.type === "Empty") return "Password";

    const hostname = new URL(password.metadata.website).hostname;
    return hostname[0].toUpperCase() + hostname.slice(1);
  };

  return (
    <div className="h-full py-8 px-10">
      <div className="flex gap-4 items-center">
        <div className="h-14 w-14 rounded-lg bg-neutral-750 flex items-center justify-center relative">
          <KeyRound
            strokeWidth={2.5}
            className="h-6 w-6 absolute text-neutral-500"
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
          <Typography type="title">{name()}</Typography>
          <p className="text-neutral-400 text-xs font-semibold">
            {password.metadata.type === "Empty"
              ? "No info"
              : password.metadata.type}
          </p>
        </div>
        <span className="flex-1" />
        <button>
          <Star />
        </button>
      </div>
    </div>
  );
}
