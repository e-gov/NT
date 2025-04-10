# Using and interfacing the RIA Data Consent Service

28 January 2025

Version 2.1

---

Version history

| Date| Version| Description
|----------|----------|----------
| 26 January 2021| 0.1| Document created
| 18 February 2021| 0.2| Document updated
| 16 March 2021| 0.3| Document revised
| 3 May 2021| 0.4| Document revised
| 11 May 2021| 0.5| Document revised
| 25 May 2021| 0.6| Document revised
| 21 June 2021| 0.7| Document revised
| 15 September 2021| 1.0| Document published
| 8 December 2023| 2.0| Document revised
| 28 January 2025| 2.1| Document revised

<!-- markdownlint-disable MD033 -->
# **Table of contents**

[1.](#sissejuhatus)[ ](#sissejuhatus)[Introduction](#sissejuhatus)

[1.1 Definitions](#mõisted)

[2.](#eeltingimused-andmenõusolekuteenuse-kasutamiseks)[ ](#eeltingimused-andmenõusolekuteenuse-kasutamiseks)[Prerequisites for using the Data Consent Service](#eeltingimused-andmenõusolekuteenuse-kasutamiseks)

[3.](#põhiprotsesside-kirjeldus-kasutusjuhtudena)[ ](#põhiprotsesside-kirjeldus-kasutusjuhtudena)[Description of key processes as use cases](#põhiprotsesside-kirjeldus-kasutusjuhtudena)

[3.1.](#kasutusjuht-1-nõusolekute-valideerimine-klientrakendus-ja-andmesubjekti-suunamine-puuduvaid-nõusolekuid-andma)[ ](#kasutusjuht-1-nõusolekute-valideerimine-klientrakendus-ja-andmesubjekti-suunamine-puuduvaid-nõusolekuid-andma)[Use case 1: validation of consents (Client) and redirecting the Data Subject to provide the missing consents](#kasutusjuht-1-nõusolekute-valideerimine-klientrakendus-ja-andmesubjekti-suunamine-puuduvaid-nõusolekuid-andma)[ ](#kasutusjuht-1-nõusolekute-valideerimine-klientrakendus-ja-andmesubjekti-suunamine-puuduvaid-nõusolekuid-andma)

[3.2.](#kasutusjuht-1.1-kliendirakendus-valideerib-andmesubjekti-nõusolekud-ja-suunab-andmesubjekti-esindaja-andmesubjekti-puudolevaid-nõusolekuid-andma)[ ](#kasutusjuht-1.1-kliendirakendus-valideerib-andmesubjekti-nõusolekud-ja-suunab-andmesubjekti-esindaja-andmesubjekti-puudolevaid-nõusolekuid-andma)[Use case 1.1: The Client validates the consent(s) of the Data Subject and directs the Representative to provide any missing consents requested from the Data Subject](#kasutusjuht-1.1-kliendirakendus-valideerib-andmesubjekti-nõusolekud-ja-suunab-andmesubjekti-esindaja-andmesubjekti-puudolevaid-nõusolekuid-andma)[ ](#kasutusjuht-1.1-kliendirakendus-valideerib-andmesubjekti-nõusolekud-ja-suunab-andmesubjekti-esindaja-andmesubjekti-puudolevaid-nõusolekuid-andma)

[3.3.](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)[ ](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)[Use case 2:](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)[ ](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)[Data query and consent validation (Data Provider)](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)[ ](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)

[4.](#nõusoleku-seisundidiagramm)[ ](#nõusoleku-seisundidiagramm)[Consent status diagram](#nõusoleku-seisundidiagramm)

[5.](#andmenõusolekuteenusega-liidestamine-ja-päringute-tehniline-kirjeldus)[ ](#andmenõusolekuteenusega-liidestamine-ja-päringute-tehniline-kirjeldus)[Interfacing with the Data Consent Service and the technical specifications of queries](#andmenõusolekuteenusega-liidestamine-ja-päringute-tehniline-kirjeldus)

[5.1.](#andmekogu-ja-klientrakenduse-poolt-kasutavate-päringute-tehniline-kirjeldus)[ ](#andmekogu-ja-klientrakenduse-poolt-kasutavate-päringute-tehniline-kirjeldus)[Technical specifications of the queries used by the Data Provider and the Client](#andmekogu-ja-klientrakenduse-poolt-kasutavate-päringute-tehniline-kirjeldus)

[5.1.1. getConsentGroupReference](#getconsentgroupreference)

[5.1.2. getConsentReferences](#getconsentreferences)

[5.1.3. validateConsentForClient](#validateconsentforclient)

[5.1.4. validateConsentForDataProvider](#validateconsentfordataprovider)

[5.1.5. reportDataTransmission](#reportdatatransmission)

[5.1.6. getConsentGroupReferenceRepresentable ](#getconsentgroupreferencerepresentable)

[5.1.7. postConsentFilterByStatus](#postConsentFilterByStatus)

[6.](#juhised-andmenõusolekuteenuse-testimiseks-liidestuja-poolt)[ ](#juhised-andmenõusolekuteenuse-testimiseks-liidestuja-poolt)[Instructions for the interface testing of the Data Consent Service](#juhised-andmenõusolekuteenuse-testimiseks-liidestuja-poolt)

[6.1.](#nõusolekute-urli-loomine-ja-nõusolekutaotluse-informatsiooni-kuvamine-esmane-ja-korduv)[ ](#nõusolekute-urli-loomine-ja-nõusolekutaotluse-informatsiooni-kuvamine-esmane-ja-korduv)[Creating a consent URL and displaying information on consents in the status ‘requested’ (primary and recurring)](#nõusolekute-urli-loomine-ja-nõusolekutaotluse-informatsiooni-kuvamine-esmane-ja-korduv)

[6.2.](#nõusoleku-andmine-approve-ja-keelduminetagasivõtmine-decline)[ Approving and declining consent](#nõusoleku-andmine-approve-ja-keelduminetagasivõtmine-decline)

[6.3.](#nõusolekuviidete-pärimine)[ ](#nõusolekuviidete-pärimine)[Consent references query](#nõusolekuviidete-pärimine)

[6.4.](#nõusolekute-valideerimine-klientrakendus-ja-andmekogu)[ ](#nõusolekute-valideerimine-klientrakendus-ja-andmekogu)[Validation of consents (Client and Data Provider)](#nõusolekute-valideerimine-klientrakendus-ja-andmekogu)

[6.5.](#nõusolekute-alusel-edukast-andmete-pärimisest-raporteerimine-andmekogu)[ ](#nõusolekute-alusel-edukast-andmete-pärimisest-raporteerimine-andmekogu)[Reporting on successful data queries based on consents (Data Provider)](#nõusolekute-alusel-edukast-andmete-pärimisest-raporteerimine-andmekogu)

[7.](#andmenõusolekuteenuse-haldusliidese-kasutamise-juhend)[ ](#andmenõusolekuteenuse-haldusliidese-kasutamise-juhend)[Instructions for using the management interface of the Data Consent Service](#andmenõusolekuteenuse-haldusliidese-kasutamise-juhend)

[7.1.](#rollid)[ ](#rollid)[Roles](#rollid)

[7.2.](#infosüsteemide-haldus)[ ](#infosüsteemide-haldus)[Information systems management](#infosüsteemide-haldus)

[7.2.1.](#infosüsteemide-haldusega-seotud-vaated)[ ](#infosüsteemide-haldusega-seotud-vaated)[Views associated with the management of information systems](#infosüsteemide-haldusega-seotud-vaated)

[7.2.2.](#infosüsteemi-andmed)[ ](#infosüsteemi-andmed)[Information system data](#infosüsteemi-andmed)

[7.3.](#teenusedeklaratsioonide-haldus)[ ](#teenusedeklaratsioonide-haldus)[Service Declarations management](#teenusedeklaratsioonide-haldus)

[7.3.1.](#teenusedeklaratsioonide-haldusega-seotud-vaated)[ ](#teenusedeklaratsioonide-haldusega-seotud-vaated)[Views associated with the management of Service Declarations](#teenusedeklaratsioonide-haldusega-seotud-vaated)

[7.3.2.](#teenusedeklaratsiooni-andmed)[ ](#teenusedeklaratsiooni-andmed)[Service Declaration data](#teenusedeklaratsiooni-andmed)

[7.3.3.](#teenusedeklaratsiooni-seisundidiagramm)[ ](#teenusedeklaratsiooni-seisundidiagramm)[Status diagram of the Service Declaration](#teenusedeklaratsiooni-seisundidiagramm)

[7.4.](#eesmärgideklaratsioonide-haldus)[ ](#eesmärgideklaratsioonide-haldus)[Purpose Declarations management](#eesmärgideklaratsioonide-haldus)

[7.4.1.](#eesmärgideklaratsioonide-haldusega-seotud-vaated)[ ](#eesmärgideklaratsioonide-haldusega-seotud-vaated)[Views associated with the management of Purpose Declarations](#eesmärgideklaratsioonide-haldusega-seotud-vaated)

[7.4.2.](#eesmärgideklaratsiooni-andmed)[ ](#eesmärgideklaratsiooni-andmed)[Purpose Declaration data](#eesmärgideklaratsiooni-andmed)

[7.4.3.](#eesmärgideklaratsiooni-seisundidiagramm)[ ](#eesmärgideklaratsiooni-seisundidiagramm)[Status diagram of the Purpose Declaration](#eesmärgideklaratsiooni-seisundidiagramm)

[8.](#statistika)[ ](#statistika)[Statistics](#statistika)

[8.1.](#statistika-väljund)[ ](#statistika-väljund)[Statistics output](#statistika-väljund)

[8.1.1.](#statistika-andmestik)[ ](#statistika-andmestik)[Statistical data](#statistika-andmestik)

[9.](#nõusoleku-mall)[ ](#nõusoleku-mall)[Consent template](#nõusoleku-mall)

[10.](#andmenõusolekuteenuse-kasutajaliides)[ ](#andmenõusolekuteenuse-kasutajaliides)[User interface of the Data Consent Service](#andmenõusolekuteenuse-kasutajaliides)

[10.1.](#nõusoleku-andmine)[ ](#nõusoleku-andmine)[Approving consent](#nõusoleku-andmine)

[10.1.1.](#enne-suunamist)[ ](#enne-suunamist)[Before being redirected](#enne-suunamist)

[10.1.2.](#Andmenõusolekuteenuses)[ ](#Andmenõusolekuteenuses)[In the Data Consent Service](#Andmenõusolekuteenuses)

[10.1.3.](#pärast-suunamist)[ ](#pärast-suunamist)[After being redirected](#pärast-suunamist)

[10.2.](#nõusolekute-haldus)[ ](#nõusolekute-haldus)[Consents management](#nõusolekute-haldus)

[10.2.1.](#Andmenõusolekuteenusest)[ ](#Andmenõusolekuteenusest)[About the Data Consent Service](#Andmenõusolekuteenusest)

[10.2.2.](#minu-nõusolekud)[ ](#minu-nõusolekud)[My consents](#minu-nõusolekud)

[10.2.3.](#edastatud-andmed)[ ](#edastatud-andmed)[Data transmitted](#edastatud-andmed)

[10.2.4.](#kasutustingimused)[ ](#kasutustingimused)[Terms of use](#kasutustingimused)

# Introduction

The aim of this document is to describe the main use cases of RIA’s Data Consent Service, the data exchange and testing principles, and the user interfaces.

The document is the basis for interfacing with and deploying RIA’s Data Consent Service.

## Definitions

**Data Subject** -- a person to whom personal data held in the Data Provider relates.

**Representative** -- the person who represents the Data Subject.

**Data Provider** -- the information system that holds the Data Subject’s personal data.

**Client** -- an information system that needs the data of the Data Subject from the Data Provider to provide a service to the Data Subject.

**Data Consent Service** -- the information system that is responsible for managing the consents of Data Subjects.

**Protected Service** -- an abstract Data Provider service that provides access to the data of the Data Subject and requires the consent of the Data Subject to be used.

**Service Declaration** -- a description of the Protected Service provided by one Data Provider and the data transmitted. Registered by the Data Provider in the Data Consent Service.

**Purpose Declaration** -- a description of the purpose for which the data is used. Within the MVP, it is registered by the Data Provider in the Data Consent Service and forms the basis for consents in the status ‘requested’. The content of the Purpose Declaration is provided by the Client. If the Client needs data from multiple protected services (from one or different Data Providers) to achieve its purposes, multiple Purpose Declarations are registered -- separately for each service. In this case, the Client must also obtain multiple corresponding Data Subject consents.

**Consent** -- consent given to the Data Provider by the Data Subject, on the basis of which the Data Provider may transmit to the Client through protected services the data described in the consent for processing for the purpose described in the consent.

**Consent in the status ‘requested’** -- consent that is required by the Client to provide the service to the Data Subject, but has not yet been given by the Data Subject.

**Consent Reference** -- the unique consent code used to determine the validity of the consent.

# Prerequisites for using the Data Consent Service

In order to enable the collection of consents from the Data Subject for the Client, the following steps must be taken by the Data Provider and the Client:

1. The Client consults the available protected services and datasets in the X-tee directory (<https://x-tee.ee/catalogue/ee-dev>) and contacts the Data Provider.

2. The Data Provider considers the request to use the Client’s data and investigates the background and reliability of the Client. If the parties reach an agreement, they will enter into a contract.

3. In the event that the X-tee directory does not contain the data set required by the Client, the Data Provider creates a new Protected Service that meets the Client’s needs.

4. The Data Provider’s representative – the Information Systems Administrator – adds to the Data Consent Service an information system that provides the requested Protected Service (if it was not added before) (see section [7.2.](#infosüsteemide-haldus))

5. The Data Provider’s representative – the Information Systems Administrator – adds to the Data Consent Service a Service Declaration describing the Protected Service (see section [7.3.](#teenusedeklaratsioonide-haldus)). If a Service Declaration is already in place for the required service, there is no need to declare it again – the existing Service Declaration can be used.

6. Based on the agreement with the Client, the Data Provider’s representative – the Information Systems Administrator – adds to the Data Consent Service a Purpose Declaration describing the purpose for the use of the data (see section [7.4.](#eesmärgideklaratsioonide-haldus))

7. After the Purpose Declaration has been submitted, the Data Provider exports the data of the Purpose Declaration from the Data Consent Service and forwards it to the Client (for example, via email). Among this data, a unique identifier for the Purpose Declaration is transmitted, which is used by the Client to communicate with the Data Consent Service.

8. The Client interfaces with the Data Consent Service, enabling the Data Subject or the Representative to be directed to the Data Consent Service to provide the necessary consents.

# Description of key processes as use cases

The chapter contains two main use cases related to the Data Provider and the Client, which provide an overview of the context for using the APIs of the Data Consent Service.

## Use case 1: validation of consents (Client) and redirecting the Data Subject to provide the missing consents

**Figures involved:** Data Subject, Client, Data Consent Service

**Parties and their interests:**

- The Data Subject wants to use the Client’s service, the operation of which requires the Data Subject’s consent to the transfer and processing of their personal data.

- The Client wants to make sure that all consents necessary for the provision of the service are valid and, if some consents are missing, to redirect the Data Subject to the Data Consent Service to provide them. When redirecting a Data Subject, the Client wants to know whether or not the necessary consents have been given.

- The Data Consent Service wants to enable the Data Subject to approve or decline the consent in the status ‘requested’ and to redirect the Data Subject back to the Client.

**Prerequisites:** the Client knows the Data Subject’s personal identification code and the identifiers of the Purpose Declarations corresponding to its own service.

**Follow-up conditions:** the consents given by the Data Subject are valid and known to the Client.

**Baseline scenario:**

1. The Data Subject expresses a wish to use the Client’s service, which requires the Data Subject’s consent (or multiple consents) to the transfer and processing of their personal data.

2. The Client verifies through the Data Consent Service whether all the necessary consents of the Data Subject for the provision of the service are in place and valid. The queries ***getConsentReferences*** and/or ***validateConsentForClient*** are used (see sections [5.1.2.](#getconsentreferences) and [5.1.3.](#validateconsentforclient)) The Client detects that some of the required consents are missing or not valid.

3. The Client requests a link from the Data Consent Service to redirect the Data Subject to provide the missing consents via the user interface of the Data Consent Service. The Client shall only send the identifiers of the Purpose Declarations that correspond to the missing consents in the query. The ***getConsentGroupReference*** query is used (see section&nbsp;[5.1.1.](#getconsentgroupreference)). **IMPORTANT!** Do not use the same link more than once, as the old link may display incomplete information. When redirecting a Data Subject, <ins>always</ins> request a new link using the **getConsentGroupReference** query.

4. The link generated by the Data Consent Service redirects the Data Subject to provide the consents. The Data Subject logs in using the TARA authentication.

5. The Data Subject reviews the consents in the status ‘requested’, approves those they agree with, and declines those they do not agree with. Once all the choices have been made, the Data Subject presses the ‘Confirm’ button.

6. The Data Consent Service converts the consents in the status ‘requested’ into valid consents and assigns Consent References to them. The Data Consent Service redirects the Data Subject back to the Client.

7. After the Data Subject is redirected, the Client asks the Data Consent Service for the Consent References and their validation to find out which consents are valid. The queries ***getConsentReferences*** and ***validateConsentForClient*** are used (see sections [5.1.2.](#getconsentreferences) and [5.1.3.](#validateconsentforclient)).

8. Based on the response received, the Client displays a message to the Data Subject.

**Baseline scenario sequence diagram:**

![Baseline scenario sequence diagram](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image1.png)

**Alternative scenarios and extensions:**

2a. The Client verifies that all the necessary consents are in place and valid.

- The Client provides the Data Subject with the requested service and requests the necessary data from the Data Provider to provide it. ‘Use case 2: Data query and consent validation (Data Provider)’ is launched (see section [3.2.](#_Kasutusjuht_2:_Andmete)).

3a. The Client asks for a link to provide the consents, even though some of the consents requested were already given previously by the Data Subject and are valid.

- The Data Consent Service excludes the valid consents and does not ask the Data Subject for them again via the generated link.

3b. The Client asks for a link to provide the consents, even though all the consents requested were already given previously by the Data Subject and are valid.

- The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

3c. The Client asks for a link to provide consents, even though some of the consents requested were already given previously by the Data Subject, but have since expired or have been withdrawn by the Data Subject.

- The Data Consent Service generates new corresponding consents in the status ‘requested’ and allows the Data Subject to consent to them via a generated link.

3d. The Client asks for a link to provide consents, even though at least one of the requested consents is related to an invalid Purpose Declaration (that is, no further data transfer can take place at all on the basis of that Purpose Declaration).

- The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

3e. The Client asks for a link to provide consents, even though the query contains Purpose Declaration identifiers that do not exist.

- The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

3f. The Client asks for a link to provide consents, even though the query contains a personal identification code belonging to a minor Data Subject and/or one without active legal capacity.

- The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

3g. The Data Subject leaves the page without making a decision and without clicking on the ‘Confirm’ button.

- The process ends. If the Data Subject starts to use the Client again, the process starts again from point 1 of the baseline scenario.

3h. The Client asks for a link to provide consents and some of the consents asked for are linked to a Service Declaration where a digital signature of consent is required.

- The Data Consent Service generates consents in the status ‘requested’ and allows the Data Subject to sign them via a generated link.

## Use case 1.1: The Client validates the consent(s) of the Data Subject and directs the Representative to provide any missing consents requested from the Data Subject.

**Parties and their interests:**

- The Representative wants to use the Client’s service, the operation of which requires the Data Subject’s consent to the transfer and processing of their personal data.

- The Client wants to make sure that all consents necessary for the provision of the service are valid and, if some consents are missing, to redirect the Representative to the Data Consent Service to provide them on behalf of the Data Subject. When redirecting a Representative, the Client wants to know whether or not the necessary consents have been given.

- The Data Consent Service wants to enable the Representative to approve or decline the consent from the Data Subject in the status ‘requested’ and to redirect the Representative back to the Client.

**Prerequisites:** The Client knows the personal identification code of the Data Subject and of the Representative and the identifiers of the Purpose Declarations corresponding to its own service.

**Follow-up conditions:** The consents from the Data Subject given by the Representative are valid and known to the Client.

**Baseline scenario:**

1. The Representative expresses a wish to use the Client’s service, which requires the Data Subject’s consent (or multiple consents) to the transfer and processing of their personal data.

2. The Client verifies through the Data Consent Service whether all the necessary consents of the Data Subject for the provision of the service are in place and valid. The queries ***getConsentReferences*** and/or ***validateConsentForClient*** are used (see sections [5.1.2.](#getconsentreferences) and [5.1.3.](#validateconsentforclient)) The Client detects that some of the required consents are missing or not valid.

3. The Client requests a link from the Data Consent Service to redirect the Representative to provide the missing consents from the Data Subject via the user interface of the Data Consent Service. The Client shall only send the identifiers of the Purpose Declarations that correspond to the missing consents in the query. The ***getConsentGroupReferenceRepresentable*** query is used (see section [5.1.6.](#getconsentgroupreferencerepresentable)) **IMPORTANT!** Do not use the same link more than once, as the old link may display incomplete information. When redirecting a Representative, <ins>always</ins> request a new link using the **getConsentGroupReferenceRepresentable** query.

4. The link generated by the Data Consent Service redirects the Representative to provide the consents from the Data Subject. The Representative logs in using the TARA authentication.

5. The Representative reviews the consents from the Data Subject in the status ‘requested’, approves those they agree with, and declines those they do not agree with. Once all the choices have been made, they press the ‘Confirm’ button.

6. The Data Consent Service converts the consents in the status ‘requested’ into valid consents and assigns Consent References to them. The Data Consent Service redirects the Representative back to the Client.

7. After the Representative is redirected, the Client asks the Data Consent Service for the Consent References and their validation to find out which consents from the Data Subject are valid.
   
   The queries **getConsentReferences** and **validateConsentForClient** are used (see sections [5.1.2](#getconsentreferences) and [5.1.3.](#validateconsentforclient))

8. Based on the response received, the Client displays a message to the Representative.

**Alternative scenarios and extensions:**

1. The Client verifies that all the necessary consents from the Data Subject are in place and valid.
   
   - The Client provides the Representative with the requested service and requests the necessary data from the Data Provider to provide it. ‘Use case 2: Data query and consent validation (Data Provider)’ is launched (see section [3.3.](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)).

2. The Client asks for a link for the Representative to provide the consents from the Data Subject, even though some of the consents requested were already given previously and are valid.
   
   - The Data Consent Service excludes the valid consents from the Data Subject and does not ask for them again via the generated link.

3. The Client asks for a link to provide consents, even though some of the consents requested were already given previously by the Representative, but have since expired or have been withdrawn by the Representative.
   
   - The Data Consent Service generates new corresponding consents in the status ‘requested’ and allows the Representative to consent to them via a generated link.

4. The Client asks for a link for the Representative to provide consents from the Data Subject, even though at least one of the requested consents is related to an invalid Purpose Declaration (that is, no further data transfer can take place at all on the basis of that Purpose Declaration).
   
   - The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

5. The Client asks for a link to provide consents, even though the query contains the personal identification code of the Representative belonging to a minor and/or an incapacitated Representative.
   
   - The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

6. The Representative leaves the page without making a decision and without clicking on the ‘Confirm’ button.
   
   - The process ends. If the Representative starts to use the Client again, the process starts again from point 1 of the baseline scenario.

7. The Client asks for a link to provide consents, and some of the consents asked for are linked to a Service Declaration where a digital signature of the consent is required.
   
   - The Data Consent Service generates consents in the status ‘requested’ and allows the Representative to sign them via a generated link.

8. The Client asks for a link to provide consents, but the query contains the personal identification code of a Data Subject belonging to a minor Data Subject.
   
   - The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

9. The Client asks for a link to provide consents, but there is no link between the Data Subject and the Representative included in the query and the Representative is not authorised to represent the Data Subject.
   
   - The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

10. The Client asks for a link to provide consents, but the Data Subject relationship type in the query is not ‘CHILD’.
    
    - The Data Consent Service does not generate the link and responds to the Client with an error message. The process ends.

## Use case 2: Data query and consent validation (Data Provider)

**Figures involved:** Data Provider, Client, Data Consent Service

**Parties and their interests:**

- The Client wants to receive the Data Subject’s data from the Data Provider via a secure service.

- The Data Provider wants to verify, by means of the Data Consent Service, that there is a valid Data Subject’s consent to the transfer of the requested data and that the terms and conditions of the data transfer are correct.

- The Data Consent Service wants to confirm the validity of the necessary consent and to provide the Data Provider with the data necessary to verify the terms and conditions of the data transfer.

**Prerequisites:** the Data Provider knows the identifiers of the Service Declarations associated with its own information systems. The Data Provider has a correlation table that can be used to check which Protected Service each Service Declaration corresponds to.

**Follow-up conditions (in the case of a valid consent):** the Data Provider transmits the data to the Client via the Protected Service.

**Baseline scenario (assuming that the necessary consent is valid):**

1. The Client requests the data from the Data Provider. The data query must contain the relevant Consent Reference and the personal identification code of the Data Subject.

2. The Data Provider sends the Consent Reference to the Data Consent Service for validation. The Data Consent Service validates the Consent Reference and sends a response to the Data Provider containing, in addition to the Consent References, the expiry date of the consent, the identifier of the Client subsystem, the Data Subject’s personal identification code, and the identifier of the Service Declaration associated with the consent. In steps 2 and 3, the ***validateConsentForDataProvider*** query is used (see section [5.1.4.](#validateconsentfordataprovider))

3. The Data Provider checks the following data transmission conditions:
   
   - the identifier of the Client’s subsystem that sent the data query (in the header of the X-tee query) is the same as the one in the response from the Data Consent Service;
   
   - the Data Subject’s personal identification code contained in the Client’s data query is the same as in the response of the Data Consent Service;
   
   - the Protected Service through which the Client is requesting the data matches the Service Declaration identifier contained in the response of the Data Consent Service.

4. If all the verifications are successful, the Data Provider transmits the requested data to the Client.

5. The Data Provider reports the successful transmission of data. The ***reportDataTransmission*** query is used (see section [5.1.5.](#reportdatatransmission)).

**Baseline scenario sequence diagram:**

![Baseline scenario sequence diagram](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image2.png)

**Alternative scenarios:**

1a. The Client’s data query does not contain a Consent Reference.

- The Data Provider responds to the Client with an error message, no data is transferred, and no data transfer is reported.

2a. Such a Consent Reference does not exist in the Data Consent Service.

- Validation failed; the Data Consent Service responds to the Data Provider with an error message.

- The Data Provider responds to the Client with an error message, no data is transferred, and no data transfer is reported.

2b. The Consent Reference refers to a consent that is not valid.

- Validation failed; the Data Consent Service responds to the Data Provider with an error message.

- The Data Provider responds to the Client with an error message, no data is transferred, and no data transfer is reported.

3a. At least one of the verifications has failed.

- The Data Provider responds to the Client with an error message, no data is transferred, and no data transfer is reported.

# Consent status diagram

The following diagram describes the possible statuses of the consent and the transitions between them.

![Consent status diagram](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image3.png)

# Interfacing with the Data Consent Service and the technical specifications of queries

The Data Consent Service provides REST API queries over X-tee.

For all queries received by the Data Consent Service, it is verified that the subsystem authenticated in the X-tee accessing the Data Consent Service is the correct party to make such a query. The Data Consent Service only responds to a query if the requesting party (that is, the Data Provider or the Client) is associated with the consent being verified, either through a subsystem on the Purpose Declaration or a subsystem on the Service Declaration that is always associated with the Purpose Declaration.

**Types of data**

All string-type parameters are UTF-8 encoded characters.

All number-type parameters are a sequence of ASCII codes between 47 and 57 (digits 0–9).

All timestamp-type parameters are timestamps in the ISO 8601 format.

## Technical specifications of the queries used by the Data Provider and the Client

### *getConsentGroupReference*

The query can be submitted to request a link (URL) to the consent(s) from the Data Consent Service, which can be used to redirect the Data Subject to view the consents in the status ‘requested’ and to provide consents.

Used by: Client

**IMPORTANT!** Do not use the same link more than once to redirect the Data Subject, as the old link may display incomplete data. When redirecting a Data Subject, <ins>always</ins> request a new link using the **getConsentGroupReference** query.

Before generating the link, the Data Consent Service checks that the personal identification code contained in the query belongs to a Data Subject who is of legal age and has active legal capacity. To verify active legal capacity, a query is made in the Population Register. A minor and/or a person without active legal capacity cannot give consent. If the personal identification code does not meet these conditions, the link is not generated and an error message is returned.

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent

**Example of a query command (curl):**

```
curl -k  \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent" \
-d "{ \
\"idCode\":\"60001019906\",
\"callback\":\"https://www.ria.ee\",
\"purposeDeclarationBusinessIdentifiers\": [\"EesmärgideklaratsiooniID\"]
}"
```

**Query (Json):**

```
{
  "idCode": "60001019906",
  "callback": "https://www.ria.ee",
  "purposeDeclarationBusinessIdentifiers": [
    "EesmärgideklaratsiooniID"
  ]
}
```

| Parameter| Is it mandatory?| Type of data| Description
|----------|----------|----------|----------
| idCode| yes| string| Personal identification code of the Data Subject
| callback| yes| string| Client redirecting URL
| purposeDeclarationBusinessIdentifiers| yes| array of strings| Purpose Declaration identifier (can be more than one)

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Client’s X-tee subsystem authenticated in the X-tee is the same as specified in the Purpose Declaration(s).

**Response:**

```
{
  "consentGroupReference": "dd74ed1b-a00f-4232-8b25-914d6ecbcb30"
  "url":"http://www.arendus.eesti.ee/nousolek/consent-request?reference=dd74ed1b-a00f-4232-8b25-914d6ecbcb30&callback=https://www.ria.ee"
}
```

| Parameter| Type of data| Description
|----------|----------|----------
| consentGroupReference| string| Reference to consent in the status ‘requested’ -- a unique code used to distinguish consents in the status ‘requested’.
| url| string| URL of the consent(s) through which the Data Subject can provide the consents requested by the Client in the Data Consent Service.

**Error management:**

| Error key| Error code and status| Error description
|----------|----------|----------
| error.validation| VALIDATION (400)| Generic validation error messages (mandatory fields not specified, personal identification code \<>&nbsp;11 characters, non-numeric)
| error.business.requested-consents-not-related-to-any-declarations| REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS (404)| A valid Purpose Declaration and subsystem combination was not found for all requested consents
| error.business.id-code-invalid| ID_CODE_INVALID (500)| The personal identification code does not comply with the standard
| error.business.requested-consents-related-to-invalid-declarations| REQUESTED_CONSENTS_RELATED_TO_INVALID_DECLARATIONS (500)| The consents requested are associated with invalid Purpose Declarations. The requested business identifiers associated with the invalid Purpose Declaration in the Purpose Declaration microservice database are listed in the error description
| error.business.all-requested-consents-have-already-been-approved| ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED (500)| When asking for multiple consents if all the consents found are with the status ‘approved’
| error.business.data-subject-error| DATA_SUBJECT_ERROR (500)| The person is either incapacitated or with limited active legal capacity.

### getConsentReferences

The query can be submitted to ask the Data Consent Service for the Consent Reference of valid consent(s).

Used by: Client

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference

**Example of a query command (curl):**

```
curl -k \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference" \
-d "{ \
\"idCode\": \"60001019906\", \
\"purposeDeclarationBusinessIdentifiers\": [\"EesmärgideklaratsiooniID\", \"ED_KAKS\", \"ED_KOLM\"]
}"
```

**Query (Json):** (the example asks for three Purpose Declarations, but only one has valid consent):

```
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "EesmärgideklaratsiooniID", "ED_KAKS", "ED_KOLM"
  ]
}
```

| Parameter| Is it mandatory?| Type of data| Description
|----------|----------|----------|----------
| idCode| yes| string| Personal identification code of the Data Subject
| purposeDeclarationBusinessIdentifiers| yes| array of strings| Purpose Declaration identifier (can be more than one)

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Client’s X-tee subsystem authenticated in the X-tee is the same as specified in the Purpose Declaration(s).

**Response:**

```
{
  "ED_KAKS": "91e9844d-3b5e-4df8-9254-42316b1607b6"
}
```

Parameter | Type of data | Description ------------ | ------------ | ------------- purposeDeclarationBusinessIdentifier (in the example: "ED_KAKS") | string | Valid Purpose Declaration identifier (can be more than one). Only those for which a valid consent has been found (with the status APPROVED) will be returned consentReference | string | Valid Consent Reference – a unique code used to determine the validity of the consent

**Error management:**

| Error key| Error code and status| Error description
|----------|----------|----------
| error.validation| VALIDATION (400)| Generic validation error messages (mandatory fields not specified, personal identification code \<>&nbsp;11 characters, non-numeric)
| error.http.404| HTTP_NOT_FOUND (404)| No valid consents found (with the status APPROVED)
| error.business.id-code-invalid| ID_CODE_INVALID (500)| The personal identification code does not comply with the standard

### validateConsentForClient

A query can be submitted to ask the Data Consent Service about the validity of the consent.

Used by: Client

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client

**Example of a query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6" 
```

**Query:** https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference= 91e9844d-3b5e-4df8-9254-42316b1607b6

| Parameter| Is it mandatory?| Type of data| Description
|----------|----------|----------|----------
| consentReference| yes| string| Consent Reference – a unique code corresponding to the consent the validity of which is to be determined

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Client’s X-tee subsystem authenticated in the X-tee is the same as specified in the Purpose Declaration associated with the consent.

**Response:**

```
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "idCode": "60001019906",
  "purposeDeclarationId": "ED_KAKS"
}
```

| Parameter| Type of data| Description
|----------|----------|----------
| consentReference| string| Consent Reference – a unique code corresponding to the consent the validity of which is to be determined
| consentExpiration| timestamp (ISO 8601)| Expiry of the consent
| idCode| string| Personal identification code of the Data Subject
| purposeDeclarationId| string| Purpose Declaration identifier associated with the consent

**Error management:**

| Error key| Error code and status| Error description
|----------|----------|----------
| error.validation| VALIDATION (400)| Generic validation error messages (mandatory fields not specified, personal identification code \<>&nbsp;11 characters, non-numeric)
| error.http.404| HTTP_NOT_FOUND (404)| The combination of clientSubsystemIdentifier (the Client’s X-tee subsystem) and consentReference has no valid consent
| error.business.consent-validate-invalid-status| CONSENT_VALIDATE_INVALID_STATUS (500)| The requested consent does not have the ‘approved’ status

### validateConsentForDataProvider

The query can be submitted to ask the Data Consent Service about the validity of the consent and the accompanying data, which allows the Data Provider to check the terms and conditions of the data transfer.

Used by: Data Provider

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/dataprovider

**Example of a query command (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/dataprovider?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6"
```

**Query:** https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/dataprovider?consentReference= 91e9844d-3b5e-4df8-9254-42316b1607b6

| Parameter| Is it mandatory?| Type of data| Description
|----------|----------|----------|----------
| consentReference| yes| string| Consent Reference – a unique code corresponding to the consent the validity of which is to be determined

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Data Provider’s X-tee subsystem authenticated in X-tee is the same as specified in the Service Declaration associated with the consent.

**Response:** (the Purpose Declaration associated with the consent is connected to the Service Declaration with the ID TD_KAKS)

```
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "idCode": "60001019906",
  "clientSubsystemIdentifier": " EE/GOV/70000562/yphis",
  "serviceDeclarationId": "TD_KAKS"
}
```

| Parameter| Type of data| Description
|----------|----------|----------
| consentReference| string| Consent Reference – a unique code corresponding to the consent the validity of which is to be determined
| consentExpiration| timestamp (ISO 8601)| Expiry of the consent
| idCode| string| Personal identification code of the Data Subject. *Note:* the Data Provider must check that the Client’s query for data authenticated in X-tee contains the same personal identification code as indicated in this parameter
| clientSubsystemIdentifier| string| Identifier of the Client’s X-tee subsystem indicated in the Purpose Declaration. *Note:* the Data Provider must check that the Client’s subsystem authenticated in X-tee that sends the data query is the same as the one indicated in this parameter
| serviceDeclarationId| string| Service Declaration identifier associated with the consent. *Note:* the Data Provider must check that the Protected Service through which the Client is requesting data matches the Service Declaration identifier indicated in this parameter

**Error management:** Error key | Error code and status | Error description ------------ | ------------ | ------------- error.validation | VALIDATION (400) | Generic validation error messages (mandatory fields not specified, personal identification code \<>&nbsp;11 characters, non-numeric) error.http.404 | HTTP_NOT_FOUND (404) | The combination of dataProviderSubsystemIdentifier (Data Provider X-tee subsystem) and consentReference has no valid consent error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | The requested consent does not have the ‘approved’ status

### reportDataTransmission

A query can be submitted to notify the Data Consent Service that there has been a consent-based transfer of personal data from the Data Provider to the Client

Used by: Data Provider

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/consent

**Example of a query command (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/consent" \ 
-d "{ \
\"transmissionTimestamp\":\"2021-06-18T13:11:50.085Z\", \
\"consentReference\":\"226cd452-0459-404c-832d-4771bef14af3\"}" 
```

**Query:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/consent

| Parameter| Is it mandatory?| Type of data| Description
|----------|----------|----------|----------
| transmissionTimestamp| yes| timestamp| Time when the data was transferred from the Data Provider to the Client
| consentReference| yes| string| Consent Reference – a unique code corresponding to the consent the validity of which is to be determined

**Important!** Upon receipt of the query, the Data Consent Service verifies that the identifier of the Data Provider’s X-tee subsystem authenticated in X-tee is the same as specified in the Service Declaration associated with the consent.

**Response:**

```
{  
  "response": "success"
}
```

| Parameter| Type of data| Description
|----------|----------|----------
| response| \-| If the query is successful, the message ‘success’ appears.

**Error management:**

| Error key| Error code and status| Error description
|----------|----------|----------
| error.validation| VALIDATION (400)| General validation error messages (mandatory fields not specified)
| error.http.404| HTTP_NOT_FOUND (404)| ConsentReference and the X-tee Client header has no match

### getConsentGroupReferenceRepresentable

A query can be submitted to request a link (URL) to the consent(s) from the Data Consent Service, which can be used to redirect the Representative to view the consents of the Data Subject (the represented person) in the status ‘requested’ and to provide consents.

Used by: Client

**IMPORTANT!**&nbsp;Do not use the same link more than once to redirect the Representative, as the old link may display incomplete data. When redirecting a Representative, <ins>always</ins> request a new link using the **getConsentGroupReferenceRepresentation** query.

Before generating the link, the Data Consent Service checks from the population register the active legal capacity of the Representative and the existence of full rights of custody over the person represented. If the person does not have active legal capacity or full rights of custody, the URL is not generated and an error message is returned (see error messages).

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/representation

**Example of a query command (curl):**&nbsp;

```
curl -X POST \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "X-Road-Client: ee-dev/COM/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/representation" \
-d "{ \
\"callback\":\"https://www.ria.ee\",
\"representativeIdCode\":\"39602235224\",
\"representeeIdCode\":\"52210240059\",
\"relationType\":\"LAPS\",
\"purposeDeclarationBusinessIdentifiers\": [\"EesmärgideklaratsiooniID\"]
}"
```

**Query (Json):**&nbsp;

```
{
  "representativeIdCode": "60001019906",
  "representeeIdCode": "61204040018",
  "relationType": "LAPS",
  "callback": "https://www.ria.ee",
  "purposeDeclarationBusinessIdentifiers": [
    "EesmärgideklaratsiooniID"
  ]
}
```

| Parameter| Is it mandatory?| Type of data| Description
|----------|----------|----------|----------
| representativeIdCode| yes| string| Personal identification code of the Representative
| representeeIdCode| yes| string| Personal identification code of the represented person or Data Subject
| relationType| yes| string| The represented person’s relationship with the Representative. E.g. if a parent (representative) represents a child (represented person), then the relationship type is ‘CHILD’. <br /> Possible values (value of the classifier): ‘CHILD’
| callback| yes| string| Client redirecting URL
| purposeDeclarationBusinessIdentifiers| yes| array of strings| Valid Purpose Declaration identifier (can be more than one)

**Important!**&nbsp;Upon receipt of the query, the Data Consent Service verifies that the identifier of the Client’s X-tee subsystem authenticated in the X-tee is the same as specified in the Purpose Declaration(s).

**Response:**

```
{
  "url":
  "https://www.arendus.eesti.ee/nousolek/et/consent-request?reference=0e6d7675-0588-4413-a835-cd22ebf582c3&callback=https://www.ria.ee\",
  "consentGroupReference":"0e6d7675-0588-4413-a835-cd22ebf582c3"
}
```

| Parameter| Type of data| Description
|----------|----------|----------
| url| string| URL of the consent(s) through which the Representative can provide the consents on behalf of the Data Subject requested by the Client in the Data Consent Service.

**Error management:**

| Error key| Error code and status| Error description
|----------|----------|----------
| error.validation| VALIDATION (400)| Generic validation error messages (mandatory fields not specified, personal identification code \<>&nbsp;11 characters, non-numeric)
| error.business.requested-consents-not-related-to-any-declarations| REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS (404)| A valid Purpose Declaration and subsystem combination was not found for all requested consents from the represented person
| error.business.id-code-invalid| ID_CODE_INVALID (500)| The personal identification code does not comply with the standard&nbsp;
| error.business.requested-consents-related-to-invalid-declarations| REQUESTED_CONSENTS_RELATED_TO_INVALID_DECLARATIONS (500)| The consents requested from the represented person are associated with invalid Purpose Declarations. The requested business identifiers associated with the invalid Purpose Declaration in the Purpose Declaration microservice database are listed in the error description
| error.business.all-requested-consents-have-already-been-approved| ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED (500)| When asking for multiple consents if all the consents from the represented person found are with the status ‘approved’
| error.business.data-subject-error| DATA_SUBJECT_ERROR (500)| According to the data in the population register, the Representative is either with limited or no active legal capacity or the population register service returned an error.
| error.business.represented_person-not-minor| REPRESENTED_PERSON_NOT_MINOR (500)| The represented person is not a minor
| error.business.representation_error| RR_REPRESENTATION_ERROR (500)| According to the data in the population register, the Representative does not have full rights of custody over the represented person or the status of the Representative is incorrect.
| error.business.relation-type-error| RELATION_TYPE_INVALID (400)| Incorrect relationType value (no such classification exists)

### postConsentFilterByStatus

Services using the Data Consent Service will need to obtain a record of withdrawn or valid consents from the relevant service. A query is created for this purpose, where the requester provides input on the statuses to be searched (valid/invalid/valid and invalid) and a list of consent identifiers and receives a list of Consent References and consent statuses.

Used by: Client

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/filter-by-status

**Example of a query command (curl):**&nbsp;

```
curl -X POST \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "X-Road-Client: ee-dev/COM/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/filter-by-status" \
-d "{ \
\"consentStatus\": [\"VALID\", \"INVALID\"], \
\"consentReferences\": [ \
  \"226cd452-0459-1111-832d-4771bef14af3\", \"226cd452-0459-2222-832d-4771bef14af3\", ... , \"226cd452-0459-3333-832d-4771bef14af3\", \"invalid-reference\" \
] \
}"
```

**Query (Json):**&nbsp;

```
{
  "consentStatus": ["VALID", "INVALID"],
  "consentReferences": [
    "226cd452-0459-1111-832d-4771bef14af3",
    "226cd452-0459-2222-832d-4771bef14af3",
    ... ,
    "226cd452-0459-3333-832d-4771bef14af3",
    "invalid-reference"
  ]
}
```

| Parameter| Is it mandatory?| Type of data| Description
|----------|----------|----------|----------
| consentStatus| yes| array of string| a reference to the status of the searched consents. Values: VALID, INVALID.
| consentReferences| yes, must not be blank| Consent Reference – a unique code corresponding to the consent the validity of which is to be determined. A list of Consent References will be provided. The maximum number of entries in a query is 5,000.
| consentReferences| yes| array of string| Consent Reference – a unique code corresponding to the consent the validity of which is to be determined. A list of Consent References will be provided

**Important!**&nbsp;Upon receipt of the query, the Data Consent Service verifies that the identifier of the Client’s X-tee subsystem authenticated in the X-tee is the same as specified in the Purpose Declaration(s).

**Response:**

```
{
  "consent": [
    {
      "consentReference": "226cd452-0459-1111-832d-4771bef14af3",
      "consentStatus": "APPROVED",
      "consentExpiration": "2026-12-18T23:59:59.99999Z",
      "idCode": "30101011111",
      "purposeDeclarationId": "ed_test12"
    },
    {
      "consentReference": "226cd452-0459-2222-832d-4771bef14af3",
      "consentStatus": "EXPIRED",
      "consentExpiration": "2024-12-18T23:59:59.99999Z",
      "idCode": "40101011111",
      "purposeDeclarationId": "ed_test12"
    },
    ...
    ,
    {
      "consentReference": "226cd452-0459-3333-832d-4771bef14af3",
      "consentStatus": "APPROVED",
      "consentExpiration": "2027-12-18T23:59:59.99999Z",
      "idCode": "30101012222",
      "purposeDeclarationId": "ed_test12"
    },
  ],
  "invalidConsents": [
    "invalid-reference"
  ]
}
```

The system outputs the results according to the consentStatus selection:

1. If VALID is selected, values with consent.status APPROVED will be output.

2. If INVALID is selected, values with consent.status DECLINED, INAPPLICABLE, or EXPIRED will be output.

3. If VALID, INVALID is selected, values with consent.status of APPROVED, DECLINED, INAPPLICABLE, or EXPIRED are output.

| Parameter| Type of data| Description
|----------|----------|----------
| consent| array| List of Consent objects
| invalidConsents| array| Optional. A list of Consent References based on an input to which the consumer of the service did not have access or if the entry does not exist.

**Consent**

| Parameter| Type of data| Description
|----------|----------|----------
| consentReference| string| Consent reference – a unique code corresponding to the consent the validity of which is to be determined
| consentStatus| string| Consent status.
| consentExpiration| timestamp (ISO 8601)| Expiry of the consent.
| idCode| string| Personal identification code of the Data Subject.
| purposeDeclarationId| string| Purpose Declaration identifier associated with the consent.

**Error management:**

| Error key| Error code and status| Error description
|----------|----------|----------
| error.validation| VALIDATION (400)| Generic validation error messages (mandatory fields not specified, data type does not match)

# Instructions for the interface testing of the Data Consent Service

The purpose of the interface testing is to make sure that the information system(s) to be interfaced are ready to exchange consent data with the Data Consent Service. The tests are described at the API challenge level, which gives the possibility for the connected party to test both directly via the API (earlier in the development phase) and via its own user interface.

The tests cover the functionality associated with consents and are organised in such a way that the baseline scenario tests are described first, followed by the error management tests. The most relevant error management tests have been selected to allow the interfacing system to verify its error management performance. If desired, commercially irrelevant tests can be omitted, or tests relevant to the specificity of your service can be added.

A prerequisite for the tests is the existence of a Service Declaration (SD) (together with the information system) and of (a) Purpose Declaration(s) (PD) using it (them) in the Data Consent Service. Their input is currently not part of the scope of the tests, as this can be done through the Data Consent Service user interface.

However, for the information system, the Service Declaration, and the Purpose Declarations used in the tests, it is important to keep in mind that the data entered should be as realistic as possible, that is, as close as possible to what they will be in the working environment. For an overview of the logic of the states of the consents, please refer to the status diagram in Chapter 4.

The Expired and Inapplicable scenarios are not included in the tests, as they are automatically triggered in the Data Consent Service according to the expiration dates of the declarations and consents. It is possible to test them, if desired, by entering the appropriate dates in the Service Declaration and the Purpose Declaration (that is, expiration: tomorrow, maximum duration of the consent on the Service Declaration: 1 day) and by giving consents and monitoring the change of the state of the consents when they expire.

## Creating a consent URL and displaying information on consents in the status ‘requested’ (primary and recurring)

*Test case 1 Generating the consent URL and viewing the consent information (1 Purpose Declaration)*

| N| Activity| Expected result
|----------|----------|----------
| 1| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReference . with the correct input parameters (personal identification code, PD identifier, and X-tee subsystem)| Verify that the URL of the consents returned can be used in the next step
| 2| Use the Consent Reference received to view the consents requested in the Data Consent Service| Verify that the consent is returned with the REQUESTED status according to the personal identification code, SD, and PD data that were the input parameter

*Test case 2 Generating the consent URL and viewing the consent information (multiple Purpose Declarations – carry out if there is a substantial need for such scenarios)*

| N| Activity| Expected result
|----------|----------|----------
| 1| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReference . with the correct input parameters (personal identification code, more than one PD identifier, and the X-tee subsystem). The input PDs must be associated with the same subsystem.| Verify that the URL of the consents returned can be used in the next step
| 2| Use the Consent Reference received to view the consents requested in the Data Consent Service| Verify that consent is returned with the REQUESTED status according to the personal identification code, SD, and PD data that were the input parameter

*Test case 3 Generating the consent URL if a consent in the status ‘requested’ or a consent is already in place for the given personal identification code, PD, and X-tee subsystem (in different statuses)*

Precondition: in order to test the logic for asking/not asking for consents again, it is important that the information system has consents created in different states, because the logic depends on them. It is possible to test with one Purpose Declaration at a time or with more than one (depending on how the use case looks in real terms)

| N| Activity| Expected result
|----------|----------|----------
| 1| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api /consent/getConsentGroupReference . with the correct input parameters (personal identification code, PD identifier, and X-tee subsystem), if an APPROVED consent is already in place for this combination. The input PDs must be associated with the same subsystem.| Verify that the error ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED is returned
| 2| Like step 1, but the consent in place is REQUESTED| Verify that the new ConsentGroupReference is returned to the existing consent in the status ‘requested’
| 3| Like step 1, but the consent in place is either DECLINED or EXPIRED| Verify that a new consent is generated with the new ConsentGroupReference

*Test case 4 Consent URL – alternative scenarios*

| N| Activity| Expected result
|----------|----------|----------
| 1| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReference with a personal identification code that does not comply with validation rules (non-numeric, incorrect verification number, shorter/longer than 11 characters), other input parameters are correct.| For an incorrect verification number, check the error message with the code ID_CODE_INVALID, for a format error with VALIDATION
| 2| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReference with an unknown PD identifier, the other parameters are correct| Check the error message with the code PURPOSE_DECLARATIONS_NOT_FOUND
| 3| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReference with an X-tee subsystem that does not match the subsystem used in the PD, the other input parameters are correct| Check the error message with the code PURPOSE_DECLARATIONS_NOT_FOUND

## Approving and declining consent

Test cases for consent approval and refusal are not listed at the API challenge level, as these functionalities are implemented in the Data Consent Service user interface.

In order to make sure that the Client and the Data Consent Service are able to exchange data correctly and to learn how the Data Consent Service works, at least the following scenarios should be run:

1. Consent approval -- the user gives the corresponding consents to the Consent References requested in the tests described in chapter 6.1 and verifies that the consents are valid

2. Refusing to provide the consent – the user does not give the consents corresponding to the Consent References requested in the tests described in chapter 6.1, and it is verified that the consents are displayed again via the same link

3. Consent withdrawal -- withdrawing the consents given in previous tests, and it is verified that the consent has been withdrawn.

## Consent references query

*Test case 8 Consent References query*

| N| Activity| Expected result
|----------|----------|----------
| 1| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentReferences on a set of inputs (personal identification code, PD identifier, X-tee subsystem) with valid prior consents| Verify that only Consent References with an APPROVED state with a PD identifier are returned.
| 2| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentReferences in the absence of valid consents for a given set of inputs, there are consents in other statuses (personal identification code, PD identifier, X-tee subsystem)| Verify that HTTP_NOT_FOUND is returned

*Test case 9 Consent References query – alternative scenarios*

| N| Activity| Expected result
|----------|----------|----------
| 1| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentReferences if there is no valid consent for the set of input parameters| Verify that HTTP_NOT_FOUND is returned

## Validation of consents (Client Application and Data Provider)

*Test case 10 Validation of consents (for the Client and Data Provider)*

Prerequisite: in order to validate consents, it is ideally necessary to create consents with different statuses (REQUESTED, APPROVED, DECLINED, EXPIRED, INAPPLICABLE), but for the initial validation logic test, the APPROVED consent is sufficient, and for the alternative scenario test, one DECLINED, EXPIRED, or INAPPLICABLE consent (non-valid consents all behave in the same way).

| N| Activity| Expected result
|----------|----------|----------
| 1| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client/validateConsentForClient with matching clientSubsystemIdentifier and consentReference if the corresponding consent is in the APPROVED status| Verify that the consent data is returned (consentReference, consentExpiration, idCode, purposeDeclarationID)
| 2| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client/validateConsentForClient with matching dataProviderSubsystemIdentifier and consentReference if the corresponding consent is in the APPROVED status| Verify that the consent information is not returned
| 3| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client/validateConsentForDataProvider with matching dataProviderSubsystemIdentifier and consentReference if the corresponding consent is in the APPROVED status| Verify that the consent data is returned (consentReference, ConsentExpiration, idCode, clientSubsystemIdentifier, serviceDeclarationID)
| 4| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client/validateConsentForClient with matching dataProviderSubsystemIdentifier and consentReference if the corresponding consent has a status other than APPROVED| Verify that the consent information is not returned

## Reporting on successful data queries based on consents (Data Provider)

*Test case 11 Reporting of data queries based on consents (reported by the Data Provider)*

Prerequisite: there is a consent to be reported

| N| Activity| Expected result
|----------|----------|----------
| 1| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/reporting/consent/createConsentReport with the existing consentReference of the consent, and the subsystem in the X-tee query that matches the requesting subsystem.| Verify that a ‘success’ response is returned and it is possible to check for the presence of a reporting entry in the Data Consent Service
| 2| Launch https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/ reporting/consent/createConsentReport with a consentReference which does not exist and the subsystem in the X-tee query that matches the requesting subsystem.| Verify the error management, reporting entry does not appear in the Data Consent Service

# Instructions for using the Data Consent Service management interface

The Data Consent Service management interface is designed for the management of Purpose Declarations, Service Declarations, and related information systems (Data Provider).

**General principles**

- Before declarations can be submitted, the necessary information systems must be included in the Data Consent Service.

- First, a Service Declaration is submitted, followed by a Purpose Declaration.

- If a Service Declaration is already in place for the required service, there is no need to declare it again – the existing Service Declaration can be used.

- Several Service Declarations may be associated with one information system. Several Purpose Declarations may be associated with one Service Declaration.

- For each different set of data, a separate Service Declaration has to be declared, even if the data comes from the same service.

- In the case where the Client requires the data described in more than one Service Declaration, several corresponding Purpose Declarations must be declared. A single Purpose Declaration may be associated with only one Service Declaration.

![Logical associations between information systems and declarations](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image4.png)

## Roles

| Role| Description| What views are seen
|----------|----------|----------
| RIA administrator| The RIA administrator adds/removes users (other RIA administrators and information system administrators) and assigns permissions: each information system administrator is assigned, under their responsibility, a registry code (or multiple registry codes), which is selected from a drop-down menu with all the registry codes (member code) obtained from the X-tee directory. <br /> <br /> The RIA administrator can also be an information systems administrator, if they assign such a role for themselves. In this case, they must have access to views visible to both the RIA administrator and the information systems administrator.| •	Administration of the management interface users <br /> •	Integrity of the consents
| Information systems administrator (Data Provider’s representative)| The primary user of the Data Consent Service management interface. <br /> <br /> The information systems administrator adds, modifies, and deletes information systems within the scope of the registry code(s) under their responsibility. When adding/changing an information system, they will only see the subsystems in the subsystem selection that are associated with the registry codes assigned to them. <br /> <br /> Keeps statistics within the scope of the registry code(s) under their responsibility. <br /> <br /> If the ‘RIA administrator statistics’ option is ticked, statistics can be produced for the entire information system. This option is used by RIA administrators. <br /> <br /> Several information system administrators can be responsible for one information system. Each administrator can add/modify/delete the information systems under their responsibility. Each information system administrator has access to all those information systems and declarations for which the registry code in the subsystem identifier = the member code associated with their user. If an information system administrator user account is deleted, the information systems entered by them remain. <br /> <br /> The information system administrator submits and manages the Service Declarations associated with the information systems under their responsibility. <br /> <br /> The information system administrator submits and manages the Purpose Declarations under their responsibility. The information system administrator is able to associate Purpose Declarations only with Service Declarations under their responsibility.| •	Summary view of information systems <br /> •	Adding an information system <br /> •	Modifying an information system <br /> •	Summary view of Service Declarations <br /> •	Submitting a Service Declaration <br /> •	Detailed view of a Service Declaration <br /> •	Modifying a Service Declaration <br /> •	Summary view of Purpose Declarations <br /> •	Submitting a Purpose Declaration <br /> •	Detailed view of a Purpose Declaration <br /> •	Modifying a Purpose Declaration <br /> •	Statistics view

## Information systems management

The management interface of the Data Consent Service registers the data of information systems providing protected services. This data is automatically entered into the corresponding fields in the Service Declarations, simplifying the declaration process.

### Views associated with the management of information systems

The following views are associated with the inclusion and management of information systems in the Data Consent Service management interface:

**List of information systems**

An overview of all added information systems that the user has the right to manage. It allows the list of information systems to be sorted by the data in the different columns.

The following actions can be performed on each declaration:

‘Edit’ – open the information system detailed view and edit the information system data.

‘Delete’ – perform a logical deletion of the information system. The deletion is only possible if there are no valid Service Declarations associated with the information system.

![List of information systems](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image5.jpg)

**Adding an information system**

The form for adding a new information system. The data to be entered is described in detail in section [7.2.2](#infosüsteemi-andmed).

![Adding an information system](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image6.jpg)

**Modifying an information system**

A view that allows you to modify the data of the information system. Changing the data of the information system does not affect the associated Service Declarations – the data will remain as it is. New Service Declarations will be created using the new data.

![Modifying an information system](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image7.jpg)

### Information system data

| Field name| Description| Example value| Can it be changed?
|----------|----------|----------|----------
| Name of the information system| Name of the information system providing the protected services (data).| Health information system| Yes
| Subsystem using the Data Consent Service| The subsystem corresponding to the information system that will access the Data Consent Service. <br /> <br /> Only one subsystem can be selected for each information system. <br /> <br /> There is a ‘one to one’ relationship between the information system and the subsystem.| EE/GOV/70009770/digilugu| Yes
| Data controller (owner)| Official name of the data controller’s (owner’s) organisation. <br /> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el| Ministry of Social Affairs| Yes
| Registry code of the data controller| Registry code of the data controller’s (owner’s) organisation.| 70001952| Yes
| Data processor (optional field)| Official name of the data processor’s organisation. <br /> https://akit.cyber.ee/term/12750 <br /> If there is no data processor, the field is left blank.| TEHIK| Yes
| Registry code of the data processor (optional field)| Registry code of the data processor’s organisation. <br /> If there is no data processor, the field is left blank.| 70009770| Yes

## Service Declarations management

A Service Declaration (SD) describes a Protected Service provided by an information system (the Data Provider), the use of which requires the Data Subject’s consent. Some of the data in the Service Declaration is displayed to the Data Subject when consent is given (see section [8](#nõusoleku-mall)).

### Views associated with the management of Service Declarations

The following views are associated with the submission and management of Service Declarations in the Data Consent Service management interface:

**List of Service Declarations**

Overview of all submitted Service Declarations. It allows the list of declarations to be sorted by the data in the different columns and filtered by information systems and statuses.

The following actions can be performed on each declaration:

‘View’ – open a detailed view of the declaration with all its data.

‘Change to invalid’ – change the status of the Service Declaration to INVALID, and make all associated Purpose Declarations and associated consents invalid.

‘Clone’ – use the declaration as a template for a new declaration – the new declaration submission form will be automatically filled with the data of the cloned declaration for further editing.

![List of Service Declarations](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image8.jpg)

**Submitting a Service Declaration**

The form for submitting a new Service Declaration. The data to be entered is described in detail in section [7.3.2.](#teenusedeklaratsiooni-andmed)

![Submission of a Service Declaration](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image9.jpg)

**Detailed view of a Service Declaration**

It displays the data associated with the Service Declaration – both basic and metadata. It also displays the number of valid Purpose Declarations and the number of valid consents associated with a given Service Declaration.&nbsp;In the detailed view, a request can be made to modify the data of a valid declaration by clicking on the ‘Modify declaration data’ button.

![Detailed view of a Service Declaration](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image10.jpeg)

**Modifying a Service Declaration**

A view that allows to partially modify the data of a valid Service Declaration. Fields which may/may not be changed are described in section [7.3.2.](#teenusedeklaratsiooni-andmed)

![Modifying a Service Declaration](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image11.jpeg)

### Service Declaration data

| Field name| Description| Example value| Can it be changed?
|----------|----------|----------|----------
| Information system providing the service| A drop-down menu containing the names of the information systems included in the Data Consent Service. In the SD submission form, one of these options is selected – the information system providing the service to be declared.| Health information system| No
| Subsystem using the Data Consent Service| The subsystem corresponding to the selected information system that will access the Data Consent Service. The parameter to verify that the Data Provider’s subsystem authenticated in the X-tee accessing the Data Consent Service is the correct party to make such a query. (This field will be filled in automatically when the information system providing the service is selected)| EE/GOV/70009770/digilugu| No
| Data controller (owner)| Official name of the data controller’s (owner’s) organisation <br /> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el (This field will be filled in automatically when the information system providing the service is selected)| Ministry of Social Affairs| No
| Registry code of the data controller| Registry code of the data controller’s (owner’s) organisation. (It will be filled in automatically when the information system providing the service is selected)| 70001952| No
| Data processor| Official name of the data processor’s organisation <br /> https://akit.cyber.ee/term/12750 (It will be filled in automatically when the information system providing the service is selected)| TEHIK| No
| Registry code of the data processor| Registry code of the data processor’s organisation. (It will be filled in automatically when the information system providing the service is selected)| 70009770| No
| Identifier of the Service Declaration| Unique human-readable identifier of the Service Declaration| hl7_immuniseerimisandmed| No
| Name of the Service Declaration| A short name of the data content to be transferred via the declared service (visible to the Data Subject as the title of the consent data set)| Immunisation data| Yes
| Technical specifications of the service| Technical specifications of the service. Within the MVP scope – an informative field for internal use.| X-tee service ‘hl7’ query, HL7 OID: 1.3.6.1.4.1.28284.6.1.1.35| Yes
| X-tee service to be used| Service to be declared. Within the MVP scope – an informative field for internal use.| EE/GOV/70009770/digilugu/ImmuniseerimistePäring/v4| No
| Description of the data content of the service| Human-readable description of the service. Data to be returned, service content, etc. To be displayed when consent is given to the Data Subject.| Data associated with immunisations: <br /> •	disease immunised against, <br /> •	date of immunisation, <br /> •	immunological product, <br /> •	batch number, <br /> •	dose administered, <br /> •	number of doses, <br /> •	next immunisation as of, <br /> •	health care organisation, <br /> •	ATC code of the immunological product and name(s) of the active substance(s).<br />| Yes
| Maximum period of validity of the consent| Maximum number of days the Data Subject’s consent can be valid from the moment the consent is given. On this basis, the expiry date of the consent is calculated and indicated to the Data Subject at the time of giving the consent.| 60| Yes
| Expiry date of the Service Declaration| The SD expiry date can be unspecified (the SD will be valid until it is manually invalidated) or a specific selected date (when the SD expires, the associated PD will also become invalid).| 15 May 2022| Yes
| Consent requires a signature:| Does the consent need to be digitally signed? <br />Once the entry has been made and the declaration has been submitted, the entry cannot be changed. <br />If the option is ticked, the following options are displayed: <br /> •	Withdrawal of consent requires a signature; <br /> •	Generate JSON from the consent metadata.| Yes/No| No
| Withdrawal of consent requires a signature| If consent is withdrawn, it must be digitally signed. <br />Once the entry has been made and the declaration has been submitted, the entry cannot be changed.| Yes/No| No
| Generate JSON from consent metadata| Is a JSON file generated from the consent metadata when the consent is signed and uploaded to the DigiDoc container? <br />Once the entry has been made and the declaration has been submitted, the entry cannot be changed.| Yes/No| No
| Extension of consent allowed| Is the extension of confirmed/signed consents allowed?| Yes/No| Yes
| Date of declaration| Date of creation of the SD. The PD always enters into force as of the date of submission.| 9 June 2023| No
| Declaration form completed by| The information systems administrator (name and role in the system) who completed the SD submission form.| Mart Mets (Information System Administrator)| No
| Last amended| Date since the SD data was last amended| 9 June 2023| No
| Last person to amend| The information systems administrator (name and role in the system) who last modified the SD data| Mart Mets (Administrator)| No
| Status| SD state. Possible states: VALID and INVALID (see section 7.2.3.)| valid| Only to invalid

### Status diagram of the Service Declaration

![Status diagram of the Service Declaration](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image12.png)

## Purpose Declarations management

The Purpose Declaration (PD) describes the data recipient (the Client) and the purpose for using the protected data service. Some of the data in the Purpose Declaration is displayed to the Data Subject at the time of consent (see section [8](#nõusoleku-mall)).

### Views associated with the Purpose Declarations management

The following views are associated with the submission and management of Purpose Declarations in the Consent Service management interface:

**List of Purpose Declarations**&nbsp;

Overview of all the Purpose Declarations that have been submitted. It allows to sort the list of declarations by the data in the various columns, filter by status, and search for declarations by the declarant’s name.&nbsp;

The following actions can be performed on each declaration:

- ‘*View*’ – open a detailed view of the declaration with all its data.

- ‘*Change to invalid*’ – change the status of the Purpose Declaration to INVALID and also make all associated consents invalid.

- ‘*Clone*’ – use the declaration as a template for a new declaration – the new declaration submission form will be automatically filled with the data of the cloned declaration for further editing.

![List of Purpose Declarations](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image13.jpg)

**Submitting a Purpose Declaration**

Form for submitting a new Purpose Declaration. The data to be entered is described in detail in section [7.4.2.](#eesmärgideklaratsiooni-andmed)

![Submitting a Purpose Declaration](https://raw.githubusercontent.com/e-gov/NT/refs/heads/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/Eesm%C3%A4rgideklaratsiooni%20esitamine.PNG)

**Detailed view of a Purpose Declaration**

It displays the data associated with the Purpose Declaration – both basic and metadata. &nbsp;It also displays the number of valid consents associated with a given Purpose Declaration. In the detailed view, a request can be made to modify the data of a valid declaration by clicking on the ‘Modify declaration data’ button. By clicking on the ‘Download’ button, it is possible to download the Purpose Declaration data in CSV format.

![Detailed view of a Purpose Declaration](https://raw.githubusercontent.com/e-gov/NT/refs/heads/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/Eesm%C3%A4rgideklaratsiooni%20detailvaade.PNG)

**Modifying a Purpose Declaration**

A view that allows to partially modify the data of a valid Purpose Declaration. Fields which may/may not be changed are described in section [7.4.2.](#eesmärgideklaratsiooni-andmed)

![Modifying a Purpose Declaration](https://raw.githubusercontent.com/e-gov/NT/refs/heads/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/Eesm%C3%A4rgideklaratsiooni%20muutmine.PNG)

### Purpose Declaration data

| Field name| Description| Example value| Can it be changed?
|----------|----------|----------|----------
| Name of the data recipient| Official name of the company/organisation of the Client (PD declarant)| Health Startup OÜ| No
| Registry code of the data recipient| Registry code of the company/organisation of the Client (PD declarant)| 12819685| No
| Subsystem using the Data Consent Service| The Client’s subsystem that will access the Data Consent Service. The parameter to verify that the Client’s subsystem authenticated in the X-tee accessing the Data Consent Service is the correct party to make such a query. The drop-down menu contains all subsystems from the X-tee directory and supports autocomplete search.| EE/COM/12819685/immu| No
| Service provided by the data recipient| The trade name of the Client or its business service. It provides the Data Subject with information about which specific business service/information system will use their personal data.| Immu| No
| Service Declaration to be used| A Service Declaration (Information system name-SD identifier) declaring a Protected Service providing the data necessary to fulfil the purpose. <br /> <br /> The selection of the Service Declaration (SD) is done in two steps: <br /> <br /> 1) Selection of the information system (associated with the SD) – drop-down menu containing the names of the information systems added via ‘Information systems management’. <br /> <br /> 2) Selecting a SD identifier – drop-down menu containing the identifiers of the valid Service Declarations associated with the information system selected in the previous step. <br /> <br /> Only one SD can be associated with one PD.| Health information system-hl7_immunisation data| No
| Identifier of the Purpose Declaration| Unique human-readable identifier of the Purpose Declaration| healthstartup_immunisation data| No
| Name of the Purpose Declaration| A human-readable short name of the purpose of the use of the data to be declared.| Health Startup immunisation data| Yes
| Purpose of the use of data| Description of the purposes for which the Data subject’s data are used.| Allowing the Health Information System to transfer your immunisation data to Health Startup OÜ will enable to provide you with the vaccination advice and reminder service Immu. <br /> <br /> Health Startup OÜ will use the immunisation data obtained from the Health Information System to assess your personal vaccination needs and, based on these, will draw up the necessary vaccination plan by connecting the data entered by the user with nationally collected immunisation data. In this way, vaccination recommendations can be provided based on a person’s location, travel plans, health status, predicted tick season, etc., always taking into account the person’s previous immunisations. <br /> <br /> Health Startup OÜ will use the immunisation data from the Health Information System only for the purpose of providing the Immu service described above, and will delete all personal data at the user’s request.| Yes
| Data protection conditions of the recipient of the data| Data protection conditions for the Client or its business service (to be included as a link)| https://andmekaitsetingimused.ee| Yes
| Expiry date of the Purpose Declaration| The expiry date of the PD is either set to the same date as the expiry date of the SD (it can also be ‘unspecified’), or a separate date is selected for the PD.| undetermined| No
| Date of declaration (determined automatically)| Date of creation of the PD. The PD always enters into force as of the date of submission.| 9 June 2023| No
| Declaration form filled by (determined automatically)| The information systems administrator (name and role in the system) who completed the PD submission form.| Mart Mets (Information System Administrator)| No
| Last amended (determined automatically)| Date since the PD data was last amended.| 9 June 2023| No
| Last person to amend (determined automatically)| The information systems administrator (name and role in the system) who last modified the PD data| Mart Mets (Information System Administrator)| No
| Status| PD state. Possible states: VALID and INVALID (see section 7.3.3.)| valid| Only to invalid

### Status diagram of the Purpose Declaration

![Status diagram of the Purpose Declaration](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image17.png)

## Statistics

The Statistics menu is intended to provide statistics on declarations and related consents in the administrative interface. Statistics can be made by all information system administrators within their administrative area, and by users marked ‘RIA administrator statistics’ across the system.

The information system and/or the name of the data recipient must be selected to produce statistics:

- Information System -- Information Systems are displayed according to the organisations within their area of responsibility. If the user is marked as ‘RIA administrator statistics’, then Information Systems from across the system are displayed in the selection. 1-n values can be selected.

- Recipient of the data -- Company search field by name of data recipient. You can search by data recipients within the limits of the organisations under your responsibility. If the user is marked as ‘RIA administrator statistics’, then data recipients are searched from across the system. You can search by one value at a time.

### Statistics output

In the statistics results table, you can view statistics by selected information system and/or data recipient. It allows you to sort statistical data by different columns.

![Statistics output](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image31.png)

### Statistical data

| Field name| Description
|----------|----------
| Information System/Service provider| The name of the Information System providing the service to be declared.
| Data recipient| Name of the company of the Client (PD declarant))
| Valid Service Declarations| Total amount of valid Service Declarations.
| Valid Purpose Declarations| Total amount of valid Service Declarations by information systems and by companies.
| Valid consents| Total sum of valid consents by information systems and by companies
| Validated consents| The total amount of validated (i.e. confirmed) consents by information systems and by companies. <br /> <br />The number of validated consents includes all consents that have been validated and whose status may have already changed. E.g. expired, withdrawn, etc. Does not include pending consents.
| All consents| Total sum of all consents by information systems and by companies, regardless of their status.
| Total| Total sums.

# Consent template

The following table describes the data contained in the consent.

| Data field| Example| Source
|----------|----------|----------
| Name of the Data Subject| Jaan Tamm| consent
| Personal identification code of the Data Subject| 39155555454| consent
| Name of the Data Provider or information system (data supplier)| Health information system| Service Declaration
| Name and registry code of the chief processor of personal data (Data Provider or information system administrator)| Ministry of Social Affairs (70001952)| Service Declaration
| Name and registry code of the authorised processor of personal data| TEHIK (70009770)| Service Declaration
| Data recipient| Health Startup OÜ| Purpose Declaration
| Service provided by the data recipient (trade name)| Immu| Purpose Declaration
| Personal data (description of data content)| Data associated with immunisations:  <br /> <br /> •	disease immunised against, <br /> •	date of immunisation, <br /> •	immunological product, <br /> •	batch number, <br /> •	dose administered, <br /> •	number of doses, <br /> •	next immunisation as of, <br /> •	health care organisation, <br /> •	ATC code of the immunological product and name(s) of the active substance(s).| Service Declaration
| Purpose of the use of data| Allowing the Health Information System to transfer your immunisation data to Health Startup OÜ will enable to provide you with the vaccination advice and reminder service Immu. <br /> <br /> Health Startup OÜ will use the immunisation data obtained from the Health Information System to assess your personal vaccination needs and, based on these, will draw up the necessary vaccination plan by connecting the data entered by the user with nationally collected immunisation data. In this way, vaccination recommendations can be provided based on a person’s location, travel plans, health status, predicted tick season, etc., always taking into account the person’s previous immunisations. <br /> <br /> Health Startup OÜ will use the immunisation data from the Health Information System only for the purpose of providing the Immu service described above, and will delete all personal data at the user’s request.| Purpose Declaration
| Data protection conditions of the recipient of the data| https://andmekaitsetingimused.ee| Purpose Declaration
| Validity of consent| from 23 December 2024 <br /> until 20 February 2025| consent (validity period calculated as: date of consent + maximum consent validity in days (from the Service Declaration))

# Data Consent Service user interface

The user interface for the Data Subject (ordinary user), including the Representative, of the Data Consent Service has been implemented as a separate web application, which is part of the eesti.ee portal. The user interface of the Data Consent Service for the Data Subject and the Representative consists of two parts: consent approval and consent management.

## Consent approval

The Data Subject will be able to access the consent in the status ‘requested’ and give the necessary consents through a unique link to which they are directed from the Client.

### Before being redirected

Each time the Client wishes to direct the Data Subject or the Representative to provide consents, it must request a new link from the Data Consent Service with the necessary set of consent requests. If the Data Subject is going to provide consents, a new link is requested using the ***getConsentGroupReference*** API (see section&nbsp;[5.1.1](#getconsentgroupreference)), and in the case of the Representative, the ***getConsentGroupReferenceRepresentable*** service is used (see section [5.1.6.](#getconsentgroupreferencerepresentable))

Prior to being redirected to the Data Consent Service, the Client must inform the Data Subject or the Representative of the need to provide consent(s), the conditions for data processing, and the forthcoming redirection to the Data Consent Service.

Sample text:

> In order to use service X, we need your consent on the portal eesti.ee/nousolek to request the necessary data from the Y information system.
> 
> If you allow the state to provide us with your data, we will be responsible for processing them as set out in our **Privacy Policy (link)**.  
**Why do we need it and why is it useful for you? (link)**
> 
> Give my consent:
> 
> **\[button]**

### In the Data Consent Service

Before accessing the Data Consent Service, the Data Subject or Representative authenticates themselves via TARA, using one of the login methods provided.

![TARA](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/autentimise%20avakuva.PNG)

After authentication, the Data Subject or the Representative will see the consent requests. In this example, consent is requested for the transfer of only one set of data: Health consultation data.

![Consent requests](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/NT%20taotlus.PNG)

By clicking on the names of the parties, you can see detailed information about each party.

Please note! If consent is given on behalf of a represented person, the person giving consent is the represented person, i.e. the child.

![Person giving consent, data supplier, data recipient](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/Infov%C3%A4ljad%20koos.PNG)

Once the details of the consent in the status ‘requested’ have been reviewed, the Data Subject or Representative can choose whether or not to consent to the transfer of the described data set. If they do, the status label and button will turn green.

![Allow](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/NT%20taotlus%20luban.PNG)

If the Data Subject or Representative does not authorise the transfer of the described data set, the status label and the button will turn red.

![Do not allow](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/NT%20taotlus%20ei%20luba.PNG)

The Data Subject or Representative can change their decisions on the same page before pressing the ‘Confirm’ button.

Once all the choices have been made, the Data Subject or Representative presses the ‘Confirm’ button. The Data Consent Service makes the consents valid.

Please note! If a digital signature is required by the Data Provider when consent is given through the Service Declaration, the consent must be signed digitally.

Once all the choices have been made, the Data Subject or the Representative will be redirected back to the Client.

![Confirm](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/N%C3%B5usolek%20antud.PNG)

### After being redirected

After redirecting the Data Subject or Representative, the Client will prompt the Data Consent Service for the Consent References and their validation to find out which consents were given and are now valid. The ***getConsentReferences*** and ***validateConsentForClient*** APIs are used (see sections [5.1.2.](#getconsentreferences) and [5.1.3.](#validateconsentforclient)).

Based on the response received, the Client will display a message to the Data Subject or Representative. If all the necessary consents are valid, the Client may start requesting data from the Data Provider or the Representative and provide the service to the Data Subject.

If some of the consents are missing, the Client will request a new link from the Data Consent Service (using the ***getConsentGroupReference API*** (see section [5.1.1.](#getconsentgroupreference))) and redirect the Data Subject or the Representative to provide the missing consents.

## Consents management

The consent management interface is part of the eesti.ee portal and the Data Subject or the Representative can find it in the navigation menu after logging in. The management interface consists of four submenus: ‘About the Data Consent Service’, ‘My consents’, ‘Data usage’, ‘Terms of Use’.

### About the Data Consent Service

This subpage provides general information about the Data Consent Service.

![About the Data Consent Service](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image26.jpeg)

### My consents

The sub-page is divided into two tabs, where the ‘Me’ tab shows all consents ever given by the Data Subject (themselves) and the ‘Children’ tab shows the consent(s) given by the Representative – both valid and invalid.

The ‘Children’ tab only shows children who are minors and subject to full physical custody. Information about children is automatically retrieved from the population register.

Consents can be filtered by status, child (in the ‘Children’ tab), and keyword. The table of consents is sortable.

![My consents](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image27.jpeg) ![Consents from the child](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image32.png)

Clicking on a row in the table will show the details of the consent and, in the case of valid consents, a ‘Withdraw consent’ button to withdraw consent and, if extension of consent is allowed, an ‘Extend’ button to extend consent.

![Consent details and withdrawal](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/N%C3%B5usolek%20portaalis.PNG)

If the consent has been confirmed or signed (or withdrawn) by a Representative, the name of the person who confirmed/signed the consent will be displayed in the consent details.

![Confirmed by Representative](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image33.png)

In the details of an invalid consent, you can see the reason why the consent is not valid (consent withdrawn / consent expired / data transfer expired).

![Reason for expiry of consent](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image29.jpg)

#### Withdrawal of consent

The Data Subject and the Representative can withdraw consent by clicking on the ‘Withdraw consent’ button. Consent that is valid can be withdrawn.

If a digital signature is required by the Data Provider when consent is withdrawn through the Service Declaration, the withdrawal of consent must be signed digitally.

![Withdraw or extend](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image34.png)

If the consent is withdrawn, the consent will become invalid and the user will see the message ‘Consent withdrawn’.

![Withdrawn consent](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image35.png)

If a Representative withdrew the consent, the name of the Representative who withdrew the consent will be displayed in the consent details (see image above).

#### Extension of consent

A Data Subject who is of legal age and has active legal capacity can extend the consent by clicking on the ‘Extend’ button. Consents can be extended if they are valid and the extension has been authorised by the Data Provider through a service declaration.

Please note! A Representative cannot extend the consents of the Data Subject (child).

A consent in the status ‘requested’ is displayed to the Data Subject.

![Extension](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/NT%20pikendamine.PNG)

The Data Subject can choose the expiry date from the calendar. By default, the maximum possible date will be displayed, which will be taken to be the shortest of the maximum expiry date of the Service Declaration and the expiry date of the Purpose Declaration.

Once the Data Subject has reviewed the consent in the status ‘requested’ and has set an expiry date, the Data Subject can choose whether or not to consent to the transfer of the described set of data and confirm consent.

If the extension of consent is accepted (marked as ‘Allow’) and approved, the Data Consent Service will make the consent valid and the previous consent, which was the basis of the extension, will be made invalid.

If the renewal of consent was not accepted (marked as ‘Do not allow’) and confirmed (including closing the window by clicking ‘X’), the action is terminated and the consent is not extended.

### Data transmitted

This sub-page provides an overview of which successful data queries were made on the basis of the Data Subject’s consent and allows you to track the transfer of your personal data and that of your child/children.

Information on data transfer can be searched by keyword or child (under the ‘Children’ tab) and filtered by time period. The table is sortable.

![Data transmitted](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image30.jpeg)

The ‘Children’ tab shows children who are minors and subject to full physical custody. Information about children is automatically retrieved from the population register.

![Data transmitted by the child](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image37.png)

### Terms of use

This sub-page introduces to the Data Subject the terms of use of the Data Consent Service.

*(to be updated)*