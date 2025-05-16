import informationData from "./information.data.json";
import informationDismissalProcessData from "./information.dismissal.process.data.json";
import { EditorialContentElasticDocument } from "../type";
import { DocumentElasticResult } from "../../documents";

const information =
  informationData as DocumentElasticResult<EditorialContentElasticDocument>;
const informationDismissalProcess =
  informationDismissalProcessData as DocumentElasticResult<EditorialContentElasticDocument>;

export { information, informationDismissalProcess };
