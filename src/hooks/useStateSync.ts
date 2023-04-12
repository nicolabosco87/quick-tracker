import { useEffect, useState } from "react";
import { loadFromDisk } from "../state/state";

export const useStateSync = () => {
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    loadFromDisk().then(() => setisLoaded(true));
  }, []);

  return isLoaded;
};
