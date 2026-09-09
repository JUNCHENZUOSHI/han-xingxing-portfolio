import { useCallback, useEffect, useRef, useState } from 'react';

const STAGE_DURATION = 1080;

export default function WorkflowAnimation({ content }) {
  const ref = useRef(null);
  const timers = useRef([]);
  const [phase, setPhase] = useState(-1);
  const [complete, setComplete] = useState(false);
  const [run, setRun] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isEnglish = content.phases[0]?.title === 'Start';
  const status = isEnglish
    ? { pending: 'Queued', active: 'In progress', complete: 'Complete' }
    : { pending: '待开始', active: '进行中', complete: '完成' };
  const toolLabels = isEnglish
    ? ['Insight support', 'Interaction & visual', 'Implementation & QA']
    : ['洞察辅助', '交互与视觉', '实现与 QA'];

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(content.phases.length - 1);
      setComplete(true);
      return;
    }
    setRun((value) => value + 1);
    setComplete(false);
    setPhase(0);
    content.phases.slice(1).forEach((_, index) => {
      timers.current.push(setTimeout(() => setPhase(index + 1), (index + 1) * STAGE_DURATION));
    });
    timers.current.push(setTimeout(() => {
      setPhase(content.phases.length - 1);
      setComplete(true);
    }, content.phases.length * STAGE_DURATION));
  }, [clearTimers, content.phases]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    if (motionQuery.matches) {
      setPhase(content.phases.length - 1);
      setComplete(true);
      return clearTimers;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      play();
      observer.disconnect();
    }, { threshold: 0.35 });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); clearTimers(); };
  }, [clearTimers, content.phases.length, play]);

  const activeTool = phase <= 1 ? 0 : phase <= 3 ? 1 : 2;

  return (
    <div
      className={`workflow-animation${complete ? ' workflow-animation--complete' : ''}${reducedMotion ? ' workflow-animation--reduced' : ''}`}
      ref={ref}
      key={run}
    >
      <div className="workflow-animation__console">
        <header className="workflow-animation__statusbar">
          <span>{content.human}</span>
          <span className="workflow-animation__counter">WORKFLOW · 0{Math.max(phase + 1, 1)} / 05</span>
          <span>{content.ai}</span>
        </header>

        <ol className="workflow-animation__steps">
          {content.phases.map((item, index) => {
            const stageState = complete || index < phase ? 'complete' : index === phase ? 'active' : 'pending';
            return (
              <li className={`workflow-animation__stage is-${stageState}`} key={item.title}>
                <div className="workflow-animation__stage-head">
                  <span className="workflow-animation__index">0{index + 1}</span>
                  <span className="workflow-animation__state"><i aria-hidden="true" />{status[stageState]}</span>
                </div>
                <strong>{item.title}</strong>
                <ul className="workflow-animation__items">
                  {item.detail.split(' · ').map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className="workflow-animation__tools" aria-label="Workflow tools">
          {content.tools.map((tool, index) => (
            <div className={`workflow-animation__tool${complete || index === activeTool ? ' is-active' : ''}`} key={tool}>
              <span className="workflow-animation__tool-mark" aria-hidden="true">{index === 0 ? '◌' : index === 1 ? '◇' : '⌁'}</span>
              <span><strong>{tool.split('｜')[0]}</strong><small>{toolLabels[index]}</small></span>
            </div>
          ))}
        </div>
      </div>

      {complete && (
        <button className="workflow-animation__play" type="button" onClick={play} aria-label={content.replay}>
          <span aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
