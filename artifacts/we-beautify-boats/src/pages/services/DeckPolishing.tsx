import { ServiceDetailLayout } from "../../components/layout/ServiceDetailLayout";

export default function DeckPolishing() {
  return (
    <ServiceDetailLayout
      title="Deck & Hull Polishing"
      subtitle="Scaled Surface Correction. Showroom Brilliance Restored."
      description="Scaled surface correction techniques designed to safely level gelcoat and restore showroom brilliance. Five distinct levels ensure your hull receives exactly the intervention it needs — no more, no less."
      image="service-deck.png"
      levels={[
        {
          label: "Level 1 · Basic Refresh",
          name: "Light Mid-Season Maintenance Polish",
          description: "Light, single-stage mid-season maintenance polish for well-kept surfaces. Enhances existing gloss and provides a base for protection — no cutting required.",
        },
        {
          label: "Level 2 · Correction Lite",
          name: "Light Oxidation & Scuff Removal",
          description: "Machine polishing to remove light oxidation and minor surface scuffs. For boats that look slightly dull after washing but haven't degraded significantly.",
        },
        {
          label: "Level 3 · Correction Standard",
          name: "Multi-Step Gloss & Color Restoration",
          description: "Multi-step correction to restore gloss and color to chalky, moderately oxidized gelcoat. The most common correction level for Ontario boats after two or more seasons without professional care.",
        },
        {
          label: "Level 4 · Correction Heavy",
          name: "Intensive Compound Correction",
          description: "Intensive, multi-stage compound correction for severe oxidation, staining, and neglect. Designed to rescue heavily degraded gelcoat before permanent structural failure sets in.",
        },
        {
          label: "Level 5 · Correction Extreme",
          name: "Wet-Sand to Mirror Finish",
          description: "Staged wet sanding to physically level the gelcoat, resulting in a flawless, mirror-like finish. The highest level of surface correction available — for show boats and exacting owners.",
        },
      ]}
    />
  );
}
