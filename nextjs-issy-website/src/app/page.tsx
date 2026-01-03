"use client";

import {useGSAP} from "@gsap/react";
import Header from "@/components/Header/Header";
import IssyLogo from "@/components/IssyLogo/IssyLogo";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import useDocumentTitle from "@/utils/useDocumentTitle";
import { useEffect, useRef, useState } from "react";
import {useMobile} from "@/hooks/use-mobile";
import { workData } from "@/data/data";
import WorkCard from "@/components/WorkCard/WorkCard";

const Home = () => {
  useDocumentTitle("Isioma Idehen | Home");

  const [isScrolled, setIsScrolled] = useState(false);
    const isMobile = useMobile();


  useEffect(() => {
    const handleScroll = () => {
      if(isMobile){
        setIsScrolled(window.scrollY > 50);
        return;
      }
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const counterProgress = useRef<HTMLHeadingElement>(null);
const counterContainer= useRef<HTMLDivElement>(null);
const counterValue = useRef({ value: 0 });
const heroImage = useRef<HTMLImageElement>(null);
const logoRef = useRef<SVGSVGElement>(null);
const reelRef = useRef<HTMLDivElement>(null);
const introRef = useRef<HTMLDivElement>(null);


const timeline = useRef<gsap.core.Timeline>(null);

// console.log(introRef.current?.children)

const splitText = (selector:HTMLHeadingElement,type:string,className:string)=>{
  return SplitText.create(selector,{
    type:type,
    [`${type}Class`]: className,
    mask: "chars",
  })
}
  useGSAP(() => {

    if(!counterContainer.current || !counterProgress.current || !logoRef.current || !introRef.current){
      return
    }
    
    const paths = logoRef?.current?.querySelectorAll('path');
    gsap.set(paths, { y: 100, opacity: 0 });


    const tl = gsap.timeline();

    timeline.current = tl;

    tl.to(counterValue.current, {
      value:100,
      duration:3,
      ease:"power3.out",
      onUpdate:()=>{
        counterProgress.current!.textContent = Math.floor(counterValue.current.value).toString() + "%"
      },
      onComplete:()=>{
        const counterSplit = splitText(counterProgress.current as HTMLHeadingElement, "chars", "char");
        gsap.to(counterSplit.chars, {
          x:"-100%", 
          duration:0.75,
          ease:"power3.out",
          stagger: 0.1,
          delay: 1,
          onComplete:()=>{
            counterContainer.current?.remove()
          }
        })
      }
    })

    tl.to(counterContainer.current,{
      scale:1,
      duration:3,
      ease:"power3.out",
    }, "<")

    tl.to(reelRef.current,{
      clipPath:"polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
      duration:1.5,
      ease:"power3.out",
    }, 4.5)

    tl.to(heroImage.current,{
      scale:1.5,
      duration:1.5,
      ease:"power3.out",
    }, "<")

    tl.to(reelRef.current,{
      clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration:2,
      ease:"power3.out",
    }, 6)
    
    tl.to(heroImage.current,{
      scale:1,
      duration:2,
      ease:"power3.out",
    }, 6)

    tl.to(paths, {
            duration: 0.75,
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "power3.out",
        }, 6);

    tl.to(introRef.current?.children,{
      opacity: 1,
      y:0,
      duration:0.75,
      stagger: 0.05,
      ease:"power3.out",
    },7)
  }, [logoRef])
    
  
  return (
    <section>
      <div className="preloader-counter" ref={counterContainer}>
        <h1 ref={counterProgress}>0%</h1>
      </div>
      {/* Landing Page Intro Section */}
      {isScrolled && <Header />}
      <section className="hero relative p-6 flex flex-col justify-between">
        <div className="">
          {/* Demo Reel */}
          <div className="hero-bg" ref={reelRef}>
            <img src="/gifs/voftd.gif" alt="Video reel" ref={heroImage} loading="lazy" />
          </div>

          {/* Landing Page Logo & Text for Screen Reader */}
          <h1 aria-hidden="true" className="sr-only">Isioma Idehen</h1>
          <IssyLogo className="w-full" color="var(--color-fg)" ref={logoRef}/>
        </div>            
        
        <div className="intro flex flex-col lg:flex-row flex-col-reverse items-start lg:items-end justify-between gap-10 overflow-hidden" ref={introRef}>
          <button className="text-xl bg-accent text-bg px-6 py-2">Watch Showreel</button>
          <p className="indent-12 w-full lg:w-1/2 text-4xl">Isioma Idehen is a director, creative director and  writer passionate about telling emotive and raw stories across different mediums.</p>
        </div> 
      </section>

      <section className="flex flex-col gap-5 p-5 pt-20">
        <h2 className="text-[10vw]">Featured Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {workData.filter((work) => work.featured).map((work, index) => (
          index === 0 || index === 3 ? <WorkCard key={work.title} project={work}/> : <WorkCard key={work.title} project={work}  />
        ))}
      </div>
      </section>
    </section>
  ) 
};

export default Home;
``