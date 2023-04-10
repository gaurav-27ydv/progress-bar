import { useProgressBar } from "../utils/hooks";

type ProgressBarProps = {
  minimumValue?: number;
  maximumValue?: number;
  percentage?: number;
  duration?: number;
  color?: string;
  background?: string;
  height?: string;
  width?: string;
  isPaused?: boolean;
  className?: string;
};

// radial progress bar
export function ProgressBar({
  minimumValue = 0,
  maximumValue = 100,
  percentage,
  duration = 3000,
  color = "black",
  background = "white",
  height = "20px",
  width = "auto",
  isPaused = false,
  className,
}: ProgressBarProps) {
  const progress = useProgressBar({
    minimumValue,
    maximumValue,
    percentage,
    duration,
    isPaused,
  });

  return (
    <div
      style={{
        height: height,
        width: width,
        background: background,
      }}
      className={className}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.min(progress, 100)}%`,
          background: color,
        }}
      ></div>
    </div>
  );
}
