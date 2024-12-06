export interface SponsorLogo {
  id: number;
  name: string;
  src: string;
}

export interface SponsorMarqueeProps {
  sponsorLogos: SponsorLogo[];
}
