import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function HullWashes() {
  return (
    <ServiceDetailLayout
      title="Hull Washes"
      subtitle="Pristine Waterlines & Spotless Sides"
      description="Specialized freshwater hull washing targeting the stubborn organic staining common in Ontario's lakes. We safely dissolve algae lines, hard water spots, and exhaust soot, leaving the hull sides brilliantly clean."
      bullets={[
        "Acid-based dissolution of waterline algae and tannin stains",
        "Gentle hand washing of hull sides to preserve wax/sealant",
        "Exhaust port soot removal",
        "Transom and swim platform deep cleaning",
        "Rinsing protocols aligned with Clean Marine practices"
      ]}
      image="service-hull.png"
    />
  );
}
