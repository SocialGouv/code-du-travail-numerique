//

import type { Client } from "@elastic/elasticsearch";
import { logger as cdtnLoggger } from "@socialgouv/cdtn...infra...logger";

import type { Document } from "../types";
import { analyzer, char_filter, filter, tokenizer } from "./analysis";

//

export type Mappings = Record<string, string>;
export interface UtilsOptions {
  client: Client;
  indexName: string;
}

//

export const logger = cdtnLoggger.child({
  package: "@socialgouv/cdtn...infra...elasticsearch",
});

//

export async function createIndex({
  client,
  indexName,
  mappings,
}: UtilsOptions & { mappings: Mappings }): Promise<void> {
  const { body } = await client.indices.exists({ index: indexName });
  if (body) {
    try {
      await client.indices.delete({ index: indexName });
      logger.info(`Index ${indexName} deleted.`);
    } catch (error: unknown) {
      logger.error("index delete", error);
    }
  }
  try {
    // NOTE(douglasduteil): disable naming-convention for elasticsearch mapping
    // As the mapping files are following the elasticsearch explicit mapping format
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/explicit-mapping.html
    // we do not want to enfore a external naming convention here.
    /* eslint-disable @typescript-eslint/naming-convention */
    await client.indices.create({
      body: {
        mappings: mappings,
        settings: {
          index: {
            analysis: {
              analyzer,
              char_filter,
              filter,
              tokenizer,
            },
          },
          number_of_replicas: 1,
          number_of_shards: 1,
        },
      },
      index: indexName,
    });
    logger.info(`Index ${indexName} created.`);
  } catch (error: unknown) {
    logger.error("index create", error);
    throw error;
  }
}

export async function version({ client }: UtilsOptions): Promise<void> {
  const { body } = await client.info<{ version: { number: string } }>();
  logger.info(body.version.number);
}

export async function bulkIndexDocuments({
  client,
  indexName,
  documents,
}: UtilsOptions & { documents: Document[] }): Promise<void> {
  try {
    interface BulkApiResponse {
      errors?: unknown;
      items: { index: { status: number } }[];
    }

    const body = documents.flatMap((doc, i) => [
      {
        index: {
          _index: indexName,
          // if available, use our cdtnId as the actual Elastic document id
          ...(doc.cdtnId && { _id: doc.cdtnId }),
          // unless we're in testing mode where we use position
          ...(process.env.NODE_ENV === "test" && { _id: i }),
        },
      },
      doc,
    ]);

    const resp = await client.bulk<BulkApiResponse>({
      body,
      index: indexName,
    });
    if (resp.body.errors) {
      const errorDocs = resp.body.items.filter(
        (item) => item.index.status != 201
      );
      logger.error(`Errors during indexation : ${JSON.stringify(errorDocs)}`);
    }
    logger.info(`Index ${documents.length} documents.`);
  } catch (error: unknown) {
    logger.error("index documents", error);
    throw error;
  }
}

export async function indexDocumentsBatched({
  client,
  indexName,
  documents,
  size = 1000,
}: UtilsOptions & { documents: Document[]; size: number }): Promise<void> {
  logger.info(`Loaded ${documents.length} documents`);
  for (const chunk of chunks(documents, size)) {
    await bulkIndexDocuments({ client, documents: chunk, indexName });
  }
}

export async function deleteOldIndex({
  client,
  patterns,
  timestamp,
}: UtilsOptions & { patterns: string[]; timestamp: number }): Promise<void> {
  const { body: indices } = await client.cat.indices<{ index: string }[]>({
    format: "json",
  });

  const IndicesToDelete = getIndicesToDelete(patterns, timestamp, indices);
  const pIndicesToDelete = IndicesToDelete.map(async ({ index }) =>
    client.indices.delete({ index })
  );

  return Promise.all(pIndicesToDelete).then(() => {
    logger.info(`Remove ${pIndicesToDelete.length} old indices`);
  });
}

export function* chunks<T = unknown>(
  items: T[],
  size: number
): Generator<T[], void> {
  for (const val of range(0, items.length, size)) {
    yield items.slice(val, val + size);
  }
}

export function range(start: number, end: number, size = 1): number[] {
  return Array.from(
    { length: Math.ceil((end - start) / size) },
    (_, i) => start + i * size
  );
}

export function getIndicesToDelete(
  patterns: string[],
  timestamp: number,
  indices: { index: string }[]
): {
  index: string;
}[] {
  function isCdtnIndex({ index }: { index: string }) {
    return patterns.some((pattern) => index.startsWith(`${pattern}-`));
  }

  const currentIndices = patterns.map((pattern) => `${pattern}-${timestamp}`);

  return indices
    .filter(({ index }) => !currentIndices.includes(index))
    .filter(isCdtnIndex)
    .sort(({ index: indexA }, { index: indexB }) => {
      const prefixReg = /(\w+)-(\d+)/;
      const [, typeA = "", tsA = "0"] = prefixReg.exec(indexA) ?? [];
      const [, typeB = "", tsB = "0"] = prefixReg.exec(indexB) ?? [];
      return tsA === tsB
        ? Number(typeA) - Number(typeB)
        : Number(tsA) - Number(tsB);
    })
    .slice(0, -patterns.length);
}
