# Using and interfacing the Simplified Data Consent Service

05 June 2026

Version 0.7

---

Version history

| Version | Date              | Description                                                                                                                                                                                                              |
| ------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0.1     | 12 July 2025      | Document created.                                                                                                                                                                                                        |
| 0.2     | 11 September 2025 | Document updated.                                                                                                                                                                                                        |
| 0.3     | 01 November 2025  | Document revised.                                                                                                                                                                                                        |
| 0.4     | 06 January 2026   | Document revised.                                                                                                                                                                                                        |
| 0.5     | 28 January 2026   | Document update. Error code updates.                                                                                                                                                                                     |
| 0.6     | 21 April 2026     | First name and last name removed from the /api/consent/third-party service input.                                                                                                                                        |
| 0.7     | 05 June 2026      | Added an optional fileType field to the /api/consent/third-party input (to choose the returned file type). In the stage environment (consent-stage), optional firstName and lastName can again be provided in the input. |

<!-- markdownlint-disable MD033 -->

# **Table of Contents**

- [1. General info](#general-info)
- [2. Technical specifications of the queries](#technical-specifications-of-the-queries)
  - [2.1 getConsentReferences](#getconsentreferences)
  - [2.2 validateConsentForClient](#validateconsentforclient)
  - [2.3 getThirdPartyConsents](#getthirdpartyconsents)
  - [2.4 saveSignedContainerAndApproveConsents](#savesignedcontainerandapproveconsents)
  - [2.5 getConsentHealth](#getconsenthealth)

# General info

Architectural style: REST API

Data structure: JSON

Authentication: All queries sent to the Data Consent Service are checked to ensure that the X-tee-authenticated subsystem accessing the Data Consent Service is the correct party to make the query. The Data Consent Service only responds to a query if the requester (i.e. the Data Provider or the Client) is associated with the consent being checked, either through the subsystem specified in the Purpose Declaration or through the subsystem specified in the Service Declaration that is always associated with the Purpose Declaration. Authentication is based on the metadata of the X-tee security server (client subsystem), which is compared with the subsystem specified in the Purpose Declaration(s).

You have two days to add a document to the Data Consent Service and 24 hours (one day) to sign the document.

**Data types**

- String parameters are characters encoded in UTF-8.
- Number parameters are sequences of ASCII codes in the range 47–57 (digits 0–9).
- Timestamp parameters are timestamps in the ISO 8601 format.

**Web service URLs**

- LIVE: https://<security-server-address>/r1/EE/GOV/70006317/consent/consent/...
- STAGE: https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/...

Steps for the Simplified Data Consent Service. The image is illustrative, showing what a simplified signing process might look like. The actual process depends on the business processes implemented in the specific institution.

![Pic](../img/Lihtsustatud%20andmen%C3%B5usoleku%20teenus/pic_simplified.png)

# Technical specifications of the queries

## getConsentReferences

The query can be submitted to ask the Data Consent Service for the consent references of valid consent(s) (_Consent Reference_).

Used by: Client

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference

**Example of a query command (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference" \
-d "{ \
\"idCode\": \"60001019906\", \
\"purposeDeclarationBusinessIdentifiers\": [\"PurposeDeclarationID\", \"ED_KAKS\", \"ED_KOLM\"]
}"
```

**Query (Json):**

```
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "PurposeDeclarationID", "ED_KAKS", "ED_KOLM"
  ]
}
```

| Parameter                             | Is it mandatory? | Type of data     | Description                                           |
| ------------------------------------- | ---------------- | ---------------- | ----------------------------------------------------- |
| idCode                                | yes              | string           | Personal identification code of the Data Subject      |
| purposeDeclarationBusinessIdentifiers | yes              | array of strings | Purpose Declaration identifier (can be more than one) |

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Client's X-tee subsystem authenticated in X-tee is the same as the one specified in the Purpose Declaration(s).

**Response:**

```
{
  "ED_KAKS": "91e9844d-3b5e-4df8-9254-42316b1607b6"
}
```

| Parameter                                                        | Type of data | Description                                                                                                       |
| ---------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| purposeDeclarationBusinessIdentifier (in the example: "ED_KAKS") | string       | Only those Purpose Declarations for which a valid consent has been found (with the status APPROVED) are returned. |
| consentReference                                                 | string       | Consent Reference of a valid consent - a unique code used to determine the validity of the consent.               |

**Error management:**

| Error key                      | Error code and status | Error description                                                                                                                    |
| ------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| error.validation               | VALIDATION (400)      | Generic validation error messages (mandatory fields not specified, personal identification code \<>&nbsp;11 characters, non-numeric) |
| error.http.404                 | HTTP_NOT_FOUND (404)  | No valid consents found (with the status APPROVED)                                                                                   |
| error.business.id-code-invalid | ID_CODE_INVALID (500) | The personal identification code does not comply with the standard                                                                   |

## validateConsentForClient

The query can be submitted to ask the Data Consent Service about the validity of a consent. When using the Simplified Data Consent Service, this query is optional and is used for validation.

Used by: Client

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client

**Example of a query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6"
```

**Query:** https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6

| Parameter        | Is it mandatory? | Type of data | Description                                                                                              |
| ---------------- | ---------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| consentReference | yes              | string       | Consent Reference - a unique code corresponding to the consent the validity of which is to be determined |

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Client's X-tee subsystem authenticated in X-tee is the same as the one specified in the Purpose Declaration associated with the consent.

**Response:**

```
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "idCode": "60001019906",
  "purposeDeclarationId": "ED_KAKS"
}
```

| Parameter            | Type of data         | Description                                                                                        |
| -------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| consentReference     | string               | Consent Reference - a unique code corresponding to the consent the validity of which is determined |
| consentExpiration    | timestamp (ISO 8601) | Expiration date of the consent                                                                     |
| idCode               | string               | Personal identification code of the Data Subject                                                   |
| purposeDeclarationId | string               | Identifier of the Purpose Declaration associated with the consent                                  |

**Error management:**

| Error key                                      | Error code and status                 | Error description                                                                                                                    |
| ---------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| error.validation                               | VALIDATION (400)                      | Generic validation error messages (mandatory fields not specified, personal identification code \<>&nbsp;11 characters, non-numeric) |
| error.http.404                                 | HTTP_NOT_FOUND (404)                  | No valid consent exists for the combination of clientSubsystemIdentifier (Client X-tee subsystem) and consentReference               |
| error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | The queried consent is not with the status APPROVED                                                                                  |

## getThirdPartyConsents

The query can be submitted by the Client to ask the Data Consent Service for consent request(s) to grant missing consent(s).

The Data Consent Service processes the incoming query and generates a consent request data set based on the combination of the personal identification code and the Purpose Declaration provided in the input. If the input contains several Purpose Declarations, a separate data set (i.e. consent request) is generated for each Purpose Declaration. Each consent request (consent pending decision) is assigned a unique UUID. The consent request data set contains the consent request metadata and a system-generated container containing the consent data compiled into a PDF file, or only the PDF file. The Client signs the PDF file and returns the signed file to the Data Consent Service.

Used by: Client

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party

**Example of a query command (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party" \
-d "{ \
\"idCode\": \"60001019906\", \
\"purposeDeclarationBusinessIdentifiers\": [\"ED_KAKS\", \"ED_KOLM\"]
}"
```

**Query (Json):**

```
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "ED_KAKS",
    "ED_KOLM"
  ]
}
```

| Parameter                             | Is it mandatory? | Type of data     | Description                                                                                                                                                                                                                                                                      |
| ------------------------------------- | ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| idCode                                | yes              | string           | Personal identification code of the Data Subject                                                                                                                                                                                                                                 |
| purposeDeclarationBusinessIdentifiers | yes              | array of strings | Purpose Declaration identifier (can be more than one)                                                                                                                                                                                                                            |
| language                              | no               | string           | Language code that determines the language of the data. Supported values: "et" - Estonian, "en" - English, "ru" - Russian. The default value is "et".                                                                                                                            |
| fileType                              | no               | string           | The file type to return. If set, only the file of that type is returned in the response. Possible values: "CONSENT_CONTAINER", "GENERATED_PDF". If omitted, both files are returned.                                                                                             |
| firstName                             | no               | string           | First name of the Data Subject. Honoured only in the stage environment (consent-stage) and only together with lastName: the name is then taken from the request instead of the population registry. Legal capacity (teovõime) is still verified against the population registry. |
| lastName                              | no               | string           | Last name of the Data Subject. Honoured only in the stage environment (consent-stage) and only together with firstName (see firstName).                                                                                                                                          |

**Response:**

The response to the query is a consent request data set in JSON format. The response consists of an array containing both an unsigned container (which contains a PDF) and a separate consent request file in PDF format, which the Client adds to the container itself and sends back signed.

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
        "fileType": "CONSENT_CONTAINER",
        "fileContent": ".....base64 encoded asice container ....."
      },
      {
        "fileType": "GENERATED_PDF",
        "fileContent": ".....base64 encoded consent pdf ....."
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
        "fileType": "CONSENT_CONTAINER",
        "fileContent": ".....base64 encoded asice container ....."
      },
      {
        "fileType": "GENERATED_PDF",
        "fileContent": ".....base64 encoded consent pdf ....."
      }
    ]
  }
]
```

| Parameter                     | Type of data | Description                                                                                                                                       |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| consentConfirmReference       | string       | UUID of the consent pending decision                                                                                                              |
| idCode                        | string       | Personal identification code of the Data Subject                                                                                                  |
| firstName                     | string       | First name                                                                                                                                        |
| lastName                      | string       | Last name                                                                                                                                         |
| clientName                    | string       | Name of the party (Client) to which the data is transmitted on the basis of the consent                                                           |
| clientRegistryCode            | string       | Registry code of the party to which the data is transmitted on the basis of the consent                                                           |
| clientService                 | string       | Service provided by the data recipient                                                                                                            |
| purposeDeclarationDescription | string       | Description of the Purpose Declaration (purpose of data use)                                                                                      |
| serviceDeclarationName        | string       | Name of the Service Declaration                                                                                                                   |
| serviceDeclarationDescription | string       | Description of the data transmitted by the data transmitter / description of the service data set                                                 |
| dataProviderName              | string       | Name of the Data Provider / information system                                                                                                    |
| dataControllerName            | string       | Data controller of the data transmitter                                                                                                           |
| dataControllerRegistryCode    | string       | Registry code of the data controller of the data transmitter                                                                                      |
| dataProcessorName             | string       | Data processor of the data transmitter                                                                                                            |
| dataProcessorRegistryCode     | string       | Registry code of the data processor of the data transmitter                                                                                       |
| validFrom                     | string       | Consent validity from (timestamp-content string, e.g. 01.01.2022)                                                                                 |
| validTo                       | string       | Consent validity until (timestamp-content string, e.g. 01.01.2023)                                                                                |
| files                         | array        | Array of files containing both the container and the PDF file. If fileType was set in the request, the array contains only the file of that type. |
| fileType                      | string       | File type. Possible values: CONSENT_CONTAINER or GENERATED_PDF                                                                                    |
| fileContent                   | string       | File contents encoded in Base64 format                                                                                                            |

**Error management:**

| Error key                                                         | Error code and status                                    | Error description                                                                                                                                                                   |
| ----------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| error.validation                                                  | VALIDATION (400)                                         | Generic validation error messages (mandatory fields not specified, personal identification code \<>&nbsp;11 characters, non-numeric)                                                |
| error.business.requested-consents-not-related-to-any-declarations | REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS (404) | A valid Purpose Declaration and subsystem combination was not found for all requested consents                                                                                      |
| error.business.requested-consents-not-related-to-declarations     | REQUESTED_CONSENTS_NOT_RELATED_TO_DECLARATIONS (404)     | A valid Purpose Declaration and subsystem combination was not found for some of the requested consents. The corresponding business identifiers are listed in the error description. |
| error.business.id-code-invalid                                    | ID_CODE_INVALID (500)                                    | The personal identification code does not comply with the standard                                                                                                                  |
| error.business.requested-consents-related-to-invalid-declarations | REQUESTED_CONSENTS_RELATED_TO_INVALID_DECLARATIONS (500) | The requested consents are associated with invalid Purpose Declarations. The corresponding business identifiers are listed in the error description.                                |
| error.business.all-requested-consents-have-already-been-approved  | ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED (500)  | When asking for multiple consents, all the consents found are with the status APPROVED                                                                                              |
| error.business.data-subject-error                                 | DATA_SUBJECT_ERROR (500)                                 | The person is either incapacitated or with limited active legal capacity                                                                                                            |
| error.business.third-party-flow-requires-signature-declaration    | THIRD_PARTY_FLOW_REQUIRES_SIGNATURE_DECLARATION (400)    | At least one of the related Service Declarations does not require signature, so the third party consent flow cannot be used                                                         |
| error.business.file-type-invalid                                  | FILE_TYPE_INVALID (400)                                  | The fileType value provided in the input is not allowed (allowed values: CONSENT_CONTAINER, GENERATED_PDF)                                                                          |

## saveSignedContainerAndApproveConsents

The query can be submitted to send signed consent(s) to the Data Consent Service.

Used by: Client

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party/container

**Checks and storage logic**

The Data Consent Service processes the incoming query. During query processing, the data in the query is compared with the data in the database, where the following is checked:

- Whether the X-tee client that made the query matches the one in the database in the Service Declaration associated with the consent.
- Whether the verification fields found in the database entry by UUID match the consent information.
- Whether the signed DigiDoc container and signature are valid.
- Whether the PDF hash in the DigiDoc container matches the PDF hash in the database container.
- Whether the signature has been provided within the last hour (the time period is adjustable with the system parameter `allowedSignatureTimeInMinutes` = 24 hours).
- Whether the personal data in the signature (personal identification code, first name, last name) matches the information in the database.
- If the data checks return a positive response ("status": "OK"), the data is saved in the following tables of the "Consent" database: CONSENT, CONSENT_SNAPSHOT, FILE. The unsigned DigiDoc container in the "FILE" table is replaced with the signed DigiDoc container from the query.
- In case of an error, the status is returned with an error code (see Response).

**Example of a query command (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party/container" \
-d "[{ \
\"consentConfirmReference\": \"7bf5904a-bce3-483f-99c2-527937b032b7\", \
\"file\": \"0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Npbmcg\"
}]"
```

**Query (Json):**

The query input consists of the UUID of the consent(s) and digitally signed DigiDoc container(s). The input consists of an array containing one or more signed consents. One consent consists of the consent UUID value and a signed digital container containing the consent file in PDF format.

```
[
  {
    "consentConfirmReference": "7bf5904a-bce3-483f-99c2-527937b032b7",
    "file": "0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Npbmcg"
  }
]
```

| Parameter               | Is it mandatory? | Type of data | Description                                                                                                                                                                                                                                     |
| ----------------------- | ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| consentConfirmReference | yes              | string       | UUID of the consent pending decision                                                                                                                                                                                                            |
| file                    | yes              | string       | Signed consent (DigiDoc container in ASICE format). Base64-encoded file within the string. NB! The file name in the container is "Nousolek.pdf". The container contains only the consent PDF file; no other files are allowed in the container. |

**Response:**

The response to the query is an array containing a response for each consent regarding the success or failure of data processing. The array consists of the UUID value of the consent pending decision, the status, and the errorCode value if data processing fails.

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

| Parameter               | Type of data | Description                                                                                                                                                 |
| ----------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| consentConfirmReference | string       | UUID of the consent pending decision                                                                                                                        |
| status                  | string       | If data processing succeeds, "OK" is returned as the status. If data processing fails, "ERROR" is returned together with the corresponding errorCode value. |
| errorCode               | string       | Error code value when status=ERROR. See **Error management** for possible values.                                                                           |

**Error management:**

Per-consent processing errors are returned in the response body via the `status` and `errorCode` fields (the overall HTTP status stays 200, see Response).

| Error key                                                      | Error code and status                                 | Error description                                                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| error.validation                                               | VALIDATION (400)                                      | Generic validation error messages (mandatory fields not specified)                                 |
| error.http.404                                                 | HTTP_NOT_FOUND (404)                                  | The X-tee client is not the same as the one in the Service Declaration associated with the consent |
| error.business.consent-validate-invalid                        | CONSENT_VALIDATE_INVALID (400)                        | The consent data provided in the input does not match the consent in the database                  |
| error.http.404                                                 | CONSENT_NOT_FOUND (404)                               | The UUID provided in the input cannot be found in the database                                     |
| error.business.third-party-flow-requires-signature-declaration | THIRD_PARTY_FLOW_REQUIRES_SIGNATURE_DECLARATION (400) | The Service Declaration associated with the consent does not require signature                     |

## getConsentHealth

The query can be submitted to check the health status of the Data Consent Service.

Used by: Client and Data Provider

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/health

**Example of a query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/health"
```

**Response:**

```
{
  "status": "UP"
}
```

| Parameter | Type of data | Description                                             |
| --------- | ------------ | ------------------------------------------------------- |
| status    | string       | Service health status. "UP" - the service is available. |

**Error management:**

| Error key        | Error code and status | Error description                                                  |
| ---------------- | --------------------- | ------------------------------------------------------------------ |
| error.validation | VALIDATION (400)      | Generic validation error messages (mandatory fields not specified) |

If the service is unreachable, no response is returned (the security server returns a network or connection error).
