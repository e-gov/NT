import { fullname } from "../i18n"

// example HL7 messages as JSON

function firstname(id: string): string {
  return fullname(id).split(' ')[0];
}

function lastname(id: string): string {
  let fn = fullname(id);
  return fn.substring(fn.split(' ')[0].length + 1);
}

function id(root: string, ext: string) {
  return {
    "@root": root,
    "@extension": ext
  }
}

export function diagnosisFor(patient: string) {
  return {
    "templateId": id("1.3.6.1.4.1.28284.6.1.1", "1.3.6.1.4.1.28284.6.1.1.37.3"),
    "id": id("1.3.6.1.4.1.28284.6.2.4.14", "EHR.3570338"),
    "creationTime": { "@value": "20191127131137" },
    "versionCode": { "@code": "V3-2007-09" },
    "interactionId": id("2.16.840.1.113883", "RCMR_IN000030UV01"),
    "processingCode": { "@code": "P" },
    "processingModeCode": { "@code": "T" },
    "acceptAckCode": { "@code": "NE" },
    "receiver": {
      "@typeCode": "RCV",
      "device": {
        "@classCode": "DEV",
        "@determinerCode": "INSTANCE",
        "id": id("1.3.6.1.4.1.28284.8.7.2.5", "Tallinn")
      }
    },
    "sender": {
      "@typeCode": "SND",
      "device": {
        "@classCode": "DEV",
        "@determinerCode": "INSTANCE",
        "id": id("1.3.6.1.4.1.28284.6.2.2.18.2", "TL")
      }
    },
    "acknowledgement": {
      "typeCode": { "@code": "AA" },
      "targetMessage": { "id": id("1.3.6.1.4.1.28284.8.7", "1.3.6.1.4.1.28284.8.7_637104570979090003") }
    },
    "controlActProcess": {
      "@moodCode": "EVN",
      "@type": "ext:RCMR_IN000030UV01_Extension.ControlActProcess",
      "@HL7-Domain": "QUQI_DM000000UV",
      "@realmCode": "EE",
      "subject": {
        "clinicalDocument": {
          "@type": "ext:RCMR_MT000001UV_Extension.ClinicalDocument",
          "templateId": id("1.3.6.1.4.1.28284.6.1.1", "1.3.6.1.4.1.28284.6.1.1.5.8"),
          "id": id("1.3.6.1.4.1.28284.8.7.2.2.3", "11356823.S140.1"),
          "code": {
            "@code": "2",
            "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.3.1",
            "@codeSystemName": "Dokumendi tüüp",
            "@displayName": "Ambulatoorne epikriis"
          },
          "statusCode": { "@code": "completed" },
          "effectiveTime": { "@value": "20191127131059" },
          "confidentialityCode": {
            "@code": "N",
            "@codeSystem": "2.16.840.1.113883.5.25",
            "@codeSystemName": "Konfidentsiaalsus",
            "@displayName": "avatud",
            "translation": [
              {
                "@code": "N",
                "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.39.1",
                "@codeSystemName": "Konfidentsiaalsus arstile",
                "@displayName": "avatud"
              },
              {
                "@code": "N",
                "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.37.1",
                "@codeSystemName": "Konfidentsiaalsus eestkostjale",
                "@displayName": "avatud"
              }
            ]
          },
          "languageCode": { "@code": "EST" },
          "setId": id("1.3.6.1.4.1.28284.8.7.2.1", "140.1"),
          "versionNumber": { "@value": "1" },
          "recordTarget": {
            "@typeCode": "RCT",
            "realmCode": { "@code": "PAT" },
            "patient": {
              "@classCode": "PAT",
              "id": id("1.3.6.1.4.1.28284.6.2.2.16.1", patient),
              "statusCode": { "@code": "A" },
              "patientPerson": {
                "@classCode": "PSN",
                "name": {
                  "given": firstname(patient),
                  "family": lastname(patient)
                }
              }
            }
          },
          "author": {
            "@typeCode": "AUT",
            "time": { "@value": "20191127131059" },
            "assignedAuthor": {
              "@classCode": "ASSIGNED",
              "@type": "ext:RCMR_MT000001UV_Extension.COCT_MT090000UV.AssignedEntity",
              "id": id("1.3.6.1.4.1.28284.6.2.4.9", "D04220"),
              "code": {
                "@code": "DOCTOR",
                "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.15.1",
                "@codeSystemName": "Tervishoiutöötaja tüüp",
                "@displayName": "arst"
              },
              "assignedPerson": {
                "@classCode": "PSN",
                "@determinerCode": "INSTANCE",
                "name": {
                  "given": firstname(patient),
                  "family": lastname(patient)
                }
              },
              "asLicencedEntity": {
                "id": {
                  "@root": "1.3.6.1.4.1.28284.6.2.1.4.2",
                  "@extension": "E420",
                  "@assigningAuthorityName": "üldkirurgia"
                }
              }
            }
          },
          "componentOf": {
            "encompassingEncounter": {
              "@classCode": "ENC",
              "@moodCode": "EVN",
              "id": id("1.3.6.1.4.1.28284.8.7.2.1", "140.1"),
              "code": {
                "@code": "AMB",
                "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.5.1",
                "@codeSystemName": "Haigusjuhtumi tüüp",
                "@displayName": "Ambulatoorne haigusjuht"
              },
              "effectiveTime": {
                "low": { "@value": "20191127131033" },
                "high": { "@value": "20191127131033" }
              }
            }
          },
          "sourceOf": {
            "@typeCode": "XCERPT",
            "observation": {
              "@classCode": "OBS",
              "@moodCode": "EVN",
              "code": {
                "@code": "DGN",
                "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.5.1",
                "@codeSystemName": "Observation liik",
                "@displayName": "Diagnoos"
              },
              "statusCode": { "@code": "completed" },
              "value": {
                "@code": "F02.2",
                "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.13.3",
                "@codeSystemName": "RHK-10",
                "@displayName": "Dementsus Huntingtoni tõvest",
                "@type": "CD",
                "originalText": null,
                "qualifier": {
                  "value": {
                    "@code": "1",
                    "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.1.2",
                    "@codeSystemName": "Diagnoosi statistiline liik",
                    "@displayName": "esmajuhtum"
                  }
                }
              },
              "interpretationCode": {
                "@code": "MAIN",
                "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.2.1",
                "@codeSystemName": "Diagnoosi liik",
                "@displayName": "Põhihaigus"
              }
            }
          }
        }
      },
      "queryAck": {
        "queryId": id("1.3.6.1.4.1.28284.8.7.2.7", "1.3.6.1.4.1.28284.8.7_637104570979090003"),
        "queryResponseCode": { "@code": "OK" },
        "resultTotalQuantity": { "@value": "1" }
      },
      "queryByParameter": {
        "@type": "ext:RCMR_MT000003UV_Extension.QueryByParameter",
        "@HL7-Domain": "RCMR_RM000000",
        "@realmCode": "EE",
        "queryId": id("1.3.6.1.4.1.28284.8.7.2.7", "1.3.6.1.4.1.28284.8.7_637104570979090003"),
        "patient.id": { "value": id("1.3.6.1.4.1.28284.6.2.2.16.1", patient) },
        "serviceEvent.code": {
          "value": {
            "@code": "diagnosis",
            "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.32.2"
          }
        },
        "observation.effectiveTime": {
          "value": {
            "low": { "@value": "20161127000000" },
            "high": { "@value": "20191128235959" }
          }
        }
      }
    }
  }
}

