import { ActivityIndicator } from "@/components/ui/ActivityIndicator";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { invoke } from "@tauri-apps/api";
import { StepForward } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateVault() {
  const navigate = useNavigate();

  const [master, setMaster] = useState("");
  const [isHashing, setIsHashing] = useState(false);

  const createVault = () => {
    if (master.trim().length < 8) return;

    setIsHashing(true);
    invoke("create_vault", { masterPass: master.trim() })
      .then((message) => {
        console.log(message);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setIsHashing(false);
      });
  };

  return isHashing ? (
    <ActivityIndicator />
  ) : (
    <div className="w-80">
      <Typography type="largeTitle">Let's start!</Typography>
      <Typography type="subheadline" className="mb-6">
        Create a reliable password for your vault.
      </Typography>

      <div className="flex items-center gap-2">
        <Input
          onChange={(e) => setMaster(e.target.value)}
          value={master}
          placeholder="Vault password"
          className="w-full text-xl tracking-widest placeholder:text-[15px] placeholder:tracking-normal h-8"
          type="password"
          inputMode="text"
        />
        <button
          onClick={createVault}
          className={`bg-blue-500 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
            master.trim().length >= 8 ? "w-12 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <StepForward className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
