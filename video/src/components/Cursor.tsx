import CursorImage from "../icons/cursor.svg";
import CursorClick from "../icons/cursor-click.svg";


export const Cursor = ({ x, y, isClick }: { x: number; y: number; isClick: boolean }) => {
  return <img
    src={isClick ? CursorClick : CursorImage}
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
};
