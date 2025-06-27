import { ponsAdapter } from "@/app/api/adapters/ponsAdapter";

it('return a object with pons word information ', () => {
    const ponsResponse = [
        {
            lang: "de",
            hits: [
                {
                    type: "entry",
                    opendict: false,
                    roms: [
                        {
                            headword: "Haut",
                            headword_full: "Haut <span class=\"flexion\">&lt;-, Häute&gt;</span> <span class=\"phonetics\">[haut, <span class=\"info\"><acronym title=\"plural\">pl</acronym></span> ˈhɔytə]</span> <span class=\"wordclass\"><acronym title=\"noun\">N</acronym></span> <span class=\"genus\"><acronym title=\"feminine\">f</acronym></span>",
                            wordclass: "noun",
                            arabs: [
                                {
                                    header: "1. Haut <span class=\"topic\"><acronym title=\"anatomy\">ANAT</acronym></span>:",
                                    translations: [
                                        {
                                            source: "<strong class=\"headword\">Haut</strong>",
                                            target: "skin"
                                        },
                                        {
                                            source: "<span class=\"full_collocation\">nass bis auf die <strong class=\"tilde\">Haut\n</strong> </span>",
                                            target: "soaked to the skin"
                                        },
                                        {
                                            source: "<span class=\"full_collocation\">viel <strong class=\"tilde\">Haut</strong> zeigen</span> <span class=\"rhetoric\"><acronym title=\"humorous\">hum</acronym></span>",
                                            target: "to reveal a lot <span class=\"rhetoric\"><acronym title=\"humorous\">hum</acronym></span>"
                                        }
                                    ]
                                },
                                {
                                    header: "2. Haut <span class=\"sense\">(gegerbtes Fell)</span>:",
                                    translations: [
                                        {
                                            source: "<strong class=\"headword\">Haut</strong>",
                                            target: "hide"
                                        }
                                    ]
                                },
                                {
                                    header: "3. Haut <span class=\"topic\"><acronym title=\"botany\">BOT</acronym>, <acronym title=\"gardening\">HORT</acronym></span> <span class=\"sense\">(dünne Schale)</span>:",
                                    translations: [
                                        {
                                            source: "<strong class=\"headword\">Haut</strong>",
                                            target: "peel"
                                        },
                                        {
                                            source: "<strong class=\"headword\">Haut</strong>",
                                            target: "skin"
                                        }
                                    ]
                                },
                                {
                                    header: "4. Haut <span class=\"sense\">(Außenhaut)</span>:",
                                    translations: [
                                        {
                                            source: "<strong class=\"headword\">Haut</strong>",
                                            target: "skin"
                                        }
                                    ]
                                },
                                {
                                    header: "5. Haut <span class=\"sense\">(erstarrte Schicht)</span>:",
                                    translations: [
                                        {
                                            source: "<strong class=\"headword\">Haut</strong>",
                                            target: "skin"
                                        }
                                    ]
                                },
                                {
                                    header: "Phrases:",
                                    translations: [
                                        {
                                            source: "<span class=\"idiom_proverb\">eine ehrliche <strong class=\"tilde\">Haut</strong> sein</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to be an honest sort"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">aus der <strong class=\"tilde\">Haut</strong> fahren</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to hit the roof <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">sich <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> auf die faule <strong class=\"tilde\">Haut</strong> legen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>, <span class=\"idiom_proverb\">auf der faulen <strong class=\"tilde\">Haut</strong> liegen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to laze around <span class=\"target\">[<span class=\"or\"><acronym title=\"or\">or</acronym></span> <span class=\"region\"><acronym title=\"British English\" class=\"Brit\">Brit</acronym></span> about]</span>"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">sich <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> auf die faule <strong class=\"tilde\">Haut</strong> legen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>, <span class=\"idiom_proverb\">auf der faulen <strong class=\"tilde\">Haut</strong> liegen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to take it <span class=\"target\">[<span class=\"or\"><acronym title=\"or\">or</acronym></span> things]</span> easy"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\"><acronym title=\"etwas\">etw</acronym> geht [<acronym title=\"jemandem\">jdm</acronym>] unter die <strong class=\"tilde\">Haut\n</strong> </span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "<acronym title=\"something\">sth</acronym> gets under one&#39;s skin <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">mit <strong class=\"tilde\">Haut</strong> und Haar[en]</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "completely"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">mit <strong class=\"tilde\">Haut</strong> und Haar[en]</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "totally"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">mit heiler <strong class=\"tilde\">Haut</strong> davonkommen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to escape unscathed"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\"><acronym title=\"jemand\">jd</acronym> kann nicht aus seiner <strong class=\"tilde\">Haut</strong> heraus</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "a leopard cannot change its spots <span class=\"rhetoric\"><acronym title=\"proverb\">prov</acronym></span>"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">nur <strong class=\"tilde\">Haut</strong> und Knochen sein</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>, <span class=\"idiom_proverb\">nur noch aus <strong class=\"tilde\">Haut</strong> und Knochen bestehen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to be nothing but skin and bone"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">[für <acronym title=\"jemanden\">jdn</acronym>/<acronym title=\"etwas\">etw</acronym>] seine <strong class=\"tilde\">Haut</strong> zu Markte tragen</span>",
                                            target: "to risk one&#39;s neck [for <acronym title=\"somebody\">sb</acronym>/<acronym title=\"something\">sth</acronym>]"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">seine [eigene] <strong class=\"tilde\">Haut</strong> retten</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to save one&#39;s own skin"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\"><acronym title=\"jemand\">jd</acronym> möchte nicht in <acronym title=\"jemandes\">jds</acronym> <strong class=\"tilde\">Haut</strong> stecken</span>",
                                            target: "<acronym title=\"somebody\">sb</acronym> would not like to be in <acronym title=\"somebody's\">sb's</acronym> shoes"
                                        },
                                        {
                                            source: "<span class=\"example\">ich möchte nicht in seiner <strong class=\"tilde\">Haut</strong> stecken</span>",
                                            target: "I wouldn&#39;t like to be in his shoes"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">seine <strong class=\"tilde\">Haut</strong> so teuer wie möglich verkaufen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to make things as difficult as possible"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">sich <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> seiner <strong class=\"tilde\">Haut</strong> wehren</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "to stick up for oneself <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\">sich <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> nicht wohl in seiner <strong class=\"tilde\">Haut</strong> fühlen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "not to feel too good"
                                        },
                                        {
                                            source: "<span class=\"idiom_proverb\"><acronym title=\"jemandem\">jdm</acronym> ist nicht wohl in seiner <strong class=\"tilde\">Haut\n</strong> </span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "<acronym title=\"somebody\">sb</acronym> is not feeling too good"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "entry",
                    opendict: false,
                    roms: [
                        {
                            headword: "hau·en",
                            headword_full: "hau<span class=\"separator\">·</span>en <span class=\"flexion\">&lt;haut, haute [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> <span class=\"style\"><acronym title=\"formal language\">form</acronym></span> hieb], gehauen [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> <span class=\"region\"><acronym title=\"Southern German\" class=\"südd\">SGer</acronym>, <acronym title=\"Austrian\" class=\"österr\">A</acronym></span> gehaut] haut, haute, gehauen&gt;</span> <span class=\"phonetics\">[ˈhauən]</span> <span class=\"wordclass\"><acronym title=\"verb\">VB</acronym></span> <span class=\"verbclass\"><acronym title=\"transitive verb\">trans</acronym></span>",
                            wordclass: "transitive verb",
                            arabs: [
                                {
                                    header: "1. hauen <span class=\"flexion\">&lt;haut, haute [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> \n                  <span class=\"style\"><acronym title=\"formal language\">form</acronym></span> hieb], gehauen [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> \n                  <span class=\"region\"><acronym title=\"Southern German\" class=\"südd\">SGer</acronym>, <acronym title=\"Austrian\" class=\"österr\">A</acronym> </span> gehaut]\n            &gt;</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span> <span class=\"sense\">(schlagen)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\"><acronym title=\"etwas\">etw</acronym> auf [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> gegen] <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to hit <acronym title=\"something\">sth</acronym> against <acronym title=\"something\">sth</acronym>"
                                        },
                                        {
                                            source: "<span class=\"full_collocation\"><acronym title=\"jemandem\">jdm</acronym> <acronym title=\"etwas\">etw</acronym> auf den Kopf <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to hit <acronym title=\"somebody\">sb</acronym> over the head with <acronym title=\"something\">sth</acronym>"
                                        },
                                        {
                                            source: "<span class=\"full_collocation\">einen Nagel in ein Brett <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to bang <span class=\"target\">[<span class=\"or\"><acronym title=\"or\">or</acronym></span> knock]</span> a nail into a board"
                                        }
                                    ]
                                },
                                {
                                    header: "2. hauen <span class=\"flexion\">&lt;haut, haute [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> \n                  <span class=\"style\"><acronym title=\"formal language\">form</acronym></span> hieb], gehauen [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> \n                  <span class=\"region\"><acronym title=\"Southern German\" class=\"südd\">SGer</acronym>, <acronym title=\"Austrian\" class=\"österr\">A</acronym> </span> gehaut]\n            &gt;</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span> <span class=\"sense\">(verprügeln)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\"><acronym title=\"jemanden\">jdn</acronym> <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to hit <span class=\"target\">[<span class=\"or\"><acronym title=\"or\">or</acronym></span> clout]</span> <acronym title=\"somebody\">sb</acronym>"
                                        },
                                        {
                                            source: "<span class=\"grammatical_construction\"><acronym title=\"jemanden\">jdn</acronym> <strong class=\"tilde\">hauen\n</strong> </span> <span class=\"sense\">(wiederholt)</span>",
                                            target: "to beat <acronym title=\"somebody\">sb</acronym>"
                                        },
                                        {
                                            source: "<span class=\"example\">bitte hau mich nicht, ich tu es ja auch nicht wieder!</span>",
                                            target: "don&#39;t hit me please, I won&#39;t do it again!"
                                        }
                                    ]
                                },
                                {
                                    header: "3. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"sense\">(meißeln)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\"><acronym title=\"etwas\">etw</acronym> in <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to carve <acronym title=\"something\">sth</acronym> in <acronym title=\"something\">sth</acronym>"
                                        },
                                        {
                                            source: "<span class=\"example\">der Künstler hat diese Statue in Marmor <strong class=\"tilde\">gehauen\n</strong> </span>",
                                            target: "the artist carved this statue in marble"
                                        },
                                        {
                                            source: "<span class=\"example\">um fischen zu können, mussten sie ein Loch ins Eis <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "in order to fish they had to cut a hole in the ice"
                                        },
                                        {
                                            source: "<span class=\"example\">die Stufen waren von Hand in den harten Fels <strong class=\"tilde\">gehauen</strong> worden</span>",
                                            target: "the steps had been hewn by hand in the hard rock"
                                        },
                                        {
                                            source: "<span class=\"full_collocation\">ein Loch in eine Wand <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to knock a hole in a wall"
                                        }
                                    ]
                                },
                                {
                                    header: "4. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span> <span class=\"restriction\"><acronym title=\"rare\">rare</acronym></span> <span class=\"sense\">(stoßen)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\">sich <span class=\"case\"><acronym title=\"dative\">dat</acronym></span> <acronym title=\"etwas\">etw</acronym> an <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym> o <acronym title=\"dative\">dat</acronym></span> <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to hit <span class=\"target\">[<span class=\"or\"><acronym title=\"or\">or</acronym></span> bang]</span> <acronym title=\"something\">sth</acronym> on <acronym title=\"something\">sth</acronym>"
                                        },
                                        {
                                            source: "<span class=\"example\">au verdammt, ich habe mir das Knie an die Tischkante <strong class=\"tilde\">gehauen!</strong></span>",
                                            target: "ow damn it, I&#39;ve hit my knee on the edge of the table"
                                        }
                                    ]
                                },
                                {
                                    header: "5. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"style\"><acronym title=\"slang\">sl</acronym></span> <span class=\"sense\">(achtlos werfen)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\"><acronym title=\"etwas\">etw</acronym> irgendwohin <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to slap <acronym title=\"something\">sth</acronym> somewhere"
                                        }
                                    ]
                                },
                                {
                                    header: "6. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"region\"><acronym title=\"regional\" class=\"reg\">region</acronym></span> <span class=\"sense\">(zerkleinern)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"full_collocation\">Holz <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to chop wood"
                                        }
                                    ]
                                },
                                {
                                    header: "7. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"topic\"><acronym title=\"mining\">MINING</acronym></span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"full_collocation\">Erz <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to cut ore"
                                        },
                                        {
                                            source: "<span class=\"full_collocation\">Kohle <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to break coal"
                                        }
                                    ]
                                },
                                {
                                    header: "8. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"region\"><acronym title=\"regional\" class=\"reg\">region</acronym></span> <span class=\"sense\">(fällen)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"full_collocation\">einen Baum <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to hew a tree"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            headword: "hau·en",
                            headword_full: "hau<span class=\"separator\">·</span>en <span class=\"flexion\">&lt;haut, haute [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> <span class=\"style\"><acronym title=\"formal language\">form</acronym></span> hieb], gehauen [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> <span class=\"region\"><acronym title=\"Southern German\" class=\"südd\">SGer</acronym>, <acronym title=\"Austrian\" class=\"österr\">A</acronym></span> gehaut] haut, haute, gehauen&gt;</span> <span class=\"phonetics\">[ˈhauən]</span> <span class=\"wordclass\"><acronym title=\"verb\">VB</acronym></span> <span class=\"verbclass\"><acronym title=\"intransitive verb\">intr</acronym></span>",
                            wordclass: "intransitive verb",
                            arabs: [
                                {
                                    header: "1. hauen <span class=\"flexion\">&lt;haut, hieb [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> \n                  <span class=\"style\"><acronym title=\"informal\">inf</acronym> <acronym title=\"auch\">a.</acronym></span> haute], gehauen&gt;</span> <span class=\"sense\">(schlagen)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\">[mit <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"dative\">dat</acronym></span>] auf [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> gegen] <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to smash <acronym title=\"something\">sth</acronym> against <acronym title=\"something\">sth</acronym>"
                                        },
                                        {
                                            source: "<span class=\"example\">er nahm die Axt und hieb damit gegen das Türschloss</span>",
                                            target: "he picked up the axe and smashed it against the door lock"
                                        },
                                        {
                                            source: "<span class=\"example\">hau doch nicht so auf die Klaviertasten!</span>",
                                            target: "don&#39;t thump the piano keys like that!"
                                        },
                                        {
                                            source: "<span class=\"grammatical_construction\"><acronym title=\"jemandem\">jdm</acronym> auf <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span>/in <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to hit <span class=\"target\">[<span class=\"or\"><acronym title=\"or\">or</acronym></span> punch]</span> <acronym title=\"somebody\">sb</acronym> on/in <acronym title=\"something\">sth</acronym>"
                                        },
                                        {
                                            source: "<span class=\"example\">sie hieb ihm mit der flachen Hand ins Gesicht</span>",
                                            target: "she slapped his face"
                                        },
                                        {
                                            source: "<span class=\"example\">er hieb ihm mit dem Schlagstock auf den Kopf</span>",
                                            target: "he hit him on the head with the baton"
                                        },
                                        {
                                            source: "<span class=\"full_collocation\"><acronym title=\"jemandem\">jdm</acronym> [freundschaftlich] auf die Schulter <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to clap <acronym title=\"somebody\">sb</acronym> on the shoulder"
                                        }
                                    ]
                                },
                                {
                                    header: "2. hauen <span class=\"flexion\">&lt;haut, haute [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> \n                  <span class=\"restriction\"><acronym title=\"rare\">rare</acronym> <acronym title=\"auch\">a.</acronym></span> hieb], gehauen&gt;</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span> <span class=\"sense\">(prügeln)</span>:",
                                    translations: [
                                        {
                                            source: "<strong class=\"headword\">hauen</strong>",
                                            target: "to hit out"
                                        },
                                        {
                                            source: "<span class=\"example\">bitte nicht <strong class=\"tilde\">hauen!</strong></span>",
                                            target: "please don&#39;t hit me!"
                                        }
                                    ]
                                },
                                {
                                    header: "3. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"auxiliary_verb\">+sein</span> <span class=\"restriction\"><acronym title=\"rare\">rare</acronym></span> <span class=\"sense\">(stoßen)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\">[mit <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"dative\">dat</acronym></span>] gegen <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to bang <acronym title=\"something\">sth</acronym> against <span class=\"target\">[<span class=\"or\"><acronym title=\"or\">or</acronym></span> on]</span> <acronym title=\"something\">sth</acronym>"
                                        },
                                        {
                                            source: "<span class=\"example\">er ist mit dem Fuß gegen einen Stein <strong class=\"tilde\">gehauen\n</strong> </span>",
                                            target: "he banged his foot on a rock"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            headword: "hau·en",
                            headword_full: "hau<span class=\"separator\">·</span>en <span class=\"flexion\">&lt;haut, haute [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> <span class=\"style\"><acronym title=\"formal language\">form</acronym></span> hieb], gehauen [<span class=\"or\"><acronym title=\"oder\">o.</acronym></span> <span class=\"region\"><acronym title=\"Southern German\" class=\"südd\">SGer</acronym>, <acronym title=\"Austrian\" class=\"österr\">A</acronym></span> gehaut] haut, haute, gehauen&gt;</span> <span class=\"phonetics\">[ˈhauən]</span> <span class=\"wordclass\"><acronym title=\"verb\">VB</acronym></span> <span class=\"verbclass\"><acronym title=\"reflexive verb\">refl</acronym></span>",
                            wordclass: "reflexive verb",
                            arabs: [
                                {
                                    header: "1. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"style\"><acronym title=\"slang\">sl</acronym></span> <span class=\"sense\">(sich setzen, legen)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\">sich <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> auf <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span>/in <acronym title=\"etwas\">etw</acronym> <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to throw <span class=\"target\">[<span class=\"or\"><acronym title=\"or\">or</acronym></span> fling]</span> oneself onto/into <acronym title=\"something\">sth</acronym>"
                                        },
                                        {
                                            source: "<span class=\"example\">hau dich nicht so aufs Sofa!</span>",
                                            target: "don&#39;t throw yourself onto the sofa like that!"
                                        }
                                    ]
                                },
                                {
                                    header: "2. hauen <span class=\"flexion\">&lt;haut, haute, gehauen&gt;</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span> <span class=\"sense\">(sich prügeln)</span>:",
                                    translations: [
                                        {
                                            source: "<span class=\"grammatical_construction\">sich <span class=\"case\"><acronym title=\"accusative\">acc</acronym></span> [mit <acronym title=\"jemandem\">jdm</acronym>] <strong class=\"tilde\">hauen\n</strong> </span>",
                                            target: "to fight [with <acronym title=\"somebody\">sb</acronym>]"
                                        },
                                        {
                                            source: "<span class=\"example\">sie hauen sich schon wieder</span>",
                                            target: "they are fighting each other again"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "entry",
                    opendict: false,
                    roms: [
                        {
                            headword: "Hau·en",
                            headword_full: "Hau<span class=\"separator\">·</span>en <span class=\"phonetics\">[ˈhauən]</span> <span class=\"wordclass\"><acronym title=\"noun\">N</acronym></span> <span class=\"genus\"><acronym title=\"neuter\">nt</acronym></span> <span class=\"info\">kein <acronym title=\"plural\">pl</acronym></span>",
                            wordclass: "noun",
                            arabs: [
                                {
                                    header: "",
                                    translations: [
                                        {
                                            source: "<span class=\"idiom_proverb\">ein <strong class=\"tilde\">Hauen</strong> und Stechen</span> <span class=\"style\"><acronym title=\"informal\">inf</acronym></span>",
                                            target: "a free-for-all"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
    const wordData = ponsAdapter(ponsResponse);
    expect(wordData).toStrictEqual(
        {
            word: "Haut <span class=\"flexion\">&lt;-, Häute&gt;</span> <span class=\"phonetics\">[haut, <span class=\"info\"><acronym title=\"plural\">pl</acronym></span> ˈhɔytə]</span> <span class=\"wordclass\"><acronym title=\"noun\">N</acronym></span> <span class=\"genus\"><acronym title=\"feminine\">f</acronym></span>",
            entries: [
                {
                    header: "1. Haut <span class=\"topic\"><acronym title=\"anatomy\">ANAT</acronym></span>:",
                    translations: [
                        {
                            source: "<strong class=\"headword\">Haut</strong>",
                            target: "skin"
                        },
                        {
                            source: "<span class=\"full_collocation\">nass bis auf die <strong class=\"tilde\">Haut\n</strong> </span>",
                            target: "soaked to the skin"
                        }
                    ]
                },
                {
                    header: "2. Haut <span class=\"sense\">(gegerbtes Fell)</span>:",
                    translations: [
                        {
                            source: "<strong class=\"headword\">Haut</strong>",
                            target: "hide"
                        }
                    ]
                },
            ]
        }
    )
})



