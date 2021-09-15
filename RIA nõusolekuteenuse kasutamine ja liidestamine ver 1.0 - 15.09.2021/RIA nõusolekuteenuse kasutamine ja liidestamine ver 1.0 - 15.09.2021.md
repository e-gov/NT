# RIA nõusolekuteenuse kasutamine ja liidestamine

15.09.2021

2020-01-14

Versioon 1.0

---
Versiooni ajalugu

| Kuupäev      | Versioon | Kirjeldus
| ---------- | --- | -----------
| 26.01.2021 | 0.1 | Dokument loodud
| 18.02.2021 | 0.2 | Dokument täiendatud
| 16.03.2021 | 0.3 | Dokument muudetud
| 03.05.2021 | 0.4 | Dokument muudetud
| 11.05.2021 | 0.5 | Dokument muudetud
| 25.05.2021 | 0.6 | Dokument muudetud
| 21.06.2021 | 0.7 | Dokument muudetud
| 15.09.2021 | 1.0 | Dokument avaldatud


<!-- markdownlint-disable MD033 -->

# **Sisukord** 

[1. Sissejuhatus 5](#sissejuhatus)

[1.1. Mõisted 5](#mõisted)

[2. Eeltingimused nõusolekuteenuse kasutamiseks
6](#eeltingimused-nõusolekuteenuse-kasutamiseks)

[3. Põhiprotsesside kirjeldus kasutusjuhtudena
7](#põhiprotsesside-kirjeldus-kasutusjuhtudena)

[3.1. Kasutusjuht 1: nõusolekute valideerimine (Klientrakendus) ja
andmesubjekti suunamine puuduvaid nõusolekuid andma
7](#kasutusjuht-1-nõusolekute-valideerimine-klientrakendus-ja-andmesubjekti-suunamine-puuduvaid-nõusolekuid-andma)

[3.2. Kasutusjuht 2: Andmete pärimine ja nõusoleku valideerimine
(andmekogu)
12](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)

[4. Nõusoleku seisundidiagramm 14](#nõusoleku-seisundidiagramm)

[5. Nõusolekuteenusega liidestamine ja päringute tehniline kirjeldus
15](#nõusolekuteenusega-liidestamine-ja-päringute-tehniline-kirjeldus)

[5.1. Andmekogu ja Klientrakenduse poolt kasutavate päringute tehniline
kirjeldus
15](#andmekogu-ja-klientrakenduse-poolt-kasutavate-päringute-tehniline-kirjeldus)

[5.1.1. getConsentGroupReference 15](#getconsentgroupreference)

[5.1.2. getConsentReferences 17](#getconsentreferences)

[5.1.3. validateConsentForClient 19](#validateconsentforclient)

[5.1.4. validateConsentForDataProvider
21](#validateconsentfordataprovider)

[5.1.5. reportDataTransmission 22](#reportdatatransmission)

[6. Juhised nõusolekuteenuse testimiseks liidestuja poolt
25](#juhised-nõusolekuteenuse-testimiseks-liidestuja-poolt)

[6.1. Nõusolekute URL'i loomine ja nõusolekutaotluse informatsiooni
kuvamine (esmane ja korduv)
25](#nõusolekute-urli-loomine-ja-nõusolekutaotluse-informatsiooni-kuvamine-esmane-ja-korduv)

[6.2. Nõusoleku andmine (*approve*) ja keeldumine/tagasivõtmine
(*decline*)
27](#nõusoleku-andmine-approve-ja-keelduminetagasivõtmine-decline)

[6.3. Nõusolekuviidete pärimine 28](#nõusolekuviidete-pärimine)

[6.4. Nõusolekute valideerimine (Klientrakendus ja Andmekogu)
28](#nõusolekute-valideerimine-klientrakendus-ja-andmekogu)

[6.5. Nõusolekute alusel edukast andmete pärimisest raporteerimine
(Andmekogu)
29](#nõusolekute-alusel-edukast-andmete-pärimisest-raporteerimine-andmekogu)

[7. Nõusolekuteenuse haldusliidese kasutamise juhend
31](#nõusolekuteenuse-haldusliidese-kasutamise-juhend)

[7.1. Rollid 31](#rollid)

[7.2. Infosüsteemide haldus 33](#infosüsteemide-haldus)

[7.2.1. Infosüsteemide haldusega seotud vaated
33](#infosüsteemide-haldusega-seotud-vaated)

[7.2.2. Infosüsteemi andmed 35](#infosüsteemi-andmed)

[7.3. Teenusedeklaratsioonide haldus
35](#teenusedeklaratsioonide-haldus)

[7.3.1. Teenusedeklaratsioonide haldusega seotud vaated
35](#teenusedeklaratsioonide-haldusega-seotud-vaated)

[7.3.2. Teenusedeklaratsiooni andmed 38](#teenusedeklaratsiooni-andmed)

[7.3.3. Teenusedeklaratsiooni seisundidiagramm
40](#teenusedeklaratsiooni-seisundidiagramm)

[7.4. Eesmärgideklaratsioonide haldus
40](#eesmärgideklaratsioonide-haldus)

[7.4.1. Eesmärgideklaratsioonide haldusega seotud vaated
40](#eesmärgideklaratsioonide-haldusega-seotud-vaated)

[7.4.2. Eesmärgideklaratsiooni andmed
43](#eesmärgideklaratsiooni-andmed)

[7.4.3. Eesmärgideklaratsiooni seisundidiagramm
45](#eesmärgideklaratsiooni-seisundidiagramm)

[8. Nõusoleku mall 46](#nõusoleku-mall)

[9. Nõusolekuteenuse kasutajaliides
48](#nõusolekuteenuse-kasutajaliides)

[9.1. Nõusoleku andmine 48](#nõusoleku-andmine)

[9.1.1. Enne suunamist 48](#enne-suunamist)

[9.1.2. Nõusolekuteenuses 49](#nõusolekuteenuses)

[9.1.3. Pärast suunamist 52](#pärast-suunamist)

[9.2. Nõusolekute haldus 52](#nõusolekute-haldus)

[9.2.1. Nõusolekuteenusest 52](#nõusolekuteenusest)

[9.2.2. Minu nõusolekud 53](#minu-nõusolekud)

[9.2.3. Edastatud andmed 54](#edastatud-andmed)

[9.2.4. Kasutustingimused 54](#kasutustingimused)

#  Sissejuhatus

Dokumendi eesmärgiks on kirjeldada RIA nõusolekuteenuse peamisi
kasutusmalle, andmevahetuse ja testimise põhimõtteid ning
kasutajaliideseid.

Dokument on aluseks RIA nõusolekuteenusega liidestamisele ja selle
kasutusele võtmisele.

## Mõisted

**Andmesubjekt (Data Subject)** -- isik, kellega on seotud Andmekogus
hoitavad isikuandmed.

**Andmekogu (Data Provider)** -- infosüsteem, mis hoiab Andmesubjekti
isikuandmeid.

**Klientrakendus** **(Client)** -- infosüsteem, mis vajab
Andmesubjektile teenuse osutamiseks Andmesubjekti andmeid Andmekogust.

**Nõusolekuteenus (Consent Service**) -- infosüsteem, mis vastutab
Andmesubjektide nõusolekute haldamise eest.

**Kaitstud teenus** **(Protected Service)** -- abstraktne Andmekogu
teenus, mis annab juurdepääsu Andmesubjekti andmetele ning mille
kasutamiseks on vajalik Andmesubjekti nõusolek.

**Teenusedeklaratsioon** **(Service Declaration)** -- ühe Andmekogu
poolt pakutava kaitstud teenuse ja edastavate andmete kirjeldus.
Registreeritakse Andmekogu poolt Nõusolekuteenuses.

**Eesmärgideklaratsioon (Purpose Declaration)** -- andmete kasutamise
eesmärgi kirjeldus. MVP raames registreeritakse Andmekogu poolt
Nõusolekuteenuses, on aluseks nõusolekutaotlustele.
Eesmärgideklaratsiooni sisu on pakutud Klientrakenduse poolt. Kui oma
eesmärkide saavutamiseks Klientrakendus vajab andmeid mitmetelt kaitstud
teenustelt (ühest või erinevatest andmekogudest), registreeritakse mitu
eesmärgideklaratsiooni -- iga teenuse jaoks eraldi. Sellel juhul
Klientrakendus peab saama ka mitu vastavat Andmesubjekti nõusolekut.

**Nõusolek (Consent)** -- Andmesubjekti poolt Andmekogule antud
nõusolek, mille alusel Andmekogu tohib kaitstud teenuste kaudu edastada
Klientrakendusele nõusolekus kirjeldatud andmeid nende töötlemiseks
nõusolekus kirjeldatud eesmärgil.

**Nõusolekutaotlus (Consent in status REQUESTED)** -- nõusolek, mida
vajab Klientrakendus Andmesubjektile teenuse osutamiseks, kuid
Andmesubjekt pole veel andnud.

**Nõusolekuviide (Consent Reference)** -- nõusoleku unikaalne kood, mida
kasutatakse nõusoleku kehtivuse valideerimisel.

# Eeltingimused nõusolekuteenuse kasutamiseks

Selleks, et võimaldada nõusolekute küsimist Andmesubjektilt
Klientrakenduse jaoks, peavad Andmekogu ja Klientrakendus tegema
järgmised sammud:

1.  Klientrakendus tutvub olemasolevate kaitstud teenuste ja andmekomplektidega x-tee kataloogis (<https://x-tee.ee/catalogue/ee-dev>) ja võtab ühendust Andmekoguga.

2.  Andmekogu kaalub Klientrakenduse andmete kasutamise sooviavaldust, uurib Klientrakenduse tausta ja usaldusväärsust. Kui osapooled jõuavad kokkuleppele, siis sõlmivad nad omavahel lepingu.

3.  Juhul, kui x-tee kataloogis ei ole Klientrakendusele vajalikku andmekomplekti, loob Andmekogu uue kaitstud teenuse, mis vastab Klientrakenduse vajadusele.

4.  Andmekogu esindaja -- Infosüsteemide haldur -- lisab Nõusolekuteenusesse infosüsteemi, mis hakkab pakkuma soovitud kaitstud teenust (kui see ei olnud lisatud varem) (vt jaotis [7.2.](#infosüsteemide-haldus))

5.  Andmekogu esindaja -- Infosüsteemide haldur -- lisab Nõusolekuteenusesse kaitstud teenuse kirjeldav Teenusedeklaratsiooni (vt jaotis [7.3.](#teenusedeklaratsioonide-haldus)). Kui vajaliku teenuse jaoks on Teenusedeklaratsioon juba olemas, pole seda uuesti deklareerida vaja, saab kasutada olemasolevat Teenusedeklaratsiooni.

6.  Klientrakendusega sõlmitud lepingu alusel, Andmekogu esindaja -- Infosüsteemide haldur -- lisab Nõusolekuteenusesse andmete kasutamise eesmärgi kirjeldava Eesmärgideklaratsiooni (vt jaotis [7.4.](#eesmärgideklaratsioonide-haldus))

7.  Pärast eesmärgideklaratsiooni esitamist ekspordib Andmekogu eesmärgideklaratsiooni andmeid Nõusolekuteenusest ja edastab selle Klientrakendusele (nt e-maili kaudu). Nende andmete hulgas edastatakse eesmärgideklaratsiooni unikaalne identifikaator, mida Klientrakendus hakkab kasutama Nõusolekuteenuse suhtlemisel.

8.  Klientrakendus liidestub Nõusolekuteenusega, võimaldades Andmesubjekti suunamist Nõusolekuteenusesse vajalike nõusolekute andmiseks.

# Põhiprotsesside kirjeldus kasutusjuhtudena

Peatükk sisaldab kahte peamist Andmekogu ja Klientrakendusega seotud
kasutusjuhtu, mis annavad ülevaade Nõusolekuteenuse API-de kasutamise
kontekstist.

## 3.1. Kasutusjuht 1: nõusolekute valideerimine (Klientrakendus) ja andmesubjekti suunamine puuduvaid nõusolekuid andma

**Tegutsejad:** Andmesubjekt, Klientrakendus, Nõusolekuteenus

**Osapooled ja nende huvid:**

-   Andmesubjekt soovib kasutada Klientrakenduse teenust, mille toimimiseks on vajalik Andmesubjekti nõusolek tema isikuandmete edastamisele ja töötlemisele.

-   Klientrakendus soovib veenduda, et kõik teenuse pakkumiseks vajalikud nõusolekud kehtivad, ja kui mõned nõusolekud on puudu - suunata Andmesubjekt Nõusolekuteenusesse, et ta saaks neid anda. Andmesubjekti tagasi suunamisel soovib Klientrakendus teada saada, kas vajalikud nõusolekud on antud või mitte.

-   Nõusolekuteenus soovib võimaldada Andmesubjektil kinnitada või tagasi lükata nõusolekutaotlused ning suunata Andmesubjekti tagasi Klientrakendusesse.

**Eeltingimused:** Klientrakendusel on teada Andmesubjekti isikukood,
ning enda teenusele vastavad eesmärgideklaratsioonide identifikaatorid.

**Järeltingimused:** Andmesubjekti poolt antud nõusolekud kehtivad ning
sellest on teada Klientrakendusele.

**Põhistsenaarium:**

1.  Andmesubjekt avaldab soovi kasutada Klientrakenduse teenust, mille toimimiseks on vajalik Andmesubjekti nõusolek (või mitu nõusolekut) tema isikuandmete edastamisele ja töötlemisele.

2.  Klientrakendus kontrollib Nõusolekuteenuse abil, kas teenuse pakkumiseks on olemas ja kehtivad kõik vajalikud Andmesubjekti nõusolekud. Kasutatakse ***getConsentReferences*** ja/või ***validateConsentForClient*** päringuid (vt jaotised [5.1.2.](#getconsentreferences) ja [5.1.3.](#validateconsentforclient)) Klientrakendus tuvastab, et mõned vajalikud nõusolekud on puudu või ei kehti.

3.  Klientrakendus küsib Nõusolekuteenuselt lingi, mis suunaks Andmesubjekti Nõusolekuteenuse kasutajaliidese kaudu puuduvaid nõusolekuid andma. Klientrakendus peab päringus saatma ainult nende eesmärgideklaratsioonide identifikaatorid, mis vastavad puuduvatele nõusolekutele. Kasutatakse ***getConsentGroupReference*** päringut (vt jaotis [5.1.1.](#getconsentgroupreference)). **TÄHTIS!** Mitte kasutada sama linki mitu korda, sest vana lingi kaudu võidakse kuvada puudulikke andmeid. Andmesubjekti suunamisel peab [alati]{.ul} küsima uue lingi **getConsentGroupReference** päringu abil.

4.  Nõusolekuteenuse poolt genereeritud lingi kaudu suunatakse Andmesubjekt nõusolekuid andma. Andmesubjekt logib sisse kasutades TARA autentimist.

5.  Andmesubjekt vaatab läbi nõusolekutaotlused, kinnitab need, millega nõustub, ja lükkab tagasi need, millega ei nõustu. Kui valikud on tehtud, vajutab ta nuppu „Kinnitan".

6.  Nõusolekuteenus muudab kinnitatud nõusolekutaotlused kehtivateks nõusolekuteks ning omistab neile nõusolekuviited. Nõusolekuteenus suunab Andmesubjekti tagasi Klientrakendusesse.

7.  Pärast Andmesubjekti tagasi suunamist küsib Klientrakendus Nõusolekuteenusest nõusolekuviited ning nende valideerimise, et teada saada, millised nõusolekud kehtivad. Kasutatakse ***getConsentReferences*** ja ***validateConsentForClient*** päringuid (vt jaotised [5.1.2.](#getconsentreferences) ja [5.1.3.](#validateconsentforclient)).

8.  Vastavalt saadud vastusele kuvab Klientrakendus Andmesubjektile teadet.

**Põhistsenaariumi jadadiagramm:**

![A picture containing text, screenshot, computer Description
automatically generated](media/image1.png){width="6.3in"
height="8.683333333333334in"}

**\
**

**Alternatiivsed stsenaariumid ja laiendused:**

2a. Klientrakendus tuvastab, et kõik vajalikud nõusolekud on olemas ja
kehtivad.

-   Klientrakendus pakub Andmesubjektile soovitud teenuse ja selle
    osutamiseks küsib vajalikud andmed Andmekogult. Käivitatakse
    „Kasutusjuht 2: Andmete pärimine ja nõusoleku valideerimine
    (andmekogu)" (vt. jaotis [3.2](#_Kasutusjuht_2:_Andmete).).

3a. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi mõned
küsitud nõusolekud olid varem juba antud Andmesubjekti poolt ja
kehtivad.

-   Nõusolekuteenus välistab kehtivad nõusolekud ja ei küsi neid
    genereeritud lindi kaudu Andmesubjektilt uuesti.

3b. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi kõik küsitud
nõusolekud olid varem juba antud Andmesubjekti poolt ja kehtivad.

-   Nõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
    veateatega. Protsess lõpeb.

3c. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi mõned
küsitud nõusolekud olid varem juba antud Andmesubjekti poolt, aga pärast
on aegunud või on Andmesubjekti pool tagasi võetud.

-   Nõusolekuteenus loob uued vastavad nõusolekutaotlused ja võimaldab
    Andmesubjektile genereeritud lingi kaudu nendega nõustuda.

3d. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi vähemalt üks
küsitud nõusolekutest on seotud kehtetu eesmärgideklaratsiooniga (s.t
andmeedastust selle eesmärgideklaratsiooni alusel üldse enam toimuda ei
saa).

-   Nõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
    veateatega. Protsess lõpeb.

3e. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi päring
sisaldab eesmärgideklaratsioonide identifikaatorid, mis ei eksisteeri.

-   Nõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
    veateatega. Protsess lõpeb.

3f. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi päring
sisaldab isikukoodi, mis kuulub alaealisele ja/või teovõimatule
Andmesubjektile.

-   Nõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
    veateatega. Protsess lõpeb.

5a. Andmesubjekt lahkub lehelt otsust tegemata ja „Kinnitan" nuppu
vajutamata.

-   Protsess lõpeb. Juhul, kui Andmesubjekt uuesti hakkab
    Klientrakendust kasutama, protsess algab uuesti põhistsenaariumi
    punktist 1.

