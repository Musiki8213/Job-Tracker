

export default function Loader() {
  return (
    <div
      id="loader"
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        border: "3px solid #f3f3f3",
        borderTop: "3px solid #E64A19",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginLeft: "10px",
      }}
    />
  );
}
