import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFilters } from "../../context/FiltersContext.jsx";
import HamburgerIcon from "../../assets/images/icons/HamburgerIcon.jsx";
import SearchIcon from "../../assets/images/icons/SearchIcon.jsx";
import CartIcon from "../../assets/images/icons/CartIcon.jsx";
import UserIcon from "../../assets/images/icons/UserIcon.jsx";
import ProfileIcon from "../../assets/images/icons/ProfileIcon.jsx";

export default function Header() {
  const { filters, updateFilter } = useFilters();
  const [query, setQuery] = useState(filters.search);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Sync external filter changes
  useEffect(() => {
    setQuery(filters.search);
  }, [filters.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilter({ search: query.trim() });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Hamburger */}
        <button className="text-white p-1 rounded hover:bg-slate-700 transition-colors lg:hidden">
          <HamburgerIcon/>
        </button>

        {/* Logo */}
        <Link to="/" className="hidden lg:block text-white font-bold text-lg shrink-0 tracking-wide">
          Leegality Shop
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-md border-0 outline-none focus:ring-2 focus:ring-blue-400 text-slate-800 placeholder-slate-400"
            />
          </div>
        </form>

        {/* Nav icons */}
        <div className="flex items-center gap-2 text-white ml-auto">
          <button className="p-2 rounded hover:bg-slate-700 transition-colors">
            <CartIcon/>
          </button>
          <button className="p-2 rounded hover:bg-slate-700 transition-colors">
            <UserIcon/>
          </button>
          <button className="p-2 rounded hover:bg-slate-700 transition-colors">
            <ProfileIcon/>
          </button>
        </div>
      </div>
    </header>
  );
}
