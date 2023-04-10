import { useEffect, useRef, useState } from "react";

type UseProgressBarProps = {
  minimumValue?: number;
  maximumValue?: number;
  percentage?: number;
  duration?: number;
  isPaused?: boolean;
};

const REFRESH_RATE = 60;
const MAX_POSSIBLE_VALUE = 100;

function useProgressBar({
  minimumValue = 0,
  maximumValue = 100,
  percentage,
  duration = 0,
  isPaused = false,
}: UseProgressBarProps) {
  const minValuetoUse = Math.max(0, minimumValue);
  const maxValuetoUse = Math.min(MAX_POSSIBLE_VALUE, maximumValue);

  const [progress, setProgress] = useState(minValuetoUse);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const delta = maxValuetoUse / ((duration / 1000) * REFRESH_RATE);
  const REFRESH_INTERVAL = 1000 / REFRESH_RATE;

  useEffect(() => {
    if (percentage !== undefined) {
      setProgress(percentage);
      return;
    }
    if (isPaused) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress + delta > maxValuetoUse) {
          clearInterval(intervalRef.current as NodeJS.Timer);
          return maxValuetoUse;
        } else {
          return currentProgress + delta;
        }
      });
    }, REFRESH_INTERVAL);
    return () => {
      clearInterval(intervalRef.current as NodeJS.Timer);
    };
  }, [percentage, delta, isPaused, maxValuetoUse, REFRESH_INTERVAL]);

  return progress;
}

type UseRadialProgressBarProps = {
  minimumValue?: number;
  maximumValue?: number;
  percentage?: number;
  duration: number;
  isPaused?: boolean;
};

type UseRadialProgressBarReturn = [number, number, number, number];

function useRadialProgressBar({
  minimumValue,
  maximumValue,
  percentage,
  duration,
  isPaused,
}: UseRadialProgressBarProps): UseRadialProgressBarReturn {
  const progress = useProgressBar({
    minimumValue,
    maximumValue,
    percentage,
    duration,
    isPaused,
  });

  let returnValue: UseRadialProgressBarReturn;
  if (progress <= 25) {
    returnValue = [(progress * 90) / 25, 90, 90, 90];
  } else if (progress <= 50) {
    returnValue = [90, ((50 - progress) * 90) / 25, 90, 90];
  } else if (progress <= 75) {
    returnValue = [90, 0, ((75 - progress) * 90) / 25, 90];
  } else {
    returnValue = [90, 0, 0, ((100 - progress) * 90) / 25];
  }
  return returnValue;
}

export { useProgressBar, useRadialProgressBar };
