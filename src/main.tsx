import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight, Code2, Link, Mail, Menu, MoveUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './style.css';
import './scene.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { n:'01', name:'Kisan Vani', type:'AI-powered agricultural assistant', desc:'A multilingual companion for farmers, combining visual diagnosis, regional voice interfaces and useful local intelligence.', tags:['Gemini API','Sarvam AI','Chart.js','OpenWeatherMap'], tone:'field', mark:'किसान वाणी', note:'INTELLIGENCE FOR THE FIELD' },
  { n:'02', name:'Soul Store', type:'Full-stack commerce, built with care', desc:'A focused shopping experience backed by a layered Spring Boot API, with clear boundaries between products, people and orders.', tags:['Spring Boot','JavaScript','REST API','MVC'], tone:'store', mark:'S / S', note:'A SMALLER, BETTER WAY TO SHOP' },
  { n:'03', name:'DSA Auto-Commit', type:'Chrome extension · Manifest V3', desc:'Accepted solutions from LeetCode and GeeksforGeeks move to GitHub automatically, turning practice into a living record.', tags:['Chrome MV3','JavaScript','GitHub API'], tone:'code', mark:'{ → }', note:'FROM ACCEPTED TO ARCHIVED' },
];
const groups = [ ['Languages','Java · C++ · JavaScript · HTML · CSS'], ['Frameworks','Spring Boot · Node.js · Express.js · Chart.js'], ['Data','PostgreSQL'], ['Tools','Git · GitHub · Firebase · Vercel · Antigravity'], ['APIs','Gemini · Sarvam AI · OpenWeatherMap · GNews'], ['Foundations','DSA · OOP · REST · DOM · DBMS · OS · Networking'] ];
const pages=[['top','Intro'],['about','About'],['skills','Toolkit'],['work','Projects'],['numbers','Progress'],['experience','Community'],['contact','Contact']];

function HeroScene(){
  const mount=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const host=mount.current;if(!host)return;
    let alive=true;let dispose=()=>{};
    const init=async()=>{
    const THREE=await import('three');if(!alive)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{return;}
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.setSize(host.clientWidth,host.clientHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;host.appendChild(renderer.domElement);
    const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x090d12,.045);
    const camera=new THREE.PerspectiveCamera(38,host.clientWidth/host.clientHeight,.1,100);camera.position.set(2.1,.25,15);camera.lookAt(2.1,0,0);
    scene.add(new THREE.HemisphereLight(0xa9c7ed,0x11151b,1.25));
    const key=new THREE.DirectionalLight(0xe4efff,2.4);key.position.set(1,5,7);scene.add(key);
    const blue=new THREE.PointLight(0x719dd0,32,14);blue.position.set(4,1,1);scene.add(blue);
    const warm=new THREE.PointLight(0xd0b28a,10,10);warm.position.set(-2,2,0);scene.add(warm);
    const group=new THREE.Group();group.position.set(2.1,0,0);scene.add(group);
    const stone=new THREE.MeshStandardMaterial({color:0x8396a8,metalness:.72,roughness:.32,transparent:true,opacity:.36});
    const edge=new THREE.MeshStandardMaterial({color:0xb3d1f2,metalness:.65,roughness:.24,emissive:0x263d5b,emissiveIntensity:.35});
    const dark=new THREE.MeshStandardMaterial({color:0x151d27,metalness:.65,roughness:.4});
    const addBox=(w:number,h:number,d:number,x:number,y:number,z:number,mat:THREE.Material)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);group.add(m);return m};
    // Three nested portal frames form a restrained architectural perspective.
    [0,1,2].forEach(i=>{const w=6.2-i*1.1,h=8.2-i*1.15,z=-i*1.65;const t=.055;addBox(t,h,.12,-w/2,0,z,edge);addBox(t,h,.12,w/2,0,z,stone);addBox(w,t,.12,0,h/2,z,stone);addBox(w,t,.12,0,-h/2,z,edge);});
    const slab=addBox(6.12,8.12,.16,0,0,-.11,dark);slab.material=dark;
    const inset=addBox(4.55,6.45,.025,.1,-.1,.03,stone);inset.material=stone;
    // Architectural floor lines converge toward the portal.
    const floor=new THREE.Group();floor.position.set(0,-4.18,0);floor.rotation.x=-Math.PI/2;group.add(floor);
    const lineMat=new THREE.LineBasicMaterial({color:0x829dbb,transparent:true,opacity:.26});
    for(let i=-8;i<=8;i++){const pts=[new THREE.Vector3(i*.55,0,-9),new THREE.Vector3(i*.18,0,2)];floor.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),lineMat));}
    for(let z=-9;z<=2;z+=1.2){const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4,0,z),new THREE.Vector3(4,0,z)]);floor.add(new THREE.Line(geo,lineMat));}
    const dustGeo=new THREE.BufferGeometry();const dustPts:THREE.Vector3[]=[];for(let i=0;i<90;i++)dustPts.push(new THREE.Vector3((Math.random()-.5)*12,(Math.random()-.5)*10,(Math.random()-.5)*8));dustGeo.setFromPoints(dustPts);const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0x9ebce0,size:.018,transparent:true,opacity:.5}));group.add(dust);
    let pointerX=0,pointerY=0,scroll=0,raf=0;
    const pointer=(e:MouseEvent)=>{pointerX=e.clientX/innerWidth-.5;pointerY=e.clientY/innerHeight-.5};
    const onScroll=()=>{scroll=Math.min(1,scrollY/Math.max(1,innerHeight))};
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)};
    window.addEventListener('mousemove',pointer,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',resize);
    let visible=true;const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!reduced)raf=requestAnimationFrame(render)},{threshold:0});observer.observe(host);
    const render=()=>{if(!visible)return;camera.position.x=2.1+(reduced?0:pointerX*.3);camera.position.y=.25+(reduced?0:-pointerY*.18);camera.position.z=15-scroll*2.8;camera.lookAt(2.1,0,-scroll*.35);if(!reduced){group.rotation.y=pointerX*.018;group.position.y=-scroll*.25;}renderer.render(scene,camera);raf=requestAnimationFrame(render)};
    render();
    return()=>{cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('mousemove',pointer);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',resize);scene.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.Line||o instanceof THREE.Points){o.geometry.dispose();const m=o.material;if(Array.isArray(m))m.forEach(x=>x.dispose());else m.dispose();}});renderer.dispose();renderer.domElement.remove()};
    };
    void init().then(cleanup=>{if(cleanup){if(alive)dispose=cleanup;else cleanup();}});
    return()=>{alive=false;dispose()};
  },[]);
  return <div className="hero-scene" ref={mount} aria-hidden="true"/>;
}

