import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function InteriorDetails() {
  return (
    <ServiceDetailLayout
      title="Interior Details"
      subtitle="A Cabin That Feels Like Home"
      description="Yacht interiors face unique challenges like high humidity, mold, and confined odors. Our interior technicians execute a precision reset of your cabin, galleys, and heads so you can entertain and relax in total comfort."
      bullets={[
        "Deep carpet vacuuming and stain extraction",
        "Marine leather and vinyl conditioning",
        "Galley surface, fridge, and cabinetry sanitization",
        "Head (bathroom) detailing and disinfection",
        "Mold, mildew, and odor elimination treatments"
      ]}
      image="service-interior.png"
    />
  );
}
