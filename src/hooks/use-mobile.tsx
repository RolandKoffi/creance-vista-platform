
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth < MOBILE_BREAKPOINT)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Définir l'état initial
    handleResize()
    
    // Ajouter l'écouteur d'événement
    window.addEventListener("resize", handleResize)
    
    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}
