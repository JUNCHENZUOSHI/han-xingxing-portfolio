/**
 * WireframePlaceholder — 5 张线框面板（源自「能力矩阵-5张线框图.html」）。
 * 每个 variant 对应一个产品界面轮廓，替换真实截图时直接换此组件。
 */
export default function WireframePlaceholder({ variant = 0 }) {
  switch (variant) {
    case 0: // 用户体验策略 — 策略闭环图
      return (
        <div className="wf wf-01">
          <div className="row">
            <div className="node"><div className="t" /><div className="s" /></div>
            <span className="arrow">→</span>
            <div className="node"><div className="t" /><div className="s" /></div>
            <span className="arrow">→</span>
            <div className="node"><div className="t" /><div className="s" /></div>
          </div>
          <div className="loop-arrow" />
          <div className="metric-row">
            <div className="metric" /><div className="metric" /><div className="metric" />
          </div>
        </div>
      );

    case 1: // 企业级 SaaS — B端后台
      return (
        <div className="wf wf-02">
          <div className="sidebar">
            <div className="icon" /><div className="icon" /><div className="icon" /><div className="icon" /><div className="icon" />
          </div>
          <div className="main">
            <div className="topbar">
              <div className="search" /><div className="btn" />
            </div>
            <div className="kpi-row">
              <div className="kpi"><div className="v" /><div className="l" /></div>
              <div className="kpi"><div className="v" /><div className="l" /></div>
              <div className="kpi"><div className="v" /><div className="l" /></div>
            </div>
            <div className="table">
              <div className="th"><span /><span /><span /><span /></div>
              <div className="tr"><span /><span /><span /><span /></div>
              <div className="tr"><span /><span /><span /><span /></div>
              <div className="tr"><span /><span /><span /><span /></div>
              <div className="tr"><span /><span /><span /><span /></div>
            </div>
          </div>
        </div>
      );

    case 2: // AI产品体验 — AI对话界面
      return (
        <div className="wf wf-03">
          <div className="conv-list">
            <div className="conv-item"><div className="t" /><div className="s" /></div>
            <div className="conv-item"><div className="t" /><div className="s" /></div>
            <div className="conv-item"><div className="t" /><div className="s" /></div>
            <div className="conv-item"><div className="t" /><div className="s" /></div>
          </div>
          <div className="chat">
            <div className="msg">
              <div className="avatar" />
              <div className="bubble"><div className="l1" /><div className="l2" /></div>
            </div>
            <div className="msg user">
              <div className="bubble"><div className="l1" /></div>
              <div className="avatar" />
            </div>
            <div className="msg">
              <div className="avatar" />
              <div className="bubble"><div className="l1" /><div className="l2" /><div className="l2" style={{ width: '50%' }} /></div>
            </div>
            <div className="input-bar">
              <div className="field" /><div className="send" />
            </div>
          </div>
        </div>
      );

    case 3: // 设计系统 — 组件库
      return (
        <div className="wf wf-04">
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
              <div className="input-row"><div className="input" /><div className="input" /></div>
            </div>
            <div className="comp-group">
              <div className="gt" />
              <div className="type-row"><div className="type-l1" /><div className="type-l2" /><div className="type-l3" /></div>
            </div>
          </div>
        </div>
      );

    case 4: // 增长设计 — 数据仪表盘
      return (
        <div className="wf wf-05">
          <div className="kpi-row">
            <div className="kpi"><div className="v" /><div className="l" /></div>
            <div className="kpi"><div className="v" /><div className="l" /></div>
            <div className="kpi"><div className="v" /><div className="l" /></div>
          </div>
          <div className="chart-row">
            <div className="chart">
              <div className="ct" />
              <div className="plot">
                <div className="bar" style={{ height: '40%' }} />
                <div className="bar" style={{ height: '65%' }} />
                <div className="bar" style={{ height: '50%' }} />
                <div className="bar" style={{ height: '80%' }} />
                <div className="bar" style={{ height: '60%' }} />
                <div className="bar" style={{ height: '90%' }} />
                <div className="bar" style={{ height: '75%' }} />
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
