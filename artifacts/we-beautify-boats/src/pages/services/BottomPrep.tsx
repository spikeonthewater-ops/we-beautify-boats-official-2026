import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function BottomPrep() {
  return (
    <ServiceDetailLayout
      title="Bottom Prep"
      subtitle="Hydrodynamic Efficiency Restored"
      description="Proper bottom preparation is critical for antifouling adhesion and cruising performance. We follow documented prep methods (no guesswork sanding) to ensure your running gear and hull bottom are perfectly ready for the season."
      bullets={[
        "Power washing and scraping of marine growth/zebra mussels",
        "Controlled sanding protocols to prep for new bottom paint",
        "Running gear (props, shafts, trim tabs) scraping and cleaning",
        "Masking of waterlines and vulnerable sensors",
        "Application of barrier coats (if required/requested)"
      ]}
      image="service-hull.png"
    />
  );
}
