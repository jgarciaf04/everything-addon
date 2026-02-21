export type AddonType = "mob" | "item" | "block";

export interface Addon {
  id: string;
  name: string;
  slug: string;
  type: AddonType;
  description: {
    short: string;
    long: string;
  };
  price: number;
  thumbnail: string;
  gallery: string[];
  tags: string[];
  mcVersion: string;
  fileSize: string;
}
