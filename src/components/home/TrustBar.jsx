
const trustItems = [
  {
    icon: "✧",
    title: "Complimentary Shipping",
    description: "Free shipping on every order",
  },
  {
    icon: "↺",
    title: "Easy 14-Day Returns",
    description: "Shop with confidence",
  },
  {
    icon: "♧",
    title: "Secure Checkout",
    description: "Protected payment process",
  },
  {
    icon: "♡",
    title: "Customer Care",
    description: "We're here to help",
  },
];

function TrustBar() {
  return (
    <section
      className="ag-trust"
      aria-label="Shopping benefits"
    >
      <div className="ag-trust-inner">
        {trustItems.map((item) => (
          <div className="ag-trust-item" key={item.title}>
            <span className="ag-trust-icon" aria-hidden="true">
              {item.icon}
            </span>

            <div className="ag-trust-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustBar;