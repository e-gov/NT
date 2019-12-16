import { ServiceConfig, ServiceProviderPS, ServiceProviderDefaultView, ServiceProviderIS, SecretRecord, ServiceDeclarationTemplate } from "./types";
import { addRenderer } from "../Base";
import { ServiceProviderRenderer } from "./views";


export function createServiceProvider(name: string, title: string, config: ServiceConfig[], db?: SecretRecord[], decls?: ServiceDeclarationTemplate[]): ServiceProviderPS {
  return {
    type: ServiceProviderIS,
    view: ServiceProviderDefaultView,
    name: name,
    title: title,
    mem: {
      db: db === undefined ? [] : db,
      services: config,
      inflight: [],
      declTemplate: decls,
    },
    queue: []
  };
}

addRenderer(ServiceProviderIS, ServiceProviderDefaultView, ServiceProviderRenderer);
