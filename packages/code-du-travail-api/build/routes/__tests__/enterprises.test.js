import Koa from "koa";
import fetch from "node-fetch";
import request from "supertest";
import Data from "../../tests/cdtn_document.data.json";
import routes from "../enterprises";
const app = new Koa();
app.use(routes.routes());
jest.mock("node-fetch");
describe("Test enterprise endpoint", ()=>{
    beforeEach(()=>{
        fetch.mockReset();
    });
    test("Call returns 404 if no enterprises found", async ()=>{
        const apiEnterpriseResponse = {
            body: "Not found",
            status: 404
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get("/api/v1/enterprises?q=NOT-FOUND");
        expect(response.status).toEqual(404);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=NOT-FOUND&convention=true&employer=true&open=true&matchingLimit=0`);
        expect(response.text).toEqual("Not found");
    });
    test("Call encode query params", async ()=>{
        const apiEnterpriseResponse = {
            json: ()=>({}),
            status: 200
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get(`/api/v1/enterprises?q=${encodeURIComponent("La pêche à la ligne")}`);
        expect(response.status).toEqual(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=La%20p%C3%AAche%20%C3%A0%20la%20ligne&convention=true&employer=true&open=true&matchingLimit=0");
    });
    test("A call to retrieve agreements from an enterprise", async ()=>{
        const enterpriseApiDataResponse = {
            entreprises: [
                {
                    activitePrincipale: "Entretien et réparation de véhicules automobiles",
                    conventions: [
                        {
                            idcc: 1090
                        }
                    ],
                    etablissements: 1,
                    highlightLabel: "<b><u>AUTOEXPRESS</b></u>",
                    label: "AUTOEXPRESS",
                    matching: 1,
                    matchingEtablissement: {
                        address: "1 Rue Clément Ader 08110 Carignan",
                        siret: "75280280100023"
                    },
                    simpleLabel: "AUTOEXPRESS",
                    siren: "752802801"
                }
            ]
        };
        const apiEnterpriseResponse = {
            json: ()=>enterpriseApiDataResponse,
            status: 200
        };
        const expectedResponse = {
            entreprises: enterpriseApiDataResponse.entreprises.map((enterprise)=>({
                    ...enterprise,
                    // Conventions data should be extract from elastic
                    conventions: Data.filter((doc)=>doc.num === enterprise.conventions[0].idcc).map(({ id , num , shortTitle , slug , title , url  })=>({
                            id,
                            num,
                            shortTitle,
                            slug,
                            title,
                            url
                        }))
                }))
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get("/api/v1/enterprises?q=AUTOEXPRESS");
        expect(response.status).toEqual(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=AUTOEXPRESS&convention=true&employer=true&open=true&matchingLimit=0`);
        expect(response.body).toEqual(expectedResponse);
    });
    test("Call should pass address if provided", async ()=>{
        const apiEnterpriseResponse = {
            json: ()=>({}),
            status: 200
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get("/api/v1/enterprises?q=hello&a=my%20address");
        expect(response.status).toEqual(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=hello&address=my%20address&convention=true&employer=true&open=true&matchingLimit=0");
    });
    test("Call retrieving agreement with a slug from an enterprise", async ()=>{
        const apiEnterpriseResponse = {
            json: ()=>({
                    entreprises: [
                        {
                            conventions: [
                                {
                                    idcc: 1090
                                }
                            ]
                        }
                    ]
                }),
            status: 200
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get("/api/v1/enterprises?q=AUTOEXPRESS");
        expect(response.status).toEqual(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=AUTOEXPRESS&convention=true&employer=true&open=true&matchingLimit=0`);
        expect(response.body.entreprises).toHaveLength(1);
        expect(response.body.entreprises[0].conventions).toHaveLength(1);
        expect(response.body.entreprises[0].conventions[0].slug).toEqual("1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle");
    });
    test("Call retrieving agreements with slug and no slug from an enterprise", async ()=>{
        const apiEnterpriseResponse = {
            json: ()=>({
                    entreprises: [
                        {
                            conventions: [
                                {
                                    idcc: 1090
                                },
                                {
                                    idcc: 99999
                                }
                            ]
                        }
                    ]
                }),
            status: 200
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get("/api/v1/enterprises?q=AUTOEXPRESS");
        expect(response.status).toEqual(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=AUTOEXPRESS&convention=true&employer=true&open=true&matchingLimit=0`);
        expect(response.body.entreprises).toHaveLength(1);
        expect(response.body.entreprises[0].conventions).toHaveLength(2);
        expect(response.body.entreprises[0].conventions.find((agreement)=>agreement.num === 1090).slug).toEqual("1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle");
        expect(response.body.entreprises[0].conventions.find((agreement)=>agreement.num === 99999).slug).toBeUndefined();
    });
    test("Call retrieving agreement not in elastic from an enterprise", async ()=>{
        const apiEnterpriseResponse = {
            json: ()=>({
                    entreprises: [
                        {
                            conventions: [
                                {
                                    idcc: 123456
                                }
                            ]
                        }
                    ]
                }),
            status: 200
        };
        const expectedResponse = {
            entreprises: [
                {
                    conventions: [
                        {
                            num: 123456
                        }
                    ]
                }
            ]
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get("/api/v1/enterprises?q=AUTOEXPRESS");
        expect(response.status).toEqual(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=AUTOEXPRESS&convention=true&employer=true&open=true&matchingLimit=0`);
        expect(response.body).toEqual(expectedResponse);
    });
    test("Call retrieving enterprise without conventions", async ()=>{
        const apiEnterpriseResponse = {
            json: ()=>({
                    entreprises: [
                        {
                            activitePrincipale: "Entretien et réparation de véhicules automobiles",
                            conventions: []
                        }
                    ]
                }),
            status: 200
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get("/api/v1/enterprises?q=AUTOEXPRESS");
        expect(response.status).toEqual(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=AUTOEXPRESS&convention=true&employer=true&open=true&matchingLimit=0`);
        expect(response.body).toEqual(apiEnterpriseResponse.json());
    });
    test("Call retrieving agreements for multiple enterprise", async ()=>{
        const apiEnterpriseResponse = {
            json: ()=>({
                    entreprises: [
                        {
                            conventions: [
                                {
                                    idcc: 1090
                                }
                            ]
                        },
                        {
                            conventions: [
                                {
                                    idcc: 1090
                                }
                            ]
                        }
                    ]
                }),
            status: 200
        };
        fetch.mockResolvedValueOnce(apiEnterpriseResponse);
        const response = await request(app.callback()).get("/api/v1/enterprises?q=AUTOEXPRESS");
        expect(response.status).toEqual(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?ranked=true&query=AUTOEXPRESS&convention=true&employer=true&open=true&matchingLimit=0`);
        expect(response.body.entreprises).toHaveLength(2);
        response.body.entreprises.forEach((enterprise)=>{
            expect(enterprise.conventions).toHaveLength(1);
            expect(enterprise.conventions[0].num).toEqual(1090);
            expect(enterprise.conventions[0].slug).not.toBeUndefined();
        });
    });
});

//# sourceMappingURL=enterprises.test.js.map