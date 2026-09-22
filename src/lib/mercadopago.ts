import 'server-only';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error('MP_ACCESS_TOKEN não configurado nas variáveis de ambiente');
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const preApproval = new PreApproval(client);
export { client };

