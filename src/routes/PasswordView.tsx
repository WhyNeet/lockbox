import { updatePassword } from "@/app/features/passwords/password";
import { usePassword } from "@/app/features/passwords/passwordsSlice";
import { AppDispatch } from "@/app/store";
import { Typography } from "@/components/ui/Typography";
import { KeyRound, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function PasswordView() {
  const dispatch = useDispatch<AppDispatch>();
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

  const toggleStar = () => {
    dispatch(
      updatePassword({
        ...password,
        metadata: {
          ...password.metadata,
          is_starred: password.metadata.is_starred ^ 1,
        },
      })
    );
  };

  const copy = (text: string) =>
    navigator.clipboard.writeText(text).then(() => toast.success("Copied"));

  return (
    <div className="h-full py-8 px-10 w-[calc(100%-36rem)]">
      <div className="flex gap-4 items-center">
        <div className="min-h-[56px] min-w-[56px] rounded-lg bg-neutral-750 flex items-center justify-center relative">
          <KeyRound
            strokeWidth={2.5}
            className="h-6 w-6 absolute text-neutral-500"
          />
          {password.metadata.type === "Login" ? (
            <img
              alt={`${password.metadata.website}'s favicon`}
              src={`${password.metadata.website}/favicon.ico`}
              className="h-8 w-8 z-10 bg-neutral-750"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null}
        </div>
        <div className="w-full">
          <Typography type="title">{name()}</Typography>
          <p className="text-neutral-400 text-xs font-semibold">
            {password.metadata.type === "Empty"
              ? "No info"
              : password.metadata.type}
          </p>
        </div>
        <span className="flex-1" />
        <button className="ring-0 text-yellow-400" onClick={toggleStar}>
          <Star fill={password.metadata.is_starred ? "#facc15" : ""} />
        </button>
      </div>
      <div className="border-t border-t-neutral-750 mt-4 pt-4">
        {password.metadata.type === "Login" ? (
          <button
            onClick={() => copy((password.metadata as any).account)}
            className="p-3 rounded-lg hover:bg-neutral-750 transition-colors w-full text-left"
          >
            <p className="text-xs text-neutral-500 font-semibold">Username</p>
            <div className="text-sm">{password.metadata.account}</div>
          </button>
        ) : null}
        <button
          onClick={() => copy(password.password)}
          className="p-3 rounded-lg hover:bg-neutral-750 transition-colors w-full text-left"
        >
          <p className="text-xs text-neutral-500 font-semibold">Password</p>
          <div className="text-sm">
            {new Array(password.password.length)
              .fill("•")
              .reduce((acc, val) => acc + val, "")}
          </div>
        </button>
        {password.metadata.type === "Login" ? (
          <button
            onClick={() => copy((password.metadata as any).website)}
            className="p-3 rounded-lg hover:bg-neutral-750 transition-colors w-full text-left"
          >
            <p className="text-xs text-neutral-500 font-semibold">Website</p>
            <div className="text-sm">
              {new URL(password.metadata.website).host}
            </div>
          </button>
        ) : null}
      </div>
      <p className="absolute bottom-6 right-6 text-xs font-semibold text-neutral-500">
        Click field to copy
      </p>
    </div>
  );
}
