# RIA juriidilise isiku andmenõusolekuteenuse kasutamine ja liidestamine

09.03.2026

Versioon 0.1

---

Versiooni ajalugu

| Kuupäev    | Versioon | Kirjeldus       |
| ---------- | -------- | --------------- |
| 09.03.2026 | 0.1      | Dokument loodud |

<!-- markdownlint-disable MD033 -->

# **Sisukord**

- [1. Sissejuhatus](#sissejuhatus)
  - [1.1 Mõisted](#mõisted)
- [2. Eeltingimused andmenõusolekuteenuse kasutamiseks](#eeltingimused-andmenõusolekuteenuse-kasutamiseks)
- [3. Põhiprotsesside kirjeldus kasutusjuhtudena](#põhiprotsesside-kirjeldus-kasutusjuhtudena)
  - [3.1 Kasutusjuht 1: Andmesubjekti(de)le nõusolekupäringu tegemine Teenusepakkuja poolt](#kasutusjuht-1-andmesubjektidele-nõusolekupäringu-tegemine-teenusepakkuja-poolt)
  - [3.2 Kasutusjuht 2: Andmete pärimine ja nõusoleku valideerimine (andmekogu)](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)
- [4. Nõusoleku seisundidiagramm](#nõusoleku-seisundidiagramm)
- [5. Andmenõusolekuteenusega liidestamine ja päringute tehniline kirjeldus](#andmenõusolekuteenusega-liidestamine-ja-päringute-tehniline-kirjeldus)
  - [5.1 Andmekogu ja Klientrakenduse poolt kasutavate päringute tehniline kirjeldus](#andmekogu-ja-klientrakenduse-poolt-kasutavate-päringute-tehniline-kirjeldus)
    - [5.1.1 purposedeclarations](#purposedeclarations)
    - [5.1.2 create](#create)
    - [5.1.3 status](#status)
    - [5.1.4 url](#url)
    - [5.1.5 client](#client)
    - [5.1.6 dataprovider](#dataprovider)
    - [5.1.7 reportDataTransmission](#reportdatatransmission)
    - [5.1.8 getConsentHealth](#getconsenthealth)
    - [5.1.9 getReportingHealth](#getreportinghealth)
- [6. Juhised andmenõusolekuteenuse JURNT testimiseks liidestuja poolt](#juhised-andmenõusolekuteenuse-jurnt-testimiseks-liidestuja-poolt)
  - [6.1 Nõusolekute URL'i loomine ja nõusolekutaotluse informatsiooni kuvamine (esmane ja korduv)](#nõusolekute-urli-loomine-ja-nõusolekutaotluse-informatsiooni-kuvamine-esmane-ja-korduv)
  - [6.2 Eesmärgideklaratsioonide pärimine (Teenusepakkuja)](#eesmärgideklaratsioonide-pärimine-teenusepakkuja)
  - [6.3 Nõusoleku päringu algatamine / nõusoleku küsimine (Teenusepakkuja)](#nõusoleku-päringu-algatamine--nõusoleku-küsimine-teenusepakkuja)
  - [6.4 Nõusoleku andmine (_approve_) ja keeldumine/tagasivõtmine (_decline_)](#nõusoleku-andmine-approve-ja-keelduminetagasivõtmine-decline)
  - [6.5 Nõusolekuviidete pärimine](#nõusolekuviidete-pärimine)
  - [6.6 Nõusolekute valideerimine (Klientrakendus ja Andmekogu)](#nõusolekute-valideerimine-klientrakendus-ja-andmekogu)
  - [6.7 Nõusolekute alusel edukast andmete pärimisest raporteerimine (Andmekogu)](#nõusolekute-alusel-edukast-andmete-pärimisest-raporteerimine-andmekogu)
- [7. Andmenõusolekuteenuse haldusliidese kasutamise juhend](#andmenõusolekuteenuse-haldusliidese-kasutamise-juhend)
  - [7.1 Haldusliidese rollid](#haldusliidese-rollid)
  - [7.2 Infosüsteemide haldus](#infosüsteemide-haldus)
    - [7.2.1 Infosüsteemide haldusega seotud vaated](#infosüsteemide-haldusega-seotud-vaated)
    - [7.2.2 Infosüsteemi andmed](#infosüsteemi-andmed)
  - [7.3 Teenusedeklaratsioonide haldus](#teenusedeklaratsioonide-haldus)
    - [7.3.1 Teenusedeklaratsioonide haldusega seotud vaated](#teenusedeklaratsioonide-haldusega-seotud-vaated)
    - [7.3.2 Teenusedeklaratsiooni andmed](#teenusedeklaratsiooni-andmed)
    - [7.3.3 Teenusedeklaratsiooni seisundidiagramm](#teenusedeklaratsiooni-seisundidiagramm)
  - [7.4 Eesmärgideklaratsioonide haldus](#eesmärgideklaratsioonide-haldus)
    - [7.4.1 Eesmärgideklaratsioonide haldusega seotud vaated](#eesmärgideklaratsioonide-haldusega-seotud-vaated)
    - [7.4.2 Eesmärgideklaratsiooni andmed](#eesmärgideklaratsiooni-andmed)
    - [7.4.3 Eesmärgideklaratsiooni seisundidiagramm](#eesmärgideklaratsiooni-seisundidiagramm)
- [8. Statistika](#statistika)
  - [8.1 Statistika väljund](#statistika-väljund)
  - [8.2 Statistika andmestik](#statistika-andmestik)
- [9. Nõusoleku mall](#nõusoleku-mall)
- [10. Andmenõusolekuteenuse kasutajaliides](#andmenõusolekuteenuse-kasutajaliides)
  - [10.1 Nõusoleku andmine](#nõusoleku-andmine)
    - [10.1.1 Klientrakenduse tegevused enne suunamist](#klientrakenduse-tegevused-enne-suunamist)
    - [10.1.2 Andmenõusolekuteenuses](#andmenõusolekuteenuses)
    - [10.1.3 Klientrakenduse tegevused peale suunamist](#klientrakenduse-tegevused-peale-suunamist)
  - [10.2 Nõusolekute haldus](#nõusolekute-haldus)
    - [10.2.1 Nõusolekust loobumine](#nõusolekust-loobumine)
  - [10.3 Nõusoleku küsimine](#nõusoleku-küsimine)
    - [10.3.1 Nõusolekute küsimine Klientrakenduse kaudu](#nõusolekute-küsimine-klientrakenduse-kaudu)
  - [10.4 Edastatud andmed](#edastatud-andmed)

# Sissejuhatus

Dokumendi eesmärgiks on kirjeldada RIA juriidilise isiku andmenõusolekuteenuse (JURNT) peamisi kasutusmalle, andmevahetuse ja testimise põhimõtteid ning kasutajaliideseid.

Dokument on aluseks RIA andmenõusolekuteenusega JURNT liidestamisele ja selle kasutusele võtmisele.

## Mõisted

**Andmesubjekt (Data Subject)** - juriidiline isik, kellega on seotud Andmekogus hoitavad andmed.

**Andmesubjekti esindaja (Representative)** -– isik, kes esindab Andmesubjekti.

**Andmekogu (Data Provider)** - infosüsteem, mis hoiab Andmesubjekti isikuandmeid.

**Teenusepakkuja / Klientrakendus** **(Client, Requesting Legal Entity)** - infosüsteem, mis vajab Andmesubjektile teenuse osutamiseks Andmesubjekti andmeid Andmekogust.

**Juriidilise isiku andmenõusolekuteenus (Legal Entity Data Consent Service**) - infosüsteem, mis vastutab jriidilisest isikust Andmesubjektide nõusolekute haldamise eest.

**Kaitstud teenus** **(Protected Service)** - abstraktne Andmekogu teenus, mis annab juurdepääsu Andmesubjekti andmetele ning mille kasutamiseks on vajalik Andmesubjekti nõusolek.

**Teenusedeklaratsioon** **(Service Declaration)** - ühe Andmekogu poolt pakutava kaitstud teenuse ja edastavate andmete kirjeldus. Registreeritakse Andmekogu poolt Andmenõusolekuteenuses.

**Eesmärgideklaratsioon (Purpose Declaration)** - andmete kasutamise eesmärgi kirjeldus. MVP raames registreeritakse Andmekogu poolt Andmenõusolekuteenuses, on aluseks nõusolekutaotlustele. Eesmärgideklaratsiooni sisu on pakutud Klientrakenduse poolt. Kui oma eesmärkide saavutamiseks Klientrakendus vajab andmeid mitmetelt kaitstud teenustelt (ühest või erinevatest andmekogudest), registreeritakse mitu eesmärgideklaratsiooni - iga teenuse jaoks eraldi. Sellel juhul Klientrakendus peab saama ka mitu vastavat Andmesubjekti nõusolekut.

**Nõusolek (Consent)** - Andmesubjekti poolt Andmekogule antud nõusolek, mille alusel Andmekogu tohib kaitstud teenuste kaudu edastada Teenusepakkujale/Klientrakendusele nõusolekus kirjeldatud andmeid nende töötlemiseks nõusolekus kirjeldatud eesmärgil.

**Nõusolekutaotlus (Consent in status REQUESTED)** - nõusolek, mida vajab Klientrakendus Andmesubjektile teenuse osutamiseks, kuid Andmesubjekt pole veel andnud.

**Nõusolekuviide (Consent Reference)** - nõusoleku unikaalne kood, mida kasutatakse nõusoleku kehtivuse valideerimisel.

**Nõusolekupäring (Consent Request)** - päring Andmesubjektile nõusoleku saamiseks, et tema kohta käivaid andmeid edastada.

**Nõusolekupäringu esitaja (Requesting Legal Entity)** - juriidiline isik (Teenusepakkuja), kes esitab Nõusolekupäringu Andmesubjektile.

# Eeltingimused andmenõusolekuteenuse kasutamiseks

Selleks, et võimaldada nõusolekute küsimist Andmesubjektilt Teenusepakkuja/Klientrakenduse jaoks, peavad Andmekogu ja Teenusepakkuja tegema andmenõusolekuteenuse loomiseks järgmised sammud:

1. Teenusepakkuja tutvub olemasolevate kaitstud teenuste ja andmekomplektidega x-tee kataloogis (<https://x-tee.ee/catalogue/ee-dev>) ja võtab ühendust Andmekoguga.

2. Andmekogu kaalub Teenusepakkuja andmete kasutamise sooviavaldust, uurib Teenusepakkuja tausta ja usaldusväärsust. Kui osapooled jõuavad kokkuleppele, siis sõlmivad nad omavahel lepingu.

3. Juhul, kui x-tee kataloogis ei ole Teenusepakkujale vajalikku andmekomplekti, loob Andmekogu uue kaitstud teenuse, mis vastab Teenusepakkuja vajadusele.

4. Andmekogu esindaja - Infosüsteemide haldur - lisab Andmenõusolekuteenusesse infosüsteemi, mis hakkab pakkuma soovitud kaitstud teenust (kui see ei olnud lisatud varem) (vt jaotis [7.2.](#infosüsteemide-haldus))

5. Andmekogu esindaja - Infosüsteemide haldur - lisab Andmenõusolekuteenusesse kaitstud teenuse kirjeldav Teenusedeklaratsiooni (vt jaotis [7.3.](#teenusedeklaratsioonide-haldus)). Kui vajaliku teenuse jaoks on Teenusedeklaratsioon juba olemas, pole seda uuesti deklareerida vaja, saab kasutada olemasolevat Teenusedeklaratsiooni.

6. Teenusepakkujaga sõlmitud lepingu alusel, Andmekogu esindaja - Infosüsteemide haldur - lisab Andmenõusolekuteenusesse andmete kasutamise eesmärgi kirjeldava Eesmärgideklaratsiooni (vt jaotis [7.4.](#eesmärgideklaratsioonide-haldus))

7. Pärast eesmärgideklaratsiooni esitamist ekspordib Andmekogu eesmärgideklaratsiooni andmeid Andmenõusolekuteenusest ja edastab selle Teenusepakkujale (nt e-maili kaudu). Nende andmete hulgas edastatakse eesmärgideklaratsiooni unikaalne identifikaator, mida Teenusepakkuja hakkab kasutama Andmenõusolekuteenusega suhtlemisel.

8. Teenusepakkuja Klientrakendus liidestub Andmenõusolekuteenusega, võimaldades Andmesubjekti või Andmesubjekti esindaja suunamist Andmenõusolekuteenusesse JURNT vajalike nõusolekute andmiseks.

# Põhiprotsesside kirjeldus kasutusjuhtudena

Peatükk sisaldab kahte peamist Teenusepakkuja Klientrakemduse ja Andmekoguga seotud kasutusjuhtu, mis annavad ülevaade Andmenõusolekuteenuse API-de kasutamise kontekstist.

## Kasutusjuht 1: Andmesubjekti(de)le nõusolekupäringu tegemine Teenusepakkuja poolt

**Tegutsejad:** Teenusepakkuja/Klientrakendus, Andmenõusolekuteenus JURNT

**Osapooled ja nende huvid:**

- Andmesubjekt soovib kasutada Klientrakenduse teenust, mille toimimiseks on vajalik Andmesubjekti nõusolek tema isikuandmete edastamisele ja töötlemisele.

- Teenusepakkuja soovib saada Andmesubjektilt nõusolekut tema andmete saamiseks Andmekogu(de)lt ja veenduda, et kõik teenuse pakkumiseks vajalikud nõusolekud kehtivad.

- Andmenõusolekuteenus JURNT soovib võimaldada Teenusepakkujal teha Andmesubjektile nõusolekupäringuid ning jälgida enda tehtud päringuid ja saadud nõusolekuid.

**Eeltingimused:** Teenusepakkuja Klientrakendusel on teada Andmesubjekti registrikood, ning enda teenusele vastavad eesmärgideklaratsioonide identifikaatorid. Andmesubjekte võib olla korraga rohkem (kuni 100).

**Järeltingimused:** Teenusepakkuja poolt koostatud nõusolekupäringud kehtivad ja on nõusolekutaotlusena Andmesubjekti(de)le eesti.ee Ettevõtjaportaalis kättesaadavad kinnitamiseks/tagasilükkamiseks.

**Põhistsenaarium:**

1. Teenusepakkuja küsib läbi API temale kasutamiseks lubatavaid eesmärkdeklaratsioone. Kasutatakse päringut **purposedeclarations** (vt jaotis [5.1.1.](#purposedeclarations)).

2. JURNT kontrollib et x-tees autenditud Teenusepakkuja x-tee alamsüsteemi identifikaator on sama, mis on määratud eesmärgideklaratsiooni(de)s ja et eesmärgideklaratsioon on mõeldud juriidilisele isikule.

3. JURNT tagastab kehtivad eesmärgideklaratsioonid (1 - n).

4. Teenusepakkuja teeb nõusolekupäringu juriidilis(t)ele isiku(te)le tema/nende nõusoleku saamiseks valitud eesmärgideklaratsioonile vastavate andmete saamiseks Andmekogust (vt jaotis [5.1.2.](#create)).

5. JURNT valideerib, kas Teenusepakkuja päringus valitud eesmärgideklaratsioon on Teenusepakkujale lubatud ja kehtiv.

6. JURNT valideerib, kas päringus valitud Andmesubjekti(de)le on juba päring algatatud või nõusolek saadud.

7. JURNT tagastab vastusena loetelu juriidilistest isikutest, kellele päring algatati. Iga juriidilise isiku kohta on vastuses registrikood ja nõusolekuviide/veakood.

8. Teenusepakkuja küsib kehtivaid nõusolekuviiteid (vt jaotis [5.1.3.](#status)).

9. JURNT tagastab vastusena kehtiva(d) nõusolekuviite(d).

**Põhistsenaariumi jadadiagramm:**

![Põhistsenaariumi jadadiagramm](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image1.png)

**Alternatiivsed stsenaariumid ja laiendused:**

3a. Sobivaid kehtivaid eesmärgideklaratsioone ei leitud.

- Vastuseks on tühi loetelu.

4a. Andmekogu pole ühtki eesmärgideklaratsiooni Teenusepakkujale lubatavaks teinud, st eesmärgideklaratsioonide loetelu on tühi.

- Teenusepakkuja ei saa päringut koostada ja tal tuleb vastav teenus Andmekogult tellida.

4b. Teenusepakkujal on vaja andmeid mitmest Andmekogust või samast Andmekogust mitme andmeteenusega saadavaid andmeid.

- Teenusepakkuja teeb iga andmevajaduse kohta eraldi nõusolekupäringu.

## Kasutusjuht 2: Andmete pärimine ja nõusoleku valideerimine (andmekogu)

**Tegutsejad:** Andmekogu, Andmenõusolekuteenus JURNT, Teenusepakkuja Klientrakendus

**Osapooled ja nende huvid:**

- Teenusepakkuja (klientrakendus) küsib andmed Andmekogult. Andmepäring peab sisaldama vastavat nõusolekuviidet ning Andmesubjekti registrikoodi. (See pole JURNT funktsionaalsus.)

- Andmekogu soovib veenduda Andmenõusolekuteenuse abil, et küsitud andmete edastamisele on olemas kehtiv Andmesubjekti nõusolek ning andmeedastuse tingimused on korrektsed.

- Andmenõusolekuteenus soovib valideerida vajaliku nõusoleku kehtivust ning edastada Andmekogule andmeedastuse tingimuste kontrollimiseks vajalikud andmed.

**Eeltingimused:** Andmekogul on teada enda infosüsteemidega seotud teenusedeklaratsioonide identifikaatorid. Andmekogul on olemas vastavusetabel, mille abil saab kontrollida, millisele kaitstud teenusele vastab iga teenusedeklaratsioon.

**Järeltingimused (kehtiva nõusoleku puhul):** Andmekogu edastab andmed Klientrakendusele kaitstud teenuse kaudu (pole JURNT osa). Andmekogu raporteerib Andmenõusolekuteenusele eduka andmeedastuse.

**Põhistsenaarium (eeldusel, et vajalik nõusolek kehtib):**

1. Klientrakendus küsib andmed Andmekogult. Andmepäring peab sisaldama vastavat nõusolekuviidet ning Andmesubjekti isikukoodi.

2. Andmekogu saadab nõusolekuviite andmenõusolekuteenusesse JURNT valideerimiseks. JURNT valideerib nõusolekuviite ja saadab Andmekogule vastuse, mis sisaldab peale nõusolekuviite ka nõusoleku kehtivuse lõppkuupäeva, Klientrakenduse alamsüsteemi identifikaatorit, Andmesubjekti registrikoodi ja nõusolekuga seotud teenusedeklaratsiooni identifikaatorit. Sammudes 2 ja 3 kasutatakse **dataprovider** päringut (vt jaotis [5.1.6.](#dataprovider))

3. Andmekogu kontrollib järgmised andmeedastuse tingimused:

– andmepäringu saatnud Klientrakenduse alamsüsteemi identifikaator (x-tee päringu päises) on sama, mis on Andmenõusolekuteenuse vastuses;

– Klientrakenduse andmepäringus sisalduv Andmesubjekti isikukood on sama, mis on Andmenõusolekuteenuse vastuses;

– kaitstud teenus, mille kaudu Klientrakendus küsib andmed vastab Andmenõusolekuteenuse vastuses sisalduvale teenusedeklaratsiooni identifikaatorile.

4. Kui kõik kontrollid on õnnestunud, edastab Andmekogu küsitud andmed Klientrakendusele. (See pole JURNT funktsionaalsus.)

5. Andmekogu raporteerib eduka andmeedastuse. Kasutatakse **reportDataTransmission** päringut (vt jaotis [5.1.7.](#reportdatatransmission)).

**Põhistsenaariumi jadadiagramm:**

![Põhistsenaariumi jadadiagramm](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image2.png)

**Alternatiivsed stsenaariumid:**

2a. Sellist nõusolekuviidet Andmenõusolekuteenuses JURNT ei eksisteeri.

- Valideerimine ebaõnnestunud, JURNT vastab Andmekogule veateatega.

- Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata ja andmeedastust ei raporteerita.

2b. Nõusolekuviide viitab nõusolekule, mis ei kehti.

- Valideerimine ebaõnnestunud, JURNT vastab Andmekogule veateatega.

- Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata ja andmeedastust ei raporteerita.

3a. Vähemalt üks kontrollidest on ebaõnnestunud.

- Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata ja andmeedastust ei raporteerita.

# Nõusoleku seisundidiagramm

Järgnev diagramm kirjeldab JURNT nõusoleku võimalikke seisundeid ja nendevahelisi üleminekuid.

![Nõusoleku seisundidiagramm](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image3.png)

# Andmenõusolekuteenusega liidestamine ja päringute tehniline kirjeldus

Andmenõusolekuteenus JURNT pakub juriidilistele isikutele REST API päringuid üle x-tee, mida saab kasutada läbi oma klientrakenduse või muul moel.

Kõikide Andmenõusolekuteenusele jõudnud päringute puhul kontrollitakse, et JURNT poole pöörduv x-tees autenditud alamsüsteem on õige osapool sellise päringu tegemiseks. JURNT vastab päringule ainult siis, kui küsija (ehk Andmekogu või Teenusepakkuja Klientrakendus) on kontrollitava nõusolekuga seotud kas läbi eesmärgideklaratsioonil oleva alamsüsteemi või eesmärgideklaratsiooniga alati seotud oleval teenusedeklaratsioonil oleva alamsüsteemi.

**Andmetüübid**

Kõik string'i tüüpi parameetrid on UTF-8 kodeeringuga sümbolid.

Kõik number tüüpi parameetrid on ASCII kood'ide jada vahemikus 47-57 (numbrid 0-9).

Kõik timestamp tüüpi parameetrid on ISO8601 formaadis timestamp'id.

## Andmekogu ja Klientrakenduse poolt kasutavate päringute tehniline kirjeldus

### purposedeclarations

Päringu abil saab Andmenõusolekuteenuselt küsida listi oma ettevõtte kehtivatest eesmärgideklaratsioonidest, mida saab kasutada juriidiliselt isikult andmenõusoleku küsimise päringute koostamiseks.

Kasutab: Teenusepakkuja/Klientrakendus

**TÄHTIS!** See päring annab tulemuse ainult juriidiliste isikute jaoks; pole kasutatav eesmärgideklaratsioonide korral, mis rakenduvad eraisikutelt nõusolekute küsimiseks.

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations

**Päringu käsu näide (curl):**

```
curl --location 'https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consentstage/api/legal-entity-consent/purposedeclarations' \
--header 'X-Road-Client: ee-dev/COM/10004252/sebpank' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json'
```

Teenusepakkuja tuvastatakse headeris oleva X-Road-Client abil.

**Vastus:**

```
{
  "SEB_SALARY_BENCHMARK",
    "SEB_SALARY_BENCHMARK_2",
    "Eesmargideklaratsiooni_identifikaator",
    "SEB_SALARY_BENCHMARK_R"
}
```

| Parameeter                           | Andmetüüp       | Kirjeldus                                                                                                                    |
| ------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| purposeDeclarationBusinessIdentifier | array of string | Kehtiva juriidilise isiku eesmärgideklaratsiooni identifikaator (võib olla mitu). Tagastatakse ainult need, mis on kehtivad. |

Kui ei leita ühtegi sobivat eesmärgideklaratsiooni, siis on vastus tühi list.

**Veahaldus:**

| Vea võti  | Veakood ja staatus | Vea kirjeldus                                               |
| --------- | ------------------ | ----------------------------------------------------------- |
| errorCode | VALIDATION (400)   | Päringul pole x-road-headerit pole kaasas, HTTP_BAD_REQUEST |

### create

Päringu abil saab algatada juriidilis(t)elt isiku(te)lt andmenõusoleku küsimise.

Kasutab: Teenusepakkuja/Klientrakendus

**TÄHTIS!** See päring on tehtud ainult juriidiliste isikute jaoks, pole kasutatav eraisikutelt nõusolekute küsimiseks.

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create

**Päringu käsu näide (curl):**

```
curl --location 'https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consentstage/api/legal-entity-consent/create' \
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

**Päring (Json):**

```
{
  "regCodes": [
    "10714404"
  ],
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R"
}
```

| Parameeter                           | On kohustuslik? | Andmetüüp        | Kirjeldus                                                      |
| ------------------------------------ | --------------- | ---------------- | -------------------------------------------------------------- |
| regCodes                             | jah             | array of strings | Andmesubjekti registrikood (võib olla mitu, maksimaalselt 100) |
| purposeDeclarationBusinessIdentifier | jah             | string           | Juriidilise isiku eesmärgideklaratsiooni identifikaator        |

Päringu kättesaamisel teostab JURNT kontrollid kahel tasemel: üldised kontrollid ja kontrollid iga registrikoodi jaoks.

Üldised kontrollid:

- x-tees autenditud Teenusepakkuja x-tee alamsüsteemi identifikaator on sama, mis on määratud juriidilise isiku eesmärgideklaratsioonis,

- eesmärgideklaratsioon on kehtiv,

- registrikoode on 1 - 100. **Veahaldus üldisel kontrollil:**

| Vea võti                                                          | Veakood ja staatus | Vea kirjeldus                                                                                                                                                                                |
| ----------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| error.business.requested-consents-not-related-to-any-declarations | VALIDATION (404)   | "REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS" - antud x-tee alamsüsteemi jaoks puuduvad kehtivad juriidilise isiku eesmärgideklaratsioonid                                            |
| error.validation                                                  | VALIDATION (400)   | Veateate info. Täidetakse ainult siis, kui leitakse viga. "SIZE" - registrikoodid puuduvad või registrikoode on üle 100, "NOT_BLANK" - eesmärgideklaratsiooni või registrikoodi väli puudub. |

Kontroll iga registrikoodi jaoks (peale üldiste kontrollide edukat läbimist):

- antud registrikoodiga juriidiline isik on olemas Äriregistris ja on kehtiv. Kontrollimiseks teeb JURNT päringu avalikku autocomplete-teenusesse https://avaandmed.ariregister.rik.ee/et/ariregistri-avaandmete-api/autocomplete-teenus.

Kehtivaks loetakse juriidiline isik, kelle staatus='R' (registrisse kantud). Muul juhul on tegu veaga ning JURNT tagastab Teenusepakkujale vastuses registrikoodi kohta vea "REG_CODE_INVALID" (vt tabelit „Vastus“). Korduvad registrikoodid on lubatud, vastuses kajastuvad need ühekordselt.

**Vastus:** (array of ojects) - sisaldab plokki iga juriidilise isiku kohta:

| Parameeter              | Andmetüüp | Kirjeldus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| regCode                 | string    | Andmesubjekti registrikood                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| consentRequestReference | string    | Genereeritud nõusolekutaotluse viide. See on erinev nõusolekuviitest, mis tekib peale kinnitamist. See on selleks, et enne kinnitamist oleks võimalik andmed kokku viia. Täidetakse ainult siis, kui status=OK.                                                                                                                                                                                                                                                                                                                                     |
| status                  | string    | Kui andmete töötlemine õnnestub, tagastatakse staatuseks „OK“. Kui andmete töötlemine ei õnnestunud, tagastatakse staatuseks „ERROR“, koos vastav errorCode väärtusega.                                                                                                                                                                                                                                                                                                                                                                             |
| errorCode               | string    | Veateate info. Täidetakse ainult siis, kui status=ERROR: "REG_CODE_INVALID" - antud registrikoodiga juriidilist isikut ei eksisteeri Äriregistri andmetel või registrikood ei vasta standardile, "DUPLICATE_CONSENTS_REQUESTED_IN_SUCCESSION" - vastava registrikoodi ja juriidilise isiku eesmärgideklaratiooniga nõusoleku küsimise päring (staatus OOTEL) on juba olemas, "ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED" - vastava registrikoodi ja juriidilise isiku eesmärgideklaratiooniga nõusolek on juba olemas (staatus KINNITATUD). |

Väljundi näide, kui üldised kontrollid läksid läbi ja üks registrikood sobis, teine mitte:

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

### status

Päringu abil saab küsida Andmenõusolekuteenuselt JURNT kehtivate nõusoleku(te) nõusolekuviited (_Consent Reference_) konkreetse eesmärgideklaratsiooni kohta. Saab valida nõusoleku staatuse(d), mille kohta nimekirja soovitakse.

Kasutab: Klientrakendus/Teenusepakkuja (andmete kasutaja)

**TÄHTIS!** See päring on tehtud ainult juriidiliste isikute jaoks, pole kasutatav eraisikutelt nõusolekute küsimiseks.

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status?page=0&size=20

Kui _page_ ja _size_ pole määratud, on automaatselt _page_=0 ja _size_=20. _Size_ ei saa olla üle 100; kui üle 100 panna, läheb sisemiselt automaatselt 100. Vastuse headeris on ka _header X-Total_count_, mis näitab, kui palju on kokku vastuseid. Selle järgi saab liidestaja otsustada, kas peab ka teisele lehele vaatama.

**Päringu käsu näide (curl):**

```
curl --location 'https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consentstage/api/legal-entity-consent/status?page=0&size=20 \
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

**Päring (Json):** (näidises küsitakse kolme staatuse kohta):

```
{
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R",
  "statuses": ["REJECTED", "APPROVED", "DECLINED"],
  "regCodes": ["10714404"]
}
```

| Parameeter                           | On kohustuslik? | Andmetüüp        | Kirjeldus                                                                                                                                                                                                                                                                          |
| ------------------------------------ | --------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| purposeDeclarationBusinessIdentifier | jah             | string           | Juriidilise isiku eesmärgideklaratsiooni identifikaator                                                                                                                                                                                                                            |
| regCodes                             | ei              | array of strings | Juriidilistest isikutest andmesubjektide registrikoodid, kelle vastuseid nõusolekupäringu(te)le soovitakse saada. Kui nimekiri on tühi, soovitakse andmeid kõigi juriidilisest isikutest andmesubjektide kohta, kellele on esitatud päring antud eesmärgideklaratsiooni(de) kohta. |
| consentStatus                        | ei              | array of strings | Nõusoleku staatus(ed), mille alusel otsitakse nõusolekuid.                                                                                                                                                                                                                         |

Päringu kättesaamisel teeb JURNT üldise kontrolli: kas x-tees autenditud Teenusepakkuja x-tee alamsüsteemi identifikaator on sama, mis on määratud juriidilise isiku eesmärgideklaratsioonis.

**Vastus:**

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

| Parameeter              | Andmetüüp | Kirjeldus                                                                                                                                                                                                     |
| ----------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| regCode                 | string    | Andmesubjekti registrikood                                                                                                                                                                                    |
| consentStatus           | string    | Vastava nõusoleku staatus                                                                                                                                                                                     |
| consentReference        | string    | Kehtiva nõusoleku nõusolekuviide – unikaalne kood, mida kasutatakse nõusoleku kehtivuse valideerimisel. Kui nõusolek pole kordagi kinnitatud, siis see on null.                                               |
| consentRequestReference | string    | Nõusolekutaotluse viide – unikaalne kood, mis genereeritakse nõusolekutaotluse loomisel. Selle eesmärk on, et enne kui nõusolek pole kehtiv oleks võimalik liidestujal kokku viia, mis staatuses on nõusolek. |

**Veahaldus:**

| Vea võti                                                          | Veakood ja staatus | Vea kirjeldus                                                                                                                                     |
| ----------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| error.validation                                                  | VALIDATION (400)   | Veateate info. Täidetakse ainult siis, kui sisendi formaat vigane ja server ei suuda lugeda.                                                      |
| error.business.requested-consents-not-related-to-any-declarations | VALIDATION (404)   | "REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS" - antud x-tee alamsüsteemi jaoks puuduvad kehtivad juriidilise isiku eesmärgideklaratsioonid |

### url

Päringu abil saab Andmenõusolekuteenuselt JURNT küsida nõusoleku(te) lingi (URL), mille kaudu saab Andmesubjekti suunata nõusolekutaotlusi vaatama ja nõusolekuid andma.

Kasutab: Teenusepakkuja/Klientrakendus (andmete kasutaja)

**TÄHTIS!** Andmesubjekti suunamiseks mitte kasutada sama linki mitu korda, sest vana lingi kaudu võidakse kuvada puudulikke andmeid. Andmesubjekti suunamisel peab alati küsima uue lingi **url** päringu abil.

Enne lingi genereerimist kontrollib JURNT, et päringus sisalduva registrikoodiga juriidiline isik on Äriregistris olemas ja on kehtiv.Kontrollimiseks teeb JURNT päringu avalikku autocomplete-teenusesse https://avaandmed.ariregister.rik.ee/et/ariregistri-avaandmete-api/autocomplete-teenus. Kehtivaks loetakse juriidiline isik, kelle staatus='R' (registrisse kantud). Muul juhul on tegu veaga ning JURNT tagastab Teenusepakkujale vastuses registrikoodi kohta vea "REG_CODE_INVALID"

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url

**Päringu käsu näide (curl):**

```
curl -k  \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent"/url \
-d "{ \
\"regCode\":\"12345678\",
\"callback\":\"https://www.ria.ee\",
\"purposeDeclarationBusinessIdentifiers\": [\"EesmärgideklaratsiooniID\"]
}"
```

**Päring (Json):**

```
{
  "purposeDeclarationBusinessIdentifier": "SEB_SALARY_BENCHMARK_R",
  "statuses": ["REJECTED", "APPROVED", "DECLINED"],
  "regCodes": ["10714404"]
}
```

| Parameeter                           | On kohustuslik? | Andmetüüp | Kirjeldus                                               |
| ------------------------------------ | --------------- | --------- | ------------------------------------------------------- |
| purposeDeclarationBusinessIdentifier | jah             | string    | Juriidilise isiku eesmärgideklaratsiooni identifikaator |
| regCode                              | jah             | string    | Juriidilistest isikutest andmesubjekti registrikood     |
| callback                             | jah             | string    | Klientrakenduse tagasisuunamise URL                     |

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama, mis on määratud eesmärgideklaratsioonis.

**Vastus:**

| Parameeter            | Andmetüüp | Kirjeldus                                                                                                              |
| --------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| consentGroupReference | string    | Nõusolekutaotluse viide - unikaalne kood, mida kasutatakse nõusolekutaotluste eristamiseks                             |
| url                   | string    | Nõusoleku(te) URL, mille kaudu Andmesubjekt saab anda Andmenõusolekuteenuses Kliendirakenduse poolt küsitud nõusolekud |

**Veahaldus:**

| Vea võti                        | Veakood ja staatus     | Vea kirjeldus                                                                                               |
| ------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| error.validation                | VALIDATION (400)       | Validatsiooni üldised veateated (kohustuslikud väljad määramata, registrikood \<\>8 märki, mittenumbriline) |
| error.http.404                  | HTTP_NOT_FOUND (404)   | Ei leitud kehtivaid nõusolekuid (staatuses APPROVED)                                                        |
| error.business.reg-code-invalid | REG_CODE_INVALID (400) | Registrikood ei vasta standardile                                                                           |

### client

Päringu abil saab küsida Andmenõusolekuteenuselt JURNT nõusoleku kehtivust. Kui küsitakse mitme nõusoleku kohta, tagastatakse vastus eraldi iga nõusoleku kohta samas vastusesõnumis.

Kasutab: Teenusepakkuja/Klientrakendus (andmete kasutaja)

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client

**Päringu käsu näide (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client?consentReference=70c894ea-9bcd-4f7e-b77c-4fce0aa8dc88"
```

**Päring:** https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client?consentReference=70c894ea-9bcd-4f7e-b77c-4fce0aa8dc88

| Parameeter       | On kohustuslik? | Andmetüüp | Kirjeldus                                                                                             |
| ---------------- | --------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| consentReference | jah             | string    | JURNT nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivust soovitakse valideerida |

**Tähtis!** Päringu kättesaamisel kontrollib JURNT, et x-tees autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama, mis on määratud nõusolekuga seotud eesmärgideklaratsioonis.

**Vastus:**

```
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "regCode": "12345678",
  "purposeDeclarationId": "ED_KAKS"
}
```

| Parameeter           | Andmetüüp            | Kirjeldus                                                                                |
| -------------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| consentReference     | string               | Nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivust valideeritakse. |
| consentExpiration    | timestamp (ISO 8601) | Nõusoleku kehtivusaja lõpp                                                               |
| regCode              | string               | Andmesubjekti registrikood                                                               |
| purposeDeclarationId | string               | Nõusolekuga seotud eesmärgideklaratsiooni identifikaator                                 |

**Veahaldus:**

| Vea võti                                       | Veakood ja staatus                    | Vea kirjeldus                                                                                                                  |
| ---------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| error.validation                               | VALIDATION (400)                      | Validatsiooni üldised veateated (kohustuslikud väljad määramata, registrikood \<\>8 märki, mittenumbriline)                    |
| error.http.404                                 | HTTP_NOT_FOUND (404)                  | clientSubsystemIdentifier (Klientrakenduse x-tee alamsüsteemi) ja consentReference kombinatsiooni kohta puudub kehtiv nõusolek |
| error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | Küsitud nõusolek ei ole staatuses APPROVED                                                                                     |

### dataprovider

Päringu abil saab küsida Andmenõusolekuteenuselt JURNT nõusoleku kehtivust ning kaasnevad andmed, mille abil Andmekogu saab kontrollida andmeedastuse tingimusi.

Kasutab: Andmekogu

**API URL:**

https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider

**Päringu käsu näide (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6"
```

**Päring:** https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/dataprovider?consentReference= 91e9844d-3b5e-4df8-9254-42316b1607b6

| Parameeter       | On kohustuslik? | Andmetüüp | Kirjeldus                                                                                             |
| ---------------- | --------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| consentReference | jah             | string    | JURNT nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivust soovitakse valideerida |

**Tähtis!** Päringu kättesaamisel kontrollib JURNT, et x-tees autenditud Andmekogu x‑tee alamsüsteemi identifikaator on sama, mis on määratud nõusolekuga seotud teenusedeklaratsioonis.

**Vastus:** (nõusolekuga seotud eesmärgideklaratsioon on seotud teenusedeklaratsiooniga IDga 12342)

```
{
   "consentReference": "70c894ea-9bcd-4f7e-b77c-4fce0aa8dc88",
    "consentExpiration": "2026-04-06T23:59:59.999Z",
    "regCode": "11434598",
    "clientSubsystemIdentifier": "EE/COM/10004252/sebpank",
    "serviceDeclarationId": "12342"
}
```

| Parameeter                | Andmetüüp            | Kirjeldus                                                                                                                                                                                                                                                 |
| ------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| regCode                   | string               | Andmesubjekti regiatrikood. _Märkus:_ Andmekogu peab kontrollima, et x-tees autenditud Klientrakenduse päring andmete järele sisaldab sama registrikoodi, mis on märatud selles parameetris                                                               |
| clientSubsystemIdentifier | string               | Eesmärgideklaratsioonis määratud klientrakenduse x-tee alamsüsteemi identifikaator. _Märkus:_ Andmekogu peab kontrollima, et x-tees autenditud Klientrakenduse alamsüsteem, mis saadab päringu andmete järele, on sama, mis on märatud selles parameetris |
| consentReference          | string               | JURNT nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivust valideeritakse                                                                                                                                                             |
| consentExpiration         | timestamp (ISO 8601) | Nõusoleku kehtivusaja lõpp                                                                                                                                                                                                                                |
| serviceDeclarationId      | string               | Nõusolekuga seotud teenusedeklaratsiooni identifikaator. _Märkus:_ Andmekogu peab kontrollima, et kaitstud teenus, mille kaudu Klientrakendus küsib andmed vastab selles parameetris määratud teenusedeklaratsiooni identifikaatorile                     |

**Veahaldus:**

| Vea võti                                       | Veakood ja staatus                    | Vea kirjeldus                                                                                                                  |
| ---------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| error.validation                               | VALIDATION (400)                      | Validatsiooni üldised veateated (kohustuslikud väljad määramata, registrikood \<\>8 märki, mittenumbriline)                    |
| error.http.404                                 | HTTP_NOT_FOUND (404)                  | dataProviderSubsystemIdentifier (Andmekogu x-tee alamsüsteemi) ja ConsentReference kombinatsiooni kohta puudub kehtiv nõusolek |
| error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | Küsitud nõusolek ei ole staatuses APPROVED                                                                                     |

### reportDataTransmission

Päringu abil saab teavitada Andmenõusolekuteenust JURNT sellest, et toimus isikuandmete edastus nõusoleku alusel Andmekogust Teenusepakkujale/Klientrakendusse.

Kasutab: Andmekogu

**Tähtis!** See päring on tehtud ainult juriidiliste isikute jaoks, pole kasutatav eraisikutelt nõusolekute küsimise korral.

**API URL ühest andmeedastusest teatamisel:**

https:///r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consent

**API URL mitmest andmeedastusest teatamisel:**

https:///r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consents

**Päringu käsu näide (curl):**

```
curl -k -X POST \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consent" \
-d "{ \
\"transmissionTimestamp\":\"2021-06-18T13:11:50.085Z\", \
\"consentReference\":\"226cd452-0459-404c-832d-4771bef14af3\"}"
```

**Päring:**

https:///r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/legal-entity-consent

| Parameeter            | On kohustuslik? | Andmetüüp | Kirjeldus                                                                                       |
| --------------------- | --------------- | --------- | ----------------------------------------------------------------------------------------------- |
| transmissionTimestamp | jah             | timestamp | Aeg, millal toimus andmeedastus Andmekogust Klientrakendusesse                                  |
| consentReference      | jah             | string    | Nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivuse soovitakse valideerida |

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees autenditud Andmekogu x‑tee alamsüsteemi identifikaator on sama, mis on määratud nõusolekuga seotud teenusedeklaratsioonis.

**Vastus:**

```
{
  "response": "success"
}
```

| Parameeter | Andmetüüp | Kirjeldus                                   |
| ---------- | --------- | ------------------------------------------- |
| response   | -         | Kui päring õnnestub, tagastatakse "success" |

**Veahaldus:**

| Vea võti         | Veakood ja staatus   | Vea kirjeldus                                                    |
| ---------------- | -------------------- | ---------------------------------------------------------------- |
| error.validation | VALIDATION (400)     | Validatsiooni üldised veateated (kohustuslikud väljad määramata) |
| error.http.404   | HTTP_NOT_FOUND (404) | ConsentReference ja X-tee client headeri jaoks puudub vaste      |

### getConsentHealth

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

### getReportingHealth

Päringu abil saab kontrollida Andmenõusolekuteenuse raporteerimisteenuse seisundit.

Kasutab: Andmekogu

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/health

**Päringu käsu näide (curl):**

```
curl -k -X GET \
-H "accept: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/health"
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

# Juhised andmenõusolekuteenuse JURNT testimiseks liidestuja poolt

Liidestuja-poolse testimise eesmärgiks on veenduda, et liidestuv(ad) infosüsteem(id) on valmis Andmenõusolekuteenusega JURNT vahetama nõusolekute (consent) andmeid. Testid on kirjeldatud API väljakutsete tasemel, see annab võimaluse liitujal testida nii otse API (arenduse varasemas faasis) kui oma kasutajaliidese kaudu.

Testid katavad nõusolekutega seotud funktsionaalsuse ja on organiseeritud selliselt, et esmalt on kirjeldatud põhistsenaariumi testid ning seejärel veahalduse testid. Veahalduse testidest on valitud olulisemad, et liidestuv süsteem saaks veenduda oma veahalduse toimimises. Soovi korral võib äriliselt mitteolulised testid vahele jätta või oma teenuse spetsiifika seisukohalt olulisi teste lisada.

Testide eeltingimuseks on Teenusedeklaratsiooni (TD) (koos infosüsteemiga) ning seda tarbiva(te) Eesmärgideklaratsiooni(de) (ED) olemasolu Andmenõusolekuteenuses. Nende sisestamine ei kuulu hetkel testide skoopi, sest seda on võimalik teha Andmenõusolekuteenuse kasutajaliidese kaudu.

Siiski tuleb testides kasutatava Infosüsteemi, Teenusedeklaratsiooni ja Eesmärgideklaratsioonide puhul pidada silmas, et andmed tuleks sisestada võimalikult realistlikud, st võimalikult lähedased sellele, mis nad töökeskkonnas olema hakkavad. Nõusolekute olekute loogika ülevaateks vaata palun olekudiagrammi ptk 4.

Testidesse ei ole kaasatud nõusoleku aegumise (Expired) ning mittevajalikuks muutumise (Inapplicable) stsenaariumid, kuna need toimuvad Andmenõusolekuteenuses automaatselt vastavalt deklaratsioonide ja nõusolekute kehtivuskuupäevade saabumisele. Soovi korral on võimalik neid testida, sisestades Teenusedeklaratsioonile ja eesmärgideklaratsioonile sobilikud kuupäevad (nt kehtivuse lõpp homme, Teenusedeklaratsioonil nõusoleku kehtivuse maksimaalne kestus 1 päev) ning andes nõusolekud ning jälgides nõusolekute oleku muutumist tähtaja saabudes.

## Nõusolekute URL'i loomine ja nõusolekutaotluse informatsiooni kuvamine (esmane ja korduv)

_Testijuhtum 1 Nõusoleku URLi genereerimine ning nõusoleku info vaatamine (1 eesmärgideklaratsioon)_

| N   | Tegevus                                                                                                                                                                            | Oodatav tulemus                                                                                                              |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url korrektsete sisendparameetritega (registrikood, ED identifikaator ja X-Tee alamsüsteem) | Kontrolli, et tagastatakse nõusolekute URL, mida on võimalik järgmises sammus kasutada                                       |
| 2   | Kasuta saadud nõusolekuviidet Andmenõusolekuteenuses küsitud nõusolekute kuvamiseks                                                                                                | Kontrolli, et tagastatakse nõusolek REQUESTED staatuses vastavalt sisendparameetriks olnud registrikoodi, TD ja ED andmetele |

_Testijuhtum 2 Nõusoleku URLi genereerimine ning nõusoleku info vaatamine (mitu eesmärgideklaratsiooni – test läbida juhul, kui sellise stsenaariumi jaoks on olemas sisuline vajadus)_

| N   | Tegevus                                                                                                                                                                                                                                                          | Oodatav tulemus                                                                                                                |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url korrektsete sisendparameetritega (registrikood, rohkem kui 1 ED identifikaatorit ja X-Tee alamsüsteem). Sisendiks olevad EDd peavad olema seotud sama alamsüsteemiga. | Kontrolli, et tagastatakse nõusolekute URL, mida on võimalik järgmises sammus kasutada                                         |
| 2   | Kasuta saadud nõusolekuviidet Andmenõusolekuteenuses JURNT küsitud nõusolekute kuvamiseks                                                                                                                                                                        | Kontrolli, et tagastatakse nõusolekud REQUESTED staatuses vastavalt sisendparameetriks olnud registrikoodi, TD ja ED andmetele |

_Testijuhtum 3 Nõusoleku URLi genereerimine, kui antud registrikoodi, ED ning X-Tee alamsüsteemi jaoks on juba olemas nõusolekutaotlus või nõusolek (erinevates staatustes)_

Eeltingimus: nõusolekute uuesti küsimise/mitteküsimise loogika testimiseks on oluline, et infosüsteemi oleks loodud erinevates olekutes nõusolekuid, sest loogika sõltub neist. Võid testida korraga ühe eesmärgideklaratsiooniga või mitmega (vastavalt kuidas tundub sisuliselt realistlik kasutusjuhtum)

| N   | Tegevus                                                                                                                                                                                                                                                                                                        | Oodatav tulemus                                                                   |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url korrektsete sisendparameetritega (registrikood, ED identifikaator ja X-Tee alamsüsteem), kui selle kombinatsiooniga on juba APPROVED nõusolek olemas. Sisendiks olevad EDd peavad olema seotud sama alamsüsteemiga. | Kontrolli, et tagastatakse viga ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED |
| 2   | Nagu samm 1, kuid olemasolev nõusolek on REQUESTED                                                                                                                                                                                                                                                             | Kontrolli, et tagastatakse uus url olemasolevale nõusolekutaotlusele              |
| 3   | Nagu samm 1, kuid olemasolev nõusolek on DECLINED või EXPIRED olekus                                                                                                                                                                                                                                           | Kontrolli, et genereeritakse uus nõusolek uue url’iga                             |

_Testijuhtum 4 Nõusoleku URLi alternatiivsed stsenaariumid_

| N   | Tegevus                                                                                                                                                                                                                                                 | Oodatav tulemus                                                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url validatsioonireeglitele mittevastava registrikoodiga (mittenumbriline, kontrollnumber vale, lühem/pikem kui 8 märki), teised sisendparameetrid on korrektsed | Vale kontrollnumbri puhul kontrolli veateadet koodiga ID_CODE_INVALID, formaadi vea puhul VALIDATION |
| 2   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url tundmatu ED identifikaatoriga, teised parameetrid on korrektsed                                                                                              | Kontrolli veateadet koodiga PURPOSE_DECLARATIONS_NOT_FOUND                                           |
| 3   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/url X-Tee alamsüsteemiga, mis ei lange kokku ED-s kasutusel oleva alamsüsteemiga, teised sisendparameetrid on korrektsed                                         | Kontrolli veateadet koodiga PURPOSE_DECLARATIONS_NOT_FOUND                                           |

## Eesmärgideklaratsioonide pärimine (Teenusepakkuja)

_Testijuhtum 5 Eesmärgideklaratsioonide pärimine_

| N   | Tegevus                                                                                                                                                                                   | Oodatav tulemus                                                                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations oma X-Tee kliendi jaoks, kellel on vähemalt üks valiidne eesmärgideklaratsioon | Kontrolli, et tagastatakse eesmärgideklaratsioonid VALID olekus ja et need oleksid sama alamsüsteemi identifikaatoriga |
| 2   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/purposedeclarations X-Tee kliendi jaoks, kellel pole eesmärgideklaratsioone                        | Kontrolli, et tagastatakse tühi _list_                                                                                 |

## Nõusoleku päringu algatamine / nõusoleku küsimine (Teenusepakkuja)

_Testijuhtum 6 Üldised kontrollid loetelu kohta_

| N   | Tegevus                                                                                                                                                                                           | Oodatav tulemus                                                                    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create et sisendiks on üks registrikood, üks JURNT eesmärgideklaratsioon, mis ei sobi selle alamsüsteemiga | Kontrolli, et tagastatakse viga REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS |
| 2   | Nagu samm 1, kuid registrikoodid sisendis puuduvad või neid on üle 100                                                                                                                            | Kontrolli, et tagastatakse validatsiooni viga SIZE                                 |
| 3   | Nagu samm 1, kuid eesmärgideklaratsioonid sisendis puuduvad                                                                                                                                       | Kontrolli, et tagastatakse validatsiooni viga NOT_BLANK                            |

_Testijuhtum 7 Üldised kontrollid loetelu kohta_

| N   | Tegevus                                                                                                                                                                                      | Oodatav tulemus                                                                                                                                                                                                                                                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/create et sisendiks on üks kehtiv registrikood, kellel on vähemalt üks valiidne eesmärgideklaratsioon | Kontrolli, et tagastatakse õige registrikood, nõusolekuviit, staatus OK ja veakoode pole                                                                                                                                                                                                             |
| 2   | Nagu samm 1, kuid registrikoodid sisendis on mitu kehtivat registrikoodi, kellel on vähemalt üks valiidne eesmärgideklaratsioon                                                              | Kontrolli, et tagastatakse kõik õiged registrikoodid, nõusolekuviidad, staatus OK ja veakoode pole                                                                                                                                                                                                   |
| 3   | Nagu samm 1, kuid sisendis on mitu kehtivat registrikoodi, kellest mõnel on vähemalt üks valiidne eesmärgideklaratsioon, mõnel mitte                                                         | Kontrolli, et <br> - tagastatakse kõik õiged registrikoodid, nõusolekuviidad, staatus OK ja veakoode pole, kui on valiidne eesmärgideklatatsioon, <br> - tagastatakse õiged registrikoodid, nõusolekuviit null, staatus ERROR ja veakood REG_CODE_INVALID, kui pole valiidset eesmärgideklaratsiooni |

## Nõusoleku andmine (_approve_) ja keeldumine/tagasivõtmine (_decline_)

Nõusoleku andmise ja keeldumise testijuhtumid ei ole toodud välja API väljakutsete tasemel, kuna need funktsionaalsused on realiseeritud Nõusolekuteenuse JURNT kasutajaliideses eesti.ee Ettevõtjaportaalis.

Veendumaks, et klientrakendus ja Andmenõusolekuteenus suudavad korrektselt andmeid vahetada ja õppimaks tundma, kuidas Andmenõusolekuteenus toimib, tuleks läbi teha vähemalt järgmised stsenaariumid:

1. Nõusolekute andmine - peatükis 6.1 kirjeldatud testides küsitud nõusolekuviidetele vastavate nõusolekute andmine kasutaja poolt ning kontrollimine, et nõusolekud on kehtivad

2. Nõusolekute andmisest keeldumine - peatükis 6.1 kirjeldatud testides küsitud nõusolekuviidetele vastavate nõusolekute mitteandmine kasutaja poolt, ning kontrollimine, et nõusolekuid kuvatakse sama lingi kaudu uuesti

3. Nõusolekust taganemine - varasemate testide käigus antud nõusolekute tagasivõtmine ning kontrollimine, et nõusolekud on tagasi võetud.

## Nõusolekuviidete pärimine

_Testijuhtum 8 Nõusolekuviidete pärimine_

| N   | Tegevus                                                                                                                                                                                                                                                         | Oodatav tulemus                                                                              |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status eelnevalt antud kehtivaid nõusolekuid omava sisendite (registrikood, ED identifikaator, X-Tee alamsüsteem) komplekti kohta                                        | Kontrolli, et tagastatakse ainult APPROVED olekus nõusolekuviited koos ED identifikaatoriga. |
| 2   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status juhul, kui kehtivaid nõusolekuid etteantud sisendite komplekti puhul ei ole, on teistes olekutes nõusolekuid (registrikood, ED identifikaator, X-Tee alamsüsteem) | Kontrolli, et tagastatakse HTTP_NOT_FOUND                                                    |

_Testijuhtum 9 Nõusolekuviidete pärimine – alternatiivsed stsenaariumid_

| N   | Tegevus                                                                                                                                                     | Oodatav tulemus                           |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 1   | Käivita https:///r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/status kui puudub kehtiv nõusolek sisendparameetrite komplekti jaoks | Kontrolli, et tagastatakse HTTP_NOT_FOUND |

## Nõusolekute valideerimine (Klientrakendus ja Andmekogu)

_Testijuhtum 10 Nõusolekute valideerimine (Klientrakenduse ja Andmekogu jaoks)_

Eeltingimus: nõusolekute valideerimiseks on ideaalis vajalik koostada erinevates staatustes nõusolekuid (REQUESTED, APPROVED, DECLINED, EXPIRED, INAPPLICABLE), kuid valideerimise loogika esmaseks testiks piisab APPROVED nõusolekust ning alternatiivse stsenaariumi testiks ühes DECLINED, EXPIRED või INAPPLICABLE nõusolekust (mittevaliidsed nõusolekud käituvad kõik samamoodi).

| N   | Tegevus                                                                                                                                                                                                                                                                                   | Oodatav tulemus                                                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Käivita https://\<turvaserveri-aadress\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client/validation/client kokkulangevate clientSubsystemIdentifier ning consentReferencega, kui vastav nõusolek on APPROVED staatuses                            | Kontrolli, et tagastatakse nõusolekuga seotud andmed (consentReference, consentExpiration, idCode, purposeDeclarationID)                            |
| 2   | Käivita https://\<turvaserveri-aadress\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client/validation/client kokkulangevate clientSubsystemIdentifier ning consentReferencega, kui vastav nõusolek on mõnes muus staatuses kui APPROVED             | Kontrolli, et nõusoleku infot ei tagastata                                                                                                          |
| 3   | Käivita https://\<turvaserveri-aadress\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client/validation/dataprovider kokkulangevate dataProviderSubsystemIdentifier ning consentReferencega, kui vastav nõusolek on APPROVED staatuses                | Kontrolli, et tagastatakse nõusolekuga seotud andmed (consentReference, ConsentExpiration, idCode, clientSubsystemIdentifier, serviceDeclarationID) |
| 4   | Käivita https://\<turvaserveri-aadress\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/legal-entity-consent/validation/client/validation/dataprovider kokkulangevate dataProviderSubsystemIdentifier ning consentReferencega, kui vastav nõusolek on mõnes muus staatuses kui APPROVED | Kontrolli, et nõusoleku infot ei tagastata                                                                                                          |

## Nõusolekute alusel edukast andmete pärimisest raporteerimine (Andmekogu)

_Testijuhtum 11 Nõusolekute alusel andmete pärimisest raporteerimine (raporteerib andmekogu)_

Eeltingimus: on olemas mõni nõusolek, millele raporteerida

| N   | Tegevus                                                                                                                                                                                                                                    | Oodatav tulemus                                                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | Käivita https://\<turvaserveri-aadress\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/reporting/legal-entity-consent olemasoleva nõusoleku consentReference-ga ning Xtee päringus olev alamsüsteem langeb kokku küsija alamsüsteemiga. | Kontrolli, et tagastatakse “success” vastus ning võib kontrollida raporteerimise kirje olemasolu Andmenõusolekuteenuses |
| 2   | Käivita https://\<turvaserveri-aadress\>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/ reporting/legal-entity-consent consentReference-ga, mida ei eksisteeri, ning Xtee päringus olev alamsüsteem langeb kokku küsija alamsüsteemiga. | Kontrolli veaolukorra haldamist, raporteerimise kirjet ei teki Andmenõusolekuteenusesse                                 |

# Andmenõusolekuteenuse haldusliidese kasutamise juhend

Andmenõusolekuteenuse haldusliides on mõeldud eesmärgideklaratsioonide, teenusedeklaratsioonide, ja nendega seotud infosüsteemide (andmekogude) haldamiseks.

**Üldised põhimõtted**

- Enne deklaratsioonide esitamist peavad Andmenõusolekuteenusesse (JURNT) olema lisatud vajalikud infosüsteemid.

- Esialgu esitatakse teenusedeklaratsioon(id) ja seejärel eesmärgideklaratsioon(id).

- Kui vajaliku teenuse jaoks on teenusedeklaratsioon juba olemas, pole seda uuesti deklareerida vaja, saab kasutada olemasolevat teenusedeklaratsiooni.

- Ühe infosüsteemiga võib olla seotud mitu teenusedeklaratsiooni. Ühe teenusedeklaratsiooniga võib olla seotud mitu eesmärgideklaratsiooni.

- Iga erineva andmekomplekti jaoks peab deklareerima eraldi teenusedeklaratsiooni, isegi kui andmed tulevad samast teenusest.

- Juhul, kui Klientrakendus vajab mitmes teenusedeklaratsioonides kirjeldatud andmeid, peab deklareerima mitu vastavat eesmärgideklaratsiooni. Üks eesmärgideklaratsioon võib olla seotud ainult ühe teenusedeklaratsiooniga.

![Loogilised seosed infosüsteemide ja deklaratsioonide vahel](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image4.png)

## Haldusliidese rollid

| Roll                                       | Kirjeldus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Milliseid vaateid näeb                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RIA administraator                         | RIA administraator lisab/kustutab kasutajaid (teisi RIA administraatoreid ja infosüsteemide haldureid) ja jagab õiguseid: igale infosüsteemide haldurile määratakse tema vastutuses olev registrikood (või mitu registrikoode), mida valitakse rippmenüüst kõikidega x-tee kataloogist saadud registrikoodidega (member code). <br> <br> RIA administraator saab olla samal ajal ka infosüsteemide haldur, kui määrab endale sellist rolli. Sellel juhul talle peavad olema kättesaadavad nii RIA administraatorile kui ka infosüsteemide haldurile nähtavad vaated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | •Haldusliidese kasutajate haldus <br> •Nõusolekute terviklus                                                                                                                                                                                                                                                                                                                                                                          |
| Infosüsteemide haldur (Andmekogu esindaja) | Andmenõusolekuteenuse haldusliidese põhikasutaja. <br> <br> Infosüsteemide haldur lisab, muudab, kustutab infosüsteeme oma vastutuses oleva registrikoodi(de) piires. Lisades/muutes infosüsteemi, näeb alamsüsteemide valikus ainult need alamsüsteemid, mis on seotud temale määratud registrikoodidega. <br> <br> Teeb statistikat oma vastutuses oleva(te) registrikoodi(de) piires. <br> <br> Juhul, kui on märgistatud valik „RIA administraatori statistika", saab teha statistikat üle kogu infosüsteemi. Seda valikut kasutavad RIA administraatorid. <br> <br> Ühe infosüsteemi eest saab vastutada mitu infosüsteemi haldurit. Iga haldur saab lisada/muuta/kustutada tema vastutuses olevaid infosüsteeme. Igal infosüsteemi halduril on ligipääs kõigile nendele infosüsteemidele ja deklaratsioonidele, mille alamsüsteemi identifikaatoris olev registrikood = tema kasutajaga seotud registrikood (member code). Kui infosüsteemi halduri kasutajakonto kustutatakse, tema poolt sisestatud infosüsteemid jäävad alles. <br> <br> Infosüsteemide haldur esitab ja haldab enda vastutuses olevate infosüsteemidega seotud teenusedeklaratsioone. <br> <br> Infosüsteemide haldur esitab ja haldab enda vastutuses olevaid eesmärgideklaratsioone. Infosüsteemide haldur saab seostada eesmärgideklaratsioonid ainult tema vastutusalas olevate teenusedeklaratsioonidega. | •Infosüsteemide koondvaade <br> •Infosüsteemi lisamine <br> •Infosüsteemi muutmine <br> •Teenusedeklaratsioonide koondvaade <br> •Teenusedeklaratsiooni esitamine <br> •Teenusedeklaratsiooni detailvaade <br> •Teenusedeklaratsiooni muutmine <br> •Eesmärgideklaratsioonide koondvaade <br> •Eesmärgideklaratsiooni esitamine <br> •Eesmärgideklaratsiooni detailvaade <br> •Eesmärgideklaratsiooni muutmine <br> •Statistika vaade |

## Infosüsteemide haldus

Andmenõusolekuteenuse haldusliideses registreeritakse kaitstud teenuste pakkuvate infosüsteemide andmed. Nende andmetega täidetakse automaatselt vastavad väljad teenusedeklaratsioonides, mis lihtsustab deklaratsioonide esitamise protsessi.

### Infosüsteemide haldusega seotud vaated

Infosüsteemide lisamise ja haldusega Andmenõusolekuteenuse haldusliideses on seotud järgmised vaated:

**Infosüsteemide nimekiri**

Ülevaade kõikidest lisatud infosüsteemidest, mille haldamiseks on kasutajal õigus. Võimaldab infosüsteemide nimekirja sorteerida erinevate tulpade andmete järgi.

Iga deklaratsiooniga saab teha järgmisi tegevusi:

"Muuda" - ava infosüsteemi detailvaade ja muuda infosüsteemi andmeid.

"Kustuta" - teosta infosüsteemi loogiline kustutamine. Kustutamine on võimalik ainult siis, kui infosüsteemiga pole seotud ühtegi kehtivat teenusedeklaratsiooni.

![Infosüsteemide nimekiri](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image5.jpg)

**Infosüsteemi lisamine**

Uue infosüsteemi lisamise vorm. Sisestatavad andmed on detailselt kirjeldatud jaotises [7.2.2](#infosüsteemi-andmed).

![Infosüsteemi lisamine](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image6.jpg)

**Infosüsteemi muutmine**

Vaade, mis võimaldab muuta infosüsteemi andmed. Infosüsteemi andmete muutmine ei mõjuta sellega seotud teenusedeklaratsioone - seal jäävad endised andmed. Uued teenusedeklaratsioonid luuakse kasutades uued andmed.

![Infosüsteemi muutmine](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image6.jpg)

### Infosüsteemi andmed

| Välja nimi                                              | Kirjeldus                                                                                                                                                                                                       | Näidisväärtus         | Saab muuta? |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| Infosüsteemi nimi                                       | Kaitstud teenuste (andmeid) pakkuva infosüsteemi nimi                                                                                                                                                           | Keskkonna infosüsteem | Jah         |
| Andmenõusolekuteenust kasutav alamsüsteem               | Infosüsteemile vastav alamsüsteem, mis hakkab pöörduma Andmenõusolekuteenusesse. <br> Iga infosüsteemi puhul saab valida ainult ühte alamsüsteemi. <br> Infosüsteemi ja alamsüsteemi vahel on seos „üks ühele“. | EE/GOV/70009770/digi  | Jah         |
| Vastutav töötleja (omanik)                              | Vastutava töötleja (omaniku) asutuse ametlik nimi. <br> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el                                                                                               | Statistikaamet        | Jah         |
| Vastutava töötleja registrikood                         | Vastutava töötleja (omaniku) asutuse registrikood.                                                                                                                                                              | 70000332              | Jah         |
| Volitatud töötleja (mittekohustuslik väli)              | Volitatud töötleja asutuse ametlik nimi. <br> https://akit.cyber.ee/term/12750 <br> Kui volitatud töötlejat ei ole, jäetakse väli tühjaks.                                                                      | Andmekeskus           | Jah         |
| Volitatud töötleja registrikood (mittekohustuslik väli) | Volitatud organisatsiooni registrikood. <br> Kui volitatud töötlejat ei ole, jäetakse väli tühjaks.                                                                                                             | 70009770              | Jah         |

## Teenusedeklaratsioonide haldus

Teenusedeklaratsioon (TD) kirjeldab infosüsteemi (Andmekogu) pakutavat kaitstud teenust, mille kasutamiseks on vajalik andmesubjekti nõusolek. Mõned teenusedeklaratsiooni andmed kuvatakse andmesubjektile nõusoleku andmisel (vt jaotis [9](#nõusoleku-mall)).

### Teenusedeklaratsioonide haldusega seotud vaated

Teenusedeklaratsioonide esitamise ja haldusega Andmenõusolekuteenuse haldusliideses on seotud järgmised vaated:

**Teenusedeklaratsioonide nimekiri**

Ülevaade kõikidest esitatud teenusedeklaratsioonidest. Võimaldab deklaratsioonide nimekirja sorteerida erinevate tulpade andmete järgi ning filtreerida infosüsteemide ja staatuste järgi.

Iga deklaratsiooniga saab teha järgmised tegevused:

"Vaata" - ava deklaratsiooni detailvaade kõikide selle andmetega

"Muuda kehtetuks" - muuda teenusedeklaratsiooni staatus KEHTETU-ks ning muuda kõik sellega seotud eesmärgideklaratsioonid ja nendega seotud nõusolekud kehtetuteks.

"Klooni" - kasuta deklaratsioon mallina uue deklaratsiooni jaoks - uue deklaratsiooni esitamise vorm täidetakse automaatselt kloonitava deklaratsiooni andmetega edasiseks redigeerimiseks.

![Teenusedeklaratsionide nimekiri](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%208.png)

**Teenusedeklaratsiooni esitamine**

Uue teenusedeklaratsiooni esitamise vorm. Sisestatavad andmed on detailselt kirjeldatud jaotises [7.3.2.](#teenusedeklaratsiooni-andmed)

![Teenusedeklaratsioni esitamine](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%209.png)

**Teenusedeklaratsiooni detailvaade**

Kuvab teenusedeklaratsiooniga seotud andmed - nii põhiandmed kui ka metaandmed. Samuti, kuvab mitu kehtivat eesmärgideklaratsiooni ja mitu kehtivat nõusolekut on seotud antud teenusedeklaratsiooniga. Detailvaate kaudu saab avaldada soovi muuta kehtiva deklaratsiooni andmed, vajutades nuppu "Muuda deklaratsiooni andmed".

![Teenusedeklaratsioni detailvaade](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image10.png)

**Teenusedeklaratsiooni muutmine**

Vaade, mis võimaldab kehtiva teenusedeklaratsiooni andmeid osaliselt muuta. Millised väljad tohib/ei tohi muuta on kirjeldatud jaotises [7.3.2.](#teenusedeklaratsiooni-andmed)

![Teenusedeklaratsioni muutmine](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image11.png)

### Teenusedeklaratsiooni andmed

| Välja nimi                                    | Kirjeldus                                                                                                                                                                                                                                                                                                                         | Näidisväärtus                                                                                                                    | Saab muuta?      |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Teenust pakkuv infosüsteem                    | Rippmenüü, mis sisaldab Andmenõusolekuteenusesse lisatud infosüsteemide nimesid. TD esitamise vormis valitakse üks nendest valikutest - infosüsteem, mis pakub deklareeritavat andmeteenust.                                                                                                                                      | Keskkonna infosüsteem                                                                                                            | Ei               |
| Andmenõusolekuteenust kasutav alamsüsteem     | Valitud infosüsteemile vastav alamsüsteem, mis hakkab pöörduma Andmenõusolekuteenusesse. Parameeter, mille järgi kontrollitakse, et Andmenõusolekuteenuse poole pöörduv x-tees autenditud Andmekogu alamsüsteem on õige osapool sellise päringu tegemiseks. (Väli täidetakse automaatselt teenust pakkuva infosüsteemi valimisel) | EE/GOV/70009770/digi                                                                                                             | Ei               |
| Vastutav töötleja (omanik)                    | Vastutava töötleja (omaniku) asutuse ametlik nimi <br> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el (Väli täidetakse automaatselt teenust pakkuva infosüsteemi valimisel)                                                                                                                                            | Statistikaamet                                                                                                                   | Ei               |
| Vastutava töötleja registrikood               | Vastutava töötleja (omaniku) asutuse registrikood. (Täidetakse automaatselt teenust pakkuva infosüsteemi valimisel)                                                                                                                                                                                                               | 70000332                                                                                                                         | Ei               |
| Volitatud töötleja                            | Volitatud töötleja asutuse ametlik nimi <br> https://akit.cyber.ee/term/12750 (Täidetakse automaatselt teenust pakkuva infosüsteemi valimisel)                                                                                                                                                                                    | Andmekeskus                                                                                                                      | Ei               |
| Volitatud töötleja registrikood               | Volitatud organisatsiooni registrikood. (Täidetakse automaatselt teenust pakkuva infosüsteemi valimisel)                                                                                                                                                                                                                          | 70009770                                                                                                                         | Ei               |
| Teenusedeklaratsiooni identifikaator          | Teenusedeklaratsiooni inimloetav unikaalne tunnus                                                                                                                                                                                                                                                                                 | hl7_seisundiandmed                                                                                                               | Ei               |
| Teenusedeklaratsiooni nimi                    | Deklareeritava teenuse kaudu edastatava andmekoosseisu kokkuvõtlik lühike nimi (nähtav andmesubjektile nõusoleku andmekomplekti pealkirjana)                                                                                                                                                                                      | Seisundiandmed                                                                                                                   | Jah              |
| Teenuse tehniline kirjeldus                   | Teenuse tehniline kirjeldus. MVP skoobi raames - informatiivne väli sisemiseks kasutamiseks.                                                                                                                                                                                                                                      | X-tee teenuse 'hl7' päring, HL7 OID: 1.3.6.1.4.1.28284.6.1.1.35                                                                  | Jah              |
| Kasutatav x-tee teenus                        | Deklareeritav teenus. MVP skoobi raames - informatiivne väli sisemiseks kasutamiseks.                                                                                                                                                                                                                                             | EE/GOV/70009770/digi/ESGPäring/v4                                                                                                | Ei               |
| Teenuse andmekoosseisu kirjeldus              | Teenuse inimloetav kirjeldus. Tagastatavad andmed, teenuse sisu jne. Kuvatakse nõusoleku andmisel andmesubjektile.                                                                                                                                                                                                                | ESG aruande koostamisega seotud andmed: <br> •keskmine energiatarbimine, <br> •jäätmekäitluse maht, <br> •töötingimuste hinnang. | Jah              |
| Nõusoleku maksimaalne kehtivusaeg             | Mitu päeva maksimaalselt saab kehtida andmesubjekti nõusolek alates nõusoleku andmise hetkest. Selle põhjal arvutatakse nõusoleku kehtivusaja lõppkuupäev, mida näidetakse andmesubjektile nõusoleku andmisel.                                                                                                                    | 60                                                                                                                               | Jah              |
| Teenusedeklaratsiooni kehtivusaja lõppkuupäev | TD kehtivusaja lõppkuupäev võib olla määramata (siis TD kehtib kuni selle muudetakse kehtetuks manuaalselt) või konkreetne valitud kuupäev (kui TD kehtivusaeg lõppeb, siis ka seotud ED muutuvad kehtetuteks)                                                                                                                    | 15.05.2026                                                                                                                       | Jah              |
| Nõusolek vajab allkirja:                      | Kas nõusolek tuleb digitaalselt allkirjastada. <br>Peale märke tegemist ja deklaratsiooni esitamist enam märget muuta ei saa. <br>Kui valik on märgistatud, kuvatakse järgnevad valikud: <br> •Nõusolek vajab loobumisel allkirja; <br> •Genereeri nõusoleku metaandmetest JSON.                                                  | Jah/ei                                                                                                                           | Ei               |
| Nõusolek vajab loobumisel allkirja            | Kas nõusoleku loobumisel tuleb nõusolek digitaalselt allkirjastada. <br>Peale märke tegemist ja deklaratsiooni esitamist enam märget muuta ei saa.                                                                                                                                                                                | Jah/ei                                                                                                                           | Ei               |
| Teenus juriidilise isiku andmetele            | Kas teenus on mõeldud juriidilise isiku andmete edastamise jaoks.                                                                                                                                                                                                                                                                 | Jah/ei                                                                                                                           | Ei               |
| Genereeri nõusoleku metaandmetest JSON        | Kas nõusoleku allkirjastamisel genereeritakse nõusoleku metaandmetest JSON fail ja tõstetakse DigiDoc konteinerisse. <br>Peale märke tegemist ja deklaratsiooni esitamist enam märget muuta ei saa.                                                                                                                               | Jah/ei                                                                                                                           | Ei               |
| Nõusoleku pikendamine lubatud                 | Kas kinnitatud/allkirjastatud nõusolekute pikendamine on lubatud <br> Märkus: Juriidilise isiku andmete korral on väärtuseks "Ei", pole muudetav.                                                                                                                                                                                 | Jah/ei                                                                                                                           | Ei               |
| Deklaratsiooni esitamise kuupäev              | TD loomise kuupäev. ED alati hakkab kehtima alates esitamise kuupäevast.                                                                                                                                                                                                                                                          | 09.06.2023                                                                                                                       | Ei               |
| Deklaratsiooni vormi täitis                   | Infosüsteemide haldur (tema nimi ja roll süsteemis), kes täitis TD esitamise vormi.                                                                                                                                                                                                                                               | Mart Mets (Infosüsteemi haldur)                                                                                                  | Ei               |
| Viimati muudetud                              | Kuupäev, kuna TD andmed olid viimati muudetud                                                                                                                                                                                                                                                                                     | 09.06.2023                                                                                                                       | Ei               |
| Viimane muutja                                | Infosüsteemide haldur (tema nimi ja roll süsteemis), kes viimasena muutis TD andmed                                                                                                                                                                                                                                               | Mart Mets (Administraator)                                                                                                       | Ei               |
| Staatus                                       | TD olek. Võimalikud olekud: KEHTIV ja KEHTETU’ (vt. jaotis 7.2.3.)                                                                                                                                                                                                                                                                | kehtiv                                                                                                                           | Ainult kehtetuks |

### Teenusedeklaratsiooni seisundidiagramm

![Teenusedeklaratsiooni seisundidiagramm](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image12.png)

## Eesmärgideklaratsioonide haldus

Eesmärgideklaratsioon (ED) kirjeldab andmesaajat (Klientrakendust/Teenusepakkujat) ja kaitstud andmeteenuse tarbimise eesmärki. Mõned eesmärgideklaratsiooni andmed kuvatakse andmesubjektile nõusoleku andmisel (vt jaotis [9](#nõusoleku-mall)).

### Eesmärgideklaratsioonide haldusega seotud vaated

Eesmärgideklaratsioonide esitamise ja haldusega Andmenõusolekuteenuse haldusliideses on seotud järgmised vaated:

**Eesmärgideklaratsioonide nimekiri**

Ülevaade kõikidest esitatud eesmärgideklaratsioonidest. Võimaldab deklaratsioonide nimekirja sorteerida erinevate tulpade andmete järgi, filtreerida staatuste järgi ning otsida deklaratsioone deklareerija nime järgi.

Iga deklaratsiooniga saab teha järgmised tegevused:

- _"Vaata"_ - ava deklaratsiooni detailvaade kõikide selle andmetega

- _"Muuda kehtetuks"_ - muuda eesmärgideklaratsiooni staatus KEHTETUks ja muuda kehtetuks ka kõik selle deklaratsiooniga seotud nõusolekud.

- _"Klooni"_ - kasuta deklaratsioon mallina uue deklaratsiooni jaoks - uue deklaratsiooni esitamise vormi automaatselt täidetakse kloonitava deklaratsiooni andmetega edasiseks redigeerimiseks.

![Eesmärgideklaratsioonide nimekiri](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2013.png)

**Eesmärgideklaratsiooni esitamine**

Uue eesmärgideklaratsiooni esitamise vorm. Sisestatavad andmed on detailselt kirjeldatud jaotises [7.4.2.](#eesmärgideklaratsiooni-andmed)

![Eesmärgideklaratsiooni esitamine](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2014.png)

**Eesmärgideklaratsiooni detailvaade**

Kuvab eesmärgideklaratsiooniga seotud andmed - nii põhiandmed kui ka metaandmed. Samuti, kuvab mitu kehtivat nõusolekut on seotud antud eesmärgideklaratsiooniga. Detailvaate kaudu saab avaldada soovi muuta kehtiva deklaratsiooni andmed, vajutades nuppu "Muuda deklaratsiooni andmed". „Laadi alla" nuppu vajutades saab eesmärgideklaratsiooni andmed CSV formaadis alla laadida.

![Eesmärgideklaratsiooni detailvaade](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2015.png)

**Eesmärgideklaratsiooni muutmine**

Vaade, mis võimaldab kehtiva eesmärgideklaratsiooni andmeid osaliselt muuta. Milliseid välju tohib/ei tohi muuta, on kirjeldatud jaotises [7.4.2.](#eesmärgideklaratsiooni-andmed)

![Eesmärgideklaratsiooni muutmine](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2016.png)

### Eesmärgideklaratsiooni andmed

| Välja nimi                                                 | Kirjeldus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Näidisväärtus                                                                                                                                                                                                                                                                                                                         | Saab muuta?      |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Andmete saaja nimi                                         | Klientrakenduse (ED deklareerija) ettevõte/asutuse ametlik nimi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Aruanded AS                                                                                                                                                                                                                                                                                                                           | Ei               |
| Andmete saaja registrikood                                 | Klientrakenduse (ED deklareerija) ettevõte/asutuse registrikood                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 87654321                                                                                                                                                                                                                                                                                                                              | Ei               |
| Andmenõusolekuteenust kasutav alamsüsteem                  | Kliendirakenduse alamsüsteem, mis hakkab pöörduma Andmenõusolekuteenusesse. Parameeter, mille järgi kontrollitakse, et Andmenõusolekuteenuse poole pöörduv x-tees autenditud Kliendirakenduse alamsüsteem on õige osapool sellise päringu tegemiseks. Rippmenüü sisaldab kõike alamsüsteeme x-tee kataloogist ja toetab _autocomplete_ otsingut.                                                                                                                                                                                                                                        | EE/COM/87654321/digi                                                                                                                                                                                                                                                                                                                  | Ei               |
| Andmete saaja pakutav teenus                               | Teenusepakkuja/Klientrakenduse või selle äriteenuse kaubanduslik nimi. Annab Andmesubjektile info, milline konkreetne äriteenus/infosüsteem hakkab kasutama tema isikuandmeid.                                                                                                                                                                                                                                                                                                                                                                                                          | Keskkond_1                                                                                                                                                                                                                                                                                                                            | Ei               |
| Kasutatav teenusedeklaratsioon                             | Teenusedeklaratsioon (infosüsteemi nimi-TD identifikaator), millega deklareeritakse eesmärgi täitmiseks vajalikke andmeid pakkuvat kaitstud teenust. <br> <br> Teenusedeklaratsiooni (TD) valimine toimub kahe sammuga: <br> 1) Infosüsteemi (millega on seotud TD) valimine - rippmenüü, mis sisaldab "Infosüsteemide halduse" kaudu lisatud infosüsteemide nimed. <br> 2) TD identifikaatori valimine - rippmenüü, mis sisaldab eelmises sammus valitud infosüsteemiga seotud kehtivate teenusedeklaratsioonide identifikaatorid. <br> <br> Ühe ED-ga võib olla seotud ainult üks TD. | Keskkonna infosüsteem - KESKK_ARUANNE (teenus juriidilise isiku andmetele)                                                                                                                                                                                                                                                            | Ei               |
| Eesmärgideklaratsiooni identifikaator                      | Eesmärgideklaratsiooni inimloetav unikaalne tunnus.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ARUANNE_KOOST                                                                                                                                                                                                                                                                                                                         | Ei               |
| Eesmärgideklaratsiooni nimi                                | Deklareeritava andmete kasutamise eesmärgi inimloetav lühike nimi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ESG aruanne                                                                                                                                                                                                                                                                                                                           | Jah              |
| Andmete kasutamise eesmärk                                 | Andmesubjekti andmete kasutamise eesmärgi kirjeldus.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Kui lubate Keskkonnanäitajate infosüsteemil enda ettevõtte andmeid edastada ettevõttele Aruanded AS, võimaldab see teile pakkuda ESG aruande koostamise teenust.<br> Aruanded AS kasutab Keskkonnanäitajate infosüsteemist saadud andmeid Teie ettevõtte jätkusuutlikkuse hindamiseks ning koostab nende põhjal vajaliku ESG aruande. | Jah              |
| Andmete saaja andmekaitsetingimused                        | Klientrakenduse või selle äriteenuse andmekaitsetingimused (lisada lingina)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | https://andmekaitsetingimused.ee                                                                                                                                                                                                                                                                                                      | Jah              |
| Eesmärgideklaratsiooni kehtivusaja lõppkuupäev             | ED kehtivusaja lõppkuupäevaks määratakse kasvõi sama kuupäev, mis on TD kehtivusaja lõppkupäev (võib olla ka "määramata"), või valitakse eraldi kuupäev ED jaoks.                                                                                                                                                                                                                                                                                                                                                                                                                       | määramata                                                                                                                                                                                                                                                                                                                             | Ei               |
| Deklaratsiooni esitamise kuupäev (määratakse automaatselt) | ED loomise kuupäev. ED hakkab alati kehtima alates esitamise kuupäevast.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 09.06.2023                                                                                                                                                                                                                                                                                                                            | Ei               |
| Deklaratsiooni vormi täitis (määratakse automaatselt)      | Infosüsteemide haldur (tema nimi ja roll süsteemis), kes täitis ED esitamise vormi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Mart Mets (Infosüsteemi haldur)                                                                                                                                                                                                                                                                                                       | Ei               |
| Viimati muudetud (määratakse automaatselt)                 | Kuupäev, millal ED andmed olid viimati muudetud.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 09.06.2023                                                                                                                                                                                                                                                                                                                            | Ei               |
| Viimane muutja (määratakse automaatselt)                   | Infosüsteemi haldur (tema nimi ja roll süsteemis), kes viimasena muutis ED andmed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Mart Mets (Infosüsteemi haldur)                                                                                                                                                                                                                                                                                                       | Ei               |
| Staatus                                                    | ED olek. Võimalikud olekud: KEHTIV ja KEHTETU (vt. jaotis 7.3.3.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | kehtiv                                                                                                                                                                                                                                                                                                                                | Ainult kehtetuks |

### Eesmärgideklaratsiooni seisundidiagramm

![Eesmärgideklaratsiooni seisundidiagramm](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image17.png)

# Statistika

Statistika menüü on mõeldud statistika tegemiseks haldusliideses olevate deklaratsioonide ja nendega seotud nõusolekute kohta. Statistikat saavad teha kõik infosüsteemi haldurid oma haldusala piires ning kasutajad märkega „RIA administraatori statistika" üle kogu süsteemi.

Statistika tegemiseks tuleb valida infosüsteem ja/või andmete saaja nimi:

- Infosüsteem - valikusse kuvatakse Infosüsteemid vastavalt oma vastutusalas olevate asutuste piires. Kui kasutaja on märkega „RIA administraatori statistika", siis kuvatakse valikusse infosüsteeme üle kogu süsteemi. Saab valida 1-n väärtust.

- Andmete saaja - ettevõtte otsingu väli andmete saaja nime järgi. Otsida saab andmete saaja järgi oma vastutusalas olevate asutuste piires. Kui kasutaja on märkega „RIA administraatori statistika", siis otsitakse andmete saajaid üle kogu süsteemi. Saab otsida ühe väärtuse järgi korraga.

## Statistika väljund

Statistika tulemuste tabelis saab näha statistikat vastavalt valitud Infosüsteemi ja/või andmete saaja järgi. Võimaldab statistika andmeid sorteerida erinevate tulpade järgi.

![Statistika väljund](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2018.png)

## Statistika andmestik

| Välja nimi                       | Kirjeldus                                                                                                                                                                                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Infosüsteem/Teenuse pakkuja      | Infosüsteemi nimi, mis pakub deklareeritavat teenust.                                                                                                                                                                                                                                                   |
| Andmete saaja                    | Kliendirakenduse (ED deklareerija) ettevõtte nimi)                                                                                                                                                                                                                                                      |
| Kehtivad teenusedeklaratsioonid  | Kehtivate teenusedeklaratsioonide arv kokku.                                                                                                                                                                                                                                                            |
| Kehtivad eesmärgideklaratsioonid | Kehtivate teenusedeklaratsioonide arv kokku infosüsteemi põhiselt ja ettevõtte põhiselt.                                                                                                                                                                                                                |
| Kehtivad nõusolekud              | Kehtivate nõusolekute arv kokku infosüsteemi põhiselt ja ettevõtte põhiselt                                                                                                                                                                                                                             |
| Valideeritud nõusolekud          | Valideeritud (ehk kinnitatud) nõusolekute arv kokku infosüsteemi põhiselt ja ettevõtte põhiselt. <br> <br>Kinnitatud nõusolekute arv sisaldab kõiki nõusolekuid, mis on ära kinnitatud ja mille staatus võib olla juba ka muutunud. Nt aegunud, tagasi võetud vms. Ei sisalda otsuse ootel nõusolekuid. |
| Kõik nõusolekud                  | Kõikide nõusolekute arv kokku infosüsteemi põhiselt ja ettevõtte põhiselt sõltumata nende staatusest.                                                                                                                                                                                                   |
| Kokku                            | Kokku arvude summad.                                                                                                                                                                                                                                                                                    |

# Nõusoleku mall

Järgmine tabel kirjeldab andmeid, mida nõusolek sisaldab.

| Andmeväli                                                                           | Näide                                                                                                                                                                                                                                                                                                                | Allikas                                                                                                                              |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Andmesubjekti nimi                                                                  | Finest AS                                                                                                                                                                                                                                                                                                            | nõusolek                                                                                                                             |
| Andmesubjekti registrikood                                                          | 10714404                                                                                                                                                                                                                                                                                                             | nõusolek                                                                                                                             |
| Andmekogu või infosüsteemi nimetus (andmete edastaja)                               | Keskkonna infosüsteem                                                                                                                                                                                                                                                                                                | teenusedeklaratsioon                                                                                                                 |
| Andmete vastutav töötleja (andmekogu või infosüsteemi haldaja) nimi ja registrikood | Statistikaamet (70000332)                                                                                                                                                                                                                                                                                            | teenusedeklaratsioon                                                                                                                 |
| Andmete volitatud töötleja nimi ja registrikood                                     | Andmekeskus (10000000)                                                                                                                                                                                                                                                                                               | teenusedeklaratsioon                                                                                                                 |
| Andmete saaja                                                                       | Aruanded AS                                                                                                                                                                                                                                                                                                          | eesmärgideklaratsioon                                                                                                                |
| Andmete saaja pakutav teenus (kaubanduslik nimi)                                    | Keskkond_1                                                                                                                                                                                                                                                                                                           | eesmärgideklaratsioon                                                                                                                |
| Andmed (andmekoosseisu kirjeldus)                                                   | ESG aruande koostamise jaoks vajalikud andmed: <br> •keskmine energiatarbimine, <br> •jäätmekäitluse maht,, <br> •töötingimuste hinnang.                                                                                                                                                                             | teenusedeklaratsioon                                                                                                                 |
| Andmete kasutamise eesmärk                                                          | Kui lubate Keskkonna infosüsteemil enda ettevõtte andmeid edastada ettevõttele Aruanded AS, võimaldab see teile pakkuda ESG aruande koostamise teenust. <br> Aruanded AS kasutab Keskkonna infosüsteemist saadud andmeid Teie ettevõtte jätkusuutlikkuse hindamiseks ning koostab nende põhjal vajaliku ESG aruande. | eesmärgideklaratsioon                                                                                                                |
| Andmete saaja andmekaitsetingimused                                                 | https://andmekaitsetingimused.ee                                                                                                                                                                                                                                                                                     | eesmärgideklaratsioon                                                                                                                |
| Nõusoleku kinnitaja - isiku nimi ja isikukood                                       | Kairi Sarapuu (4712220278)                                                                                                                                                                                                                                                                                           | nõusolek                                                                                                                             |
| Nõusolekust loobuja - isiku nimi ja isikukood                                       | Kairi Sarapuu (4712220278)                                                                                                                                                                                                                                                                                           | nõusolek                                                                                                                             |
| Nõusoleku kehtivus                                                                  | alates 23.12.2024 <br> kuni 20.02.2025                                                                                                                                                                                                                                                                               | nõusolek (kehtivusaeg arvutatakse: nõusoleku andmise kuupäev + nõusoleku maksimaalne kehtivusaeg päevades (teenusedeklaratsioonist)) |

# Andmenõusolekuteenuse kasutajaliides

Andmenõusolekuteenuse JURNT tavakasutajale mõeldud kasutajaliides on realiseeritud eraldiseisva veebirakendusena, mis moodustab osa eesti.ee Ettevõtjaportaalist. JURNT kasutajaliides on mõeldud juriidilisest isikust Andmesubjekti esindaja(te)le ja Teenusepakkuja esindaja(te)le ning koosneb neljast osast: nõusolekute andmine, nõusolekute haldus, nõusolekute küsimine ja ülevaade nõusolekute põhjal edastatud andmetest. Kasutaja leiab need peale juriidilise isiku esindajana eesti.ee sisselogimist menüüpunkti Andmenõusolek alt alamlehtedelt "Ootel nõusolekud", Kõik nõusolekud", "Nõusolekute küsimine" ja "Edastatud andmed". Alamlehe nägemine sõltub vastava kasutajarolli olemasolust.

## Nõusoleku andmine

Juriidilisest isikust Andmesubjekti esindaja saab tutvuda nõusolekutaotlustega ja anda vajalikud nõusolekud:

- unikaalse lingi kaudu, kuhu ta suunatakse Teenusepakkuja Klientrakendusest
- või e-kirja teel teavitusena saadetud linki kasutades
- või sisenedes eesti.ee Ettevõtjaportaalis andmenõusolekuteenuse JURNT alamlehele "Ootel nõusolekud".

### Klientrakenduse tegevused enne suunamist

Iga kord kui Klientrakendus soovib suunata Andmesubjekti esindajat nõusolekuid andma, peab see küsima Andmenõusolekuteenusest JURNT uue lingi vajalike nõusolekutaotluste komplektiga. Uus link küsitakse kasutades teenust **url** API (vt jaotis [5.1.4.](#url)).

Enne Andmenõusolekuteenusesse suunamist peab Klientrakendus informeerima Andmesubjekti või Andmesubjekti esindajat nõusoleku(te) andmise vajadusest, andmete töötlemise tingimustest ja eesootavast Andmenõusolekuteenusesse suunamisest. Kui Teenusepakkuja teeb nõusolekupäringu(d) JURNT kaudu, saadab JURNT automaatselt Andmesubjektile e-kirja teel teavituse läbi eesti.ee riikliku postkasti.

Näidistekst:

> Teenuse X kasutamiseks vajame Teie nõusolekut portaalis eesti.ee/nousolek, et vajalikke andmeid Y infosüsteemist küsida.

> Kui lubate Y infosüsteemil meile oma ettevõtte andmeid anda, siis vastutame nende töötlemise eest nii nagu  
>  meie **privaatsustingimustes (link)** kirjas on.  
>  **Miks meil seda vaja on ja miks see teile kasulik on? (link)**

> Lähen nõusolekut andma:

> **[nupp]**

### Andmenõusolekuteenuses

Juriidilisest isikust Andmesubjekti esindaja saab tutvuda nõusolekutaotlustega ja anda vajalikud nõusolekud peale eesti.ee portaali sisenemist ja enda autentimist TARA kaudu, kasutades ühte pakutavatest sisselogimisviisidest.

![TARA](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/image%2019.png)

Peale esindatava ettevõtte valikut saab kasutaja avada Andmenõusoleku menüüpunkti alt Ootel nõusolekute alamlehe, kus kuvatakse temale suunatud ootel nõusolekutaotluste loetelu vaade, nii et esimene, kõige uuem nõusolekutaotlus on avatud.

![Nõusolekutaotlused](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant1.png)

Pärast nõusolekutaotluse detailidega tutvumist saab Andmesubjekti esindaja valida, kas ta lubab või ei luba kirjeldatud andmekomplekti edastamist oma esindatava juriidilise isiku kohta käivate andmetega. Kui lubab, siis staatuse silt ja nupp muutuvad rohelisteks ning nupp "Kinnitan" aktiivseks.
Kui Andmesubjekti esindaja ei luba kirjeldatud andmekomplekti edastada, siis muutuvad staatuse silt ja nupp punasteks ning nupp "Kinnitan" aktiivseks.

![Luban](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant2.png)

PS! Kui andmekogu poolt on teenusedeklaratsioonis nõusoleku andmisel digitaalne allkirjastamine nõutud, siis tuleb nõusolek digitaalselt allkirjastada.

![Ei luba](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant3.png)

### Klientrakenduse tegevused peale suunamist

Peale Andmesubjekti esindaja tagasi suunamist küsib Klientrakendus Andmenõusolekuteenusest nõusolekuviited ning nende valideerimise, et teada saada, millised nõusolekud olid antud ja nüüd kehtivad. Kasutatakse **url** ja **client** API-d (vt jaotised [5.1.4.](#url) ja [5.1.5.](#client)).

Vastavalt saadud vastusele, kuvab Klientrakendus Andmesubjekti esindajale teate. Kui kõik vajalikud nõusolekud kehtivad, võib Klientrakendus hakata küsima andmeid Andmekogult ja osutama teenust Andmesubjektile või Andmesubjekti esindajale.

Kui mõned nõusolekud on puudu, küsib Klientrakendus Andmenõusolekuteenusest uue lingi (kasutades **url** API (vt jaotis [5.1.4.](#url)) ja suunab Andmesubjekti esindaja puuduvaid nõusolekuid andma.

## Nõusolekute haldus

Nõusolekute haldusvõimalused leiab juriidilisest isikust Andmesubjekti esindaja peale sisselogimist menüüpunkti Andmenõusolek alt alamlehelt "Kõik nõusolekud". Kasutaja saab juriidilise isiku esindajana näha kõiki nõusolekuid, mida ta on antud Andmesubjekti esindajana kinnitanud või millest loobunud, nii kehtivaid kui kehtetuid. Sellel lehel ei kuvata nõusolekutaotlusi (staatus Otsuse ootel), mida näeb alamlehel "Ootel nõusolekud".

Nõusolekuid saab filtreerida andmete saaja, andmete edastaja, andmete nimetuse, nõusoleku numbri ja kuupäevade (Kehtib alates, Kehtib kuni) järgi. Nõusolekute tabel on sorteeritav ühe veeru alusel.

![Minu nõusolekud](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant4.png)

Tabeli reale vajutades avaneb nõusoleku detailide vaade koos nupuga „Loobun nõusolekust“ kehtiva nõusoleku puhul. Selle nupu abil saab nõusoleku tagasi võtta. Värviline joon nõusoleku detailandmete ees viitab staatusele.

![Nõusoleku detailid ja loobumine](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant5.png)

Kui Andmesubjekti esindaja kinnitas või allkirjastas nõusoleku (sh ka loobus), siis nõusoleku detailandmetel kuvatakse kinnitaja/allkirjastaja nimi.

### Nõusolekust loobumine

Juriidilisest isikust Andmesubjekti esindaja saab nõusolekust loobuda nupust „Loobun nõusolekust“. Loobuda saab nõusolekust, mis on kehtiv (staatus Kinnitatud). Nõusolekust loobumine tuleb kasutajal üle kinnitada, et see ei tekiks kogemata.

Kui andmekogu poolt läbi teenusedeklaratsiooni on nõusolekust loobumisel digitaalne allkirjastamine nõutud, siis nõusolekust loobumine tuleb allkirjastada digitaalselt.

![Loobu või pikenda](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant6.png)

## Nõusoleku küsimine

Juriidilisest isikust Teenusepakkuja esindaja leiab peale eesti.ee portaali sisselogimist menüüpunkti Andmenõusolek alt vahelehelt "Nõusolekute küsimine" võimaluse potentsiaalsetele teenuse kasutajatele nõusolekupäringute tegemiseks. Loetelus on näha kõik sisseloginud kasutaja poolt tehtud nõusolekupäringud sõltumata nõusoleku staatusest.

![Vaadata nõusolekuid](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant7.png)

Nupu "+ Loo nõusoleku päring" kasutamise järel kuvatakse kasutajale hüpikaken nõusolekupäringu sisendandmete koostamiseks. Päringu tegemise eelduseks on, et esindataval juriidilisel isikul on olemas leping mõne andmete pakkujaga (andmekoguga), millel on olemas selle juriidilise isiku jaoks kehtiv(ad) andmeteenus(ed) (eesmärgideklaratsioon(id)).

Kasutaja otsib juriidilise isiku, kelle kohta soovitakse andmeid saada, valib rippmenüüdest andmete pakkuja, andmeteenuse ja andmete jagamise eesmärgi ning esitab päringu.

![Päringu esitamine](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant8.png)

Kui kasutaja on nõusolekupäringu ära esitanud, sulgub hüpikaken ja nõusolekupäringu loetelusse on juurde tekkinud uus päring staatuses "Otsuse ootel". Nõusolekute haldamise funktsionaalsus toimib ka sellel valamlehel nagu kirjeldatud eelnevas jaotises Nõusolekute haldus.

### Nõusolekute küsimine Klientrakenduse kaudu

Kui Teenusepakkuja Klientrakendus soovib juriidilisest isikust Andmesubjektidelt saada nõusolekuid andmete saamiseks Andmekogult, siis küsitakse kõigepealt kehtivaid eesmärgideklaratsioone kasutades teenust **purposedeclarations** API (vt jaotis [5.1.4.](#url)).

Valitud eesmärgideklaratsioonile vastavate andmete saamiseks Andmekogust tehakse nõusolekupäringud juriidilistele isikutele kasutades teenust **create** API (vt jaotis [5.1.4.](#url)). Klientrakendusel peavad registrikoodid eelnevalt teada olema. Korraga saab koostada nõusolekupäringud 1 - 100 juriidilisele isikule.

Kehtivate nõusolekute kohta saab Klientrakendus nõusolekuviited kasutades teenust **status** API (vt jaotis [5.1.5.](#client)).

## Edastatud andmed

Alamleht "Edastatud andmed" annab ülevaate sellest, millised edukad andmepäringud on tehtud Andmesubjekti nõusolekute alusel ja võimaldab jälgida enda esindatava juriidilise isiku kohta käivate andmete edastamisi.

![Edastatud andmed](../img/RIA%20juriidilise%20isiku%20kasutamine%20ja%20liidestamine/ant9.png)

Vaatel kuvatakse vaikimisi loetelu viimastest andmeedastusest, vastavalt valitud arvule "Näita korraga". Kasutaja saab ette anda ajavahemiku, mille jooksul edastatud andmed teda huvitavad, või ka otsida märksõna(de) alusel kolme alfabeetilise sisuga veeru põhjal.
