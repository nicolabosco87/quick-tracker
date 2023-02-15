import { useEffect } from "react";
import { loadFromDisk } from "../state/state";

export const useStateSync = () => {
  useEffect(() => {
    loadFromDisk();
  }, []);
};
