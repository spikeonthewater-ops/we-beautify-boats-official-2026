import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function InteriorDetails() {
  return (
    <ServiceDetailLayout
      title="Interior Detailing"
      subtitle="Routine Care to Full Environmental Remediation."
      description="Comprehensive interior care ranging from routine wipe-downs to full environmental remediation. Four levels restore a fresh, healthy cabin — matched precisely to what your interior actually needs."
      image="service-interior.png"
      quoteCategory="interiorDetails"
      levels={[
        {
          label: "Level 1 · Basic",
          name: "Routine Cabin Care",
          description: "Routine cabin care, dusting, and vacuuming for a tidy, guest-ready space. Ideal for boats in regular use that just need consistent upkeep.",
        },
        {
          label: "Level 2 · Reset",
          name: "Deep Cleaning Refresh",
          description: "Deep cleaning refresh, detailing cupboards, drawers, windows, and hard-to-reach areas. For cabins that haven't had professional interior care in a season.",
        },
        {
          label: "Level 3 · Sanitization",
          name: "Steam-Clean Sanitization",
          description: "Deep steam-cleaned sanitization for carpets, upholstery, bilges, and appliances. Eliminates biological load including mold colonies and bacterial contamination.",
        },
        {
          label: "Level 4 · Intervention",
          name: "Maximum Abatement",
          description: "Maximum abatement for severe mold, pests, flooding, and odor using ozone treatment. Full-system intervention across every surface, compartment, and material type.",
        },
      ]}
    />
  );
}
