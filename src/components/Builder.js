const componentSlots = [
  "GPU",
  "CPU",
  "Motherboard",
  "RAM",
  "Storage",
  "Cooling",
  "Extra",
];

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

                        <div className="builde-card__body">
                            <span className="builder-card__plus">+</span>
                            </div>

                        <button className="builder-card__button">
                            Choose {slot}
                        </button>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Builder;