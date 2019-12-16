import { ConsentServicePS, ConsentServiceDefaultView, ConsentService } from './types'
import { addUi, addRenderer } from '../Base';
import { ConsentServiceRenderer } from './views';

export function createConsentService(name: string): ConsentServicePS {
  return {
    type: ConsentService,
    view: ConsentServiceDefaultView,
    name: name,
    title: name,
    mem: {
      ui: {
        activePurposeDeclaration: {},
      },
      db: {
        serviceDeclarations: [],
        purposeDeclarations: [],
        consents: [],
        usageLog: [],
      }
    },
    queue: [],
  };
}

addRenderer(ConsentService, ConsentServiceDefaultView, ConsentServiceRenderer);
addUi(ConsentService, './ui/csui/');