export function studyFor(patient: string) {
  return {
    "templateId": id("1.3.6.1.4.1.28284.6.1.1", "1.3.6.1.4.1.28284.6.1.1.40.9"),
    "id": id("1.3.6.1.4.1.28284.6.2.4.14", "EHR.3572157"),
    "creationTime": { "@value": "20191129133942" },
    "versionCode": { "@code": "V3-2007-09" },
    "interactionId": id("2.16.840.1.113883", "RCMR_IN000030UV01"),
    "processingCode": { "@code": "P" },
    "processingModeCode": { "@code": "T" },
    "acceptAckCode": { "@code": "NE" },
    "receiver": {
      "@typeCode": "RCV",
      "device": {
        "@classCode": "DEV",
        "@determinerCode": "INSTANCE",
        "id": { "@root": "1.3.6.1.4.1.28284.1.26.2.5" }
      }
    },
    "sender": {
      "@typeCode": "SND",
      "device": {
        "@classCode": "DEV",
        "@determinerCode": "INSTANCE",
        "id": id("1.3.6.1.4.1.28284.6.2.2.18.2", "TL")
      }
    },
    "acknowledgement": {
      "typeCode": { "@code": "AA" },
      "targetMessage": { "id": id("1.3.6.1.4.1.28284.1.26.2.7", "SonumID") }
    },
    "controlActProcess": {
      "@moodCode": "EVN",
      "@type": "ext:RCMR_IN000030UV01_Extension.ControlActProcess",
      "@HL7-Domain": "QUQI_DM000000UV",
      "@realmCode": "EE",
      "subject": [
        {
          "clinicalDocument": {
            "@type": "ext:RCMR_MT000001UV_Extension.ClinicalDocument",
            "templateId": id("1.3.6.1.4.1.28284.6.1.1", "1.3.6.1.4.1.28284.6.1.1.64.8"),
            "id": id("1.3.6.1.4.1.3516.13.1.2.3.1.3", "1866393"),
            "code": {
              "@code": "64",
              "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.3.9",
              "@codeSystemName": "Dokumendi tüüp",
              "@displayName": "saatekirja vastus"
            },
            "statusCode": { "@code": "completed" },
            "effectiveTime": { "@value": "20191129130504" },
            "confidentialityCode": {
              "@code": "N",
              "@codeSystem": "2.16.840.1.113883.5.25",
              "@codeSystemName": "Konfidentsiaalsus",
              "@displayName": "avatud"
            },
            "languageCode": { "@code": "EST" },
            "setId": id("1.3.6.1.4.1.29907.1.1.6.11", "107233297"),
            "versionNumber": { "@value": "1" },
            "recordTarget": {
              "@typeCode": "RCT",
              "patient": {
                "@classCode": "PAT",
                "id": id("1.3.6.1.4.1.28284.6.2.2.1", patient),
                "statusCode": { "@code": "A" },
                "patientPerson": {
                  "name": {
                    "given": firstname(patient),
                    "family": lastname(patient)
                  }
                }
              }
            },
            "author": {
              "@typeCode": "AUT",
              "time": { "@value": "20191129130504" },
              "assignedAuthor": {
                "@classCode": "ASSIGNED",
                "@type": "ext:RCMR_MT000001UV_Extension.COCT_MT090000UV.AssignedEntity",
                "id": { "@nullFlavor": "NI" },
                "representedOrganization": {
                  "@classCode": "ORG",
                  "@determinerCode": "INSTANCE",
                  "id": id("1.3.6.1.4.1.28284.4", "10822068"),
                  "name": "AS Ida-Tallinna Keskhaigla",
                  "addr": {
                    "@use": "PHYS",
                    "country": "EST",
                    "county": "Harju maakond",
                    "city": "Tallinn",
                    "streetName": "Ravi",
                    "houseNumber": "18",
                    "unitID": "0298",
                    "postalCode": "10138",
                    "unitType": "EHAK"
                  }
                }
              }
            },
            "custodian": {
              "@typeCode": "CST",
              "assignedCustodian": {
                "representedOrganization": {
                  "id": id("1.3.6.1.4.1.28284.4", "10822068"),
                  "name": "AS Ida-Tallinna Keskhaigla"
                }
              }
            },
            "componentOf": {
              "encompassingEncounter": {
                "@classCode": "ENC",
                "@moodCode": "EVN",
                "id": id("1.3.6.1.4.1.29907.1.1.6.11", "107233297"),
                "effectiveTime": { "@nullFlavor": "NI" }
              }
            },
            "sourceOf": {
              "@typeCode": "XCERPT",
              "procedure": {
                "@classCode": "PROC",
                "@moodCode": "EVN",
                "code": {
                  "@code": "3414-0",
                  "@codeSystem": "2.16.840.1.113883.6.1",
                  "@codeSystemName": "ELMÜ LOINC koodistik",
                  "@displayName": "Buprenorfiin uriinis"
                },
                "statusCode": { "@code": "completed" },
                "effectiveTime": { "@value": "20191129130504" },
                "specimen": {
                  "id": id("Barcode", "IP0041250068"),
                  "specimenNatural": {
                    "code": {
                      "@code": "U",
                      "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.244.5",
                      "@codeSystemName": "ELMÜ proovimaterjali tüüp",
                      "@displayName": "Uriin"
                    }
                  },
                  "participation1": {
                    "process": {
                      "@moodCode": "EVN",
                      "effectiveTime": { "@value": "20191129125700" }
                    }
                  }
                },
                "sourceOf2": [
                  {
                    "@typeCode": "COMP",
                    "observation": {
                      "@classCode": "OBS",
                      "@moodCode": "EVN",
                      "id": id("1.3.6.1.4.1.3516.13.1.2.3.1.5", "30591836"),
                      "code": {
                        "@code": "ANA",
                        "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.5.1",
                        "@codeSystemName": "Observation liik",
                        "@displayName": "Analüüs"
                      },
                      "value": {
                        "@type": "CD",
                        "@code": "N",
                        "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.266.3",
                        "@codeSystemName": "Kvalitatiivse uuringu vastus",
                        "@displayName": "negatiivne"
                      },
                      "interpretationCode": {
                        "@code": "N",
                        "originalText": null
                      },
                      "referenceRange": {
                        "@typeCode": "REFV",
                        "observationRange": {
                          "value": {
                            "@type": "ED",
                            "#text": "negatiivne"
                          },
                          "interpretationCode": { "@code": "N" }
                        }
                      }
                    }
                  },
                  {
                    "@typeCode": "COMP",
                    "procedure": {
                      "@classCode": "PROC",
                      "@moodCode": "EVN",
                      "code": {
                        "@code": "L-4888",
                        "@codeSystem": "2.16.840.1.113883.6.1",
                        "@codeSystemName": "ELMÜ LOINC koodistik",
                        "@displayName": "Nõusolek lisauuringuks"
                      },
                      "statusCode": { "@code": "completed" },
                      "specimen": {
                        "id": id("Barcode", "IP0041250068"),
                        "specimenNatural": {
                          "code": {
                            "@code": "U",
                            "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.244.5",
                            "@codeSystemName": "ELMÜ proovimaterjali tüüp",
                            "@displayName": "Uriin"
                          }
                        },
                        "participation1": {
                          "process": {
                            "@moodCode": "EVN",
                            "effectiveTime": { "@value": "20191129125700" }
                          }
                        }
                      },
                      "sourceOf2": {
                        "@typeCode": "COMP",
                        "observation": {
                          "@classCode": "OBS",
                          "@moodCode": "EVN",
                          "id": id("1.3.6.1.4.1.3516.13.1.2.3.1.5", "30591834"),
                          "code": {
                            "@code": "ANA",
                            "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.5.1",
                            "@codeSystemName": "Observation liik",
                            "@displayName": "Analüüs"
                          },
                          "value": {
                            "@type": "ED",
                            "#text": "JAH"
                          },
                          "interpretationCode": {
                            "@code": "N",
                            "originalText": null
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      ],
      "queryAck": {
        "queryId": id("1.3.6.1.4.1.28284.1.26.2.8", "ParinguID"),
        "queryResponseCode": { "@code": "OK" },
        "resultTotalQuantity": { "@value": "283" }
      },
      "queryByParameter": {
        "@type": "ext:RCMR_MT000003UV_Extension.QueryByParameter",
        "@HL7-Domain": "RCMR_RM000000",
        "@realmCode": "EE",
        "queryId": id("1.3.6.1.4.1.28284.1.26.2.8", "ParinguID"),
        "patient.id": { "value": id("1.3.6.1.4.1.28284.6.2.2.1", patient) },
        "serviceEvent.code": {
          "value": {
            "@code": "procedures",
            "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.32.10"
          }
        },
        "procedure.effectiveTime": {
          "value": {
            "low": { "@value": "20190101" },
            "high": { "@value": "20191129" }
          }
        }
      },
      "queryContinuation": {
        "startResultNumber": { "@value": "1" },
        "continuationQuantity": { "@value": "15" },
        "statusCode": { "@code": "deliveredResponse" }
      }
    }
  }
}

export function immunizationFor(patient: string) {
  return {
    "typeId": id("2.16.840.1.113883.1.3", "POCD_HD000040"),
    "templateId": id("1.3.6.1.4.1.28284.6.1.1", "1.3.6.1.4.1.28284.6.1.1.281.1"),
    "id": id("1.3.6.1.4.1.28284.6.2.4.96", "db923307-d53c-4c07-bab3-144afa974d1c"),
    "code": {
      "@code": "83",
      "@codeSystem": "1.3.6.1.4.1.28284.6.2.1.3.5",
      "@codeSystemName": "Dokumendi tüüp",
      "@displayName": "Immuniseerimispass"
    },
    "title": "Immuniseerimispass",
    "effectiveTime": { "@value": "20191126134144" },
    "confidentialityCode": {
      "@code": "N",
      "@codeSystem": "2.16.840.1.113883.5.25",
      "@codeSystemName": "Konfidentsiaalsus",
      "@displayName": "avatud"
    },
    "languageCode": { "@code": "EST" },
    "versionNumber": { "@value": "1" },
    "recordTarget": {
      "@typeCode": "RCT",
      "realmCode": { "@code": "PAT" },
      "patientRole": {
        "@classCode": "PAT",
        "id": id("1.3.6.1.4.1.28284.6.2.2.1", patient),
        "patient": {
          "@classCode": "PSN",
          "@determinerCode": "INSTANCE",
          "name": {
            "given": firstname(patient),
            "family": lastname(patient)
          }
        }
      }
    },
    "author": {
      "@typeCode": "AUT",
      "time": { "@value": "20191126134144" },
      "assignedAuthor": {
        "@classCode": "ASSIGNED",
        "id": id("1.3.6.1.4.1.28284.6.2.4.32", "DL"),
        "representedOrganization": {
          "@classCode": "ORG",
          "@determinerCode": "INSTANCE",
          "id": id("1.3.6.1.4.1.28284.6.2.4.32", "DL"),
          "name": "Tervise ja Heaolu Infosüsteemide Keskus"
        }
      }
    },
    "custodian": {
      "@typeCode": "CST",
      "assignedCustodian": {
        "representedCustodianOrganization": {
          "id": id("1.3.6.1.4.1.28284.6.2.4.32", "DL"),
          "name": "Tervise infosüsteem"
        }
      }
    },
    "component": {
      "@typeCode": "COMP",
      "structuredBody": {
        "@classCode": "DOCBODY",
        "@moodCode": "EVN",
        "component": {
          "@typeCode": "COMP",
          "section": {
            "@classCode": "DOCSECT",
            "@moodCode": "EVN",
            "code": {
              "@code": "IMM",
              "@codeSystem": "1.3.6.1.4.1.28284.6.2.2.11.6",
              "@codeSystemName": "Sektsiooni kodeering",
              "@displayName": "Immuniseerimine"
            },
            "title": "Immuniseerimine",
            "text": {
              "paragraph": [
                {
                  "content": {
                    "Immuniseerimine": "01.08.2008",
                    "Mille vastu": "Tuberkuloos",
                    "Vaktsiin": "",
                    "Partii": "ABS&<32413",
                    "ATC": "J07AN01, BCG VACCINE SSI",
                    "Annus": "400 mg",
                    "Annuse kordsus": "",
                    "Immuniseerija": "Tatjana Katjuk, kood D06176",
                    "Järgmine immuniseerimine": "",
                    "Allikas": "",
                    "Kuupäev": "05.08.2008 11:23:45",
                    "Tervishoiutöötaja": "Ants Kass, kood D02488",
                    "Asutus": "90006399 SA Põhja-Eesti Regionaalhaigla",
                    "Dokumendi number": "27122016_0",
                    "Dokumendi tüüp": "Ambulatoorne epikriis"
                  }
                }
              ]
            }
          }
        }
      }
    }
  }
}

