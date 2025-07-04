export default function ProfileIcon({
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
      <rect width="88" height="88" rx="44" fill="#F0F0F0" />
      <path
        d="M44 44C49.5228 44 54 39.5228 54 34C54 28.4772 49.5228 24 44 24C38.4772 24 34 28.4772 34 34C34 39.5228 38.4772 44 44 44Z"
        fill="#666666"
      />
      <path
        d="M44.0003 49C33.9803 49 25.8203 55.72 25.8203 64C25.8203 64.56 26.2603 65 26.8203 65H61.1803C61.7403 65 62.1803 64.56 62.1803 64C62.1803 55.72 54.0203 49 44.0003 49Z"
        fill="#666666"
      />
    </svg>
  );
}
