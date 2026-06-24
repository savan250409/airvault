// Maps DB-driven Insights / Expert Talks to imagery.
// Records may carry an uploaded gallery (`images`: JSON array of paths). When
// present we use those; otherwise we derive a bundled hero image from
// category/topic — guaranteeing no broken images.
import BASE_URI from "@/config";
import airTransport from "@/assets/air-transport.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";
import heroImage from "@/assets/hero-logistics.jpg";
import airFreight from "@/assets/air-freight.jpg";

const pool = [heroImage, airTransport, seaTransport, landTransport, airFreight];

const insightByCategory: Record<string, string> = {
  "Market Trends": airTransport,
  Compliance: heroImage,
  "Sea Freight": seaTransport,
  Operations: landTransport,
  Technology: heroImage,
  MSME: airFreight,
};

const talkByTopic: Record<string, string> = {
  Infrastructure: heroImage,
  "Air Cargo": airTransport,
  Customs: landTransport,
  "Cold Chain": seaTransport,
  MSME: heroImage,
  "Sea Freight": seaTransport,
  Operations: landTransport,
};

const byId = (id: number | string | undefined) =>
  pool[Math.abs(Number(id) || 0) % pool.length];

// Turn a stored path ("uploads/insights/x.jpg") into a full, fetchable URL.
export const toImageUrl = (p: string) =>
  /^https?:\/\//i.test(p) ? p : `${BASE_URI}/${String(p).replace(/^\/+/, "")}`;

// Parse the `images` field (JSON string or array) into a list of full URLs.
export const resolveImages = (item: { images?: string | string[] }): string[] => {
  let arr: unknown = item?.images;
  if (typeof arr === "string") {
    try { arr = JSON.parse(arr); } catch { arr = []; }
  }
  if (!Array.isArray(arr)) return [];
  return arr.filter(Boolean).map((p) => toImageUrl(String(p)));
};

export const insightImage = (item: { images?: string | string[]; image?: string; category?: string; id?: number | string }) =>
  resolveImages(item)[0] || item.image || insightByCategory[item.category || ""] || byId(item.id);

export const talkImage = (item: { images?: string | string[]; image?: string; topic?: string; id?: number | string }) =>
  resolveImages(item)[0] || item.image || talkByTopic[item.topic || ""] || byId(item.id);
