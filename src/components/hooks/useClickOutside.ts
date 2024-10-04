import { TUseClickOutside } from "@/types/hooks/hooks";
import { useEffect } from "react";

const useClickOutside: TUseClickOutside = (refModal, active, setActive) => {
    

  useEffect(() => {
    function checkClick(e: MouseEvent) {
        if (
          refModal.current &&
          e.target instanceof Node &&
          active &&
          !refModal.current.contains(e.target) && 
          document.contains(e.target)
        ) {
          setActive(false);
        }
    }

    document.addEventListener("click", checkClick);

    return () => {
        document.removeEventListener("click", checkClick);

    }
  }, [active]);
}  

export default useClickOutside;