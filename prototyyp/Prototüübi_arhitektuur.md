# Nõusolekuteenuse Prototüüp

**Arhitektuuridokument**

2019-12-14

Versioon: 1.0

Y-1341-2

---

| Date       | Ver | Description 
| ---------- | --- | -----------
| 2019-12-16 | 1.0 | Initial public version

**Sisukord**

<!-- TOC -->

- [1. Eesmärk](#1-eesmärk)
- [2. Lahendatav probleem](#2-lahendatav-probleem)
- [3. Mõisted ja viited](#3-mõisted-ja-viited)
  - [3.1. Mõisted](#31-mõisted)
  - [3.2. Viited](#32-viited)
- [4. Nõuded](#4-nõuded)
- [5. Raamistiku komponendid](#5-raamistiku-komponendid)
- [6. Protsessid prototüüprakenduses](#6-protsessid-prototüüprakenduses)
  - [6.1. Teenusepakkuja infosüsteem](#61-teenusepakkuja-infosüsteem)
  - [6.2. Klientrakendus](#62-klientrakendus)
  - [6.3. Nõusolekuteenus](#63-nõusolekuteenus)
- [7. "Välised registrid"](#7-välised-registrid)
- [8. Tõlkemehhanism](#8-tõlkemehhanism)
- [9. Alternatiivsed kasutajaliidesed](#9-alternatiivsed-kasutajaliidesed)
- [10. Juhuslikult genereeritud identifikaatorid](#10-juhuslikult-genereeritud-identifikaatorid)
- [11. Tõlked](#11-tõlked)
- [12. Konfiguratsioon](#12-konfiguratsioon)

<!-- /TOC -->

# Sissejuhatus

## 1. Eesmärk
<a id="markdown-1-eesmärk" name="1-eesmärk"></a>

See dokument kirjeldab Nõusolekuteenuse Prototüübi projektis valminud
prototüüp/demolahenduse (prototüübi) arhitektuuri ja selle ehitamisel tehtud
valikuid.

Dokumendi eesmärk on anda tarkvarainsenerile ülevaade lahenduse sise-elust,
võimaldamaks lahenduse koodi ülevaatust ja laiendamist.

## 2. Lahendatav probleem
<a id="markdown-2-lahendatav-probleem" name="2-lahendatav-probleem"></a>

Prototüübil on kaks olulisemat eesmärki:

- prototüübi abil peab saama veenduda, et Nõusolekuteenuse kandidaatarhitektuur
  ja seda toetav protokoll on ka tegelikult teostatavad sõnumite kirjelduste
  täielikkuse mõttes. St, et prototüüp peab teostama olulise osa
  Nõusolekuteenuse protokollist ja võimaldama näidata suhtlust nõusolekuteenuse
  ja seda kasutavate osapoolte vahel.

- prototüübi abil peab saama demonstreerida pakutava süsteemi toimimist
  osapooltele, kelle eelteadmised kandidaat-arhitektuurist ja protokollist on
  väikesed ja/või keda ei huvitagi lahenduse tehnilised detailid vaid pigem
  kõrge taseme nõuded osapooltele ning (visandatud) lõppkasutaja-vaade.

## 3. Mõisted ja viited
<a id="markdown-3-mõisted-ja-viited" name="3-mõisted-ja-viited"></a>

### 3.1. Mõisted
<a id="markdown-31-mõisted" name="31-mõisted"></a>

- **Nõusolekuteenus** -- komponent, mille ülesanne on teiste infosüsteemide
  jaoks lahendada ära osa nõusolekute andmise, haldamise ja tagasivõtmise
  probleemidest. 

- **Prototüüp** -- rakendus või komplekt rakendusi, mis teostavad selles
  dokumendis kirjeldatud tarkvara. 

### 3.2. Viited
<a id="markdown-32-viited" name="32-viited"></a>

1. <a name="ref_archdoc"></a>Consent Service Architecture 1.0,
   <http://github.com/e-gov/NT/>

2. <a name="ref_veera"></a>Veebiraamistik Veera, 
   <https://koodivaramu.eesti.ee/veebiraamistik>

3. <a name="ref_riamfn"></a>RIA mittefunktsionaalsed nõuded,
   <https://e-gov.github.io/MFN/>

4. <a name="ref_tara"></a>Riigi autentimisteenus (TARA),
   <https://www.ria.ee/et/riigi-infosusteem/eid/partnerile.html#tara>

5. <a name="ref_react"></a>React,
   <https://reactjs.org>

6. <a name="ref_redux"></a>Redux,
   <https://redux.js.org>

## 4. Nõuded
<a id="markdown-4-nõuded" name="4-nõuded"></a>

Kõige olulisem nõue on, et prototüüp peab lahendama mõlemad sissejuhatuses
kirjeldatud probleemid: see peab võimaldama kontrollida protokolli töötamist
ning selle abil peab saama demonstreerida tulevase süsteemi töötamist. Nende
kahe asjaolu järeldustena saab sõnastada pisut detailsemad eesmärgid/nõuded.

Protokolli toimimises veendumiseks:

- protokollis sõnumeid vahetavad osapooled peavad prototüübis selgelt ja
  äratuntavalt esinema. Peab olema võimalik näha milliseid sõnumeid osapooled
  saadavad ja milliseid vastu võtavad. Võimaluse korral peab nägema, kuidas
  vastuvõetud sõnumid osapoolte olekut mõjutavad;

- osapoolte olek saab muutuda vaid sõnumivahetuse kaudu, sh võivad sõnumeid
  saata ka kolmandad süsteemid (tugiregistrid jms), kui see vajalik on. Selline
  sõnumivahetus peab selgelt tähistatud olema;

- osapooled saavad lõppkasutajale näidata vaid varasemalt olemas olnud või
  sõnumivahetuse kaudu tulnud andmeid, üksteise olekut sõnumivahetuse-väliselt
  lugeda ei saa.

Demonstreeritavuseks:

- peab saama jälgida osapoolte andmevahetust;

- peab saama demonstreerida töötavat visandit Nõusolekuteenuse lõppkasutaja
  (andmesubjekti) kasutajaliidesest. Täpsemalt, peab saama näidata
  nõusolekuteenuse protokollis kirjeldatud funktsioonidega nagu nõusolekute
  andmine, tagasivõtmine, kasutusajalugu seotud osi. Nõusolekuteenuse
  kasutajaliides on veebiliides, näidata peab saama veebiliidest;

- süsteemi olekut peab saama mugavalt lähtestada (nt alustades uut
  demonstreerimis-seanssi), eelmise demonstreerimiste käigus tekkinud olekud ei
  tohi demonstreerimist segada.

Mittefunktsionaalsed nõuded:

- prototüüp peab võimaluse korral olema tõlgitav kuid kindlasti peab sellest
  olema eestikeelne versioon.

- prototüüp peab vastama RIA mittefunktsionaalsetele nõuetele
  \[[3](#ref_riamfn)], välja arvatud kõrgkäideldavus.

- prototüüp peab olema kättesaadav avalikust veebist. Võimaluse korral peab ka
  prototüübi lähtekood olema avalik.

- päris autentimine (TARAga \[[4](#ref_tara)]), nõusolekute tegelik digitaalne
  allkirjastamine jms detailid võivad jääda mõnda jätkuprojekti, selles
  projektis ei tegeleta päris isikuandmetega ega ka nende tegeliku kaitsmisega
  vaid alles võimalike kaitsmismehhanismide prototüüpimisega.

- Nõusolekuteenuse lõppkasuajale suunatud kasutajaliides peab (võimalusel
  korral) olema kujundatud arvestades Veera \[[2](#ref_veera)] põhimõtteid ja
  visuaale. 

# Lahenduse kirjeldus

Arvestades, et prototüüp ei pea tegelikult ühegi välise süsteemiga suhtlema, on
prototüüp lahendatud ühe-lehe rakendusena (_Single-Page Application, SPA_).

Rakenduse sees on defineeritud vahendid sõltumatute protsesside ning
nendevahelise andmevahetuse kirjeldamiseks. Rakendus pakub raamistikku, mis
kuvab üldise sõnumilogi ning võimaldab protsessidel kuvada oma kohalikku
kasutajaliidest/vaadet olekule koos oleku muutmist (st sõnumite saatmist)
võimaldavate nuppudega.

Kuna üldine raamistik pigem piirab spetsiifiliste kasutajaliideseprototüüpide
ehitamist, siis pakub prototüüp brauserisisest liidest, mis võimaldab igale
protsessile avada alternatiivselt aadressilt laetava kasutajaliidese teostuse.
Selline alternatiivne kasutajaliides saab enda kätte terve brauseriakna
(renderduskonteksti) ning saab selles suures osas tegutseda "nagu tavaline
rakendus". 

## 5. Raamistiku komponendid
<a id="markdown-5-raamistiku-komponendid" name="5-raamistiku-komponendid"></a>

Kogu rakendus on **"teater"**, millel on 1 või rohkem sõltumatut "lava". 

**Lava** vastab jämedalt demostsenaariumile. Laval on hulk protsesse, mis
omavahel suhtlevad ning protsessidevahelise suhtluse logi. Prototüübi põhivaade
on mingi konkreetse lava vaade valikulise võimalusega lava vahetada.

**Protsessil** on aadress, olek ja teostus. Aadressi ja algoleku defineerib
"lava" oma algoleku kaudu või hiljem, sõnumi alusel protsessi luues. Edaspidised
olekumuutused toimuvad reaktsioonina sõnumitele kusjuures konkreetsed muutused
(toetatud sõnumid ja nende töötlemise viisi) defineerib teostus. Teostuse osa on
ka protsessi väljanägemine "lavavaates".

**Alternatiivne kasutajaliides** on kasutajaliides, mis avaneb uues aknas kuid
kasutab "andmebaasi" või "tagasüsteemina" (_backend_) põhirakendust.
Alternatiivne kasutajaliides näeb brauseri-sisese sõnumi kaudu ainult loetavat
vaadet protsessi olekust ning saab seda muuta saates sõnumeid iseendale
(protsessile, mille kasutajaliideseks ta on). 

Raamistik pakub mehhanismina ka kasutajaliidese tõlkimise tuge.

## 6. Protsessid prototüüprakenduses
<a id="markdown-6-protsessid-prototüüprakenduses" name="6-protsessid-prototüüprakenduses"></a>

Eelmine jaotis kirjeldas rakenduse üldist raamistikku. Prototüübi jaoks on
protsessidena teostatud konkreetseid protokolli osapooled. Järgnev kirjeldab
osapooli üldiselt ja prototüübi kontekstis.

### 6.1. Teenusepakkuja infosüsteem
<a id="markdown-61-teenusepakkuja-infosüsteem" name="61-teenusepakkuja-infosüsteem"></a>

Andmeteenust pakkuv osapool. Teenusepakkuja infosüsteem on andmebaas isikustatud
kirjetest (identifikaator, subjekti identifikaator, andmete tüüp ja väärtus).
Teenusepakkuja infosüsteemis on defineeritud andmeteenused, mida identifitseerib
teenuse nimi ja tagastatavate andmete tüüp (tüübid). Teenusepakkuja infosüsteem
oskab töödelda teenuse osutamise päringut. Päringu parameetrid on teenuse nimi
ja andmesubjekti identifikaator. Teenuse väljundiks on kõik subjekti kohta
käivad sobiva tüübiga andmebaasi read või veateade.

Nõusolekuteenuse kontekstis on iga teenusega seotud ka teenusedeklaratsiooni
identifikaator(id) ja nõusolekuteenuse aadress. Teenusepakkuja infosüsteem
eeldab, et klient edastab lisaks teenuse nimele ja subjekti identifikaatorile
nõusolekuteenuse protokollis kirjeldatud parameetrid (nõusolekuviide ja
päringuviide) ning kontrollib nende abil nõusolekuteenusest nõusoleku olemasolu
ja teenusekohasust.

Teenusepakkuja infosüsteemil ei ole muud kasutajaliidest kui "lavavaade", sest
protokolli kontekstis ei ole oluline andmesubjekti suhtlus teenusepakkujaga.
Teenusepakkuja infosüsteemi lavavaate oluline osa on teenusedeklaratsioonide
kirjeldamise hüpikaken. 

### 6.2. Klientrakendus
<a id="markdown-62-klientrakendus" name="62-klientrakendus"></a>

Andmeteenust kasutav osapool. Klientrakenduse olekul on erinevad osad:
kasutajaliidese olek ja "andmebaas". Kasutajaliidese olek haldab teadmist
sisselogitud kasutajast ja kasutajaga suhtlemisel salvestatud andmeid (kasutaja
"seanssi"). "Andmebaas" sisaldab klientrakenduse konfiguratsiooni, sh
"klientrakenduse teenuste" (protokolli kontekstis: eesmärkide) kirjeldusi.
Klientrakenduse teenuse sisu on üks või rohkem päringut andmeteenustele (samas
või erinevates teenusepakkujate infosüsteemides, iga kohta on teada teenust
pakkuva süsteemi aadress ning teenuse nimi selles süsteemis).

Klientrakendusel on "lõppkasutaja vaade", mis avaneb hüpik-aknana "lavavaates".
Lõppkasutaja vaade võimaldab kasutajal "sisse logida" ning sisseloginud
kasutajal valida teenuse, nõusoleku puudumisel käivitada nõusoleku andmise ja
hiljem käivitada andmeteenuse. 

"Lavavaates" näitab klientrakendus ülevaadet oma olekust (sh kas või milline
kasutaja on autenditud) ja sõltuvalt olekust pakub võimalust oleku muutmiseks.

Kui klientrakenduses on sisselogitud kasutaja, siis on näha selle kasutaja
nõusolekuviidete hetkeseis iga defineeritud klientrakenduse teenuse kohta.
Saab käivitada teenuse andmepäringu (päringu kõigi kliendi-teenusega seotud
teenusepakkuja-teenuste suunas) ning küsida, kontrollida ja unustada
nõusolekuviite. Nõusolekuviite saab ka käsitsi sisestada.

Klientrakenduse lavavaate osa on ka eesmärgideklaratsioonide kirjeldamise
hüpikaken. 

### 6.3. Nõusolekuteenus
<a id="markdown-63-nõusolekuteenus" name="63-nõusolekuteenus"></a>

Protsess, mis teostab nõusolekuteenuse. Prototüübi kontekstis on
nõusolekuteenuse teostusel kaks suuremat osa: sõnumite töötlemise algoritmid
ja alternatiivne kasutajaliides, mis visandab nõusolekuteenuse võimaliku
kasutajaliidese protokolli mõttes olulistes osades võimalikult tõetruult. 
Sellest tulenevalt jaguneb ka nõusolekuteenuse olek analoogselt
klientrakendusega kaheks -- kasutajaliidese osa ja tegelik "andmebaas". 

Nõusolekuteenuse lavavaates on näha statistika nõusolekuteenuse hetkeoleku kohta
(sh deklaratsioonide ja nõusolekute arvud). Lavavaatest saab alati avada ka
lõppkasutajavaate. 

Lõppkasutaja vaade sisaldab kasutaja autentimist ning seejärel vaateid kasutaja
nõusolekute haldamiseks. Nõusoleku küsimine klientrakenduse poolt jäetakse
meelde avatud nõusolekutaotlusena. Seni antud nõusolekuid on võimalik vaadata
ning tagasi võtta. Tagasivõetud (või aegunud) nõusolekuid on võimalik vaadata.
Nõusolekute kasutamisajalugu on võimalik vaadata.

# Lahendus, mehhanismid

Rakendus on ehitatud kasutades raamistikke React\[[5](#ref_react)] ja Redux
\[[6](#ref_redux)]. See on kombinatsioon, kus kogu veebirakenduse loogilist
olekut hallatakse ühes suures serialiseeritavas objektis, mida muudetakse
sõnumitega. See võimaldab kujutada protsesside olekuid osana kogu rakenduse
olekust ning vajadusel täiendada rakendust "ajamasinate" ning mugava varasemate
olekute taastamisega (undo) rakenduse olekuobjekti (olekupuu) sobivates osades. 

Sõnumid protsesside vahel on React/Redux raamistike tasemel üks spetsiifiline
sõnumitüüp, mille töötlemine delegeeritakse "protsessidele". Iga konkreetse
protsessiga on seotud "teostus" -- nimi ja selle kaudu registreeritud
sõnumitöötlemise funktsioonid. Nii nagu kogu raamistiku Redux ulatuses, käib ka
protsesside sõnumite töötlemine redutseerimisfunktsioonidega --
(kõrvalefektideta!) funktsioonides, mis saavad sisendiks varasema oleku ja
sõnumi ning mis tagastavad deterministlikult uue oleku. Protsesside
redutseerimisfunktsioonid saavad sisendiks ("näevad" ja saavad kasutada) ainult
konkreetse protsessi kohta käivat alamosa kogu olekust. 

Ka protsesside kasutajaliidestes tehtud tegevused kujutuvad süsteemis sõnumitena
(protsessidelt neile endile). 

Sage vajadus sisendsõnumite töötlemisel on vastussõnumite saatmine. Kuna ainus
väljund sõnumitöötlusest on (protsessi) uus olek, siis on oleku osa ka
"väljundjärjekord", kuhu iga töötlev funktsioon saab sõnumeid lisada.
Väljundjärjekordade töötlemine toimub välise reaktsioonina kogu rakenduse
olekumuutusele -- eraldi kuulav funktsioon kogub kokku kõik väljundjärjekordades
olevad sõnumid ning saadab Reduxi sõnumitena väljundjärjekordade tühjendamise
sõnumid ning seejärel ka järjekordades olnud sõnumid ise. 

Iga uue (protsessidevahelise) sõnumi saatmisel pannakse (välisest
saatmismehhanismist) sõnumiparameetritena kaasa ka hetkeaeg (sekundi täpsusega)
ja juhuslik arv. See võimaldab sõnumeid töödelda täiesti deterministlikult. 


Rakenduse kood on suuremas osas kirjutatud kasutades TypeScript'i, mis on
staatilist tüübikontrolli võimaldav laiendus JavaScriptile. 

## 7. "Välised registrid"
<a id="markdown-7-välised-registrid" name="7-välised-registrid"></a>

Rakendus ei suhtle tegelikult väliste osapooltega. Siiski on nii
klientrakenduses kui nõusolekuteenuse lõppkasutajavaates elemente, kus
reaalselähedase kogemuse jaoks on vaja asendada identifikaatorid nimedega,
näiteks isikukoodi asemel näidata nime või äriregistri koodi asemel näidata
ärinime, kontakte vms. Sellised kohad on lahendatud kasutades funktsioone, mis
otsivad konkreetse nime jaoks vastet tõlkemehhanismi kaudu või vaste puudumisel
tagastavad etteantud formaadis sõne, kus sisaldub ka algne identifikaator. See
võimaldab konkreetses demostsenaariumis kasutatavate identifikaatorite jaoks
defineerida sobilikud vasted kuid lubab siiski ka prototüübiga "mängida" ja
kasutada alternatiivseid, stsenaariumites mitte kirjeldatud identifikaatoreid.

## 8. Tõlkemehhanism
<a id="markdown-8-tõlkemehhanism" name="8-tõlkemehhanism"></a>

Tõlkimiseks on kasutusel mitmekihiline mehhanism. Kõige alumine kiht on teek
`i18next`, mis tegeleb tõlkefailide laadimise ja tõlkevõtmete lahendamisega. 
Lisaks on kasutusel pealisehitus, mis otsib tõlkevõtit koos mitme erineva
prefiksiga, mis võimaldab vajadusel defineerida samale teostusele erinevat
väljanägemist, nimesid ja tõlkeid sõltuvalt protsessinimest, lava nimest ja
teostuse nimest. 

Praktiliselt on tõlked kirjeldatud staatilistes JSON-failides, mis laetakse
rakenduse esimesel laadimisel. 

Rakendus püüab automaatselt tuvastada kasutaja keele kasutades selleks brauseris
defineeritud keele-eelistusi. Tuvastatud (või kasutaja poolt ümber valitud)
keele-eelistus jäetakse meelde kohalikus hoidlas (_localstorage_). 

Vaikekeel on eesti keel. Ka puuduvaid tõlkeid otsitakse eesti tõlgete hulgast. 

## 9. Alternatiivsed kasutajaliidesed
<a id="markdown-9-alternatiivsed-kasutajaliidesed" name="9-alternatiivsed-kasutajaliidesed"></a>

Alternatiivsed kasutajaliidesed avatakse samas brauseris kuid teises
sakis/aknas. Suhtlus rakenduse põhiakna ja alternatiivse kasutajaliidese vahel
toimub kasutades brauseri `postMessage` \[[7](#ref_postmessage)] liidest.
Alternatiivne kasutajaliides on seotud konkreetse protsessiga. Alati kui selle
protsessi olek muutub, saadetakse alternatiivse kasutajaliidese (registreeritud)
aknale sõnum vaatega kogu protsessi olekust. Alternatiivne kasutajaliides saab
vastata sõnumiga oma peremees-protsessile (st ta saab määrata sõnumi tüübi ja
parameetrid kuid ei saa määrata sihtprotsesse). 

Rakendus avab alternatiivse kasutajaliidese alati aknasse, mille nimi
(`window.name`) on moodustatud lavanimest ja protsessi nimest (aadressist).
Nende abil saab alternatiivne kasutajaliides end automaatselt registreerida ka
siis, kui kummagi saki/akna sisu uuesti laetakse ja side katkeb. 

Alternatiivse kasutajaliidese saab laadida ka põhirakendusest täiesti erinevalt
aadressilt ja selle ehitamiseks saab kasutada täiesti sõltumatuid vahendeid --
kuni andmete saamiseks ja protsessi oleku muutmiseks kasutatakse `postMessage`
liidest. 

Nõusolekuteenuse prototüübis on ainus alternatiivne kasutajaliides
(nõusolekuteenuse kasutajaliides) ehitatud põhirakenduse osana. Rakendus
kontrollib aadressi, millelt ta laetakse ja teatud mustrite korral käivitatakse
põhirakenduse asemel alternatiivne kasutajaliides.

## 10. Juhuslikult genereeritud identifikaatorid
<a id="markdown-10-juhuslikult-genereeritud-identifikaatorid" name="10-juhuslikult-genereeritud-identifikaatorid"></a>

Mitmes kohas protokollis kasutatakse juhuslikult genereeritud identifikaatoreid
või sõnumilühendeid (_hash_). Parema loetavuse ja ka käsitsi sisestamise
võimaldamiseks on sellised stringid lõigatud lühikeseks (6 märki). Päris
teostuses peab nende pikkus arvestama turvanõuetega.


# Teostus

Põhiosas on tegu tööriista `create-react-app` abil tekitatud rakendusepõhjaga.

Sh, on võimalik kohalikus arvutis käivitada react'i arendusserver:

```sh
./gradlew npm_start
```

Alternatiivsete kasutajaliideste toimimiseks staatilises veebiserveris tekitab
ehitusskript (`build.gradle`) alamkataloogidesse `build/ui/*` koopiad failist
`index.html` ning asendab neis kohandatud stiililehtede toimiseks CSS-viited.

Ehitamiseks sobib käsk

```sh
./gradlew build
```

Eduka ehituse tulemus tekib kataloogi `build`.

Failipuu ehitamisel on püütud jälgida, et konkreetsete nõusolekuteenuse
protokolli teostavate protsesside teostus oleks failipuu mõttes ühes kohas
(kataloogid `src/process/*/`) ning samas on iga konkreetse protsessi komponendid
jagatud kataloogi sees temaatilistesse failidesse.

Nõusolekuteenuse alternatiivse kasutajaliidese teostus asub kataloogis
`src/process/consentService/altUI`, välja arvatud kirjeldused rakenduse
marsruuteris ning stiililehed ja nendest viidatud ressursid.

## 11. Tõlked
<a id="markdown-11-tõlked" name="11-tõlked"></a>

Tõlkimiseks kasutatakse teeki `i18next` ja selle Reacti liidestust. Tõlkefailid
asuvad failides `public/locales/*/translation.json`, kus tärni asemel on
ISO 639 kahemärgiline keelekood (et, en jne). Lubatud keelte loend on failis
`src/i18n.ts` ja fikseeritakse rakenduse kompileerimise ajal. Seal samas on
kirjas eelistatud keel, mille tõlkeid kasutatakse siis, kui aktiivses keeles
vastavat tõlget pole. 

Tõlkefailid on JSON failid (kui need pole korrektsed, siis tõlgete laadimine
nurjub). 

"Tugiregistrid" on soovitav kirjeldada ühes, eelistatult vaikekeeles. 

## 12. Konfiguratsioon
<a id="markdown-12-konfiguratsioon" name="12-konfiguratsioon"></a>

Konkreetsete lavade algkonfiguratsiooni kirjeldus algab failist
`src/config.tsx`. Esialgne demo-andmestik ja vastav lava on kirjeldatud failis
`src/config/demo.tsx`   

# Teadaolevad probleemid

- Protsesside-vahelised importimised (tavaliselt vajalikud jagatud
  andmestruktuuride või sõnumite moodustamisel tüübikontrolli pakkuvate
  meetodite taaskasutamiseks) saaks ja peaks olema selgemalt kapseldatud.
  
- Sõnumitöötlemise meetodid saaks ja peaks olema paremini kommenteeritud.

- Sõnumivahetus on asünkroonne, paaris kohas on vajadusepõhiselt sünkroonsust
  emuleeritud kasutades päringuidentifikaatoreid. Seda võiks pakkuda raamistik.

- Leiduvad mittetõlgitavad stringid.

- Praegune klientrakendus ei oska kommunikeerida kasutatava nõusolekuteenuse
  identifikaatorit/nime ega ei saa seda ka eesmärgi järgi konfigureerida.

