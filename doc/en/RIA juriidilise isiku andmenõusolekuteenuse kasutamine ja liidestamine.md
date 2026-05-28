# Using and interfacing the RIA Legal Entity Data Consent Service

Version history

| Date       | Version | Description     |
|------------|---------|-----------------|
| 09.03.2026 | 0.1     | Document created |

Table of contents

[1 Introduction](#1-introduction)

[1.1 Definitions](#11-definitions)

[2 Prerequisites for using the Legal Entity Data Consent Service](#2-prerequisites-for-using-the-legal-entity-data-consent-service)

[3 Description of key processes as use cases](#3-description-of-key-processes-as-use-cases)

[3.1 Use case 1: Submitting a consent request to Data Subject(s) by the Client](#31-use-case-1-submitting-a-consent-request-to-data-subjects-by-the-client)

[3.2 Use case 2: Data query and consent validation (Data Provider)](#32-use-case-2-data-query-and-consent-validation-data-provider)

[4 Consent status diagram](#4-consent-status-diagram)

[5 Interfacing with the Legal Entity Data Consent Service and technical specifications of the queries](#5-interfacing-with-the-legal-entity-data-consent-service-and-technical-specifications-of-the-queries)

[5.1 Technical specifications of the queries used by the Data Provider and the Client](#51-technical-specifications-of-the-queries-used-by-the-data-provider-and-the-client)

[5.1.1 Purpose Declarations list query - purposedeclarations](#511-purpose-declarations-list-query---purposedeclarations)

[5.1.2 Initiating a consent request / requesting consent - create](#512-initiating-a-consent-request--requesting-consent---create)

[5.1.3 Consent references query - *status*](#513-consent-references-query---status)

[5.1.4 Consent(s) link (URL) query - *url*](#514-consents-link-url-query---url)

[5.1.5 Consent validity query for the Client - client](#515-consent-validity-query-for-the-client---client)

[5.1.6 Consent validity query for the Data Provider - *dataprovider*](#516-consent-validity-query-for-the-data-provider---dataprovider)

[5.1.7 Reported data transmission - reportDataTransmission](#517-reported-data-transmission---reportdatatransmission)

[6 Instructions for the interface testing of the Legal Entity Data Consent Service (JURNT) by the integrating party](#6-instructions-for-the-interface-testing-of-the-legal-entity-data-consent-service-jurnt-by-the-integrating-party)

[6.1 Creating a consent URL and displaying consent request information (primary and recurring)](#61-creating-a-consent-url-and-displaying-consent-request-information-primary-and-recurring)

[6.2 Querying Purpose Declarations (Client)](#62-querying-purpose-declarations-client)

[6.3 Initiating a consent request / requesting consent (Client)](#63-initiating-a-consent-request--requesting-consent-client)

[6.4 Approving (*approve*) and declining/withdrawing (*decline*) consent](#64-approving-approve-and-decliningwithdrawing-decline-consent)

[6.5 Querying consent references](#65-querying-consent-references)

[6.6 Validation of consents (Client and Data Provider)](#66-validation-of-consents-client-and-data-provider)

[6.7 Reporting on successful data queries based on consents (Data Provider)](#67-reporting-on-successful-data-queries-based-on-consents-data-provider)

[7 Instructions for using the Legal Entity Data Consent Service management interface](#7-instructions-for-using-the-legal-entity-data-consent-service-management-interface)

[7.1 Roles in the management interface](#71-roles-in-the-management-interface)

[7.2 Information systems management](#72-information-systems-management)

[7.2.1 Views associated with the management of information systems](#721-views-associated-with-the-management-of-information-systems)

[7.2.2 Information system data](#722-information-system-data)

[7.3 Service Declarations management](#73-service-declarations-management)

[7.3.1 Views associated with the management of Service Declarations](#731-views-associated-with-the-management-of-service-declarations)

[7.3.2 Service Declaration data](#732-service-declaration-data)

[7.3.3 Status diagram of the Service Declaration](#733-status-diagram-of-the-service-declaration)

[7.4 Purpose Declarations management](#74-purpose-declarations-management)

[7.4.1 Views associated with the Purpose Declarations management](#741-views-associated-with-the-purpose-declarations-management)

[7.4.2 Purpose Declaration data](#742-purpose-declaration-data)

[7.4.3 Status diagram of the Purpose Declaration](#743-status-diagram-of-the-purpose-declaration)

[8 Statistics](#8-statistics)

[8.1 Statistics output](#81-statistics-output)

[8.2 Statistical data](#82-statistical-data)

[9 Consent template](#9-consent-template)

[10 Legal Entity Data Consent Service user interface](#10-legal-entity-data-consent-service-user-interface)

[10.1 Approving consent](#101-approving-consent)

[10.1.1 Client actions before redirection](#1011-client-actions-before-redirection)

[10.1.2 In the Legal Entity Data Consent Service](#1012-in-the-legal-entity-data-consent-service)

[10.1.3 Client actions after redirection](#1013-client-actions-after-redirection)

[10.2 Consents management](#102-consents-management)

[10.2.1 Withdrawal of consent](#1021-withdrawal-of-consent)

[10.3 Requesting consent](#103-requesting-consent)

[10.3.1 Requesting consents via the Client Application](#1031-requesting-consents-via-the-client-application)

[10.4 Data transmitted](#104-data-transmitted)


# 1 Introduction

The purpose of this document is to describe the main use cases, principles of data exchange and testing, and user interfaces of the RIA Legal Entity Data Consent Service (JURNT).

The document serves as a basis for interfacing with and adopting the RIA Legal Entity Data Consent Service JURNT.

## 1.1 Definitions

**Data Subject** -- a legal entity to which the data held in the Data Provider relates.

**Representative** -- a person who represents the Data Subject.

**Data Provider** -- an information system that holds the personal data of the Data Subject.

**Client / Requesting Legal Entity** -- an information system that requires the Data Subject's data from the Data Provider in order to provide a service to the Data Subject.

**Legal Entity Data Consent Service (JURNT)** -- an information system responsible for managing the consents of Data Subjects that are legal entities.

**Protected Service** -- an abstract Data Provider service that grants access to the Data Subject's data and whose use requires the Data Subject's consent.

**Service Declaration** -- a description of a single Protected Service provided by a Data Provider and the data transmitted through it. Registered by the Data Provider in the Data Consent Service.

**Purpose Declaration** -- a description of the purpose for which data is used. Within the MVP scope it is registered by the Data Provider in the Data Consent Service, and serves as the basis for consent requests. The content of the Purpose Declaration is proposed by the Client. If, to achieve its purposes, the Client requires data from several Protected Services (from one or several Data Providers), several Purpose Declarations are registered -- one for each service. In that case the Client must also obtain several corresponding consents from the Data Subject.

**Consent** -- the consent granted by the Data Subject to the Data Provider on the basis of which the Data Provider may transmit, through Protected Services, the data described in the consent to the Client for processing for the purpose described in the consent.

**Consent in status REQUESTED (Consent Request)** -- a consent the Client requires in order to provide a service to the Data Subject, but which the Data Subject has not yet granted.

**Consent Reference** -- a unique code for the consent, used to validate the consent's validity.

**Consent Request** -- a request submitted to the Data Subject to obtain consent to transmit data concerning them.

**Requesting Legal Entity** -- a legal entity (Client) that submits the Consent Request to the Data Subject.

# 2 Prerequisites for using the Legal Entity Data Consent Service

In order to enable requesting consents from the Data Subject for the Client, the Data Provider and the Client must complete the following steps to set up the Legal Entity Data Consent Service:

1\. The Client reviews the existing Protected Services and data sets in the X-Road catalogue (<https://x-tee.ee/catalogue/ee-dev>) and contacts the Data Provider.

2\. The Data Provider considers the Client's request to use the data, examines the Client's background and trustworthiness. If the parties reach an agreement, they conclude a contract.

3\. If the X-Road catalogue does not contain a data set the Client needs, the Data Provider creates a new Protected Service that meets the Client's needs.

4\. A representative of the Data Provider -- the Information Systems administrator -- adds to the Data Consent Service the information system that will provide the desired Protected Service (if it was not added previously) (see section [7.2.](#information-systems-management))

5\. A representative of the Data Provider -- the Information Systems administrator -- adds to the Data Consent Service the Service Declaration describing the Protected Service (see section [7.3.](#service-declarations-management)). If a Service Declaration already exists for the required service, it does not need to be re-declared; the existing Service Declaration can be used.

6\. Based on the contract concluded with the Client, the representative of the Data Provider -- the Information Systems administrator -- adds to the Data Consent Service a Purpose Declaration describing the purpose of data use (see section [7.4.](#purpose-declarations-management))

7\. After submitting the Purpose Declaration, the Data Provider exports the Purpose Declaration data from the Data Consent Service and forwards it to the Client (e.g. by email). Among these data, the unique identifier of the Purpose Declaration is transmitted, which the Client will use when communicating with the Data Consent Service.

8\. The Client interfaces with the Data Consent Service, enabling the redirection of the Data Subject or the Representative to the Legal Entity Data Consent Service JURNT to grant the necessary consents.

# 3 Description of key processes as use cases

This chapter contains the two main use cases related to the Client Application and the Data Provider, giving an overview of the context in which the Data Consent Service APIs are used.

## 3.1 Use case 1: Submitting a consent request to Data Subject(s) by the Client

**Actors:** Client / Client Application, Legal Entity Data Consent Service JURNT

**Parties and their interests:**

• The Data Subject wishes to use a service provided by the Client whose operation requires the Data Subject's consent to the transmission and processing of their personal data.

• The Client wishes to obtain the Data Subject's consent to receive their data from the Data Provider(s) and to verify that all the consents required to provide the service are valid.

• The Legal Entity Data Consent Service JURNT wishes to allow the Client to submit consent requests to the Data Subject and to track its submitted requests and received consents.

**Preconditions:** The Client has the registry code of the Data Subject and the identifiers of the Purpose Declarations corresponding to its service. There may be more than one Data Subject at a time (up to 100).

**Postconditions:** The consent requests created by the Client are valid and are available as consent requests to the Data Subject(s) in the eesti.ee Business Portal for approval/rejection.

**Main scenario:**

1\. The Client queries via the API the Purpose Declarations available for its use. The **purposedeclarations** query is used (see section [5.1.1.](#511-purpose-declarations-list-query---purposedeclarations)).

2\. JURNT checks that the X-Road subsystem identifier of the X-Road-authenticated Client matches the one specified in the Purpose Declaration(s) and that the Purpose Declaration is intended for legal entities.

3\. JURNT returns the valid Purpose Declarations (1 - n).

4\. The Client submits a consent request to the legal entity / entities to obtain their consent to receive from the Data Provider the data corresponding to the selected Purpose Declaration (see section [5.1.2.](#512-initiating-a-consent-request--requesting-consent---create)).

5\. JURNT validates whether the Purpose Declaration selected in the Client's request is permitted for the Client and valid.

6\. JURNT validates whether the Data Subject(s) selected in the request already have a request initiated or a consent obtained.

7\. As a response, JURNT returns a list of the legal entities to which the request was initiated. For each legal entity, the response contains the registry code and the consent reference / error code.

8\. The Client queries valid consent references (see section [5.1.3.](#513-consent-references-query---status)).

9\. JURNT returns the valid consent reference(s) as a response.

**Sequence diagram of the main scenario:**

![Main scenario sequence diagram](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image1.png)

**Alternative scenarios and extensions:**

3a. No suitable valid Purpose Declarations were found.

• The response is an empty list.

4a. The Data Provider has not made any Purpose Declarations available to the Client, i.e. the list of Purpose Declarations is empty.

• The Client cannot compile the request and must order the relevant service from the Data Provider.

4b. The Client needs data from several Data Providers or from several data services of the same Data Provider.

• The Client submits a separate consent request for each data need.

## 3.2 Use case 2: Data query and consent validation (Data Provider)

**Actors:** Data Provider, Legal Entity Data Consent Service JURNT, Client Application

**Parties and their interests:**

• The Client (Client Application) queries data from the Data Provider. The data query must contain the corresponding consent reference and the Data Subject's registry code. (This is not JURNT functionality.)

• The Data Provider wishes to confirm with the Data Consent Service that valid consent of the Data Subject exists for transmitting the requested data and that the data transmission conditions are correct.

• The Data Consent Service wishes to validate the validity of the required consent and to transmit to the Data Provider the data needed to check the data transmission conditions.

**Preconditions:** The Data Provider knows the identifiers of the Service Declarations associated with its information systems. The Data Provider has a mapping table by which it can check which Protected Service each Service Declaration corresponds to.

**Postconditions (in the case of valid consent):** The Data Provider transmits the data to the Client Application through the Protected Service (this is not part of JURNT). The Data Provider reports the successful data transmission to the Data Consent Service.

**Main scenario (assuming that the required consent is valid):**

1\. The Client Application queries data from the Data Provider. The data query must contain the corresponding consent reference and the Data Subject's personal identification code.

2\. The Data Provider sends the consent reference to the Data Consent Service JURNT for validation. JURNT validates the consent reference and returns to the Data Provider a response which, in addition to the consent reference, contains the consent expiration date, the Client subsystem identifier, the Data Subject's registry code, and the identifier of the Service Declaration associated with the consent. The **dataprovider** query is used in steps 2 and 3 (see section [5.1.6.](#516-consent-validity-query-for-the-data-provider---dataprovider)).

3\. The Data Provider verifies the following data transmission conditions:

– the Client subsystem identifier (in the X-Road query header) that sent the data query is the same as in the Data Consent Service response;

– the Data Subject's personal identification code contained in the Client's data query is the same as in the Data Consent Service response;

– the Protected Service through which the Client queries the data corresponds to the Service Declaration identifier contained in the Data Consent Service response.

4\. If all the checks succeed, the Data Provider transmits the requested data to the Client. (This is not JURNT functionality.)

5\. The Data Provider reports the successful data transmission. The **reportDataTransmission** query is used (see section [5.1.7.](#517-reported-data-transmission---reportdatatransmission)).

**Sequence diagram of the main scenario:**

![Main scenario sequence diagram](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image2.png)

**Alternative scenarios:**

2a. No such consent reference exists in the Data Consent Service JURNT.

• Validation failed, JURNT responds to the Data Provider with an error message.

• The Data Provider responds to the Client with an error message, no data is transmitted and no data transmission is reported.

2b. The consent reference points to a consent that is not valid.

• Validation failed, JURNT responds to the Data Provider with an error message.

• The Data Provider responds to the Client with an error message, no data is transmitted and no data transmission is reported.

3a. At least one of the checks has failed.

• The Data Provider responds to the Client with an error message, no data is transmitted and no data transmission is reported.

# 4 Consent status diagram

The following diagram describes the possible statuses of the JURNT consent and the transitions between them.

![Consent status diagram](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image3.png)

# 5 Interfacing with the Legal Entity Data Consent Service and technical specifications of the queries

The Legal Entity Data Consent Service JURNT provides REST API queries over X-Road to legal entities, which can be used through their own Client Application or otherwise.

For every query that reaches the Data Consent Service, JURNT checks that the X-Road-authenticated subsystem contacting JURNT is the correct party to make such a query. JURNT will respond to a query only if the requester (i.e. the Data Provider or the Client) is associated with the consent being verified, either via the subsystem in the Purpose Declaration or via the subsystem in the Service Declaration that is always associated with the Purpose Declaration.

**Data types**

All string parameters are characters encoded in UTF-8.

All number parameters are sequences of ASCII codes in the range 47–57 (digits 0–9).

All timestamp parameters are timestamps in ISO 8601 format.

## 5.1 Technical specifications of the queries used by the Data Provider and the Client

### 5.1.1 Purpose Declarations list query - purposedeclarations

This query allows the Data Consent Service to be queried for a list of the company's valid Purpose Declarations, which can be used to compose consent requests from legal entities.

Used by: Client

**IMPORTANT!** This query returns a result only for legal entities; it is not usable for Purpose Declarations that apply to requesting consents from natural persons.

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations

**Example query command (curl):**

```
curl --location 'https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consentstage/api/legal-entity-consent/purposedeclarations' \
--header 'X-Road-Client: ee-dev/COM/10004252/sebpank' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json'
```

The Client is identified by the X-Road-Client value in the header.

**Response:**

```
{
  "SEB_SALARY_BENCHMARK",
    "SEB_SALARY_BENCHMARK_2",
    "Eesmargideklaratsiooni_identifikaator",
    "SEB_SALARY_BENCHMARK_R"
}
```

| Parameter                            | Data type       | Description                                                                                                              |
|--------------------------------------|-----------------|--------------------------------------------------------------------------------------------------------------------------|
| purposeDeclarationBusinessIdentifier | array of string | Identifier of a valid legal entity Purpose Declaration (there may be several). Only those that are valid are returned. |

If no suitable Purpose Declaration is found, the response is an empty list.

**Error handling:**

| Error key  | Error code and status | Error description                                            |
|------------|-----------------------|--------------------------------------------------------------|
| errorCode  | VALIDATION (400)      | The query does not include an X-Road header, HTTP_BAD_REQUEST |

### 5.1.2 Initiating a consent request / requesting consent - create

This query allows initiating a data consent request from one or more legal entities.

Used by: Client

**IMPORTANT!** This query is intended only for legal entities and cannot be used to request consents from natural persons.

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create

**Example query command (curl):**

```
curl --location 'https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consentstage/api/legal-entity-consent/create' \
--header 'X-Road-Client: ee-dev/COM/10004252/sebpank' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "regCodes": [
    "10714404"
  ],
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R"
}
'
```

**Request (JSON):**

```
{
  "regCodes": [
    "10714404"
  ],
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R"
}
```

| Parameter                            | Mandatory? | Data type        | Description                                                       |
|--------------------------------------|------------|------------------|-------------------------------------------------------------------|
| regCodes                             | yes        | array of strings | Data Subject's registry code (may be several, maximum 100)        |
| purposeDeclarationBusinessIdentifier | yes        | string           | Identifier of the legal entity Purpose Declaration                |

Upon receiving the query, JURNT performs checks at two levels: general checks and checks for each registry code.

General checks:

• the X-Road subsystem identifier of the X-Road-authenticated Client is the same as the one specified in the legal entity Purpose Declaration,

• the Purpose Declaration is valid,

• there are between 1 and 100 registry codes. **Error handling for general checks:**

| Error key                                                         | Error code and status | Error description                                                                                                                                                                                |
|-------------------------------------------------------------------|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| error.business.requested-consents-not-related-to-any-declarations | VALIDATION (404)      | "REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS" - no valid legal entity Purpose Declarations exist for the given X-Road subsystem                                                          |
| error.validation                                                  | VALIDATION (400)      | Error message info. Filled only when an error is found. "SIZE" - registry codes are missing or exceed 100, "NOT_BLANK" - the Purpose Declaration or registry code field is missing. |

Check for each registry code (after the general checks pass):

• a legal entity with the given registry code exists in the Business Register and is valid. To check this, JURNT makes a request to the public autocomplete service at https://avaandmed.ariregister.rik.ee/et/ariregistri-avaandmete-api/autocomplete-teenus.

A legal entity is deemed valid when its status='R' (entered in the register). Otherwise it is an error and JURNT returns the error "REG_CODE_INVALID" in the response for that registry code (see the "Response" table). Duplicate registry codes are allowed; they are reflected only once in the response.

**Response:** (array of objects) - contains a block for each legal entity:

| Parameter               | Data type | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| regCode                 | string    | Data Subject's registry code                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| consentRequestReference | string    | The generated consent request reference. This is different from the consent reference that is created upon approval. It allows the data to be reconciled before approval. Filled only when status=OK.                                                                                                                                                                                                                                                                                                                                              |
| status                  | string    | If the data processing succeeds, "OK" is returned as the status. If data processing fails, "ERROR" is returned together with the corresponding errorCode value.                                                                                                                                                                                                                                                                                                                                                                                    |
| errorCode               | string    | Error message info. Filled only when status=ERROR: "REG_CODE_INVALID" - no legal entity with the given registry code exists according to the Business Register data, or the registry code does not match the standard, "DUPLICATE_CONSENTS_REQUESTED_IN_SUCCESSION" - a consent request (status PENDING) for the given registry code and legal entity Purpose Declaration already exists, "ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED" - a consent for the given registry code and legal entity Purpose Declaration already exists (status APPROVED). |

Example output when the general checks pass and one registry code is suitable but the other is not:

```
[
    {
        "regCode": "16492459",
        "consentRequestReference": "3a5ddc15-45b4-4c56-95f9-14f1b69e49d1",
        "status": "OK",
        "errorCode": null
    },
    {
        "regCode": "122181412311231",
        "consentRequestReference": null,
        "status": "ERROR",
        "errorCode": "REG_CODE_INVALID"
    }
]
```

### 5.1.3 Consent references query - *status*

This query allows the consent references of valid JURNT consents to be queried from the Data Consent Service for a specific Purpose Declaration. The consent statuses to be included in the list can be selected.

Used by: Client (data user)

**IMPORTANT!** This query is intended only for legal entities and cannot be used to request consents from natural persons.

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status?page=0&size=20

If *page* and *size* are not specified, *page*=0 and *size*=20 are used by default. *Size* cannot exceed 100; if a value above 100 is set, 100 is used internally. The response header also contains *X-Total-count*, indicating the total number of responses. Based on this, the integrator can decide whether to look at the next page.

**Example query command (curl):**

```
curl --location 'https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consentstage/api/legal-entity-consent/status?page=0&size=20 \
--header 'X-Road-Client: ee-dev/COM/10004252/sebpank' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R",
  "statuses": ["REJECTED", "APPROVED", "DECLINED"],
  "regCodes": ["10714404"]
}
'
```

**Request (JSON):** (the example queries for three statuses):

```
{
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R",
  "statuses": ["REJECTED", "APPROVED", "DECLINED"],
  "regCodes": ["10714404"]
}
```

| Parameter                            | Mandatory? | Data type        | Description                                                                                                                                                                                                                                                                                            |
|--------------------------------------|------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| purposeDeclarationBusinessIdentifier | yes        | string           | Identifier of the legal entity Purpose Declaration                                                                                                                                                                                                                                                     |
| regCodes                             | no         | array of strings | Registry codes of legal-entity Data Subjects whose responses to the consent request(s) are sought. If the list is empty, data is sought for all legal-entity Data Subjects to which a request has been submitted for the given Purpose Declaration(s). |

consentStatus \| no \| array of strings \| Consent status(es) used to filter the consents to look up.

Upon receiving the query, JURNT performs a general check: whether the X-Road subsystem identifier of the X-Road-authenticated Client matches the one specified in the legal entity Purpose Declaration.

**Response:**

```
[
    {
        "regCode": "12398893",
        "consentStatus": "REQUESTED",
        "consentReference": null,
        "consentRequestReference": "8ed37e78-e62e-49c9-8da2-597bbe485891"
    },
    {
        "regCode": "11170403",
        "consentStatus": "REQUESTED",
        "consentReference": null,
        "consentRequestReference": "8cca6360-2d3d-46b7-a26b-b320c660267b"
    },
    {
        "regCode": "11889040",
        "consentStatus": "REQUESTED",
        "consentReference": null,
        "consentRequestReference": "179c65aa-8860-40c5-9374-9e4312f52bff"
    }
]
```

| Parameter               | Data type | Description                                                                                                                                                                                                                  |
|-------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| regCode                 | string    | Data Subject's registry code                                                                                                                                                                                                  |
| consentStatus           | string    | Status of the corresponding consent                                                                                                                                                                                          |
| consentReference        | string    | Consent reference of a valid consent – a unique code used to validate the consent's validity. If the consent has never been approved, this is null.                                                                          |
| consentRequestReference | string    | Consent request reference – a unique code generated when the consent request is created. Its purpose is to enable the integrator to reconcile which status the consent is in before the consent becomes valid. |

**Error handling:**

| Error key                                                         | Error code and status | Error description                                                                                                                          |
|-------------------------------------------------------------------|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| error.validation                                                  | VALIDATION (400)      | Error info. Filled only when the input format is invalid and the server cannot read it.                                                    |
| error.business.requested-consents-not-related-to-any-declarations | VALIDATION (404)      | "REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS" - no valid legal entity Purpose Declarations exist for the given X-Road subsystem    |

### 5.1.4 Consent(s) link (URL) query - *url*

This query allows obtaining from the Data Consent Service JURNT the link (URL) through which the Data Subject can be directed to view consent requests and grant consents.

Used by: Client (data user)

**IMPORTANT!** Do not use the same link multiple times to redirect the Data Subject, as outdated data may be displayed via an old link. A new link must always be requested with the **url** query when redirecting the Data Subject.

Before generating the link, JURNT checks that the legal entity with the registry code contained in the request exists in the Business Register and is valid. To check this, JURNT makes a request to the public autocomplete service at https://avaandmed.ariregister.rik.ee/et/ariregistri-avaandmete-api/autocomplete-teenus. A legal entity is deemed valid when its status='R' (entered in the register). Otherwise it is an error and JURNT returns the error "REG_CODE_INVALID" in the response for that registry code.

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url

**Example query command (curl):**

```
curl -k  \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent"/url \
-d "{ \
\"regCode\":\"12345678\",
\"callback\":\"https://www.ria.ee\",
\"purposeDeclarationBusinessIdentifiers\": [\"PurposeDeclarationID\"]
}"
```

**Request (JSON):**

```
{
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R",
  "statuses": ["REJECTED", "APPROVED", "DECLINED"],
  "regCodes": ["10714404"]
}
```

| Parameter                            | Mandatory? | Data type | Description                                                                |
|--------------------------------------|------------|-----------|----------------------------------------------------------------------------|
| purposeDeclarationBusinessIdentifier | yes        | string    | Identifier of the legal entity Purpose Declaration                         |
| regCode                              | yes        | string    | Registry code of the legal-entity Data Subject                             |
| callback                             | yes        | string    | URL to which the Client redirects back                                     |

**Important!** Upon receiving the query, the Data Consent Service checks that the X-Road subsystem identifier of the X-Road-authenticated Client matches the one specified in the Purpose Declaration.

**Response:**

| Parameter             | Data type | Description                                                                                                              |
|-----------------------|-----------|--------------------------------------------------------------------------------------------------------------------------|
| consentGroupReference | string    | Consent request reference - a unique code used to distinguish consent requests                                           |
| url                   | string    | The consent(s) URL through which the Data Subject can grant in the Data Consent Service the consents requested by the Client |

**Error handling:**

| Error key                       | Error code and status   | Error description                                                                                                |
|---------------------------------|-------------------------|------------------------------------------------------------------------------------------------------------------|
| error.validation                | VALIDATION (400)        | General validation errors (mandatory fields not specified, registry code <>8 characters, non-numeric)            |
| error.http.404                  | HTTP_NOT_FOUND (404)    | No valid consents found (in status APPROVED)                                                                     |
| error.business.reg-code-invalid | REG_CODE_INVALID (400)  | Registry code does not match the standard                                                                        |

### 5.1.5 Consent validity query for the Client - client

This query allows the validity of a consent to be queried from the Data Consent Service JURNT. If multiple consents are queried, the response is returned separately for each consent in the same response message.

Used by: Client (data user)

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client

**Example query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client?consentReference=70c894ea-9bcd-4f7e-b77c-4fce0aa8dc88" 
```

**Request:** https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client?consentReference=70c894ea-9bcd-4f7e-b77c-4fce0aa8dc88

| Parameter        | Mandatory? | Data type | Description                                                                                                  |
|------------------|------------|-----------|--------------------------------------------------------------------------------------------------------------|
| consentReference | yes        | string    | JURNT consent reference – a unique code corresponding to the consent whose validity is to be validated       |

**Important!** Upon receiving the query, JURNT checks that the X-Road subsystem identifier of the X-Road-authenticated Client matches the one specified in the Purpose Declaration associated with the consent.

**Response:**

```
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "regCode": "12345678",
  "purposeDeclarationId": "ED_KAKS"
}
```

| Parameter            | Data type             | Description                                                                            |
|----------------------|-----------------------|----------------------------------------------------------------------------------------|
| consentReference     | string                | Consent reference – a unique code corresponding to the consent whose validity is validated. |
| consentExpiration    | timestamp (ISO 8601)  | Expiration date of the consent                                                          |
| regCode              | string                | Data Subject's registry code                                                            |
| purposeDeclarationId | string                | Identifier of the Purpose Declaration associated with the consent                       |

**Error handling:**

| Error key                                      | Error code and status                  | Error description                                                                                                                |
|------------------------------------------------|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| error.validation                               | VALIDATION (400)                       | General validation errors (mandatory fields not specified, registry code <>8 characters, non-numeric)                            |
| error.http.404                                 | HTTP_NOT_FOUND (404)                   | No valid consent exists for the combination of clientSubsystemIdentifier (Client X-Road subsystem) and consentReference          |
| error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500)  | The queried consent is not in status APPROVED                                                                                    |

### 5.1.6 Consent validity query for the Data Provider - *dataprovider*

This query allows the validity of a consent and the accompanying data to be queried from the Data Consent Service JURNT, so that the Data Provider can check the data transmission conditions.

Used by: Data Provider

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider

**Example query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6"
```

**Request:** https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider?consentReference= 91e9844d-3b5e-4df8-9254-42316b1607b6

| Parameter        | Mandatory? | Data type | Description                                                                                                  |
|------------------|------------|-----------|--------------------------------------------------------------------------------------------------------------|
| consentReference | yes        | string    | JURNT consent reference – a unique code corresponding to the consent whose validity is to be validated       |

**Important!** Upon receiving the query, JURNT checks that the X-Road subsystem identifier of the X-Road-authenticated Data Provider matches the one specified in the Service Declaration associated with the consent.

**Response:** (the Purpose Declaration associated with the consent is associated with Service Declaration ID 12342)

```
{
   "consentReference": "70c894ea-9bcd-4f7e-b77c-4fce0aa8dc88",
    "consentExpiration": "2026-04-06T23:59:59.999Z",
    "regCode": "11434598",
    "clientSubsystemIdentifier": "EE/COM/10004252/sebpank",
    "serviceDeclarationId": "12342"
}
```

| Parameter                 | Data type             | Description                                                                                                                                                                                                                                                |
|---------------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| regCode                   | string                | Data Subject's registry code. *Note:* The Data Provider must check that the X-Road-authenticated Client's data query contains the same registry code as specified in this parameter.                                                                       |
| clientSubsystemIdentifier | string                | The Client's X-Road subsystem identifier specified in the Purpose Declaration. *Note:* The Data Provider must check that the X-Road-authenticated Client subsystem sending the data query is the same as the one specified in this parameter.             |
| consentReference          | string                | JURNT consent reference – a unique code corresponding to the consent whose validity is validated                                                                                                                                                            |
| consentExpiration         | timestamp (ISO 8601)  | Expiration date of the consent                                                                                                                                                                                                                              |
| serviceDeclarationId      | string                | Identifier of the Service Declaration associated with the consent. *Note:* The Data Provider must check that the Protected Service through which the Client queries the data corresponds to the Service Declaration identifier specified in this parameter. |

**Error handling:**

| Error key                                      | Error code and status                  | Error description                                                                                                                |
|------------------------------------------------|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| error.validation                               | VALIDATION (400)                       | General validation errors (mandatory fields not specified, registry code <>8 characters, non-numeric)                            |
| error.http.404                                 | HTTP_NOT_FOUND (404)                   | No valid consent exists for the combination of dataProviderSubsystemIdentifier (Data Provider X-Road subsystem) and ConsentReference |
| error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500)  | The queried consent is not in status APPROVED                                                                                    |

### 5.1.7 Reported data transmission - reportDataTransmission

This query allows notifying the Data Consent Service JURNT that a transmission of personal data based on a consent has occurred from the Data Provider to the Client.

Used by: Data Provider

**Important!** This query is intended only for legal entities and cannot be used when requesting consents from natural persons.

**API URL for reporting a single data transmission:**

https:///r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consent

**API URL for reporting multiple data transmissions:**

https:///r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consents

**Example query command (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consent" \ 
-d "{ \
\"transmissionTimestamp\":\"2021-06-18T13:11:50.085Z\", \
\"consentReference\":\"226cd452-0459-404c-832d-4771bef14af3\"}" 
```

**Request:**

https:///r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consent

| Parameter             | Mandatory? | Data type | Description                                                                                       |
|-----------------------|------------|-----------|---------------------------------------------------------------------------------------------------|
| transmissionTimestamp | yes        | timestamp | The time at which the data transmission from the Data Provider to the Client occurred             |
| consentReference      | yes        | string    | Consent reference – a unique code corresponding to the consent whose validity is to be validated  |

**Important!** Upon receiving the query, the Data Consent Service checks that the X-Road subsystem identifier of the X-Road-authenticated Data Provider matches the one specified in the Service Declaration associated with the consent.

**Response:**

```
{  
  "response": "success"
}
```

| Parameter  | Data type | Description                                  |
|------------|-----------|----------------------------------------------|
| response   | -         | If the query succeeds, "success" is returned |

**Error handling:**

| Error key        | Error code and status | Error description                                                          |
|------------------|-----------------------|----------------------------------------------------------------------------|
| error.validation | VALIDATION (400)      | General validation errors (mandatory fields not specified)                 |
| error.http.404   | HTTP_NOT_FOUND (404)  | No match exists for the combination of ConsentReference and the X-Road client header |

# 6 Instructions for the interface testing of the Legal Entity Data Consent Service (JURNT) by the integrating party

The purpose of testing on the integrating party's side is to confirm that the integrating information system(s) is/are ready to exchange consent data with the Data Consent Service JURNT. The tests are described at the API-call level, which allows the integrating party to test either directly via the API (at an earlier development stage) or through their own user interface.

The tests cover consent-related functionality and are organised so that the main scenario tests are described first, followed by the error handling tests. Among the error handling tests, the more important ones have been chosen so that the integrating system can confirm that its error handling works. If desired, tests that are not commercially important may be skipped, or tests relevant to the integrator's own service specifics may be added.

A precondition for the tests is the existence of a Service Declaration (SD) (together with the information system) and the Purpose Declaration(s) (PD) that consume it in the Data Consent Service. Their entry is not currently within the scope of the tests, since it can be done via the Data Consent Service user interface.

Nonetheless, the data for the Information System, Service Declaration and Purpose Declarations used in the tests should be as realistic as possible, i.e. as close as possible to what they will be in the production environment. For an overview of the consent status logic, please see the status diagram in chapter 4.

The tests do not cover the consent Expired and Inapplicable scenarios, as these occur in the Data Consent Service automatically based on the expiration dates of the declarations and consents. If desired, these can be tested by entering suitable dates on the Service Declaration and Purpose Declaration (e.g. expiration tomorrow, maximum consent validity in the Service Declaration set to 1 day), granting consents, and monitoring the change of consent status when the deadline arrives.

## 6.1 Creating a consent URL and displaying consent request information (primary and recurring)

*Test case 1: Generating a consent URL and viewing consent info (1 Purpose Declaration)*

| N | Action                                                                                                                                                                       | Expected result                                                                                                            |
|---|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with correct input parameters (registry code, PD identifier and X-Road subsystem)     | Check that a consent URL is returned that can be used in the next step                                                     |
| 2 | Use the obtained consent reference to display the consents requested in the Data Consent Service                                                                              | Check that a consent in REQUESTED status is returned, corresponding to the input registry code, SD and PD data             |

*Test case 2: Generating a consent URL and viewing consent info (multiple Purpose Declarations – run this test only if there is a substantive need for such a scenario)*

| N | Action                                                                                                                                                                                                                                                | Expected result                                                                                                                |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with correct input parameters (registry code, more than 1 PD identifier and X-Road subsystem). The input PDs must be associated with the same subsystem.       | Check that a consent URL is returned that can be used in the next step                                                         |
| 2 | Use the obtained consent reference to display the consents requested in the Data Consent Service JURNT                                                                                                                                                | Check that consents in REQUESTED status are returned, corresponding to the input registry code, SD and PD data                 |

*Test case 3: Generating a consent URL when a consent request or consent (in various statuses) already exists for the given registry code, PD and X-Road subsystem*

Precondition: to test the logic of repeated/non-repeated consent requests, it is important that consents in various statuses are created in the information system, as the logic depends on them. You can test with one Purpose Declaration at a time or with several (depending on what seems substantively realistic as a use case).

| N | Action                                                                                                                                                                                                                                                                                                | Expected result                                                                       |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with correct input parameters (registry code, PD identifier and X-Road subsystem) when an APPROVED consent already exists for this combination. The input PDs must be associated with the same subsystem.    | Check that the error ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED is returned    |
| 2 | As step 1, but the existing consent is in REQUESTED status                                                                                                                                                                                                                                            | Check that a new URL is returned for the existing consent request                     |
| 3 | As step 1, but the existing consent is in DECLINED or EXPIRED status                                                                                                                                                                                                                                  | Check that a new consent is generated with a new URL                                  |

*Test case 4: Consent URL alternative scenarios*

| N | Action                                                                                                                                                                                                                                                    | Expected result                                                                                          |
|---|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with a registry code that does not meet validation rules (non-numeric, invalid checksum, shorter/longer than 8 characters); the other input parameters are correct | For an invalid checksum, check the error message with code ID_CODE_INVALID; for a format error, VALIDATION |
| 2 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with an unknown PD identifier; the other parameters are correct                                                                                                    | Check the error message with code PURPOSE_DECLARATIONS_NOT_FOUND                                         |
| 3 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with an X-Road subsystem that does not match the subsystem used in the PD; the other input parameters are correct                                                  | Check the error message with code PURPOSE_DECLARATIONS_NOT_FOUND                                         |

## 6.2 Querying Purpose Declarations (Client)

*Test case 5: Querying Purpose Declarations*

| N | Action                                                                                                                                                                              | Expected result                                                                                                  |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations for your X-Road client that has at least one valid Purpose Declaration       | Check that the returned Purpose Declarations are in VALID status and that they share the same subsystem identifier |
| 2 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations for an X-Road client that has no Purpose Declarations                        | Check that an empty *list* is returned                                                                            |

## 6.3 Initiating a consent request / requesting consent (Client)

*Test case 6: General checks on the list*

| N | Action                                                                                                                                                                                                  | Expected result                                                                       |
|---|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create with one registry code as input and one JURNT Purpose Declaration that does not match this subsystem          | Check that the error REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS is returned   |
| 2 | As step 1, but the registry codes are missing from the input or there are more than 100                                                                                                                  | Check that the validation error SIZE is returned                                       |
| 3 | As step 1, but the Purpose Declarations are missing from the input                                                                                                                                       | Check that the validation error NOT_BLANK is returned                                  |

*Test case 7: General checks on the list*

| N | Action                                                                                                                                                                                                        | Expected result                                                                                                                                                                                                                                                                                          |
|---|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create with one valid registry code that has at least one valid Purpose Declaration                                        | Check that the correct registry code, consent reference, status OK and no error codes are returned                                                                                                                                                                                                       |
| 2 | As step 1, but the input contains several valid registry codes that each have at least one valid Purpose Declaration                                                                                          | Check that all the correct registry codes, consent references, status OK and no error codes are returned                                                                                                                                                                                                 |
| 3 | As step 1, but the input contains several valid registry codes, some of which have at least one valid Purpose Declaration and some of which do not                                                            | Check that: <br> - all correct registry codes, consent references, status OK and no error codes are returned where there is a valid Purpose Declaration, <br> - the correct registry codes are returned with consent reference null, status ERROR and error code REG_CODE_INVALID where there is no valid Purpose Declaration |

## 6.4 Approving (*approve*) and declining/withdrawing (*decline*) consent

The test cases for approving and declining consent are not specified at the API-call level, as this functionality is implemented in the JURNT user interface in the eesti.ee Business Portal.

To confirm that the Client and the Data Consent Service can correctly exchange data, and to become familiar with how the Data Consent Service works, the following scenarios should be carried out at a minimum:

1\. Granting consents -- the user grants consents corresponding to the consent references requested in the tests described in chapter 6.1, and a check is made that the consents are valid

2\. Declining consents -- the user does not grant consents corresponding to the consent references requested in the tests described in chapter 6.1, and a check is made that the consents are again displayed via the same link

3\. Withdrawing consent -- consents granted during earlier tests are withdrawn, and a check is made that the consents are withdrawn.

## 6.5 Querying consent references

*Test case 8: Querying consent references*

| N | Action                                                                                                                                                                                                                                                | Expected result                                                                              |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status for a set of inputs (registry code, PD identifier, X-Road subsystem) for which valid consents were previously granted                                       | Check that only consent references in APPROVED status are returned together with the PD identifier |
| 2 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status when there are no valid consents for the given set of inputs but there are consents in other statuses (registry code, PD identifier, X-Road subsystem)      | Check that HTTP_NOT_FOUND is returned                                                        |

*Test case 9: Querying consent references – alternative scenarios*

| N | Action                                                                                                                                                  | Expected result                              |
|---|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| 1 | Run https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status when no valid consent exists for the set of input parameters | Check that HTTP_NOT_FOUND is returned        |

## 6.6 Validation of consents (Client and Data Provider)

*Test case 10: Validation of consents (for the Client and the Data Provider)*

Precondition: ideally, consents in different statuses should be created for consent validation (REQUESTED, APPROVED, DECLINED, EXPIRED, INAPPLICABLE), but for the initial test of the validation logic an APPROVED consent is sufficient, and for an alternative scenario test one of DECLINED, EXPIRED or INAPPLICABLE (invalid consents all behave the same way).

| N | Action                                                                                                                                                                                                                                                                                | Expected result                                                                                                                                       |
|---|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client with matching clientSubsystemIdentifier and consentReference when the corresponding consent is in APPROVED status                                    | Check that the data associated with the consent is returned (consentReference, consentExpiration, idCode, purposeDeclarationID)                       |
| 2 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client with matching clientSubsystemIdentifier and consentReference when the corresponding consent is in some status other than APPROVED                    | Check that no consent information is returned                                                                                                         |
| 3 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider with matching dataProviderSubsystemIdentifier and consentReference when the corresponding consent is in APPROVED status                        | Check that the data associated with the consent is returned (consentReference, ConsentExpiration, idCode, clientSubsystemIdentifier, serviceDeclarationID) |
| 4 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider with matching dataProviderSubsystemIdentifier and consentReference when the corresponding consent is in some status other than APPROVED        | Check that no consent information is returned                                                                                                         |

## 6.7 Reporting on successful data queries based on consents (Data Provider)

*Test case 11: Reporting on successful data queries based on consents (reported by the Data Provider)*

Precondition: there is a consent on which to report

| N | Action                                                                                                                                                                                                                                                  | Expected result                                                                                                  |
|---|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| 1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/reporting/legal-entity-consent with the consentReference of an existing consent, with the subsystem in the X-Road query matching the requester's subsystem.   | Check that a "success" response is returned, and you may verify the existence of the report record in the Data Consent Service |
| 2 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/ reporting/legal-entity-consent with a consentReference that does not exist, with the subsystem in the X-Road query matching the requester's subsystem.       | Check the handling of the error condition; no report record is created in the Data Consent Service              |

# 7 Instructions for using the Legal Entity Data Consent Service management interface

The Data Consent Service management interface is intended for the management of Purpose Declarations, Service Declarations, and the information systems (Data Providers) associated with them.

**General principles**

• Before submitting declarations, the necessary information systems must be added to the Data Consent Service (JURNT).

• First, the Service Declaration(s) are submitted, and then the Purpose Declaration(s).

• If a Service Declaration already exists for the required service, it does not need to be re-declared; the existing Service Declaration can be used.

• Multiple Service Declarations may be associated with a single information system. Multiple Purpose Declarations may be associated with a single Service Declaration.

• A separate Service Declaration must be declared for each different data set, even when the data comes from the same service.

• If the Client requires data described in several Service Declarations, several corresponding Purpose Declarations must be declared. A single Purpose Declaration may be associated with only one Service Declaration.

![Logical associations between information systems and declarations](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image4.png)

## 7.1 Roles in the management interface

| Role                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Visible views                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|-------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RIA administrator                                     | The RIA administrator adds/removes users (other RIA administrators and Information Systems administrators) and assigns permissions: each Information Systems administrator is assigned the registry code(s) under their responsibility, selected from a drop-down menu containing all the registry codes (member codes) available in the X-Road catalogue. <br> <br> The RIA administrator can also be an Information Systems administrator at the same time, by assigning themselves that role. In that case both the views visible to the RIA administrator and those visible to the Information Systems administrator must be available to them.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | •Management interface users management <br> •Consent integrity                                                                                                                                                                                                                                                                                                                                                                                              |
| Information Systems administrator (Data Provider representative) | The main user of the Data Consent Service management interface. <br> <br> The Information Systems administrator adds, modifies and removes information systems within the registry code(s) under their responsibility. When adding/modifying an information system, only the subsystems associated with the assigned registry codes are visible in the subsystem selection. <br> <br> Produces statistics within the registry code(s) under their responsibility. <br> <br> If the "RIA administrator statistics" option is checked, statistics can be produced across the entire system. This option is used by RIA administrators. <br> <br> Multiple Information Systems administrators may be responsible for a single information system. Each administrator can add/modify/remove the information systems under their responsibility. Every Information Systems administrator has access to all those information systems and declarations whose subsystem identifier's registry code (member code) matches the registry code associated with their user. If an Information Systems administrator's user account is removed, the information systems they entered remain. <br> <br> The Information Systems administrator submits and manages the Service Declarations associated with the information systems under their responsibility. <br> <br> The Information Systems administrator submits and manages the Purpose Declarations under their responsibility. Purpose Declarations can be associated only with Service Declarations under their responsibility. | •Information systems overview <br> •Adding an information system <br> •Editing an information system <br> •Service Declarations overview <br> •Submitting a Service Declaration <br> •Service Declaration detailed view <br> •Editing a Service Declaration <br> •Purpose Declarations overview <br> •Submitting a Purpose Declaration <br> •Purpose Declaration detailed view <br> •Editing a Purpose Declaration <br> •Statistics view |

## 7.2 Information systems management

The data on the information systems providing Protected Services is registered in the Data Consent Service management interface. This data is used to automatically populate the corresponding fields in Service Declarations, which simplifies the process of submitting declarations.

### 7.2.1 Views associated with the management of information systems

The following views in the Data Consent Service management interface are associated with adding and managing information systems:

**List of information systems**

An overview of all the added information systems the user has permission to manage. Allows the list of information systems to be sorted by the data in different columns.

The following actions can be performed for each declaration:

"Edit" - opens the detailed view of the information system to modify its data.

"Delete" - performs the logical deletion of the information system. Deletion is only possible when no valid Service Declarations are associated with the information system.

![List of information systems](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image5.jpg)

**Adding an information system**

A form for adding a new information system. The data to be entered is described in detail in section [7.2.2](#722-information-system-data).

![Adding an information system](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image6.jpg)

**Editing an information system**

A view that allows the information system's data to be modified. Modifying the information system's data does not affect the Service Declarations associated with it - the existing data remains there. New Service Declarations are created using the new data.

![Editing an information system](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image6.jpg)

### 7.2.2 Information system data

| Field name                                       | Description                                                                                                                                                                                            | Example value         | Editable? |
|--------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|-----------|
| Name of the information system                   | The name of the information system providing the Protected Services (data)                                                                                                                            | Environment information system | Yes       |
| Subsystem using the Data Consent Service          | The subsystem corresponding to the information system that will contact the Data Consent Service. <br> Only one subsystem can be selected per information system. <br> The relationship between information system and subsystem is "one to one". | EE/GOV/70009770/digi  | Yes       |
| Controller (owner)                                | The official name of the controller (owner) institution. <br> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el                                                                              | Statistics Estonia    | Yes       |
| Controller's registry code                        | The registry code of the controller (owner) institution.                                                                                                                                              | 70000332              | Yes       |
| Processor (optional field)                        | The official name of the processor institution. <br> https://akit.cyber.ee/term/12750 <br> If there is no processor, the field is left blank.                                                         | Data centre           | Yes       |
| Processor's registry code (optional field)        | The registry code of the authorised organisation. <br> If there is no processor, the field is left blank.                                                                                            | 70009770              | Yes       |

## 7.3 Service Declarations management

A Service Declaration (SD) describes the Protected Service provided by the information system (Data Provider), whose use requires the Data Subject's consent. Some Service Declaration data is displayed to the Data Subject when granting consent (see section [9](#9-consent-template)).

### 7.3.1 Views associated with the management of Service Declarations

The following views in the Data Consent Service management interface are associated with submitting and managing Service Declarations:

**List of Service Declarations**

An overview of all submitted Service Declarations. Allows the list of declarations to be sorted by the data in different columns, and filtered by information system and status.

The following actions can be performed for each declaration:

"View" - opens the declaration's detailed view with all its data

"Set as invalid" - changes the Service Declaration's status to INVALID and changes all the associated Purpose Declarations and the consents associated with them to invalid.

"Clone" - uses the declaration as a template for a new declaration - the form for submitting a new declaration is automatically populated with the cloned declaration's data for further editing.

![List of Service Declarations](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%208.png)

**Submitting a Service Declaration**

A form for submitting a new Service Declaration. The data to be entered is described in detail in section [7.3.2.](#732-service-declaration-data)

![Submitting a Service Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%209.png)

**Service Declaration detailed view**

Displays the data associated with the Service Declaration - both the main data and metadata. It also shows how many valid Purpose Declarations and valid consents are associated with this Service Declaration. Through the detailed view, you can request to modify the data of the valid declaration by pressing the "Edit declaration data" button.

![Service Declaration detailed view](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image10.png)

**Editing a Service Declaration**

A view that allows part of the data of a valid Service Declaration to be modified. The fields that can/cannot be modified are described in section [7.3.2.](#732-service-declaration-data)

![Editing a Service Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image11.png)

### 7.3.2 Service Declaration data

| Field name                                  | Description                                                                                                                                                                                                                                                                                                       | Example value                                                                                                                | Editable?         |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|-------------------|
| Service-providing information system        | A drop-down menu containing the names of information systems added to the Data Consent Service. One of the options is selected in the SD submission form - the information system that provides the data service being declared.                                                                                  | Environment information system                                                                                              | No                |
| Subsystem using the Data Consent Service     | The subsystem of the selected information system that will contact the Data Consent Service. The parameter used to check that the X-Road-authenticated Data Provider subsystem contacting the Data Consent Service is the correct party to make such a query. (The field is auto-filled when the service-providing information system is selected.) | EE/GOV/70009770/digi                                                                                                         | No                |
| Controller (owner)                           | The official name of the controller (owner) institution <br> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el (The field is auto-filled when the service-providing information system is selected.)                                                                                                       | Statistics Estonia                                                                                                            | No                |
| Controller's registry code                   | The registry code of the controller (owner) institution. (Auto-filled when the service-providing information system is selected.)                                                                                                                                                                                  | 70000332                                                                                                                     | No                |
| Processor                                    | The official name of the processor institution <br> https://akit.cyber.ee/term/12750 (Auto-filled when the service-providing information system is selected.)                                                                                                                                                       | Data centre                                                                                                                  | No                |
| Processor's registry code                    | The registry code of the authorised organisation. (Auto-filled when the service-providing information system is selected.)                                                                                                                                                                                         | 70009770                                                                                                                     | No                |
| Service Declaration identifier               | The human-readable unique identifier of the Service Declaration                                                                                                                                                                                                                                                   | hl7_seisundiandmed                                                                                                           | No                |
| Service Declaration name                     | A concise short name for the data set transmitted via the declared service (visible to the Data Subject as the title of the data set in the consent)                                                                                                                                                              | Environmental data                                                                                                            | Yes               |
| Service technical description                | Technical description of the service. Within the MVP scope - an informational field for internal use.                                                                                                                                                                                                              | X-Road service 'hl7' query, HL7 OID: 1.3.6.1.4.1.28284.6.1.1.35                                                              | Yes               |
| X-Road service used                          | The service being declared. Within the MVP scope - an informational field for internal use.                                                                                                                                                                                                                       | EE/GOV/70009770/digi/ESGPäring/v4                                                                                            | No                |
| Description of the service data set          | A human-readable description of the service. The data returned, the content of the service, etc. Displayed to the Data Subject when granting consent.                                                                                                                                                            | Data related to compiling ESG reports: <br> •average energy consumption, <br> •waste management volume, <br> •assessment of working conditions. | Yes               |
| Maximum consent validity period              | The maximum number of days the Data Subject's consent can be valid from the moment it is granted. The consent expiration date displayed to the Data Subject when granting consent is calculated based on this.                                                                                                   | 60                                                                                                                            | Yes               |
| Service Declaration expiration date          | The SD expiration date may be left undefined (in which case the SD is valid until it is manually marked invalid) or a specific date may be chosen (when the SD's validity period ends, the associated PDs also become invalid)                                                                                    | 15.05.2026                                                                                                                   | Yes               |
| Consent requires a signature                 | Whether consent must be digitally signed. <br>Once marked and the declaration is submitted, the marking can no longer be modified. <br>If the option is checked, the following options are displayed: <br> •Withdrawal of consent requires a signature; <br> •Generate JSON from consent metadata.              | Yes/no                                                                                                                       | No                |
| Withdrawal of consent requires a signature   | Whether the withdrawal of consent must be digitally signed. <br>Once marked and the declaration is submitted, the marking can no longer be modified.                                                                                                                                                              | Yes/no                                                                                                                       | No                |
| Service for legal entity data                | Whether the service is intended for the transmission of legal entity data.                                                                                                                                                                                                                                        | Yes/no                                                                                                                       | No                |
| Generate JSON from consent metadata          | Whether, upon signing the consent, a JSON file is generated from the consent metadata and placed in a DigiDoc container. <br>Once marked and the declaration is submitted, the marking can no longer be modified.                                                                                                  | Yes/no                                                                                                                       | No                |
| Consent extension allowed                    | Whether the extension of approved/signed consents is allowed <br> Note: For legal entity data, the value is "No" and is not editable.                                                                                                                                                                            | Yes/no                                                                                                                       | No                |
| Declaration submission date                  | The SD creation date. PDs always start to be valid from the submission date.                                                                                                                                                                                                                                      | 09.06.2023                                                                                                                   | No                |
| Declaration form filled in by                | The Information Systems administrator (their name and role in the system) who filled in the SD submission form.                                                                                                                                                                                                  | Mart Mets (Information Systems administrator)                                                                                | No                |
| Last modified                                | The date when the SD data was last modified                                                                                                                                                                                                                                                                       | 09.06.2023                                                                                                                   | No                |
| Last modified by                             | The Information Systems administrator (their name and role in the system) who last modified the SD data                                                                                                                                                                                                          | Mart Mets (Administrator)                                                                                                    | No                |
| Status                                       | SD status. Possible statuses: VALID and INVALID (see section 7.2.3.)                                                                                                                                                                                                                                              | valid                                                                                                                         | Only to invalid   |

### 7.3.3 Status diagram of the Service Declaration

![Service Declaration status diagram](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image12.png)

## 7.4 Purpose Declarations management

A Purpose Declaration (PD) describes the data recipient (Client) and the purpose of consuming the protected data service. Some Purpose Declaration data is displayed to the Data Subject when granting consent (see section [9](#9-consent-template)).

### 7.4.1 Views associated with the Purpose Declarations management

The following views in the Data Consent Service management interface are associated with submitting and managing Purpose Declarations:

**List of Purpose Declarations**

An overview of all submitted Purpose Declarations. Allows the list of declarations to be sorted by the data in different columns, filtered by status, and to search for declarations by the name of the declarant.

The following actions can be performed for each declaration:

• *"View"* - opens the declaration's detailed view with all its data

• *"Set as invalid"* - changes the Purpose Declaration's status to INVALID and also changes all the consents associated with that declaration to invalid.

• *"Clone"* - uses the declaration as a template for a new declaration - the form for submitting a new declaration is automatically populated with the cloned declaration's data for further editing.

![List of Purpose Declarations](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2013.png)

**Submitting a Purpose Declaration**

A form for submitting a new Purpose Declaration. The data to be entered is described in detail in section [7.4.2.](#742-purpose-declaration-data)

![Submitting a Purpose Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2014.png)

**Purpose Declaration detailed view**

Displays the data associated with the Purpose Declaration - both the main data and metadata. It also shows how many valid consents are associated with this Purpose Declaration. Through the detailed view, you can request to modify the data of the valid declaration by pressing the "Edit declaration data" button. By pressing "Download" you can download the Purpose Declaration data in CSV format.

![Purpose Declaration detailed view](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2015.png)

**Editing a Purpose Declaration**

A view that allows part of the data of a valid Purpose Declaration to be modified. The fields that can/cannot be modified are described in section [7.4.2.](#742-purpose-declaration-data)

![Editing a Purpose Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2016.png)

### 7.4.2 Purpose Declaration data

| Field name                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Example value                                                                                                                                                                                                                                                                                                                                                                | Editable?       |
|-------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| Data recipient name                                         | The official name of the company/institution (PD declarant) of the Client                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Aruanded AS                                                                                                                                                                                                                                                                                                                                                                  | No              |
| Data recipient registry code                                | The registry code of the company/institution (PD declarant) of the Client                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 87654321                                                                                                                                                                                                                                                                                                                                                                     | No              |
| Subsystem using the Data Consent Service                     | The Client's subsystem that will contact the Data Consent Service. The parameter used to check that the X-Road-authenticated Client subsystem contacting the Data Consent Service is the correct party to make such a query. The drop-down contains all subsystems from the X-Road catalogue and supports *autocomplete* search.                                                                                                                                                                                                                                       | EE/COM/87654321/digi                                                                                                                                                                                                                                                                                                                                                         | No              |
| Service provided by the data recipient                      | The commercial name of the Client or its business service. Provides the Data Subject with information about which specific business service/information system will use their personal data.                                                                                                                                                                                                                                                                                                                                                                            | Environment_1                                                                                                                                                                                                                                                                                                                                                                | No              |
| Service Declaration used                                    | The Service Declaration (information system name - SD identifier) by which the Protected Service providing the data needed to fulfil the purpose is declared. <br> <br> Selecting a Service Declaration (SD) is done in two steps: <br> 1) Selecting the information system (with which the SD is associated) - a drop-down menu containing the names of the information systems added through "Information systems management". <br> 2) Selecting the SD identifier - a drop-down menu containing the identifiers of valid Service Declarations associated with the information system selected in the previous step. <br> <br> Only one SD may be associated with a single PD. | Environment information system - KESKK_ARUANNE (service for legal entity data)                                                                                                                                                                                                                                                                                              | No              |
| Purpose Declaration identifier                              | The human-readable unique identifier of the Purpose Declaration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ARUANNE_KOOST                                                                                                                                                                                                                                                                                                                                                                | No              |
| Purpose Declaration name                                    | A human-readable short name for the purpose of data use being declared.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ESG report                                                                                                                                                                                                                                                                                                                                                                   | Yes             |
| Purpose of data use                                         | A description of the purpose for which the Data Subject's data is used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | If you allow the Environmental Indicators information system to transmit your company's data to the company Aruanded AS, this will allow it to provide you with the service of compiling an ESG report.<br> Aruanded AS uses the data received from the Environmental Indicators information system to assess your company's sustainability and, based on this, compiles the necessary ESG report. | Yes             |
| Data recipient's data protection terms                      | The data protection terms of the Client or its business service (to be added as a link)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | https://andmekaitsetingimused.ee                                                                                                                                                                                                                                                                                                                                            | Yes             |
| Purpose Declaration expiration date                         | The PD expiration date may be set to the same date as the SD expiration date (it can also be "undefined"), or a separate date may be chosen for the PD.                                                                                                                                                                                                                                                                                                                                                                                                                | undefined                                                                                                                                                                                                                                                                                                                                                                    | No              |
| Declaration submission date (set automatically)             | The PD creation date. The PD always starts to be valid from the submission date.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 09.06.2023                                                                                                                                                                                                                                                                                                                                                                   | No              |
| Declaration form filled in by (set automatically)           | The Information Systems administrator (their name and role in the system) who filled in the PD submission form.                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Mart Mets (Information Systems administrator)                                                                                                                                                                                                                                                                                                                                | No              |
| Last modified (set automatically)                           | The date when the PD data was last modified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 09.06.2023                                                                                                                                                                                                                                                                                                                                                                   | No              |
| Last modified by (set automatically)                        | The Information Systems administrator (their name and role in the system) who last modified the PD data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Mart Mets (Information Systems administrator)                                                                                                                                                                                                                                                                                                                                | No              |
| Status                                                      | PD status. Possible statuses: VALID and INVALID (see section 7.3.3.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | valid                                                                                                                                                                                                                                                                                                                                                                        | Only to invalid |

### 7.4.3 Status diagram of the Purpose Declaration

![Purpose Declaration status diagram](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image17.png)

# 8 Statistics

The Statistics menu is intended for producing statistics about the declarations in the management interface and the consents associated with them. Statistics can be produced by all Information Systems administrators within their administrative area, and by users with the "RIA administrator statistics" marking across the entire system.

To produce statistics, an information system and/or data recipient name must be selected:

• Information system -- the selection displays information systems within the institutions in the administrator's area of responsibility. If the user has the "RIA administrator statistics" marking, information systems across the entire system are displayed in the selection. 1-n values can be selected.

• Data recipient -- a search field for companies by the data recipient's name. The search can be performed for data recipients within the institutions in the administrator's area of responsibility. If the user has the "RIA administrator statistics" marking, data recipients across the entire system are searched. One value can be searched at a time.

## 8.1 Statistics output

In the statistics results table, statistics can be viewed according to the selected information system and/or data recipient. Allows the statistics data to be sorted by different columns.

![Statistics output](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2018.png)

## 8.2 Statistical data

| Field name                       | Description                                                                                                                                                                                                                                                                                              |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Information system/Service provider | The name of the information system that provides the declared service.                                                                                                                                                                                                                                |
| Data recipient                   | The name of the Client's (PD declarant) company                                                                                                                                                                                                                                                          |
| Valid Service Declarations       | The total number of valid Service Declarations.                                                                                                                                                                                                                                                          |
| Valid Purpose Declarations       | The total number of valid Service Declarations broken down by information system and by company.                                                                                                                                                                                                          |
| Valid consents                   | The total number of valid consents broken down by information system and by company                                                                                                                                                                                                                       |
| Validated consents               | The total number of validated (i.e. approved) consents broken down by information system and by company. <br> <br>The number of approved consents includes all consents that have been approved and whose status may have already changed. E.g. expired, withdrawn, etc. Does not include consents pending decision. |
| All consents                     | The total number of all consents broken down by information system and by company regardless of their status.                                                                                                                                                                                            |
| Total                            | The sum totals.                                                                                                                                                                                                                                                                                          |

# 9 Consent template

The following table describes the data that a consent contains.

| Data field                                                                          | Example                                                                                                                                                                                                                                                                                                          | Source                                                                                                                              |
|-------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Data Subject's name                                                                 | Finest AS                                                                                                                                                                                                                                                                                                        | consent                                                                                                                             |
| Data Subject's registry code                                                        | 10714404                                                                                                                                                                                                                                                                                                         | consent                                                                                                                             |
| Name of the Data Provider or information system (data transmitter)                  | Environment information system                                                                                                                                                                                                                                                                                   | Service Declaration                                                                                                                 |
| Name and registry code of the data controller (Data Provider or information system administrator) | Statistics Estonia (70000332)                                                                                                                                                                                                                                                                                    | Service Declaration                                                                                                                 |
| Name and registry code of the data processor                                        | Data centre (10000000)                                                                                                                                                                                                                                                                                           | Service Declaration                                                                                                                 |
| Data recipient                                                                      | Aruanded AS                                                                                                                                                                                                                                                                                                      | Purpose Declaration                                                                                                                 |
| Service provided by the data recipient (commercial name)                            | Environment_1                                                                                                                                                                                                                                                                                                    | Purpose Declaration                                                                                                                 |
| Data (description of the data set)                                                  | Data required for compiling ESG reports: <br> •average energy consumption, <br> •waste management volume, <br> •assessment of working conditions.                                                                                                                                                                | Service Declaration                                                                                                                 |
| Purpose of data use                                                                 | If you allow the Environment information system to transmit your company's data to the company Aruanded AS, this will allow it to provide you with the service of compiling an ESG report. <br> Aruanded AS uses the data received from the Environment information system to assess your company's sustainability and, based on this, compiles the necessary ESG report. | Purpose Declaration                                                                                                                 |
| Data recipient's data protection terms                                              | https://andmekaitsetingimused.ee                                                                                                                                                                                                                                                                                 | Purpose Declaration                                                                                                                 |
| Consent approver - person's name and personal identification code                   | Kairi Sarapuu (4712220278)                                                                                                                                                                                                                                                                                       | consent                                                                                                                             |
| Consent withdrawer - person's name and personal identification code                 | Kairi Sarapuu (4712220278)                                                                                                                                                                                                                                                                                       | consent                                                                                                                             |
| Consent validity                                                                    | from 23.12.2024 <br> until 20.02.2025                                                                                                                                                                                                                                                                            | consent (the validity period is calculated as: the date consent was granted + the maximum consent validity in days (from the Service Declaration)) |

# 10 Legal Entity Data Consent Service user interface

The user interface of the Legal Entity Data Consent Service JURNT, intended for regular users, is implemented as a separate web application that forms part of the eesti.ee Business Portal. The JURNT user interface is intended for the Representative(s) of legal-entity Data Subjects and Client representative(s), and consists of four parts: granting consents, managing consents, requesting consents, and an overview of data transmitted on the basis of consents. After logging in to eesti.ee as a representative of a legal entity, the user finds these under the Data Consent menu item, in the subpages "Pending consents", "All consents", "Requesting consents", and "Data transmitted". Whether a subpage is visible depends on the existence of the corresponding user role.

## 10.1 Approving consent

The Representative of a legal-entity Data Subject can review consent requests and grant the necessary consents:  
• via a unique link to which they are redirected from the Client,  
• or via a link sent by email as a notification,  
• or by entering, on the eesti.ee Business Portal, the JURNT subpage "Pending consents".

### 10.1.1 Client actions before redirection

Each time the Client wishes to redirect the Representative to grant consents, it must request a new link from the Data Consent Service JURNT with the set of required consent requests. The new link is requested using the **url** API service (see section [5.1.4](#514-consents-link-url-query---url)).

Before redirecting to the Data Consent Service, the Client must inform the Data Subject or the Representative about the need to grant consent(s), the conditions of data processing, and the upcoming redirection to the Data Consent Service. When the Client submits consent request(s) via JURNT, JURNT automatically sends the Data Subject an email notification through the eesti.ee national mailbox.

Sample text:

>   To use service X we need your consent at the eesti.ee/nousolek portal, in order to query the necessary data from information system Y.

>   If you allow information system Y to give us your company's data, we will be responsible for processing it in accordance with  
>   our **privacy terms (link)**.  
>   **Why we need this and why it is useful to you (link)**

>   I go to grant consent:

>   **[button]**

### 10.1.2 In the Legal Entity Data Consent Service

The Representative of a legal-entity Data Subject can review consent requests and grant the necessary consents after entering the eesti.ee portal and authenticating themselves via TARA using one of the offered login methods. 

![TARA](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2019.png)

After selecting the represented company, the user can open the Pending consents subpage under the Data Consent menu item, where the list view of pending consent requests targeted at them is displayed, with the first, most recent consent request open.

![Consent requests](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant1.png)

After reviewing the details of the consent request, the Representative can choose whether to allow or not allow the described data set to be transmitted with data concerning the legal entity they represent. If they allow, the status label and button turn green and the "Confirm" button becomes active. 
If the Representative does not allow the described data set to be transmitted, the status label and button turn red and the "Confirm" button becomes active.

![Allow](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant2.png)

PS! If the Data Provider has required a digital signature for granting consent in the Service Declaration, the consent must be digitally signed.

![Do not allow](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant3.png)

### 10.1.3 Client actions after redirection

After the Representative is redirected back, the Client queries the consent references from the Data Consent Service and validates them, in order to find out which consents were granted and are now valid. The **url** and **client** APIs are used (see sections [5.1.2](#512-initiating-a-consent-request--requesting-consent---create) and [5.1.3](#513-consent-references-query---status)).

Based on the response received, the Client displays a notification to the Representative. If all the necessary consents are valid, the Client may start querying data from the Data Provider and providing the service to the Data Subject or the Representative.

If some consents are missing, the Client requests a new link from the Data Consent Service (using the **url** API (see section [5.1.1](#511-purpose-declarations-list-query---purposedeclarations)) and redirects the Representative to grant the missing consents.

## 10.2 Consents management

The Representative of a legal-entity Data Subject finds the consent management options after logging in, under the Data Consent menu item, in the "All consents" subpage. As a representative of a legal entity, the user can see all the consents they have approved or withdrawn from as the Representative of the given Data Subject, both valid and invalid. This page does not display consent requests (status Pending decision), which can be seen in the "Pending consents" subpage.

Consents can be filtered by data recipient, data transmitter, data name, consent number and dates (Valid from, Valid until). The consent table is sortable by a single column. 

![My consents](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant4.png)

Clicking a row in the table opens the consent details view together with the "Withdraw consent" button for a valid consent. This button allows the consent to be withdrawn. A coloured line in front of the consent details indicates the status.

![Consent details and withdrawal](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant5.png)

If the Representative approved or signed the consent (including the withdrawal), the consent details show the name of the approver/signer.

### 10.2.1 Withdrawal of consent

The Representative of a legal-entity Data Subject can withdraw consent using the "Withdraw consent" button. Withdrawal is available for consents that are valid (status Approved). The user must confirm the withdrawal so that it does not happen by accident.

If the Data Provider has required digital signing for the withdrawal of consent through the Service Declaration, the withdrawal of consent must be signed digitally.

![Withdraw or extend](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant6.png)

## 10.3 Requesting consent

After logging in to the eesti.ee portal, the Representative of a legal-entity Client finds, under the Data Consent menu item, in the "Requesting consents" tab, the option to submit consent requests to potential service users. The list shows all consent requests submitted by the logged-in user, regardless of the consent status.

![View consents](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant7.png)

After using the "+ Create consent request" button, a pop-up window is displayed to the user for composing the consent request input data. A precondition for submitting a request is that the represented legal entity has a contract with some data provider (Data Provider) that has valid data service(s) (Purpose Declaration(s)) for that legal entity.

The user searches for the legal entity about whom data is to be obtained, selects the data provider, data service and the purpose of sharing data from drop-down menus, and submits the request.

![Submitting a request](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant8.png)

Once the user has submitted the consent request, the pop-up window closes and a new request is added to the consent requests list with the status "Pending decision". The consents management functionality also works on this subpage as described in the previous Consents management section.

### 10.3.1 Requesting consents via the Client Application

When the Client Application of the Client wishes to obtain consents from legal-entity Data Subjects to receive data from the Data Provider, it first queries valid Purpose Declarations using the **purposedeclarations** API service (see section [5.1.1](#511-purpose-declarations-list-query---purposedeclarations)).

To obtain the data corresponding to the selected Purpose Declaration from the Data Provider, consent requests are submitted to legal entities using the **create** API service (see section [5.1.2](#512-initiating-a-consent-request--requesting-consent---create)). Registry codes must be known to the Client Application in advance. Consent requests may be composed for 1 - 100 legal entities at a time.

The Client can obtain the consent references for valid consents using the **status** API service (see section [5.1.3](#513-consent-references-query---status)).

## 10.4 Data transmitted

The "Data transmitted" subpage provides an overview of which successful data queries have been made on the basis of the Data Subject's consents and allows the data transmissions concerning the legal entity they represent to be monitored.

![Data transmitted](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant9.png)

The view displays by default a list of the most recent data transmissions, according to the selected number under "Show at once". The user can specify a time period for which the transmitted data of interest is shown, or also search by keyword(s) across the three alphabetical content columns.
