"use client";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ReactLenis} from "@studio-freight/react-lenis";
import VideoBg from "@/components/VideoBg";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import DOMTarget = gsap.DOMTarget;
import {useRef, useState} from "react";
import IconLogo from "@/components/icons/icon-logo.svg";

gsap.registerPlugin(ScrollTrigger);

const ScrollPage = () => {
  const section1 = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const cards: DOMTarget[] = gsap.utils.toArray("p");

    const tl_text = gsap.timeline({
      scrollTrigger: {
        trigger: section1.current,
        start: "top top",
        end: "+=1300px top",
        pin: section1.current,
        scrub: 0.5,
        onUpdate({progress}) {
          setProgress(progress)
        }
      },
    });

    const animateText = (text: DOMTarget, index: number) => {
      let duration = 0.5 + 0.1 * index;

      gsap.set(text, {
        scale: gsap.utils.interpolate(0.8, 1.5)(1 - duration),
        y: gsap.utils.interpolate(0, -800)(1 - duration),
        alpha: gsap.utils.interpolate(
          0,
          1,
        )(gsap.parseEase("power4.in")((1 - duration) / 0.45)),
      });

      tl_text.to(
        text,
        {
          duration,
          y: -900,
          scale: 1.5,
          ease: "none",
        },
        0,
      );

      if (index < 5) {
        if (duration > 0.55) {
          tl_text.to(
            text,
            {
              duration: duration - 0.55,
              alpha: 1,
              ease: "none",
            },
            0,
          );
        }

        tl_text.to(
          text,
          {duration: 0.45, alpha: 0, ease: "power4.out"},
          index * 0.1,
        );
      } else {
        tl_text
          .to(
            text,
            {duration: 1, y: "-=900", scale: 1.5, ease: "none"},
            "-=0.9",
          )
          .to(text, {duration: 0.45, alpha: 1, ease: "power4.in"}, "-=1")
          .to(text, {duration: 0.45, alpha: 0, ease: "power4.out"}, "-=0.45");
      }
    };

    cards.forEach(animateText);
  }, []);
  return (
    <>
      <header className="flex text-white justify-between items-center fixed z-50 top-0 w-full pt-[55px] px-10">
        <span className="block w-8">
          <IconLogo/>
        </span>
        <nav className="uppercase list-none gap-7 hidden md:flex text-center">
          <li className='flex flex-col'>
            <a className='inline-block' href="#homepage-intro">Introduction</a>
            <span className='inline-block bg-white h-1' style={{width: `${progress * 100}%`}}/>
          </li>
          <li>
            <a href="#homepage-tech">The Technology</a>
          </li>
          <li>
            <a href="#homepage-spot">Tech Spotlight</a>
          </li>
          <li>
            <a href="#homepage-why">Why Music</a>
          </li>
        </nav>
        <button>Toggle</button>
      </header>
      <div className="h-screen fixed inset-0 z-10 bg-[#e6e6e6] p-3">
        <VideoBg/>
      </div>
      <div
        ref={section1}
        className="p-3 h-screen section overflow-hidden z-20 text-white  text-center"
      >
        <div
          className="contents absolute inset-0 p-8 [&>p]:opacity-0 [&>p]:text-2xl [&>p]:absolute [&>p]:w-full [&>p]:bottom-0">
          <p>When you want something,</p>
          <p>all the universe conspires</p>
          <p>in helping you to achieve it.</p>
          <p>Paulo Coelho</p>
          <p></p>
          <p></p>
          <p>Feed is that conspiracy:</p>
          <p>the conspiracy of trust.</p>
          <p></p>
          <p></p>
          <p>Trust is the single</p>
          <p>most important ingredient</p>
          <p>missing from digital relationships.</p>
        </div>
      </div>
      <main
        id="page2"
        className="h-screen bg-[blue] section relative z-50"
      ></main>
    </>
  );
};

export default ScrollPage;
