import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function DeckPolishing() {
  return (
    <ServiceDetailLayout
      title="Deck Polishing"
      subtitle="Mirror-Like Finish for Your Gelcoat"
      description="Erase years of UV damage, oxidation, and wear with our meticulous deck polishing services. We measure gelcoat thickness before cutting to ensure a safe restoration, returning the deep gloss and clarity to your topsides."
      bullets={[
        "Multi-stage compounding to remove heavy oxidation",
        "Fine machine polishing to restore high-gloss finish",
        "Teak brightening and specialized trim care",
        "Stainless steel and chrome hardware polishing",
        "Pre-protection surface preparation and wiping"
      ]}
      image="service-deck.png"
    />
  );
}