function App(){
  const root = useRef<HTMLDivElement>(null);
  const [activePage,setActivePage]=useState(0);
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = reduced ? null : new Lenis({ lerp: .085, wheelMultiplier: .85 });
    if(lenis){ lenis.on('scroll',ScrollTrigger.update); gsap.ticker.add((t)=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
    const ctx=gsap.context(()=>{
      if(!reduced){
        gsap.from('.hero-kicker',{y:18,opacity:0,duration:.8,delay:.15,ease:'power3.out'});
        gsap.from('.hero-title-line',{yPercent:110,rotate:1.5,opacity:0,duration:1.15,stagger:.13,delay:.2,ease:'power4.out'});
        gsap.from('.hero-bottom > *',{y:20,opacity:0,duration:.8,stagger:.1,delay:.72,ease:'power3.out'});
        gsap.to('.architecture',{yPercent:11,scale:1.05,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
        gsap.to('.hero-title',{yPercent:-22,opacity:.25,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.8}});
        gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.from(el,{y:36,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
        gsap.from('.portrait-frame',{clipPath:'inset(0 0 100% 0)',duration:1.25,ease:'power4.inOut',scrollTrigger:{trigger:'.about',start:'top 68%',once:true}});
        gsap.to('.portrait-image',{yPercent:-5,ease:'none',scrollTrigger:{trigger:'.about',start:'top bottom',end:'bottom top',scrub:1}});
        gsap.utils.toArray<HTMLElement>('.project-row').forEach((el,i)=>gsap.from(el,{y:40,opacity:0,duration:.85,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}}));
      }
    },root);
    const pageObserver=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible){const index=pages.findIndex(([id])=>id===visible.target.id);if(index>=0)setActivePage(index)}},{rootMargin:'-30% 0px -45% 0px',threshold:[0,.1,.25,.5,.75]});
    pages.forEach(([id])=>{const el=document.getElementById(id);if(el)pageObserver.observe(el)});
    const mouse=(e:MouseEvent)=>{const x=(e.clientX/window.innerWidth-.5)*2;const y=(e.clientY/window.innerHeight-.5)*2; document.documentElement.style.setProperty('--mx',`${x*8}px`); document.documentElement.style.setProperty('--my',`${y*6}px`)};
    if(!reduced)window.addEventListener('mousemove',mouse,{passive:true});
    return()=>{ctx.revert();pageObserver.disconnect();lenis?.destroy();window.removeEventListener('mousemove',mouse)};
  },[]);
  const toggle=()=>document.body.classList.toggle('menu-open');
  return <main ref={root}>
    <header className="nav"><a className="brand" href="#top">SDJ<span>®</span></a><nav><a href="#top">Home</a><a href="#about">About</a><a href="#work">Projects</a><a href="#numbers">Wins</a><a href="#contact">Contact</a></nav><a className="nav-cta" href="mailto:jyotiswadhindibya@gmail.com">Let’s talk <ArrowUpRight size={14}/></a><button className="menu-toggle" onClick={toggle} aria-label="Toggle menu"><Menu/></button></header>
    <aside className="page-rail" aria-label="Portfolio sections"><span className="page-count">{String(activePage+1).padStart(2,'0')} <i>/ {String(pages.length).padStart(2,'0')}</i></span><nav>{pages.map(([id,label],index)=><a key={id} href={`#${id}`} className={index===activePage?'active':''} aria-label={`Go to ${label}`} aria-current={index===activePage?'location':undefined}><span>{String(index+1).padStart(2,'0')}</span></a>)}</nav><span className="page-name">{pages[activePage][1]}</span></aside>
    <section className="hero" id="top">
      <div className="hero-grid"></div><HeroScene/><div className="architecture" aria-hidden="true"><div className="arch-halo"></div><div className="arch-back"></div><div className="arch-portal"><div className="portal-inset"></div></div><div className="arch-side"></div><div className="arch-floor"></div><div className="arch-light"></div><div className="arch-line l1"></div><div className="arch-line l2"></div><span className="scene-coordinate">20°17′ N<br/>85°49′ E</span></div>
      <div className="hero-content"><p className="eyebrow hero-kicker"><i></i> COMPUTER SCIENCE · BHUBANESWAR, IN</p><h1 className="hero-title"><span className="hero-title-line">SWADHIN</span><span className="hero-title-line second">DIBYA <em>JYOTI</em></span></h1><div className="hero-bottom"><p className="hero-statement">Building intelligent digital<br/>experiences through code.</p><div className="hero-role"><span>CS STUDENT</span><b>·</b><span>FULL-STACK DEVELOPER</span><b>·</b><span>PROBLEM SOLVER</span></div><a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a></div></div>
      <div className="hero-index">PORTFOLIO <span>—</span> 2026</div><div className="hero-side-label">ENGINEERING WITH INTENTION</div>
    </section>
    <section className="about section-pad" id="about"><div className="section-head"><span className="eyebrow reveal">01 / A LITTLE ABOUT ME</span><span className="section-rule"></span><span className="eyebrow muted reveal">THE PERSON BEHIND THE PROCESS</span></div><div className="about-layout"><figure className="portrait-wrap"><div className="portrait-frame"><img className="portrait-image" src="/portrait.webp" alt="Portrait of Swadhin Dibya Jyoti" /></div><figcaption><span>SWADHIN DIBYA JYOTI</span><span>ITER · 2025—29</span></figcaption><span className="photo-index">FIG. 01</span></figure><div className="about-copy"><p className="about-lede reveal">Curiosity is the<br/>first line of code.</p><div className="about-body reveal"><p>I’m a Computer Science and Engineering student at Siksha ‘O’ Anusandhan University, drawn to the craft of making software useful, intelligent and considered.</p><p>My work moves between backend systems, full-stack applications and AI-powered ideas. I enjoy the hard questions in data structures and the small decisions that make an interface feel right.</p></div><div className="edu-block reveal"><span className="eyebrow">CURRENTLY LEARNING</span><div><strong>B.Tech · Computer Science & Engineering</strong><span>SOA University, ITER <b>·</b> 2025—2029 <b>·</b> CGPA 8.88</span></div></div></div></div></section>
    <section className="skills section-pad" id="skills"><div className="section-head"><span className="eyebrow reveal">02 / THE TOOLKIT</span><span className="section-rule"></span><span className="eyebrow muted reveal">TOOLS ARE A MEANS, NOT AN IDENTITY</span></div><div className="skills-intro reveal"><h2>Thoughtful tools.<br/><span>Purposeful outcomes.</span></h2><p>A working set for bringing ideas from first sketch to something people can use.</p></div><div className="skill-list">{groups.map(([a,b],i)=><div className="skill-row reveal" key={a}><span className="skill-no">0{i+1}</span><h3>{a}</h3><p>{b}</p><MoveUpRight size={16}/></div>)}</div></section>
    <section className="work section-pad" id="work"><div className="section-head"><span className="eyebrow reveal">03 / SELECTED WORK</span><span className="section-rule"></span><span className="eyebrow muted reveal">THREE IDEAS, MADE TANGIBLE</span></div><div className="work-intro reveal"><h2>Built to be<br/><em>useful.</em></h2><p>Projects shaped by real problems, a little curiosity, and the belief that good engineering should feel clear.</p></div><div className="project-list">{projects.map(p=><article className={`project-row ${p.tone}`} key={p.n}><div className="project-visual"><span className="project-visual-label">{p.note}</span><div className="project-art"><span>{p.mark}</span><i></i><b></b></div><span className="project-visual-foot">SDJ / PROJECT {p.n}</span></div><div className="project-info"><div className="project-meta"><span>{p.n} / 03</span><span>FEATURED PROJECT</span></div><h3>{p.name}</h3><p className="project-type">{p.type}</p><p className="project-desc">{p.desc}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><a href="https://github.com/jyotiswadhindibya-bit" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><span className="link-placeholder">Live demo <span>COMING SOON</span></span></div></div></article>)}</div></section>
    <section className="numbers section-pad" id="numbers"><div className="section-head"><span className="eyebrow reveal">04 / PROGRESS, IN PRACTICE</span><span className="section-rule"></span><span className="eyebrow muted reveal">A FEW MEASURES OF THE JOURNEY</span></div><div className="stat-grid"><div className="stat reveal"><strong>270<span>+</span></strong><p>DSA problems solved</p></div><div className="stat reveal"><strong>1500</strong><p>LeetCode rating</p></div><div className="stat reveal"><strong>1521</strong><p>CodeChef DSA rating</p></div><div className="stat reveal"><strong>1163</strong><p>CodeChef contest rating</p></div></div><div className="honors reveal"><span className="eyebrow">RECOGNITION</span><p><b>02nd place</b> — Ananta Chakra Agentic AI Council Hackathon</p><p><b>Open source contributor</b> — GSSoC 2026 & SSoC 2026</p></div></section>
    <section className="experience section-pad" id="experience"><div className="section-head"><span className="eyebrow reveal">05 / WITH OTHERS</span><span className="section-rule"></span><span className="eyebrow muted reveal">COMMUNITY & EXPERIENCE</span></div><div className="experience-intro reveal"><h2>Better work<br/>happens <em>together.</em></h2></div><div className="timeline"><article className="timeline-row reveal"><span className="timeline-date">2025 — NOW</span><div className="timeline-main"><span className="eyebrow">TECHNICAL TEAM MEMBER</span><h3>CODEX</h3><p>Technical Society of SOA University</p><ul><li>Technical volunteer at the college Tech Fest.</li><li>Collaborated with a four-member development team.</li><li>Helped organize web development workshops.</li></ul></div><span className="timeline-mark">01</span></article><article className="timeline-row reveal"><span className="timeline-date">2025 — NOW</span><div className="timeline-main"><span className="eyebrow">MEMBER</span><h3>Coding Ninjas</h3><p>Campus Chapter</p><ul><li>Regular DSA practice and coding contests.</li><li>Learning through a community-driven chapter.</li></ul></div><span className="timeline-mark">02</span></article></div></section>
    <footer className="contact section-pad" id="contact"><div className="section-head"><span className="eyebrow reveal">06 / GET IN TOUCH</span><span className="section-rule"></span><span className="eyebrow muted reveal">GOOD THINGS START WITH A CONVERSATION</span></div><div className="contact-main reveal"><p className="eyebrow">HAVE AN IDEA, AN OPPORTUNITY OR AN INTERESTING PROBLEM?</p><h2>LET’S BUILD<br/>SOMETHING <em>MEANINGFUL.</em></h2><a className="contact-email" href="mailto:jyotiswadhindibya@gmail.com">jyotiswadhindibya@gmail.com <ArrowUpRight size={21}/></a></div><div className="footer-bottom"><a className="brand" href="#top">SDJ<span>®</span></a><span>MADE WITH CURIOSITY · © 2026</span><div className="socials"><a href="https://linkedin.com/in/swadhin-dibya-jyoti" target="_blank" rel="noreferrer"><Link size={15}/> LinkedIn <ArrowUpRight size={12}/></a><a href="https://github.com/jyotiswadhindibya-bit" target="_blank" rel="noreferrer"><Code2 size={15}/> GitHub <ArrowUpRight size={12}/></a><a href="mailto:jyotiswadhindibya@gmail.com"><Mail size={15}/> Email <ArrowUpRight size={12}/></a><span>Codolio · LeetCode · CodeChef <small>URL PENDING</small></span></div><a className="back-top" href="#top">BACK TO TOP ↑</a></div></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
