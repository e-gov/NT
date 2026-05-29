# Lihtsustatud andmenõusoleku teenuse kasutamine ja liidestamine

21.04.2026

Versioon 0.6

---

Versiooni ajalugu

| Versioon | Kuupäev    | Kirjeldus                                                                   |
| -------- | ---------- | --------------------------------------------------------------------------- |
| 0.1      | 12.06.2025 | Dokument loodud.                                                            |
| 0.2      | 11.09.2025 | Dokument täiendatud.                                                        |
| 0.3      | 01.11.2025 | Dokument muudetud.                                                          |
| 0.4      | 06.01.2026 | Dokument muudetud.                                                          |
| 0.5      | 28.01.2026 | Dokumendi täiendamine. Veakoodi täpsustused.                                |
| 0.6      | 21.04.2026 | Eemaldatud teenuse /api/consent/third-party sisendist ees- ja perekonnanimi |

<!-- markdownlint-disable MD033 -->

# **Sisukord**

- [1. Üldinfo](#üldinfo)
- [2. Päringute tehniline kirjeldus](#päringute-tehniline-kirjeldus)
  - [2.1 getConsentReferences](#getconsentreferences)
  - [2.2 validateConsentForClient](#validateconsentforclient)
  - [2.3 getThirdPartyConsents](#getthirdpartyconsents)
  - [2.4 saveSignedContainerAndApproveConsents](#savesignedcontainerandapproveconsents)
  - [2.5 getConsentHealth](#getconsenthealth)

# Üldinfo

Arhitektuuristiil: REST API

Andmestruktuur: JSON

Autentimine: Kõikide Andmenõusolekuteenusele jõudnud päringute puhul kontrollitakse, et Andmenõusolekuteenuse juurde pöörduv x-tees autenditud alamsüsteem on õige osapool selle päringu tegemiseks. Andmenõusolekuteenus vastab päringule ainult siis, kui küsija (ehk Andmekogu või Klientrakendus) on kontrollitava nõusolekuga seotud, kas läbi eesmärgideklaratsioonil oleva alamsüsteemi või eesmärgideklaratsiooniga alati seotud oleva teenusdeklaratsiooni oleva alamsüsteemiga. Autentimine toimub X-tee turvaserveri metaandmete alusel (client subsystem), mida võrreldakse eesmärgideklaratsiooni(de)s määratuga.

Nõusolekuteenusele dokumendi lisamiseks on aega kaks päeva ja dokumendi allkirjastamiseks on aega 24 tundi ehk 1 päev.

**Andmetüübid**

- String tüüpi parameetrid on UTF-8 kodeeringuga sümbolid.
- Number tüüpi parameetrid on ASCII koodide jada vahemikus 47 - 57 (numbrid 0-9).
- Timestamp tüüpi parameetrid on ISO8601 formaadis timestampid.

**Veebiteenuse URLid**

- LIVE: https://\<turvaserveri-aadress\>/r1/EE/GOV/70006317/consent/consent/\...
- STAGE: https://\<turvaserveri-aadress\>/r1/ee-dev/GOV/70006317/consent/consent-stage/\...

Lihtsustatud andmenõusolekuteenuse sammud. Pilt on illustratiivne, et milline võib välja näha lihtsustatud allkirjastamise protsess. Tegelik protsess sõltub konkreetses asutuses juurutatud äriprotsessidest.

![Pilt](../img/Lihtsustatud%20andmen%C3%B5usoleku%20teenus/pilt_lihtsustatud.png)

# Päringute tehniline kirjeldus

## getConsentReferences

Päringu abil saab küsida Andmenõusolekuteenuselt kehtivate nõusoleku(te) nõusolekuviited (_Consent Reference_).

Kasutab: Klientrakendus

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference

**Päringu käsu näide (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference" \
-d "{ \
\"idCode\": \"60001019906\", \
\"purposeDeclarationBusinessIdentifiers\": [\"EesmärgideklaratsiooniID\", \"ED_KAKS\", \"ED_KOLM\"]
}"
```

**Päring (Json):**

```
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "EesmärgideklaratsiooniID", "ED_KAKS", "ED_KOLM"
  ]
}
```

| Parameeter                            | On kohustuslik? | Andmetüüp        | Kirjeldus                                              |
| ------------------------------------- | --------------- | ---------------- | ------------------------------------------------------ |
| idCode                                | jah             | string           | Andmesubjekti isikukood                                |
| purposeDeclarationBusinessIdentifiers | jah             | array of strings | Eesmärgideklaratsiooni identifikaator (võib olla mitu) |

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama, mis on määratud eesmärgideklaratsiooni(de)s.

**Vastus:**

```
{
  "ED_KAKS": "91e9844d-3b5e-4df8-9254-42316b1607b6"
}
```

| Parameeter                                                 | Andmetüüp | Kirjeldus                                                                                                     |
| ---------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| purposeDeclarationBusinessIdentifier (näidises: "ED_KAKS") | string    | Tagastatakse ainult need eesmärgideklaratsioonid, mille jaoks on leitud kehtiv nõusolek (staatuses APPROVED). |
| consentReference                                           | string    | Kehtiva nõusoleku nõusolekuviide - unikaalne kood, mida kasutatakse nõusoleku kehtivuse valideerimisel.       |

**Veahaldus:**

| Vea võti                       | Veakood ja staatus    | Vea kirjeldus                                                                                                  |
| ------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------- |
| error.validation               | VALIDATION (400)      | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukood \<>&nbsp;11 märki, mittenumbriline) |
| error.http.404                 | HTTP_NOT_FOUND (404)  | Kehtivaid nõusolekuid ei leitud (staatuses APPROVED)                                                           |
| error.business.id-code-invalid | ID_CODE_INVALID (500) | Isikukood ei vasta standardile                                                                                 |

## validateConsentForClient

Päringu abil saab küsida Andmenõusolekuteenuselt nõusoleku kehtivust. Lihtsustatud andmenõusolekuteenuse kasutamisel on see teenus vabatahtlik ja kasutatakse valideerimiseks.

Kasutab: Klientrakendus

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client

**Päringu käsu näide (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6"
```

**Päring:** https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6

| Parameeter       | On kohustuslik? | Andmetüüp | Kirjeldus                                                                                       |
| ---------------- | --------------- | --------- | ----------------------------------------------------------------------------------------------- |
| consentReference | jah             | string    | Nõusolekuviide - unikaalne kood, mis vastab nõusolekule, mille kehtivust soovitakse valideerida |

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama, mis on määratud nõusolekuga seotud eesmärgideklaratsioonis.

**Vastus:**

```
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "idCode": "60001019906",
  "purposeDeclarationId": "ED_KAKS"
}
```

| Parameeter           | Andmetüüp            | Kirjeldus                                                                               |
| -------------------- | -------------------- | --------------------------------------------------------------------------------------- |
| consentReference     | string               | Nõusolekuviide - unikaalne kood, mis vastab nõusolekule, mille kehtivust valideeritakse |
| consentExpiration    | timestamp (ISO 8601) | Nõusoleku kehtivusaja lõpp                                                              |
| idCode               | string               | Andmesubjekti isikukood                                                                 |
| purposeDeclarationId | string               | Nõusolekuga seotud eesmärgideklaratsiooni identifikaator                                |

**Veahaldus:**

| Vea võti                                       | Veakood ja staatus                    | Vea kirjeldus                                                                                                                  |
| ---------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| error.validation                               | VALIDATION (400)                      | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukood \<>&nbsp;11 märki, mittenumbriline)                 |
| error.http.404                                 | HTTP_NOT_FOUND (404)                  | clientSubsystemIdentifier (Klientrakenduse x-tee alamsüsteemi) ja consentReference kombinatsiooni kohta puudub kehtiv nõusolek |
| error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | Küsitud nõusolek ei ole staatuses APPROVED                                                                                     |

## getThirdPartyConsents

Päringu abil saab Klientrakendus küsida Andmenõusolekuteenuselt nõusolekutaotluse(d) puuduva(te) nõusoleku(te) andmiseks.

Andmenõusolekuteenus töötleb sisse tulnud päringut ning genereerib sisendis esitatud isikukoodi ja eesmärgideklaratsiooni kombinatsiooni baasil nõusolekutaotluse andmekomplekti. Kui sisendis on mitu eesmärgideklaratsiooni, siis iga eesmärgideklaratsiooni kohta genereeritakse eraldi andmekomplekt ehk nõusolekutaotlus. Igale nõusolekutaotlusele (otsuse ootel nõusolekule) omistatakse unikaalne UUID. Nõusolekutaotluse andmekomplekt sisaldab nõusolekutaotluse metaandmeid ja süsteemi poolt genereeritud konteinerit, milles on nõusoleku andmetest kokku pandud fail PDF kujul või ainult PDF faili. PDF faili Klientrakendus allkirjastab ja tagastab allkirjastatud faili Andmenõusolekuteenusele.

Kasutab: Klientrakendus

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party

**Päringu käsu näide (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party" \
-d "{ \
\"idCode\": \"60001019906\", \
\"purposeDeclarationBusinessIdentifiers\": [\"ED_KAKS\", \"ED_KOLM\"]
}"
```

**Päring (Json):**

```
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "ED_KAKS",
    "ED_KOLM"
  ]
}
```

| Parameeter                            | On kohustuslik? | Andmetüüp        | Kirjeldus                                                                                                                   |
| ------------------------------------- | --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| idCode                                | jah             | string           | Andmesubjekti isikukood                                                                                                     |
| purposeDeclarationBusinessIdentifiers | jah             | array of strings | Eesmärgideklaratsiooni identifikaator (võib olla mitu)                                                                      |
| language                              | ei              | string           | Keelekood, mis määrab andmete keele. Toetatud väärtused: "et" - eesti, "en" - inglise, "ru" - vene. Vaikimisi väärtus "et". |

**Vastus:**

Päringu vastuseks antakse nõusolekutaotlus(t)e andmekomplekt JSON kujul. Vastus koosneb massiivist, mis sisaldab nii allkirjastamata konteinerit, mis sisaldab PDFi kui ka eraldi nõusolekutaotluse faili PDF kujul, mille klient lisab ise konteinerisse ja saadab allkirjastatult tagasi.

```
[
  {
    "consentConfirmReference": "7bf5904a-bce3-483f-99c2-527937b032b7",
    "idCode": "60001019906",
    "firstName": "Jaan",
    "lastName": "Tamm",
    "clientName": "Health Startup OÜ",
    "clientRegistryCode": "12819685",
    "clientService": "Immu",
    "purposeDeclarationDescription": "Kui lubate Vaktsiinide infosüsteemil enda immuniseerimisandmed Health Startup OÜ-le edastada, võimaldab see teile pakkuda vaktsineerimiste nõustamise ja meeldetuletuse teenust Immu.",
    "serviceDeclarationName": "Tervise_immuniseerimisandmed",
    "serviceDeclarationDescription": "Immuniseerimistega seotud andmed: haigus mille vastu immuniseeriti, immuniseerimise kuupäev, immunpreparaadi ATC kood ja toimeaine(te) nimetus(ed).",
    "dataProviderName": "Vaktsiinide Infosüsteem",
    "dataControllerName": "Sotsiaalministeerium",
    "dataControllerRegistryCode": "70001952",
    "dataProcessorName": "Tervise Infosüsteemide Amet",
    "dataProcessorRegistryCode": "70006317",
    "validFrom": "01.01.2022",
    "validTo": "01.01.2024",
    "files": [
      {
        "type": "CONSENT_CONTAINER",
        "content": ".....base64 encoded asice container ....."
      },
      {
        "type": "GENERATED_PDF",
        "content": ".....base64 encoded consent pdf ....."
      }
    ]
  },
  {
    "consentConfirmReference": "f16904d0-6f9c-44b4-96a6-ae2106ab326b",
    "idCode": "60001019906",
    "firstName": "Jaan",
    "lastName": "Tamm",
    "clientName": "Health Startup OÜ",
    "clientRegistryCode": "12819685",
    "clientService": "koroonapassi kontroll",
    "purposeDeclarationDescription": "Kui lubate Tervise Infosüsteemil edastada Health Startup OÜ-le oma COVID-19 immuniseerimisega seotud andmed, siis saab Health Startup OÜ pakkuda teile automaatset koroonapassi kontrolli teenust.",
    "serviceDeclarationName": "immuandmed",
    "serviceDeclarationDescription": "Immuniseerimistega seotud andmed: immuniseerimise kuupäev, immuunpreparaat",
    "dataProviderName": "Tervise Infosüsteem",
    "dataControllerName": "Sotsiaalministeerium",
    "dataControllerRegistryCode": "70001952",
    "dataProcessorName": "Terviseamet",
    "dataProcessorRegistryCode": "70008799",
    "validFrom": "01.01.2022",
    "validTo": "01.01.2023",
    "files": [
      {
        "type": "CONSENT_CONTAINER",
        "content": ".....base64 encoded asice container ....."
      },
      {
        "type": "GENERATED_PDF",
        "content": ".....base64 encoded consent pdf ....."
      }
    ]
  }
]
```

| Parameeter                    | Andmetüüp | Kirjeldus                                                                   |
| ----------------------------- | --------- | --------------------------------------------------------------------------- |
| consentConfirmReference       | string    | Otsuse ootel nõusoleku UUID                                                 |
| idCode                        | string    | Andmesubjekti isikukood                                                     |
| firstName                     | string    | Eesnimi                                                                     |
| lastName                      | string    | Perekonnanimi                                                               |
| clientName                    | string    | Osapoole nimi (Klientrakendus), kellele nõusoleku alusel andmed edastatakse |
| clientRegistryCode            | string    | Osapoole registrikood, kellele nõusoleku alusel andmed esitatakse           |
| clientService                 | string    | Andmete saaja pakutav teenus                                                |
| purposeDeclarationDescription | string    | Eesmärgideklaratsiooni kirjeldus (andmete kasutamise eesmärk)               |
| serviceDeclarationName        | string    | Teenusedeklaratsiooni nimi                                                  |
| serviceDeclarationDescription | string    | Andmete edastaja andmete kirjeldus / teenuse andmekoosseisu kirjeldus       |
| dataProviderName              | string    | Andmekogu / infosüsteemi nimi                                               |
| dataControllerName            | string    | Andmete edastaja vastutav töötleja                                          |
| dataControllerRegistryCode    | string    | Andmete edastaja vastutava töötleja registrikood                            |
| dataProcessorName             | string    | Andmete edastaja volitatud töötleja                                         |
| dataProcessorRegistryCode     | string    | Andmete edastaja volitatud töötleja registrikood                            |
| validFrom                     | string    | Nõusoleku kehtivus alates (timestamp sisuga string, nt 01.01.2022)          |
| validTo                       | string    | Nõusoleku kehtivus kuni (timestamp sisuga string, nt 01.01.2023)            |
| files                         | array     | Failide massiiv, mis sisaldab nii konteinerit kui ka PDF faili              |
| type                          | string    | Faili tüüp. Võimalikud väärtused: CONSENT_CONTAINER või GENERATED_PDF       |
| content                       | string    | Faili sisu kodeerituna Base64 vormingusse                                   |

**Veahaldus:**

| Vea võti                                                          | Veakood ja staatus                                       | Vea kirjeldus                                                                                                                                                            |
| ----------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| error.validation                                                  | VALIDATION (400)                                         | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukood \<>&nbsp;11 märki, mittenumbriline)                                                           |
| error.business.requested-consents-not-related-to-any-declarations | REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS (404) | Kehtiva eesmärgideklaratsiooni ja alamsüsteemi kombinatsiooni ei leitud kõikide küsitud nõusolekute puhul                                                                |
| error.business.requested-consents-not-related-to-declarations     | REQUESTED_CONSENTS_NOT_RELATED_TO_DECLARATIONS (404)     | Osade küsitud nõusolekute puhul ei leitud kehtiva eesmärgideklaratsiooni ja alamsüsteemi kombinatsiooni. Vastavad äriidentifikaatorid on loetletud veateate kirjelduses. |
| error.business.id-code-invalid                                    | ID_CODE_INVALID (500)                                    | Isikukood ei vasta standardile                                                                                                                                           |
| error.business.requested-consents-related-to-invalid-declarations | REQUESTED_CONSENTS_RELATED_TO_INVALID_DECLARATIONS (500) | Küsitud nõusolekud on seotud kehtetute eesmärgideklaratsioonidega. Vastavad äriidentifikaatorid on loetletud veateate kirjelduses.                                       |
| error.business.all-requested-consents-have-already-been-approved  | ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED (500)  | Nõusolekute mitmekordsel küsimisel juhul, kui kõik leitud nõusolekud on staatuses APPROVED                                                                               |
| error.business.data-subject-error                                 | DATA_SUBJECT_ERROR (500)                                 | Isik on kas teovõimetu või piiratud teovõimega                                                                                                                           |
| error.business.third-party-flow-requires-signature-declaration    | THIRD_PARTY_FLOW_REQUIRES_SIGNATURE_DECLARATION (400)    | Vähemalt üks seotud teenusedeklaratsioonidest ei eelda allkirjastamist, mistõttu kolmanda osapoole nõusoleku andmise voogu ei saa kasutada                               |

## saveSignedContainerAndApproveConsents

Päringu abil saab Andmenõusolekuteenusele edastada allkirjastatud nõusoleku(d).

Kasutab: Klientrakendus

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party/container

**Kontrollid ja salvestamise loogika**

Andmenõusolekuteenus töötleb sisse tulnud päringut. Päringu töötlemise käigus võrreldakse päringuga tulnud andmeid andmebaasis olevaga, kus kontrollitakse:

- Kas päringu teinud X-tee klient (x-road client) ühtib andmebaasis oleva nõusolekuga seotud teenusedeklaratsioonis olevaga.
- Kas UUID järgi leitud andmebaasi kirjes ühtivad kontroll-väljad nõusoleku infoga.
- Kas allkirjastatud DigiDoc konteiner ja allkiri on valiidne.
- Kas DigiDoc konteineris olev PDF räsi ühtib andmebaasi konteineris oleva PDF räsiga.
- Kas allkiri on antud viimase tunni aja jooksul (ajaperiood reguleeritav süsteemse parameetriga `allowedSignatureTimeInMinutes` = 24 tundi).
- Kas allkirjas olevad isiku andmed (isikukood, eesnimi, perekonnanimi) ühtivad andmebaasis oleva infoga.
- Kui andmete kontrollid saavad positiivse vastuse ("status": "OK"), salvestatakse andmed andmebaasis "Consent" järgnevatesse tabelitesse: CONSENT, CONSENT_SNAPSHOT, FILE. Tabelis "FILE" olev allkirjastamata DigiDoc konteiner asendatakse päringust tulnud allkirjastatud DigiDoc konteineriga.
- Vea korral tagastatakse staatus koos veakoodiga (vt Vastus).

**Päringu käsu näide (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party/container" \
-d "[{ \
\"consentConfirmReference\": \"7bf5904a-bce3-483f-99c2-527937b032b7\", \
\"file\": \"0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Npbmcg\"
}]"
```

**Päring (Json):**

Päringu sisendiks antakse nõusoleku(te) UUID ja digitaalselt allkirjastatud DigiDoc konteiner(id). Sisend koosneb massiivist, mis sisaldab üks kuni mitu allkirjastatud nõusolekut. Üks nõusolek koosneb nõusoleku UUID väärtusest ja allkirjastatud digikonteinerist, milles on nõusoleku fail PDF kujul.

```
[
  {
    "consentConfirmReference": "7bf5904a-bce3-483f-99c2-527937b032b7",
    "file": "0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Npbmcg"
  }
]
```

| Parameeter              | On kohustuslik? | Andmetüüp | Kirjeldus                                                                                                                                                                                                                        |
| ----------------------- | --------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| consentConfirmReference | jah             | string    | Otsuse ootel nõusoleku UUID                                                                                                                                                                                                      |
| file                    | jah             | string    | Allkirjastatud nõusolek (DigiDoc konteiner ASICE formaadis). Stringi sees Base64 kodeeritud fail. NB! Faili nimi konteineris on "Nousolek.pdf". Konteineris on ainult nõusoleku PDF fail, rohkem faile konteineris olla ei tohi. |

**Vastus:**

Päringu vastuseks on massiiv, mis sisaldab iga nõusoleku kohta vastust andmete töötlemise õnnestumise/mitteõnnestumise kohta. Massiiv koosneb otsuse ootel nõusoleku UUID väärtusest, staatusest (status) ning errorCode väärtusest, kui andmete töötlemine ebaõnnestub.

```
[
  {
    "consentConfirmReference": "7bf5904a-bce3-483f-99c2-527937b032b7",
    "status": "OK"
  },
  {
    "consentConfirmReference": "f16904d0-6f9c-44b4-96a6-ae2106ab326b",
    "status": "ERROR",
    "errorCode": "CONSENT_NOT_FOUND"
  }
]
```

| Parameeter              | Andmetüüp | Kirjeldus                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| consentConfirmReference | string    | Otsuse ootel nõusoleku UUID                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| status                  | string    | Kui andmete töötlemine õnnestub, tagastatakse staatuseks "OK". Kui andmete töötlemine ei õnnestunud, tagastatakse staatuseks "ERROR", koos vastav errorCode väärtusega.                                                                                                                                                                                                                                                                                               |
| errorCode               | string    | Veateate info. Täidetakse ainult siis, kui status=ERROR. Võimalikud väärtused: "HTTP_NOT_FOUND" - X-tee klient ei ole sama, mis nõusolekuga seotud teenusedeklaratsioonis; "CONSENT_VALIDATE_INVALID" - sisendis antud nõusoleku andmed ei ühti andmebaasis oleva nõusolekuga; "CONSENT_NOT_FOUND" - sisendis antud UUID ei leidu andmebaasist; "THIRD_PARTY_FLOW_REQUIRES_SIGNATURE_DECLARATION" - nõusolekuga seotud teenusedeklaratsioon ei eelda allkirjastamist. |

**Veahaldus:**

| Vea võti         | Veakood ja staatus | Vea kirjeldus                                                    |
| ---------------- | ------------------ | ---------------------------------------------------------------- |
| error.validation | VALIDATION (400)   | Validatsiooni üldised veateated (kohustuslikud väljad määramata) |

Üksikute nõusolekute töötlemise vead tagastatakse vastusekehas `status` ja `errorCode` väljades (HTTP staatus jääb 200, vt Vastus).

## getConsentHealth

Päringu abil saab kontrollida Andmenõusolekuteenuse seisundit.

Kasutab: Klientrakendus ja Andmekogu

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/health

**Päringu käsu näide (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/health"
```

**Vastus:**

```
{
  "status": "UP"
}
```

| Parameeter | Andmetüüp | Kirjeldus                                   |
| ---------- | --------- | ------------------------------------------- |
| status     | string    | Teenuse seisund. "UP" - teenus on saadaval. |

**Veahaldus:**

| Vea võti         | Veakood ja staatus | Vea kirjeldus                                                    |
| ---------------- | ------------------ | ---------------------------------------------------------------- |
| error.validation | VALIDATION (400)   | Validatsiooni üldised veateated (kohustuslikud väljad määramata) |

Kui teenus ei ole kättesaadav, vastust ei tagastata (turvaserver tagastab võrgu- või ühenduse vea).
