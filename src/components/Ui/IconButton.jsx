export default function IconButton({
    icon,
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
        {icon}
      </button>
    );
  }
  