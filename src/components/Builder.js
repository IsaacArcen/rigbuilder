import { Link } from "react-router-dom";
import { useBuild } from "../context/BuildContext";

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
  const { build, removeComponent } = useBuild();

  return (
    <section className="builder">
      <div className="builder__header">
        <h2>Builder</h2>
        <p>Choose your components and build your PC.</p>
      </div>

      <div className="builder__grid">
        {componentSlots.map((slot) => {
          const category = getComponentPath(slot);
          const selectedProduct = build[category];

          return (
            <article className="builder-card" key={slot}>
              <div className="builder-card__top">
                <h3>{slot}</h3>
                <span className="builder-card__status">
                  {selectedProduct ? "Selected" : "Empty"}
                </span>
              </div>

              <div className="builder-card__body">
                {selectedProduct ? (
                  <div className="builder-card__selected">
                    <strong>{selectedProduct.name}</strong>
                    <span>{selectedProduct.price} kr</span>
                  </div>
                ) : (
                  <span className="builder-card__plus">+</span>
                )}
              </div>

              {selectedProduct ? (
                <button
                  type="button"
                  className="builder-card__button"
                  onClick={() => removeComponent(category)}
                >
                  Remove {slot}
                </button>
              ) : (
                <Link
                  to={`/builder/${category}`}
                  className="builder-card__button"
                >
                  Select {slot}
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Builder;