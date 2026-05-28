Versiooni ajalugu

| Versioon | Kuupäev| Kirjeldus
| ---------- | --- | -----------
| 0.1| 12.06.2025 | Dokument loodud.
| 0.2| 11.09.2025 | Dokument täiendatud.
| 0.3| 01.11.2025 | Dokument muudetud.
| 0.4| 06.01.2026 | Dokument muudetud.
| 0.5| 28.01.2026 | Dokumendi täiendamine. Veakoodi täpsustused.
| 0.6| 21.04.2026 | Eemaldatud teenuse /api/consent/third-party sisendist ees- ja perekonnanimi


## Sisukord
* [Üldinfo](#%C3%BCldinfo)
* [POST /api/consent/references](#post-apiconsentreferences)
* [GET /api/consent/validation/client](#get-apiconsentvalidationclient)
* [POST /api/consent/third-party](#postapiconsentthird-party)
* [POST /api/consent/third-party/container](#post-apiconsentthird-partycontainer)
* [Veahaldus](#veahaldus)

## Üldinfo

Arhitektuuristiil: REST API

Andmestruktuur: JSON

Autentimine: Kõikide Andmenõusolekuteenusele jõudnud päringute puhul kontrollitakse, et Andmenõusolekuteenuse juurde pöörduv x-tees autenditud alamsüsteem on õige osapool selle päringu tegemiseks. Andmenõusolekuteenus vastab päringule ainult siis, kui küsija (ehk Andmekogu või Klientrakendus) on kontrollitava nõusolekuga seotud, kas läbi eesmärgideklaratsioonil oleva alamsüsteemi või eesmärgideklaratsiooniga alati seotud oleva teenusdeklaratsiooni oleva alamsüsteemiga. Autentimine toimub X-tee turvaserveri metaandmete alusel (client subsystem), mida võrreldakse eesmärgideklaratsiooni(de)s määratuga.

Nõusolekuteenusele dokumendi lisamiseks on aega kaks päeva ja dokumendi allkirjastamiseks on aega 24 tundi ehk 1 päev.

Andmetüübid:
* String tüüpi parameetrid on UTF-8 kodeeringuga sümbolid.
* Number tüüpi parameetrid on ASCII koodide jada vahemikus 47 - 57 (numbrid 0-9).
* Timestamp tüüpi parameetrid on ISO8601 formaadis timestampid.

Veebiteenuse URLid:
* LIVE: https://\<turvaserveri-aadress\>/r1/EE/GOV/70006317/consent/consent/\... 
* STAGE: https://\<turvaserveri-aadress\>/r1/ee-dev/GOV/70006317/consent/consent-stage/\... 

Lihtsustatud andmenõusoekuteenuse sammud.
Pilt on illustratiivne, et milline võib välja näha lihtsustatud allkirjastamise protsess. Tegelik protsess sõltub konkreetses asutuses juurutatud äriprotsessidest.

![Pilt](../img/Lihtsustatud%20andmen%C3%B5usoleku%20teenus/pilt_lihtsustatud.png)

## POST /api/consent/references
Päringu abil saab küsida Andmenõusolekuteenuselt kehtivate nõusoleku(te) nõusolekuviited (Consent Reference).

API URL:  https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference 

**Sisend**
Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
idCode | jah | string | Andmesubjekti isikukood.
purposeDeclarationBusinessIdentifiers | jah | array of strings | Eesmärgideklaratsiooni identifikaator (võib olla mitu).

**Päringu näide**
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

Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama, mis on määratud eesmärgideklaratsiooni(de)s.

**Väljund**
Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
purposeDeclarationBusinessIdentifier (näidises: "ED_KAKS") | string | Tagastatakse ainult need eesmärgideklaratsioonid, mille jaoks on leitud kehtiv nõusolek (staatuses APPROVED).
consentReference | string | Kehtiva nõusoleku nõusolekuviide –  unikaalne kood, mida kasutatakse nõusoleku kehtivuse valideerimisel.

**Päringu näide**
```json
{
  "ED_KAKS": "91e9844d-3b5e-4df8-9254-42316b1607b6"
}
```

## GET /api/consent/validation/client
Päringu abil saab küsida Andmenõusolekuteenuselt nõusoleku kehtivust. Lihtsustatud andmenõusolekuteenuse kasutamisel on see teenus vabatahtlik ja kasutatakse valideerimiseks. Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama, mis on määratud nõusolekuga seotud eesmärgideklaratsioonis.

API URL: https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client

**Sisend**
Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
consentReference | jah | string | Nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivuse soovitakse valideerida.

**Päringu näide**

`https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6`

**Väljund**
Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
consentReference | string | Nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivust valideeritakse. 
consentExpiration | timestamp (ISO 8601) | Nõusoleku kehtivusaja lõpp.
idCode | string | Andmesubjekti isikukood.
purposeDeclarationId | string | Nõusolekuga seotud eesmärgideklaratsiooni identifikaator.

**Päringu näide**
```json
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "idCode": "60001019906",
  "purposeDeclarationId": "ED_KAKS"
}
```

## POST /api/consent/third-party 
Päringu abil saab Klientrakendus küsida Andmenõusolekuteenuselt nõusolekutaotluse(id) puuduva(te) nõusoleku(te) andmiseks.

Andmenõusolekuteenus töötleb sisse tulnud päringut ning genereerib sisendis esitatud isikukoodi ja eesmärgideklaratsiooni kombinatsiooni baasil nõusolekutaotluse andmekomplekti. Kui sisendis on mitu eesmärgideklaratsiooni, siis iga eesmärgideklaratsiooni kohta genereeritakse eraldi andmekomplekt ehk nõusolekutaotlus. Igale nõusolekutaotlusele (otsuse ootel  nõusolekule) omistatakse unikaalne UUID. Nõusolekutaotluse andmekomplekt sisaldab nõusolekutaotluse metaandmeid ja süsteemi poolt genereeritud konteinerit, milles on nõusoleku andmetest kokku pandud fail pdf kujul või ainult PDF faili. PDF faili klientrakendus allkirjastab ja tagastab allkirjastatud faili Andmenõusolekuteenusele. 

API URL: https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party 

**Sisend**
Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
idCode | jah | string | Andmesubjekti isikukood.
purposeDeclarationBusinessIdentifiers | jah | array of String | Eesmärgideklaratsiooni identifikaator. Saab olla mitu.
language | ei | string | Keelekood, mis määrab andmete keele. Kasutatakse kahetähelisi koode (nt "en" – inglise, "et" – eesti). Vaikimisi väärtus "et". 

**Päringu näide**
```json
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "ED_KAKS",
    "ED_KOLM"
  ]
}
```

**Väljund**
Päringu vastuseks antakse nõusolekutaotlus(t)e andmekomplekt JSON kujul. Vastus koosneb massiivist, mis sisaldab nii allkirjastamata konteinerit, mis sisaldab PDFi kui ka eraldi nõusolekutaotluse faili PDF kujul, mille klient lisab ise konteinerisse ja saadab allkirjastatult tagasi. 

Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
consentReference | string | Otsuse ootel nõusoleku UUID.
idCode | string | Isikukood.
firstName | string | Eesnimi.
lastName | string | Perekonnanimi.
clientName | string | Osapoole nimi (e Kliendirakendus), kellele  nõusoleku alusel andmed edastatakse.
clientRegistryCode | string | Osapoole registrikood, kellele nõusoleku alusel andmed esitatakse.
clientService | string | Andmete saaja pakutav teenus.
purposeDeclarationDescription | string | Eesmärgideklaratsiooni kirjeldus (Andmete kasutamise eesmärk).
serviceDeclarationName | string | Teenusedeklaratsiooni nimi.
serviceDeclarationDescription | string | Andmete edastaja andmete kirjeldus/teenuse andmekoosseisu kirjeldus.
dataProviderName | string | Andmekogu/ infosüsteemi nimi.
dataControllerName | string | Andmete edastaja vastutav töötleja.
dataControllerRegistryCode | string | Andmete edastaja vastutava töötleja registrikood.
dataProcessorName | string | Andmete edastaja volitatud töötleja.
dataProcessorRegistryCode | string | Andmete edastaja volitatud töötleja registrikood.
validFrom | string | Nõusoleku kehtivus: alates... Timestamp sisuga string. Nt 01.01.2022
validTo | string | Nõusoleku kehtivus: kuni... Timestamp sisuga string. Nt 01.01.2023
files | string | Failide massiiv siseldab nii konteinerit, kui ka PDF faili.
type | string | Faili tüüp. Võimalikud väärtused on CONSENT_CONTAINER või GENERATED_PDF.
content | string | Faili sisu kodeeritud Base64 vormingusse. 

**Päringu näide**
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
Päringu abil saab Andmenõusolekuteenusele edastada allkirjastatud nõusoleku(id).

API URL: https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/third-party/container

**Kontrollid ja salvestamise loogika**

Andmenõusolekuteenus töötleb sisse tulnud päringut. Päringu töötlemise käigus võrreldakse päringuga tulnud andmeid andmebaasis olevaga, kus kontrollitakse:
-   Kas päringu teinud X-tee klient (x-road client) ühtib andmebaasis oleva nõusolekuga seotud teenusedeklaratsioonis olevaga.
-   Kas UUID järgi leitud andmebaasi kirjes ühtivad kontroll väljad nõusoleku infoga.
-   Kas allkirjastatud DigiDoc konteiner ja allkiri on valiidne.
-   Kas DigiDoc konteineris olev pdf räsi ühtib andmebaasi konteineris oleva pdf räsiga.
-   Kas allkiri on antud viimase tunni aja jooksul (ajaperiood reguleeritav süsteemse parameetriga, allowedSignatureTimeInMinutes = 24 tundi). 
-   Kas allkirjas olevad isiku andmed (isikukood, eesnimi, perekonnanimi) ühtivad andmebaasis oleva infoga.
-   Kui andmete kontrollid saavad positiivse vastuse („status":„OK"), salvestatakse andmed andmebaasi „Consent" järgnevatesse tabelitesse: CONSENT, CONSENT_SNAPSHOT, FILE. Tabelis „FILE" olev allkirjastamata
    DigiDoc konteiner asendatakse päringust tulnud allkirjastatud igiDoc konteineriga.
-   Vea korral tagastatakse staatus koos veakoodiga (vt Päringu vastus).

**Sisend**
Päringu sisendiks antakse nõusoleku(te) UUID ja digitaalselt allkirjastatud DigiDoc konteiner(id). Sisend koosneb massiivist, mis sisaldab üks kuni mitu allkirjastatud nõusolekut. Üks nõusolek koosneb nõusoleku UUID väärtusest ja allkirjastatud digikonteinerist, milles nõusoleku fail pdf kujul.

Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
consentConfirmReference | jah | string | Otsuse ootel nõusoleku UUID.
file | jah | string | Allkirjastatud nõusolek (DigiDoc konteiner ASICE formaadis).  Stringi sees  base64 kodeeritud fail. NB! Faili nimi konteineris on "Nousolek.pdf". Konteineris on ainult nõusoleku PDF fail, rohkem faile konteineris olla ei tohi.

**Päringu näide**
```json
[{
 "consentConfirmReference": "7bf5904a-bce3-483f-99c2-527937b032b7",
 "file": "0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Npbmcg"
}]
```

**Väljund**
Päringu vastuseks on massiiv, mis sisaldab iga nõusoleku kohta vastust andmete töötlemise õnnestumise/mitteõnnestumise kohta. Massiiv koosneb otsuse ootel nõusoleku UUID väärtusest, staatusest (Status) ning errorCode väärtusest, kui andmete töötlemine ebaõnnestub.
Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
consentConfirmReference | jah | string | Otsuse ootel nõusoleku UUID.
status | jah | string | Kui andmete töötlemine õnnestub, tagastatakse staatuseks „OK“; Kui andmete töötlemine ei õnnestunud, tagastatakse staatuseks „ERROR“, koos vastav errorCode väärtusega. 
errorCode | jah | string | „HTTP_NOT_FOUND“ - X-road client ei ole sama, mis nõusolekuga seotud teenusedeklaratsioonis; CONSENT_VALIDATE_INVALID – sisendis antud nõusoleku andmed ei ühti andmebaasis oleva nõusolekuga. CONSENT_NOT_FOUND – sisendis antud UUID ei leidu andmebaasist.

**Päringu näide**
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

## Veahaldus
HTTP kood | Veakood | Kirjeldus
------------ | ------------- | ------------ 
200 | OK | Päring õnnestus ja väljastatakse vastava päringu väljund.
400 | VALIDATION FAILURE | Valideerimise ebaõnnestumine, kohustuslikud väljad on tühjad.
400 | BAD REQUEST | Vigane päringu sisu.
404 | NOT FOUND | Kehtiva eesmärgideklaratsiooni ja alamsüsteemi kombinatsiooni ei leitud kõikide küsitud nõusolekute puhul.
404 | REQUESTED CONSENTS ARE NOT RELATED TO ANY PURPOSE DECLARATIONS | Eesmärgi identifikaator ei vasta ühelegi olemasolevale deklaratsioonile.
500 | INVALID ID CODE | Isikukood on vigane või formaat vale.
500 | INTERNAL SERVER ERROR | Kohustuslik väli on puudu või tühi.
500 | ALL REQUESTED CONSENTS HAVE ALREADY BEEN  APPROVED | Nõusolekute mitmekordsel küsimisel juhul, kui kõik leitud nõusolekud on staatuses APPROVED.
500 | DATA SUBJECT ERROR | Isikukoodi järgi on isik alaealine ja või teovõimetu.
505 | NOT FOUND | Vale X-ROAD-CLIENT päises.
 
