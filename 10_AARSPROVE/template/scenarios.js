// EN KONSTANT MED MORDEREN OG ITEMS ALT EFTER SCENARIE
const gameScenarios = [
    {
        id: "scenarie1",
        morder: 1,
        genstande: {
            parkeringsplads: [
                {
                    id: "diary_page",
                    navn: "Revet dagbogside",
                    beskrivelse: "Et pinligt kærlighedsdigt — håndskrevet",
                    top: "70%", left: "80%", størrelse: "5%"
                },
                {
                    id: "dog_collar",
                    navn: "Hundehalsbånd",
                    beskrivelse: "Der står 'Lego' på det",
                    top: "34%", left: "38%", størrelse: "4%"
                },
                {
                    id: "sticker",
                    navn: "Klistermærke fra Ludvigs firma",
                    beskrivelse: "Ludvig siger han smider dem ud af vinduet som reklame",
                    top: "52%", left: "80%", størrelse: "2.5%"
                },
                {
                    id: "hair_tie",
                    navn: "Hårstrik med blomstermønster",
                    beskrivelse: "Asta har en identisk model hængende i sit rum",
                    top: "78%", left: "18%", størrelse: "2.5%"
                }
            ],
            gilberts_rum: [
                {
                    id: "diary_rest",
                    navn: "Dagbog med manglende sider",
                    beskrivelse: "Flere sider er revet ud — de samme sider som på gerningsstedet",
                    top: "66%", left: "6%", størrelse: "8%"
                },
                {
                    id: "message_rosa",
                    navn: "Besked fra Rosa",
                    beskrivelse: "'haha de andre synes digtene var SÅ søde 🥰'",
                    top: "77%", left: "85%", størrelse: "6%"
                }
            ],
            astas_rum: [
                {
                    id: "groupchat_screenshot",
                    navn: "Screenshot af gruppechat",
                    beskrivelse: "Rosa læser Gilberts digte højt — Gilbert er synligt rasende i chatten",
                    top: "53%", left: "71%", størrelse: "5%"
                },
                {
                    id: "merchandise_receipt",
                    navn: "Merchandise-kvittering",
                    beskrivelse: "En gammel kpop-ordre Rosa og Asta lagde sammen",
                    top: "90%", left: "45%", størrelse: "5%"
                },
                {
                    id: "meet_draft",
                    navn: "Kladde til vred besked",
                    beskrivelse: "'Rosa det her er ikke sjovt, slet screenshottet nu eller jeg gider ikke mere'",
                    top: "37%", left: "3%", størrelse: "5%"
                }
            ],
            ludvigs_rum: [
                {
                    id: "energy_drink",
                    navn: "Tom energidrik-kasse",
                    beskrivelse: "En stor kasse tomme energidrikke",
                    top: "68%", left: "23%", størrelse: "17%"
                },
                {
                    id: "invoice_rosa",
                    navn: "Faktura med Rosas adresse",
                    beskrivelse: "Hun lejede en partyboks til din fødselsdag",
                    top: "69%", left: "66%", størrelse: "8%"
                },
                {
                    id: "meeting_note",
                    navn: "Håndskrevet seddel",
                    beskrivelse: "'Lego-aflevering, fredag aften, parkeringspladsen'",
                    top: "54%", left: "48%", størrelse: "6%"
                }
            ]
        }
    },
    {
        id: "scenarie2",
        morder: 2,
        genstande: {
            parkeringsplads: [
                {
                    id: "toy_drool",
                    navn: "Kpop-legetøj med savlpletter",
                    beskrivelse: "Rosa havde det med til Lego — det lå på stedet",
                    top: "70%", left: "55%", størrelse: "5%"
                },
                {
                    id: "sticker",
                    navn: "Klistermærke fra Ludvigs firma",
                    beskrivelse: "Asta brugte hans firma til en levering samme aften",
                    top: "55%", left: "86%", størrelse: "2.5%"
                },
                {
                    id: "dog_collar",
                    navn: "Hundehalsbånd",
                    beskrivelse: "Der står 'Lego' på det — Rosa havde hunden med",
                    top: "75%", left: "30%", størrelse: "4%"
                },
                {
                    id: "sketch_page",
                    navn: "Revet skitsebogsside",
                    beskrivelse: "Doodles af karakterer — ligner meget Gilberts tegnestil",
                    top: "80%", left: "17%", størrelse: "5%"
                }
            ],
            gilberts_rum: [
                {
                    id: "forum_thread",
                    navn: "Udskrift af forum-diskussion",
                    beskrivelse: "Offentligt skænderi mellem Rosa og Asta",
                    top: "66%", left: "8%", størrelse: "6%"
                },
                {
                    id: "hobby_knife",
                    navn: "Hobbykniv",
                    beskrivelse: "En lille skalpel-agtig ting — tilsyneladende til modelbygning",
                    top: "65%", left: "18   %", størrelse: "6%"
                },
                {
                    id: "cash_envelope",
                    navn: "Tom kuvert adresseret til Rosa",
                    beskrivelse: "'til Rosa' — ingen penge i",
                    top: "74%", left: "77%", størrelse: "5%"
                }
            ],
            astas_rum: [
                {
                    id: "rumour_messages",
                    navn: "Beskeder om rygtet",
                    beskrivelse: "Asta påstod Rosa havde stemt 47 gange i 'Årets bedste kpop-album'",
                    top: "56%", left: "77%", størrelse: "4%"
                },
                {
                    id: "apology_draft",
                    navn: "Kladde til undskyldning",
                    beskrivelse: "Aldrig sendt",
                    top: "57%", left: "12%", størrelse: "6%"
                },
                {
                    id: "kpop_poster",
                    navn: "Kpop-plakat",
                    beskrivelse: "En stor plakat på væggen",
                    top: "10%", left: "24%", størrelse: "15%"
                }
            ],
            ludvigs_rum: [
                {
                    id: "rental_receipt",
                    navn: "Lejekvittering til Asta",
                    beskrivelse: "Asta lejede en boks samme aften som Rosa døde",
                    top: "68%", left: "65%", størrelse: "8%"
                },
                {
                    id: "energy_drink",
                    navn: "Tom energidrik-kasse",
                    beskrivelse: "En stor kasse tomme energidrikke",
                    top: "68%", left: "23%", størrelse: "17%"
                },
                {
                    id: "debt_note",
                    navn: "Krøllet lap med Rosas navn",
                    beskrivelse: "'Rosa skylder: 340kr' — skrevet med rød tusch",
                    top: "84%", left: "75%", størrelse: "7%"
                }
            ]
        }
    },
    {
        id: "scenarie3",
        morder: 3,
        genstande: {
            parkeringsplads: [
                {
                    id: "side_mirror",
                    navn: "Knækket sidespejl",
                    beskrivelse: "Fra en tung varebil — ser ud til at være kørt af i hast",
                    top: "75%", left: "88%", størrelse: "8%"
                },
                {
                    id: "message_delete",
                    navn: "Udskrift af besked",
                    beskrivelse: "'SLET DEN VIDEO ROSA JEG MENER DET'",
                    top: "64%", left: "26%", størrelse: "5%"
                },
                {
                    id: "dog_collar",
                    navn: "Hundehalsbånd",
                    beskrivelse: "Der står 'Lego' på det — Rosa havde hunden med",
                    top: "49%", left: "5%", størrelse: "4%"
                }
            ],
            gilberts_rum: [
                {
                    id: "hobby_knife",
                    navn: "Hobbykniv",
                    beskrivelse: "En lille skalpel-agtig ting — tilsyneladende til modelbygning",
                    top: "46%", left: "50%", størrelse: "6%"
                },
                {
                    id: "diary_rest",
                    navn: "Dagbog",
                    beskrivelse: "Pinlige digte — ikke relevant for mordet",
                    top: "65%", left: "7%", størrelse: "8%"
                },
                {
                    id: "rosa_photos",
                    navn: "Billeder af Rosa og Lego",
                    beskrivelse: "Taget på parkeringspladsen for to dage siden",
                    top: "83%", left: "93%", størrelse: "8%"
                }
            ],
            astas_rum: [
                {
                    id: "screenshot_video",
                    navn: "Screenshot af video",
                    beskrivelse: "Ludvig danser til One Direction med fulde moves — Lego gør i baggrunden",
                    top: "9%", left: "56%", størrelse: "5%"
                },
                {
                    id: "kpop_poster",
                    navn: "Kpop-plakat",
                    beskrivelse: "En stor plakat på væggen",
                    top: "10%", left: "27%", størrelse: "14%"
                },
                {
                    id: "shared_screenshot",
                    navn: "Screenshot af besked fra Rosa",
                    beskrivelse: "Rosa deler et privat billede af Asta i en gruppechat — uden at spørge",
                    top: "86%", left: "44%", størrelse: "6%"
                }
            ],
            ludvigs_rum: [
                {
                    id: "song_lyrics",
                    navn: "One Direction-sangtekster",
                    beskrivelse: "Med koreografi-noter i margenen — til skolens musical",
                    top: "83%", left: "76%", størrelse: "10%"
                },
                {
                    id: "invoice_rosa",
                    navn: "Faktura med savlpletter",
                    beskrivelse: "Lego var med Rosa inde på lageret — det beviser hun var der",
                    top: "69%", left: "67%", størrelse: "8%"
                }
            ]
        }
    }
]
