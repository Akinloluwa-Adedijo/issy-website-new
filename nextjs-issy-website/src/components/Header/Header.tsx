import { useMobile } from "../../hooks/use-mobile";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks, socialLinks } from "../../data/navData";
import { useGSAP } from "@gsap/react";
import IssyLogo from "../../components/IssyLogo/IssyLogo";

import Link from "next/link"
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
    const isMobile = useMobile();
    // console.log(isMobile)
    console.log(isOpen)


    return <header>
      {isMobile ? <MobileHeader isOpen={isOpen} setIsOpen={setIsOpen}/> : <DesktopHeader />}
    </header>
}


const DesktopHeader = () => {
  return <nav className="w-full flex justify-between items-center p-6 fixed top-0 z-50">
          <Link href="/" className="text-fg">
          <IssyLogo className="w-[200px]" color="var(--color-fg)" />
          </Link>
          <ul className="flex gap-5">
            {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-fg text-xl uppercase">
                {link.name}
              </Link>
            </li>
          ))}</ul>
        </nav>
}


const MobileHeader = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {
  const menuOverlayRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);
    useGSAP(() => {
      if (!menuOverlayRef.current) return;
      
      if(tl.current){
        tl.current.kill();
      }
      // Create the timeline only once on mount
      tl.current = gsap.timeline({paused: true});
      tl.current.to(menuOverlayRef.current, {
        duration: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power2.out",
      });
    }, {scope: menuOverlayRef});
  

    useEffect(() => {
      if(tl.current){
        if(isOpen){
          tl.current.play();
        }else{
          tl.current.reverse();
        }
      }
    }, [isOpen]);
  return (
    <>
      {/* Always visible nav bar */}
      <nav className="w-full flex justify-between items-center p-6 fixed top-0 z-50">
        <Link href="/" className="text-fg">
          <IssyLogo className="w-[200px]" color="var(--color-fg)" />
        </Link>

        <button className="uppercase text-xl" onClick={() => setIsOpen(!isOpen)}>Menu</button>
      </nav>

      {/* Animated full-screen menu overlay */}
      <div className="menu-overlay flex flex-col justify-between items-center p-6" ref={menuOverlayRef}>
        <div className="menu-nav w-full flex justify-between items-center">
          <Link href="/" className="text-fg">
            <IssyLogo className="w-[200px]" color="var(--color-bg)" /> 
          </Link>

          <button className="uppercase text-xl text-bg" onClick={() => setIsOpen(!isOpen)}>Close</button>
        </div>

        <div className="menu-items flex flex-col items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-bg  uppercase text-4xl">
                {link.name}
              </Link>
            </li>
          ))}
        </div>
        
        <div className="menu-social flex items-center gap-5">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-bg text-xl uppercase ">
                {link.name}
              </Link>
            </li>
          ))}
        </div>
      </div>
    </>
  )
}



export default Header