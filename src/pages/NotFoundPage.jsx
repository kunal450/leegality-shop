import { useNavigate, useLocation } from "react-router-dom";
import SadFaceIcon from "../assets/images/icons/SadFaceIcon";

export default function NotFoundPage({ isChild = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* Icon block */}
        <div className="relative mb-8 select-none">
          <p className="text-[8rem] font-black text-slate-100 leading-none tracking-tighter">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-2xl px-5 py-3 shadow-md border border-slate-200">
              <SadFaceIcon className="w-10 h-10 text-slate-400 mx-auto mb-1"/>
              <p className="text-xs text-slate-400 font-medium">Page not found</p>
            </div>
          </div>
        </div>

        {/* Error Message block */}
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Oops! Wrong aisle.
        </h1>
        <p className="text-slate-500 text-sm mb-1">
          The page{" "}
          <code className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-xs font-mono">
            {location.pathname}
          </code>{" "}
          doesn't exist.
        </p>
        <p className="text-slate-400 text-sm mb-8">
          {isChild
            ? "This product or section couldn't be found."
            : "Looks like you wandered off the map."}
        </p>

        {/* Back to shop / Go back button block  */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 active:bg-slate-900 transition-colors"
          >
            Back to Shop
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}