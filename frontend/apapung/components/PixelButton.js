// components/PixelButton.js
export default function PixelButton({
  text,
  onClick,
  bgColor = "#ff0000",
  borderColor = "#333",
  hoverColor = "#cc0000",
}) {
  return (
    <button
      className="pixel-button"
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        "--hover-color": hoverColor,
      }}
    >
      {text}
    </button>
  );
}
