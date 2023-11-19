import { RootState } from "@/app/store";
import { KeyRound } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function PasswordView() {
  const location = useLocation();
  // const pass
  // const password = useSelector<RootState>(state => state.passwords.passwords.find(pass => pass.))

  return (
    <div className="h-full py-8 px-10">
      <div className="flex gap-4">
        <div className="h-14 w-14 rounded-lg bg-neutral-750 flex items-center justify-center relative">
          <KeyRound
            strokeWidth={2.5}
            className="h-6 w-6 absolute text-neutral-500"
          />
          {/* {password.metadata.type === "Login" ? (
            <img
              alt={`${password.metadata.website}'s favicon`}
              src={`${password.metadata.website}/favicon.ico`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null} */}
        </div>
      </div>
    </div>
  );
}
