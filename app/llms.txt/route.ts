import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export const dynamic = "force-dynamic";

export async function GET() {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];

  const body =
    brand === "plagueatlas"
      ? `# PlagueAtlas

> ${m.description} Published by Furiosa Studio.

## Key pages

- [Home — interactive pandemic map](${m.url}/): 3D map of history's deadliest epidemics with real-time death counters.
- [Events](${m.url}/events): browse documented epidemics and disease outbreaks across 1,500 years.
- [Pathogens](${m.url}/pathogens): diseases by pathogen (plague, influenza, cholera, HIV, malaria, COVID-19) with death tolls.
- [Statistics](${m.url}/statistics): aggregate death-toll data and charts.
- [News](${m.url}/news): recent outbreak and epidemic news.
- [Compare](${m.url}/compare): compare death tolls between epidemics side by side.

## Notes

- Death-toll figures are sourced from historical and epidemiological estimates; ranges are given where sources disagree.
- Published by Furiosa Studio. English-language site.
`
      : `# DeathVault

> ${m.description} Published by Furiosa Studio.

## Key pages

- [Home — mass death event archive](${m.url}/): interactive archive of history's deadliest events with 813M+ casualties documented.
- [Events](${m.url}/events): browse every documented mass-death event — pandemics, wars, famines, nuclear disasters, genocides.
- [Pathogens](${m.url}/pathogens): disease events by pathogen with death tolls.
- [Statistics](${m.url}/statistics): aggregate casualty data and charts across event categories.
- [News](${m.url}/news): recent related news.
- [Compare](${m.url}/compare): compare death tolls between events side by side.

## Notes

- Casualty figures are sourced from historical estimates; ranges are given where sources disagree.
- Categories covered: pandemics, wars, nuclear disasters, famines, genocides.
- Published by Furiosa Studio. English-language site.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
