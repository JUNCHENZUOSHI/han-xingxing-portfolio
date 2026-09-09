import { useCallback, useEffect, useRef, useState } from 'react';

export default function WorkflowAnimation({ content }) {
  const ref = useRef(null);
  const timers = useRef([]);
  const [phase, setPhase] = useState(-1);
  const [complete, setComplete] = useState(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setComplete(false);
    setPhase(0);
    content.phases.forEach((_, index) => {
      timers.current.push(setTimeout(() => setPhase(index), index * 620));
    });
    timers.current.push(setTimeout(() => {
      setPhase(content.phases.length - 1);
      setComplete(true);
    }, content.phases.length * 620));
  }, [clearTimers, content.phases]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return clearTimers;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      play();
      observer.disconnect();
    }, { threshold: 0.35 });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); clearTimers(); };
  }, [clearTimers, play]);

  return (
    <div className={`workflow-animation${complete ? ' workflow-animation--complete' : ''}`} ref={ref}>
      <div className="workflow-animation__roles">
        <span>{content.human}</span><span>{content.ai}</span>
      </div>
      <ol className="workflow-animation__steps">
        {content.phases.map((item, index) => (
          <li className={index <= phase || complete ? 'is-active' : ''} key={item.title}>
            <span className="workflow-animation__index">0{index + 1}</span>
            <strong>{item.title}</strong>
            <small>{item.detail}</small>
          </li>
        ))}
      </ol>
      <div className="workflow-animation__tools" aria-label="Workflow tools">
        {content.tools.map((tool) => <span key={tool}>{tool}</span>)}
      </div>
      {complete && <button className="workflow-animation__replay" type="button" onClick={play}>{content.replay}</button>}
    </div>
  );
}
