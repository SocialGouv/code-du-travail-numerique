import preavisDemission from "@cdt/data...simulateurs/preavis-demission.data.json";
import preavisLicenciement from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import heureRechercheEmploi from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";

const data = {
  "preavis-demission": preavisDemission,
  "preavis-licenciement": preavisLicenciement,
  "heure-recherche-emploi": heureRechercheEmploi
};
export default (req, res) => {
  const {
    query: { id }
  } = req;
  switch (id) {
    case "preavis-demission":
    case "preavis-licenciement":
    case "heure-recherche-emploi":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data[id]));
      return;
    default:
      res.status(404).json({ message: "ressource not found" });
  }
};
