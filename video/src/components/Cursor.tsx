export const Cursor = ({ x, y }: { x: number; y: number }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "white",
      borderWidth: "5px",
      borderColor: "black",
    }}
  />
);
