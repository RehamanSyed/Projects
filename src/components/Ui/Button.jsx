export default function Button({
  label,
  variant = "primary",
  onClick,
  disabled,
}) {
  return (
    <button
      type="button"
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
