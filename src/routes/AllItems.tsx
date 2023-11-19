import {
  getPasswords,
  usePasswords,
} from "@/app/features/passwords/passwordsSlice";
import { AppDispatch } from "@/app/store";
import ItemsBar from "@/components/ItemsBar";
import { invoke } from "@tauri-apps/api";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function AllItems() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwords = usePasswords();
  const dispatch = useDispatch<AppDispatch>();

  const createPassword = () =>
    invoke("create_password", {
      password: passwordRef.current!.value,
      metadata: { type: "Empty" },
    }).then((res) => console.log("result is:", res));

  const getItems = () => dispatch(getPasswords());

  return (
    <>
      <ItemsBar items={passwords} />
      <div>
        <div>
          <input
            className="bg-neutral-950"
            ref={passwordRef}
            placeholder="Ur password"
          />
          <button onClick={createPassword}>insert into db</button>
        </div>
        <div>
          <button onClick={getItems}>get all</button>
        </div>

        <div>
          <button onClick={() => invoke("delete_passwords").then(console.log)}>
            delete all
          </button>
        </div>
      </div>
    </>
  );
}
