import { Typography } from "@/components/ui/Typography";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorBoundary() {
  return (
    <div
      data-tauri-drag-region
      className="h-full w-full flex items-center justify-center"
    >
      <div className="max-w-xl w-full flex justify-between">
        <div>
          <Typography type="title">An error occured.</Typography>
          <Typography type="subheadline" className="mb-4">
            Whoops... something went wrong here.
          </Typography>
          <Link
            to="/"
            className="rounded-lg px-3 py-1 bg-blue-500 text-sm hover:bg-blue-600"
          >
            Home
          </Link>
        </div>

        <ShieldAlert className="h-16 w-16 text-red-500" />
      </div>
    </div>
  );
}
