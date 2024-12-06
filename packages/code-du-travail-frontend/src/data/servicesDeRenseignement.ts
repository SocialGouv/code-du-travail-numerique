import data from "./services-de-renseignement.json";

export type ServiceRenseignements = {
  [key: string]: ServiceRenseignement;
};

export type ServiceRenseignement = {
  name: string;
  url: string;
};

export const services: ServiceRenseignements = data;

export const serviceByDepartment = (
  code: string
): ServiceRenseignement | undefined => {
  return services[code];
};
