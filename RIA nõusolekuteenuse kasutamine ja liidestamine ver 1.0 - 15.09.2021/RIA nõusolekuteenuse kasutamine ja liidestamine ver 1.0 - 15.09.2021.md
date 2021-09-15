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

![Põhistsenaariumi jadadiagramm](https://github.com/e-gov/NT/blob/256b2cf3448012b190ead1a2b432e89fe6e7305c/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine%20ver%201.0%20-%2015.09.2021/dokumendis%20kasutatud%20pildid/image1.png)


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

## 3.2. Kasutusjuht 2: Andmete pärimine ja nõusoleku valideerimine (andmekogu)

**Tegutsejad:** Andmekogu, Klientrakendus, Nõusolekuteenus

**Osapooled ja nende huvid:**

-   Klientrakendus soovib kätte saada Andmesubjekti andmeid Andmekogult kaitstud teenuse kaudu.

-   Andmekogu soovib veenduda Nõusolekuteenuse abil, et küsitud andmete edastamisele on olemas kehtiv Andmesubjekti nõusolek ning andmeedastuse tingimused on korrektsed.

-   Nõusolekuteenus soovib valideerida vajaliku nõusoleku kehtivust ning edastada Andmekogule andmeedastuse tingimuste kontrollimiseks vajalikud andmed.

**Eeltingimused:** Andmekogul on teada enda infosüsteemidega seotud
teenusedeklaratsioonide identifikaatorid. Andmekogul on olemas
vastavusetabel, mille abil saab kontrollida millisele kaitstud teenusele
vastab iga teenusedeklaratsioon.

**Järeltingimused (kehtiva nõusoleku puhul):** Andmekogu edastab andmed
Klientrakendusele kaitstud teenuse kaudu.

**Põhistsenaarium (eeldusel , et vajalik nõusolek kehtib):**

1.  Klientrakendus küsib andmed Andmekogult. Andmepäring peab sisaldama
    vastavat nõusolekuviidet ning Andmesubjekti isikukoodi.

2.  Andmekogu saadab nõusolekuviite Nõusolekuteenusesse valideerimiseks.
    Nõusolekuteenus valideerib nõusolekuviite ja saadab Andmekogule
    vastuse, mis sisaldab peale nõusolekuviite ka nõusoleku kehtivuse
    lõppkuupäeva, Klientrakenduse alamsüsteemi identifikaatorit,
    Andmesubjekti isikukoodi ja nõusolekuga seotud teenusedeklaratsiooni
    identifikaatorit. Sammudes 2 ja 3 kasutatakse
    ***validateConsentForDataProvider*** päringut (vt jaotis
    [5.1.4.](#validateconsentfordataprovider))

3.  Andmekogu kontrollib järgmised andmeedastuse tingimused:

    -   andmepäringu saatnud Klientrakenduse alamsüsteemi identifikaator
    (x-tee päringu päises) on sama, mis on Nõusolekuteenuse vastuses;

    -   Klientrakenduse andmepäringus sisalduv Andmesubjekti isikukood on
    sama, mis on Nõusolekuteenuse vastuses;

    -   kaitstud teenus, mille kaudu Klientrakendus küsib andmed vastab
    Nõusolekuteenuse vastuses sisalduvale teenusedeklaratsiooni
    identifikaatorile.

4.  Kui kõik kontrollid on õnnestunud, edastab Andmekogu küsitud andmed
    Klientrakendusele.

5.  Andmekogu raporteerib eduka andmeedastuse. Kasutatakse
    ***reportDataTransmission*** päringut (vt jaotis
    [5.1.5.](#reportdatatransmission)).


**Põhistsenaariumi jadadiagramm:**

![Põhistsenaariumi jadadiagramm](https://github.com/e-gov/NT/blob/262d0925d6819fb48f4053ee674c066675074215/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine%20ver%201.0%20-%2015.09.2021/dokumendis%20kasutatud%20pildid/image2.png)

**Alternatiivsed stsenaariumid:**

1a. Klientrakenduse andmepäring ei sisalda nõusolekuviidet.

-   Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata
    ja andmeedastust ei raporteerita.

2a. Sellist nõusolekuviidet Nõusolekuteenuses ei eksisteeri.

-   Valideerimine ebaõnnestunud, Nõusolekuteenus vastab Andmekogule
    veateatega.

-   Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata
    ja andmeedastust ei raporteerita.

2b. Nõusolekuviide viitab nõusolekule, mis ei kehti.

-   Valideerimine ebaõnnestunud, Nõusolekuteenus vastab Andmekogule
    veateatega.

-   Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata
    ja andmeedastust ei raporteerita.

3a. Vähemalt üks kontrollidest on ebaõnnestunud.

-   Andmekogu vastab Klientrakendusele veateatega, andmeid ei edastata
    ja andmeedastust ei raporteerita.

# Nõusoleku seisundidiagramm

Järgnev diagramm kirjeldab nõusoleku võimalikke seisundeid ja
nendevahelisi üleminekuid.

![Põhistsenaariumi jadadiagramm](https://github.com/e-gov/NT/blob/262d0925d6819fb48f4053ee674c066675074215/RIA%20n%C3%B5usolekuteenuse%20kasutamine%20ja%20liidestamine%20ver%201.0%20-%2015.09.2021/dokumendis%20kasutatud%20pildid/image3.png)

# Nõusolekuteenusega liidestamine ja päringute tehniline kirjeldus

Nõusolekuteenus pakub REST API päringuid üle x-tee.

Kõikide Nõusolekuteenusele jõudnud päringute puhul kontrollitakse, et
Nõusolekuteenuse juurde pöörduv x-tees autenditud alamsüsteem on õige
osapool sellise päringu tegemiseks. Nõusolekuteenus vastab päringule
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

Päringu abil saab Nõusolekuteenuselt küsida nõusoleku(te) lingi (URL),
mille kaudu saab Andmesubjekti suunata nõusolekutaotlusi vaatama ja
nõusolekuid andma.

Kasutab: Klientrakendus

**TÄHTIS!** Andmesubjekti suunamiseks mitte kasutada sama linki mitu
korda, sest vana lingi kaudu võidakse kuvada puudulikke andmeid.
Andmesubjekti suunamisel peab [alati]{.ul} küsima uue lingi
**getConsentGroupReference** päringu abil.

Enne lingi genereerimist Nõusolekuteenus kontrollib, et päringus
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

**Tähtis!** Päringu kättesaamisel Nõusolekuteenus kontrollib, et x-tees
autenditud Klientrakenduse x-tee alamsüsteemi identifikaator on sama,
mis on määratud eesmärgideklaratsiooni(de)s.

**Vastus:**
```
{
  "url":"http://www.arendus.eesti.ee/nousolek/consent-request?reference=dd74ed1b-a00f-4232-8b25-914d6ecbcb30&callback=https://www.ria.ee"
}
```
Parameeter | Andmetüüp | Kirjeldus
------------ | ------------ | -------------
url | string | Nõusoleku(te) URL, mille kaudu Andmesubjekt saab anda Nõusolekuteenuses Kliendirakenduse poolt küsitud nõusolekud

**Veahaldus:**

Vea võti | Veakood ja staatus | Vea kirjeldus
------------ | ------------ | -------------
error.validation | VALIDATION (400) | Validatsiooni üldised veateated (kohustuslikud väljad määramata, isikukood <>11 märki, mittenumbriline)
error.business.requested-consents-not-related-to-any-declarations | REQUESTED_CONSENTS_NOT_RELATED_TO_ANY_DECLARATIONS (404) | Kehtiva eesmärgideklaratsiooni ja alamsüsteemi kombinatsiooni ei leitud kõikide küsitud nõusolekute puhul
error.business.id-code-invalid | ID_CODE_INVALID (400) | Isikukood ei vasta standardile
error.business.requested-consents-related-to-invalid-declarations | REQUESTED_CONSENTS_RELATED_TO_INVALID_DECLARATIONS (500) | Küsitud nõusolekud on seotud kehtetute eesmärgideklaratsioonidega. Küsitud äriidentifikaatorid, mis on seotud kehtetute eesmärgideklaratsoonidega eesmärgideklarastiooni mikroteenuse andmebaasis on loetletud vea kirjelduses
error.business.all-requested-consents-have-already-been-approved | ALL_REQUESTED_CONSENTS_HAVE_ALREADY_BEEN_APPROVED (500) | Nõusolekute mitmekordsel küsimisel juhul, kui kõik leitud nõusolekud on staatuses APPROVED

### getConsentReferences

Päringu abil saab küsida Nõusolekuteenuselt kehtivate nõusoleku(te)
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
    
**Tähtis!** Päringu kättesaamisel Nõusolekuteenus kontrollib, et x-tees
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
error.business.id-code-invalid | ID_CODE_INVALID (400) | Isikukood ei vasta standardile

### validateConsentForClient

Päringu abil saab küsida Nõusolekuteenuselt nõusoleku kehtivust.

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

**Tähtis!** Päringu kättesaamisel Nõusolekuteenus kontrollib, et x-tees
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

Päringu abil saab küsida Nõusolekuteenuselt nõusoleku kehtivust ning
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


**Tähtis!** Päringu kättesaamisel Nõusolekuteenus kontrollib, et x-tees
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

Päringu abil saab teavitada Nõusolekuteenust sellest, et toimus
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

**Tähtis!** Päringu kättesaamisel Nõusolekuteenus kontrollib, et x-tees
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
