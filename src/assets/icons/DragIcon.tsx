export default function DragIcon({
  width = 24,
  height = 24,
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
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        d="M19 6C17.9 6 17 6.9 17 8C17 9.1 17.9 10 19 10C20.1 10 21 9.1 21 8C21 6.9 20.1 6 19 6Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M5 6C3.9 6 3 6.9 3 8C3 9.1 3.9 10 5 10C6.1 10 7 9.1 7 8C7 6.9 6.1 6 5 6Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M19 14C17.9 14 17 14.9 17 16C17 17.1 17.9 18 19 18C20.1 18 21 17.1 21 16C21 14.9 20.1 14 19 14Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M5 14C3.9 14 3 14.9 3 16C3 17.1 3.9 18 5 18C6.1 18 7 17.1 7 16C7 14.9 6.1 14 5 14Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>
  );
}
