# Architecture 2.0

30.09.2021

Versioon 2.0

# Component diagram

# ![Component diagram](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Component%20diagram.png)

# Component diagram description

## Administration

Web based application, with front and backend for managing data providers, purpose and service declarations.

Web application is serving the purpose to be used externally within organisation by the users with the infosystem manager role.

Web application is communicating with the other consent management system components directly with the help of service discovery component.

## Administration LDAP

Web based application, with front and backend for managing data providers, purpose, service declarations and also validating the consistency of existing consents.

Web application is serving the purpose to be used internally within organisation by the users with the administrator role.

Web application is communicating with the other consent management system components directly with the help of service discovery component.

## User Nt

Web based application with front and backend for viewing, managing active consents and viewing modified consents history.

Web application is a part of the [eesti.ee](http://eesti.ee/) portal and is serving mainly the purpose to be used by the citizens of Estonia.

Web application is communicating with the other consent management system components throught the x-tee component.

## Consent

REST based microservice for viewing, validating and managing consents. Most of the endpoints are exposed through the gateway component as a part of the API.

Consent microservice is a part of the consent management system and is serving the purpose to be used externally by the user nt, service provider and client components. Internally it is used by the consent management system components to provide statistics.

Consent microservice is communicating with the other consent management system components directly with the help of service discovery component.

## Purpose Declaration

REST based microservice for viewing and managing purpose declarations.

Purpose declaration microservice is a part of the consent management system and is serving the purpose to be used internally by consent management system components.

Purpose declaration microservice is communicating with the other consent management system components directly with the help of service discovery component.

## Service Declaration

REST based microservice for viewing and managing service declarations.

Service declaration microservice is a part of the consent management system and is serving the purpose to be used internally by consent management system components.

Service declaration microservice is communicating with the other consent management system components directly with the help of service discovery component.

## Data Provider

REST based microservice for viewing and managing data providers.

Data provider microservice is a part of the consent management system and is serving the purpose to be used internally by consent management system components.

Data provider microservice is communicating with the other consent management system components directly with the help of service discovery component.

## Reporting

REST based microservice for viewing and managing reporting data of the consents. All the endpoints are exposed through the gateway component as a part of the API.

Reporting microservice is a part of the consent management system and is serving the purpose to be used externally by the user nt and client components.

Reporting microservice is communicating with the other consent management system components directly with the help of service discovery component.

## Gateway

REST based microservice for supporting all other consent management system components.

Gateway microservice is a part of the consent management system and is serving the purpose to used externally as an API gatetway which handles all the requests to the consent management system components and enables security, filtering and routing.

Gateway microservice is communicating with the other consent management system components directly with the help of service discovery component.

## Service Discovery

Rest based microservice for supporting all other consent management system components.

Service discovery microservice is a part of the consent management system and is serving the purpose to be used internally as a load balancer and a lookup service where all consent management system components can register themselves and discover other registered microservices.

Service discovery is communicating with the other consent management system components directly.

# Integrations description

## Population Register

Service provides basic information about each person living in Estonia. It contains their name, ID code, date of birth, place of residence, and other statistical data such as nationality, native language, education and profession. Provided by the Ministry of the Interior of the Republic of Estonia.

Consumed by the consent component for validating person&#39;s legal capacity.

Communication is performed using x-tee using SOAP protocol.

## X-Tee services catalogue

Service provides a list of the x-tee services provided by the Information System Authority of the Republic of Estonia.

Consumend by the data provider for retrieving the list of the x-tee services.

Communication is performed using x-tee using HTTPS protocol.

## TARA

Authentication service, provided by the Information System Authority of the Republic of Estonia.

Consumed by the administration and user nt components to authenticate user.

Communication is performed using HTTPS protocol.

## LDAP

Provides directory authentication service withing the organisation.

Consumed by the administration ldap component to authenticate user.

Communication is performed using LDAP protocol.

## GuardTime

A service within the organisation that provides signature services based on the Blockchain technology.

Consumed by the consent component to digitally sign consents.

Communication is performed using HTTPS protocol.

## X-Tee security server

Service that provides the data exchange layer for information systems provided by the Information System Authority of the Republic of Estonia.

Consumed by the user nt component. Reporting and consent components (routed through gateway component) are being exposed  exposed as an API by x-tee service to the client component and service provider components.

Communication is performed using HTTPS protocol.

## Client

Consumer application that uses consent management system API through x-tee services.

Communication is performed using RESTful calls using HTTPS protocol.

## Service provider

Consumer application that uses consent management system API through x-tee services.

Communication is performed using RESTful calls using HTTPS protocol.

# Component access

Components that require access to the resources inside organisation:

 Component | Resource name 
 --- | --- 
 Consent | Guardtime 
Consent | X-Tee security server (Population registry) 
Consent | Database 
Administration LDAP | LDAP 
Administration LDAP | Database 
Administration | Database 
Administration | TARA 
User NT | Database
User NT | TIM/TARA 
User NT | X-Tee security server (Consent management system) 
Data provider | Database 
Data provider | X-Tee services catalogue |
Purpose declaration | Database 
Service declaration | Database 
Gateway | Database 
Reporting | Database 

Components that requre access inside consent management system:

Component | Resource name
 --- | --- 
Service discovery | Service discovery (other nodes)
Gateway | Service discovery 
Gateway | Consent
Gateway | Reporting
Data provider | Service discovery 
Data provider | Service declaration
Purpose declaration | Service discovery
Purpose declaration | Service declaration
Purpose declaration | Consent
Service declaration | Service discovery
Service declaration | Purpose declaration
Reporting | Service discovery
Reporting | Consent
Consent | Service discovery
Consent | Purpose declaration 
Consent | Service declaration 
Administration | Service discovery
Administration | Data provider
Administration | Purpose declaration
Administration | Service declaration
Administration | Consent
Administration LDAP | Service discovery
Administration LDAP | Data provider 
Administration LDAP | Purpose declaration 
Administration LDAP | Service declaration 
Administration LDAP | Consent 

# Deployment diagram

# ![Deployment diagram](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Deployment%20diagram.png)

# Deployment diagram description

## Registry server cluster

A registry server cluster is a collection of application servers which host service discovery components.

### Registry server A

Application server for the registry server node A which is hosting the service discovery component.

### Registry server B

Application server for the registry server node B which is hosting the service discovery component.

## Data provider

### Data provider DB cluster

Postgres database cluster for the data provider application servers.

### Data provider server A

Application server for the data provider node A which is hosting the data provider component that connects to the:

- Data provider db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Data provider server B

Application server for the data provider node B which is hosting the data provider component that connects to the:

- Data provider db cluster using jdbc.
- Registry server cluster (service discovery) using https.

## Consent

### Consent DB cluster

Postgres database cluster for the consent application servers.

### Consent server A

Application server for the consent node A which is hosting the consent component that connects to the:

- Consent db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Consent server B

Application server for the consent node B which is hosting the consent component that connects to the:

- consent db cluster using jdbc.
- Registry server cluster (service discovery) using https.

## Purpose declaration

### Purpose declaration DB cluster

Postgres database cluster for the purpose declaration application servers.

### Purpose declaration server A

Application server for the purpose declaration node A which is hosting the purpose declaration component that connects to the:

- Purpose declaration db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Purpose declaration server B

Application server for the purpose declaration node B which is hosting the purpose declaration component that connects to the:

- Purpose declaration db cluster using jdbc.
- Registry server cluster (service discovery) using https.

## Service declaration

### Service declaration DB cluster

Postgres database cluster for the service declaration application servers.

### Service declaration server A

Application server for the service declaration node A which is hosting the service declaration component that connects to the:

- Service declaration db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Service declaration server B

Application server for the service declaration node B which is hosting the service declaration component that connects to the:

- Service declaration db cluster using jdbc.
- Registry server cluster (service discovery) using https.

## Reporting

### Reporting DB cluster

Postgres database cluster for the reporting application servers.

### Reporting server A

Application server for the reporting node A which is hosting the reporting component that connects to the:

- Reporting db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Reporting server B

Application server for the reporting node B which is hosting the reporting component that connects to the:

- Reporting db cluster using jdbc.
- Registry server cluster (service discovery) using https.

## Administration

### Administration DB cluster

Postgres database cluster for the administration and administration LDAP application servers.

### Administration server A

Application server for the administration node A which is hosting the administration component that connects to the:

- Administration db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Administration server B

Application server for the administration node B which is hosting the administration component that connects to the:

- Administration db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Administration LDAP server A

Application server for the administration LDAP node A which is hosting the administration LDAP component that connects to the:

- Administration db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Administration LDAP server B

Application server for the administration LDAP node B which is hosting the administration LDAP component that connects to the:

- Administration db cluster using jdbc.
- Registry server cluster (service discovery) using https.

## Gateway

### Gateway DB cluster

Postgres database cluster for the gateway application servers.

### Gateway server A

Application server for the gateway node A which is hosting the gateway component that connects to the:

- Gateway db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Gateway server B

Application server for the gateway node B which is hosting the gateway component that connects to the:

- Gateway db cluster using jdbc.
- Registry server cluster (service discovery) using https.

### Gateway Load Balancer

F5 load balancer on top of the gateway application server nodes. Connects to the gateway application server node A and node B using https.

## User Nt

### User Nt DB cluster

Postgres database cluster for the user nt application servers.

### User Nt server A

Application server for the user nt node A which is hosting the user nt component that connects to the:

- User nt db cluster using jdbc.
- Gateway load balancer using x-tee.

### User Nt server B

Application server for the user nt node B which is hosting the user nt component that connects to the:

- User nt db cluster using jdbc.
- Gateway load balancer using x-tee.

# Data model

The following data model diagrams contain most relevant database tables which have business value in the context of the whole consent management system.

## Data provider

![Data provider data model](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Data%20provider%20data%20model.png)

## Purpose declaration

![Purpose declaration data model](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Purpose%20declaration%20data%20model.png)

## Service declaration

![Service declaration data model](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Service%20declaration%20data%20model.png)

## Reporting

![Reporting data model](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Reporting%20data%20model.png)

## Consent

![Consent model](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Consent%20data%20model.png)

## Administration/Administration LDAP

![Administration data model](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Administration%20data%20model.png)

## Gateway

![Gateway model](https://github.com/e-gov/NT/blob/9404d2b0800796f8d4c1947f975284637c70040a/architecture/diagrams/Gateway%20data%20model.png)
