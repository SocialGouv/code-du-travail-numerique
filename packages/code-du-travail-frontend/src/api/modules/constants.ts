// Délai max du relai. Au-delà on abandonne : le client est en fire-and-forget,
// rien ne doit retenir la fonction serverless si Matomo est lent/injoignable.
export const MATOMO_TIMEOUT_MS = 3000;
