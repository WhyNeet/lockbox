import { getPasswords } from "@/app/features/passwords/password";
import { usePasswords } from "@/app/features/passwords/passwordsSlice";
import { AppDispatch } from "@/app/store";
import ItemsBar from "@/components/ItemsBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AllItems() {
  const location = useLocation();
  const navigate = useNavigate();
  const passwords = usePasswords();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPasswords());
  }, []);

  useEffect(() => {
    if (!passwords.length) return;
    if (location.pathname === "/all") navigate(`/all/${passwords[0].id}`);
  }, [passwords]);

  return (
    <>
      <ItemsBar items={passwords} />
      <Outlet />
    </>
  );
}
