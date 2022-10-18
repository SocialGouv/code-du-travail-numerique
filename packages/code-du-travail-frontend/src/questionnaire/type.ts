export type PreviousResponse = {
  index: number;
  text?: string;
  info?: string;
};

export type SlugResponses = {
  [slug: string]: PreviousResponse[];
};
