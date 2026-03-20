import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function HullWashes() {
  return (
    <ServiceDetailLayout
      title="Hull Wash Services"
      subtitle="Eco-Friendly Topside Cleaning. Hull Integrity Protected."
      description="Eco-friendly topside cleaning designed to remove scum lines and buildup without compromising the hull's surface integrity. Three levels address everything from surface salt to heavy tannin staining."
      image="service-hull.png"
      levels={[
        {
          label: "Level 1 · Brush Wash",
          name: "Basic Brush & Rinse",
          description: "Basic brush and rinse to remove surface salt, dust, and light marine growth. Routine maintenance appropriate for boats washed regularly throughout the season.",
        },
        {
          label: "Level 2 · Hand Wash",
          name: "Targeted Foul-Line Scrub",
          description: "Targeted scrubbing to remove green slime and grime specifically along the foul line. Addresses the contamination band that forms at the waterline through the season.",
        },
        {
          label: "Level 3 · Decontamination",
          name: "Intensive Deep Wash",
          description: "Intensive deep wash to remove yellow/brown tannin staining and heavy oxidation. For hulls that have absorbed significant contamination from Ontario's freshwater environment.",
        },
      ]}
    />
  );
}
