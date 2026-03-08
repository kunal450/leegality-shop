import BackArrowIcon from '../../assets/images/icons/BackArrowIcon'
import ForwardArrowIcon from '../../assets/images/icons/ForwardArrowIcon';
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const btnBase =
    "h-9 min-w-9 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center";
  const activeBtn = "bg-blue-600 text-white shadow";
  const inactiveBtn = "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50";
  const disabledBtn = "bg-white text-slate-300 border border-slate-200 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-1.5 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${currentPage === 1 ? disabledBtn : inactiveBtn} gap-1`}
      >
        <BackArrowIcon/>
        Previous
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dot-${i}`} className="px-1 text-slate-400 text-sm select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${page === currentPage ? activeBtn : inactiveBtn}`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${currentPage === totalPages ? disabledBtn : inactiveBtn} gap-1`}
      >
        Next
        <ForwardArrowIcon/>
      </button>
    </div>
  );
}
