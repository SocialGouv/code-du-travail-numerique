import { SOURCES } from "@socialgouv/cdtn-sources";
const getAgreements = (idccList)=>{
    return {
        _source: [
            "id",
            "title",
            "shortTitle",
            "num",
            "slug",
            "highlight",
            "url"
        ],
        from: 0,
        query: {
            bool: {
                filter: [
                    {
                        terms: {
                            num: idccList
                        }
                    },
                    {
                        term: {
                            source: SOURCES.CCN
                        }
                    },
                    {
                        term: {
                            isPublished: true
                        }
                    }
                ]
            }
        },
        size: idccList.length
    };
};
export default getAgreements;

//# sourceMappingURL=enterprises.elastic.js.map