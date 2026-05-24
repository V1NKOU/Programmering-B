// EN KONSTANT MED ALLE KARAKTERERNES INFORMATIONER OG SPØRGSMÅL, ALT EFTER SCENARIE
const gameCharacters = {
    gilbert: {
        navn: "Gilbert",
        hilsen: "Hvad vil du?",
        farve: "rgba(189, 179, 68, 0.75)",
        spørgsmål: {
            basis: [
                {
                    tekst: "Hvor godt kendte du Rosa?",
                    svar: "Altså hun er jo din søster, så du kender hende bedre end mig haha. Jeg så hende en gang imellem når hun hentede eller afleverede Lego, vi snakkede ikke vildt meget. Hun er bare sød og Lego elsker hende.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvor var du aftenen Rosa døde?",
                    svar: "Hjemme med min kæreste! Jeg lavede også lidt videre på mit spil, Femboy Dating Simulator, det er mit store projekt. Det er ikke så mærkeligt som det lyder.",
                    kræver_genstand: null
                }
            ],
            scenarie1: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Altså... jeg vil ikke sige noget sikkert, men Ludvig opførte sig virkelig mærkeligt da han hørte om Rosa. Han virkede slet ikke overrasket, og det synes jeg er lidt underligt.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "To dage inden ja. Vi aftalte over telefonen at hun afleverede Lego fredag aften, det var helt normalt.",
                    kræver_genstand: null
                },
                {
                    tekst: "Vi fandt en revet side fra en dagbog på stedet",
                    svar: "Det er ABSOLUT ikke min! Jeg ville aldrig skrive sådan noget pinligt ned, det giver ingen mening overhovedet. Nogen har plantet den der.",
                    kræver_genstand: "diary_page"
                },
                {
                    tekst: "Rosa sendte dig en besked om digte — hvad handlede det om?",
                    svar: "Okay men det er fuldstændig taget ud af kontekst! Det var private noter til mig selv og hun gik ind og rodede i mine ting uden at spørge. Det er et brud på privatlivets fred.",
                    kræver_genstand: "message_rosa"
                },
                {
                    tekst: "Resten af dagbogen i dit rum mangler sider — de samme sider",
                    svar: "Jamen altså de sider var bare fyldt med krudseduller og gamle tanker jeg ville smide ud. Det er ikke noget særligt, alle river sider ud af dagbøger en gang imellem.",
                    kræver_genstand: "diary_rest"
                },
                {
                    tekst: "Hvorfor havde Rosa Lego med den aften?",
                    svar: "Hun passede Lego for mig og skulle aflevere ham fredag aften. Det var aftalt i god tid. Der er ikke noget mystisk i det overhovedet.",
                    kræver_genstand: "dog_collar"
                }
            ],
            scenarie2: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Asta og Rosa havde skændtes rigtigt rigtigt meget. Og Asta var jo i området den aften, det er ikke mig der finder på det.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "Selve dagen faktisk. Vi krydsede hinanden på gaden, hun havde Lego i snor og virkede helt fin.",
                    kræver_genstand: null
                },
                {
                    tekst: "Kendte du til dramaet mellem Rosa og Asta i deres kpop-forum?",
                    svar: "Ja jeg så noget om det på nettet, det var lidt vildt faktisk. Asta var... meget engageret i det drama.",
                    kræver_genstand: "forum_thread"
                },
                {
                    tekst: "Vidste du at Rosa og Asta skulle mødes den aften?",
                    svar: "Rosa nævnte det ja, vi snakkede lidt den dag. Hun virkede ikke nervøs eller noget, bare lidt irriteret over det hele.",
                    kræver_genstand: "forum_thread"
                },
                {
                    tekst: "Rosa havde Lego med den aften — vidste du det?",
                    svar: "Altså ja hun passede ham jo stadig, så det giver mening hun havde ham med. Jeg tænkte ikke noget over det.",
                    kræver_genstand: "toy_drool"
                },
                {
                    tekst: "Har du set kladden til Astas undskyldning?",
                    svar: "Har ikke set den nej. Men det er da lidt mærkeligt at hun aldrig sendte den, ikke?",
                    kræver_genstand: "apology_draft"
                },
                {
                    tekst: "Vi fandt en hobbykniv i dit rum",
                    svar: "Den bruger jeg til at skære præcist med til modelbygning! Det er et hobbyredskab, ikke et mordvåben. Man kan ikke engang skade nogen ordentligt med den.",
                    kræver_genstand: "hobby_knife"
                },
                {
                    tekst: "Vi fandt en skitsebogsside ved gerningsstedet der ligner dit arbejde",
                    svar: "Altså jeg doodler hele tiden og mister sider overalt. Jeg var der faktisk et par dage inden og luftede Lego for Rosa mens hun var syg. Det kan sagtens have ligget der siden.",
                    kræver_genstand: "sketch_page"
                },
                {
                    tekst: "Vi fandt en tom kuvert adresseret til Rosa i dit rum",
                    svar: "Jeg skyldte hende lidt penge og ville give dem til hende da hun afleverede Lego. Jeg nåede det aldrig.",
                    kræver_genstand: "cash_envelope"
                }
            ],
            scenarie3: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Ludvig spurgte mig om Rosa delte meget på nettet. Jeg sagde ja, men jeg syntes det var en mærkelig ting at spørge om. Hvad skulle han egentlig bruge den information til?",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "Dagen inden. Hun havde Lego med og virkede rigtig glad, vi snakkede om at hun skulle aflevere ham snart.",
                    kræver_genstand: null
                },
                {
                    tekst: "Har du set videoen af Ludvig?",
                    svar: "Nej hun sendte den ikke til mig desværre, kun Asta fik den tror jeg. Jeg er lidt ærgerlig over det faktisk.",
                    kræver_genstand: "screenshot_video"
                },
                {
                    tekst: "Vi fandt din dagbog i dit rum",
                    svar: "Den er bare fyldt med mine private tanker, den har ingenting med Rosa at gøre. Må jeg ikke bare have en dagbog i fred?",
                    kræver_genstand: "diary_rest"
                },
                {
                    tekst: "Vi fandt billeder af Rosa og Lego ved parkeringspladsen i dit rum",
                    svar: "Vi gik tit tur der med Lego, hun sendte mig billederne bagefter. Det er et normalt sted at gå.",
                    kræver_genstand: "rosa_photos"
                }
            ]
        }
    },
    asta: {
        navn: "Asta",
        hilsen: "Yooooo",
        farve: "rgba(34, 137, 34, 0.749)",
        spørgsmål: {
            basis: [
                {
                    tekst: "Hvor godt kendte du Rosa?",
                    svar: "Vi er i en masse af de samme online communities, så vi har snakket en del. Hun har faktisk ret god smag i kpop, selvom hun har nogle takes der er... kontroversielle. Det er sjovt egentlig.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvor var du aftenen Rosa døde?",
                    svar: "Sad hjemme og læste. Jeg har en bog jeg er ret opslugt af for øjeblikket, så det var bare en rolig aften.",
                    kræver_genstand: null
                }
            ],
            scenarie1: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Jeg vil ikke pege fingre direkte... men Ludvig var i området den aften. Det ved jeg med ret stor sikkerhed.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "Et par dage inden. Vi chattede lidt frem og tilbage, intet særligt.",
                    kræver_genstand: null
                },
                {
                    tekst: "Kender du noget til disse digte fundet ved gerningsstedet?",
                    svar: "Ja det er dem Rosa læste højt for os i vores gruppechat! Gilbert fik det lidt dårligt over det, men altså... de var jo faktisk ret søde digte. Han overreagerede lidt synes jeg.",
                    kræver_genstand: "diary_page"
                },
                {
                    tekst: "Ved du om Rosa havde Lego med da hun skulle aflevere ham?",
                    svar: "Ja hun sendte mig en besked om at hun var på vej, noget i stil med 'afleverer lige Lego, brb'. Det var faktisk den sidste besked jeg fik fra hende.",
                    kræver_genstand: "dog_collar"
                },
                {
                    tekst: "Hvad synes du om Gilbert efter det med dagbogen?",
                    svar: "Han tog det for tungt synes jeg. Det var jo bare digte, og de var faktisk lidt søde. Men han ville åbenbart ikke have at nogen læste dem.",
                    kræver_genstand: "diary_rest"
                },
                {
                    tekst: "Vi fandt et screenshot af en gruppechat i dit rum",
                    svar: "Det er screenshottet fra da Rosa læste digtene højt i chatten, jeg gemte det fordi det var lidt historisk. Men det viser jo også at alle andre så dem, ikke kun mig.",
                    kræver_genstand: "groupchat_screenshot"
                },
                {
                    tekst: "Vi fandt en hårstrik ved gerningsstedet der ligner din",
                    svar: "Jeg mister den slags hele tiden, det kan have ligget der i ugevis. Jeg var ikke der den aften.",
                    kræver_genstand: "hair_tie"
                },
                {
                    tekst: "Vi fandt en kladde til en vred besked i dit rum",
                    svar: "Den handlede om at hun skulle slette screenshottet fra chatten. Jeg ville bare have det drama ude af verden, Gilbert var sur på mig over det og det var ikke min fejl.",
                    kræver_genstand: "meet_draft"
                }
            ],
            scenarie2: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Gilbert skyldte Rosa noget, og han var ikke hjemme den aften. Det ved jeg.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "To dage inden. Vi snakkede kort om noget kpop-stuff, intet særligt.",
                    kræver_genstand: null
                },
                {
                    tekst: "Vi fandt et kpop-legetøj med savlpletter på gerningsstedet",
                    svar: "Det er et af Rosas kpop-legetøj, hun tog dem altid med til Lego. Han er lidt besat af dem faktisk, det er ret sjovt.",
                    kræver_genstand: "toy_drool"
                },
                {
                    tekst: "Der er fundet beskeder hvor du spredte et rygte om Rosa",
                    svar: "Det var ikke et rygte, det var en faktuel observation. Rosa stemte 47 gange i afstemningen og det er simpelthen ikke i orden. Nogen måtte sige det.",
                    kræver_genstand: "rumour_messages"
                },
                {
                    tekst: "Der er fundet en kladde til en undskyldning i dit rum — den blev aldrig sendt",
                    svar: "Jeg ville sende den, jeg nåede det bare ikke inden... du ved. Timingen var bare rigtig dårlig.",
                    kræver_genstand: "apology_draft"
                },
                {
                    tekst: "Hvorfor aftalte du et møde med Rosa den aften?",
                    svar: "Jeg ville snakke tingene ordentligt igennem med hende. Tekst er ikke altid nok, det misforstås for nemt.",
                    kræver_genstand: "rumour_messages"
                }
            ],
            scenarie3: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Gilbert spurgte mig om Rosa havde sagt noget om Ludvig. Og Ludvig blev meget stille efter nyheden om Rosa, mere end man ville forvente.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "Selve dagen. Hun sendte mig videoen om eftermiddagen og vi lo af den over telefon i ret lang tid.",
                    kræver_genstand: null
                },
                {
                    tekst: "Har du set en video af Ludvig?",
                    svar: "HAHA ja Rosa sendte den til mig og jeg er så glad for at hun gjorde det. Manden danser til One Direction med fuld koreografi og alt muligt. Man kan høre Lego gø i baggrunden. Det er noget af det bedste jeg har set.",
                    kræver_genstand: "screenshot_video"
                },
                {
                    tekst: "Vidste du at Ludvig var vred på Rosa for videoen?",
                    svar: "Det anede jeg virkelig ikke, jeg troede det bare var en harmløs sjov video. Intet mere end det.",
                    kræver_genstand: "screenshot_video"
                },
                {
                    tekst: "Spurgte Ludvig dig også om at slette videoen?",
                    svar: "...ja faktisk. Han sendte mig en ret insisterende besked om det. Jeg ignorerede den fordi jeg troede han bare var flad over at se sig selv danse.",
                    kræver_genstand: "message_delete"
                },
                {
                    tekst: "Vi fandt et screenshot af Rosa der deler et privat billede af dig",
                    svar: "Ja det var irriterende. Rosa delte det i en gruppechat uden at spørge mig. Vi skændtes lidt om det, men det gik over. Sådan er Rosa bare en gang imellem.",
                    kræver_genstand: "shared_screenshot"
                }
            ]
        }
    },
    ludvig: {
        navn: "Ludvig",
        hilsen: "Har du hørt om partyboks?",
        farve: "rgba(137, 34, 34, 0.75)",
        spørgsmål: {
            basis: [
                {
                    tekst: "Kendte du Rosa?",
                    svar: "Din søster ja! Hun kom forbi lageret en gang imellem. Sjov pige. En af de eneste der faktisk synes partyboks-konceptet er fedt, det sætter jeg pris på.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvor var du aftenen Rosa døde?",
                    svar: "Var på partyboks lageret, jeg havde en levering der skulle af sted. Helt standard aften egentlig.",
                    kræver_genstand: null
                }
            ],
            scenarie1: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Asta og Rosa havde det ikke godt sammen den sidste tid, det er ikke ligefrem en hemmelighed. Siger det bare.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "Tre dage inden tror jeg. Hun var forbi med en pakke til dig, vi sagde hej, vekslede to sætninger, og hun gik.",
                    kræver_genstand: null
                },
                {
                    tekst: "Kendte du til Gilberts dagbog?",
                    svar: "Haha ja det var jo den store snakkis! Rosa læste dem højt og Gilbert... ja han tog det ikke specielt godt. Sjov situation egentlig, bare ikke for Gilbert.",
                    kræver_genstand: "diary_page"
                },
                {
                    tekst: "Hvor sur var Gilbert egentlig over dagbogen?",
                    svar: "Han var mere sur end normalt. Altså normalt er han bare stille og laver sit spil, men den dag var han rigtigt sur. Det overraskede mig faktisk.",
                    kræver_genstand: "diary_rest"
                },
                {
                    tekst: "Så du Gilbert den aften?",
                    svar: "Nej jeg så ham ikke. Faktisk stod hans cykel ikke udenfor da jeg kørte forbi, og det er da mærkeligt hvis han var hjemme som han siger.",
                    kræver_genstand: "dog_collar"
                },
                {
                    tekst: "Vi fandt dit firmas klistermærke på gerningsstedet",
                    svar: "Ja jeg kørte forbi med en levering. Jeg smider altid klistermærker ud af vinduet når jeg er i gang, det er gratis markedsføring. Virker faktisk ret godt.",
                    kræver_genstand: "sticker"
                },
                {
                    tekst: "Vi fandt en seddel om Rosas Lego-aflevering i dit rum",
                    svar: "Gilbert nævnte at hun afleverede Lego fredag, og jeg skulle have en levering i nærheden den aften. Jeg noterede det bare for at planlægge ruten.",
                    kræver_genstand: "meeting_note"
                },
                {
                    tekst: "Vi fandt en faktura med Rosas adresse i dit rum",
                    svar: "Hun lejede en partyboks til din fødselsdag, det er hvad fakturaen viser. Tjek datoen selv hvis du ikke tror mig, det er ikke noget mystisk.",
                    kræver_genstand: "invoice_rosa"
                }
            ],
            scenarie2: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Asta og Rosa havde det slet ikke godt, det ligner ikke noget godt. Gilbert opfører sig altid lidt mærkeligt, men det er han bare.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "En uge inden tror jeg. Hun var forbi lageret med noget, vi sagde hej og det var det.",
                    kræver_genstand: null
                },
                {
                    tekst: "Asta lejede en boks af dig samme aften — vidste du hun var i området?",
                    svar: "Asta lejede en boks ja, det er dokumenteret. Hvad hun brugte den til er hendes sag, ikke min.",
                    kræver_genstand: "rental_receipt"
                },
                {
                    tekst: "Kendte du til dramaet mellem Rosa og Asta?",
                    svar: "Jeg hørte lidt om det, noget kpop-afstemning drama. Forstod det ærligt talt ikke helt, men de var sure på hinanden.",
                    kræver_genstand: "rumour_messages"
                },
                {
                    tekst: "Rosa havde Lego med den aften — hvad tænker du om det?",
                    svar: "Det er da lidt mærkeligt at have sin hund med, men Lego er en god hund. Sikkert bare tilfældigt.",
                    kræver_genstand: "toy_drool"
                },
                {
                    tekst: "Var din varebil i området den aften?",
                    svar: "Ja jeg var i området med en levering. Asta lejede faktisk boksen til den tur, det kan hun bekræfte.",
                    kræver_genstand: "sticker"
                },
                {
                    tekst: "Vi fandt en tom energidrik-kasse i dit rum",
                    svar: "Energidrik er mit brændstof, det ved alle der kender mig. Kassen er ikke et mordvåben, det er bare tom emballage.",
                    kræver_genstand: "energy_drink"
                },
                {
                    tekst: "Vi fandt en lap om at Rosa skyldte dig penge",
                    svar: "Hun skyldte mig lidt for en levering der gik galt. Vi havde aftalt hun betalte tilbage næste gang hun kom forbi. Det er ikke et motiv, det er 340 kroner.",
                    kræver_genstand: "debt_note"
                }
            ],
            scenarie3: [
                {
                    tekst: "Hvem tror du gjorde det?",
                    svar: "Asta og Rosa havde mere drama end folk måske tror. Det er bare hvad jeg har hørt.",
                    kræver_genstand: null
                },
                {
                    tekst: "Hvornår så du Rosa sidst?",
                    svar: "To dage inden tror jeg. Hun var forbi lageret med en pakke.",
                    kræver_genstand: null
                },
                {
                    tekst: "Vi fandt et knækket sidespejl ved gerningsstedet — fra en varebil",
                    svar: "Jeg kom til at ramme en kantsten da jeg kørte. Det sker. Det beviser ikke at jeg var der da det skete.",
                    kræver_genstand: "side_mirror"
                },
                {
                    tekst: "Vi fandt en besked: 'SLET DEN VIDEO ROSA JEG MENER DET'",
                    svar: "...okay ja, jeg overreagerede lidt. Det var privat og hun filmede mig uden at spørge om lov.",
                    kræver_genstand: "message_delete"
                },
                {
                    tekst: "Vi fandt sangtekster med noter i dit rum",
                    svar: "Det er til skolens musical, jeg er med i den. Det er ikke relevant for noget her.",
                    kræver_genstand: "song_lyrics"
                },
                {
                    tekst: "Asta har set videoen — Lego kan høres gø i baggrunden",
                    svar: "Rosa havde ingen ret til at filme mig uden at spørge. Det er simpelthen ikke i orden.",
                    kræver_genstand: "screenshot_video"
                },
                {
                    tekst: "Fakturaen i dit rum har savlpletter — Rosa og Lego var inde på lageret",
                    svar: "Hun kom forbi med noget. Det er bare en faktura, det beviser ikke noget som helst.",
                    kræver_genstand: "invoice_rosa"
                }
            ]
        }
    },
}