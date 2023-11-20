import { ActivityIndicator } from "@/components/ui/ActivityIndicator";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { invoke } from "@tauri-apps/api";
import { Unlock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function UnlockVault() {
  const navigate = useNavigate();

  const [master, setMaster] = useState("");
  const [isHashing, setIsHashing] = useState(false);

  const unlockVault = () => {
    if (master.trim().length < 8) return;

    setIsHashing(true);
    invoke("unlock_vault", { masterPass: master.trim() })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Wrong password.");
        setIsHashing(false);
      });
  };

  return isHashing ? (
    <>
      <ActivityIndicator className="mb-2" />
      <Typography type="subheadline">Unlocking...</Typography>
    </>
  ) : (
    <div className="w-80">
      <Typography type="largeTitle">Welcome back!</Typography>
      <Typography type="subheadline" className="mb-6">
        Enter the master password to access your vault.
      </Typography>

      <div className="flex items-center gap-2">
        <Input
          onChange={(e) => setMaster(e.target.value)}
          value={master}
          placeholder="Vault password"
          className="w-full tracking-widest placeholder:text-[15px] placeholder:tracking-normal h-9"
          type="password"
          variant="outline"
        />
        <button
          onClick={unlockVault}
          className={`bg-blue-500 h-9 flex items-center justify-center rounded-lg transition-all duration-300 ${
            master.trim().length >= 8 ? "w-12 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <Unlock className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
