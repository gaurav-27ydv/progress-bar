import { useCallback, useEffect, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";

export function TaskManager() {
  const [duration, setDuration] = useState(5000);
  const [status, setStatus] = useState(false);

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const onClick = useCallback(() => {
    setStatus(true);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!status) {
        setDuration((duration) => 1.5 * duration);
      } else {
        setDuration(1000);
        clearInterval(intervalRef.current as unknown as number);
      }
    }, 500);
    return () => clearInterval(intervalRef.current as unknown as number);
  }, [status]);

  return (
    <div>
      <button onClick={onClick}>Mark as Done!</button>
      <ProgressBar duration={duration} />
    </div>
  );
}
