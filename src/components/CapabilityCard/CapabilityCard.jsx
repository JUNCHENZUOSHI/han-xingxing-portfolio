import './CapabilityCard.css';

export default function CapabilityCard({ title, description, items }) {
  return (
    <div className="capability-card">
      <h3 className="capability-card__title">{title}</h3>
      <p className="capability-card__desc">{description}</p>
      <ul className="capability-card__items">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
