export default function ArrowDownIcon({
  width = 14,
  height = 9,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 9"
      fill="none"
      className={className}
    >
      <path
        d="M1.0341 1.47462L6.95101 7.84668L12.8679 1.47463"
        stroke="currentColor"
        stroke-width="1.05939"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
