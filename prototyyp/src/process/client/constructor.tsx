import { ClientPS, ClientDefaultView, ClientIS, PurposeDeclarationTemplate, ClientConfig } from './types';
import { addRenderer } from '../Base';
import { ClientRenderer } from './views';

// Client IS is a small information system that:
// - has a set of purposes that need data from service providers
// - is able to declare the purpose 
// - tracks consent refs by user and by purpose declaration id. 
// - has UI that allows a user to authenticate
// - allows to attempt to use the service as authenticated user


export function createClient(
  name: string,
  consentService: string,
  config: ClientConfig[],
  decls?: PurposeDeclarationTemplate[]
): ClientPS {
  return {
    type: ClientIS,
    view: ClientDefaultView,
    name: name,
    title: name,
    mem: {
      ui: {},
      db: {
        consentServiceId: consentService,
        consentRefByUser: {},
        purpose: {}
      },
      declTemplate: decls,
      config: config,
    },
    queue: []
  }
}

addRenderer(ClientIS, ClientDefaultView, ClientRenderer);