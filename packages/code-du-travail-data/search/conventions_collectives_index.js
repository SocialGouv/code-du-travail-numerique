const { Client } = require("@elastic/elasticsearch");
const conventions = require("@socialgouv/kali-data/data/index.json");

const INDEX_NAME = "conventions_collectives";

const client = new Client({
  node: process.env.ELASTICSEARCH_URL
});

const deleteIndex = () =>
  client.indices
    .delete({
      index: INDEX_NAME
    })
    .then(() => {
      console.log(`Index ${INDEX_NAME} dropped.`);
    })
    .catch(e => {
      console.error(
        `Something wrong happenned while deleting the index ${INDEX_NAME}:`,
        e
      );
    });

const createIndex = () =>
  client.indices
    .create({
      index: INDEX_NAME,
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 0
          // index: {
          //   analysis: {
          //   }
          // }
        },
        mappings: {
          properties: {
            conventionId: {
              type: "text"
            }
          }
        }
      }
    })
    .then(() => {
      console.log(`Index ${INDEX_NAME} created.`);
    })
    .catch(e => {
      console.error(
        `Something wrong happenned while creating the index ${INDEX_NAME}:`,
        e
      );
    });

const batchIndexing = body =>
  client
    .bulk({
      index: INDEX_NAME,
      body
    })
    .then(() => {
      console.log(
        `Indexing ${body.length / 2} documents in ${INDEX_NAME} index`
      );
    })
    .catch(e => {
      console.error(
        `Something wrong happenned while indexing documents in ${INDEX_NAME}:`,
        e.body.error
      );
    });

(async () => {
  await deleteIndex();
  await createIndex();

  let conventionIndex = 0;
  const batchApproximateSize = 250;
  // we don't want to have too many documents in memory here
  // (the json itself weights more than 200MB) so we break
  // the operation in several smaller batch requests
  while (conventionIndex < conventions.length) {
    const documentsToIndex = [];
    while (documentsToIndex.length < batchApproximateSize) {
      if (conventionIndex === conventions.length) break;
      const conventionId = conventions[conventionIndex].id;
      const hydratedConvention = require(`@socialgouv/kali-data/data/${conventionId}.json`);
      const { sections, ...conventionWithoutTextes } = hydratedConvention;
      const texteDeBase = sections[0]; // 0 will always be textes de base
      const textesAttaches = sections.find(
        section => section.title === "Textes Attachés"
      );
      const texteSalaires = sections.find(
        section => section.title === "Textes Salaires"
      );

      documentsToIndex.push({
        ...conventionWithoutTextes,
        texteDeBase,
        conventionId,
        type: "base"
      });

      if (textesAttaches) {
        documentsToIndex.push({
          ...textesAttaches,
          id: `${conventionId}-attaches`,
          conventionId,
          type: "attaches"
        });
      }
      if (texteSalaires) {
        documentsToIndex.push({
          ...texteSalaires,
          id: `${conventionId}-salaires`,
          conventionId,
          type: "salaires"
        });
      }

      conventionIndex++;
      // end of documentsToIndex.length < batchApproximateSize loop
    }
    // Once we reached the approximate amount of documents to index,
    // we do a batch request after formatting them correctly
    // one document = 2 objects in a batch request's body
    // One the the setup, one for the data
    const batchReadyDocuments = documentsToIndex.reduce(
      (accumulator, document) => {
        accumulator.push({
          index: {
            _id: document.id
          }
        });
        accumulator.push(document);
        return accumulator;
      },
      []
    );
    await batchIndexing(batchReadyDocuments);
  }
  console.log(`Indexing of ${INDEX_NAME} documents finished`);
})();
