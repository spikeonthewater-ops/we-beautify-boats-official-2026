import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function BottomPrep() {
  return (
    <ServiceDetailLayout
      title="Bottom Prep"
      subtitle="Critical Underwater Surface Preparation."
      description="Critical underwater surface preparation required for maintaining hydrodynamics and ensuring optimal coating adhesion. Four levels cover everything from light fouling to complete bare-gelcoat laser reset."
      image="service-hull.png"
      quoteCategory="bottomPrep"
      levels={[
        {
          label: "Level 1 · Basic Prep",
          name: "Light Fouling & Slime Removal",
          description: "Light fouling and slime removal using soft scrapers — no sanding. For boats maintained annually with minimal growth accumulation.",
        },
        {
          label: "Level 2 · Standard Prep",
          name: "Moderate Fouling & Scuff Sand",
          description: "Moderate fouling removal and scuff sanding to promote antifouling paint adhesion. The standard preparation level for most Ontario seasonal haul-outs.",
        },
        {
          label: "Level 3 · Aggressive Prep",
          name: "Heavy-Duty Marine Growth Removal",
          description: "Heavy-duty prep to sand away marine growth, barnacles, and flaking paint. For boats with significant accumulation or compromised antifouling systems.",
        },
        {
          label: "Level 4 · Complete Reset",
          name: "Full Bare-Gelcoat Strip",
          description: "Complete bare gelcoat reset — full removal of all antifouling paint down to bare gelcoat. Contact Spike directly to discuss scope and scheduling for this service.",
        },
      ]}
    />
  );
}
