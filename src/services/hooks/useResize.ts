import { useState, useEffect } from "react";
import { getStageSize } from "@/utils";
import { debounce } from "@/utils";

export default function useResize() {
  const [size, setSize] = useState(getStageSize());
  // 窗口改变
  useEffect(() => {
    const handleResize = debounce((e: UIEvent) => {
      setSize(getStageSize());
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { size };
}
