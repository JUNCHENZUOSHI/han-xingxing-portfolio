/**
 * WireframePlaceholder — 5 张彩色线框图（按参考代码 1:1）。
 * 每个 variant 对应一个产品界面轮廓 + 彩色主题色（01蓝 02青 03紫 04橙 05绿）。
 */
export default function WireframePlaceholder({ variant = 0, title = '' }) {
  switch (variant) {
    case 0: // 01 用户体验策略：蓝色
      return (
        <div className="wf wf-01">
          <div className="accent-bar" />
          <span className="label">01 / {title}</span>
          <div className="row">
            <div className="node"><div className="t" /><div className="s" /></div>
            <span className="arrow">→</span>
            <div className="node highlight"><div className="t" /><div className="s" /></div>
            <span className="arrow">→</span>
            <div className="node"><div className="t" /><div className="s" /></div>
          </div>
          <div className="loop-arrow" />
          <div className="metric-row">
            <div className="metric"><div className="dot" /></div>
            <div className="metric"><div className="dot" /></div>
            <div className="metric"><div className="dot" /></div>
          </div>
        </div>
      );

    case 1: // 02 企业级 SaaS：青色
      return (
        <div className="wf wf-02">
          <div className="accent-bar" />
          <span className="label">02 / {title}</span>
          <div className="sidebar">
            <div className="icon active" /><div className="icon" /><div className="icon" /><div className="icon" /><div className="icon" />
          </div>
          <div className="main">
            <div className="topbar">
              <div className="search" /><div className="btn" />
            </div>
            <div className="kpi-row">
              <div className="kpi highlight"><div className="v" /><div className="l" /></div>
              <div className="kpi"><div className="v" /><div className="l" /></div>
              <div className="kpi"><div className="v" /><div className="l" /></div>
            </div>
            <div className="table">
              <div className="th"><span /><span /><span /><span /></div>
              <div className="tr"><span /><span /><span /><span /></div>
              <div className="tr highlight"><span /><span /><span /><span /></div>
              <div className="tr"><span /><span /><span /><span /></div>
              <div className="tr"><span /><span /><span /><span /></div>
            </div>
          </div>
        </div>
      );

    case 2: // 03 AI产品体验：紫色
      return (
        <div className="wf wf-03">
          <div className="accent-bar" />
          <span className="label">03 / {title}</span>
          <div className="conv-list">
            <div className="conv-item active"><div className="t" /><div className="s" /></div>
            <div className="conv-item"><div className="t" /><div className="s" /></div>
            <div className="conv-item"><div className="t" /><div className="s" /></div>
            <div className="conv-item"><div className="t" /><div className="s" /></div>
          </div>
          <div className="chat">
            <div className="msg ai">
              <div className="avatar" />
              <div className="bubble"><div className="l1" /><div className="l2" /></div>
            </div>
            <div className="msg user">
              <div className="bubble"><div className="l1" /></div>
              <div className="avatar" />
            </div>
            <div className="msg ai">
              <div className="avatar" />
              <div className="bubble"><div className="l1" /><div className="l2" /><div className="l2" style={{ width: '50%' }} /></div>
            </div>
            <div className="input-bar">
              <div className="field" /><div className="send" />
            </div>
          </div>
        </div>
      );

    case 3: // 04 设计系统：橙色
      return (
        <div className="wf wf-04">
          <div className="accent-bar" />
          <span className="label">04 / {title}</span>
          <div className="cat-nav">
            <div className="cat active" /><div className="cat" /><div className="cat" /><div className="cat" /><div className="cat" /><div className="cat" />
          </div>
          <div className="components">
            <div className="comp-group">
              <div className="gt" />
              <div className="btn-row"><div className="btn primary" /><div className="btn" /></div>
              <div className="btn-row"><div className="btn" /><div className="btn" /></div>
            </div>
            <div className="comp-group">
              <div className="gt" />
              <div className="color-row"><div className="swatch" /><div className="swatch" /><div className="swatch" /><div className="swatch" /><div className="swatch" /></div>
            </div>
            <div className="comp-group">
              <div className="gt" />
              <div className="input-row"><div className="input focus" /><div className="input" /></div>
            </div>
            <div className="comp-group">
              <div className="gt" />
              <div className="type-row"><div className="type-l1" /><div className="type-l2" /><div className="type-l3" /></div>
            </div>
          </div>
        </div>
      );

    case 4: // 05 增长设计：绿色
      return (
        <div className="wf wf-05">
          <div className="accent-bar" />
          <span className="label">05 / {title}</span>
          <div className="kpi-row">
            <div className="kpi highlight"><div className="v" /><div className="l" /></div>
            <div className="kpi"><div className="v" /><div className="l" /></div>
            <div className="kpi"><div className="v" /><div className="l" /></div>
          </div>
          <div className="chart-row">
            <div className="chart">
              <div className="ct" />
              <div className="plot">
                <div className="bar" style={{ height: '40%' }} />
                <div className="bar up" style={{ height: '65%' }} />
                <div className="bar" style={{ height: '50%' }} />
                <div className="bar up" style={{ height: '80%' }} />
                <div className="bar" style={{ height: '60%' }} />
                <div className="bar up" style={{ height: '90%' }} />
                <div className="bar up" style={{ height: '75%' }} />
              </div>
            </div>
            <div className="funnel">
              <div className="ft" />
              <div className="step" /><div className="step" /><div className="step" /><div className="step" />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
