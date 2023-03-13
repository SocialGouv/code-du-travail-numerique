import {
  Content,
  ContentType,
  EditorialContentData,
  SOURCES,
} from "@socialgouv/cdtn-utils";
import { getContents } from "../content";
import { API_URL } from "../config";

export const getEditorialContentBySlug = async (
  slug: string
): Promise<EditorialContentData | undefined> => {
  const responseContainer = await fetch(
    `${API_URL}/items/${SOURCES.EDITORIAL_CONTENT}/${slug}`
  );
  if (!responseContainer.ok) {
    return;
  }
  return await responseContainer.json();
};

export const getContentBlockIds = (data: Content[]): string[] => {
  return data.reduce((idsAcc: string[], content) => {
    content.blocks = content.blocks ?? [];
    return idsAcc.concat(
      content?.blocks.flatMap((block) => {
        return block.type === ContentType.content
          ? block.contents
              ?.map(({ cdtnId }) => cdtnId)
              ?.filter((cdtnId: string) => idsAcc.indexOf(cdtnId) === -1) ?? []
          : [];
      })
    );
  }, []);
};

export const injectContentInfos = (
  contents: Content[],
  fetchedContents: EditorialContentData[]
) => {
  return contents.map((content) => {
    const blocks = content?.blocks?.map((block) => {
      if (block.type !== ContentType.content) return block;
      const contents = block?.contents?.flatMap((blockContent) => {
        const contentFound = fetchedContents?.find(({ _source }) => {
          return _source.cdtnId === blockContent.cdtnId;
        });
        delete contentFound?._source.title_vector;
        return contentFound ? [contentFound._source] : [];
      });
      return { ...block, contents };
    });
    return { ...content, blocks };
  });
};

export const getInformationBySlug = async (slug: string) => {
  const contentBySlug = await getEditorialContentBySlug(slug);
  let contents;

  if (!contentBySlug) return;
  if (contentBySlug._source?.contents) {
    const cdtnIdToFetch = getContentBlockIds(contentBySlug._source?.contents);

    if (cdtnIdToFetch && cdtnIdToFetch.length) {
      const fetchedContents = await getContents({ ids: cdtnIdToFetch });
      contents = injectContentInfos(
        contentBySlug._source.contents,
        fetchedContents
      );
    } else {
      contents = contentBySlug._source.contents;
    }
  }

  return {
    ...contentBySlug,
    _source: { ...contentBySlug._source, contents },
  };
};
