import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function DeckWashes() {
  return (
    <ServiceDetailLayout
      title="Deck Wash Services"
      subtitle="Preserve Non-Skid Performance. Reset Surfaces Safely."
      description="Tiered deck washing engineered to preserve non-skid performance and safely reset surfaces without over-cleaning. Each level is calibrated to the actual condition of your deck — no unnecessary intervention, no damage from over-servicing."
      image="service-deck.png"
      quoteCategory="deckWashes"
      levels={[
        {
          label: "Level 1 · Basic Detail",
          name: "Routine Maintenance Washdown",
          description: "Routine maintenance washdown for light surface dirt. No surface restoration. Keeps clean boats clean without creating wear.",
        },
        {
          label: "Level 2 · Conditioning Detail",
          name: "Enhanced Conditioning Wash",
          description: "Enhanced cleaning targeting moderate grime, bonded body oils, and vinyl/window conditioning. Addresses contamination that routine washing can't fully lift.",
        },
        {
          label: "Level 3 · Deep Reset",
          name: "Intensive Inch-by-Inch Scrub",
          description: "Intensive inch-by-inch scrubbing including deck lockers, canvas, and teak cleaning. For boats coming out of extended use or a season of deferred maintenance.",
        },
        {
          label: "Level 4 · Intervention",
          name: "Disaster-Level Recovery",
          description: "Disaster-level recovery to strip moss, mold, tree sap, and organic fallout from severely neglected decks. The most aggressive intervention short of restorative work.",
        },
      ]}
    />
  );
}
