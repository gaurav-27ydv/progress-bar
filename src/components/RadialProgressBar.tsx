import { useRadialProgressBar } from "../utils/hooks";
import "./RadialProgressBar.css";

type RadialProgressBarProps = {
  minimumValue?: number;
  maximumValue?: number;
  percentage?: number;
  duration?: number;
  progressColor?: string;
  progressBackground?: string;
  outerRadius?: string;
  innerRadius?: string;
  isPaused?: boolean;
  className?: string;
};

export function RadialProgressBar({
  minimumValue = 0,
  maximumValue = 100,
  percentage,
  duration = 10000,
  progressColor = "black",
  progressBackground = "white",
  outerRadius = "200px",
  innerRadius = "80%",
  isPaused = false,
  className,
}: RadialProgressBarProps) {
  const [skewTopRight, skewBottomRight, skewBottomLeft, skewTopLeft] =
    useRadialProgressBar({
      minimumValue,
      maximumValue,
      percentage,
      duration,
      isPaused,
    });

  return (
    <div
      style={{
        height: outerRadius,
        width: outerRadius,
        background: progressColor,
        border: "2px solid black",
      }}
      className={`outer-circle ` + className}
    >
      <div
        className="inner-quarters"
        style={{
          background: progressBackground,
          translate: "150% -50%",
          transform: `scale(-1, 1) skew(${skewTopRight}deg)`,
        }}
      ></div>
      <div
        className="inner-quarters"
        style={{
          background: progressBackground,
          translate: "50% 50%",
          transform: `scale(-1, 1) rotate(270deg) skew(${
            90 - skewBottomRight
          }deg)`,
        }}
      ></div>
      <div
        className="inner-quarters"
        style={{
          background: progressBackground,
          translate: "-50% -50%",
          transform: `scale(1, -1) skew(${90 - skewBottomLeft}deg)`,
        }}
      ></div>
      <div
        className="inner-quarters"
        style={{
          background: progressBackground,
          translate: "50% -150%",
          transform: `scale(-1, 1) rotate(90deg) skew(${90 - skewTopLeft}deg)`,
        }}
      ></div>
      <div
        style={{
          margin: "auto",
          height: innerRadius,
          width: innerRadius,
          borderRadius: "50%",
        }}
        className={className}
      ></div>
    </div>
  );
}
