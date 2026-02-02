// cSpell: disable
import type { AbstractBook } from "@shared/api/types"
import * as authors from "./authors"
import * as categories from "./categories"
import * as publishers from "./publishers"

export const DIARY_2003: AbstractBook = {
  id: 8,
  name: "Diary",
  description:
    "The protagonist is Misty Wilmot, a former promising artist who now works as a waitress on Waytansea Island. Her husband, Peter, a contractor, attempts suicide and falls into a coma. Misty is forced to confront the consequences of his past work: Peter had left hidden rooms and grotesque messages on the walls in renovated houses, leading to numerous lawsuits",
  authors: [authors.PALAHNIUK],
  publicationYear: 2003,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const FIGHT_CLUB_2018: AbstractBook = {
  id: 32,
  name: "Fight Club",
  description: `Chuck Palahniuk is a contemporary American writer, best known for his novel "Fight Club." However, Palahniuk's other works, such as "Survivor," "Lullaby," and "Haunted," have also received numerous awards, with some adapted into successful films. Palahniuk's style is distinctive, featuring short, punchy sentences, vivid and memorable imagery, biting satire, and dark humor. "Fight Club" is Chuck Palahniuk's most famous novel. Remember David Fincher's film starring Brad Pitt? It was based on this book. This is a novel of defiance, written against all odds, portraying a generation of embittered people who have lost their sense of right and wrong, good and evil, and their understanding of themselves and those around them. Palahniuk himself calls his "Fight Club" the new "Great Gatsby."`,
  authors: [authors.PALAHNIUK],
  publicationYear: 2018,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const BLACK_SWAN_2021: AbstractBook = {
  id: 3,
  name: "The Black Swan",
  description: `In just the last decade, humanity has faced a series of devastating disasters, upheavals, and catastrophes that defy even the most imaginative predictions. Sorbonne graduate and New York financial expert Nassim Taleb calls these unpredictable events Black Swans. He argues that such events are the driving force behind both history as a whole and the existence of each individual. To succeed, one must be prepared for them. Immediately after the release of “The Black Swan,” the author demonstrated his "non-theory" brilliantly in practice: during the financial crisis, Taleb's company earned (rather than lost!) half a billion dollars for its investors. However, this book is not an economics textbook. It is the reflections of an extraordinary thinker on life and how to find one's place in it. In a later essay postscript, “On Robustness and Fragility,” Taleb offers a sharp and witty rebuttal to orthodox economists who criticized his anti-theory. The book also includes a collection of Nassim Taleb's aphorisms, providing a brilliant distillation of his original ideas.`,
  authors: [authors.TALEB],
  publicationYear: 2021,
  publishingHouse: publishers.COLLINS,
  category: categories.BUSINESS,
}

export const CHOKE_2006: AbstractBook = {
  id: 24,
  name: "Choke",
  description: `A story about a young con artist who fakes choking incidents in upscale restaurants every day—and makes a decent living from it... A tale of sex addicts, alcoholics, and shopaholics. Of love, friendship, and philosophy. Of a dubious "second coming"—and the undeniable "unbearable lightness of being" in our times. However... as Palahniuk himself says about the book: "Planning to read it? Don't bother!" In short—read at your own risk!`,
  authors: [authors.PALAHNIUK],
  publicationYear: 2006,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const CORALINE_2002: AbstractBook = {
  id: 5,
  name: "Coraline",
  description:
    "It tells the story of Coraline Jones, a curious girl who discovers a secret door in her new home. Behind it lies a parallel world that seems perfect—until she realizes its dangers. The Other Mother, a sinister figure with button eyes, wants to keep Coraline forever. To escape, Coraline must use her bravery and intelligence to outsmart the Other Mother and save lost souls trapped in the eerie world. The book explores themes of courage, curiosity, and the importance of real love over illusions. It was later adapted into a 2009 stop-motion film.",
  authors: [authors.NEIL_GAIMAN],
  publicationYear: 2002,
  publishingHouse: publishers.SIMON_SHUSTER,
  category: categories.IMAGINATIVE,
}

export const THE_OLD_MAN_AND_THE_SEA_1952: AbstractBook = {
  id: 6,
  name: "The Old Man and the Sea",
  description:
    "This novella tells the story of Santiago, an elderly Cuban fisherman who has gone 84 days without catching a fish. Determined to prove his skill and strength, he sets out far into the Gulf Stream and hooks a massive marlin. The story follows his exhausting battle with the fish, symbolizing a larger struggle between man and nature. Themes of perseverance, isolation, and the human condition are explored in this timeless narrative, ultimately earning Hemingway the Pulitzer Prize for Fiction.",
  authors: [authors.HEMINGWAY],
  publicationYear: 1952,
  publishingHouse: publishers.MACMILLAN,
  category: categories.IMAGINATIVE,
}

export const ISLAND_1962: AbstractBook = {
  id: 30,
  name: "Island",
  description: `"Island" is Aldous Huxley’s utopian novel, presenting an ideal society on the isolated island of Pala. Journalist Will Farnaby arrives there and discovers a harmonious culture that blends science, spirituality, and psychedelics. Unlike dystopian worlds, Pala embraces mindfulness, education, and balanced living. However, external forces threaten its existence. The novel contrasts Huxley’s "Brave New World", offering a vision of an enlightened society that might be doomed by outside greed and.`,
  authors: [authors.HUXLEY],
  publicationYear: 1962,
  publishingHouse: publishers.SIMON_SHUSTER,
  category: categories.IMAGINATIVE,
}

export const PRESS_RESET_2021: AbstractBook = {
  id: 1,
  name: "Press Reset",
  description:
    "This book explores the instability of the video game industry, focusing on studio closures and layoffs. Through real stories from developers behind games like Bioshock, Epic Mickey, and Dishonored, the book reveals how talented teams are often dismantled despite success. Schreier examines the industry’s harsh work conditions, lack of job security, and the struggles of developers trying to rebuild their careers after studio shutdowns.",
  authors: [authors.SCHREIER],
  publicationYear: 2021,
  publishingHouse: publishers.PENGUINS,
  category: categories.BUSINESS,
}

export const SUN_ALSO_RISES_1926: AbstractBook = {
  id: 9,
  name: "The Sun Also Rises",
  description: `This novel follows a group of expatriates living in post-World War I Europe, particularly focusing on the lives of journalists and writers. The protagonist, Jake Barnes, struggles with his personal and professional identity, while grappling with his unrequited love for Lady Brett Ashley. The story delves into themes of aimlessness, disillusionment, and the "lost generation" that came of age during and after the war. The novel captures the reckless, often hedonistic lives of the characters as they seek meaning in a world that has been irrevocably changed by the war.`,
  authors: [authors.HEMINGWAY],
  publicationYear: 1926,
  publishingHouse: publishers.HACHETTE,
  category: categories.IMAGINATIVE,
}

export const GARDEN_OF_EDEN_1986: AbstractBook = {
  id: 10,
  name: "The Garden of Eden",
  description: `Published posthumously, this novel explores themes of identity, sexuality, and the complexity of relationships. The protagonist, David Bourne, is a young American writer on a European vacation with his wife Catherine. Their unconventional relationship begins to unravel as they experiment with their sexual boundaries, leading to jealousy and tension. Hemingway’s exploration of gender roles, passion, and creative expression gives the novel a distinct psychological depth. It's one of his most experimental works, with much of the narrative revolving around introspection and the dynamics of power in relationships.`,
  authors: [authors.HEMINGWAY],
  publicationYear: 1986,
  publishingHouse: publishers.MACMILLAN,
  category: categories.IMAGINATIVE,
}

export const GREEN_HILLS_OF_AFRICA_1935: AbstractBook = {
  id: 15,
  name: "Green Hills of Africa",
  description: `This non-fiction work recounts Hemingway's safari in East Africa, a journey he embarked upon with his wife, Pauline. The book mixes adventure with reflection, as Hemingway not only details the hunting experiences—such as stalking big game—but also offers a series of meditations on life, writing, and the nature of the African landscape. The narrative captures the thrill of the hunt while also examining deeper themes of masculinity and human existence, providing readers with a glimpse into Hemingway’s personal philosophy and passions.`,
  authors: [authors.HEMINGWAY],
  publicationYear: 1935,
  publishingHouse: publishers.MACMILLAN,
  category: categories.IMAGINATIVE,
}

export const HAVE_AND_HAVE_NOT_1937: AbstractBook = {
  id: 12,
  name: "To Have and Have Not",
  description: `Set in the Depression-era Florida Keys, this novel follows Harry Morgan, a fisherman who turns to smuggling to survive. As Morgan navigates a world of crime, betrayal, and moral ambiguity, Hemingway examines the social and economic divides between the "haves" and the "have-nots." The novel explores themes of survival, integrity, and the complex human nature of its characters, showing the harsh realities of life in the tough times of the Great Depression. It's a gritty portrayal of moral conflict in a world where the lines between right and wrong are often blurred.`,
  authors: [authors.HEMINGWAY],
  publicationYear: 1937,
  publishingHouse: publishers.HACHETTE,
  category: categories.IMAGINATIVE,
}

export const BOYS_WILL_1913: AbstractBook = {
  id: 13,
  name: "A Boy's Will",
  description: `This was Frost's first published collection, and it established him as a significant voice in American poetry. The poems in this book reflect Frost's youth and early years in New England. They show a blend of introspection and natural imagery, focusing on the experiences of growing up, nature's power, and the complexities of human emotions. This collection set the tone for Frost's later works, with its deep connection to rural life and the existential musings that would come to characterize his poetry.`,
  authors: [authors.FROST],
  publicationYear: 1913,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const NORTH_OF_BOSTON_1914: AbstractBook = {
  id: 29,
  name: "North of Boston",
  description: `Published a year after "A Boy's Will," this collection brought Robert Frost wide recognition and cemented his reputation. It contains some of his most well-known works, including "Mending Wall," which addresses the paradox of boundaries and the complexities of human relationships, and "The Death of the Hired Man," which deals with the themes of duty, belonging, and human compassion. The poems are filled with the dialogue of rural New Englanders, and the collection explores personal relationships, moral choices, and the balance between isolation and community. This book marks Frost's transition into a more mature, philosophical poet, drawing heavily on the landscape and culture of New England.`,
  authors: [authors.FROST],
  publicationYear: 1914,
  publishingHouse: publishers.HACHETTE,
  category: categories.IMAGINATIVE,
}

export const MOUNTAIN_INTERVAL_1916: AbstractBook = {
  id: 11,
  name: "Mountain Interval",
  description: `This collection includes some of Frost's most beloved and famous poems, particularly "The Road Not Taken." This poem, which explores the theme of choice and the uncertainty of life's path, became one of Frost's most iconic works. The collection blends personal reflection with profound universal questions, exploring not only the literal New England countryside but also the mental and emotional landscapes that accompany human decisions. The poems in "Mountain Interval" reflect a deep connection to nature but also show Frost’s growing philosophical complexity, addressing the implications of personal decisions and existential dilemmas.`,
  authors: [authors.FROST],
  publicationYear: 1916,
  publishingHouse: publishers.SCHOLASTIC,
  category: categories.IMAGINATIVE,
}

export const NEW_HAMPSHIRE_1923: AbstractBook = {
  id: 16,
  name: "New Hampshire",
  description: `Frost’s fourth collection won him the first of his four Pulitzer Prizes for Poetry. "New Hampshire" takes a more mature, reflective tone and explores themes of human relationships, the passage of time, and the isolation found in rural life. The poems are both intimate and universal, grappling with topics such as loneliness, aging, death, and the persistence of memory. Frost also continued to explore the interaction between humans and nature, using the New England landscape as a lens through which to explore broader philosophical issues. This collection is marked by a sense of quiet contemplation and personal insight.`,
  authors: [authors.FROST],
  publicationYear: 1923,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const ROAD_TO_WIGAN_PIER_1937: AbstractBook = {
  id: 17,
  name: "The Road to Wigan Pier",
  description:
    "This book is George Orwell’s documentary work exploring poverty and class struggles in 1930s Britain. The first part vividly describes the harsh living and working conditions of coal miners in Northern England, highlighting their struggles with poverty and poor housing. The second part is a critique of socialism, class prejudice, and economic inequality, where Orwell argues for a more practical and human-centered socialism. The book blends journalistic investigation with political analysis, shaping Orwell’s later views on totalitarianism and social justice.",
  authors: [authors.ORWELL],
  publicationYear: 1937,
  publishingHouse: publishers.PENGUINS,
  category: categories.NOT_IMAGINATIVE,
}

export const STEEPLE_BUSH_1947: AbstractBook = {
  id: 18,
  name: "Steeple Bush",
  description: `This is one of Frost's later collections, and it shows a poet grappling with the inevitable passage of time and the personal reckonings that accompany it. The poems in "Steeple Bush" are often focused on themes of aging, the loss of loved ones, and the complexity of human relationships. While still rooted in the familiar New England setting, this collection reflects a more meditative and resigned perspective on life. Frost uses the rural landscape not just as a backdrop but as an active participant in his meditation on life, death, and the cycles of nature. The collection is quieter, more introspective, and conveys a sense of coming to terms with one's place in the world.`,
  authors: [authors.FROST],
  publicationYear: 1947,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const CLEAN_CODE_2019: AbstractBook = {
  id: 19,
  name: "Clean Code: A Handbook of Agile Software Craftsmanship",
  description: `Even poorly written code can function. However, if code isn't "clean," it will inevitably hinder project development and burden the developer with excessive maintenance effort. This book is about good programming practices. It is filled with real-world code examples. We will examine code from various perspectives: top-down, bottom-up, and even inside-out. By the end of the book, you will gain a wealth of knowledge about code. More importantly, you will learn to distinguish between good and bad code. You will understand how to write good code and how to transform bad code into clean, efficient code. The book is divided into three parts. The first part explains the principles, patterns, and techniques of writing clean code, supported by numerous examples. The second part consists of practical exercises of increasing complexity, focusing on cleaning code or refactoring problematic code into a cleaner, more manageable form. The third part is a distilled essence of the book, containing a single chapter with a list of heuristics and "code smells" gathered during the analysis. This part serves as a knowledge base to guide you in reading, writing, and cleaning code.`,
  authors: [authors.BOB_MARTIN],
  publicationYear: 2019,
  publishingHouse: publishers.BLOOMSBURY,
  category: categories.NOT_IMAGINATIVE,
}

export const PERFECT_PROGRAMMER_2021: AbstractBook = {
  id: 28,
  name: "The Perfect Programmer: How to Become a Software Development Professional",
  description: `All successful software developers share one common trait: they prioritize the quality of the software they create. This is their foundation because they are true professionals. In this book, legendary expert Robert Martin (better known in the community as "Uncle Bob"), author of the bestseller "Clean Code," explores what it means to be a professional programmer. He delves into the methods, tools, and practices necessary to develop "perfect software." The book is packed with practical advice on all aspects of programming: from project evaluation and writing code to refactoring and testing. This book is more than just a guide to techniques—it's a comprehensive exploration of the professional mindset essential for successful software development.`,
  authors: [authors.BOB_MARTIN],
  publicationYear: 2021,
  publishingHouse: publishers.BLOOMSBURY,
  category: categories.NOT_IMAGINATIVE,
}

export const BLOOD_PIXELS_2018: AbstractBook = {
  id: 21,
  name: "Blood, Sweat, and Pixels: The Untold Stories Behind Video Game Development (2nd Edition)",
  description: `Why did Diablo III almost become Blizzard's biggest failure? How did Halo turn into a strategy game? What challenges did the studio behind Uncharted face? Discover everything you wanted to know about the making of The Witcher 3 and Destiny, as well as many other exclusive stories shared by the creators of the most popular games of the past decade. Learn why the video game industry is not just about prestige and high salaries, but also a test of resilience and endurance that not everyone can pass. An Amazon bestseller and a national bestseller in the USA.`,
  authors: [authors.SCHREIER],
  publicationYear: 2018,
  publishingHouse: publishers.OXFORD,
  category: categories.BUSINESS,
}

export const GOOD_OMENS_1990: AbstractBook = {
  id: 22,
  name: "Good Omens",
  description: `This comedic fantasy novel follows the unlikely partnership between an angel, Aziraphale, and a demon, Crowley, who have grown fond of Earth over the centuries. As the prophesied apocalypse approaches in 11 days, they decide to team up to prevent it. However, things go awry when they realize that the Antichrist has been misplaced and is a young boy who doesn't quite understand his role in the end of the world. The novel blends satire, dark humor, and a mix of quirky characters, with a plot that explores the clash between good and evil, destiny, and free will.`,
  authors: [authors.NEIL_GAIMAN, authors.TERRY_PRATCHETT],
  publicationYear: 1990,
  publishingHouse: publishers.WILEY,
  category: categories.IMAGINATIVE,
}

export const RISKING_SKIN_2021: AbstractBook = {
  id: 23,
  name: "Skin in the Game: Hidden Asymmetries in Daily Life",
  description: `In his new, sharply provocative yet profoundly pragmatic book, the inimitable Nassim Nicholas Taleb explains the importance of identifying and filtering nonsense, distinguishing theory from practice, and superficial competence from true expertise. You'll learn about rationality in complex systems and the real world, the concepts of symmetry and asymmetry, and the logic of risk-taking. By redefining familiar concepts like “fair society,” “professional success,” and “personal responsibility,” and unafraid to challenge the egos of recognized idols, Taleb debunks the hypocritical ideas and actions of war interventionists, stock market investors, and religious preachers. Drawing on examples from Hammurabi and Jesus Christ to Roman and Byzantine emperors, Seneca, and Donald Trump, Taleb demonstrates that the most important quality shared by celebrated heroes, selfless saints, and brilliant entrepreneurs is their refusal to shift risks onto others. “I love being surprised. Following the principle of mutual benefit, I invite readers on a journey that I myself would enjoy.” (Nassim Nicholas Taleb)`,
  authors: [authors.TALEB],
  publicationYear: 2021,
  publishingHouse: publishers.COLLINS,
  category: categories.BUSINESS,
}

export const REFACTORING_2008: AbstractBook = {
  id: 4,
  name: "Refactoring: Improving the Design of Existing Code",
  description:
    "Refactoring is a disciplined approach to improving the structural integrity and performance of existing programs. Developed through the efforts of experts in object-oriented programming, this book defines the principles and best practices for refactoring, providing clarity on when and how to delve into code for improvement. Each step in refactoring is straightforward: moving a field from one class to another, extracting a code fragment into its own method, or even shifting code across class hierarchies. While each individual step may seem simple, the cumulative effect of these small changes can dramatically improve a project or even prevent the decay of poorly designed software. Martin Fowler, along with his co-authors, sheds light on the refactoring process, explaining where and when to start the in-depth study of code. The core of the book includes a comprehensive list of over 70 refactoring methods, detailing their motivation and techniques, with practical examples primarily in Java. These methods enable step-by-step code modifications, minimizing risks associated with project development.",
  authors: [authors.MARTIN_FAULER],
  publicationYear: 2008,
  publishingHouse: publishers.SPRINGER,
  category: categories.NOT_IMAGINATIVE,
}

export const N1984_2013: AbstractBook = {
  id: 25,
  name: "1984",
  description: `A counterpoint to the second great dystopia of the 20th century, Aldous Huxley's "Brave New World." What is truly more terrifying: a consumerist society taken to the extreme, or an absolutist "society of ideas"? According to Orwell, there is nothing more horrifying than total lack of freedom...`,
  authors: [authors.ORWELL],
  publicationYear: 2013,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const BRAVE_NEW_WORLD_2017: AbstractBook = {
  id: 26,
  name: "Brave New World",
  description: `"Brave New World" is the iconic dystopian novel by Aldous Huxley, published in millions of copies worldwide. The novel depicts a genetically programmed "consumer society," a society of "universal happiness," in which unfolds the tragic story of a man who becomes an outsider in this world...`,
  authors: [authors.HUXLEY],
  publicationYear: 2017,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const WITCHER_GE_2020: AbstractBook = {
  id: 27,
  name: "The Witcher: Gift Edition",
  description: `One of the best fantasy sagas in the history of the genre. An original, large-scale epic work, simultaneously free from external influence and rooted in classical mythological, legendary, and fairy tale traditions. A masterpiece not only of Andrzej Sapkowski's literary craftsmanship but also of the translation artistry of Yevgeny Pavlovich Vaisbrot. "The Saga of Geralt" in one volume. A priceless gift both for fans of fine fantasy and for those who simply appreciate good literature. The reader is transported into the extraordinary, beautiful, and brutal world of a literary legend inhabited by elves, dwarfs, werewolves, vampires, hobbits, dragons, and monsters – but above all, by HUMANS. Very close to us, understandable, and human people – like the swordmaster witcher Geralt, his friend, the carefree minstrel Dandelion, his lover, the beautiful sorceress Yennefer, and his adopted daughter – the recklessly brave young Ciri… The contents of "The Witcher" collection: Gift Edition: The Last Wish; Sword of Destiny; The Blood of Elves; Time of Contempt; Baptism of Fire; The Tower of the Swallow; Lady of the Lake;`,
  authors: [authors.SAPKOWSKI],
  publicationYear: 2020,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const WITCHER__SWALLOW_TOWER_2016: AbstractBook = {
  id: 20,
  name: "The Witcher: The Tower of the Swallow",
  description: `Something is coming to an end. Tedd Deireadh, the Time of End... This is felt in the air and water, in the rustle of grass and the hum of winds, in the blood of sunsets and the dazzling flashes of the northern lights on the jagged peaks of the majestic black tower. The place that leads the ash-haired girl on a raven stallion – through a blood-soaked inn of friends… through a blood-soaked battlefield of fighters… across the ice of Lake Tarn Mira soaked with enemy blood. It's not about the suffering you endure. It's about how you endure it. And in the name of what. Only one who understands this truth can enter Tor Zireael. The Tower of the Swallow. Andrzej Sapkowski's saga has long occupied an honorary place in the world fantasy genre, and Geralt has become a cult character not only in literature but also in the universe of video games. The sixth book in the "Witcher" series is released for the first time with illustrations by Denis Gordeev, created specifically for this edition.`,
  authors: [authors.SAPKOWSKI],
  publicationYear: 2016,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const WITCHER__THUNDER_SEASON_2016: AbstractBook = {
  id: 14,
  name: "The Witcher: Season of Storms",
  description: `It has happened! Fifteen years after the final chapter of Geralt of Rivia's adventures was written, his creator gifts all fans of his talent with one more encounter with the white-haired witcher. An unexpected meeting — and all the more thrilling and desired for it. What is a witcher without his famous swords and a sorceress without her magic? Can a beast find humanity within, and a human tame the beast inside? What can the weaknesses of the powerful bring? Can one return from a place from which there is no return, if one is desperately needed here and now? Andrzej Sapkowski's saga has long held an honorary place in the world of the fantasy genre, and Geralt has become a cult character not only in literature but also in the universe of video games. The eighth book in the "Witcher" series is released for the first time with illustrations by Denis Gordeev, created specifically for this edition.`,
  authors: [authors.SAPKOWSKI],
  publicationYear: 2016,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const WITCHER__LAST_WISH_2016: AbstractBook = {
  id: 7,
  name: "The Witcher: The Last Wish",
  description: `The book "The Last Wish" begins one of the best fantasy cycles in history. Seven novellas about Geralt of Rivia, his friends and lovers, his difficult "job" of exterminating all kinds of monsters, and a world inhabited by elves, dwarves, werewolves, dragons, and of course, humans — with all their passions, vices, and virtues. Andrzej Sapkowski's saga has long held an honorary place in the world of fantasy, and Geralt has become a cult character not only in literature but also in the universe of video games. Andrzej's audience is steadily growing, and we are happy to contribute to this by releasing the first book about the Witcher with illustrations created specifically for this edition.`,
  authors: [authors.SAPKOWSKI],
  publicationYear: 2016,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const GOT__DANCE_OF_DRAGONS_2019: AbstractBook = {
  id: 31,
  name: "Game of Thrones: Dance with Dragons. Dreams and Dust",
  description: `"The war is drawing to a close, but Westeros is still bleeding." An expansion for the "Game of Thrones" board game that introduces innovations that will dramatically change the gameplay. Attention! This is not a standalone game. You will need the base "Game of Thrones: Second Edition" board game. Key features of the game: 1) "Dance with Dragons" - an expansion to the cult board game "Game of Thrones". 2) The new expansion introduces 42 new House cards. With new character cards such as Mance Rayder and Jon Snow, Qyburn and Quentyn Martell, Walder Frey and Ramsay Bolton, battles will gain strategic depth. 3) The dynamic "Dance with Dragons" scenario for 6 experienced players recreates the key events from the latest books in the "A Song of Ice and Fire" epic: the Battle of Winterfell, the Iron Fleet invasion of the Reach, the siege of Dragonstone, and many more.`,
  authors: [authors.GEORGE_MARTIN],
  publicationYear: 2019,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const GOT__STORM_OF_SWORDS_2018: AbstractBook = {
  id: 2,
  name: "Game of Thrones: A Storm of Swords",
  description: `Before you is the third chronicle in the "A Song of Ice and Fire" cycle. An epic, finely crafted saga about the world of the Seven Kingdoms. A world of harsh lands of eternal cold and joyous lands of eternal summer. A world of lords and heroes, warriors and mages, sorcerers and assassins—all united by Fate to fulfill an ancient prophecy. A world of dangerous adventures, great deeds, and intricate political intrigues. The Iron Throne of the Seven Kingdoms is shaken in a fierce struggle. Former allies betray each other, and good friends become the bitterest enemies. In an impregnable castle, a powerful sorceress weaves an intricate conspiracy... In the far cold lands, the young ruler of the North, Robb Stark, gathers strength... New warriors rally under the banners of Daenerys Targaryen, the last of the dragons... But now the Others—the army of the living dead—enter the growing conflict, a force that can be stopped neither by weapons nor magic. A storm of swords approaches the Seven Kingdoms, and many will fall in this storm...`,
  authors: [authors.GEORGE_MARTIN],
  publicationYear: 2018,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const GOT__FEAST_FOR_CROWS_2012: AbstractBook = {
  id: 33,
  name: "Game of Thrones: A Feast for Crows",
  description: `Before you is the fourth chronicle in the "A Song of Ice and Fire" cycle. An epic, finely crafted saga about the world of the Seven Kingdoms. A world of harsh lands of eternal cold and joyous lands of eternal summer. A world of lords and heroes, warriors and mages, sorcerers and assassins—all united by Fate to fulfill an ancient prophecy. A world of dangerous adventures, great deeds, and intricate political intrigues. The War of the Five Kings has finally ended, and the House Lannister, along with its allies, celebrates its victory. However, peace and tranquility are still far away! The ruler of the North, Robb Stark, managed to suppress the rebellion in the far northern lands, but his kin seem too weak to hold the conquered territories... Once again, bandits, renegades, and surviving rebels are gathering. A deadly threat once again looms over the Iron Throne of the Seven Kingdoms—and vultures are already sensing the approach of a new feast...`,
  authors: [authors.GEORGE_MARTIN],
  publicationYear: 2012,
  publishingHouse: publishers.PENGUINS,
  category: categories.IMAGINATIVE,
}

export const getBookString = (entity: AbstractBook) => {
  const author = entity.authors.map(authors.getShortname).join(", ")
  const publisher = publishers.getNameString(entity.publishingHouse)
  const book = `${entity.name}, ${entity.publicationYear}`

  return `${author} — ${book} (${publisher})`
}

export const getPrice = (book: AbstractBook) => {
  const fullTitle = getBookString(book)
  const pseudoFactor = fullTitle.length % 4
  const factor = pseudoFactor + 2

  return (factor * 50) / 10
}

export const getPopular = () => [REFACTORING_2008, DIARY_2003, CLEAN_CODE_2019, WITCHER_GE_2020]

export const getAll = () =>
  [
    DIARY_2003,
    FIGHT_CLUB_2018,
    BLACK_SWAN_2021,
    CHOKE_2006,
    CORALINE_2002,
    THE_OLD_MAN_AND_THE_SEA_1952,
    ISLAND_1962,
    PRESS_RESET_2021,
    SUN_ALSO_RISES_1926,
    GARDEN_OF_EDEN_1986,
    GREEN_HILLS_OF_AFRICA_1935,
    HAVE_AND_HAVE_NOT_1937,
    BOYS_WILL_1913,
    NORTH_OF_BOSTON_1914,
    MOUNTAIN_INTERVAL_1916,
    NEW_HAMPSHIRE_1923,
    ROAD_TO_WIGAN_PIER_1937,
    STEEPLE_BUSH_1947,
    CLEAN_CODE_2019,
    PERFECT_PROGRAMMER_2021,
    BLOOD_PIXELS_2018,
    GOOD_OMENS_1990,
    RISKING_SKIN_2021,
    REFACTORING_2008,
    N1984_2013,
    BRAVE_NEW_WORLD_2017,
    WITCHER_GE_2020,
    WITCHER__SWALLOW_TOWER_2016,
    WITCHER__THUNDER_SEASON_2016,
    WITCHER__LAST_WISH_2016,
    GOT__DANCE_OF_DRAGONS_2019,
    GOT__STORM_OF_SWORDS_2018,
    GOT__FEAST_FOR_CROWS_2012,
  ].sort((a, b) => a.id - b.id)

export const getById = (bookId: number) => {
  return getAll().find(b => b.id === bookId)
}

export const getByIds = (bookIds: number[]) => {
  return bookIds.map(id => getById(id)!)
}

const SORTING_TYPE = {
  1: "NOVELTY" as const,
  2: "PRICE" as const,
  3: "TIME" as const,
  4: "POPULARITY" as const,
}

type GetListParams = {
  filters: {
    search?: string
    authors?: number[]
    publishers?: number[]
    categories?: number[]
    prices?: {
      from: number
      to: number
    }
    tariff?: number
    existsOnly?: boolean
    // !!! FIXME: Horrible, fix it later!
    getRentInfoBy?: (book: AbstractBook) => {
      duration: number
      status: "OUT_STOCK" | "RENTABLE" | "RESERVABLE" | "OWN"
    }
  }
  orderby?: number
}

export const getList = (params: GetListParams) => {
  const { filters, orderby } = params
  const books = getAll()
  // FIXME: refine search
  // FIXME: simplify format
  const filtered = books
    .filter(book => {
      if (!filters.search) return true
      const parsedSearch = filters.search.split("+").join(" ")
      return new RegExp(parsedSearch, "i").test(getBookString(book))
    })
    .filter(book => {
      if (!filters.publishers?.length) return true
      return filters.publishers.includes(book.publishingHouse.id)
    })
    .filter(book => {
      if (!filters.authors?.length) return true
      return book.authors.some(a => filters.authors?.includes(a.id))
    })
    .filter(book => {
      if (!filters.categories?.length) return true
      return filters.categories?.includes(book.category.id)
    })
    .filter(book => {
      const price = getPrice(book)
      if (!filters.prices) return true
      return filters.prices.from <= price && price <= filters.prices.to
    })
    .filter(book => {
      if (!filters.tariff || !filters.getRentInfoBy) return true
      const { duration } = filters.getRentInfoBy(book)
      return filters.tariff <= duration
    })
    .filter(book => {
      if (!filters.existsOnly || !filters.getRentInfoBy) return true
      const { status } = filters.getRentInfoBy(book)
      return status === "RENTABLE" || status === "OWN"
    })
  // .filter((book) => {
  //     if (!filters.exclude) return true;
  //     return !filters.exclude.includes(book.id);
  // });

  if (!orderby) return filtered

  const sorting = SORTING_TYPE[orderby as keyof typeof SORTING_TYPE]

  switch (sorting) {
    case "NOVELTY":
      return filtered.sort((a, b) => b.id - a.id)
    case "POPULARITY":
      return filtered.sort((a, b) => getPopularity(b) - getPopularity(a))
    case "PRICE":
      return filtered.sort((a, b) => getPrice(a) - getPrice(b))
    case "TIME":
      if (filters.getRentInfoBy === undefined) return filtered

      return filtered.sort((a, b) => filters.getRentInfoBy!(b).duration - filters.getRentInfoBy!(a).duration)
    default:
      return filtered
  }
}

export const getShortname = (entity: AbstractBook) => {
  const author = entity.authors.map(authors.getShortname).join(", ")
  const book = `${entity.name}`

  return `${author} — ${book}`
}

export const getPopularity = (book: AbstractBook) => {
  if (isPopular(book)) return 5
  const fullTitle = getBookString(book)
  const pseudoFactor = fullTitle.length % 5
  return pseudoFactor
}

export const isPopular = (book: AbstractBook) =>
  getPopular()
    .map(it => it.id)
    .includes(book.id)
