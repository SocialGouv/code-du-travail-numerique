import { CDTN_ADMIN_VERSION } from "../v1.prefix";
test("prefix", ()=>{
    jest.mock("../../../package.json", ()=>({
            dependencies: {
                "@socialgouv/cdtn-elasticsearch": "^1.2.3"
            }
        }));
    expect(CDTN_ADMIN_VERSION).toBe("v1");
});

//# sourceMappingURL=v1.prefix.test.js.map