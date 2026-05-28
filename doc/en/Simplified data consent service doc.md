# Using and interfacing the Simplified Data Consent Service

21 April 2026

Version 0.6

---
Version history

Version | Date | Description
--- | --- | ---
0.1 | 12 July 2025 | Document created.
0.2 | 11 September 2025 | Document updated.
0.3 | 01 November 2025 | Document revised.
0.4 | 06 January 2026 | Document revised.
0.5 | 28 January 2026 | Document update. Error code updates.
0.6 | 21 April 2026 | First name and last name removed from the /api/consent/third-party service input.
<!-- markdownlint-disable MD033 -->

# **Table of Contents**
- [General info](#general-info)
- [POST /api/consent/references](#post-apiconsentreferences)
- [GET /api/consent/validation/client](#get-apiconsentvalidationclient)
- [POST /api/consent/third-party](#post-apiconsentthird-party)
- [POST /api/consent/third-party/container](#post-apiconsentthird-partycontainer)
- [Error management](#error-management)

## General info

Architectural style: REST API

Data structure: JSON

Authentication: All queries sent to the Data Consent Service are checked to ensure that the x-tes authenticated subsystem accessing the Data Consent Service is the correct party to make the query. The Data Consent Service only responds to a query if the requester (i.e. the Data Collection or Client Application) is associated with the consent being checked, either through the subsystem specified in the purpose declaration or through the subsystem specified in the service declaration, which is always associated with the purpose declaration. Authentication is based on the metadata of the X-tee security server (client subsystem), which is compared with the specifications in the purpose declaration(s).

You have two days to add a document to the consent service and 24 hours, or one day, to sign the document.

Data types:
- String type parameters are UTF-8 encoded symbols.
- Number type parameters are ASCII code sequences in the range 47-57 (numbers 0-9).
- Timestamp type parameters are timestamps in ISO8601 format.

Web service URLs:
- LIVE:  https://<security-server-address>/r1/EE/GOV/70006317/consent/consent/...
- STAGE: https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/...

Steps for simplified data request service.
The image is illustrative, showing what a simplified signing process might look like. The actual process depends on the business processes implemented in the specific institution.

![PPic](../img/Lihtsustatud%20andmen%C3%B5usoleku%20teenus/pic_simplified.png)

## POST /api/consent/references
The query can be used to request consent references for valid consent(s) from the Data Consent Service.

API URL:  https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference 

**Input**
Parameter | Is it mandatory?| Data type | Description
--- | --- | --- | ---
idCode | yes | string | Personal identification code of the data subject.
purposeDeclarationBusinessIdentifiers | yes | array of strings | Declaration of objectives identifier (there may be several).


**Query example**
```json
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "EesmärgideklaratsiooniID",
    "ED_KAKS",
    "ED_KOLM"
  ]
}
```

When receiving a query, the Data Consent Service checks that the identifier of the x-tee subsystem of the x-tee authenticated Client Application is the same as that specified in the purpose declaration(s).

**Output**
Parameter | Data type | Description
--- | --- | ---
purposeDeclarationBusinessIdentifier (näidises: "ED_KAKS") | string | Only those declarations of intent for which valid consent has been found (status APPROVED) will be returned.
consentReference | string | Valid consent reference –  a unique code used to validate the validity of consent.

**Query example**
```json
{
  "ED_KAKS": "91e9844d-3b5e-4df8-9254-42316b1607b6"
}
```

## GET /api/consent/validation/client
The query can be used to ask the Data Consent Service about the validity of consent. When using the simplified data consent service, this service is optional and is used for validation. Upon receiving the query, the Data Consent Service checks that the x-tee authenticated Client Application x-tee subsystem identifier is the same as that specified in the consent-related purpose declaration.

API URL: https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client 

**Input**
Parameter | Is it mandatory? | Data type | Description
--- | --- | --- | ---
consentReference | yes | string | Consent reference – a unique code corresponding to the consent whose validity is to be validated.

**Query example**

`https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6`

**Output**
Parameter | Data type | Description
--- | --- | ---
consentReference | string | Consent reference – a unique code corresponding to the consent whose validity is being validated. 
consentExpiration | timestamp (ISO 8601) | End of consent validity period.
idCode | string | Personal identification code of the data subject.
purposeDeclarationId | string | Identifier of the consent-related purpose statement.

**Query example**
```json
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "idCode": "60001019906",
  "purposeDeclarationId": "ED_KAKS"
}
```

## POST /api/consent/third-party 
Using a query, the Client Application can ask the Data Consent Service to grant consent(s) that are missing from the consent request(s).

The Data Consent Service processes the incoming query and generates a consent request data set based on the combination of the personal identification code and the purpose statement provided in the input. If there are several purpose declarations in the input, a separate data set, i.e. consent request, is generated for each purpose declaration. Each consent request (consent pending decision) is assigned a unique UUID. The consent request data set contains the consent request metadata and a system-generated container containing the consent data compiled into a PDF file or only the PDF file. The client application signs the PDF file and returns the signed file to the Data Consent Service. 

API URL: https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party 

**Input**
Parameter | Is it mandatory? | Data type | Description
--- | --- | --- | ---
idCode | yes | string | Personal identification code of the data subject.
purposeDeclarationBusinessIdentifiers | yes | array of String | Identifier of the statement of objectives. There can be several.
language | no | string | 	Language code that determines the language of the data. Two-letter codes are used (e.g., "en" for English, "et" for Estonian). The default value is "et". 

**Query example**
```json
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "ED_KAKS",
    "ED_KOLM"
  ]
}
```

**Output**
The response to the request is a dataset of consent request(s) in JSON format. The response consists of an array that includes both an unsigned container containing a PDF and a separate consent request file in PDF format, which the client adds to the container themselves and sends back signed.

Parameter | Data type | Description
--- | --- | ---
consentReference | string | Consent UUID pending decision.
idCode | string | Personal identification number.
firstName | string | First name.
lastName | string | Last name.
clientName | string | Name of the party (e.g., customer application) to whom the data is transferred on the basis of consent.
clientRegistryCode | string | The registration code of the party to whom the data is submitted on the basis of consent.
clientService | string | Service offered by the data recipient.
purposeDeclarationDescription | string | Description of the purpose statement (purpose of data use).
serviceDeclarationName | string | Service declaration name.
serviceDeclarationDescription | string | Description of the data provided by the data provider/description of the service data set.
dataProviderName | string | Name of the database/information system.
dataControllerName | string | Data controller responsible for data transfer.
dataControllerRegistryCode | string | Registration code of the controller responsible for data processing.
dataProcessorName | string | Authorized processor of data.
dataProcessorRegistryCode | string | Registration code of the data transmitter's authorized processor.
validFrom | string | Validity of consent: from... Timestamp string. E.g. 01.01.2022
validTo | string | Validity of consent: until... Timestamp string. E.g. 01.01.2023
files | string | The file array contains both the container and the PDF file.
type | string | File type. Possible values are CONSENT_CONTAINER or GENERATED_PDF.
content | string | File contents encoded in Base64 format. 

**Query example**
```json
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

## POST /api/consent/third-party/container
The query can be used to send signed consent(s) to the Data Consent Service.

API URL: https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party/container

**Checks and storage logic**

The data consent service processes the incoming query. During query processing, the data in the query is compared with the data in the database, where the following is checked:

- Whether the X-Road client that made the query matches the consent-related service declaration in the database.
- Whether the fields found in the database entry by UUID match the consent information.
- Whether the signed DigiDoc container and signature are valid.
- Whether the PDF hash in the DigiDoc container matches the PDF hash in the database container.
- Whether the signature has been given within the last hour (time period adjustable with system parameter allowedSignatureTimeInMinutes = 24 hours).
- Whether the personal data in the signature (personal identification code, first name, last name) matches the information in the database.
- If the data checks return a positive response ("status": "OK"), the data is saved in the following tables in the "Consent" database: CONSENT, CONSENT_SNAPSHOT, FILE. The unsigned DigiDoc container in the "FILE" table is replaced with the signed DigiDoc container from the query.
- In case of an error, the status is returned with an error code (see Query response).

**Input**
The query input consists of the UUID of the consent(s) and digitally signed DigiDoc container(s). The input consists of an array containing one or more signed consents. One consent consists of the consent UUID value and a signed digital container containing the consent file in pdf format.

Parameter | Is it mandatory? | Data type | Description
--- | --- | --- | ---
consentConfirmReference | yes | string | Consent UUID pending decision.
file | yes | string | Signed consent (DigiDoc container in ASICE format).  Base64-encoded file within the string. NB! The file name in the container is "Nousolek.pdf". The container only contains the consent PDF file; no other files are allowed in the container.

**Input**
```json
[{
 "consentConfirmReference": "7bf5904a-bce3-483f-99c2-527937b032b7",
 "file": "0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Npbmcg"
}]
```

**Output**
The response to the query is an array containing a response for each consent regarding the success/failure of data processing. The array consists of the UUID value of the consent awaiting a decision, the status, and the errorCode value if data processing fails.

Parameter | Is it mandatory? | Data type | Description
--- | --- | --- | ---
consentConfirmReference | yes | string | Consent UUID pending decision.
status | yes | string | If the data processing is successful, the status "OK" is returned; If the data processing is unsuccessful, the status "ERROR" is returned, together with the corresponding errorCode value. 
errorCode | yes | string | 	
HTTP_NOT_FOUND - The X-road client is not the same as the one specified in the consent-related service declaration; CONSENT_VALIDATE_INVALID – The consent data provided in the input does not match the consent in the database. CONSENT_NOT_FOUND – The UUID provided in the input cannot be found in the database.

**Query example**
```json
[{
"consentConfirmReference": "7bf5904a-bce3-483f-99c2-527937b032b7",
"status": "OK"
}, {
"consentConfirmReference": "f16904d0-6f9c-44b4-96a6-ae2106ab326b",
"status": "ERROR",
"errorCode": "CONSENT_NOT_FOUND"
}]
```

## Error management
HTTP code | Error code | Description
--- | --- | ---
200 | OK | The query was successful and the corresponding query output is displayed.
400 | VALIDATION FAILURE | Validation failed, required fields are empty. 
400 | BAD REQUEST | Incorrect query content.
404 | NOT FOUND | The combination of the current statement of objectives and subsystem was not found for all requested consents. 
404 | REQUESTED CONSENTS ARE NOT RELATED TO ANY PURPOSE DECLARATIONS | The purpose identifier does not correspond to any existing declaration. 
500 | INVALID ID CODE | The personal identification code is incorrect or the format is wrong.
500 | INTERNAL SERVER ERROR | Required field is missing or empty.
500 | ALL REQUESTED CONSENTS HAVE ALREADY BEEN  APPROVED | Multiple consent requests if all consents found are in APPROVED status.
500 | DATA SUBJECT ERROR | According to the personal identification code, the person is a minor and/or legally incompetent. 
503 | NOT FOUND | Incorrect X-ROAD-CLIENT header. 


 
