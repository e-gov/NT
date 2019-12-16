import { createClient } from "../process/client/constructor";
import { createServiceProvider } from "../process/serviceProvider/constructor";
import { diagnosisFor, studyFor, immunizationFor } from "./hl7";
import { createConsentService } from "../process/consentService/constructor";
import { consentRefApiLogRenderers } from "../components/LogRows";
import { SecretRecord } from "../process/serviceProvider/types";

const CS1Address = "EE/GOV/70009770/nt";

export function createData(subjectId: string, type: string, data: any): SecretRecord {
  return {
    key: "" + ((Math.random() * 10000) | 0),
    type: type,
    subject: subjectId,
    data: data
  };
}


export function createDemoArena() {
  return {
    processes: [
      createClient("EE/COM/10112345/healthstartup", CS1Address, [ // client configuration
        { // vaktsineerimise meeldetuletused
          purposeDeclarationId: "tervisepaevik_vaktsineerimised",
          services: [
            {
              serviceAddress: "EE/GOV/70009770/digilugu",
              serviceName: "hl7!1.3.6.1.4.1.28284.6.1.1.282",
            }
          ]
        },
        { // terviseandmete visualiseerimine
          purposeDeclarationId: "tervisepaevik_visualiseerimine",
          services: [
            { // diagnoosid
              serviceAddress: "EE/GOV/70009770/digilugu",
              serviceName: "hl7!1.3.6.1.4.1.28284.6.1.1.32",
            },
            { // uuringud
              serviceAddress: "EE/GOV/70009770/digilugu",
              serviceName: "hl7!1.3.6.1.4.1.28284.6.1.1.35",
            }
          ]
        }
      ], [ // prefilled service declaration templates
        {
          purposeDeclarationId: "tervisepaevik_visualiseerimine",
          name: "Terviseandmete visualiseerimine",
          description: "HealthStartup diagnooside ja uuringute tulemuste visualiseerimist pakkuv teenus.\n\n" +
            "Nõusoleku tagasivõtmisel kustutab HealthStartup kõik Sinu kohta saadud andmed.",
          services: [
            { serviceProviderId: "EE/GOV/70009770", serviceDeclarationId: "hl7_diagnoosid" },
            { serviceProviderId: "EE/GOV/70009770", serviceDeclarationId: "hl7_uuringud" }
          ]
        },
        {
          purposeDeclarationId: "tervisepaevik_vaktsineerimised",
          name: "Vaktsineerimiste meeldetuletused",
          description: "HealthStartup vaktsineerimiste meeldetuletusi ja immuniseerimisplaani pakkuv teenus.\n\n" +
            "Nõusoleku tagasivõtmisel kustutab HealthStartup kõik Sinu kohta saadud andmed.",
          services: [
            { serviceProviderId: "EE/GOV/70009770", serviceDeclarationId: "hl7_immuniseerimispass" }
          ]
        }
      ]),

      createServiceProvider("EE/GOV/70009770/digilugu", "Tervise Infosüsteem", [ // services
        { // immuniseerimispassi teenus
          serviceName: "hl7!1.3.6.1.4.1.28284.6.1.1.282",
          consentService: CS1Address,
          requiredServiceDeclarationIds: ["hl7_immuniseerimispass"],
          returnedDatatypes: ["immuniseerimine"]
        },
        { // uuringute päringu teenus
          serviceName: "hl7!1.3.6.1.4.1.28284.6.1.1.35",
          consentService: CS1Address,
          requiredServiceDeclarationIds: ["hl7_uuringud"],
          returnedDatatypes: ["uuring"]
        },
        { // 
          serviceName: "hl7!1.3.6.1.4.1.28284.6.1.1.32",
          consentService: CS1Address,
          requiredServiceDeclarationIds: ["hl7_diagnoosid"],
          returnedDatatypes: ["diagnoos"],
        }
      ], [ // secret data
        createData("01234567890", "diagnoos", { diagnoos: "A01", arst: "D03677" }),
        createData("12345678901", "diagnoos", { diagnoos: "J01", arst: "D08031" }),
        createData("47302200234", "diagnoos", diagnosisFor("47302200234")),
        createData("47302200234", "uuring", studyFor("47302200234")),
        createData("47302200234", "immuniseerimine", immunizationFor("47302200234")),
      ], [ // prefilled service declaration templates
        {
          serviceDeclarationId: "hl7_uuringud",
          name: "Uuringute päring",
          technicalDescription: "X-tee teenuse 'hl7' päring, HL7 OID: 1.3.6.1.4.1.28284.6.1.1.35",
          description: "Andmekogule saadetakse päringu parameetrina Sinu isikukood.\n\n" +
            "Andmekogust Tervise Infosüsteem saadakse iga Sinu uuringu kohta järgmised andmed:\n" +
            "  * Sinu andmed: nimi ja isikukood:\n" +
            "  * Uuringu andmed:\n" +
            "    * Uuringu tegemise aeg ja koht (raviasutus)\n" +
            "    * Proovimaterjali tüüp\n" +
            "    * Uuringu tüüp\n" +
            "    * Uuringu vastus\n" +
            "  * Uuringu teostanud tervishoiutöötaja andmed: nimi, kood ja tervishoiuasutuse andmed",
          needSignature: true,
          consentMaxDurationSeconds: 5 * 365 * 24 * 3600,
        },
        {
          serviceDeclarationId: "hl7_diagnoosid",
          name: "Diagnooside päring",
          technicalDescription: "X-tee teenuse 'hl7' päring, HL7 OID: 1.3.6.1.4.1.28284.6.1.1.32",
          description: "Andmekogust Tervise Infosüsteem saadakse iga Sinu diagnoosi kohta järgmised andmed:\n" +
            "  * Sinu andmed: nimi ja isikukood\n" +
            "  * Haigusjuhtumi andmed: diagnoosi andmise aeg, diagnoos\n" +
            "  * Diagnoosi andnud tervishoiutöötaja andmed: nimi, kood ja tervishoiuasutuse andmed",
          needSignature: true,
          consentMaxDurationSeconds: 5 * 365 * 24 * 3600,
        },
        {
          serviceDeclarationId: "hl7_immuniseerimispass",
          name: "Immuniseerimispassi päring",
          technicalDescription: "X-tee teenuse 'hl7' päring, HL7 OID: 1.3.6.1.4.1.28284.6.1.1.282",
          description: "Andmekogust Tervise Infosüsteem saadakse iga Sinu immuniseerimise kohta järgmised andmed:\n" +
            "  * Sinu andmed: nimi ja isikukood\n" +
            "  * Immuniseerimise andmed:\n" +
            "    * Haigus mille vastu immuniseeriti\n" +
            "    * Immuniseerimise kuupäev\n" +
            "    * Immuunpreparaadi nimi, partii number ja manustatud annus\n" +
            "    * Mitmes annus\n" +
            "    * Järgmine immuniseerimise varaseim kuupäev\n" +
            "  * Immuniseerija andmed: nimi, kood ja tervishoiuasutuse andmed",
          needSignature: true,
          consentMaxDurationSeconds: 5 * 365 * 24 * 3600,
        },

      ]),

      createConsentService("EE/GOV/70009770/nt"),
    ],
    logRenderers: {
      ...consentRefApiLogRenderers
    },
  };
}