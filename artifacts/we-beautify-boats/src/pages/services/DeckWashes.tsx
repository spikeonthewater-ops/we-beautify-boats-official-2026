import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function DeckWashes() {
  return (
    <ServiceDetailLayout
      title="Deck Washes"
      subtitle="Restore Your Deck's Brilliance"
      description="Professional deck washing services tailored for freshwater boats operating in Ontario. We utilize safe, non-skid cleaning methods that thoroughly remove dirt, environmental fallout, and organic staining without damaging your gelcoat or protective layers."
      bullets={[
        "Thorough washdown using marine-safe, eco-friendly cleaners",
        "Non-skid surface deep cleaning with specialized brushes",
        "Tannin and water line stain removal",
        "Clearing of scuppers and drainage channels",
        "Detailed hand drying to prevent water spotting"
      ]}
      image="service-deck.png"
    />
  );
}
