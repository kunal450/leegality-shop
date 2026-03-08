export default function ProductBadge({ discount }) {
  if (!discount || discount <= 0) return null;
  return (
    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
      -{Math.round(discount)}%
    </span>
  );
}
