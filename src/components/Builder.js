import { Link } from "react-router-dom";

const componentSlots = [
  "GPU",
  "CPU",
  "Motherboard",
  "RAM",
  "Storage",
  "Cooling",
  "Case",
  "Extra",
];

// Gör om komponentens namn till en URL-vänlig text.
const getComponentPath = (slot) => {
  return slot.toLowerCase();
};


function Builder() {
    return (
        <section className="builder">
            <div className="builder__header">
                <h2>Builder</h2>
                <p>Choose your components and build your PC.</p>
            </div>

            <div className="builder__grid">
                {componentSlots.map((slot) => (
                    <article className="builder-card" key={slot}>
                        <div className="builder-card__top">
                            <h3>{slot}</h3>
                            <span className="builder-card__status">Empty</span>
                        </div>

                        <div className="builder-card__body">
                            <span className="builder-card__plus">+</span>
                            </div>

                        <Link to={`/builder/${getComponentPath(slot)}`} className="builder-card__button">
                            Select {slot}
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Builder;