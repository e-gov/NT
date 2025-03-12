# RIA andmenõusolekuteenuse kasutamine ja liidestamine

28.01.2025

Versioon 2.1

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
| 08.12.2023 | 2.0 | Dokument muudetud
| 28.01.2025 | 2.1 | Dokument muudetud


<!-- markdownlint-disable MD033 -->

# **Sisukord** 

[1. Sissejuhatus](#sissejuhatus)

[1.1 Mõisted](#mõisted)

[2. Eeltingimused andmenõusolekuteenuse kasutamiseks](#eeltingimused-andmenõusolekuteenuse-kasutamiseks)

[3. Põhiprotsesside kirjeldus kasutusjuhtudena](#põhiprotsesside-kirjeldus-kasutusjuhtudena)

[3.1. Kasutusjuht 1: nõusolekute valideerimine (Klientrakendus) ja
andmesubjekti suunamine puuduvaid nõusolekuid andma
](#kasutusjuht-1-nõusolekute-valideerimine-klientrakendus-ja-andmesubjekti-suunamine-puuduvaid-nõusolekuid-andma)

[3.2. Kasutusjuht 1.1 Kliendirakendus valideerib Andmesubjekti
nõusoleku(d) ja suunab Andmesubjekti esindaja Andmesubjekti puudolevaid
nõusolekuid andma
](#kasutusjuht-1.1-kliendirakendus-valideerib-andmesubjekti-nõusolekud-ja-suunab-andmesubjekti-esindaja-andmesubjekti-puudolevaid-nõusolekuid-andma)

[3.3. Kasutusjuht 2: Andmete pärimine ja nõusoleku valideerimine
(andmekogu)
](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)

[4. Nõusoleku seisundidiagramm](#nõusoleku-seisundidiagramm)

[5. Andmenõusolekuteenusega liidestamine ja päringute tehniline kirjeldus](#andmenõusolekuteenusega-liidestamine-ja-päringute-tehniline-kirjeldus)

[5.1. Andmekogu ja Klientrakenduse poolt kasutavate päringute tehniline
kirjeldus](#andmekogu-ja-klientrakenduse-poolt-kasutavate-päringute-tehniline-kirjeldus)

[5.1.1. getConsentGroupReference](#getconsentgroupreference)

[5.1.2. getConsentReferences](#getconsentreferences)

[5.1.3. validateConsentForClient](#validateconsentforclient)

[5.1.4. validateConsentForDataProvider](#validateconsentfordataprovider)

[5.1.5. reportDataTransmission](#reportdatatransmission)

[5.1.6. getConsentGroupReferenceRepresentable
](#getconsentgroupreferencerepresentable)

[5.1.7. postConsentFilterByStatus](#postConsentFilterByStatus)

[6. Juhised andmenõusolekuteenuse testimiseks liidestuja poolt](#juhised-andmenõusolekuteenuse-testimiseks-liidestuja-poolt)

[6.1. Nõusolekute URL'i loomine ja nõusolekutaotluse informatsiooni
kuvamine (esmane ja korduv)](#nõusolekute-urli-loomine-ja-nõusolekutaotluse-informatsiooni-kuvamine-esmane-ja-korduv)

[6.2. Nõusoleku andmine (*approve*) ja keeldumine/tagasivõtmine
(*decline*)](#nõusoleku-andmine-approve-ja-keelduminetagasivõtmine-decline)

[6.3. Nõusolekuviidete pärimine](#nõusolekuviidete-pärimine)

[6.4. Nõusolekute valideerimine (Klientrakendus ja Andmekogu)](#nõusolekute-valideerimine-klientrakendus-ja-andmekogu)

[6.5. Nõusolekute alusel edukast andmete pärimisest raporteerimine
(Andmekogu)](#nõusolekute-alusel-edukast-andmete-pärimisest-raporteerimine-andmekogu)

[7. Andmenõusolekuteenuse haldusliidese kasutamise juhend](#andmenõusolekuteenuse-haldusliidese-kasutamise-juhend)

[7.1. Rollid](#rollid)

[7.2. Infosüsteemide haldus](#infosüsteemide-haldus)

[7.2.1. Infosüsteemide haldusega seotud vaated](#infosüsteemide-haldusega-seotud-vaated)

[7.2.2. Infosüsteemi andmed](#infosüsteemi-andmed)

[7.3. Teenusedeklaratsioonide haldus](#teenusedeklaratsioonide-haldus)

[7.3.1. Teenusedeklaratsioonide haldusega seotud vaated](#teenusedeklaratsioonide-haldusega-seotud-vaated)

[7.3.2. Teenusedeklaratsiooni andmed](#teenusedeklaratsiooni-andmed)

[7.3.3. Teenusedeklaratsiooni seisundidiagramm](#teenusedeklaratsiooni-seisundidiagramm)

[7.4. Eesmärgideklaratsioonide haldus](#eesmärgideklaratsioonide-haldus)

[7.4.1. Eesmärgideklaratsioonide haldusega seotud vaated](#eesmärgideklaratsioonide-haldusega-seotud-vaated)

[7.4.2. Eesmärgideklaratsiooni andmed](#eesmärgideklaratsiooni-andmed)

[7.4.3. Eesmärgideklaratsiooni seisundidiagramm](#eesmärgideklaratsiooni-seisundidiagramm)

[8. Statistika](#statistika)

[8.1. Statistika väljund](#statistika-väljund)

[8.1.1. Statistika andmestik](#statistika-andmestik)

[9. Nõusoleku mall](#nõusoleku-mall)

[10. Andmenõusolekuteenuse kasutajaliides](#andmenõusolekuteenuse-kasutajaliides)

[10.1. Nõusoleku andmine](#nõusoleku-andmine)

[10.1.1. Enne suunamist](#enne-suunamist)

[10.1.2. Andmenõusolekuteenuses](#Andmenõusolekuteenuses)

[10.1.3. Pärast suunamist](#pärast-suunamist)

[10.2. Nõusolekute haldus](#nõusolekute-haldus)

[10.2.1. Andmenõusolekuteenusest](#Andmenõusolekuteenusest)

[10.2.2. Minu nõusolekud](#minu-nõusolekud)

[10.2.3. Edastatud andmed](#edastatud-andmed)

[10.2.4. Kasutustingimused](#kasutustingimused)

# Sissejuhatus

Dokumendi eesmärgiks on kirjeldada RIA andmenõusolekuteenuse peamisi
kasutusmalle, andmevahetuse ja testimise põhimõtteid ning
kasutajaliideseid.

Dokument on aluseks RIA andmenõusolekuteenusega liidestamisele ja selle
kasutusele võtmisele.

## Mõisted

**Andmesubjekt (Data Subject)** -- isik, kellega on seotud Andmekogus
hoitavad isikuandmed.

**Andmesubjekti esindaja (Representative)** -– isik, kes esindab
Andmesubjekti.

**Andmekogu (Data Provider)** -- infosüsteem, mis hoiab Andmesubjekti
isikuandmeid.

**Klientrakendus** **(Client)** -- infosüsteem, mis vajab
Andmesubjektile teenuse osutamiseks Andmesubjekti andmeid Andmekogust.

**Andmenõusolekuteenus (Data Consent Service**) -- infosüsteem, mis vastutab
Andmesubjektide nõusolekute haldamise eest.

**Kaitstud teenus** **(Protected Service)** -- abstraktne Andmekogu
teenus, mis annab juurdepääsu Andmesubjekti andmetele ning mille
kasutamiseks on vajalik Andmesubjekti nõusolek.

**Teenusedeklaratsioon** **(Service Declaration)** -- ühe Andmekogu
poolt pakutava kaitstud teenuse ja edastavate andmete kirjeldus.
Registreeritakse Andmekogu poolt Andmenõusolekuteenuses.

**Eesmärgideklaratsioon (Purpose Declaration)** -- andmete kasutamise
eesmärgi kirjeldus. MVP raames registreeritakse Andmekogu poolt
Andmenõusolekuteenuses, on aluseks nõusolekutaotlustele.
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

# Eeltingimused andmenõusolekuteenuse kasutamiseks

Selleks, et võimaldada nõusolekute küsimist Andmesubjektilt
Klientrakenduse jaoks, peavad Andmekogu ja Klientrakendus tegema
järgmised sammud:

1.  Klientrakendus tutvub olemasolevate kaitstud teenuste ja andmekomplektidega x-tee kataloogis (<https://x-tee.ee/catalogue/ee-dev>) ja võtab ühendust Andmekoguga.

2.  Andmekogu kaalub Klientrakenduse andmete kasutamise sooviavaldust, uurib Klientrakenduse tausta ja usaldusväärsust. Kui osapooled jõuavad kokkuleppele, siis sõlmivad nad omavahel lepingu.

3.  Juhul, kui x-tee kataloogis ei ole Klientrakendusele vajalikku andmekomplekti, loob Andmekogu uue kaitstud teenuse, mis vastab Klientrakenduse vajadusele.

4.  Andmekogu esindaja -- Infosüsteemide haldur -- lisab Andmenõusolekuteenusesse infosüsteemi, mis hakkab pakkuma soovitud kaitstud teenust (kui see ei olnud lisatud varem) (vt jaotis [7.2.](#infosüsteemide-haldus))

5.  Andmekogu esindaja -- Infosüsteemide haldur -- lisab Andmenõusolekuteenusesse kaitstud teenuse kirjeldav Teenusedeklaratsiooni (vt jaotis [7.3.](#teenusedeklaratsioonide-haldus)). Kui vajaliku teenuse jaoks on Teenusedeklaratsioon juba olemas, pole seda uuesti deklareerida vaja, saab kasutada olemasolevat Teenusedeklaratsiooni.

6.  Klientrakendusega sõlmitud lepingu alusel, Andmekogu esindaja -- Infosüsteemide haldur -- lisab Andmenõusolekuteenusesse andmete kasutamise eesmärgi kirjeldava Eesmärgideklaratsiooni (vt jaotis [7.4.](#eesmärgideklaratsioonide-haldus))

7.  Pärast eesmärgideklaratsiooni esitamist ekspordib Andmekogu eesmärgideklaratsiooni andmeid Andmenõusolekuteenusest ja edastab selle Klientrakendusele (nt e-maili kaudu). Nende andmete hulgas edastatakse eesmärgideklaratsiooni unikaalne identifikaator, mida Klientrakendus hakkab kasutama Andmenõusolekuteenusega suhtlemisel.

8.  Klientrakendus liidestub Andmenõusolekuteenusega, võimaldades Andmesubjekti või Andmesubjekti esindaja suunamist Andmenõusolekuteenusesse vajalike nõusolekute andmiseks.

# Põhiprotsesside kirjeldus kasutusjuhtudena

Peatükk sisaldab kahte peamist Andmekogu ja Klientrakendusega seotud
kasutusjuhtu, mis annavad ülevaade Andmenõusolekuteenuse API-de kasutamise
kontekstist.

## Kasutusjuht 1: nõusolekute valideerimine (Klientrakendus) ja andmesubjekti suunamine puuduvaid nõusolekuid andma

**Tegutsejad:** Andmesubjekt, Klientrakendus, Andmenõusolekuteenus

**Osapooled ja nende huvid:**

-   Andmesubjekt soovib kasutada Klientrakenduse teenust, mille toimimiseks on vajalik Andmesubjekti nõusolek tema isikuandmete edastamisele ja töötlemisele.

-   Klientrakendus soovib veenduda, et kõik teenuse pakkumiseks vajalikud nõusolekud kehtivad, ja kui mõned nõusolekud on puudu - suunata Andmesubjekt Andmenõusolekuteenusesse, et ta saaks neid anda. Andmesubjekti tagasi suunamisel soovib Klientrakendus teada saada, kas vajalikud nõusolekud on antud või mitte.

-   Andmenõusolekuteenus soovib võimaldada Andmesubjektil kinnitada või tagasi lükata nõusolekutaotlused ning suunata Andmesubjekti tagasi Klientrakendusesse.

**Eeltingimused:** Klientrakendusel on teada Andmesubjekti isikukood,
ning enda teenusele vastavad eesmärgideklaratsioonide identifikaatorid.

**Järeltingimused:** Andmesubjekti poolt antud nõusolekud kehtivad ning
sellest on teada Klientrakendusele.

**Põhistsenaarium:**

1.  Andmesubjekt avaldab soovi kasutada Klientrakenduse teenust, mille toimimiseks on vajalik Andmesubjekti nõusolek (või mitu nõusolekut) tema isikuandmete edastamisele ja töötlemisele.

2.  Klientrakendus kontrollib Andmenõusolekuteenuse abil, kas teenuse pakkumiseks on olemas ja kehtivad kõik vajalikud Andmesubjekti nõusolekud. Kasutatakse ***getConsentReferences*** ja/või ***validateConsentForClient*** päringuid (vt jaotised [5.1.2.](#getconsentreferences) ja [5.1.3.](#validateconsentforclient)) Klientrakendus tuvastab, et mõned vajalikud nõusolekud on puudu või ei kehti.

3.  Klientrakendus küsib Andmenõusolekuteenuselt lingi, mis suunaks Andmesubjekti Andmenõusolekuteenuse kasutajaliidese kaudu puuduvaid nõusolekuid andma. Klientrakendus peab päringus saatma ainult nende eesmärgideklaratsioonide identifikaatorid, mis vastavad puuduvatele nõusolekutele. Kasutatakse ***getConsentGroupReference*** päringut (vt jaotis [5.1.1.](#getconsentgroupreference)). **TÄHTIS!** Mitte kasutada sama linki mitu korda, sest vana lingi kaudu võidakse kuvada puudulikke andmeid. Andmesubjekti suunamisel peab <ins>alati</ins> küsima uue lingi **getConsentGroupReference** päringu abil.

4.  Andmenõusolekuteenuse poolt genereeritud lingi kaudu suunatakse Andmesubjekt nõusolekuid andma. Andmesubjekt logib sisse kasutades TARA autentimist.

5.  Andmesubjekt vaatab läbi nõusolekutaotlused, kinnitab need, millega nõustub, ja lükkab tagasi need, millega ei nõustu. Kui valikud on tehtud, vajutab ta nuppu „Kinnitan".

6.  Andmenõusolekuteenus muudab kinnitatud nõusolekutaotlused kehtivateks nõusolekuteks ning omistab neile nõusolekuviited. Andmenõusolekuteenus suunab Andmesubjekti tagasi Klientrakendusesse.

7.  Pärast Andmesubjekti tagasi suunamist küsib Klientrakendus Andmenõusolekuteenusest nõusolekuviited ning nende valideerimise, et teada saada, millised nõusolekud kehtivad. Kasutatakse ***getConsentReferences*** ja ***validateConsentForClient*** päringuid (vt jaotised [5.1.2.](#getconsentreferences) ja [5.1.3.](#validateconsentforclient)).

8.  Vastavalt saadud vastusele kuvab Klientrakendus Andmesubjektile teadet.

**Põhistsenaariumi jadadiagramm:**

![Põhistsenaariumi jadadiagramm](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image1.png)


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

-   Andmenõusolekuteenus välistab kehtivad nõusolekud ja ei küsi neid
    genereeritud lindi kaudu Andmesubjektilt uuesti.

3b. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi kõik küsitud
nõusolekud olid varem juba antud Andmesubjekti poolt ja kehtivad.

-   Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
    veateatega. Protsess lõpeb.

3c. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi mõned
küsitud nõusolekud olid varem juba antud Andmesubjekti poolt, aga pärast
on aegunud või on Andmesubjekti pool tagasi võetud.

-   Andmenõusolekuteenus loob uued vastavad nõusolekutaotlused ja võimaldab
    Andmesubjektile genereeritud lingi kaudu nendega nõustuda.

3d. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi vähemalt üks
küsitud nõusolekutest on seotud kehtetu eesmärgideklaratsiooniga (s.t
andmeedastust selle eesmärgideklaratsiooni alusel üldse enam toimuda ei
saa).

-   Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
    veateatega. Protsess lõpeb.

3e. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi päring
sisaldab eesmärgideklaratsioonide identifikaatorid, mis ei eksisteeri.

-   Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
    veateatega. Protsess lõpeb.

3f. Klientrakendus küsib lingi nõusolekute andmiseks, kuigi päring
sisaldab isikukoodi, mis kuulub alaealisele ja/või teovõimatule
Andmesubjektile.

-   Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
    veateatega. Protsess lõpeb.

3g. Andmesubjekt lahkub lehelt otsust tegemata ja „Kinnitan" nuppu
vajutamata.

-   Protsess lõpeb. Juhul, kui Andmesubjekt uuesti hakkab
    Klientrakendust kasutama, protsess algab uuesti põhistsenaariumi
    punktist 1.

3h. Kliendirakendus küsib lingi nõusolekute andmiseks ja mõned küsitud 
nõusolekud on seotud teenusedeklaratsiooniga, kus on nõutud nõusoleku 
digitaalne allkirjastamine

-   Andmenõusolekuteenus loob nõusolekutaotlused ja võimaldab Andmesubjektil
    genereeritud lingi kaudu neid allkirjastada.

## Kasutusjuht 1.1: Kliendirakendus valideerib Andmesubjekti nõusoleku(d) ja suunab Andmesubjekti esindaja Andmesubjekti puudolevaid nõusolekuid andma.

**Osapooled ja nende huvid:**

  - Andmesubjekti esindaja soovib
    kasutada Klientrakenduse teenust, mille toimimiseks on vajalik
    Andmesubjekti nõusolek tema isikuandmete edastamisele ja
    töötlemisele.

  - Klientrakendus soovib veenduda, et
    kõik teenuse pakkumiseks vajalikud nõusolekud kehtivad ja kui mõned
    nõusolekud on puudu – suunata Andmesubjekti esindaja
    Andmenõusolekuteenusesse, et ta saaks Andmesubjekti eest neid anda.
    Andmesubjekti esindaja tagasi suunamisel soovib Klientrakendus teada
    saada, kas vajalikud nõusolekud on antud või mitte.

  - Andmenõusolekuteenus soovib võimaldada
    Andmesubjekti esindajal kinnitada või tagasi lükata Andmesubjekti
    nõusolekutaotlused ning suunata Andmesubjekti esindaja tagasi
    Klientrakendusesse.

**Eeltingimused:** Klientrakendusel on teada Andmesubjekti ja Andmesubjekti
esindaja isikukood, ning enda teenusele vastavad
eesmärgideklaratsioonide identifikaatorid.

**Järeltingimused:** Andmesubjekti esindaja poolt antud Andmesubjekti
nõusolekud kehtivad ning sellest on teada Klientrakendusele.

**Põhistsenaarium:**

1.  Andmesubjekti esindaja avaldab soovi kasutada Klientrakenduse
    teenust, mille toimimiseks on vajalik Andmesubjekti nõusolek (või
    mitu nõusolekut) Andmesubjekti isikuandmete edastamisele ja
    töötlemisele.

2.  Klientrakendus kontrollib Andmenõusolekuteenuse abil, kas teenuse
    pakkumiseks on olemas ja kehtivad kõik vajalikud Andmesubjekti
    nõusolekud. Kasutatakse ***getConsentReferences*** ja/või
    ***validateConsentForClient*** päringuid (vt jaotised
    [5.1.2](#getconsentreferences) ja [5.1.3.](#validateconsentforclient)) Klientrakendus tuvastab, et
    mõned vajalikud nõusolekud on puudu või ei kehti.

3.  Klientrakendus küsib Andmenõusolekuteenuselt lingi, mis suunaks
    andmesubjekti esindaja Andmenõusolekuteenuse kasutajaliidese kaudu
    Andmesubjekti puuduvaid nõusolekuid andma. Klientrakendus peab
    päringus saatma ainult nende eesmärgideklaratsioonide
    identifikaatorid, mis vastavad puuduvatele nõusolekutele.
    Kasutatakse ***getConsentGroupReferenceRepresentable*** päringut (vt
    jaotis [5.1.6.](#getconsentgroupreferencerepresentable)
    **TÄHTIS!** Mitte kasutada sama linki mitu korda, sest vana lingi kaudu
    võidakse kuvada puudulikke andmeid. Andmesubjekti esindaja
    suunamisel peab <ins>alati</ins> küsima uue
    lingi **getConsentGroupReferenceRepresentable** päringu abil.

4.  Andmenõusolekuteenuse poolt genereeritud lingi kaudu suunatakse
    Andmesubjekt esindaja Andmesubjekti nõusolekuid andma. Andmesubjekti
    esindaja logib sisse kasutades TARA autentimist.

5.  Andmesubjekt esindaja vaatab läbi Andmesubjekti nõusolekutaotlused,
    kinnitab need, millega nõustub, ja lükkab tagasi need, millega ei
    nõustu. Kui valikud on tehtud, vajutab ta nuppu „Kinnitan“.

6.  Andmenõusolekuteenus muudab kinnitatud nõusolekutaotlused kehtivateks
    nõusolekuteks ning omistab neile nõusolekuviited. Andmenõusolekuteenus
    suunab Andmesubjekti esindaja tagasi Klientrakendusesse.

7.  Pärast Andmesubjekti esindaja tagasi suunamist küsib Klientrakendus
    Andmenõusolekuteenusest nõusolekuviited ning nende valideerimise, et
    teada saada, millised Andmesubjekti nõusolekud kehtivad.

    Kasutatakse **getConsentReferences** ja **validateConsentForClient**
    päringuid (vt jaotised [5.1.2](#getconsentreferences) ja [5.1.3.](#validateconsentforclient))

8.  Vastavalt saadud vastusele kuvab Klientrakendus Andmesubjekti
    esindajale teadet.

**Alternatiivsed stsenaariumid ja laiendused:**

1.  Klientrakendus tuvastab, et kõik vajalikud Andmesubjekti nõusolekud
    on olemas ja kehtivad.

      - Klientrakendus pakub Andmesubjekti esindajale soovitud teenust
        ja selle osutamiseks küsib vajalikud andmed Andmekogult.
        Käivitatakse „Kasutusjuht 2: Andmete pärimine ja nõusoleku
        valideerimine (andmekogu)“ (vt. jaotis
        [3.3.](#kasutusjuht-2-andmete-pärimine-ja-nõusoleku-valideerimine-andmekogu)


2.  Klientrakendus küsib lingi Andmesubjekti esindajale
    Andmesubjekti nõusolekute andmiseks, kuigi mõned küsitud nõusolekud
    olid varem juba antud ja kehtivad.

      - Andmenõusolekuteenus välistab Andmesubjekti kehtivad nõusolekud ja ei
        küsi neid genereeritud lingi kaudu uuesti.

3.  Klientrakendus küsib lingi nõusolekute andmiseks, kuigi mõned
    küsitud nõusolekud olid varem juba antud Andmesubjekti esindaja
    poolt, aga pärast on aegunud või on Andmesubjekti esindaja pool
    tagasi võetud.

      - Andmenõusolekuteenus loob uued vastavad nõusolekutaotlused ja
        võimaldab Andmesubjekti esindajal genereeritud lingi kaudu
        nendega nõustuda.

4.  Klientrakendus küsib lingi Andmesubjekti esindajale
    Andmesubjekti nõusolekute andmiseks, kuigi vähemalt üks küsitud
    nõusolekutest on seotud kehtetu eesmärgideklaratsiooniga (s.t
    andmeedastust selle eesmärgideklaratsiooni alusel üldse enam toimuda
    ei saa).

      - Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
        veateatega. Protsess lõpeb.

5.  Klientrakendus küsib lingi nõusolekute andmiseks, kuigi päring
    sisaldab Andmesubjekti esindaja isikukoodi, mis kuulub alaealisele
    ja/või teovõimetule Andmesubjekti esindajale.

      - Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
        veateatega. Protsess lõpeb.

6.  Andmesubjekt esindaja lahkub lehelt otsust tegemata ja
    „Kinnitan“ nuppu vajutamata.

      - Protsess lõpeb. Juhul, kui Andmesubjekti esindaja hakkab uuesti
        Klientrakendust kasutama, protsess algab uuesti põhistsenaariumi
        punktist 1.

7.  Kliendirakendus küsib lingi nõusolekute andmiseks ja mõned
    küsitud nõusolekud on seotud teenusedeklaratsiooniga, kus on nõutud
    nõusoleku digitaalne allkirjastamine.

      - Andmenõusolekuteenus loob nõusolekutaotlused ja võimaldab
        Andmesubjekti esindajal genereeritud lingi kaudu neid
        allkirjastada.

8.  Kliendirakendus küsib lingi nõusolekute andmiseks, aga päring
    sisaldab Andmesubjekti isikukoodi, mis ei kuulub alaealisele
    Andmesubjektile.

      - Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
        veateatega. Protsess lõpeb.

9.  Kliendirakendus küsib lingi nõusolekute andmiseks, aga päringus
    sisalduv Andmesubjekti ja Andmesubjekti esindaja seos puudub ning
    esindajal ei ole õigust Andmesubjekti esindada.

      - Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
        veateatega. Protsess lõpeb.

10. Kliendirakendus küsib lingi nõusolekute andmiseks, aga päringus
    sisalduv Andmesubjekti suhte tüüp ei ole „LAPS“.

      - Andmenõusolekuteenus ei genereeri linki ja vastab Klientrakendusele
        veateatega. Protsess lõpeb.

## Kasutusjuht 2: Andmete pärimine ja nõusoleku valideerimine (andmekogu)

**Tegutsejad:** Andmekogu, Klientrakendus, Andmenõusolekuteenus

**Osapooled ja nende huvid:**

-   Klientrakendus soovib kätte saada Andmesubjekti andmeid Andmekogult kaitstud teenuse kaudu.

-   Andmekogu soovib veenduda Andmenõusolekuteenuse abil, et küsitud andmete edastamisele on olemas kehtiv Andmesubjekti nõusolek ning andmeedastuse tingimused on korrektsed.

-   Andmenõusolekuteenus soovib valideerida vajaliku nõusoleku kehtivust ning edastada Andmekogule andmeedastuse tingimuste kontrollimiseks vajalikud andmed.

**Eeltingimused:** Andmekogul on teada enda infosüsteemidega seotud
teenusedeklaratsioonide identifikaatorid. Andmekogul on olemas
vastavusetabel, mille abil saab kontrollida millisele kaitstud teenusele
vastab iga teenusedeklaratsioon.

**Järeltingimused (kehtiva nõusoleku puhul):** Andmekogu edastab andmed
Klientrakendusele kaitstud teenuse kaudu.

**Põhistsenaarium (eeldusel , et vajalik nõusolek kehtib):**

1.  Klientrakendus küsib andmed Andmekogult. Andmepäring peab sisaldama
    vastavat nõusolekuviidet ning Andmesubjekti isikukoodi.

2.  Andmekogu saadab nõusolekuviite Andmenõusolekuteenusesse valideerimiseks.
    Andmenõusolekuteenus valideerib nõusolekuviite ja saadab Andmekogule
    vastuse, mis sisaldab peale nõusolekuviite ka nõusoleku kehtivuse
    lõppkuupäeva, Klientrakenduse alamsüsteemi identifikaatorit,
    Andmesubjekti isikukoodi ja nõusolekuga seotud teenusedeklaratsiooni
    identifikaatorit. Sammudes 2 ja 3 kasutatakse
    ***validateConsentForDataProvider*** päringut (vt jaotis
    [5.1.4.](#validateconsentfordataprovider))

3.  Andmekogu kontrollib järgmised andmeedastuse tingimused:

    -   andmepäringu saatnud Klientrakenduse alamsüsteemi identifikaator
    (x-tee päringu päises) on sama, mis on Andmenõusolekuteenuse vastuses;

    -   Klientrakenduse andmepäringus sisalduv Andmesubjekti isikukood on
    sama, mis on Andmenõusolekuteenuse vastuses;

    -   kaitstud teenus, mille kaudu Klientrakendus küsib andmed vastab
    Andmenõusolekuteenuse vastuses sisalduvale teenusedeklaratsiooni
    identifikaatorile.

4.  Kui kõik kontrollid on õnnestunud, edastab Andmekogu küsitud andmed
    Klientrakendusele.

5.  Andmekogu raporteerib eduka andmeedastuse. Kasutatakse
    ***reportDataTransmission*** päringut (vt jaotis
    [5.1.5.](#reportdatatransmission)).


**Põhistsenaariumi jadadiagramm:**

![Põhistsenaariumi jadadiagramm](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image2.png)

**Alternatiivsed stsenaariumid:**

1a. Klientrakenduse andmepäring ei sisalda nõusolekuviidet.

-   Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata
    ja andmeedastust ei raporteerita.

2a. Sellist nõusolekuviidet Andmenõusolekuteenuses ei eksisteeri.

-   Valideerimine ebaõnnestunud, Andmenõusolekuteenus vastab Andmekogule
    veateatega.

-   Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata
    ja andmeedastust ei raporteerita.

2b. Nõusolekuviide viitab nõusolekule, mis ei kehti.

-   Valideerimine ebaõnnestunud, Andmenõusolekuteenus vastab Andmekogule
    veateatega.

-   Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata
    ja andmeedastust ei raporteerita.

3a. Vähemalt üks kontrollidest on ebaõnnestunud.

-   Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata
    ja andmeedastust ei raporteerita.

# Nõusoleku seisundidiagramm

Järgnev diagramm kirjeldab nõusoleku võimalikke seisundeid ja
nendevahelisi üleminekuid.

![Nõusoleku seisundidiagramm](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image3.png)

# Andmenõusolekuteenusega liidestamine ja päringute tehniline kirjeldus

Andmenõusolekuteenus pakub REST API päringuid üle x-tee.

Kõikide Andmenõusolekuteenusele jõudnud päringute puhul kontrollitakse, et
Andmenõusolekuteenuse juurde pöörduv x-tees autenditud alamsüsteem on õige
osapool sellise päringu tegemiseks. Andmenõusolekuteenus vastab päringule
ainult siis, kui küsija (ehk Andmekogu või Klientrakendus) on
kontrollitava nõusolekuga seotud kas läbi eesmärgideklaratsioonil oleva
alamsüsteemi või eesmärgideklaratsiooniga alati seotud oleval
teenusedeklaratsioonil oleva alamsüsteemi.

**Andmetüübid**

Kõik string\'i tüüpi parameetrid on UTF-8 kodeeringuga sümbolid.

Kõik number tüüpi parameetrid on ASCII kood'ide jada vahemikus 47-57
(numbrid 0-9).

Kõik timestamp tüüpi parameetrid on ISO8601 formaadis timestamp'id.

## Andmekogu ja Klientrakenduse poolt kasutavate päringute tehniline kirjeldus

### getConsentGroupReference

Päringu abil saab Andmenõusolekuteenuselt küsida nõusoleku(te) lingi (URL),
mille kaudu saab Andmesubjekti suunata nõusolekutaotlusi vaatama ja
nõusolekuid andma.

Kasutab: Klientrakendus

**TÄHTIS!** Andmesubjekti suunamiseks mitte kasutada sama linki mitu
korda, sest vana lingi kaudu võidakse kuvada puudulikke andmeid.
Andmesubjekti suunamisel peab <ins>alati</ins> küsima uue lingi
**getConsentGroupReference** päringu abil.

Enne lingi genereerimist Andmenõusolekuteenus kontrollib, et päringus
sisalduv isikukood kuulub Andmesubjektile, kes on täisealine ja
teovõimeline. Teovõime kontrollimiseks tehakse päringut Rahvastiku
Registri vastu. Alaealine ja/või teovõimetu isik ei saa anda
nõusolekuid. Kui isikukood ei vasta tingimustele, linki ei genereerita
ja tagastatakse veateade.

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent

**Päringu käsu näide (curl):**

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

**Päring (Json):**

```
{
  "idCode": "60001019906",
  "callback": "https://www.ria.ee",
  "purposeDeclarationBusinessIdentifiers": [
    "EesmärgideklaratsiooniID"
  ]
}
```

Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
idCode | jah | string | Andmesubjekti isikukood
callback | jah | string | Klientrakenduse tagasisuunamise URL
purposeDeclarationBusinessIdentifiers | jah | array of strings | Eesmärgideklaratsiooni identifikaator (võib olla mitu)

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees
autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama,
mis on määratud eesmärgideklaratsiooni(de)s.

**Vastus:**
```
{
  "consentGroupReference": "dd74ed1b-a00f-4232-8b25-914d6ecbcb30"
  "url":"http://www.arendus.eesti.ee/nousolek/consent-request?reference=dd74ed1b-a00f-4232-8b25-914d6ecbcb30&callback=https://www.ria.ee"
}
```
Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
consentGroupReference | string | Nõusolekutaotluse viide - unikaalne kood, mida kasutatakse nõusolekutaotluste eristamiseks
url | string | Nõusoleku(te) URL, mille kaudu Andmesubjekt saab anda Andmenõusolekuteenuses Kliendirakenduse poolt küsitud nõusolekud

**Veahaldus:**

Vea võti | Veakood ja staatus | Vea kirjeldus
------------ | ------------ | -------------
error.validation | VALIDATION (400) | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukood <>11 märki, mittenumbriline)
error.business.requested-consents-not-related-to-any-declarations | REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS (404) | Kehtiva eesmärgideklaratsiooni ja alamsüsteemi kombinatsiooni ei leitud kõikide küsitud nõusolekute puhul
error.business.id-code-invalid | ID_CODE_INVALID (500) | Isikukood ei vasta standardile
error.business.requested-consents-related-to-invalid-declarations | REQUESTED_CONSENTS_RELATED_TO_INVALID_DECLARATIONS (500) | Küsitud nõusolekud on seotud kehtetute eesmärgideklaratsioonidega. Küsitud äriidentifikaatorid, mis on seotud kehtetute eesmärgideklaratsoonidega eesmärgideklarastiooni mikroteenuse andmebaasis on loetletud vea kirjelduses
error.business.all-requested-consents-have-already-been-approved | ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED (500) | Nõusolekute mitmekordsel küsimisel juhul, kui kõik leitud nõusolekud on staatuses APPROVED
error.business.data-subject-error | DATA_SUBJECT_ERROR (500) | Isik on kas teovõimetu või piiratud teovõimega

### getConsentReferences

Päringu abil saab küsida Andmenõusolekuteenuselt kehtivate nõusoleku(te)
nõusolekuviited (*Consent Reference*).

Kasutab: Klientrakendus

**API URL:**
    
https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/reference

**Päringu käsu näide (curl):**
    
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

**Päring (Json):** (näidises küsitakse kolme eesmärgideklaratsiooni
kohta, kuid kehtiv nõusolek on ainult ühel neist):
    
```
{
  "idCode": "60001019906",
  "purposeDeclarationBusinessIdentifiers": [
    "EesmärgideklaratsiooniID", "ED_KAKS", "ED_KOLM"
  ]
}
```
Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
idCode | jah | string | Andmesubjekti isikukood
purposeDeclarationBusinessIdentifiers | jah | array of strings | Eesmärgideklaratsiooni identifikaator (võib olla mitu)
    
**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees
autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama,
mis on määratud eesmärgideklaratsiooni(de)s.

**Vastus:**
```
{
  "ED_KAKS": "91e9844d-3b5e-4df8-9254-42316b1607b6"
}
```
Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
purposeDeclarationBusinessIdentifier
(näidises: "ED_KAKS") | string | Kehtiva eesmärgideklaratsiooni identifikaator (võib olla mitu). Tagastatakse ainult need, mille jaoks on leitud kehtiv nõusolek (staatuses APPROVED)
consentReference | string | Kehtiva nõusoleku nõusolekuviide –  unikaalne kood, mida kasutatakse nõusoleku kehtivuse valideerimisel
    
**Veahaldus:**

Vea võti | Veakood ja staatus | Vea kirjeldus
------------ | ------------ | -------------
error.validation | VALIDATION (400) | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukood <>11 märki, mittenumbriline)
error.http.404 | HTTP_NOT_FOUND (404) | Ei leitud kehtivaid nõusolekuid (staatuses APPROVED)
error.business.id-code-invalid | ID_CODE_INVALID (500) | Isikukood ei vasta standardile

### validateConsentForClient

Päringu abil saab küsida Andmenõusolekuteenuselt nõusoleku kehtivust.

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

**Päring:**
https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client?consentReference= 91e9844d-3b5e-4df8-9254-42316b1607b6
    
Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
consentReference | jah | string | Nõusolekuviide –  unikaalne kood, mis vastab nõusolekule, mille kehtivuse soovitakse valideerida

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees
autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama,
mis on määratud nõusolekuga seotud eesmärgideklaratsioonis.

**Vastus:**
```    
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "idCode": "60001019906",
  "purposeDeclarationId": "ED_KAKS"
}
```
Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
consentReference | string | Nõusolekuviide –  unikaalne kood, mis vastab nõusolekule, mille kehtivust valideeritakse.
consentExpiration | timestamp (ISO 8601) | Nõusoleku kehtivusaja lõpp
idCode | string | Andmesubjekti isikukood
purposeDeclarationId | string | Nõusolekuga seotud eesmärgideklaratsiooni identifikaator

**Veahaldus:**
    
Vea võti | Veakood ja staatus | Vea kirjeldus
------------ | ------------ | -------------
error.validation | VALIDATION (400) | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukood <>11 märki, mittenumbriline)
error.http.404 | HTTP_NOT_FOUND (404) | clientSubsystemIdentifier (Klientrakenduse x-tee alamsüsteemi) ja consentReference kombinatsiooni kohta  puudub kehtiv nõusolek
error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | Küsitud nõusolek ei ole staatuses APPROVED
    
### validateConsentForDataProvider

Päringu abil saab küsida Andmenõusolekuteenuselt nõusoleku kehtivust ning
kaasnevad andmed, mille abil Andmekogu saab kontrollida andmeedastuse
tingimused.

Kasutab: Andmekogu

**API URL:**
    
https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/dataprovider

**Päringu käsu näide (curl):**
    
```  
curl -k -X GET \
-H "accept: application/json" \
-H "Content-type: application/json" \
-H "X-Road-Client: ee-dev/GOV/70006317/consent" \
"https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/dataprovider?consentReference=91e9844d-3b5e-4df8-9254-42316b1607b6"
```  

**Päring:**
https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/dataprovider?consentReference= 91e9844d-3b5e-4df8-9254-42316b1607b6

Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
consentReference | jah | string | Nõusolekuviide –  unikaalne kood, mis vastab nõusolekule, mille kehtivuse soovitakse valideerida


**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees
autenditud Andmekogu x‑tee alamsüsteemi identifikaator on sama, mis on
määratud nõusolekuga seotud teenusedeklaratsioonis.

**Vastus:** (nõusolekuga seotud eesmärgideklaratsioon on seotud
teenusedeklaratsiooniga IDga TD_KAKS)
    
```  
{
  "consentReference": "91e9844d-3b5e-4df8-9254-42316b1607b6",
  "consentExpiration": "2022-01-22T23:59:59.999999Z",
  "idCode": "60001019906",
  "clientSubsystemIdentifier": " EE/GOV/70000562/yphis",
  "serviceDeclarationId": "TD_KAKS"
}
```  
Parameeter | Andmetüüp | Kirjeldus
------------ | ------------- | ------------
consentReference | string | Nõusolekuviide –  unikaalne kood, mis vastab nõusolekule, mille kehtivust valideeritakse.
consentExpiration | timestamp (ISO 8601) | Nõusoleku kehtivusaja lõpp
idCode | string | Andmesubjekti isikukood. *Märkus:* Andmekogu peab kontrollima, et x-tees autenditud Klientrakenduse päring andmete järele sisaldab sama isikukoodi, mis on märatud selles parameetris
clientSubsystemIdentifier | string | Eesmärgideklaratsioonis määratud klientrakenduse x-tee alamsüsteemi identifikaator. *Märkus:* Andmekogu peab kontrollima, et x-tees autenditud Klientrakenduse alamsüsteem, mis saadab päringu andmete järele, on sama, mis on märatud selles parameetris
serviceDeclarationId | string | Nõusolekuga seotud teenusedeklaratsiooni identifikaator. *Märkus:* Andmekogu peab kontrollima, et kaitstud teenus, mille kaudu Klientrakendus küsib andmed vastab selles parameetris määratud teenusedeklaratsiooni identifikaatorile

    
**Veahaldus:**
Vea võti | Veakood ja staatus | Vea kirjeldus
------------ | ------------ | -------------
error.validation | VALIDATION (400) | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukood <>11 märki, mittenumbriline)
error.http.404 | HTTP_NOT_FOUND (404) | dataProviderSubsystemIdentifier (Andmekogu x-tee alamsüsteemi)  ja ConsentReference kombinatsiooni kohta  puudub kehtiv nõusolek
error.business.consent-validate-invalid-status | CONSENT_VALIDATE_INVALID_STATUS (500) | Küsitud nõusolek ei ole staatuses APPROVED
    
### reportDataTransmission

Päringu abil saab teavitada Andmenõusolekuteenust sellest, et toimus
isikuandmete edastus nõusoleku alusel Andmekogust Klientrakendusesse.

Kasutab: Andmekogu

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/consent

**Päringu käsu näide (curl):**
    
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


**Päring:**
    
https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/reporting-stage/api/reporting/consent
    
Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
transmissionTimestamp | jah | timestamp | Aeg, millal toimus andmeedastus Andmekogust Klientrakendusesse
consentReference | jah | string | Nõusolekuviide –  unikaalne kood, mis vastab nõusolekule, mille kehtivuse soovitakse valideerida

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees
autenditud Andmekogu x‑tee alamsüsteemi identifikaator on sama, mis on
määratud nõusolekuga seotud teenusedeklaratsioonis.

**Vastus:**
``` 
{  
  "response": "success"
}
``` 
    
Parameeter | Andmetüüp | Kirjeldus
------------ | ------------- | ------------
response | - | Kui päring õnnestub, tagastatakse "success"    
    
**Veahaldus:**
    
Vea võti | Veakood ja staatus | Vea kirjeldus
------------ | ------------ | -------------
error.validation | VALIDATION (400) | Validatsiooni üldised veateated (kohustuslikud väljad määramata)
error.http.404 | HTTP_NOT_FOUND (404) | ConsentReference ja X-tee client headeri jaoks puudub vaste

###  getConsentGroupReferenceRepresentable

Päringu abil saab Andmenõusolekuteenuselt küsida nõusoleku(te) lingi (URL),
mille kaudu saab Andmesubjekti esindajat suunata
Andmesubjekti (esindatava) nõusolekutaotlusi vaatama ja nõusolekuid
andma.

Kasutab: Klientrakendus

**TÄHTIS!** Esindaja suunamiseks mitte kasutada sama linki mitu korda, sest
vana lingi kaudu võidakse kuvada puudulikke andmeid. Andmesubjekti
esindaja suunamisel peab <ins>alati</ins> küsima uue lingi
**getConsentGroupReferenceRepresentation** päringu abil.

Enne lingi genereerimist Andmenõusolekuteenus kontrollib
Rahvastikuregistrist esindaja teovõimet ning esindatava suhtes täielikku
isikuhooldusõiguse olemasolu. Kui tegu ei ole teovõimelise isikuga
või puudub täielik isikuhooldusõigus, siis URL'i ei genereerita ja
tagastatakse veateade (vt veateated).

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/representation

**Päringu käsu näide (curl):** 

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

**Päring (Json):** 

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

Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
representativeIdCode | jah | string | Esindaja isikukood
representeeIdCode | jah | string | Esindatava ehk Andmesubjekti isikukood
relationType | jah | string | Esindatava seos esindajaga. Nt lapsevanem (esindaja) esindab last (esindatav), siis seose tüüp on „LAPS". <br /> Võimalikud väärtused (klassifikaatori väärtus): „LAPS".
callback | jah | string | Klientrakenduses tagasisuunamise URL
| purposeDeclarationBusinessIdentifiers | jah | array of strings | Kehtiva eesmärgideklaratsiooni identifikaator (võib olla mitu)

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees
autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama,
mis on määratud eesmärgideklaratsiooni(de)s.

**Vastus:**

```
{
  "url":
  "https://www.arendus.eesti.ee/nousolek/et/consent-request?reference=0e6d7675-0588-4413-a835-cd22ebf582c3&callback=https://www.ria.ee\",
  "consentGroupReference":"0e6d7675-0588-4413-a835-cd22ebf582c3"
}
```

Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
url | string | Nõusoleku(te) URL, mille kaudu saab esindaja anda Andmesubjekt eest Andmenõusolekuteenuses Kliendirakenduse poolt küsitud nõusolekud

**Veahaldus:**

Vea võti | Veakood ja staatus | Vea kirjeldus
------------ | ------------ | -------------
error.validation | VALIDATION (400) | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukoodi <>11 märki, mittenumbriline)
error.business.requested-consents-not-related-to-any-declarations | REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS (404) | Kehtiva eesmärgideklaratsiooni ja alamsüsteemi kombinatsiooni ei leitud kõikide küsitud esindatava nõusolekute puhul
error.business.id-code-invalid | ID_CODE_INVALID (500) | Isikukood ei vasta standardile 
error.business.requested-consents-related-to-invalid-declarations | REQUESTED_CONSENTS_RELATED_TO_INVALID_DECLARATIONS (500) | Küsitud esindatava nõusolekud on seotud kehtetute eesmärgideklaratsioonidega. Küsitud äriidentifikaatorid, mis on seotud kehtetute eesmärgideklaratsoonidega eesmärgideklarastiooni mikroteenuse andmebaasis on loetletud vea kirjelduses
error.business.all-requested-consents-have-already-been-approved | ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED (500) | Nõusolekute mitmekordsel küsimisel juhul, kui kõik leitud esindatava nõusolekud on staatuses APPROVED
error.business.data-subject-error | DATA_SUBJECT_ERROR (500) | Rahvastikuregistri andmete põhjal on esindaja kas teovõimetu või piiratud teovõimega või Rahvastikuregistri teenus tagastas vea
error.business.represented_person-not-minor | REPRESENTED_PERSON_NOT_MINOR (500) | Esindatav ei ole alaealine
error.business.representation_error | RR_REPRESENTATION_ERROR (500) | Rahvastikuregistri andmete põhjal puudub esindajal esindatava suhtes täielik isikuhooldusõigus või on esindaja staatus vale
error.business.relation-type-error | RELATION_TYPE_INVALID (400) | Vale relationType väärtus (sellist klassifikaatorit ei eksisteeri)    

###  postConsentFilterByStatus

Andmenõusolekuteenust kasutatavatel teenustel on vajalik saada andmestik tagasivõetud või kehtivate nõusolekute kohta vastava teenuse raames. Selleks luuakse päring, kus päringu teostaja annab ette sisendi otsitavate staatuste kohta (kehtiv/kehtetu/kehtiv ja kehtetu) ning loetelu nõusolekute identifikaatoritest ja saab vastu loetelu nõusolekuviidetest ja nõusoleku staatustest.

Kasutab: Klientrakendus

**API URL:**

https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/filter-by-status

**Päringu käsu näide (curl):** 

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

**Päring (Json):** 

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

Parameeter | On kohustuslik? | Andmetüüp | Kirjeldus
------------ | ------------- | ------------ | -------------
consentStatus | jah | array of string | viide otsitavate nõusolekute staatusele. Väärtused: VALID, INVALID.
consentReferences | jah, ei tohi olla tühi | Nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivuse soovitakse valideerida. Edastatakse loetelu nõusolekuviidetest. Maksimaalne kirjete arv päringus 5000. 
consentReferences | jah | array of string | Nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivust soovitakse valideerida. Edastatakse loetelu nõusolekuviidetest

**Tähtis!** Päringu kättesaamisel Andmenõusolekuteenus kontrollib, et x-tees
autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama,
mis on määratud eesmärgideklaratsiooni(de)s.

**Vastus:**

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

Süsteem väljastab tulemused vastavalt consentStatus valikule:

1. VALID valiku korral väljastatakse väärtused, mille consent.status on APPROVED

2. INVALID valiku korral väljastatakse väärtused, mille consent.status on DECLINED, INAPPLICABLE või EXPIRED

3. VALID, INVALID valiku korral väljastatakse väärtused, mille consent.status on APPROVED, DECLINED, INAPPLICABLE või EXPIRED


Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
consent | array | Loetelu Consent objektidest
invalidConsents | array | Optional. Loetelu nõusolekuviidetest sisendi põhjal, millele teenuse tarbijal ei olnud ligipääsu või kui kirjet ei eksisteeri.

**Consent**

Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
consentReference | string | Nõusolekuviide – unikaalne kood, mis vastab nõusolekule, mille kehtivust valideeritakse.
consentStatus | string | Nõusoleku olek.
consentExpiration | timestamp (ISO 8601) | Nõusoleku kehtivusaja lõpp.
idCode | string | Andmesubjekti isikukood.
purposeDeclarationId | string | Nõusolekuga seotud eesmärgideklaratsiooni identifikaator.

**Veahaldus:**

Vea võti | Veakood ja staatus | Vea kirjeldus
------------ | ------------ | -------------
error.validation | VALIDATION (400) | Validatsiooni üldised veateated (kohustuslikud väljad määramata, andmetüüp ei vasta)

# Juhised andmenõusolekuteenuse testimiseks liidestuja poolt

Liidestuja-poolse testimise eesmärgiks on veenduda, et liidestuv(ad)
infosüsteem(id) on valmis Andmenõusolekuteenusega vahetama nõusolekute
(consent) andmeid. Testid on kirjeldatud API väljakutsete tasemel, see
annab võimaluse liitujal testida nii otse API (arenduse varasemas
faasis) kui oma kasutajaliidese kaudu.

Testid katavad nõusolekutega seotud funktsionaalsuse ja on
organiseeritud selliselt, et esmalt on kirjeldatud põhistsenaariumi
testid ning seejärel veahalduse testid. Veahalduse testidest on valitud
olulisemad, et liidestuv süsteem saaks veenduda oma veahalduse
toimimises. Soovi korral võib äriliselt mitteolulised testid vahele
jätta või oma teenuse spetsiifika seisukohalt olulisi teste lisada.

Testide eeltingimuseks on Teenusedeklaratsiooni (TD) (koos
infosüsteemiga) ning seda tarbiva(te) Eesmärgideklaratsiooni(de) (ED)
olemasolu Andmenõusolekuteenuses. Nende sisestamine ei kuulu hetkel testide
skoopi, sest seda on võimalik teha Andmenõusolekuteenuse kasutajaliidese
kaudu.

Siiski tuleb testides kasutatava Infosüsteemi, Teenusedeklaratsiooni ja
Eesmärgideklaratsioonide puhul pidada silmas, et andmed tuleks sisestada
võimalikult realistlikud, st võimalikult lähedased sellele, mis nad
töökeskkonnas olema hakkavad. Nõusolekute olekute loogika ülevaateks
vaata palun olekudiragrammi ptk 4.

Testidesse ei ole kaasatud nõusoleku aegumise (Expired) ning
mittevajalikuks muutumise (Inapplicable) stsenaariumid, kuna need
toimuvad Andmenõusolekuteenuses automaatselt vastavalt deklaratsioonide ja
nõusolekute kehtivuskuupäevade saabumisele. Soovi korral on võimalik
neid testida, sisestades Teenusedeklaratsioonile ja
eesmärgideklaratsioonile sobilikud kuupäevad (nt kehtivuse lõpp homme,
Teenusedeklaratsioonil nõusoleku kehtivuse maksimaalne kestus 1päev)
ning andes nõusolekud ning jälgides nõusolekute oleku muutumist tähtaja
saabudes.

## Nõusolekute URL'i loomine ja nõusolekutaotluse informatsiooni kuvamine (esmane ja korduv)

*Testijuhtum 1 Nõusoleku URLi genereerimine ning nõusoleku info
vaatamine (1 eesmärgideklaratsioon)*
    
N | Tegevus | Oodatav tulemus
------------ | ------------- | ------------
1 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReference . Korrektsete sisendparameetritega (isikukood, ED identifikaator ja X-Tee alamsüsteem) | Kontrolli, et tagastatakse nõusolekute URL, mida on võimalik järgmises sammus kasutada
2 | Kasuta saadud nõusolekuviidet Andmenõusolekuteenuses küsitud nõusolekute kuvamiseks | Kontrolli, et tagastatakse nõusolek REQUESTED staatuses vastavalt sisendparameetriks olnud isikukoodi, TD ja ED andmetele
    
*Testijuhtum 2 Nõusoleku URLi genereerimine ning nõusoleku info vaatamine (mitu eesmärgideklaratsiooni – test läbida juhul, kui sellise stsenaariumid jaoks on olemas sisuline vajadus)*
    
N | Tegevus | Oodatav tulemus
------------ | ------------- | ------------
1 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReference . Korrektsete sisendparameetritega (isikukood, rohkem kui 1 ED identifikaatorit ja X-Tee alamsüsteem). Sisendiks olevad EDd peavad olema seotud sama alamsüsteemiga. | Kontrolli, et tagastatakse nõusolekute URL, mida on võimalik järgmises sammus kasutada
2 | Kasuta saadud nõusolekuviidet Andmenõusolekuteenuses küsitud nõusolekute kuvamiseks | Kontrolli, et tagastatakse nõusolekud REQUESTED staatuses vastavalt sisendparameetriks olnud isikukoodi, TD ja ED andmetele

*Testijuhtum 3 Nõusoleku URLi genereerimine, kui antud isikukoodi, ED ning X-Tee alamsüsteemi jaoks on juba olemas nõusolekutaotlus või nõusolek (erinevates staatustes)*  

Eeltingimus: nõusolekute uuesti küsimise/mitteküsimise loogika testimiseks on oluline, et infosüsteemi oleks loodud erinevates olekutes nõusolekuid, sest loogika sõltub neist. Võid testida korraga ühe eesmärgideklaratsiooniga, või mitmega (vastavalt kuidas tundub sisuliselt realistlik kasjutusjuhtum)

N | Tegevus | Oodatav tulemus
------------ | ------------- | ------------
1 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api /consent/getConsentGroupReference . Korrektsete sisendparameetritega (isikukood, ED identifikaator ja X-Tee alamsüsteem), kui selle kombinatsiooniga on juba APPROVED nõusolek olemas. Sisendiks olevad EDd peavad olema seotud sama alamsüsteemiga. | Kontrolli, et tagastatakse viga ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED 
2 | Nagu samm 1, kuid olemasolev nõusolek on REQUESTED | Kontrolli, et tagastatakse uus ConsentGroupReference olemasolevale nõusolekutaotlusele
3 | Nagu samm 1, kuid olemasolev nõusolek on DECLINED või EXPIRED olekus | Kontrolli, et genereeritakse uus nõusolek uue ConsentGroupReference’ga

*Testijuhtum 4 Nõusoleku URLi alternatiivsed stsenaariumid*
 
N | Tegevus | Oodatav tulemus
------------ | ------------- | ------------
1 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReferenceValidatsioonireeglitele mittevastava isikukoodiga (mittenumbriline, kontrollnumber vale, lühem/pikem kui 11 märki), teised sisendparameetrid on korrektsed | Vale kontrollnumbri puhul kontrolli veateadet koodiga ID_CODE_INVALID, formaadi vea puhul VALIDATION
2 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReference Tundmatu ED identifikaatoriga, teised parameetrid on korrektsed | Kontrolli veateadet koodiga PURPOSE_DECLARATIONS_NOT_FOUND
3 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentGroupReferenceX-Tee alamsüsteemiga, mis ei lange kokku ED-s kasutusel oleva alamsüsteemiga, teised sisendparameetrid on korrektsed | Kontrolli veateadet koodiga PURPOSE_DECLARATIONS_NOT_FOUND

## Nõusoleku andmine (*approve*) ja keeldumine/tagasivõtmine (*decline*)

Nõusoleku andmise ja keeldumise testijuhtumid ei ole toodud välja API
väljakutsete tasemel, kuna need funktsionaalsused on realiseeritud
Andmenõusolekuteenuse kasutajaliideses.

Veendumaks, et klientrakendus ja Andmenõusolekuteenus suudavad korrektselt
andmeid vahetada ja õppimaks tundma, kuidas Andmenõusolekuteenus toimib,
tuleks läbi teha vähemalt järgmised stsenaariumid:

1.  Nõusolekute andmine -- peatükis 6.1 kirjeldatud testides küsitud
    nõusolekuviidetele vastavate nõusolekute andmine kasutaja poolt ning
    kontrollimine, et nõusolekud on kehtivad

2.  Nõusolekute andmisest keeldumine - peatükis 6.1 kirjeldatud testides
    küsitud nõusolekuviidetele vastavate nõusolekute mitteandmine
    kasutaja poolt, ning kontrollimine, et nõusolekuid kuvatakse sama
    lingi kaudu uuesti

3.  Nõusolekust taganemine -- varasemate testide käigus antud
    nõusolekute tagasivõtmine ning kontrollimine, et nõusolekud on
    tagasi võetud.

## Nõusolekuviidete pärimine

*Testijuhtum 8 Nõusolekuviidete pärimine*
    
N | Tegevus | Oodatav tulemus
------------ | ------------- | ------------
1 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentReferences  eelnevalt antud kehtivaid nõusolekuid omava sisendite (isikukood, ED identifikaator, X-Tee alamsüsteem) komplekti kohta | Kontrolli, et tagastatakse ainult APPROVED olekus nõusolekuviited koos ED identifikaatoriga. 
2 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentReferences juhul, kui kehtivaid nõusolekuid etteantud sisendite komplekti puhul ei ole, on teistes olekutes nõusolekuid (isikukood, ED identifikaator, X-Tee alamsüsteem) | Kontrolli, et tagastatakse HTTP_NOT_FOUND

*Testijuhtum 9 Nõusolekuviidete pärimine – alternatiivsed stsenaariumid*

N | Tegevus | Oodatav tulemus
------------ | ------------- | ------------
1 | Käivita  https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/getConsentReferences  kui puudub kehtiv nõusolek sisendparameetrite komplekti jaoks | Kontrolli, et tagastatakse HTTP_NOT_FOUND

## Nõusolekute valideerimine (Klientrakendus ja Andmekogu)

*Testijuhtum 10 Nõusolekute valideerimine (Klientrakenduse ja Andmekogu
jaoks)*
    
Eeltingimus: nõusolekute valideerimiseks on ideaalis vajalik koostada erinevates staatustes nõusolekuid (REQUESTED, APPROVED, DECLINED, EXPIRED, INAPPLICABLE), kuid valideerimise loogika esmaseks testiks piisab APPROVED nõusolekust ning alternatiivse stsenaariumi testiks ühes DECLINED, EXPIRED või INAPPLICABLE nõusolekust (mittevaliidsed nõusolekud käituvad kõik samamoodi).

N | Tegevus | Oodatav tulemus
------------ | ------------- | ------------
1 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client/validateConsentForClient kokkulangevate clientSubsystemIdentifier ning consentReferencega, kui vastav nõusolek on APPROVED staatuses | Kontrolli, et tagastatakse nõusolekuga seotud andmed (consentReference, consentExpiration, idCode, purposeDeclarationID)
2 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client/validateConsentForClient kokkulangevate clientSubsystemIdentifier ning consentReferencega, kui vastav nõusolek on mõnes muus staatuses kui APPROVED | Kontrolli, et nõusoleku infot ei tagastata
3 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client/validateConsentForDataProvider kokkulangevate dataProviderSubsystemIdentifier ning consentReferencega, kui vastav nõusolek on APPROVED staatuses | Kontrolli, et tagastatakse nõusolekuga seotud andmed (consentReference, ConsentExpiration, idCode, clientSubsystemIdentifier, serviceDeclarationID)
4 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/consent/validation/client/validateConsentForClient kokkulangevate dataProviderSubsystemIdentifier ning consentReferencega, kui vastav nõusolek on mõnes muus staatuses kui APPROVED | Kontrolli, et nõusoleku infot ei tagastata
    
## Nõusolekute alusel edukast andmete pärimisest raporteerimine (Andmekogu)

*Testijuhtum 11 Nõusolekute alusel andmete pärimisest raporteerimine
(raporteerib andmekogu)*

Eeltingimus: on olemas mõni nõusolek, millele raporteerida 
    
N | Tegevus | Oodatav tulemus
------------ | ------------- | ------------
1 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/reporting/consent/createConsentReport olemasoleva nõusoleku consentReference-ga ning Xtee päringus olev alamsüsteem langeb kokku küsija alamsüsteemiga. | Kontrolli, et tagastatakse “success” vastus ning võib kontrollida raporteerimise kirje olemasolu Andmenõusolekuteenuses
2 | Käivita https://<turvaserveri-aadress>/r1/ee-dev/GOV/70006317/consent/consent-stage/api/ reporting/consent/createConsentReport consentReference-ga, mida ei eksisteeri, ning Xtee päringus olev alamsüsteem langeb kokku küsija alamsüsteemiga. | Kontrolli veaolukorra haldamist, raporteerimise kirjet ei teki Andmenõusolekuteenusesse
    
# Andmenõusolekuteenuse haldusliidese kasutamise juhend

Andmenõusolekuteenuse haldusliides on mõeldud eesmärgideklaratsioonide, teenusedeklaratsioonide, ja nendega seotud infosüsteemide (andmekogude) haldamiseks.

**Üldised põhimõtted**

-   Enne deklaratsioonide esitamist, Andmenõusolekuteenusesse peavad olema lisatud vajalikud infosüsteemid.

-   Esialgu esitatakse teenusedeklaratsiooni ja seejärel eesmärgideklaratsiooni.

-   Kui vajaliku teenuse jaoks teenusedeklaratsioon on juba olemas, uuesti seda deklareerida pole vaja, saab kasutada olemasolevat teenusedeklaratsiooni.

-   Ühe infosüsteemiga võib olla seotud mitu teenusedeklaratsiooni. Ühe teenusedeklaratsiooniga võib olla seotud mitu eesmärgideklaratsiooni.

-   Iga erineva andmekomplekti jaoks peab deklareerima eraldi teenusedeklaratsiooni, isegi kui andmed tulevad samast teenusest.

-   Juhul, kui Klientrakendus vajab mitmes teenusedeklaratsioonides kirjeldatud andmeid, peab deklareerima mitu vastavat eesmärgideklaratsiooni. Üks eesmärgideklaratsioon võib olla seotud ainult ühe teenusedeklaratsiooniga.

    
![Loogilised seosed infosüsteemide ja deklaratsioonide vahel](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image4.png)

## Rollid

Roll | Kirjeldus | Millised vaated näeb
------------ | ------------- | ------------
RIA administraator | RIA administraator lisab/kustutab kasutajaid (teisi RIA administraatoreid ja infosüsteemide haldureid) ja jagab õiguseid: igale infosüsteemide haldurile määratakse tema vastutuses olev registrikood (või mitu registrikoode), mida valitakse rippmenüüst kõikidega x-tee kataloogist saadud registrikoodidega (member code). <br /> <br /> RIA administraator saab olla samal ajal ka infosüsteemide haldur, kui määrab endale sellist rolli. Sellel juhul talle peavad olema kättesaadavad nii RIA administraatorile kui ka infosüsteemide haldurile nähtavad vaated. | •	Haldusliidese kasutajate haldus <br /> •	Nõusolekute terviklus
Infosüsteemide haldur (Andmekogu esindaja) | Andmenõusolekuteenuse haldusliidese põhikasutaja. <br /> <br />  Infosüsteemide haldur lisab, muudab, kustutab infosüsteeme oma vastutuses oleva registrikoodi(de) piires. Lisades/muutes infosüsteemi, näeb alamsüsteemide valikus ainult need alamsüsteemid, mis on seotud temale määratud registrikoodidega. <br /> <br />  Teeb statistikat oma vastutuses oleva(te) registrikoodi(de) piires. <br /> <br /> Juhul, kui on märgistatud valik „RIA administraatori statistika", saab teha statistikat üle kogu infosüsteemi. Seda valikut kasutavad RIA administraatorid. <br /> <br /> Ühe infosüsteemi eest saab vastutada mitu infosüsteemi haldurit. Iga haldur saab lisada/muuta/kustutada tema vastutuses olevaid infosüsteeme. Igal infosüsteemi halduril on ligipääs kõigile nendele infosüsteemidele ja deklaratsioonidele, mille alamsüsteemi identifikaatoris olev registrikood = tema kasutajaga seotud registrikood (member code). Kui infosüsteemi halduri kasutajakonto kustutatakse, tema poolt sisestatud infosüsteemid jäävad alles. <br /> <br />  Infosüsteemide haldur esitab ja haldab enda vastutuses olevate infosüsteemidega seotud teenusedeklaratsioone. <br /> <br />  Infosüsteemide haldur esitab ja haldab enda vastutuses olevaid eesmärgideklaratsioone. Infosüsteemide haldur saab seostada eesmärgideklaratsioonid ainult tema vastutusalas olevate teenusedeklaratsioonidega. | •	Infosüsteemide koondvaade <br /> •	Infosüsteemi lisamine <br /> •	Infosüsteemi muutmine <br /> •	Teenusedeklaratsioonide koondvaade <br /> •	Teenusedeklaratsiooni esitamine <br /> •	Teenusedeklaratsiooni detailvaade <br /> •	Teenusedeklaratsiooni muutmine <br /> •	Eesmärgideklaratsioonide koondvaade <br /> •	Eesmärgideklaratsiooni esitamine <br /> •	Eesmärgideklaratsiooni detailvaade <br /> •	Eesmärgideklaratsiooni muutmine <br /> •	Statistika vaade


## Infosüsteemide haldus

Andmenõusolekuteenuse haldusliideses registreeritakse kaitstud teenuste
pakkuvate infosüsteemide andmed. Nende andmetega täidetakse automaatselt
vastavad väljad teenusedeklaratsioonides, mis lihtsustab
deklaratsioonide esitamise protsessi.

### Infosüsteemide haldusega seotud vaated

Infosüsteemide lisamise ja haldusega Andmenõusolekuteenuse haldusliideses on
seotud järgmised vaated:

**Infosüsteemide nimekiri**

Ülevaade kõikidest lisatud infosüsteemidest, mille haldamiseks on
kasutajal õigus. Võimaldab infosüsteemide nimekirja sorteerida erinevate
tulpade andmete järgi.

Iga deklaratsiooniga saab teha järgmised tegevused:

\"Muuda\" - ava infosüsteemi detailvaade ja muuda infosüsteemi andmed.

\"Kustuta\" - teosta infosüsteemi loogiline kustutamine. Kustutamine on
võimalik ainult siis, kui infosüsteemiga pole seotud ühtegi kehtiva
teenusedeklaratsiooni.

![Infosüsteemide nimekiri](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image5.jpg)

**Infosüsteemi lisamine**

Uue infosüsteemi lisamise vorm. Sisestatavad andmed on detailselt
kirjeldatud jaotises [7.2.2](#infosüsteemi-andmed).

![Infosüsteemi lisamine](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image6.jpg)
    
**Infosüsteemi muutmine**

Vaade, mis võimaldab muuta infosüsteemi andmed. Infosüsteemi andmete
muutmine ei mõjuta sellega seotud teenusedeklaratsioone - seal jäävad
endised andmed. Uued teenusedeklaratsioonid luuakse kasutades uued
andmed.

![Infosüsteemi muutmine](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image7.jpg)

### Infosüsteemi andmed
    
Välja nimi | Kirjeldus | Näidisväärtus | Saab muuta?
------------ | ------------- | ------------ | ------------
Infosüsteemi nimi | Kaitstud teenuste (andmeid) pakkuva infosüsteemi nimi | Tervise infosüsteem | Jah
Andmenõusolekuteenust kasutav alamsüsteem | Infosüsteemile vastav alamsüsteem, mis hakkab pöörduma Andmenõusolekuteenusesse. <br />  <br /> Iga infosüsteemi puhul saab valida ainult ühte alamsüsteemi. <br />  <br /> Infosüsteemi ja alamsüsteemi vahel on seos „üks ühele“. | EE/GOV/70009770/digilugu | Jah
Vastutav töötleja (omanik) | Vastutava töötleja (omaniku) asutuse ametlik nimi. <br /> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el | Sotsiaalministeerium | Jah
Vastutava töötleja registrikood | Vastutava töötleja (omaniku) asutuse registrikood. | 70001952 | Jah
Volitatud töötleja (mittekohustuslik väli) | Volitatud töötleja asutuse ametlik nimi. <br /> https://akit.cyber.ee/term/12750 <br /> Kui volitatud töötlejat ei ole, jäetakse väli tühjaks. | TEHIK | Jah
Volitatud töötleja registrikood (mittekohustuslik väli) | Volitatud organisatsiooni registrikood. <br /> Kui volitatud töötlejat ei ole, jäetakse väli tühjaks. | 70009770 | Jah

## Teenusedeklaratsioonide haldus

Teenusedeklaratsioon (TD) kirjeldab infosüsteemi (Andmekogu) pakutavat
kaitstud teenust, mille kasutamiseks on vajalik andmesubjekti nõusolek.
Mõned teenusedeklaratsiooni andmed kuvatakse andmesubjektile nõusoleku
andmisel (vt jaotis [8](#nõusoleku-mall)).

### Teenusedeklaratsioonide haldusega seotud vaated

Teenusedeklaratsioonide esitamise ja haldusega Andmenõusolekuteenuse
haldusliideses on seotud järgmised vaated:

**Teenusedeklaratsioonide nimekiri**

Ülevaade kõikidest esitatud teenusedeklaratsioonidest. Võimaldab
deklaratsioonide nimekirja sorteerida erinevate tulpade andmete järgi
ning filtreerida infosüsteemide ja staatuste järgi.

Iga deklaratsiooniga saab teha järgmised tegevused:

\"Vaata\" - ava deklaratsiooni detailvaade kõikide selle andmetega

\"Muuda kehtetuks\" - muuda teenusedeklaratsiooni staatus KEHTETU-ks
ning muuda kõik sellega seotud eesmärgideklaratsioonid ja nendega seotud
nõusolekud kehtetuteks.

\"Klooni\" - kasuta deklaratsioon mallina uue deklaratsiooni jaoks - uue
deklaratsiooni esitamise vormi automaatselt täidetakse kloonitava
deklaratsiooni andmetega edasiseks redigeerimiseks.

![Teenusedeklaratsionide nimekiri](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image8.jpg)

**Teenusedeklaratsiooni esitamine**

Uue teenusedeklaratsiooni esitamise vorm. Sisestatavad andmed on
detailselt kirjeldatud jaotises [7.3.2.](#teenusedeklaratsiooni-andmed)

![Teenusedeklaratsioni esitamine](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image9.jpg)

**Teenusedeklaratsiooni detailvaade**

Kuvab teenusedeklaratsiooniga seotud andmed - nii põhiandmed kui ka
metaandmed. Samuti, kuvab mitu kehtivat eesmärgideklaratsiooni ja mitu
kehtivat nõusolekut on seotud antud teenusedeklaratsiooniga. Detailvaate
kaudu saab avaldada soovi muuta kehtiva deklaratsiooni andmed, vajutades
nuppu \"Muuda deklaratsiooni andmed\".

![Teenusedeklaratsioni detailvaade](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image10.jpeg)

**Teenusedeklaratsiooni muutmine**

Vaade, mis võimaldab kehtiva teenusedeklaratsiooni andmed osaliselt
muuta. Millised väljad tohib/ei tohi muuta on kirjeldatud jaotises
[7.3.2.](#teenusedeklaratsiooni-andmed)

![Teenusedeklaratsioni muutmine](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image11.jpeg)

### Teenusedeklaratsiooni andmed

Välja nimi | Kirjeldus | Näidisväärtus | Saab muuta?
------------ | ------------- | ------------ | ------------
Teenust pakkuv infosüsteem | Rippmenüü, mis sisaldab Andmenõusolekuteenusesse lisatud infosüsteemide nimesid. TD esitamise vormis valitakse üks nendest valikutest - infosüsteem, mis pakub deklareeritavat teenust. | Tervise infosüsteem | Ei
Andmenõusolekuteenust kasutav alamsüsteem | Valitud infosüsteemile vastav alamsüsteem, mis hakkab pöörduma Andmenõusolekuteenusesse. Parameeter, mille järgi kontrollitakse, et Andmenõusolekuteenuse poole pöörduv x-tees autenditud Andmekogu alamsüsteem on õige osapool sellise päringu tegemiseks. (Väli täidetakse automaatselt teenust pakkuva infosüsteemi valimisel) | EE/GOV/70009770/digilugu | Ei
Vastutav töötleja (omanik) | Vastutava töötleja (omaniku) asutuse ametlik nimi <br /> https://akit.cyber.ee/term/10448-vastutav-tootleja-iso-el (Väli täidetakse automaatselt teenust pakkuva infosüsteemi valimisel) | Sotsiaalministeerium | Ei
Vastutava töötleja registrikood | Vastutava töötleja (omaniku) asutuse registrikood. (Täidetakse automaatselt teenust pakkuva infosüsteemi valimisel)| 70001952 | Ei
Volitatud töötleja| Volitatud töötleja asutuse ametlik nimi <br /> https://akit.cyber.ee/term/12750 (Täidetakse automaatselt teenust pakkuva infosüsteemi valimisel) | TEHIK | Ei
Volitatud töötleja registrikood | Volitatud organisatsiooni registrikood. (Täidetakse automaatselt teenust pakkuva infosüsteemi valimisel) | 70009770 | Ei
Teenusedeklaratsiooni identifikaator | Teenusedeklaratsiooni inimloetav unikaalne tunnus | hl7_immuniseerimisandmed | Ei
Teenusedeklaratsiooni nimi | Deklareeritava teenuse kaudu edastatava andmekoosseisu kokkuvõtlik lühike nimi (nähtav andmesubjektile nõusoleku andmekomplekti pealkirjana) | Immuniseerimisandmed | Jah
Teenuse tehniline kirjeldus | Teenuse tehniline kirjeldus. MVP skoobi raames - informatiivne väli sisemiseks kasutamiseks. | X-tee teenuse 'hl7' päring, HL7 OID: 1.3.6.1.4.1.28284.6.1.1.35 | Jah
Kasutatav x-tee teenus | Deklareeritav teenus. MVP skoobi raames - informatiivne väli sisemiseks kasutamiseks. | EE/GOV/70009770/digilugu/ImmuniseerimistePäring/v4 | Ei
Teenuse andmekoosseisu kirjeldus | Teenuse inimloetav kirjeldus. Tagastatavad andmed, teenuse sisu jne. Kuvatakse nõusoleku andmisel andmesubjektile. | Immuniseerimistega seotud andmed: <br /> •	haigus mille vastu immuniseeriti, <br /> •	immuniseerimise kuupäev, <br /> •	immuunpreparaat,  <br /> •	partii number,   <br /> •	manustatud annus,   <br /> •	mitmes annus,  <br /> •	järgmine immuniseerimine alates,  <br /> •	tervishoiuasutus, <br /> •	immunpreparaadi ATC kood ja toimeaine(te) nimetus(ed). <br /> | Jah
Nõusoleku maksimaalne kehtivusaeg | Mitu päeva maksimaalselt saab kehtida andmesubjekti nõusolek alates nõusoleku andmise hetkest. Selle põhjal arvutatakse nõusoleku kehtivusaja lõppkuupäev, mida näidetakse andmesubjektile nõusoleku andmisel. | 60 | Jah
Teenusedeklaratsiooni kehtivusaja lõppkuupäev | TD kehtivusaja lõppkuupäev võib olla määramata (siis TD kehtib kuni selle muudetakse kehtetuks manuaalselt) või konkreetne valitud kuupäev (kui TD kehtivusaeg lõppeb, siis ka seotud ED muutuvad kehtetuteks) | 15.05.2022 | Jah
Nõusolek vajab allkirja: | Kas nõusolek tuleb digitaalselt allkirjastada. <br />Peale märke tegemist ja deklaratsiooni esitamist enam märget muuta ei saa. <br />Kui valik on märgistatud, kuvatakse järgnevad valikud: <br /> •	Nõusolek vajab loobumisel allkirja;   <br /> •	Genereeri nõusoleku metaandmetest JSON. | Jah/ei | Ei
Nõusolek vajab loobumisel allkirja | Kas nõusoleku loobumisel tuleb nõusolek digitaalselt allkirjastada. <br />Peale märke tegemist ja deklaratsiooni esitamist enam märget muuta ei saa. | Jah/ei | Ei
Genereeri nõusoleku metaandmetest JSON | Kas nõusoleku allkirjastamisel genereeritakse nõusoleku metaandmetest JSON fail ja tõstetakse DigiDoc konteinerisse. <br />Peale märke tegemist ja deklaratsiooni esitamist enam märget muuta ei saa. | Jah/ei | Ei
Nõusoleku pikendamine lubatud | Kas kinnitatud/allkirjastatud nõusolekute pikendamine on lubatud | Jah/ei | Jah
Deklaratsiooni esitamise kuupäev | TD loomise kuupäev. ED alati hakkab kehtima alates esitamise kuupäevast. | 09.06.2023 |Ei
Deklaratsiooni vormi täitis | Infosüsteemide haldur (tema nimi ja roll süsteemis), kes täitis TD esitamise vormi. | Mart Mets (Infosüsteemi haldur) | Ei
Viimati muudetud | Kuupäev, kuna TD andmed olid viimati muudetud | 09.06.2023 | Ei
Viimane muutja | Infosüsteemide haldur (tema nimi ja roll süsteemis), kes viimasena muutis TD andmed | Mart Mets (Administraator) | Ei
Staatus | TD olek. Võimalikud olekud: KEHTIV ja KEHTETU’ (vt. jaotis 7.2.3.) | kehtiv | Ainult kehtetuks

### Teenusedeklaratsiooni seisundidiagramm

![Teenusedeklaratsiooni seisundidiagramm](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image12.png)

## Eesmärgideklaratsioonide haldus

Eesmärgideklaratsioon (ED) kirjeldab andmesaajat (Klientrakendust) ja
kaitstud andmeteteenuse tarbimise eesmärki. Mõned eesmärgideklaratsiooni
andmed kuvatakse andmesubjektile nõusoleku andmisel (vt jaotis
[8](#nõusoleku-mall)).

### Eesmärgideklaratsioonide haldusega seotud vaated

Eesmärgideklaratsioonide esitamise ja haldusega Andmenõusolekuteenuse
haldusliideses on seotud järgmised vaated:

**Eesmärgideklaratsioonide nimekiri** 

Ülevaade kõikidest esitatud eesmärgideklaratsioonidest. Võimaldab
deklaratsioonide nimekirja sorteerida erinevate tulpade andmete järgi,
filtreerida staatuste järgi ning otsida deklaratsioone deklareerija nime
järgi. 

Iga deklaratsiooniga saab teha järgmised tegevused:

-   *\"Vaata\"* - ava deklaratsiooni detailvaade kõikide selle andmetega

-   *\"Muuda kehtetuks\"* - muuda eesmärgideklaratsiooni staatus
    KEHTETUks ja muuda kehtetuks ka kõik selle deklaratsiooniga seotud
    nõusolekud.

-   *\"Klooni\"* - kasuta deklaratsioon mallina uue deklaratsiooni
    jaoks - uue deklaratsiooni esitamise vormi automaatselt täidetakse
    kloonitava deklaratsiooni andmetega edasiseks redigeerimiseks.

![Eesmärgideklaratsioonide nimekiri](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image13.jpg)

**Eesmärgideklaratsiooni esitamine**

Uue eesmärgideklaratsiooni esitamise vorm. Sisestatavad andmed on
detailselt kirjeldatud jaotises [7.4.2.](#eesmärgideklaratsiooni-andmed)

![Eesmärgideklaratsiooni esitamine](https://raw.githubusercontent.com/e-gov/NT/refs/heads/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/Eesm%C3%A4rgideklaratsiooni%20esitamine.PNG)

**Eesmärgideklaratsiooni detailvaade**

Kuvab eesmärgideklaratsiooniga seotud andmed - nii põhiandmed kui ka
metaandmed.  Samuti, kuvab mitu kehtivat nõusolekut on seotud antud
eesmärgideklaratsiooniga. Detailvaate kaudu saab avaldada soovi muuta
kehtiva deklaratsiooni andmed, vajutades nuppu \"Muuda deklaratsiooni
andmed\". „Laadi alla" nuppu vajutades saab alla laadida
eesmärgideklaratsiooni andmed CSV formaadis.

![Eesmärgideklaratsiooni detailvaade](https://raw.githubusercontent.com/e-gov/NT/refs/heads/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/Eesm%C3%A4rgideklaratsiooni%20detailvaade.PNG)

**Eesmärgideklaratsiooni muutmine**

Vaade, mis võimaldab kehtiva eesmärgideklaratsiooni andmed osaliselt
muuta. Milliseid välju tohib/ei tohi muuta on kirjeldatud jaotises
[7.4.2.](#eesmärgideklaratsiooni-andmed)

![Eesmärgideklaratsiooni muutmine](https://raw.githubusercontent.com/e-gov/NT/refs/heads/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/Eesm%C3%A4rgideklaratsiooni%20muutmine.PNG)

### Eesmärgideklaratsiooni andmed

Välja nimi | Kirjeldus | Näidisväärtus | Saab muuta?
------------ | ------------- | ------------ | ------------
Andmete saaja nimi | Klientrakenduse (ED deklareerija) ettevõte/asutuse ametlik nimi | Health Startup OÜ | Ei
Andmete saaja registrikood | Klientrakenduse (ED deklareerija) ettevõte/asutuse registrikood | 12819685 | Ei
Andmenõusolekuteenust kasutav alamsüsteem | Kliendirakenduse alamsüsteem, mis hakkab pöörduma Andmenõusolekuteenusesse. Parameeter, mille järgi kontrollitakse, et Andmenõusolekuteenuse poole pöörduv x-tees autenditud Kliendirakenduse alamsüsteem on õige osapool sellise päringu tegemiseks. Rippmenüü sisaldab kõike alamsüsteeme x-tee kataloogist ja toetab autocomplete otsingut.  | EE/COM/12819685/immu	| Ei
Andmete saaja pakutav teenus | Klientrakenduse või selle äriteenuse kaubanduslik nimi. Annab Andmesubjektile info, milline konkreetne äriteenus/infosüsteem hakkab kasutama tema isikuandmeid. | Immu | Ei
Kasutatav teenusedeklaratsioon | Teenusedeklaratsioon (infosüsteemi nimi-TD identifikaator), millega deklareeritakse eesmärgi täitmiseks vajalikke andmeid pakkuvat kaitstud teenust. <br /> <br /> Teenusedeklaratsiooni (TD) valimine toimub kahe sammuga: <br /> <br /> 1) Infosüsteemi (millega on seotud TD) valimine - rippmenüü, mis sisaldab "Infosüsteemide halduse" kaudu lisatud infosüsteemide nimed. <br /> <br /> 2) TD identifikaatori valimine - rippmenüü, mis sisaldab eelmises sammus valitud infosüsteemiga seotud kehtivate teenusedeklaratsioonide identifikaatorid. <br />  <br /> Ühe ED-ga võib olla seotud ainult üks TD. | Tervise Infosüsteem-hl7_immuniseerimisandmed | Ei
Eesmärgideklaratsiooni identifikaator | Eesmärgideklaratsiooni inimloetav unikaalne tunnus. | healthstartup_immuniseerimisa ndmed | Ei
Eesmärgideklaratsiooni nimi | Deklareeritava andmete kasutamise eesmärgi  inimloetav lühike nimi. | Health Startup immuniseerimisandmed | Jah
Andmete kasutamise eesmärk | Andmesubjekti andmete kasutamise eesmärgi kirjeldus. | Kui lubate Tervise infosüsteemil enda immuniseerimisandmed Health Startup OÜ-le edastada, võimaldab see teile pakkuda vaktsineerimiste nõustamise ja meeldetuletuse teenust Immu. <br />  <br /> Health Startup OÜ kasutab Tervise infosüsteemist saadud immuniseerimisandmeid isikliku vaktsineerimisvajaduste hindamiseks ning koostab nende põhjal vajaliku vaktsineerimisplaani, ühendades kasutaja sisestatud andmed riiklikult kogutud immuniseerimisandmetega. Nii saab võimalikuks vaktsineerimissoovituste pakkumine isiku asukoha, reisiplaanide, tervisliku seisundi, prognoositava puugihooaja jm sisendinfo põhjal, arvestades alati isiku seniseid immuniseerimisi. <br />  <br /> Health Startup OÜ kasutab Tervise infosüsteemist pärit immuniseerimisandmeid ainult ülalkirjeldatud teenuse Immu pakkumiseks ning kustutab kõik isikuandmed kasutaja sellekohasel soovil. | Jah
Andmete saaja andmekaitsetingimused | Klientrakenduse või selle äriteenuse andmekaitsetingimused (lisada lingina) | https://andmekaitsetingimused.ee | Jah
Eesmärgideklaratsiooni kehtivusaja lõppkuupäev | ED kehtivusaja lõppkuupäevaks määratakse kas või sama kuupäev, mis on TD kehtivusaja lõppkupäev (võib olla ka "määramata"), või valitakse eraldi kuupäeva ED jaoks. | määramata | Ei
Deklaratsiooni esitamise kuupäev (määratakse automaatselt) | ED loomise kuupäev. ED alati hakkab kehtima alates esitamise kuupäevast. | 09.06.2023 | Ei
Deklaratsiooni vormi täitis (määratakse automaatselt) | Infosüsteemide haldur (tema nimi ja roll süsteemis), kes täitis ED esitamise vormi. | Mart Mets (Infosüsteemi haldur) | Ei
Viimati muudetud (määratakse automaatselt) | Kuupäev, kuna ED andmed olid viimati muudetud. | 09.06.2023 | Ei
Viimane muutja (määratakse automaatselt) | Infosüsteemi haldur (tema nimi ja roll süsteemis), kes viimasena muutis ED andmed. | Mart Mets (Infosüsteemi haldur) | Ei
Staatus | ED olek. Võimalikud olekud: KEHTIV ja KEHTETU (vt. jaotis 7.3.3.) | kehtiv | Ainult kehtetuks

### Eesmärgideklaratsiooni seisundidiagramm

![Eesmärgideklaratsiooni seisundidiagramm](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image17.png)
    
## Statistika

Statistika menüü on mõeldud statistika tegemiseks haldusliideses olevate
deklaratsioonide ja nendega seotud nõusolekute kohta. Statistikat saavad
teha kõik infosüsteemi haldurid oma haldusala piires ning kasutajad
märkega „RIA administraatori statistika" üle kogu süsteemi.

Statistika tegemiseks tuleb valida infosüsteem ja/või andmete saaja
nimi:

-   Infosüsteem -- valikusse kuvatakse Infosüsteemid vastavalt oma
    vastutusalas olevate asutuste piires. Kui kasutaja on märkega „RIA
    administraatori statistika", siis kuvatakse valikusse infosüsteeme
    üle kogu süsteemi. Saab valida 1-n väärtust.

-   Andmete saaja -- ettevõtte otsingu väli andmete saaja nime järgi.
    Otsida saab andmete saaja järgi oma vastutusalas olevate asutuste
    piires. Kui kasutaja on märkega „RIA administraatori statistika",
    siis otsitakse andmete saajaid üle kogu süsteemi. Saab otsida ühe
    väärtuse järgi korraga.

### Statistika väljund

Statistika tulemuste tabelis saab näha statistikat vastavalt valitud
Infosüsteemi ja/või andmete saaja järgi. Võimaldab statistika andmeid
sorteerida erinevate tulpade järgi.

![Statistika väljund](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image31.png)

### Statistika andmestik

Välja nimi | Kirjeldus
------------ | -------------
Infosüsteem/Teenuse pakkuja | Infosüsteemi nimi, mis pakub deklareeritavat teenust.
Andmete saaja | Kliendirakenduse (ED deklareerija) ettevõtte nimi)
Kehtivad teenusedeklaratsioonid | Kehtivate teenusedeklaratsioonide kokku summa.
Kehtivad eesmärgideklaratsioonid | Kehtivate teenusedeklaratsioonide kokku summa infosüsteemi põhiselt ja ettevõtte põhiselt.
Kehtivad nõusolekud | Kehtivate nõusolekute kokku summa infosüsteemi põhiselt ja ettevõtte põhiselt
Valideeritud nõusolekud | Valideeritud (ehk kinnitatud) nõusolekute kokku summa infosüsteemi põhiselt ja ettevõtte põhiselt. <br />  <br />Kinnitatud nõusolekute arv sisaldab kõiki nõusolekuid, mis on ära kinnitatud ja mille staatus võib olla juba ka muutunud. Nt aegunud, tagasi võetud vms. Ei sisalda otsuse ootel nõusolekuid.
Kõik nõusolekud | Kõikide nõusolekute kokku summa infosüsteemi põhiselt ja ettevõtte põhiselt sõltumata nende staatusest.
Kokku | Kokku summad.

# Nõusoleku mall

Järgmine tabel kirjeldab andmed, mis sisaldab nõusolek.
    
Andmeväli | Näide | Allikas
------------ | ------------- | ------------
Andmesubjekti nimi | Jaan Tamm | nõusolek
Andmesubjekti isikukood | 39155555454 | nõusolek
Andmekogu või infosüsteemi nimetus (andmete edastaja) | Tervise infosüsteem | teenusedeklaratsioon
Isikuandmete vastutav töötleja (andmekogu või infosüsteemi haldaja) nimi ja registrikood | Sotsiaalministeerium (70001952) | teenusedeklaratsioon
Isikuandmete volitatud töötleja nimi ja registrikood | TEHIK (70009770) | teenusedeklaratsioon
Andmete saaja | Health Startup OÜ | eesmärgideklaratsioon
Andmete saaja pakutav teenus (kaubanduslik nimi) | Immu | eesmärgideklaratsioon
Isikuandmed (andmekoosseisu kirjeldus) | Immuniseerimistega seotud andmed:  <br /> <br /> •	haigus mille vastu immuniseeriti, <br /> •	immuniseerimise kuupäev, <br /> •	immuunpreparaat, <br /> •	partii number, <br /> •	manustatud annus, <br /> •	mitmes annus, <br /> •	järgmine immuniseerimine alates, <br /> •	tervishoiuasutus, <br /> •	immunpreparaadi ATC kood ja toimeaine(te) nimetus(ed). | teenusedeklaratsioon
Andmete kasutamise eesmärk | Kui lubate Tervise infosüsteemil enda immuniseerimisandmed Health Startup OÜ-le edastada, võimaldab see teile pakkuda vaktsineerimiste nõustamise ja meeldetuletuse teenust Immu. <br />  <br /> Health Startup OÜ kasutab Tervise infosüsteemist saadud immuniseerimisandmeid isikliku vaktsineerimisvajaduste hindamiseks ning koostab nende põhjal vajaliku vaktsineerimisplaani, ühendades kasutaja sisestatud andmed riiklikult kogutud immuniseerimisandmetega. Nii saab võimalikuks vaktsineerimissoovituste pakkumine isiku asukoha, reisiplaanide, tervisliku seisundi, prognoositava puugihooaja jm sisendinfo põhjal, arvestades alati isiku seniseid immuniseerimisi. <br />  <br /> Health Startup OÜ kasutab Tervise infosüsteemist pärit immuniseerimisandmeid ainult ülalkirjeldatud teenuse Immu pakkumiseks ning kustutab kõik isikuandmed kasutaja sellekohasel soovil. | eesmärgideklaratsioon
Andmete saaja andmekaitsetingimused | https://andmekaitsetingimused.ee | eesmärgideklaratsioon
Nõusoleku kehtivus | alates 23.12.2024  <br /> kuni 20.02.2025 | nõusolek (kehtivusaja arvutatakse: nõusoleku andmise kuupäev + nõusoleku maksimaalne kehtivusaeg päevades (teenusedeklaratsioonist))

# Andmenõusolekuteenuse kasutajaliides

Andmenõusolekuteenuse Andmesubjektile (tavakasutajale) sh Andmesubjekti 
esindajale mõeldud kasutajaliides on realiseeritud eraldiseisva 
veebirakendusena, mis moodustab osa eesti.ee portaalist. 
Andmenõusolekuteenuse Andmesubjektile ja Andmesubjekti esindajale mõeldud
kasutajaliides koosneb kahest poolest: nõusolekute andmine ja
nõusolekute haldus.

## Nõusoleku andmine 

Andmesubjekt saab tutvuda nõusolekutaotlustega ja anda vajalikud
nõusolekud unikaalse lingi kaudu, kuhu ta suunatakse Klientrakendusest.

### Enne suunamist

Iga kord kui Klientrakendus soovib suunata Andmesubjekti või 
Andmesubjekti esindajat nõusolekuid andma, peab see küsima 
Andmenõusolekuteenusest uue lingi vajalike nõusolekutaotluste komplektiga.
Kui Andmesubjekt läheb nõusolekuid andma, siis küsitakse uus link
kasutades teenust ***getConsentGroupReference***
API (vt jaotis [5.1.1](#getconsentgroupreference)), kui Andmesubjekti esindaja, siis kasutatakse
teenust ***getConsentGroupReferenceRepresentable*** (vt jaotist
[5.1.6.](#getconsentgroupreferencerepresentable))

Enne Andmenõusolekuteenusesse suunamist peab Klientrakendus informeerima
Andmesubjekti või Andmesubjekti esindajat nõusoleku(te) andmise 
vajadusest, andmete töötlemise tingimustest ja eesootavast 
Andmenõusolekuteenusesse suunamisest.

Näidistekst:

> Teenuse X kasutamiseks vajame Teie nõusolekut portaalis
> eesti.ee/nousolek, et vajalikke andmeid Y infosüsteemist küsida.
> 
> Kui lubate riigil meile oma andmeid anda, siis vastutame nende
> töötlemise eest nii nagu\
> meie **privaatsustingimustes (link)** kirjas on.\
> **Miks meil seda vaja on ja miks see teile kasulik on? (link)**
> 
> Lähen nõusolekut andma:
> 
> **\[nupp\]**

### Andmenõusolekuteenuses

Enne Andmenõusolekuteenusesse sattumist autendib Andmesubjekt või 
Andmesubjekti esindaja ennast TARA kaudu, kasutades ühte pakutavatest 
sisselogimisviisidest.

![TARA](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/autentimise%20avakuva.PNG)

Pärast autentimist näeb Andmesubjekt või Andmesubjekti esindaja 
nõusolekutaotlusi. Antud näitel küsitakse nõusolekut ainult ühe 
andmekomplekti edastamisele: Tervise konsultatsiooni andmeid.

![Nõusolekutaotlused](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/NT%20taotlus.PNG)

Osapoolte nimede peale vajutades saab näha detailset infot iga osapoole
kohta.

PS! Kui nõusolekut antakse esindatava eest, siis nõusoleku andjaks on
esindatav ehk laps.

![Nõusoleku andja,andmete edastaja, andmete saaja](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/Infov%C3%A4ljad%20koos.PNG)

Pärast nõusolekutaotluse detailidega tutvumist saab Andmesubjekt või 
Andmesubjekti esindaja valida, kas ta lubab või ei luba kirjeldatud 
andmekomplekti edastamist. Kui lubab, siis staatuse silt ja nupp 
muutuvad rohelisteks.

![Luban](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/NT%20taotlus%20luban.PNG)

Kui Andmesubjekt või Andmesubjekti esindaja ei luba kirjeldatud 
andmekomplekti edastada, siis muutuvad staatuse silt ja nupp punasteks.

![Ei luba](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/NT%20taotlus%20ei%20luba.PNG)

Enne „Kinnitan" nupu vajutamist saab Andmesubjekt või Andmesubjekti 
esindaja oma otsuseid samal lehel muuta.

Kui valikud on tehtud, vajutab Andmesubjekt või Andmesubjekti esindaja
nuppu „Kinnitan". Andmenõusolekuteenus teeb antud nõusolekud kehtivateks.

PS! Kui andmekogu poolt läbi teenusedeklaratsiooni on nõusoleku
andmisel digitaalne allkirjastamine nõutud, siis nõusoleku tuleb
allkirjastada digitaalselt.

Kui kõik valikud on tehtud, suunatakse Andmesubjekti või Andmesubjekti
esindaja tagasi Klientrakendusesse.

![Kinnitan](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/N%C3%B5usolek%20antud.PNG)
    
### Pärast suunamist

Pärast Andmesubjekti või Andmesubjekti esindaja tagasi suunamist küsib 
Klientrakendus Andmenõusolekuteenusest nõusolekuviited ning nende 
valideerimise, et teada saada, millised nõusolekud olid antud ja nüüd 
kehtivad. Kasutatakse ***getConsentReferences*** ja 
***validateConsentForClient*** API-d (vt jaotised [5.1.2.](#getconsentreferences) ja
[5.1.3.](#validateconsentforclient)).

Vastavalt saadud vastusele, kuvab Klientrakendus Andmesubjektile või 
Andmesubjekti esindajale teadet. Kui kõik vajalikud nõusolekud 
kehtivad, võib Klientrakendus hakata küsima andmeid Andmekogult ja 
osutama teenust Andmesubjektile või Andmesubjekti esindajale.

Kui mõned nõusolekud on puudu, küsib Klientrakendus Andmenõusolekuteenusest
uue lingi (kasutades ***getConsentGroupReference*** API
(vt jaotis [5.1.1.](#getconsentgroupreference)) ja suunab Andmesubjekti
või Andmesubjekti esindaja puuduvaid nõusolekuid andma.

## Nõusolekute haldus

Nõusolekute haldusliides on osa eesti.ee portaalist ja Andmesubjekt
või Andmesubjekti esindaja leiab selle navigatsiooni menüüst pärast 
sisselogimist. Haldusliides koosneb neljast alamlehest: 
„Andmenõusolekuteenusest", „Minu nõusolekud", „Andmete kasutus", 
„Kasutustingimused".

### Andmenõusolekuteenusest

Alamleht annab üldise info Andmenõusolekuteenusest.

![Andmenõusolekuteenusest](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image26.jpeg)

### Minu nõusolekud

Alamlehelt on jaotatud kaheks vaheleheks, kus „Mina" vahelehel saab
näha kõiki Andmesubjekti (iseenda) poolt kunagi antud nõusolekuid ning
vahelehel „Lapsed" saab näha lapse/laste nõusolekuid, mis on antud
Andmesubjekti esindaja poolt - nii kehtivaid kui ka kehtetuid.

„Lapsed" vahelehel kuvatakse ainult lapsi, kes on alaealised ja kelle
suhtes omatakse täielikku isikuhooldusõigust. Laste info päritakse
automaatselt Rahvastikuregistrist.

Nõusolekuid saab filtreerida staatuse, lapse (vahelehel „Lapsed") ja
märksõna järgi. Nõusolekute tabel on sorteeritav.

![Minu nõusolekud](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image27.jpeg)
![Lapse nõusolekud](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image32.png)

Tabeli reale vajutades saab näha nõusoleku detaile ning kehtiva
nõusoleku puhul nuppu „loobun nõusolekust", mille abil saab nõusoleku
tagasi võtta ning juhul, kui nõusoleku pikendamine on lubatud, siis
nuppu „Pikenda", millega saab nõusolekut pikendada.

![Nõusoleku detailid ja loobumine](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/N%C3%B5usolek%20portaalis.PNG)

Kui nõusoleku kinnitas või allkirjastas Andmesubjekti esindaja (sh ka
loobus), siis nõusoleku detailandmetel kuvatakse
kinnitaja/allkirjastaja nime.

![Esindaja kinnitas](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image33.png)

Kehtetu nõusoleku detailides saab näha põhjust, miks nõusolek ei kehti
(nõusolek on tagasi võetud / nõusolek on aegunud / andmeedastus on
lõppenud).

![Nõusoleku kehtivuse lõppemise põhjus](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image29.jpg)

#### Nõusolekust loobumine

Andmesubjekt ja Andmesubjekti esindaja saavad nõusolekust loobuda
nupust „Loobun nõusolekust". Loobuda saab nõusolekust, mis on kehtiv.

Kui andmekogu poolt läbi teenusedeklaratsiooni on nõusolekust
loobumisel digitaalne allkirjastamine nõutud, siis nõusolekust
loobumine tuleb allkirjastada digitaalselt.

![Loobu või pikenda](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image34.png)

Kui nõusolekust loobutakse, siis muudetakse nõusolek kehtetuks ja
kasutajale kuvatakse teadet „Nõusolek on tagasi võetud".

![Loobutud nõusolek](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image35.png)

Kui nõusolekust loobus Andmesubjekti esindaja, siis nõusoleku
detailandmetesse kuvatakse nõusolekust loobujaks esindaja nime (vt pilti üleval pool).

#### Nõusoleku pikendamine

Täisealine ja teovõimeline Andmesubjekt saab nõusolekut pikendada
nupust „Pikenda". Pikendada saab nõusolekut, mis on kehtiv ning mille
pikendamine on andmekogu poolt lubatud läbi teenusedeklaratsiooni.

PS! Andmesubjekti esindaja Andmesubjekti (lapse) nõusolekuid pikendada
ei saa.

Andmesubjektile kuvatakse nõusolekutaotlus.

![Pikendamine](https://raw.githubusercontent.com/e-gov/NT/refs/heads/documentation-change/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/NT%20pikendamine.PNG)

Andmesubjekt saab kalendrist valida kehtivuse lõpu kuupäeva. Vaikimisi
kuvatakse võimalik maksimum kuupäev, mis võetakse
teenusedeklaratsiooni maksimum kehtivusaja ning eesmärgideklaratsiooni
kehtivusaja lõpp järgi kõige lühem kuupäeva.

Kui Andmesubjekt on nõusolekutaotlusega tutvunud ning määranud
kehtivuse kuupäeva, saab Andmesubjekt valida kas ta lubab või ei luba
kirjeldatud andmekomplekti edastamist ning kinnitada nõusolek.

Kui nõusoleku pikendamisega nõustuti (tehti märge „Luban") ning
kinnitati, siis Andmenõusolekuteenus teeb antud nõusoleku kehtivaks ning
eelmise, mille pealt nõusoleku pikendamist alustati kehtetuks.

Kui nõusoleku pikendamisega ei nõustutud (tehti märge „Ei luba") ning
kinnitati (sh aken suleti ristist), siis tegevus katkestatakse ning
nõusolekut ei pikendata.

### Edastatud andmed

Alamleht annab ülevaate sellest, millised edukad andmepäringud olid
tehtud Andmesubjekti nõusolekute alusel ja võimaldab jälgida enda ja
lapse/laste isikuandmete edastamist.

Informatsioon andmete edastamisest saab otsida märksõna, lapse
(vahelehel „Lapsed") järgi ning filtreerida aja perioodi järgi. Tabel
on sorteeritav.

![Edastatud andmed](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image30.jpeg)

„Lapsed" vahelehel kuvatakse lapsi, kes on alaealised ja kelle suhtes
omatakse täielikku isikuhooldusõigust. Laste info päritakse
automaatselt Rahvastikuregistrist.

![Lapse edastatud andmed](https://raw.githubusercontent.com/e-gov/NT/master/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine/dokumendis%20kasutatud%20pildid/image37.png)

### Kasutustingimused

Alamleht tutvustab Andmesubjektile Andmenõusolekuteenuse kasutustingimusi.

*(täiendamisel)*
