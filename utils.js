import { useEffect, useRef } from "react";

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}

export function getImageUri(imageFileName) {
  return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/thumbnails/t_${imageFileName}?raw=true`;
}
