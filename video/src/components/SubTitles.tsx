import { FC } from "react";
import { useCurrentFrame } from "remotion";

type SubtitleItem = {
  start: number;
  end: number;
  text: string;
};

export const Subtitles: FC<{
  items: SubtitleItem[];
}> = ({ items }) => {
  const frame = useCurrentFrame();
  const active = items.find(
    (s) => frame >= Number(s.start) && frame <= Number(s.end)
  );
  if (!active) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        width: "100%",
        textAlign: "center",
        color: "black",
        fontSize: 42,
        fontWeight: 600,
        zIndex: 9999,
        textShadow: "0 2px 8px rgba(0,0,0,0.6)",
        padding: "0 40px",
      }}
    >
      {active.text}
    </div>
  );
};
