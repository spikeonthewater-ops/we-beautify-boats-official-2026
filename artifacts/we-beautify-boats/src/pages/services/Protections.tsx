import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function Protections() {
  return (
    <ServiceDetailLayout
      title="Marine Protections"
      subtitle="Defend Against the Elements"
      description="Our protection systems lock in the shine and block out UV rays, bird droppings, and water spots. From premium marine waxes to advanced ceramic coatings, we match the protection level to how you use and store your boat."
      bullets={[
        "Marine-grade polymer sealants (6-8 months durability)",
        "Advanced Ceramic Coating applications (12-24+ months)",
        "UV resistance treatments for vinyl and plastics",
        "Fabric and canvas waterproofing (Bimini/covers)",
        "Documentation of application date for maintenance tracking"
      ]}
      image="hero-bg.png"
    />
  );
}
