export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 2.8 28.8 29h-5.15l-2.35-6.15H10.7L8.35 29H3.2L16 2.8Zm0 9.55-3.55 9.15h7.1L16 12.35Z"
      />
    </svg>
  );
}
