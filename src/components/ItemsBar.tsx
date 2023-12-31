import { Plus } from "lucide-react";
import { Input } from "./ui/Input";
import { Password } from "@/app/features/passwords/password";
import { PasswordCard } from "./ui/PasswordCard";
import { NavLink } from "react-router-dom";

export interface ItemsBarProps {
  items: Password[];
}

export default function ItemsBar({ items }: ItemsBarProps) {
  return (
    <div className="w-80 border-r border-r-black p-4">
      <div className="flex items-stretch gap-2 mb-4">
        <Input placeholder="Search passwords" className="text-sm w-full" />
        <NavLink
          to="/all/new"
          className="px-2 py-1 rounded-lg bg-blue-500 flex items-center justify-center"
        >
          <Plus className="h-5 w-5" />
        </NavLink>
      </div>
      <div className=" w-full flex flex-col items-stretch gap-2">
        {!items.length ? (
          <div>no passwords</div>
        ) : (
          <>
            {items.map((item) => (
              <PasswordCard password={item} key={item.id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
