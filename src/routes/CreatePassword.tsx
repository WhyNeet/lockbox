import {
  CreatePasswordInputs,
  createPassword,
} from "@/app/features/passwords/password";
import { AppDispatch } from "@/app/store";
import { Input } from "@/components/ui/Input";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [password, setPassword] = useState<CreatePasswordInputs>({
    password: "",
    website: "",
    account: "",
  });
  const getWebsiteIcon = () => {
    if (!password.website.trim().length) return null;

    try {
      const url = new URL(password.website.trim());
      if (!url.origin.includes(".") || url.origin.endsWith(".")) return null;
      return url.toString() + "/favicon.ico";
    } catch (e) {
      return null;
    }
  };

  const websiteIcon = getWebsiteIcon();

  return (
    <div className="h-full w-[calc(100%-36rem)] flex items-center justify-center flex-col">
      <div className="h-14 w-14 rounded-lg bg-neutral-750 flex items-center justify-center relative mb-10">
        <KeyRound
          strokeWidth={2.5}
          className="h-6 w-6 absolute text-neutral-500"
        />
        {websiteIcon ? (
          <img
            alt={`${password.website}'s favicon`}
            src={websiteIcon}
            className="h-8 w-8 z-10 pointer-events-none bg-neutral-750"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>
      <div className="flex flex-col w-72">
        <Input
          placeholder="Password"
          className="mb-6"
          type="password"
          value={password.password}
          onChange={(e) =>
            setPassword((prev) => ({
              ...prev,
              password: e.target.value.trim(),
            }))
          }
        />

        <Input
          placeholder="Password account"
          variant="outline"
          value={password.account}
          onChange={(e) =>
            setPassword((prev) => ({ ...prev, account: e.target.value }))
          }
        />
        <span className="text-xs text-neutral-500 font-semibold mb-4 mt-0.5">
          Optional.
        </span>

        <Input
          placeholder="Password website"
          variant="outline"
          value={password.website}
          onChange={(e) =>
            setPassword((prev) => ({ ...prev, website: e.target.value.trim() }))
          }
        />
        <span className="text-xs text-neutral-500 font-semibold mt-0.5 mb-10">
          Optional.
        </span>
        <div className="w-full text-right">
          <button
            className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm transition-colors"
            onClick={() =>
              dispatch(createPassword(password)).then(() => navigate("/all"))
            }
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
