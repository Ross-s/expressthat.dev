export function WarningIcon() {
  return (
    <svg
      className="icon"
      width="600"
      height="85"
      style={{
        width: "86px",
      }}
    >
      <circle
        fill="none"
        stroke="#ebb01c"
        strokeWidth="3"
        strokeMiterlimit="10"
        className="path circle"
        cx="43"
        cy="43"
        r="40"
        ry="40"
      />
      <circle fill="#ebb01c" cx="43" cy="65" r="5" ry="5" />
      <line stroke="#ebb01c" strokeWidth={5} x1="43" y1="19" x2="43" y2="48" />
    </svg>
  );
}
