export type PreviousResponse = {
  index: number;
  text?: string;
};

export type SlugResponses = {
  [slug: string]: PreviousResponse[];
};
