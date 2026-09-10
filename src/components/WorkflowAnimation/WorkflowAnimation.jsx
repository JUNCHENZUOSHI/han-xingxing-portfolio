import { useCallback, useEffect, useRef, useState } from 'react';

const TITLE_DELAY = 600;
const ITEM_INTERVAL = 500;
const STAGE_TRANSITION = 550;

export default function WorkflowAnimation({ content }) {
  const ref = useRef(null);
  const timers = useRef([]);
  const [phase, setPhase] = useState(-1);
  const [revealedItems, setRevealedItems] = useState(0);
  const [complete, setComplete] = useState(false);
  const [run, setRun] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isEnglish = content.phases[0]?.title === 'Start';
  const status = isEnglish
    ? { pending: 'Queued', active: 'In progress', complete: 'Complete' }
    : { pending: '待开始', active: '进行中', complete: '完成' };
  const toolLabels = isEnglish
    ? ['Insight support', 'Interaction & visual', 'Implementation & QA']
    : ['洞察辅助', '交互与视觉', '实现与质检'];
  const stageTools = [['ChatGPT'], ['ChatGPT'], ['ChatGPT'], ['ChatGPT', 'Figma'], ['ChatGPT', 'Figma', 'Codex']];

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(content.phases.length - 1);
      setRevealedItems(content.phases[content.phases.length - 1]?.detail.split(' · ').length || 0);
      setComplete(true);
      return;
    }
    setRun((value) => value + 1);
    setComplete(false);
    let timeline = 0;

    content.phases.forEach((item, index) => {
      const itemCount = item.detail.split(' · ').length;
      timers.current.push(setTimeout(() => {
        setPhase(index);
        setRevealedItems(0);
      }, timeline));

      Array.from({ length: itemCount }, (_, itemIndex) => {
        timers.current.push(setTimeout(() => setRevealedItems(itemIndex + 1), timeline + TITLE_DELAY + (itemIndex + 1) * ITEM_INTERVAL));
      });

      timeline += TITLE_DELAY + itemCount * ITEM_INTERVAL + (index === content.phases.length - 1 ? 0 : STAGE_TRANSITION);
    });

    timers.current.push(setTimeout(() => {
      setPhase(content.phases.length - 1);
      setRevealedItems(content.phases[content.phases.length - 1]?.detail.split(' · ').length || 0);
      setComplete(true);
    }, timeline + STAGE_TRANSITION));
  }, [clearTimers, content.phases]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    if (motionQuery.matches) {
      setPhase(content.phases.length - 1);
      setRevealedItems(content.phases[content.phases.length - 1]?.detail.split(' · ').length || 0);
      setComplete(true);
      return clearTimers;
    }
    return clearTimers;
  }, [clearTimers, content.phases]);

  const counterLabel = isEnglish ? 'WORKFLOW' : '工作流';
  const playLabel = isEnglish ? 'Play workflow' : '播放工作流';

  return (
    <div
      className={`workflow-animation${complete ? ' workflow-animation--complete' : ''}${reducedMotion ? ' workflow-animation--reduced' : ''}`}
      ref={ref}
      key={run}
    >
      <div className="workflow-animation__console">
        <header className="workflow-animation__statusbar">
          <span>{content.human}</span>
          <span className="workflow-animation__counter">{counterLabel} · 0{Math.max(phase + 1, 1)} / 05</span>
          <span>{content.ai}</span>
        </header>

        <ol className="workflow-animation__steps">
          {content.phases.map((item, index) => {
            const stageState = complete || index < phase ? 'complete' : index === phase ? 'active' : 'pending';
            return (
              <li className={`workflow-animation__stage workflow-animation__stage--${index + 1} is-${stageState}`} key={item.title}>
                <div className="workflow-animation__stage-head">
                  <span className="workflow-animation__index">0{index + 1}</span>
                  <span className="workflow-animation__state"><i aria-hidden="true" />{status[stageState]}</span>
                </div>
                <strong>{item.title}</strong>
                <ul className="workflow-animation__items">
                  {item.detail.split(' · ').map((detail, itemIndex) => (
                    <li className={complete || index < phase || (index === phase && itemIndex < revealedItems) ? 'is-revealed' : ''} key={detail}>{detail}</li>
                  ))}
                </ul>
                <div className="workflow-animation__tool-chips" aria-label={isEnglish ? 'Stage tools' : '阶段工具'}>
                  {stageTools[index].map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </li>
            );
          })}
        </ol>

        <p className="workflow-animation__legend">
          <span>ChatGPT · {toolLabels[0]}</span>
          <span>Figma · {toolLabels[1]}</span>
          <span>Codex · {toolLabels[2]}</span>
        </p>
      </div>

      {(phase === -1 || complete) && (
        <button className="workflow-animation__play" type="button" onClick={play} aria-label={complete ? content.replay : playLabel}>
          <span aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
