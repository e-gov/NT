# Using and interfacing the RIA Legal Entity Data Consent Service

9 March 2026

Version 0.1

---

Version history

Date | Version | Description
--- | --- | ---
9 March 2026 | 0.1 | Document created

<!-- markdownlint-disable MD033 -->
# **Table of Contents**

- [1. Introduction](#introduction)
  - [1.1 Definitions](#definitions)
- [2. Prerequisites for using the Legal Entity Data Consent Service](#prerequisites-for-using-the-legal-entity-data-consent-service)
- [3. Description of key processes as use cases](#description-of-key-processes-as-use-cases)
  - [3.1 Use case 1: Submitting a consent request to Data Subject(s) by the Client](#use-case-1-submitting-a-consent-request-to-data-subjects-by-the-client)
  - [3.2 Use case 2: Data query and consent validation (Data Provider)](#use-case-2-data-query-and-consent-validation-data-provider)
- [4. Consent status diagram](#consent-status-diagram)
- [5. Interfacing with the Legal Entity Data Consent Service and the technical specifications of queries](#interfacing-with-the-legal-entity-data-consent-service-and-the-technical-specifications-of-queries)
  - [5.1 Technical specifications of the queries](#technical-specifications-of-the-queries-used-by-the-data-provider-and-the-client)
    - [5.1.1 purposedeclarations](#purposedeclarations)
    - [5.1.2 create](#create)
    - [5.1.3 status](#status)
    - [5.1.4 url](#url)
    - [5.1.5 client](#client)
    - [5.1.6 dataprovider](#dataprovider)
    - [5.1.7 reportDataTransmission](#reportdatatransmission)
    - [5.1.8 getConsentHealth](#getconsenthealth)
    - [5.1.9 getReportingHealth](#getreportinghealth)
- [6. Instructions for the interface testing of the Legal Entity Data Consent Service](#instructions-for-the-interface-testing-of-the-legal-entity-data-consent-service)
  - [6.1 Creating a consent URL](#creating-a-consent-url-and-displaying-information-on-consents-in-the-status-requested-primary-and-recurring)
  - [6.2 Querying Purpose Declarations (Client)](#querying-purpose-declarations-client)
  - [6.3 Initiating a consent request / requesting consent (Client)](#initiating-a-consent-request--requesting-consent-client)
  - [6.4 Approving and declining consent](#approving-and-declining-consent)
  - [6.5 Consent references query](#consent-references-query)
  - [6.6 Validation of consents (Client and Data Provider)](#validation-of-consents-client-and-data-provider)
  - [6.7 Reporting on successful data queries](#reporting-on-successful-data-queries-based-on-consents-data-provider)
- [7. Instructions for using the management interface of the Legal Entity Data Consent Service](#instructions-for-using-the-management-interface-of-the-legal-entity-data-consent-service)
  - [7.1 Roles](#roles)
  - [7.2 Information systems management](#information-systems-management)
    - [7.2.1 Views related to management](#views-associated-with-the-management-of-information-systems)
    - [7.2.2 Information system data](#information-system-data)
  - [7.3 Service Declarations management](#service-declarations-management)
    - [7.3.1 Views related to Service Declarations](#views-associated-with-the-management-of-service-declarations)
    - [7.3.2 Service Declaration data](#service-declaration-data)
    - [7.3.3 Status diagram of Service Declaration](#status-diagram-of-the-service-declaration)
  - [7.4 Purpose Declarations management](#purpose-declarations-management)
    - [7.4.1 Views related to Purpose Declarations](#views-associated-with-the-purpose-declarations-management)
    - [7.4.2 Purpose Declaration data](#purpose-declaration-data)
    - [7.4.3 Status diagram of Purpose Declaration](#status-diagram-of-the-purpose-declaration)
- [8. Statistics](#statistics)
  - [8.1 Statistics output](#statistics-output)
  - [8.2 Statistical data](#statistical-data)
- [9. Consent template](#consent-template)
- [10. User interface of the Legal Entity Data Consent Service](#user-interface-of-the-legal-entity-data-consent-service)
  - [10.1 Approving consent](#approving-consent)
    - [10.1.1 Before being redirected](#client-actions-before-redirection)
    - [10.1.2 In the Legal Entity Data Consent Service](#in-the-legal-entity-data-consent-service)
    - [10.1.3 After being redirected](#client-actions-after-redirection)
  - [10.2 Consents management](#consents-management)
    - [10.2.1 Withdrawal of consent](#withdrawal-of-consent)
  - [10.3 Requesting consent](#requesting-consent)
    - [10.3.1 Requesting consents via the Client Application](#requesting-consents-via-the-client-application)
  - [10.4 Data transmitted](#data-transmitted)

# Introduction

The aim of this document is to describe the main use cases of the RIA Legal Entity Data Consent Service (JURNT), the data exchange and testing principles, and the user interfaces.

The document is the basis for interfacing with and deploying the RIA Legal Entity Data Consent Service JURNT.

## Definitions

**Data Subject** -- a legal entity to which the data held in the Data Provider relates.

**Representative** -- the person who represents the Data Subject.

**Data Provider** -- the information system that holds the Data Subject's personal data.

**Client / Requesting Legal Entity** -- an information system that needs the data of the Data Subject from the Data Provider to provide a service to the Data Subject.

**Legal Entity Data Consent Service (JURNT)** -- the information system that is responsible for managing the consents of Data Subjects that are legal entities.

**Protected Service** -- an abstract Data Provider service that provides access to the data of the Data Subject and requires the consent of the Data Subject to be used.

**Service Declaration** -- a description of the Protected Service provided by one Data Provider and the data transmitted. Registered by the Data Provider in the Data Consent Service.

**Purpose Declaration** -- a description of the purpose for which the data is used. Within the MVP, it is registered by the Data Provider in the Data Consent Service and forms the basis for consents in the status 'requested'. The content of the Purpose Declaration is provided by the Client. If the Client needs data from multiple Protected Services (from one or different Data Providers) to achieve its purposes, multiple Purpose Declarations are registered -- separately for each service. In this case, the Client must also obtain multiple corresponding Data Subject consents.

**Consent** -- consent given to the Data Provider by the Data Subject, on the basis of which the Data Provider may transmit to the Client through Protected Services the data described in the consent for processing for the purpose described in the consent.

**Consent in the status 'requested' (Consent Request)** -- consent that is required by the Client to provide the service to the Data Subject, but has not yet been given by the Data Subject.

**Consent Reference** -- the unique consent code used to determine the validity of the consent.

**Consent Request** -- a request submitted to the Data Subject to obtain consent to transmit data concerning them.

**Requesting Legal Entity** -- a legal entity (Client) that submits the Consent Request to the Data Subject.

# Prerequisites for using the Legal Entity Data Consent Service

In order to enable the collection of consents from the Data Subject for the Client, the following steps must be taken by the Data Provider and the Client:

1. The Client consults the available Protected Services and datasets in the X-tee directory (<https://x-tee.ee/catalogue/ee-dev>) and contacts the Data Provider.

2. The Data Provider considers the request to use the Client's data and investigates the background and reliability of the Client. If the parties reach an agreement, they will enter into a contract.

3. In the event that the X-tee directory does not contain the dataset required by the Client, the Data Provider creates a new Protected Service that meets the Client's needs.

4. The Data Provider's representative -- the Information Systems Administrator -- adds to the Data Consent Service an information system that provides the requested Protected Service (if it was not added before) (see section [7.2.](#information-systems-management))

5. The Data Provider's representative -- the Information Systems Administrator -- adds to the Data Consent Service a Service Declaration describing the Protected Service (see section [7.3.](#service-declarations-management)). If a Service Declaration is already in place for the required service, there is no need to declare it again -- the existing Service Declaration can be used.

6. Based on the agreement with the Client, the Data Provider's representative -- the Information Systems Administrator -- adds to the Data Consent Service a Purpose Declaration describing the purpose for the use of the data (see section [7.4.](#purpose-declarations-management))

7. After the Purpose Declaration has been submitted, the Data Provider exports the data of the Purpose Declaration from the Data Consent Service and forwards it to the Client (for example, via email). Among this data, a unique identifier for the Purpose Declaration is transmitted, which is used by the Client to communicate with the Data Consent Service.

8. The Client interfaces with the Legal Entity Data Consent Service JURNT, enabling the Data Subject or the Representative to be directed to the service to provide the necessary consents.

# Description of key processes as use cases

The chapter contains two main use cases related to the Client Application and the Data Provider, which provide an overview of the context for using the APIs of the Legal Entity Data Consent Service.

## Use case 1: Submitting a consent request to Data Subject(s) by the Client

**Actors:** Client / Client Application, Legal Entity Data Consent Service JURNT

**Parties and their interests:**

- The Data Subject wishes to use a service provided by the Client whose operation requires the Data Subject's consent to the transmission and processing of their personal data.

- The Client wishes to obtain the Data Subject's consent to receive their data from the Data Provider(s) and to verify that all the consents required to provide the service are valid.

- The Legal Entity Data Consent Service JURNT wishes to allow the Client to submit consent requests to the Data Subject and to track its submitted requests and received consents.

**Preconditions:** The Client has the registry code of the Data Subject and the identifiers of the Purpose Declarations corresponding to its service. There may be more than one Data Subject at a time (up to 100).

**Postconditions:** The consent requests created by the Client are valid and are available as consent requests to the Data Subject(s) in the eesti.ee Business Portal for approval/rejection.

**Main scenario:**

1. The Client queries via the API the Purpose Declarations available for its use. The **purposedeclarations** query is used (see section [5.1.1.](#purposedeclarations)).

2. JURNT checks that the X-tee subsystem identifier of the X-tee-authenticated Client matches the one specified in the Purpose Declaration(s) and that the Purpose Declaration is intended for legal entities.

3. JURNT returns the valid Purpose Declarations (1 - n).

4. The Client submits a consent request to the legal entity / entities to obtain their consent to receive from the Data Provider the data corresponding to the selected Purpose Declaration (see section [5.1.2.](#create)).

5. JURNT validates whether the Purpose Declaration selected in the Client's request is permitted for the Client and valid.

6. JURNT validates whether the Data Subject(s) selected in the request already have a request initiated or a consent obtained.

7. As a response, JURNT returns a list of the legal entities to which the request was initiated. For each legal entity, the response contains the registry code and the consent reference / error code.

8. The Client queries valid consent references (see section [5.1.3.](#status)).

9. JURNT returns the valid consent reference(s) as a response.

**Sequence diagram of the main scenario:**

![Main scenario sequence diagram](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image1.png)

**Alternative scenarios and extensions:**

3a. No suitable valid Purpose Declarations were found.

- The response is an empty list.

4a. The Data Provider has not made any Purpose Declarations available to the Client, i.e. the list of Purpose Declarations is empty.

- The Client cannot compile the request and must order the relevant service from the Data Provider.

4b. The Client needs data from several Data Providers or from several data services of the same Data Provider.

- The Client submits a separate consent request for each data need.

## Use case 2: Data query and consent validation (Data Provider)

**Actors:** Data Provider, Legal Entity Data Consent Service JURNT, Client Application

**Parties and their interests:**

- The Client (Client Application) queries data from the Data Provider. The data query must contain the corresponding consent reference and the Data Subject's registry code. (This is not JURNT functionality.)

- The Data Provider wishes to confirm with the Data Consent Service that valid consent of the Data Subject exists for transmitting the requested data and that the data transmission conditions are correct.

- The Data Consent Service wishes to validate the validity of the required consent and to transmit to the Data Provider the data needed to check the data transmission conditions.

**Preconditions:** The Data Provider knows the identifiers of the Service Declarations associated with its information systems. The Data Provider has a mapping table by which it can check which Protected Service each Service Declaration corresponds to.

**Postconditions (in the case of valid consent):** The Data Provider transmits the data to the Client Application through the Protected Service (this is not part of JURNT). The Data Provider reports the successful data transmission to the Data Consent Service.

**Main scenario (assuming that the required consent is valid):**

1. The Client Application queries data from the Data Provider. The data query must contain the corresponding consent reference and the Data Subject's personal identification code.

2. The Data Provider sends the consent reference to the Legal Entity Data Consent Service JURNT for validation. JURNT validates the consent reference and returns to the Data Provider a response which, in addition to the consent reference, contains the consent expiration date, the Client subsystem identifier, the Data Subject's registry code, and the identifier of the Service Declaration associated with the consent. The **dataprovider** query is used in steps 2 and 3 (see section [5.1.6.](#dataprovider)).

3. The Data Provider verifies the following data transmission conditions:

- the Client subsystem identifier (in the X-tee query header) that sent the data query is the same as in the Data Consent Service response;

- the Data Subject's personal identification code contained in the Client's data query is the same as in the Data Consent Service response;

- the Protected Service through which the Client queries the data corresponds to the Service Declaration identifier contained in the Data Consent Service response.

4. If all the checks succeed, the Data Provider transmits the requested data to the Client. (This is not JURNT functionality.)

5. The Data Provider reports the successful data transmission. The **reportDataTransmission** query is used (see section [5.1.7.](#reportdatatransmission)).

**Sequence diagram of the main scenario:**

![Main scenario sequence diagram](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image2.png)

**Alternative scenarios:**

2a. No such consent reference exists in the Legal Entity Data Consent Service JURNT.

- Validation failed, JURNT responds to the Data Provider with an error message.

- The Data Provider responds to the Client with an error message, no data is transmitted and no data transmission is reported.

2b. The consent reference points to a consent that is not valid.

- Validation failed, JURNT responds to the Data Provider with an error message.

- The Data Provider responds to the Client with an error message, no data is transmitted and no data transmission is reported.

3a. At least one of the checks has failed.

- The Data Provider responds to the Client with an error message, no data is transmitted and no data transmission is reported.

# Consent status diagram

The following diagram describes the possible statuses of the JURNT consent and the transitions between them.

![Consent status diagram](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image3.png)

# Interfacing with the Legal Entity Data Consent Service and the technical specifications of queries

The Legal Entity Data Consent Service JURNT provides REST API queries over X-tee to legal entities, which can be used through their own Client Application or otherwise.

For all queries received by the Data Consent Service, it is verified that the subsystem authenticated in the X-tee accessing the Data Consent Service is the correct party to make such a query. The Data Consent Service only responds to a query if the requesting party (that is, the Data Provider or the Client) is associated with the consent being verified, either through a subsystem on the Purpose Declaration or a subsystem on the Service Declaration that is always associated with the Purpose Declaration.

**Types of data**

All string-type parameters are UTF-8 encoded characters.

All number-type parameters are a sequence of ASCII codes between 47 and 57 (digits 0–9).

All timestamp-type parameters are timestamps in the ISO 8601 format.

## Technical specifications of the queries used by the Data Provider and the Client

### *purposedeclarations*

The query can be submitted to ask the Data Consent Service for the list of the company's valid Purpose Declarations, which can be used to compose consent requests from legal entities.

Used by: Client

**IMPORTANT!** This query returns a result only for legal entities; it is not usable for Purpose Declarations that apply to requesting consents from natural persons.

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations

**Example of a query command (curl):**

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

Parameter | Type of data | Description
--- | --- | ---
purposeDeclarationBusinessIdentifier | array of string | Identifier of a valid legal entity Purpose Declaration (can be more than one). Only those that are valid are returned.

If no suitable Purpose Declaration is found, the response is an empty list.

**Error management:**

Error key | Error code and status | Error description
--- | --- | ---
errorCode | VALIDATION (400) | The query does not include an X-Road header, HTTP_BAD_REQUEST

### *create*

The query can be submitted to initiate a data consent request from one or more legal entities.

Used by: Client

**IMPORTANT!** This query is intended only for legal entities and cannot be used to request consents from natural persons.

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create

**Example of a query command (curl):**

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

**Query (Json):**

```
{
  "regCodes": [
    "10714404"
  ],
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R"
}
```

Parameter | Is it mandatory? | Type of data | Description
--- | --- | --- | ---
regCodes | yes | array of strings | Data Subject's registry code (can be more than one, maximum 100)
purposeDeclarationBusinessIdentifier | yes | string | Identifier of the legal entity Purpose Declaration

Upon receiving the query, JURNT performs checks at two levels: general checks and checks for each registry code.

General checks:

- the X-tee subsystem identifier of the X-tee-authenticated Client is the same as the one specified in the legal entity Purpose Declaration,

- the Purpose Declaration is valid,

- there are between 1 and 100 registry codes.

**Error management for general checks:**

Error key | Error code and status | Error description
--- | --- | ---
error.business.requested-consents-not-related-to-any-declarations | VALIDATION (404) | "REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS" -- no valid legal entity Purpose Declarations exist for the given X-tee subsystem
error.validation | VALIDATION (400) | Error message info. Filled only when an error is found. "SIZE" -- registry codes are missing or exceed 100, "NOT_BLANK" -- the Purpose Declaration or registry code field is missing.

Check for each registry code (after the general checks pass):

- a legal entity with the given registry code exists in the Business Register and is valid. To check this, JURNT makes a request to the public autocomplete service at https://avaandmed.ariregister.rik.ee/et/ariregistri-avaandmete-api/autocomplete-teenus.

A legal entity is deemed valid when its status='R' (entered in the register). Otherwise it is an error and JURNT returns the error "REG_CODE_INVALID" in the response for that registry code (see the "Response" table). Duplicate registry codes are allowed; they are reflected only once in the response.

**Response:** (array of objects) -- contains a block for each legal entity:

Parameter | Type of data | Description
--- | --- | ---
regCode | string | Data Subject's registry code
consentRequestReference | string | The generated consent request reference. This is different from the consent reference that is created upon approval. It allows the data to be reconciled before approval. Filled only when status=OK.
status | string | If the data processing succeeds, "OK" is returned as the status. If data processing fails, "ERROR" is returned together with the corresponding errorCode value.
errorCode | string | Error message info. Filled only when status=ERROR: "REG_CODE_INVALID" -- no legal entity with the given registry code exists according to the Business Register data, or the registry code does not match the standard, "DUPLICATE_CONSENTS_REQUESTED_IN_SUCCESSION" -- a consent request (status PENDING) for the given registry code and legal entity Purpose Declaration already exists, "ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED" -- a consent for the given registry code and legal entity Purpose Declaration already exists (status APPROVED).

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

### *status*

The query can be submitted to ask the Legal Entity Data Consent Service JURNT for the consent references of valid consent(s) for a specific Purpose Declaration. The consent statuses to be included in the list can be selected.

Used by: Client (data user)

**IMPORTANT!** This query is intended only for legal entities and cannot be used to request consents from natural persons.

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status?page=0&size=20

If *page* and *size* are not specified, *page*=0 and *size*=20 are used by default. *Size* cannot exceed 100; if a value above 100 is set, 100 is used internally. The response header also contains *X-Total-count*, indicating the total number of responses. Based on this, the integrator can decide whether to look at the next page.

**Example of a query command (curl):**

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

**Query (Json):** (the example asks for three statuses):

```
{
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R",
  "statuses": ["REJECTED", "APPROVED", "DECLINED"],
  "regCodes": ["10714404"]
}
```

Parameter | Is it mandatory? | Type of data | Description
--- | --- | --- | ---
purposeDeclarationBusinessIdentifier | yes | string | Identifier of the legal entity Purpose Declaration
regCodes | no | array of strings | Registry codes of legal-entity Data Subjects whose responses to the consent request(s) are sought. If the list is empty, data is sought for all legal-entity Data Subjects to which a request has been submitted for the given Purpose Declaration(s).
consentStatus | no | array of strings | Consent status(es) used to filter the consents to look up.

Upon receiving the query, JURNT performs a general check: whether the X-tee subsystem identifier of the X-tee-authenticated Client matches the one specified in the legal entity Purpose Declaration.

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

Parameter | Type of data | Description
--- | --- | ---
regCode | string | Data Subject's registry code
consentStatus | string | Status of the corresponding consent
consentReference | string | Consent Reference of a valid consent -- a unique code used to determine the validity of the consent. If the consent has never been approved, this is null.
consentRequestReference | string | Consent request reference -- a unique code generated when the consent request is created. Its purpose is to enable the integrator to reconcile which status the consent is in before the consent becomes valid.

**Error management:**

Error key | Error code and status | Error description
--- | --- | ---
error.validation | VALIDATION (400) | Error info. Filled only when the input format is invalid and the server cannot read it.
error.business.requested-consents-not-related-to-any-declarations | VALIDATION (404) | "REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS" -- no valid legal entity Purpose Declarations exist for the given X-tee subsystem

### *url*

The query can be submitted to ask the Legal Entity Data Consent Service JURNT for the link (URL) through which the Data Subject can be directed to view consent requests and provide consents.

Used by: Client (data user)

**IMPORTANT!** Do not use the same link more than once to redirect the Data Subject, as the old link may display incomplete data. When redirecting a Data Subject, <ins>always</ins> request a new link using the **url** query.

Before generating the link, JURNT checks that the legal entity with the registry code contained in the request exists in the Business Register and is valid. To check this, JURNT makes a request to the public autocomplete service at https://avaandmed.ariregister.rik.ee/et/ariregistri-avaandmete-api/autocomplete-teenus. A legal entity is deemed valid when its status='R' (entered in the register). Otherwise it is an error and JURNT returns the error "REG_CODE_INVALID" in the response for that registry code.

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url

**Example of a query command (curl):**

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

**Query (Json):**

```
{
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R",
  "statuses": ["REJECTED", "APPROVED", "DECLINED"],
  "regCodes": ["10714404"]
}
```

Parameter | Is it mandatory? | Type of data | Description
--- | --- | --- | ---
purposeDeclarationBusinessIdentifier | yes | string | Identifier of the legal entity Purpose Declaration
regCode | yes | string | Registry code of the legal-entity Data Subject
callback | yes | string | Client redirecting URL

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Client's X-tee subsystem authenticated in the X-tee is the same as specified in the Purpose Declaration.

**Response:**

Parameter | Type of data | Description
--- | --- | ---
consentGroupReference | string | Consent request reference -- a unique code used to distinguish consent requests
url | string | The consent(s) URL through which the Data Subject can provide the consents requested by the Client in the Data Consent Service

**Error management:**

Error key | Error code and status | Error description
--- | --- | ---
error.validation | VALIDATION (400) | Generic validation errors (mandatory fields not specified, registry code \<>&nbsp;8 characters, non-numeric)
error.http.404 | HTTP_NOT_FOUND (404) | No valid consents found (with the status APPROVED)
error.business.reg-code-invalid | REG_CODE_INVALID (400) | Registry code does not comply with the standard

### *client*

The query can be submitted to ask the Legal Entity Data Consent Service JURNT about the validity of the consent. If multiple consents are queried, the response is returned separately for each consent in the same response message.

Used by: Client (data user)

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client

**Example of a query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client?consentReference=70c894ea-9bcd-4f7e-b77c-4fce0aa8dc88" 
```

**Query:** https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client?consentReference=70c894ea-9bcd-4f7e-b77c-4fce0aa8dc88

Parameter | Is it mandatory? | Type of data | Description
--- | --- | --- | ---
consentReference | yes | string | JURNT Consent Reference -- a unique code corresponding to the consent the validity of which is to be determined

**Important!** Upon receipt of the query, JURNT verifies that the identifier of the Client's X-tee subsystem authenticated in the X-tee is the same as specified in the Purpose Declaration associated with the consent.

**Response:**

```
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "regCode": "12345678",
  "purposeDeclarationId": "ED_KAKS"
}
```

Parameter | Type of data | Description
--- | --- | ---
consentReference | string | Consent Reference -- a unique code corresponding to the consent the validity of which is to be determined.
consentExpiration | timestamp (ISO 8601) | Expiration date of the consent
regCode | string | Data Subject's registry code
purposeDeclarationId | string | Identifier of the Purpose Declaration associated with the consent

**Error management:**

Error key | Error code and status | Error description
--- | --- | ---
error.validation | VALIDATION (400) | Generic validation errors (mandatory fields not specified, registry code \<>&nbsp;8 characters, non-numeric)
error.http.404 | HTTP_NOT_FOUND (404) | No valid consent exists for the combination of clientSubsystemIdentifier (Client X-tee subsystem) and consentReference
error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | The queried consent is not with the status APPROVED

### *dataprovider*

The query can be submitted to ask the Legal Entity Data Consent Service JURNT about the validity of the consent and the accompanying data, so that the Data Provider can check the data transmission conditions.

Used by: Data Provider

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider

**Example of a query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6"
```

**Query:** https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider?consentReference= 91e9844d-3b5e-4df8-9254-42316b1607b6

Parameter | Is it mandatory? | Type of data | Description
--- | --- | --- | ---
consentReference | yes | string | JURNT Consent Reference -- a unique code corresponding to the consent the validity of which is to be determined

**Important!** Upon receipt of the query, JURNT verifies that the identifier of the Data Provider's X-tee subsystem authenticated in the X-tee is the same as specified in the Service Declaration associated with the consent.

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

Parameter | Type of data | Description
--- | --- | ---
regCode | string | Data Subject's registry code. *Note:* The Data Provider must verify that the X-tee-authenticated Client's data query contains the same registry code as specified in this parameter.
clientSubsystemIdentifier | string | The Client's X-tee subsystem identifier specified in the Purpose Declaration. *Note:* The Data Provider must verify that the X-tee-authenticated Client subsystem sending the data query is the same as the one specified in this parameter.
consentReference | string | JURNT Consent Reference -- a unique code corresponding to the consent the validity of which is to be determined
consentExpiration | timestamp (ISO 8601) | Expiration date of the consent
serviceDeclarationId | string | Identifier of the Service Declaration associated with the consent. *Note:* The Data Provider must verify that the Protected Service through which the Client queries the data corresponds to the Service Declaration identifier specified in this parameter.

**Error management:**

Error key | Error code and status | Error description
--- | --- | ---
error.validation | VALIDATION (400) | Generic validation errors (mandatory fields not specified, registry code \<>&nbsp;8 characters, non-numeric)
error.http.404 | HTTP_NOT_FOUND (404) | No valid consent exists for the combination of dataProviderSubsystemIdentifier (Data Provider X-tee subsystem) and ConsentReference
error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | The queried consent is not with the status APPROVED

### *reportDataTransmission*

The query can be submitted to notify the Legal Entity Data Consent Service JURNT that a transmission of personal data based on a consent has occurred from the Data Provider to the Client.

Used by: Data Provider

**Important!** This query is intended only for legal entities and cannot be used when requesting consents from natural persons.

**API URL for reporting a single data transmission:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consent

**API URL for reporting multiple data transmissions:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consents

**Example of a query command (curl):**

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

**Query:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consent

Parameter | Is it mandatory? | Type of data | Description
--- | --- | --- | ---
transmissionTimestamp | yes | timestamp | The time at which the data transmission from the Data Provider to the Client occurred
consentReference | yes | string | Consent Reference -- a unique code corresponding to the consent the validity of which is to be determined

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Data Provider's X-tee subsystem authenticated in the X-tee is the same as specified in the Service Declaration associated with the consent.

**Response:**

```
{  
  "response": "success"
}
```

Parameter | Type of data | Description
--- | --- | ---
response | - | If the query succeeds, "success" is returned

**Error management:**

Error key | Error code and status | Error description
--- | --- | ---
error.validation | VALIDATION (400) | Generic validation errors (mandatory fields not specified)
error.http.404 | HTTP_NOT_FOUND (404) | No match exists for the combination of ConsentReference and the X-tee client header

### getConsentHealth

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

Parameter | Type of data | Description
--- | --- | ---
status | string | Service health status. "UP" -- the service is available.

**Error management:**

Error key | Error code and status | Error description
--- | --- | ---
error.validation | VALIDATION (400) | Generic validation error messages (mandatory fields not specified)

If the service is unreachable, no response is returned (the security server returns a network or connection error).


### getReportingHealth

The query can be submitted to check the health status of the Data Consent Service reporting service.

Used by: Data Provider

**API URL:**

https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/health

**Example of a query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<security-server-address>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/health"
```

**Response:**

```
{
  "status": "UP"
}
```

Parameter | Type of data | Description
--- | --- | ---
status | string | Service health status. "UP" -- the service is available.

**Error management:**

Error key | Error code and status | Error description
--- | --- | ---
error.validation | VALIDATION (400) | Generic validation error messages (mandatory fields not specified)

If the service is unreachable, no response is returned (the security server returns a network or connection error).


# Instructions for the interface testing of the Legal Entity Data Consent Service

The purpose of testing on the integrating party's side is to confirm that the integrating information system(s) is/are ready to exchange consent data with the Legal Entity Data Consent Service JURNT. The tests are described at the API-call level, which allows the integrating party to test either directly via the API (at an earlier development stage) or through their own user interface.

The tests cover consent-related functionality and are organised so that the main scenario tests are described first, followed by the error handling tests. Among the error handling tests, the more important ones have been chosen so that the integrating system can confirm that its error handling works. If desired, tests that are not commercially important may be skipped, or tests relevant to the integrator's own service specifics may be added.

A precondition for the tests is the existence of a Service Declaration (SD) (together with the information system) and the Purpose Declaration(s) (PD) that consume it in the Data Consent Service. Their entry is not currently within the scope of the tests, since it can be done via the Data Consent Service user interface.

Nonetheless, the data for the Information System, Service Declaration and Purpose Declarations used in the tests should be as realistic as possible, i.e. as close as possible to what they will be in the production environment. For an overview of the consent status logic, please see the status diagram in chapter [4](#consent-status-diagram).

The tests do not cover the consent 'expired' and 'inapplicable' scenarios, as these occur in the Data Consent Service automatically based on the expiration dates of the declarations and consents. If desired, these can be tested by entering suitable dates on the Service Declaration and Purpose Declaration (e.g. expiration tomorrow, maximum consent validity in the Service Declaration set to 1 day), granting consents, and monitoring the change of consent status when the deadline arrives.

## Creating a consent URL and displaying information on consents in the status 'requested' (primary and recurring)

*Test case 1: Generating a consent URL and viewing consent info (1 Purpose Declaration)*

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with correct input parameters (registry code, PD identifier and X-tee subsystem) | Check that a consent URL is returned that can be used in the next step
2 | Use the obtained consent reference to display the consents requested in the Data Consent Service | Check that a consent in REQUESTED status is returned, corresponding to the input registry code, SD and PD data

*Test case 2: Generating a consent URL and viewing consent info (multiple Purpose Declarations -- run this test only if there is a substantive need for such a scenario)*

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with correct input parameters (registry code, more than 1 PD identifier and X-tee subsystem). The input PDs must be associated with the same subsystem. | Check that a consent URL is returned that can be used in the next step
2 | Use the obtained consent reference to display the consents requested in the Legal Entity Data Consent Service JURNT | Check that consents in REQUESTED status are returned, corresponding to the input registry code, SD and PD data

*Test case 3: Generating a consent URL when a consent request or consent (in various statuses) already exists for the given registry code, PD and X-tee subsystem*

Precondition: to test the logic of repeated/non-repeated consent requests, it is important that consents in various statuses are created in the information system, as the logic depends on them. You can test with one Purpose Declaration at a time or with several (depending on what seems substantively realistic as a use case).

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with correct input parameters (registry code, PD identifier and X-tee subsystem) when an APPROVED consent already exists for this combination. The input PDs must be associated with the same subsystem. | Check that the error ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED is returned
2 | As step 1, but the existing consent is in REQUESTED status | Check that a new URL is returned for the existing consent request
3 | As step 1, but the existing consent is in DECLINED or EXPIRED status | Check that a new consent is generated with a new URL

*Test case 4: Consent URL alternative scenarios*

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with a registry code that does not meet validation rules (non-numeric, invalid checksum, shorter/longer than 8 characters); the other input parameters are correct | For an invalid checksum, check the error message with code ID_CODE_INVALID; for a format error, VALIDATION
2 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with an unknown PD identifier; the other parameters are correct | Check the error message with code PURPOSE_DECLARATIONS_NOT_FOUND
3 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url with an X-tee subsystem that does not match the subsystem used in the PD; the other input parameters are correct | Check the error message with code PURPOSE_DECLARATIONS_NOT_FOUND

## Querying Purpose Declarations (Client)

*Test case 5: Querying Purpose Declarations*

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations for your X-tee client that has at least one valid Purpose Declaration | Check that the returned Purpose Declarations are in VALID status and that they share the same subsystem identifier
2 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations for an X-tee client that has no Purpose Declarations | Check that an empty *list* is returned

## Initiating a consent request / requesting consent (Client)

*Test case 6: General checks on the list*

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create with one registry code as input and one JURNT Purpose Declaration that does not match this subsystem | Check that the error REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS is returned
2 | As step 1, but the registry codes are missing from the input or there are more than 100 | Check that the validation error SIZE is returned
3 | As step 1, but the Purpose Declarations are missing from the input | Check that the validation error NOT_BLANK is returned

*Test case 7: General checks on the list*

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create with one valid registry code that has at least one valid Purpose Declaration | Check that the correct registry code, consent reference, status OK and no error codes are returned
2 | As step 1, but the input contains several valid registry codes that each have at least one valid Purpose Declaration | Check that all the correct registry codes, consent references, status OK and no error codes are returned
3 | As step 1, but the input contains several valid registry codes, some of which have at least one valid Purpose Declaration and some of which do not | Check that: <br /> - all correct registry codes, consent references, status OK and no error codes are returned where there is a valid Purpose Declaration, <br /> - the correct registry codes are returned with consent reference null, status ERROR and error code REG_CODE_INVALID where there is no valid Purpose Declaration

## Approving and declining consent

The test cases for approving and declining consent are not specified at the API-call level, as this functionality is implemented in the JURNT user interface in the eesti.ee Business Portal.

To confirm that the Client and the Data Consent Service can correctly exchange data, and to become familiar with how the Data Consent Service works, the following scenarios should be carried out at a minimum:

1. Granting consents -- the user grants consents corresponding to the consent references requested in the tests described in chapter 6.1, and a check is made that the consents are valid

2. Declining consents -- the user does not grant consents corresponding to the consent references requested in the tests described in chapter 6.1, and a check is made that the consents are again displayed via the same link

3. Withdrawing consent -- consents granted during earlier tests are withdrawn, and a check is made that the consents are withdrawn.

## Consent references query

*Test case 8: Querying consent references*

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status for a set of inputs (registry code, PD identifier, X-tee subsystem) for which valid consents were previously granted | Check that only consent references in APPROVED status are returned together with the PD identifier
2 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status when there are no valid consents for the given set of inputs but there are consents in other statuses (registry code, PD identifier, X-tee subsystem) | Check that HTTP_NOT_FOUND is returned

*Test case 9: Querying consent references -- alternative scenarios*

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status when no valid consent exists for the set of input parameters | Check that HTTP_NOT_FOUND is returned

## Validation of consents (Client and Data Provider)

*Test case 10: Validation of consents (for the Client and the Data Provider)*

Precondition: ideally, consents in different statuses should be created for consent validation (REQUESTED, APPROVED, DECLINED, EXPIRED, INAPPLICABLE), but for the initial test of the validation logic an APPROVED consent is sufficient, and for an alternative scenario test one of DECLINED, EXPIRED or INAPPLICABLE (invalid consents all behave the same way).

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client with matching clientSubsystemIdentifier and consentReference when the corresponding consent is in APPROVED status | Check that the data associated with the consent is returned (consentReference, consentExpiration, idCode, purposeDeclarationID)
2 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client with matching clientSubsystemIdentifier and consentReference when the corresponding consent is in some status other than APPROVED | Check that no consent information is returned
3 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider with matching dataProviderSubsystemIdentifier and consentReference when the corresponding consent is in APPROVED status | Check that the data associated with the consent is returned (consentReference, ConsentExpiration, idCode, clientSubsystemIdentifier, serviceDeclarationID)
4 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider with matching dataProviderSubsystemIdentifier and consentReference when the corresponding consent is in some status other than APPROVED | Check that no consent information is returned

## Reporting on successful data queries based on consents (Data Provider)

*Test case 11: Reporting on successful data queries based on consents (reported by the Data Provider)*

Precondition: there is a consent on which to report

N | Action | Expected result
--- | --- | ---
1 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/reporting/legal-entity-consent with the consentReference of an existing consent, with the subsystem in the X-tee query matching the requester's subsystem. | Check that a "success" response is returned, and you may verify the existence of the report record in the Data Consent Service
2 | Run https://\<security-server-address\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/reporting/legal-entity-consent with a consentReference that does not exist, with the subsystem in the X-tee query matching the requester's subsystem. | Check the handling of the error condition; no report record is created in the Data Consent Service

# Instructions for using the management interface of the Legal Entity Data Consent Service

The Data Consent Service management interface is designed for the management of Purpose Declarations, Service Declarations, and the related information systems (Data Providers).

**General principles**

- Before declarations can be submitted, the necessary information systems must be included in the Data Consent Service (JURNT).

- First, a Service Declaration is submitted, followed by a Purpose Declaration.

- If a Service Declaration is already in place for the required service, there is no need to declare it again -- the existing Service Declaration can be used.

- Several Service Declarations may be associated with one information system. Several Purpose Declarations may be associated with one Service Declaration.

- For each different set of data, a separate Service Declaration has to be declared, even if the data comes from the same service.

- In the case where the Client requires the data described in more than one Service Declaration, several corresponding Purpose Declarations must be declared. A single Purpose Declaration may be associated with only one Service Declaration.

![Logical associations between information systems and declarations](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image4.png)

## Roles

Role | Description | What views are seen
--- | --- | ---
RIA administrator | The RIA administrator adds/removes users (other RIA administrators and information system administrators) and assigns permissions: each information system administrator is assigned, under their responsibility, a registry code (or multiple registry codes), which is selected from a drop-down menu with all the registry codes (member code) obtained from the X-tee directory. <br /> <br /> The RIA administrator can also be an information systems administrator, if they assign such a role for themselves. In this case, they must have access to views visible to both the RIA administrator and the information systems administrator. | •	Administration of the management interface users <br /> •	Integrity of the consents
Information systems administrator (Data Provider's representative) | The primary user of the Data Consent Service management interface. <br /> <br /> The information systems administrator adds, modifies, and deletes information systems within the scope of the registry code(s) under their responsibility. When adding/changing an information system, they will only see the subsystems in the subsystem selection that are associated with the registry codes assigned to them. <br /> <br /> Keeps statistics within the scope of the registry code(s) under their responsibility. <br /> <br /> If the 'RIA administrator statistics' option is ticked, statistics can be produced for the entire information system. This option is used by RIA administrators. <br /> <br /> Several information system administrators can be responsible for one information system. Each administrator can add/modify/delete the information systems under their responsibility. Each information system administrator has access to all those information systems and declarations for which the registry code in the subsystem identifier = the member code associated with their user. If an information system administrator user account is deleted, the information systems entered by them remain. <br /> <br /> The information system administrator submits and manages the Service Declarations associated with the information systems under their responsibility. <br /> <br /> The information system administrator submits and manages the Purpose Declarations under their responsibility. The information system administrator is able to associate Purpose Declarations only with Service Declarations under their responsibility. | •	Summary view of information systems <br /> •	Adding an information system <br /> •	Modifying an information system <br /> •	Summary view of Service Declarations <br /> •	Submitting a Service Declaration <br /> •	Detailed view of a Service Declaration <br /> •	Modifying a Service Declaration <br /> •	Summary view of Purpose Declarations <br /> •	Submitting a Purpose Declaration <br /> •	Detailed view of a Purpose Declaration <br /> •	Modifying a Purpose Declaration <br /> •	Statistics view

## Information systems management

The management interface of the Data Consent Service registers the data of information systems providing Protected Services. This data is automatically entered into the corresponding fields in the Service Declarations, simplifying the declaration process.

### Views associated with the management of information systems

The following views are associated with the inclusion and management of information systems in the Data Consent Service management interface:

**List of information systems**

An overview of all added information systems that the user has the right to manage. It allows the list of information systems to be sorted by the data in the different columns.

The following actions can be performed on each declaration:

'Edit' -- open the information system detailed view and edit the information system data.

'Delete' -- perform a logical deletion of the information system. The deletion is only possible if there are no valid Service Declarations associated with the information system.

![List of information systems](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image5.jpg)

**Adding an information system**

The form for adding a new information system. The data to be entered is described in detail in section [7.2.2](#information-system-data).

![Adding an information system](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image6.jpg)

**Modifying an information system**

A view that allows you to modify the data of the information system. Changing the data of the information system does not affect the associated Service Declarations -- the data will remain as it is. New Service Declarations will be created using the new data.

![Modifying an information system](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image6.jpg)

### Information system data

Field name | Description | Example value | Can it be changed?
--- | --- | --- | ---
Name of the information system | Name of the information system providing the Protected Services (data). | Environment information system | Yes
Subsystem using the Data Consent Service | The subsystem corresponding to the information system that will access the Data Consent Service. <br /> Only one subsystem can be selected for each information system. <br /> There is a 'one to one' relationship between the information system and the subsystem. | EE/GOV/70009770/digi | Yes
Data controller (owner) | Official name of the data controller's (owner's) organisation. <br /> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el | Statistics Estonia | Yes
Registry code of the data controller | Registry code of the data controller's (owner's) organisation. | 70000332 | Yes
Data processor (optional field) | Official name of the data processor's organisation. <br /> https://akit.cyber.ee/term/12750 <br /> If there is no data processor, the field is left blank. | Data centre | Yes
Registry code of the data processor (optional field) | Registry code of the data processor's organisation. <br /> If there is no data processor, the field is left blank. | 70009770 | Yes

## Service Declarations management

A Service Declaration (SD) describes a Protected Service provided by an information system (the Data Provider), the use of which requires the Data Subject's consent. Some of the data in the Service Declaration is displayed to the Data Subject when consent is given (see section [9](#consent-template)).

### Views associated with the management of Service Declarations

The following views are associated with the submission and management of Service Declarations in the Data Consent Service management interface:

**List of Service Declarations**

Overview of all submitted Service Declarations. It allows the list of declarations to be sorted by the data in the different columns and filtered by information systems and statuses.

The following actions can be performed on each declaration:

'View' -- open a detailed view of the declaration with all its data.

'Change to invalid' -- change the status of the Service Declaration to INVALID, and make all associated Purpose Declarations and associated consents invalid.

'Clone' -- use the declaration as a template for a new declaration -- the new declaration submission form will be automatically filled with the data of the cloned declaration for further editing.

![List of Service Declarations](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%208.png)

**Submitting a Service Declaration**

The form for submitting a new Service Declaration. The data to be entered is described in detail in section [7.3.2.](#service-declaration-data)

![Submission of a Service Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%209.png)

**Detailed view of a Service Declaration**

It displays the data associated with the Service Declaration -- both basic and metadata. It also displays the number of valid Purpose Declarations and the number of valid consents associated with a given Service Declaration. In the detailed view, a request can be made to modify the data of a valid declaration by clicking on the 'Modify declaration data' button.

![Detailed view of a Service Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image10.png)

**Modifying a Service Declaration**

A view that allows to partially modify the data of a valid Service Declaration. Fields which may/may not be changed are described in section [7.3.2.](#service-declaration-data)

![Modifying a Service Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image11.png)

### Service Declaration data

Field name | Description | Example value | Can it be changed?
--- | --- | --- | ---
Information system providing the service | A drop-down menu containing the names of the information systems included in the Data Consent Service. In the SD submission form, one of these options is selected -- the information system providing the service to be declared. | Environment information system | No
Subsystem using the Data Consent Service | The subsystem corresponding to the selected information system that will access the Data Consent Service. The parameter to verify that the Data Provider's subsystem authenticated in the X-tee accessing the Data Consent Service is the correct party to make such a query. (This field will be filled in automatically when the information system providing the service is selected) | EE/GOV/70009770/digi | No
Data controller (owner) | Official name of the data controller's (owner's) organisation <br /> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el (This field will be filled in automatically when the information system providing the service is selected) | Statistics Estonia | No
Registry code of the data controller | Registry code of the data controller's (owner's) organisation. (It will be filled in automatically when the information system providing the service is selected) | 70000332 | No
Data processor | Official name of the data processor's organisation <br /> https://akit.cyber.ee/term/12750 (It will be filled in automatically when the information system providing the service is selected) | Data centre | No
Registry code of the data processor | Registry code of the data processor's organisation. (It will be filled in automatically when the information system providing the service is selected) | 70009770 | No
Identifier of the Service Declaration | Unique human-readable identifier of the Service Declaration | hl7_seisundiandmed | No
Name of the Service Declaration | A short name of the data content to be transferred via the declared service (visible to the Data Subject as the title of the consent data set) | Environmental data | Yes
Technical specifications of the service | Technical specifications of the service. Within the MVP scope -- an informative field for internal use. | X-tee service 'hl7' query, HL7 OID: 1.3.6.1.4.1.28284.6.1.1.35 | Yes
X-tee service to be used | Service to be declared. Within the MVP scope -- an informative field for internal use. | EE/GOV/70009770/digi/ESGPäring/v4 | No
Description of the data content of the service | Human-readable description of the service. Data to be returned, service content, etc. To be displayed when consent is given to the Data Subject. | Data related to compiling ESG reports: <br /> •	average energy consumption, <br /> •	waste management volume, <br /> •	assessment of working conditions. | Yes
Maximum period of validity of the consent | Maximum number of days the Data Subject's consent can be valid from the moment the consent is given. On this basis, the expiry date of the consent is calculated and indicated to the Data Subject at the time of giving the consent. | 60 | Yes
Expiry date of the Service Declaration | The SD expiry date can be unspecified (the SD will be valid until it is manually invalidated) or a specific selected date (when the SD expires, the associated PD will also become invalid). | 15 May 2026 | Yes
Consent requires a signature: | Does the consent need to be digitally signed? <br />Once the entry has been made and the declaration has been submitted, the entry cannot be changed. <br />If the option is ticked, the following options are displayed: <br /> •	Withdrawal of consent requires a signature; <br /> •	Generate JSON from the consent metadata. | Yes/No | No
Withdrawal of consent requires a signature | If consent is withdrawn, it must be digitally signed. <br />Once the entry has been made and the declaration has been submitted, the entry cannot be changed. | Yes/No | No
Service for legal entity data | Whether the service is intended for the transmission of legal entity data. | Yes/No | No
Generate JSON from consent metadata | Is a JSON file generated from the consent metadata when the consent is signed and uploaded to the DigiDoc container? <br />Once the entry has been made and the declaration has been submitted, the entry cannot be changed. | Yes/No | No
Extension of consent allowed | Is the extension of confirmed/signed consents allowed? <br /> Note: For legal entity data, the value is 'No' and is not editable. | Yes/No | No
Date of declaration | Date of creation of the SD. The PD always enters into force as of the date of submission. | 9 June 2023 | No
Declaration form completed by | The information systems administrator (name and role in the system) who completed the SD submission form. | Mart Mets (Information System Administrator) | No
Last amended | Date since the SD data was last amended | 9 June 2023 | No
Last person to amend | The information systems administrator (name and role in the system) who last modified the SD data | Mart Mets (Administrator) | No
Status | SD state. Possible states: VALID and INVALID (see section 7.2.3.) | valid | Only to invalid

### Status diagram of the Service Declaration

![Status diagram of the Service Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image12.png)

## Purpose Declarations management

The Purpose Declaration (PD) describes the data recipient (the Client) and the purpose for using the protected data service. Some of the data in the Purpose Declaration is displayed to the Data Subject at the time of consent (see section [9](#consent-template)).

### Views associated with the Purpose Declarations management

The following views are associated with the submission and management of Purpose Declarations in the Data Consent Service management interface:

**List of Purpose Declarations**

Overview of all the Purpose Declarations that have been submitted. It allows to sort the list of declarations by the data in the various columns, filter by status, and search for declarations by the declarant's name.

The following actions can be performed on each declaration:

- '*View*' -- open a detailed view of the declaration with all its data.

- '*Change to invalid*' -- change the status of the Purpose Declaration to INVALID and also make all associated consents invalid.

- '*Clone*' -- use the declaration as a template for a new declaration -- the new declaration submission form will be automatically filled with the data of the cloned declaration for further editing.

![List of Purpose Declarations](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2013.png)

**Submitting a Purpose Declaration**

Form for submitting a new Purpose Declaration. The data to be entered is described in detail in section [7.4.2.](#purpose-declaration-data)

![Submitting a Purpose Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2014.png)

**Detailed view of a Purpose Declaration**

It displays the data associated with the Purpose Declaration -- both basic and metadata. It also displays the number of valid consents associated with a given Purpose Declaration. In the detailed view, a request can be made to modify the data of a valid declaration by clicking on the 'Modify declaration data' button. By clicking on the 'Download' button, it is possible to download the Purpose Declaration data in CSV format.

![Detailed view of a Purpose Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2015.png)

**Modifying a Purpose Declaration**

A view that allows to partially modify the data of a valid Purpose Declaration. Fields which may/may not be changed are described in section [7.4.2.](#purpose-declaration-data)

![Modifying a Purpose Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2016.png)

### Purpose Declaration data

Field name | Description | Example value | Can it be changed?
--- | --- | --- | ---
Name of the data recipient | Official name of the company/organisation of the Client (PD declarant) | Aruanded AS | No
Registry code of the data recipient | Registry code of the company/organisation of the Client (PD declarant) | 87654321 | No
Subsystem using the Data Consent Service | The Client's subsystem that will access the Data Consent Service. The parameter to verify that the Client's subsystem authenticated in the X-tee accessing the Data Consent Service is the correct party to make such a query. The drop-down menu contains all subsystems from the X-tee directory and supports *autocomplete* search. | EE/COM/87654321/digi | No
Service provided by the data recipient | The trade name of the Client or its business service. It provides the Data Subject with information about which specific business service/information system will use their personal data. | Environment_1 | No
Service Declaration to be used | A Service Declaration (information system name -- SD identifier) declaring a Protected Service providing the data necessary to fulfil the purpose. <br /> <br /> The selection of the Service Declaration (SD) is done in two steps: <br /> <br /> 1) Selection of the information system (associated with the SD) -- drop-down menu containing the names of the information systems added via 'Information systems management'. <br /> <br /> 2) Selecting a SD identifier -- drop-down menu containing the identifiers of the valid Service Declarations associated with the information system selected in the previous step. <br /> <br /> Only one SD can be associated with one PD. | Environment information system -- KESKK_ARUANNE (service for legal entity data) | No
Identifier of the Purpose Declaration | Unique human-readable identifier of the Purpose Declaration | ARUANNE_KOOST | No
Name of the Purpose Declaration | A human-readable short name of the purpose of the use of the data to be declared. | ESG report | Yes
Purpose of the use of data | Description of the purposes for which the Data Subject's data are used. | If you allow the Environmental Indicators information system to transmit your company's data to the company Aruanded AS, this will allow it to provide you with the service of compiling an ESG report.<br /> Aruanded AS uses the data received from the Environmental Indicators information system to assess your company's sustainability and, based on this, compiles the necessary ESG report. | Yes
Data protection conditions of the recipient of the data | Data protection conditions for the Client or its business service (to be included as a link) | https://andmekaitsetingimused.ee | Yes
Expiry date of the Purpose Declaration | The expiry date of the PD is either set to the same date as the expiry date of the SD (it can also be 'unspecified'), or a separate date is selected for the PD. | undetermined | No
Date of declaration (determined automatically) | Date of creation of the PD. The PD always enters into force as of the date of submission. | 9 June 2023 | No
Declaration form filled by (determined automatically) | The information systems administrator (name and role in the system) who completed the PD submission form. | Mart Mets (Information System Administrator) | No
Last amended (determined automatically) | Date since the PD data was last amended. | 9 June 2023 | No
Last person to amend (determined automatically) | The information systems administrator (name and role in the system) who last modified the PD data | Mart Mets (Information System Administrator) | No
Status | PD state. Possible states: VALID and INVALID (see section 7.3.3.) | valid | Only to invalid

### Status diagram of the Purpose Declaration

![Status diagram of the Purpose Declaration](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image17.png)

# Statistics

The Statistics menu is intended to provide statistics on declarations and related consents in the management interface. Statistics can be made by all information system administrators within their administrative area, and by users marked 'RIA administrator statistics' across the system.

The information system and/or the name of the data recipient must be selected to produce statistics:

- Information System -- Information Systems are displayed according to the organisations within their area of responsibility. If the user is marked as 'RIA administrator statistics', then Information Systems from across the system are displayed in the selection. 1-n values can be selected.

- Recipient of the data -- Company search field by name of data recipient. You can search by data recipients within the limits of the organisations under your responsibility. If the user is marked as 'RIA administrator statistics', then data recipients are searched from across the system. You can search by one value at a time.

## Statistics output

In the statistics results table, you can view statistics by selected information system and/or data recipient. It allows you to sort statistical data by different columns.

![Statistics output](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2018.png)

## Statistical data

Field name | Description
--- | ---
Information system/Service provider | The name of the information system that provides the declared service.
Data recipient | The name of the Client's (PD declarant) company
Valid Service Declarations | The total number of valid Service Declarations.
Valid Purpose Declarations | The total number of valid Service Declarations broken down by information system and by company.
Valid consents | The total number of valid consents broken down by information system and by company
Validated consents | The total number of validated (i.e. approved) consents broken down by information system and by company. <br /> <br />The number of approved consents includes all consents that have been approved and whose status may have already changed. E.g. expired, withdrawn, etc. Does not include consents pending decision.
All consents | The total number of all consents broken down by information system and by company regardless of their status.
Total | The sum totals.

# Consent template

The following table describes the data that a consent contains.

Data field | Example | Source
--- | --- | ---
Data Subject's name | Finest AS | consent
Data Subject's registry code | 10714404 | consent
Name of the Data Provider or information system (data transmitter) | Environment information system | Service Declaration
Name and registry code of the data controller (Data Provider or information system administrator) | Statistics Estonia (70000332) | Service Declaration
Name and registry code of the data processor | Data centre (10000000) | Service Declaration
Data recipient | Aruanded AS | Purpose Declaration
Service provided by the data recipient (trade name) | Environment_1 | Purpose Declaration
Data (description of the data content) | Data required for compiling ESG reports: <br /> •	average energy consumption, <br /> •	waste management volume, <br /> •	assessment of working conditions. | Service Declaration
Purpose of the use of data | If you allow the Environment information system to transmit your company's data to the company Aruanded AS, this will allow it to provide you with the service of compiling an ESG report. <br /> Aruanded AS uses the data received from the Environment information system to assess your company's sustainability and, based on this, compiles the necessary ESG report. | Purpose Declaration
Data protection conditions of the recipient of the data | https://andmekaitsetingimused.ee | Purpose Declaration
Consent approver -- person's name and personal identification code | Kairi Sarapuu (4712220278) | consent
Consent withdrawer -- person's name and personal identification code | Kairi Sarapuu (4712220278) | consent
Consent validity | from 23 December 2024 <br /> until 20 February 2025 | consent (the validity period is calculated as: the date consent was granted + the maximum consent validity in days (from the Service Declaration))

# User interface of the Legal Entity Data Consent Service

The user interface of the Legal Entity Data Consent Service JURNT, intended for regular users, is implemented as a separate web application that forms part of the eesti.ee Business Portal. The JURNT user interface is intended for the Representative(s) of legal-entity Data Subjects and Client representative(s), and consists of four parts: granting consents, managing consents, requesting consents, and an overview of data transmitted on the basis of consents. After logging in to eesti.ee as a representative of a legal entity, the user finds these under the Data Consent menu item, in the subpages 'Pending consents', 'All consents', 'Requesting consents', and 'Data transmitted'. Whether a subpage is visible depends on the existence of the corresponding user role.

## Approving consent

The Representative of a legal-entity Data Subject can review consent requests and grant the necessary consents:

- via a unique link to which they are redirected from the Client,

- or via a link sent by email as a notification,

- or by entering, on the eesti.ee Business Portal, the JURNT subpage 'Pending consents'.

### Client actions before redirection

Each time the Client wishes to redirect the Representative to grant consents, it must request a new link from the Legal Entity Data Consent Service JURNT with the set of required consent requests. The new link is requested using the **url** API service (see section [5.1.4](#url)).

Before redirecting to the Data Consent Service, the Client must inform the Data Subject or the Representative about the need to grant consent(s), the conditions of data processing, and the upcoming redirection to the Data Consent Service. When the Client submits consent request(s) via JURNT, JURNT automatically sends the Data Subject an email notification through the eesti.ee national mailbox.

Sample text:

>   To use service X we need your consent at the eesti.ee/nousolek portal, in order to query the necessary data from information system Y.

>   If you allow information system Y to give us your company's data, we will be responsible for processing it in accordance with  
>   our **privacy terms (link)**.  
>   **Why we need this and why it is useful to you (link)**

>   I go to grant consent:

>   **[button]**

### In the Legal Entity Data Consent Service

The Representative of a legal-entity Data Subject can review consent requests and grant the necessary consents after entering the eesti.ee portal and authenticating themselves via TARA using one of the offered login methods.

![TARA](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2019.png)

After selecting the represented company, the user can open the Pending consents subpage under the Data Consent menu item, where the list view of pending consent requests targeted at them is displayed, with the first, most recent consent request open.

![Consent requests](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant1.png)

After reviewing the details of the consent request, the Representative can choose whether to allow or not allow the described data set to be transmitted with data concerning the legal entity they represent. If they allow, the status label and button turn green and the 'Confirm' button becomes active.
If the Representative does not allow the described data set to be transmitted, the status label and button turn red and the 'Confirm' button becomes active.

![Allow](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant2.png)

PS! If the Data Provider has required a digital signature for granting consent in the Service Declaration, the consent must be digitally signed.

![Do not allow](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant3.png)

### Client actions after redirection

After the Representative is redirected back, the Client queries the consent references from the Data Consent Service and validates them, in order to find out which consents were granted and are now valid. The **url** and **client** APIs are used (see sections [5.1.2](#create) and [5.1.3](#status)).

Based on the response received, the Client displays a notification to the Representative. If all the necessary consents are valid, the Client may start querying data from the Data Provider and providing the service to the Data Subject or the Representative.

If some consents are missing, the Client requests a new link from the Data Consent Service (using the **url** API (see section [5.1.1](#purposedeclarations)) and redirects the Representative to grant the missing consents.

## Consents management

The Representative of a legal-entity Data Subject finds the consent management options after logging in, under the Data Consent menu item, in the 'All consents' subpage. As a representative of a legal entity, the user can see all the consents they have approved or withdrawn from as the Representative of the given Data Subject, both valid and invalid. This page does not display consent requests (status 'Pending decision'), which can be seen in the 'Pending consents' subpage.

Consents can be filtered by data recipient, data transmitter, data name, consent number and dates (Valid from, Valid until). The consent table is sortable by a single column.

![My consents](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant4.png)

Clicking a row in the table opens the consent details view together with the 'Withdraw consent' button for a valid consent. This button allows the consent to be withdrawn. A coloured line in front of the consent details indicates the status.

![Consent details and withdrawal](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant5.png)

If the Representative approved or signed the consent (including the withdrawal), the consent details show the name of the approver/signer.

### Withdrawal of consent

The Representative of a legal-entity Data Subject can withdraw consent using the 'Withdraw consent' button. Withdrawal is available for consents that are valid (status 'approved'). The user must confirm the withdrawal so that it does not happen by accident.

If the Data Provider has required digital signing for the withdrawal of consent through the Service Declaration, the withdrawal of consent must be signed digitally.

![Withdraw or extend](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant6.png)

## Requesting consent

After logging in to the eesti.ee portal, the Representative of a legal-entity Client finds, under the Data Consent menu item, in the 'Requesting consents' tab, the option to submit consent requests to potential service users. The list shows all consent requests submitted by the logged-in user, regardless of the consent status.

![View consents](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant7.png)

After using the '+ Create consent request' button, a pop-up window is displayed to the user for composing the consent request input data. A precondition for submitting a request is that the represented legal entity has a contract with some data provider (Data Provider) that has valid data service(s) (Purpose Declaration(s)) for that legal entity.

The user searches for the legal entity about whom data is to be obtained, selects the data provider, data service and the purpose of sharing data from drop-down menus, and submits the request.

![Submitting a request](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant8.png)

Once the user has submitted the consent request, the pop-up window closes and a new request is added to the consent requests list with the status 'Pending decision'. The consents management functionality also works on this subpage as described in the previous Consents management section.

### Requesting consents via the Client Application

When the Client Application of the Client wishes to obtain consents from legal-entity Data Subjects to receive data from the Data Provider, it first queries valid Purpose Declarations using the **purposedeclarations** API service (see section [5.1.1](#purposedeclarations)).

To obtain the data corresponding to the selected Purpose Declaration from the Data Provider, consent requests are submitted to legal entities using the **create** API service (see section [5.1.2](#create)). Registry codes must be known to the Client Application in advance. Consent requests may be composed for 1 - 100 legal entities at a time.

The Client can obtain the consent references for valid consents using the **status** API service (see section [5.1.3](#status)).

## Data transmitted

The 'Data transmitted' subpage provides an overview of which successful data queries have been made on the basis of the Data Subject's consents and allows the data transmissions concerning the legal entity they represent to be monitored.

![Data transmitted](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant9.png)

The view displays by default a list of the most recent data transmissions, according to the selected number under 'Show at once'. The user can specify a time period for which the transmitted data of interest is shown, or also search by keyword(s) across the three alphabetical content columns.
