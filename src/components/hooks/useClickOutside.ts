import { TUseClickOutside } from "@/types/hooks/hooks";
import { useEffect } from "react";

const useClickOutside: TUseClickOutside = (refModal, active, setActive) => {
    

  useEffect(() => {
    function checkClick(e: MouseEvent) {
      console.log(Boolean(refModal.current), Boolean(e.target instanceof Node), 
      active )
        if (
          refModal.current &&
          e.target instanceof Node &&
          active &&
          !refModal.current.contains(e.target) && 
          document.contains(e.target)
        ) {
          console.log(e)
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