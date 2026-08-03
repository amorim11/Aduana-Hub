import { useUploadStore } from "./useUploadStore";

const TICK_MS = 350;
const FAIL_RATE = 0.1;

/**
 * Runs a self-contained interval for a single upload id. Each call owns its
 * own timer and closure, so a failure here never touches any other item
 * being simulated in the queue at the same time.
 */
export function simulateUpload(id: string) {
  const { updateProgress, setStatus } = useUploadStore.getState();

  const willFail = Math.random() < FAIL_RATE;
  const failAtProgress = willFail ? 40 + Math.random() * 40 : null;

  let progress = 0;

  const interval = setInterval(() => {
    progress = Math.min(100, progress + (8 + Math.random() * 12));

    if (failAtProgress !== null && progress >= failAtProgress) {
      updateProgress(id, Math.round(failAtProgress));
      setStatus(id, "failed");
      clearInterval(interval);
      return;
    }

    updateProgress(id, Math.round(progress));

    if (progress >= 100) {
      setStatus(id, "completed");
      clearInterval(interval);
    }
  }, TICK_MS);
}
