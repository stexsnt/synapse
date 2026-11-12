/* ============================================================
   CONTENU PÉDAGOGIQUE — adapté du livret « L'intelligence artificielle en SNT ».
   Les évaluations du livret et leurs corrigés ne figurent PAS sur le site.

   Types d'étapes :
     lecon   : { t, titre, texte (HTML), code? (exemple exécutable), synthese? }
     qcm     : { t, titre?, q, doc? (HTML), code?, choix:[...], bon | bons:[...], expl, retours?:[...] }
     tri     : { t, titre, q, doc?, categories:[...], items:[{ txt, cat, expl }], expl? }
     ordre   : { t, titre?, q, lignes:[...dans le bon ordre], attendu?, texte?: true, expl? }
               (texte: true = phrases à ranger, validées par leur ordre ; sinon programme exécuté)
     quiz    : { t, titre, intro?, doc?, code?, widget?: "knn" | "pixels" | "perceptron" | "generateur", questions:[{ q, choix, bon, expl }] }
     atelier : { t, titre, intro?, objectifs:[{ consigne, entrees:[noms], poids:[valeurs de départ], min, max, pas,
                 biais?:{ val, min, max, pas }, seuil?, cible: "amis" | "et" | "ou", expl }] }
               (curseurs pour régler les poids d'un neurone ; la sortie vaut 1 si la somme dépasse le seuil)
     predire : { t, titre?, code, attendu, expl }
     code    : { t, titre, enonce, depart, solution, d, tests, caches?, indices, requis?, interdit? }

   Ajoutez les nouvelles étapes À LA FIN d'un chapitre : la progression est enregistrée par position.
   ============================================================ */

const INSECTES_PY = `from math import sqrt

# Insectes connus : (corps, antennes, étiquette), longueurs en cm
insectes = [
    (4.5, 5.0, "sauterelle"), (5.0, 6.0, "sauterelle"), (3.5, 4.5, "sauterelle"),
    (4.0, 5.5, "sauterelle"), (5.5, 5.0, "sauterelle"), (3.0, 4.0, "sauterelle"),
    (3.0, 1.0, "criquet"), (4.0, 1.5, "criquet"), (5.0, 1.2, "criquet"),
    (3.5, 0.8, "criquet"), (4.5, 2.0, "criquet"), (2.5, 1.5, "criquet")]

def distance(x1, y1, x2, y2):
    return sqrt((x2 - x1)**2 + (y2 - y1)**2)
`;

const ELISE_PY = `def repondre(phrase):
    phrase = phrase.lower()          # on met tout en minuscules
    if "bonjour" in phrase or "salut" in phrase:
        return "Bonjour ! Comment vas-tu aujourd'hui ?"
    elif "fatigu" in phrase:
        return "Pourquoi te sens-tu fatigué(e) ?"
    elif "maths" in phrase:
        return "Parle-moi de ton cours de maths."
    elif "?" in phrase:
        return "Bonne question. Qu'en penses-tu, toi ?"
    else:
        return "Je vois. Peux-tu m'en dire plus ?"
`;

const TABLE_ZIPS = `<table class="donnees"><thead><tr><th>Créature</th><th>Taille (cm)</th><th>Yeux</th><th>Couleur</th><th>Antennes</th><th>Espèce</th></tr></thead><tbody>
<tr><td>1</td><td>12</td><td>2</td><td>verte</td><td>oui</td><th>Zip</th></tr><tr><td>2</td><td>30</td><td>1</td><td>rouge</td><td>non</td><th>Glop</th></tr>
<tr><td>3</td><td>15</td><td>3</td><td>verte</td><td>oui</td><th>Zip</th></tr><tr><td>4</td><td>25</td><td>2</td><td>bleue</td><td>non</td><th>Glop</th></tr>
<tr><td>5</td><td>10</td><td>2</td><td>verte</td><td>oui</td><th>Zip</th></tr><tr><td>6</td><td>28</td><td>3</td><td>rouge</td><td>non</td><th>Glop</th></tr>
<tr><td>7</td><td>18</td><td>1</td><td>bleue</td><td>oui</td><th>Zip</th></tr><tr><td>8</td><td>22</td><td>2</td><td>verte</td><td>non</td><th>Glop</th></tr></tbody></table>`;

const HISTO_PY = `# Décisions passées : (note du dossier, groupe, décision : 1 = admis, 0 = refusé)
historique = [
    (15, "A", 1), (12, "A", 1), (9, "A", 0), (13, "A", 1),
    (11, "A", 0), (17, "A", 1), (14, "A", 1), (10, "A", 0),
    (15, "B", 0), (12, "B", 0), (17, "B", 1), (14, "B", 0),
    (18, "B", 1), (9, "B", 0), (16, "B", 1), (13, "B", 0)]
`;
const PARCOURS = [
{
  id: "p1", titre: "Fonctionnement technique", sous: "Comprendre comment fonctionne une IA, sans prérequis scientifique avancé",
  chapitres: [
  {
    id: "c1", num: 1, titre: "Qu'est-ce que l'intelligence artificielle ?", resume: "Définir l'IA, son histoire, ses grandes familles",
    etapes: [
      { t: "qcm", titre: "Le vrai ou le pastiche ?",
        q: "L'un de ces deux textes a été écrit par Paul Verlaine en 1866. L'autre a été généré par une IA à qui l'on a demandé « une strophe à la manière de Verlaine ». Lequel est de Verlaine ?",
        doc: `<div class="deux-textes"><figure><figcaption>Texte 1</figcaption><p>Le vent qui passe<br>Sur la terrasse<br>Du soir gris<br>Froisse et efface<br>La lente trace<br>De nos cris.</p></figure><figure><figcaption>Texte 2</figcaption><p>Les sanglots longs<br>Des violons<br>De l'automne<br>Blessent mon cœur<br>D'une langueur<br>Monotone.</p></figure></div>`,
        choix: ["Le texte 1", "Le texte 2"], bon: 1,
        expl: "Le texte 2 est la première strophe de « Chanson d'automne » (Poèmes saturniens, 1866). Le texte 1 a été généré par une IA : il imite la forme du poème (vers de 4, 4 et 3 syllabes, rimes) et son ambiance mélancolique. Si tu as reconnu Verlaine, est-ce grâce à son style, ou parce que tu connaissais déjà le poème ? Une imitation de forme peut être très convaincante." },
      { t: "lecon", titre: "Le test de Turing",
        texte: `<p>En 1950, le mathématicien britannique Alan Turing pose une question étonnante : « Les machines peuvent-elles penser ? ». Plutôt que d'y répondre directement, il propose un jeu : si, au cours d'une conversation écrite, on ne parvient pas à distinguer une machine d'un être humain, alors la machine imite l'intelligence humaine de façon convaincante. Ce jeu est resté célèbre sous le nom de <strong>test de Turing</strong>.</p>
<p>Les indices auxquels on pense spontanément (réponse plus longue, plus « propre », sans faute, ton très poli) ne sont pas fiables : un élève peut écrire sans faute, et une IA peut imiter des fautes ou inventer un souvenir si on le lui demande.</p>
<aside class="savoir"><strong>Le savais-tu ?</strong> Turing pensait qu'avant l'an 2000, une machine pourrait tromper un interrogateur moyen dans environ un cas sur trois, après cinq minutes de conversation. Aujourd'hui, les assistants conversationnels trompent souvent les humains sur des échanges courts. Mais les chercheurs s'accordent sur un point : réussir à <em>imiter</em> une conversation ne prouve pas que l'on <em>comprend</em> ce que l'on dit.</aside>` },
      { t: "qcm", titre: "Ce que mesure le test", q: "Le test de Turing cherche à savoir si une machine…",
        choix: ["calcule plus vite qu'un humain.", "peut se faire passer pour un humain dans une conversation écrite.", "est consciente.", "consomme peu d'énergie."], bon: 1,
        expl: "Le test mesure une apparence, observée de l'extérieur : la capacité à imiter une conversation humaine. Il ne dit rien de la conscience ni de la compréhension." },
      { t: "lecon", titre: "Une définition",
        texte: `<p>L'<strong>intelligence artificielle</strong> (IA) est un domaine de l'informatique qui cherche à concevoir des programmes capables de réaliser des tâches qui, chez l'être humain, demandent de l'intelligence : reconnaître une image ou une voix, comprendre et produire un texte, traduire, prendre une décision, jouer, prévoir… Par extension, on appelle aussi « une IA » un <strong>système</strong> qui réalise de telles tâches.</p>
<p>Le règlement européen sur l'intelligence artificielle, adopté en 2024, précise cette idée : un système d'IA est un système automatisé qui, à partir des données qu'il reçoit, <em>déduit</em> comment produire des résultats (prédictions, contenus, recommandations ou décisions) capables d'influencer son environnement. Le mot important est « déduit » : un système d'IA ne se contente pas d'appliquer des calculs fixés à l'avance.</p>
<p>Un <strong>algorithme</strong> est une suite finie et ordonnée d'instructions permettant de résoudre un problème. Un <strong>programme</strong> est la traduction d'un algorithme dans un langage compréhensible par un ordinateur, comme Python.</p>
<p>Toute IA repose sur des algorithmes, mais tout algorithme n'est pas une IA : une calculatrice qui effectue 12 × 7 applique un algorithme, sans rien « déduire » ni « apprendre ».</p>` },
      { t: "qcm", titre: "IA ou pas ?", q: "Lequel de ces systèmes n'utilise pas d'IA ?",
        choix: ["Une calculatrice qui effectue 12 × 7.", "La traduction automatique d'un texte.", "La reconnaissance vocale.", "Les recommandations de vidéos."], bon: 0,
        expl: "La calculatrice applique un algorithme dont toutes les règles ont été écrites par des humains. Elle ne déduit rien, n'a rien appris à partir d'exemples et donne toujours le même résultat exact." },
      { t: "lecon", titre: "Programme classique ou programme qui apprend ?",
        texte: `<p>Pour comprendre ce qui fait la particularité de l'IA moderne, comparons deux façons de construire un <strong>filtre anti-spam</strong>, qui trie les courriels indésirables.</p>
<div class="schema"><p class="schema-titre">Programmation classique</p><div class="schema-ligne"><span>Règles écrites par un humain</span><i>+</i><span>Données : un courriel</span><i>→</i><b>Programme</b><i>→</i><span>« spam » ou non</span></div>
<p class="schema-titre">Apprentissage automatique</p><div class="schema-ligne"><span>Données : des milliers de courriels</span><i>+</i><span>Résultats attendus</span><i>→</i><b>Apprentissage</b><i>→</i><span>Modèle (règles apprises)</span></div></div>
<ul><li>En <strong>programmation classique</strong>, un humain écrit lui-même les règles : « si le message contient <em>gagnez</em> ou <em>gratuit</em>, alors c'est un spam ». Le programme ne fait qu'appliquer ces règles. Elles sont faciles à comprendre, mais il est impossible de prévoir toutes les ruses des fraudeurs.</li>
<li>En <strong>apprentissage automatique</strong> (<em>machine learning</em>), on fournit à l'ordinateur des milliers d'exemples de courriels déjà classés. Un algorithme d'apprentissage en extrait lui-même des régularités et construit un <strong>modèle</strong>. Ce modèle sait ensuite classer des courriels qu'il n'a jamais vus.</li></ul>
<aside class="retenir"><strong>À retenir.</strong> L'IA d'aujourd'hui repose surtout sur l'apprentissage automatique. Ses règles ne sont plus écrites à la main : elles sont <strong>apprises à partir de données</strong>. C'est pourquoi la qualité des données est essentielle, et c'est aussi pourquoi il est parfois difficile d'expliquer pourquoi une IA a donné telle réponse.</aside>` },
      { t: "tri", titre: "Écrites ou apprises ?",
        q: "Pour chaque situation, les règles ont-elles très probablement été écrites par un humain, ou apprises à partir de données ?",
        categories: ["Écrites par un humain", "Apprises à partir de données"],
        items: [
          { txt: "Un thermostat allume le chauffage dès que la température descend sous 19 °C.", cat: 0, expl: "Le seuil de 19 °C a été fixé par un humain." },
          { txt: "Un logiciel trie des photos de grains de beauté en « à surveiller » ou « sans risque » après avoir étudié 100 000 photos classées par des dermatologues.", cat: 1, expl: "Le système a appris à partir de 100 000 exemples classés par des spécialistes." },
          { txt: "Un site trie une liste d'élèves par ordre alphabétique.", cat: 0, expl: "Le tri alphabétique est un algorithme exact." },
          { txt: "Un service de vidéos adapte ses suggestions selon ce que regardent des millions d'utilisateurs.", cat: 1, expl: "Les suggestions sont tirées des comportements de millions d'utilisateurs." },
          { txt: "Un feu tricolore passe au vert toutes les 90 secondes.", cat: 0, expl: "C'est une minuterie fixe. Certains feux « intelligents » s'adaptent toutefois au trafic." },
          { txt: "Une messagerie range un courriel dans « Indésirables ».", cat: 1, expl: "Le filtre a appris à partir des courriels signalés comme indésirables par les utilisateurs." },
        ] },
      { t: "qcm", titre: "L'essentiel pour apprendre", q: "Pour apprendre, un système d'apprentissage automatique a avant tout besoin…",
        choix: ["d'un écran tactile.", "d'un robot.", "de nombreux exemples (des données).", "d'être connecté à Internet en permanence."], bon: 2,
        expl: "Le modèle est construit à partir d'exemples. Sans données, pas d'apprentissage." },
      { t: "lecon", titre: "Une courte histoire de l'IA",
        texte: `<p>L'IA n'est pas née avec les assistants conversationnels : c'est un domaine scientifique vieux de plus de 70 ans, fait d'enthousiasmes et de déceptions.</p>
<ol class="frise"><li><b>1950</b> Turing propose le « jeu de l'imitation ».</li><li><b>1956</b> Conférence de Dartmouth : le terme « intelligence artificielle » s'impose.</li><li><b>1958</b> Rosenblatt invente le perceptron, premier neurone artificiel.</li><li><b>1966</b> ELIZA, premier programme de conversation.</li><li class="hiver"><b>1974 à 1993</b> Deux « hivers de l'IA » : déceptions et crédits coupés.</li><li><b>1997</b> L'ordinateur Deep Blue bat le champion d'échecs Garry Kasparov.</li><li><b>2012</b> Essor de l'apprentissage profond (réseaux de neurones).</li><li><b>2016</b> AlphaGo bat Lee Sedol au jeu de go.</li><li><b>2017</b> Architecture « Transformer », base des grands modèles de langage.</li><li><b>2022</b> ChatGPT rend l'IA générative accessible à tous.</li></ol>
<ul><li><strong>Les débuts (1950 à 1970)</strong> : on pense pouvoir reproduire le raisonnement humain avec des règles logiques. Les premiers succès suscitent un grand optimisme.</li>
<li><strong>Les « hivers de l'IA »</strong> : les promesses ne sont pas tenues, les ordinateurs sont trop lents, les financements s'effondrent.</li>
<li><strong>Le tournant des données (depuis 2010)</strong> : grâce à l'abondance de données sur Internet et à la puissance des processeurs graphiques, l'apprentissage par réseaux de neurones, dit <em>apprentissage profond</em>, devient la méthode dominante.</li>
<li><strong>L'ère de l'IA générative (depuis 2022)</strong> : des modèles entraînés sur d'immenses quantités de textes et d'images produisent des contenus nouveaux et deviennent des outils grand public.</li></ul>
<aside class="savoir"><strong>Une recherche récompensée.</strong> Le chercheur français Yann LeCun a mis au point, à la fin des années 1980, des réseaux de neurones capables de lire les chiffres manuscrits. Avec Yoshua Bengio et Geoffrey Hinton, il a reçu le prix Turing 2018, le « Nobel de l'informatique ». En 2024, le prix Nobel de physique a récompensé John Hopfield et Geoffrey Hinton pour leurs travaux fondateurs sur les réseaux de neurones artificiels.</aside>` },
      { t: "ordre", texte: true, titre: "Remettre l'histoire dans l'ordre", q: "Range ces événements du plus ancien au plus récent.",
        lignes: ["Alan Turing propose le « jeu de l'imitation ».", "La conférence de Dartmouth popularise le terme « intelligence artificielle ».", "Le programme ELIZA simule un psychothérapeute.", "Deep Blue bat Garry Kasparov aux échecs.", "Un programme bat le champion du monde de go.", "Un assistant conversationnel d'IA générative devient accessible au grand public."],
        expl: "1950, 1956, 1966, 1997, 2016 et 2022." },
      { t: "lecon", titre: "IA spécialisée et IA générale",
        texte: `<ul><li>Une <strong>IA spécialisée</strong>, souvent appelée <strong>IA faible</strong>, est conçue pour une tâche ou un domaine précis : jouer aux échecs, reconnaître des visages, traduire, générer des images…</li>
<li>Une <strong>IA générale</strong>, souvent appelée <strong>IA forte</strong>, serait capable de comprendre et d'apprendre n'importe quelle tâche intellectuelle aussi bien qu'un humain, et de s'adapter à des situations entièrement nouvelles.</li></ul>
<p>Le mot « faible » ne veut pas dire « peu performante » : Deep Blue et AlphaGo sont des IA spécialisées qui surpassent les meilleurs humains… dans leur seul domaine.</p>
<p>Les assistants conversationnels actuels sont bien plus polyvalents : ils rédigent, traduisent, résument, programment. Mais ils commettent des erreurs qu'aucun humain attentif ne ferait, n'ont pas d'expérience du monde réel et ne savent pas toujours quand ils se trompent. Savoir si l'IA générale est possible, et à quelle échéance, fait l'objet de débats vifs entre chercheurs.</p>` },
      { t: "qcm", titre: "IA « faible »", q: "Une IA « faible » (ou spécialisée) est une IA…",
        choix: ["peu performante.", "en panne.", "consciente d'elle-même.", "conçue pour une tâche ou un domaine précis."], bon: 3,
        expl: "« Faible » signifie « spécialisée ». Deep Blue était une IA faible qui battait le champion du monde d'échecs." },
      { t: "lecon", titre: "IA qui prédit, IA qui génère",
        texte: `<p>Une <strong>IA générative</strong> produit des contenus nouveaux (textes, images, sons, vidéos, code) à partir d'une instruction appelée <em>prompt</em>. On l'oppose souvent aux IA qui <strong>classent ou prédisent</strong>, plus anciennes et souvent invisibles.</p>
<table class="donnees large"><thead><tr><th>IA qui classe ou prédit</th><th>IA qui génère</th></tr></thead><tbody>
<tr><td>Elle répond à une question précise sur une donnée : « ce courriel est-il un spam ? », « quelle vidéo va lui plaire ? »</td><td>Elle fabrique un contenu qui n'existait pas : un texte, une image, une musique.</td></tr>
<tr><td>Filtre anti-spam, déverrouillage par le visage, recommandations, détection de fraude bancaire, prévision du trafic.</td><td>Assistant conversationnel, génération d'images à partir d'une description, voix de synthèse, aide à la programmation.</td></tr>
<tr><td>Sa réponse est le plus souvent une <strong>catégorie</strong> ou un <strong>nombre</strong>.</td><td>Sa réponse est un <strong>contenu</strong>, différent à chaque demande.</td></tr></tbody></table>
<aside class="retenir"><strong>Comment un assistant conversationnel écrit-il ?</strong> Il ne cherche pas la réponse dans une encyclopédie. Il <strong>prédit</strong>, morceau de mot par morceau de mot, une suite de texte plausible, en s'appuyant sur ce qu'il a appris de milliards de phrases. Une IA générative est donc, elle aussi, une machine à prédire : d'où des réponses fluides… mais parfois fausses.</aside>` },
      { t: "tri", titre: "Générative ou non ?", q: "Chacun de ces systèmes est-il une IA générative ?",
        categories: ["IA générative", "Pas générative"],
        items: [
          { txt: "Un logiciel qui compose une musique d'ambiance à partir du mot « calme ».", cat: 0, expl: "La musique produite est un contenu nouveau." },
          { txt: "Le déverrouillage d'un téléphone par empreinte digitale.", cat: 1, expl: "Le système compare une empreinte à celle enregistrée : il ne produit aucun contenu." },
          { txt: "Un assistant qui résume un chapitre de roman.", cat: 0, expl: "Le résumé est un texte nouveau, rédigé par le système." },
          { txt: "Une caméra qui compte les voitures passant à un carrefour.", cat: 1, expl: "Le système reconnaît et compte des voitures : sa réponse est un nombre." },
          { txt: "Un outil qui crée une affiche à partir d'une description.", cat: 0, expl: "L'affiche est une image qui n'existait pas." },
          { txt: "Une banque qui estime le risque qu'un paiement soit frauduleux.", cat: 1, expl: "Le système prédit un risque : sa réponse est un nombre ou une catégorie." },
        ] },
      { t: "tri", titre: "Enquête : l'IA autour de moi", q: "Pour chaque situation, un système d'IA est-il probablement à l'œuvre ?",
        categories: ["IA probable", "Pas d'IA"],
        items: [
          { txt: "Mon téléphone se déverrouille quand il voit mon visage.", cat: 0, expl: "Reconnaître un visage : le système a appris sur des photos de très nombreux visages." },
          { txt: "Ma calculatrice affiche le résultat de 345 × 12.", cat: 1, expl: "Algorithme de multiplication : règles exactes, résultat toujours identique." },
          { txt: "Une plateforme me propose des vidéos « pour moi ».", cat: 0, expl: "Recommander : à partir des historiques de visionnage de millions d'utilisateurs." },
          { txt: "Une application traduit un menu photographié en Espagne.", cat: 0, expl: "Reconnaître le texte, puis traduire : images de textes et textes déjà traduits par des humains." },
          { txt: "L'application de navigation annonce « 12 min de retard dû au trafic ».", cat: 0, expl: "Prédire le temps de trajet à partir de positions anonymisées et d'historiques du trafic. Le calcul du plus court chemin est, lui, un algorithme classique." },
          { txt: "Mon appareil photo floute l'arrière-plan en mode portrait.", cat: 0, expl: "Reconnaître le sujet à mettre au net : appris sur des photos dont le sujet a été détouré." },
          { txt: "Le tableur calcule la moyenne de mes notes.", cat: 1, expl: "C'est une formule de calcul." },
          { txt: "Un assistant vocal répond à « Quel temps fera-t-il demain ? ».", cat: 0, expl: "Reconnaître la voix, comprendre la question, générer la réponse orale. La prévision météo elle-même vient surtout de modèles physiques." },
        ] },
      { t: "lecon", titre: "Élise, une conversation à base de règles",
        texte: `<p>En 1966, Joseph Weizenbaum, chercheur au MIT, programme ELIZA, qui imite un psychothérapeute en reformulant les phrases de son interlocuteur. ELIZA ne comprend rien : elle repère des mots-clés et applique des règles écrites à la main. Voici sa petite cousine, Élise.</p>
<p>Rappels Python : <code>phrase.lower()</code> renvoie la phrase écrite en minuscules. <code>"maths" in phrase</code> vaut True si le mot maths apparaît quelque part dans la phrase. Dans une suite <code>if</code>, <code>elif</code>, <code>else</code>, seul le <strong>premier</strong> cas vrai est exécuté.</p>
<p>Exécute le programme et discute avec Élise. Essaie de la prendre en défaut : trouve une phrase à laquelle elle répond de façon absurde.</p>
<aside class="savoir"><strong>L'effet ELIZA.</strong> Weizenbaum raconte que sa propre secrétaire, qui savait pourtant comment fonctionnait le programme, lui demanda de quitter la pièce pour pouvoir « parler » seule avec ELIZA. Notre tendance à prêter de la compréhension, voire des sentiments, à une machine qui manie bien le langage porte depuis le nom d'<strong>effet ELIZA</strong>.</aside>`,
        code: ELISE_PY + `\nprint("Élise : Bonjour, je m'appelle Élise. Écris 'au revoir' pour partir.")\nphrase = input("Toi : ")\nwhile "au revoir" not in phrase.lower():\n    print("Élise :", repondre(phrase))\n    phrase = input("Toi : ")\nprint("Élise : Au revoir, à bientôt !")` },
      { t: "quiz", titre: "Prévoir les réponses d'Élise", intro: "Sans exécuter le programme, prévois la réponse d'Élise à chaque phrase.", code: ELISE_PY,
        questions: [
          { q: "« Je suis FATIGUÉE »", choix: ["Bonjour ! Comment vas-tu aujourd'hui ?", "Pourquoi te sens-tu fatigué(e) ?", "Je vois. Peux-tu m'en dire plus ?"], bon: 1,
            expl: "La phrase est d'abord mise en minuscules, et « fatiguée » contient « fatigu ». Chercher « fatigu » plutôt que « fatigué » permet de couvrir fatigué, fatiguée, fatigue, fatigués…" },
          { q: "« Tu aimes les maths ? »", choix: ["Parle-moi de ton cours de maths.", "Bonne question. Qu'en penses-tu, toi ?", "Je vois. Peux-tu m'en dire plus ?"], bon: 0,
            expl: "La phrase contient « maths » et un point d'interrogation, mais la règle « maths » est testée en premier. Si l'on échangeait les deux blocs, Élise répondrait « Bonne question. Qu'en penses-tu, toi ? » : l'ordre des règles change le comportement du programme." },
          { q: "« J'ai un chat »", choix: ["Bonne question. Qu'en penses-tu, toi ?", "Pourquoi te sens-tu fatigué(e) ?", "Je vois. Peux-tu m'en dire plus ?"], bon: 2,
            expl: "Aucun mot-clé n'est reconnu : c'est la règle par défaut, celle du else, qui s'applique." },
          { q: "« Je ne suis pas fatigué du tout »", choix: ["Pourquoi te sens-tu fatigué(e) ?", "Je vois. Peux-tu m'en dire plus ?", "Tant mieux !"], bon: 0,
            expl: "Élise repère le mot-clé mais ignore la négation : elle ne comprend pas le sens de la phrase." },
        ] },
      { t: "code", titre: "Enrichir Élise", d: 2,
        caches: ["repondre('Le sport, c est bien')", "repondre('Quelle musique ?')", "repondre('Je suis fatigué')", "repondre('SPORT')"],
        enonce: `<p>Ajoute deux règles à la fonction <code>repondre</code>, placées <strong>avant</strong> la règle du point d'interrogation :</p><ul><li>si la phrase contient <code>sport</code>, Élise répond <code>Tu pratiques un sport en club ?</code></li><li>si la phrase contient <code>musique</code>, Élise répond <code>Quel genre de musique écoutes-tu ?</code></li></ul><p>Les autres règles ne doivent pas changer.</p>`,
        depart: ELISE_PY,
        solution: ELISE_PY.replace(`    elif "?" in phrase:`, `    elif "sport" in phrase:\n        return "Tu pratiques un sport en club ?"\n    elif "musique" in phrase:\n        return "Quel genre de musique écoutes-tu ?"\n    elif "?" in phrase:`),
        tests: [{ appels: [["repondre('Je fais du sport')", "'Tu pratiques un sport en club ?'"], ["repondre(\"J'adore la MUSIQUE\")", "'Quel genre de musique écoutes-tu ?'"], ["repondre('Tu aimes le sport ?')", "'Tu pratiques un sport en club ?'"], ["repondre('Salut')", "'Bonjour ! Comment vas-tu aujourd\\'hui ?'"], ["repondre(\"J'ai un chat\")", "'Je vois. Peux-tu m\\'en dire plus ?'"]] }],
        indices: ["Chaque nouvelle règle est un bloc elif suivi d'un return, sur le modèle de la règle « maths ».", "Place-les avant elif \"?\" in phrase, sinon une question sur le sport recevrait la réponse « Bonne question »."] },
      { t: "qcm", titre: "Les limites des règles", q: "Combien de règles faudrait-il écrire pour qu'Élise réponde correctement à toutes les phrases possibles ?",
        choix: ["Une centaine suffirait.", "Quelques milliers, comme dans un dictionnaire.", "Une infinité : c'est impossible à la main."], bon: 2,
        expl: "Les phrases possibles sont innombrables, avec leurs négations, leurs fautes, leur ironie… Écrire toutes les règles à la main est impossible. D'où l'idée de l'apprentissage automatique : faire apprendre des régularités à partir d'un grand nombre d'exemples." },
      { t: "quiz", titre: "Lire un programme", intro: "On considère la fonction suivante.",
        code: `def conseil(temperature, pluie):\n    if pluie:\n        return "Prends un parapluie."\n    elif temperature < 10:\n        return "Prends un manteau."\n    else:\n        return "Une tenue légère suffira."`,
        questions: [
          { q: "Que renvoie conseil(5, True) ?", choix: ["Prends un parapluie.", "Prends un manteau.", "Une tenue légère suffira."], bon: 0, expl: "pluie vaut True : la première règle s'applique, et les suivantes ne sont pas examinées. Il fait pourtant 5 °C…" },
          { q: "Que renvoie conseil(10, False) ?", choix: ["Prends un parapluie.", "Prends un manteau.", "Une tenue légère suffira."], bon: 2, expl: "Il ne pleut pas, et 10 n'est pas strictement inférieur à 10." },
          { q: "Ce programme est-il une IA qui apprend ?", choix: ["Oui, puisqu'il donne des conseils.", "Non : ses règles ont été écrites par le programmeur et ne changent jamais.", "Oui, puisqu'il utilise des données."], bon: 1, expl: "Pour obtenir de meilleurs conseils par apprentissage, il faudrait des données sur de nombreuses journées (température, pluie, vent, humidité) et les tenues jugées confortables ce jour-là." },
        ] },
      { t: "tri", titre: "Vrai ou faux ?", q: "Chaque affirmation est-elle vraie ou fausse ?",
        categories: ["Vrai", "Faux"],
        items: [
          { txt: "Toute IA est un programme informatique.", cat: 0, expl: "Un système d'IA est un programme, ou un ensemble de programmes, exécuté par des ordinateurs." },
          { txt: "Tout programme informatique est une IA.", cat: 1, expl: "Une calculatrice ou un tri alphabétique sont des programmes sans IA." },
          { txt: "Un modèle d'apprentissage automatique peut donner une réponse pour une donnée qu'il n'a jamais vue.", cat: 0, expl: "C'est même l'objectif de l'apprentissage." },
          { txt: "Si une IA réussit le test de Turing, alors elle comprend ce qu'elle dit.", cat: 1, expl: "Le test mesure une imitation du comportement humain, pas une compréhension." },
          { txt: "Une IA générative ne fait jamais d'erreur, puisqu'elle a lu des milliards de textes.", cat: 1, expl: "Elle prédit un texte plausible, pas forcément vrai. Elle peut inventer des faits et reproduire les erreurs présentes dans ses données." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "L'expression « intelligence artificielle » s'est imposée lors…", choix: ["de la thèse d'Alan Turing en 1936.", "de la conférence de Dartmouth en 1956.", "de la victoire de Deep Blue en 1997.", "de la sortie de ChatGPT en 2022."], bon: 1, expl: "C'est à Dartmouth, en 1956, que le terme s'impose." },
          { q: "Dans un programme classique, les règles sont…", choix: ["écrites par un humain.", "déduites des données par la machine.", "tirées au hasard.", "inutiles."], bon: 0, expl: "C'est ce qui le distingue d'un modèle obtenu par apprentissage." },
          { q: "Lequel de ces systèmes est une IA générative ?", choix: ["Un filtre anti-spam.", "Un outil qui crée une image à partir d'une description.", "Le déverrouillage facial d'un téléphone.", "Une calculatrice."], bon: 1, expl: "Il produit un contenu nouveau." },
          { q: "Pour rédiger sa réponse, un assistant conversationnel…", choix: ["recopie une page d'encyclopédie.", "fait appel à un humain qui répond en direct.", "prédit, morceau par morceau, une suite de texte plausible.", "tire des mots au hasard dans un dictionnaire."], bon: 2, expl: "D'où des réponses fluides, mais parfois fausses." },
          { q: "En 1997, l'ordinateur Deep Blue…", choix: ["bat Lee Sedol au jeu de go.", "réussit le test de Turing.", "bat Garry Kasparov aux échecs.", "traduit pour la première fois un livre entier."], bon: 2, expl: "La victoire au jeu de go est celle d'AlphaGo, en 2016." },
          { q: "ELIZA donnait l'impression de comprendre parce qu'elle…", choix: ["comprenait réellement le sens des phrases.", "reformulait les phrases grâce à des règles sur des mots-clés.", "était un réseau de neurones géant.", "était pilotée en secret par un humain."], bon: 1, expl: "C'est l'effet ELIZA : nous prêtons de la compréhension à une machine qui manie bien le langage." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Définition.</strong> L'<strong>IA</strong> est le domaine de l'informatique qui conçoit des programmes capables de réaliser des tâches qui, chez l'humain, demandent de l'intelligence : reconnaître, comprendre, traduire, décider, produire. Un système d'IA <em>déduit</em> de ses données d'entrée des prédictions, des contenus, des recommandations ou des décisions.</p>
<p><strong>Deux façons de programmer.</strong></p><ul><li><strong>Programme classique</strong> : règles <strong>écrites par un humain</strong> + données → résultats.</li><li><strong>Apprentissage automatique</strong> : données + résultats attendus → <strong>apprentissage</strong> → <strong>modèle</strong>, qui traite ensuite des données nouvelles.</li></ul>
<p><strong>Deux distinctions.</strong></p><ul><li><strong>IA spécialisée (faible)</strong> : une tâche précise, parfois mieux qu'un humain. <strong>IA générale (forte)</strong> : hypothétique, aussi polyvalente qu'un humain.</li><li><strong>IA qui classe ou prédit</strong> (spam, visage, recommandation) : répond par une catégorie ou un nombre. <strong>IA générative</strong> (texte, image, son) : produit un contenu nouveau, en prédisant une suite plausible.</li></ul>
<p><strong>Cinq dates.</strong> 1950, Turing et le test de l'imitation. 1956, Dartmouth et la naissance du terme. 1997, Deep Blue bat Kasparov. 2012, essor de l'apprentissage profond. 2022, l'IA générative grand public.</p>
<p><strong>À ne pas confondre.</strong> Imiter une conversation (test de Turing, effet ELIZA) n'est pas comprendre. Tout algorithme n'est pas une IA.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>définir l'IA, un algorithme, un modèle</li><li>expliquer le principe de l'apprentissage</li><li>situer cinq dates clés</li><li>citer trois usages de l'IA au quotidien</li><li>distinguer IA générative et IA qui prédit</li><li>lire un programme Python à base de règles</li></ul>` },
    ]
  },
  {
    id: "c2", num: 2, titre: "Les données, matière première de l'IA", resume: "Jeux de données, pixels, étiquettes, qualité des données",
    etapes: [
      { t: "qcm", titre: "Comment reconnaître un chat ?",
        q: "Tu reconnais un chat au premier coup d'œil. Pour l'expliquer à un ordinateur, on propose la règle : « si l'animal a des oreilles pointues, alors c'est un chat ». Quel est le problème ?",
        choix: ["Aucun : cette règle suffit.", "Elle accepte un renard ou un lynx, et refuse un chat vu de dos ou les oreilles couchées.", "L'ordinateur ne peut pas appliquer une règle."], bon: 1,
        expl: "Toute règle simple a des contre-exemples. Les règles écrites à la main échouent face à la variété du réel : il faut une autre méthode." },
      { t: "quiz", titre: "Ce que voit vraiment l'ordinateur", widget: "pixels",
        intro: "Pour un ordinateur, une image n'est qu'un tableau de nombres. Dans cette grille, chaque case est un pixel : 1 signifie « noir », 0 signifie « blanc ». Touche les cases qui contiennent un 1 pour les colorier.",
        questions: [
          { q: "Que représente l'image obtenue ?", choix: ["Une maison", "Une tête de chat", "La lettre M"], bon: 1, expl: "On reconnaît les oreilles, les yeux et le nez." },
          { q: "Combien de nombres faut-il pour décrire cette image ?", choix: ["10", "50", "100"], bon: 2, expl: "10 × 10 = 100 nombres, un par pixel." },
          { q: "Une photo de téléphone compte environ 12 millions de pixels, chacun décrit par trois nombres (rouge, vert, bleu). Combien de nombres décrivent une telle photo ?", choix: ["12 millions", "36 millions", "3 milliards"], bon: 1, expl: "12 millions × 3 = 36 millions de nombres." },
        ] },
      { t: "qcm", titre: "Changer de méthode",
        q: "Plutôt que d'écrire des règles, on montre à l'ordinateur des milliers de photos accompagnées de la bonne réponse : « chat » ou « pas chat ». Que risque-t-il de se passer si toutes les photos de chats ont été prises sur un canapé ?",
        choix: ["Rien de particulier.", "Le système risque d'associer « chat » au canapé.", "Le système reconnaîtra encore mieux les chats."], bon: 1,
        expl: "Il reconnaîtrait mal un chat dans un jardin et pourrait répondre « chat » devant un canapé vide. Il faut des chats de toutes races et couleurs, de face, de profil et de dos, dans des lieux variés, et beaucoup de photos « pas chat », y compris d'animaux qui leur ressemblent." },
      { t: "lecon", titre: "Données et jeux de données",
        texte: `<p>Une <strong>donnée</strong> est une information enregistrée sous une forme qu'un ordinateur peut traiter : un nombre, un mot, une date, une image, un son…</p>
<p>Un <strong>jeu de données</strong> est un ensemble organisé de données décrivant des <strong>objets</strong> (des élèves, des films, des images…). Dans une table :</p>
<ul><li>chaque <strong>ligne</strong> décrit un objet ;</li><li>chaque <strong>colonne</strong> correspond à un <strong>descripteur</strong> (on dit aussi attribut ou caractéristique) ;</li><li>chaque case contient une <strong>valeur</strong>.</li></ul>
<table class="donnees"><thead><tr><th>Fruit n°</th><th>Masse (g)</th><th>Diamètre (cm)</th><th>Couleur</th><th>Étiquette</th></tr></thead><tbody><tr><td>1</td><td>140</td><td>7,2</td><td>orange</td><th>orange</th></tr><tr><td>2</td><td>75</td><td>5,4</td><td>orange</td><th>clémentine</th></tr><tr><td>3</td><td>165</td><td>7,8</td><td>orange</td><th>orange</th></tr><tr><td>4</td><td>70</td><td>5,1</td><td>orange</td><th>clémentine</th></tr></tbody></table>
<p>Ici, les objets sont les fruits ; les descripteurs sont la masse, le diamètre et la couleur. La dernière colonne, l'<em>étiquette</em>, est la réponse que l'on voudra faire apprendre à une IA.</p>` },
      { t: "quiz", titre: "Lire un jeu de données", intro: "Une application de cinéma utilise la table suivante.",
        doc: `<table class="donnees"><thead><tr><th>Titre</th><th>Durée (min)</th><th>Genre</th><th>Année</th><th>Aimé par l'utilisateur ?</th></tr></thead><tbody><tr><td>Film A</td><td>112</td><td>comédie</td><td>2021</td><td>oui</td></tr><tr><td>Film B</td><td>148</td><td>science-fiction</td><td>2010</td><td>oui</td></tr><tr><td>Film C</td><td>95</td><td>horreur</td><td>2019</td><td>non</td></tr><tr><td>Film D</td><td>130</td><td>comédie</td><td>2023</td><td>oui</td></tr></tbody></table>`,
        questions: [
          { q: "Quels sont les objets de ce jeu de données ?", choix: ["Les films", "Les genres", "Les utilisateurs"], bon: 0, expl: "Chaque ligne décrit un film. Les descripteurs sont le titre, la durée, le genre et l'année." },
          { q: "Quelle colonne joue le rôle d'étiquette si l'on veut prédire les goûts de l'utilisateur ?", choix: ["Genre", "Année", "Aimé par l'utilisateur ?"], bon: 2, expl: "C'est la réponse que l'IA devra apprendre à donner." },
          { q: "Pourquoi quatre films ne suffisent-ils pas pour faire des recommandations fiables ?", choix: ["Parce que les films sont trop longs.", "Avec si peu d'exemples, on ne peut dégager aucune tendance fiable.", "Parce qu'il manque le nom du réalisateur."], bon: 1, expl: "On ne sait rien de ses goûts pour les autres genres, et une seule exception change tout." },
        ] },
      { t: "lecon", titre: "Données structurées et non structurées",
        texte: `<ul><li>Les <strong>données structurées</strong> sont rangées selon un format fixe, comme une table : chaque valeur est à une place précise. Exemples : un fichier CSV, une base de données de notes, un relevé météo.</li>
<li>Les <strong>données non structurées</strong> n'ont pas de format fixe : textes libres, photos, sons, vidéos, messages sur les réseaux sociaux.</li></ul>
<p>La grande majorité des données produites dans le monde est non structurée. Les IA modernes, en particulier les réseaux de neurones, ont justement fait de grands progrès dans le traitement des images, des sons et des textes.</p>` },
      { t: "tri", titre: "Structurées ou non ?", q: "Classe ces données.", categories: ["Structurées", "Non structurées"],
        items: [
          { txt: "L'emploi du temps de la classe dans l'ENT.", cat: 0, expl: "Un tableau au format fixe." },
          { txt: "Un message vocal.", cat: 1, expl: "Un son n'a pas de format en table." },
          { txt: "Le fichier des horaires de bus de la ville.", cat: 0, expl: "Une table : lignes, arrêts, heures." },
          { txt: "Une vidéo publiée sur un réseau social.", cat: 1, expl: "Une suite d'images et de sons." },
          { txt: "Les commentaires laissés sous cette vidéo.", cat: 1, expl: "Du texte libre." },
          { txt: "Le relevé des températures d'une station météo.", cat: 0, expl: "Une table de dates et de mesures." },
        ] },
      { t: "lecon", titre: "Une image, ce sont des nombres",
        texte: `<p>Une image numérique est un quadrillage de petits points appelés <strong>pixels</strong>. En niveaux de gris, chaque pixel est un nombre entre 0 (noir) et 255 (blanc). En couleur, chaque pixel est décrit par trois nombres : l'intensité du rouge, du vert et du bleu (codage <strong>RVB</strong>).</p>
<p>Une IA qui « regarde » une photo ne voit donc ni chat ni chien : elle reçoit des millions de nombres et doit apprendre quelles combinaisons de nombres correspondent à un chat. De la même façon, un son est une suite de nombres mesurant la vibration de l'air, et un texte est découpé en morceaux numérotés.</p>` },
      { t: "quiz", titre: "Compter les nombres d'une image",
        questions: [
          { q: "Une image en niveaux de gris mesure 28 pixels sur 28. Combien de nombres la décrivent ?", choix: ["56", "784", "2 352"], bon: 1, expl: "28 × 28 = 784 nombres." },
          { q: "Une image en couleur mesure 1 920 pixels sur 1 080 (format Full HD). Combien de nombres la décrivent ?", choix: ["Environ 2 millions", "Environ 6 millions", "Environ 600 millions"], bon: 1, expl: "1 920 × 1 080 × 3 = 6 220 800 nombres." },
          { q: "Une vidéo Full HD compte 25 images par seconde. Combien de nombres décrivent une minute de vidéo ?", choix: ["Environ 150 millions", "Environ 9 milliards", "Environ 9 millions"], bon: 1, expl: "Une minute contient 25 × 60 = 1 500 images, soit plus de 9 milliards de nombres. C'est pourquoi les vidéos sont compressées." },
        ] },
      { t: "lecon", titre: "Étiquettes, entraînement et test",
        texte: `<p>Une <strong>étiquette</strong> est la réponse attendue associée à une donnée : « chat », « spam », « 7 », « orange »… Des données accompagnées de leur étiquette sont dites <strong>étiquetées</strong>, ou <strong>annotées</strong>. Ce sont souvent des humains qui étiquettent les données, image par image, phrase par phrase. Ce travail est long et indispensable : une IA ne peut apprendre que ce qu'on lui a montré.</p>
<p>On partage le jeu de données en deux parties :</p>
<ul><li>les <strong>données d'entraînement</strong>, la plus grande partie (souvent 70 à 80 %), servent à faire apprendre le système ;</li><li>les <strong>données de test</strong>, mises de côté, servent ensuite à vérifier ses performances sur des exemples <em>qu'il n'a jamais vus</em>.</li></ul>
<aside class="retenir"><strong>Pourquoi deux parties ?</strong> Un élève qui a appris par cœur les corrigés des exercices réussira ces exercices… mais pas forcément un exercice nouveau. De même, on n'évalue jamais une IA sur les données qui ont servi à l'entraîner : il faut vérifier qu'elle sait <strong>généraliser</strong>.</aside>` },
      { t: "quiz", titre: "L'IA « parfaite » de Lina", intro: "Lina entraîne une IA sur 1 000 photos de chiffres manuscrits. Elle mesure ensuite ses performances sur ces mêmes 1 000 photos et obtient 100 % de bonnes réponses. Elle conclut que son IA est parfaite.",
        questions: [
          { q: "Pourquoi son raisonnement est-il incorrect ?", choix: ["1 000 photos, c'est trop.", "Elle teste son IA sur les données qui ont servi à l'entraîner.", "Les chiffres manuscrits sont impossibles à reconnaître."], bon: 1, expl: "L'IA peut les avoir « apprises par cœur » sans savoir généraliser." },
          { q: "Comment aurait-elle dû procéder ?", choix: ["Entraîner sur 800 photos et tester sur les 200 autres, jamais vues.", "Entraîner deux fois sur les 1 000 photos.", "Tester sur 10 photos choisies parmi les 1 000."], bon: 0, expl: "On met de côté une partie des photos avant l'entraînement." },
          { q: "Sur de nouvelles photos, son IA n'obtient que 70 %. Quelle explication est plausible ?", choix: ["Les nouvelles photos sont fausses.", "L'IA a appris par cœur les particularités des 1 000 photos, ou les nouvelles photos sont différentes.", "L'ordinateur est tombé en panne."], bon: 1, expl: "On parle de surapprentissage (chapitre 3). Les nouvelles photos peuvent aussi venir d'autres personnes, d'un autre stylo, d'un autre éclairage." },
        ] },
      { t: "lecon", titre: "La qualité des données",
        texte: `<p>Un système d'IA apprend tout ce que contiennent ses données, y compris leurs défauts. Les informaticiens résument cela par l'expression anglaise <em>garbage in, garbage out</em> : des données de mauvaise qualité donnent des résultats de mauvaise qualité.</p>
<table class="donnees large"><thead><tr><th>Défaut</th><th>Exemple</th></tr></thead><tbody>
<tr><th>Erreurs de saisie</th><td>une note de 120 au lieu de 12,0 ; une taille en mètres au milieu de tailles en centimètres</td></tr>
<tr><th>Valeurs manquantes</th><td>une case vide, ou un code comme « Abs » ou −1 qu'il faut savoir interpréter</td></tr>
<tr><th>Doublons</th><td>le même élève enregistré deux fois, qui « compte double »</td></tr>
<tr><th>Incohérences de format</th><td>« 2de3 » et « 2nde 3 » ; « 12,5 » et « 12.5 » ; majuscules et minuscules</td></tr>
<tr><th>Quantité insuffisante</th><td>dix photos ne suffisent pas pour apprendre à reconnaître les chats</td></tr>
<tr><th>Manque de représentativité</th><td>des photos de chats prises uniquement de face, ou uniquement sur un canapé</td></tr>
<tr><th>Données périmées</th><td>des prix immobiliers d'il y a vingt ans pour estimer un prix actuel</td></tr></tbody></table>
<p>Un jeu de données est <strong>biaisé</strong> lorsqu'il ne représente pas fidèlement la réalité que l'on veut traiter : certaines situations ou certains groupes de personnes y sont sur-représentés, sous-représentés ou absents. Le système entraîné reproduit alors ce déséquilibre.</p>
<aside class="savoir"><strong>Des visages mal reconnus.</strong> En 2018, l'étude <em>Gender Shades</em> de Joy Buolamwini et Timnit Gebru a montré que plusieurs logiciels commerciaux de reconnaissance faciale se trompaient beaucoup plus souvent sur le genre des femmes à la peau foncée que sur celui des hommes à la peau claire. Une des causes : des jeux de données d'entraînement où ces visages étaient peu nombreux. Nous reviendrons sur les biais au chapitre 8.</aside>
<aside class="retenir"><strong>À retenir.</strong> Avant d'entraîner une IA, il faut <strong>nettoyer</strong> les données (corriger, compléter, supprimer les doublons, harmoniser les formats) et vérifier qu'elles sont <strong>assez nombreuses</strong> et <strong>représentatives</strong>. C'est souvent l'étape la plus longue d'un projet d'IA.</aside>` },
      { t: "tri", titre: "Nettoyer à la main", q: "Un professeur a regroupé dans un tableur les notes sur 20 du dernier contrôle de la 2de3. Des erreurs se sont glissées. Pour chaque ligne, choisis la bonne action.",
        doc: `<table class="donnees"><thead><tr><th>Ligne</th><th>Nom</th><th>Prénom</th><th>Classe</th><th>Note /20</th></tr></thead><tbody><tr><td>1</td><td>Martin</td><td>Léa</td><td>2de3</td><td>14</td></tr><tr><td>2</td><td>Bernard</td><td>Hugo</td><td>2de3</td><td>9,5</td></tr><tr><td>3</td><td>Petit</td><td>Inès</td><td>2nde 3</td><td>16</td></tr><tr><td>4</td><td>Martin</td><td>Léa</td><td>2de3</td><td>14</td></tr><tr><td>5</td><td>Durand</td><td>Noah</td><td>2de3</td><td></td></tr><tr><td>6</td><td>Moreau</td><td>Jade</td><td>2de3</td><td>25</td></tr><tr><td>7</td><td>Laurent</td><td>Tom</td><td>2de4</td><td>11</td></tr><tr><td>8</td><td>Simon</td><td>Chloé</td><td>2de3</td><td>120</td></tr><tr><td>9</td><td>michel</td><td>lucas</td><td>2de3</td><td>12</td></tr><tr><td>10</td><td>Garcia</td><td>Emma</td><td>2de3</td><td>Abs</td></tr><tr><td>11</td><td>Roux</td><td>Adam</td><td>2de3</td><td>13.5</td></tr><tr><td>12</td><td>Fournier</td><td>Zoé</td><td>2de3</td><td>8</td></tr></tbody></table>`,
        categories: ["Corriger", "Supprimer la ligne", "Demander une vérification"],
        items: [
          { txt: "Ligne 3 : la classe est écrite « 2nde 3 ».", cat: 0, expl: "Format de classe différent : on l'harmonise sans risque." },
          { txt: "Ligne 4 : Martin Léa, 2de3, 14.", cat: 1, expl: "C'est un doublon de la ligne 1 : l'élève compterait double." },
          { txt: "Ligne 5 : la note est vide.", cat: 2, expl: "Absence ou oubli de saisie ? Seul le professeur peut le dire." },
          { txt: "Ligne 6 : la note vaut 25.", cat: 2, expl: "Note impossible sur 20 : seule la copie donne la bonne valeur." },
          { txt: "Ligne 7 : l'élève est en 2de4.", cat: 1, expl: "Il est hors du champ de l'étude, qui porte sur la 2de3." },
          { txt: "Ligne 8 : la note vaut 120.", cat: 2, expl: "Sans doute 12 mal saisi, mais ce n'est qu'une supposition : il faut vérifier." },
          { txt: "Ligne 9 : « michel lucas » sans majuscules.", cat: 0, expl: "Harmonisation sans risque." },
          { txt: "Ligne 11 : la note est écrite « 13.5 ».", cat: 0, expl: "Point décimal au lieu de la virgule : on harmonise." },
        ],
        expl: "La ligne 10 (« Abs ») demande aussi une vérification : un absent n'a pas de note, il faut l'exclure du calcul de la moyenne. Neuf lignes sur douze posaient problème." },
      { t: "qcm", titre: "Une note manquante", q: "Pourquoi ne faut-il pas remplacer automatiquement une note manquante par 0 ?",
        choix: ["Parce que 0 n'est pas un nombre.", "Parce qu'elle peut correspondre à un absent ou à un oubli : mettre 0 ferait baisser la moyenne et serait injuste.", "Parce que le tableur refuse les zéros."], bon: 1,
        expl: "Une valeur manquante n'est pas une valeur nulle." },
      { t: "lecon", titre: "Les conséquences d'un oubli, en Python",
        texte: `<p>Le programme ci-dessous calcule la moyenne d'une liste de notes, d'abord sans aucune vérification, puis après avoir écarté les valeurs impossibles. La valeur −1 signifie « absent ».</p><p>Exécute-le et compare les deux moyennes.</p>`,
        code: `# Notes d'un contrôle sur 20. La valeur -1 signifie « absent ».\nnotes = [12, 15.5, -1, 8, 25, 14, 11, 9.5, -1, 17, 13, 120]\n\ndef est_valide(note):\n    return 0 <= note <= 20\n\n# 1. Moyenne calculée sur toutes les valeurs, sans vérification\nsomme = 0\nfor note in notes:\n    somme = somme + note\nprint("Moyenne brute :", round(somme / len(notes), 2))\n\n# 2. Moyenne calculée après nettoyage\nvalides = []\nfor note in notes:\n    if est_valide(note):\n        valides.append(note)\nprint("Notes valides :", len(valides))\nprint("Moyenne après nettoyage :", round(sum(valides) / len(valides), 2))` },
      { t: "quiz", titre: "Comprendre le programme", code: `def est_valide(note):\n    return 0 <= note <= 20`,
        questions: [
          { q: "Que renvoient est_valide(20), est_valide(-1) et est_valide(25) ?", choix: ["True, False, False", "True, True, False", "False, False, True"], bon: 0, expl: "20 est une note possible ; −1 et 25 ne sont pas entre 0 et 20." },
          { q: "Le programme affiche une moyenne brute de 20,25 et une moyenne après nettoyage de 12,5. Quelle valeur fausse le plus la moyenne brute ?", choix: ["−1", "25", "120"], bon: 2, expl: "Une seule valeur aberrante suffit à rendre la moyenne absurde : 20,25 sur 20." },
          { q: "La valeur 120 est sans doute une note de 12 mal saisie. Le programme l'a-t-il corrigée ?", choix: ["Oui, il l'a remplacée par 12.", "Non, il l'a seulement écartée.", "Oui, il l'a remplacée par 20."], bon: 1, expl: "Laisser un programme deviner la correction peut introduire une erreur silencieuse (et si c'était 10 ou 20 ?). Il faut revenir à la source." },
          { q: "Une IA est entraînée à prédire la réussite des élèves avec des données non nettoyées, contenant des notes de 120. Que peut-il se passer ?", choix: ["Rien : l'IA ignore les erreurs.", "Elle apprend des liens absurdes et fait des prédictions faussées pour de vrais élèves.", "Elle corrige d'elle-même les notes."], bon: 1, expl: "Garbage in, garbage out." },
        ] },
      { t: "code", titre: "Compter les absents", d: 1, caches: ["compte_absents([-1, -1, -1])", "compte_absents([5, 20, 0])", "compte_absents([-1, 12, 1, -1, 11])"],
        enonce: `<p>Écris une fonction <code>compte_absents(notes)</code> qui renvoie le nombre d'élèves absents d'une liste de notes, c'est-à-dire le nombre de valeurs égales à <code>-1</code>.</p>`,
        depart: `notes = [12, 15.5, -1, 8, 25, 14, 11, 9.5, -1, 17, 13, 120]\n\ndef compte_absents(notes):\n    absents = 0\n    `,
        solution: `notes = [12, 15.5, -1, 8, 25, 14, 11, 9.5, -1, 17, 13, 120]\n\ndef compte_absents(notes):\n    absents = 0\n    for note in notes:\n        if note == -1:\n            absents = absents + 1\n    return absents`,
        tests: [{ appels: [["compte_absents(notes)", "2"], ["compte_absents([])", "0"], ["compte_absents([10, -1])", "1"]] }],
        indices: ["Parcours la liste avec for note in notes.", "Quand note == -1, le compteur augmente de 1. N'oublie pas le return."] },
      { t: "code", titre: "La moyenne après nettoyage", d: 2, caches: ["moyenne_valide([20, 0, 120])", "moyenne_valide([15.5, -1])", "moyenne_valide([7, 21, 9, -3, 11])"],
        enonce: `<p>Écris une fonction <code>moyenne_valide(notes)</code> qui renvoie la moyenne des seules notes valides, c'est-à-dire comprises entre 0 et 20. On suppose qu'il y a au moins une note valide.</p>`,
        depart: `notes = [12, 15.5, -1, 8, 25, 14, 11, 9.5, -1, 17, 13, 120]\n\ndef est_valide(note):\n    return 0 <= note <= 20\n\ndef moyenne_valide(notes):\n    `,
        solution: `notes = [12, 15.5, -1, 8, 25, 14, 11, 9.5, -1, 17, 13, 120]\n\ndef est_valide(note):\n    return 0 <= note <= 20\n\ndef moyenne_valide(notes):\n    somme = 0\n    nombre = 0\n    for note in notes:\n        if est_valide(note):\n            somme = somme + note\n            nombre = nombre + 1\n    return somme / nombre`,
        tests: [{ appels: [["moyenne_valide(notes)", "12.5"], ["moyenne_valide([10, 30, -1])", "10.0"], ["moyenne_valide([8, 12])", "10.0"]] }],
        indices: ["Il faut deux accumulateurs : la somme des notes valides et leur nombre.", "N'ajoute une note que si est_valide(note) est vrai, puis renvoie somme / nombre."] },
      { t: "code", titre: "Le négatif d'une image", d: 3, caches: ["negatif([[1]])", "negatif([[0, 0, 0]])", "negatif([[1, 0], [0, 1], [1, 1]])"],
        enonce: `<p>L'image de l'activité est stockée sous forme de liste de listes : chaque liste est une ligne de pixels. Exécute d'abord le programme pour l'afficher.</p><p>Écris ensuite une fonction <code>negatif(img)</code> qui renvoie une <strong>nouvelle</strong> image où chaque 0 devient 1 et chaque 1 devient 0.</p>`,
        depart: `image = [\n    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],\n    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],\n    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],\n    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],\n    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0],\n    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],\n    [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],\n    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],\n    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]\n\ndef afficher(img):\n    for ligne in img:\n        texte = ""\n        for pixel in ligne:\n            if pixel == 1:\n                texte = texte + "#"\n            else:\n                texte = texte + "."\n        print(texte)\n\ndef negatif(img):\n    resultat = []\n    # À compléter\n    return resultat\n\nafficher(image)`,
        solution: `image = [\n    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],\n    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],\n    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],\n    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],\n    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0],\n    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],\n    [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],\n    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],\n    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]\n\ndef afficher(img):\n    for ligne in img:\n        texte = ""\n        for pixel in ligne:\n            if pixel == 1:\n                texte = texte + "#"\n            else:\n                texte = texte + "."\n        print(texte)\n\ndef negatif(img):\n    resultat = []\n    for ligne in img:\n        nouvelle = []\n        for pixel in ligne:\n            nouvelle.append(1 - pixel)\n        resultat.append(nouvelle)\n    return resultat\n\nafficher(negatif(image))`,
        tests: [{ appels: [["negatif([[0, 1], [1, 1]])", "[[1, 0], [0, 0]]"], ["negatif(image)[0]", "[1, 0, 1, 1, 1, 1, 1, 1, 0, 1]"], ["sum(sum(ligne) for ligne in negatif(image))", "50", "Le négatif de l'image compte 50 pixels noirs"], ["image[0]", "[0, 1, 0, 0, 0, 0, 0, 0, 1, 0]", "L'image d'origine n'est pas modifiée"]] }],
        indices: ["Pour chaque ligne de l'image, construis une nouvelle ligne, puis ajoute-la à resultat.", "Le contraire d'un pixel se calcule par 1 - pixel : 1 - 0 = 1 et 1 - 1 = 0.", "Deux boucles imbriquées : for ligne in img, puis for pixel in ligne."] },
      { t: "qcm", titre: "Le même chat ?", q: "Pour un ordinateur, l'image et son négatif sont-ils « le même chat » ?",
        choix: ["Oui : il reconnaît la forme, comme nous.", "Non : presque tous les nombres ont changé.", "Oui : le négatif contient les mêmes nombres dans un autre ordre."], bon: 1,
        expl: "Pour nous, c'est le même chat ; pour l'ordinateur, tout a changé. Il faut donc fournir des images variées (couleurs, éclairages, contrastes) pour que l'IA apprenne ce qui ne change pas d'une photo à l'autre." },
      { t: "quiz", titre: "Une IA de reconnaissance d'oiseaux", intro: "Une application doit reconnaître les oiseaux à partir de photos. Elle a été entraînée sur 50 000 photos prises en France, en plein jour et au printemps.",
        questions: [
          { q: "Que peut-on dire de ce jeu de données ?", choix: ["Il est trop petit.", "Sa taille est correcte, mais il n'est pas représentatif.", "Il est parfait."], bon: 1, expl: "Un seul pays, une seule saison, uniquement de jour." },
          { q: "Dans quelle situation l'application risque-t-elle le plus de se tromper ?", choix: ["Une mésange photographiée en France, un midi d'avril.", "Un oiseau migrateur photographié en hiver, au crépuscule.", "Un moineau photographié dans un jardin au printemps."], bon: 1, expl: "Plumage différent en hiver, lumière différente : l'IA n'a jamais vu de telles photos." },
          { q: "Comment améliorer ce jeu de données ?", choix: ["En supprimant la moitié des photos.", "En ajoutant des photos prises à toutes les saisons, à différentes heures, dans différents pays et sous différents angles.", "En ne gardant que les plus belles photos."], bon: 1, expl: "Avec des étiquettes vérifiées par des spécialistes." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Dans une table de données, chaque colonne correspond…", choix: ["à un objet.", "à un descripteur.", "à une erreur.", "à un pixel."], bon: 1, expl: "Chaque ligne décrit un objet, chaque colonne un descripteur." },
          { q: "En niveaux de gris, un pixel blanc a pour valeur…", choix: ["0.", "1.", "100.", "255."], bon: 3, expl: "0 pour le noir, 255 pour le blanc." },
          { q: "Une étiquette est…", choix: ["la réponse attendue associée à une donnée.", "le nom du fichier.", "la taille d'une image.", "un défaut des données."], bon: 0, expl: "C'est ce que l'IA doit apprendre à prédire." },
          { q: "Le même client apparaît deux fois dans une table. C'est…", choix: ["un doublon.", "une étiquette.", "un descripteur.", "une donnée de test."], bon: 0, expl: "Il compterait double." },
          { q: "Une IA de diagnostic entraînée uniquement sur des patients adultes risque de mal fonctionner sur des enfants. Il s'agit d'un problème…", choix: ["de format.", "de représentativité des données.", "de doublons.", "de pixels."], bon: 1, expl: "Les enfants sont absents des données d'entraînement." },
          { q: "L'expression « garbage in, garbage out » signifie que…", choix: ["les données doivent être supprimées après usage.", "une IA trie automatiquement les déchets.", "des données de mauvaise qualité donnent de mauvais résultats.", "il faut toujours plus de données."], bon: 2, expl: "Une IA reproduit les défauts de ses données." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Vocabulaire.</strong> Une <strong>donnée</strong> est une information enregistrée sous forme numérique. Un <strong>jeu de données</strong> décrit des <strong>objets</strong> (lignes) par des <strong>descripteurs</strong> (colonnes). L'<strong>étiquette</strong> est la réponse attendue que l'IA doit apprendre.</p>
<p><strong>Deux familles de données.</strong> <strong>Structurées</strong> : format fixe, en table (notes, horaires, relevés). <strong>Non structurées</strong> : sans format fixe (textes, images, sons, vidéos), la grande majorité.</p>
<p><strong>Une image, ce sont des nombres.</strong> Un pixel vaut de 0 (noir) à 255 (blanc) en niveaux de gris ; en couleur, il est décrit par trois nombres (RVB). Une photo représente des millions de nombres.</p>
<p><strong>Entraînement et test.</strong> On n'évalue jamais une IA sur ses données d'entraînement : il faut vérifier qu'elle <strong>généralise</strong>.</p>
<p><strong>Qualité des données.</strong> Défauts à repérer : erreurs de saisie, valeurs manquantes, doublons, formats incohérents, quantité insuffisante, manque de représentativité, données périmées. Une IA reproduit les défauts et les <strong>biais</strong> de ses données : <em>garbage in, garbage out</em>.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>définir donnée, descripteur, étiquette</li><li>distinguer structuré et non structuré</li><li>expliquer comment une image est codée</li><li>justifier la séparation entraînement/test</li><li>repérer les défauts d'un jeu de données</li><li>filtrer une liste de valeurs en Python</li></ul>` },
    ]
  },
  {
    id: "c3", num: 3, titre: "Comment l'IA apprend-elle ?", resume: "Entraînement, types d'apprentissage, k plus proches voisins",
    etapes: [
      { t: "qcm", titre: "Vous êtes l'algorithme",
        q: "Sur une planète lointaine vivent deux espèces : les Zips et les Glops. Une exploratrice a décrit huit créatures. Joue l'algorithme d'apprentissage : quelle règle classe correctement les huit créatures ?",
        doc: TABLE_ZIPS,
        choix: ["Les Zips ont deux yeux, les Glops un ou trois.", "Les Zips sont verts.", "Les Zips ont des antennes, les Glops n'en ont pas.", "Les Zips mesurent moins de 20 cm, les Glops plus."], bons: [2, 3],
        retours: ["Les créatures 4 et 8 ont deux yeux et sont des Glops ; la créature 3 a trois yeux et c'est un Zip.", "La créature 8 est verte et c'est un Glop ; la créature 7 est bleue et c'est un Zip.", "", ""],
        expl: "Ta règle fonctionne… mais il en existe une autre qui fonctionne tout aussi bien. « Les Zips ont des antennes » et « les Zips mesurent moins de 20 cm » expliquent toutes les deux parfaitement les huit exemples. Laquelle est la bonne ?" },
      { t: "tri", titre: "Le test", q: "L'exploratrice découvre quatre nouvelles créatures. Applique la règle « antennes » et la règle « taille » à chacune : sont-elles d'accord ?",
        doc: `<table class="donnees"><thead><tr><th>Créature</th><th>Taille (cm)</th><th>Yeux</th><th>Couleur</th><th>Antennes</th></tr></thead><tbody><tr><td>A</td><td>14</td><td>2</td><td>rouge</td><td>oui</td></tr><tr><td>B</td><td>35</td><td>2</td><td>verte</td><td>non</td></tr><tr><td>C</td><td>11</td><td>1</td><td>bleue</td><td>non</td></tr><tr><td>D</td><td>26</td><td>3</td><td>verte</td><td>oui</td></tr></tbody></table>`,
        categories: ["Les deux règles sont d'accord", "Elles se contredisent"],
        items: [
          { txt: "Créature A", cat: 0, expl: "Antennes : Zip. Moins de 20 cm : Zip." },
          { txt: "Créature B", cat: 0, expl: "Pas d'antennes : Glop. Plus de 20 cm : Glop." },
          { txt: "Créature C", cat: 1, expl: "Pas d'antennes : Glop. Mais 11 cm : Zip." },
          { txt: "Créature D", cat: 1, expl: "Antennes : Zip. Mais 26 cm : Glop." },
        ],
        expl: "Les huit exemples ne permettaient pas de savoir quelle règle était la bonne. Il aurait fallu des exemples qui les départagent, comme une petite créature sans antennes. La règle de l'exploratrice était celle des antennes. Observer des exemples, chercher les descripteurs qui séparent les espèces, formuler une règle, la vérifier, puis l'appliquer à de nouveaux cas : c'est le principe de l'apprentissage supervisé." },
      { t: "lecon", titre: "Apprendre, pour une machine",
        texte: `<p>Pour un système d'IA, <strong>apprendre</strong> consiste à ajuster un modèle à partir d'exemples, de façon à ce qu'il donne de bonnes réponses sur des exemples <strong>nouveaux</strong>. Cette capacité à bien répondre sur des données jamais vues s'appelle la <strong>généralisation</strong>.</p>
<p>Comme dans l'activité, apprendre, ce n'est pas mémoriser les exemples : c'est en extraire une règle générale. Et comme dans l'activité, plusieurs règles peuvent expliquer les mêmes exemples : la qualité et la variété des données sont décisives.</p>
<ol class="phases"><li><strong>Entraînement</strong> le modèle s'ajuste sur les données d'entraînement</li><li><strong>Test</strong> on mesure ses erreurs sur des données jamais vues</li><li><strong>Utilisation</strong> le modèle répond à de vraies demandes</li></ol>
<p>Si le test révèle trop d'erreurs, on corrige les données ou la méthode, puis on recommence l'entraînement.</p>` },
      { t: "qcm", titre: "Généraliser", q: "Pour une IA, bien généraliser signifie…",
        choix: ["répondre très vite.", "bien répondre sur des données jamais vues.", "retenir tous ses exemples par cœur.", "utiliser beaucoup d'énergie."], bon: 1,
        expl: "Retenir ses exemples par cœur ne sert à rien si le modèle échoue sur des cas nouveaux." },
      { t: "lecon", titre: "L'apprentissage supervisé",
        texte: `<p>En <strong>apprentissage supervisé</strong>, chaque exemple d'entraînement est accompagné de la bonne réponse, son <strong>étiquette</strong>. Le système apprend à associer les données à leurs étiquettes.</p>
<p>On distingue deux grandes tâches :</p>
<ul><li>la <strong>classification</strong> : la réponse est une catégorie (« spam » ou « non spam », « chat » ou « chien », le chiffre de 0 à 9) ;</li><li>la <strong>régression</strong> : la réponse est un nombre (le prix d'un appartement, la température de demain, le temps de trajet).</li></ul>` },
      { t: "tri", titre: "Classification ou régression ?", q: "Ces tâches d'apprentissage supervisé sont-elles des classifications ou des régressions ?",
        categories: ["Classification", "Régression"],
        items: [
          { txt: "Dire si une radio montre une fracture.", cat: 0, expl: "La réponse est une catégorie : fracture ou non." },
          { txt: "Estimer la consommation électrique de demain.", cat: 1, expl: "La réponse est un nombre." },
          { txt: "Reconnaître la langue d'un texte.", cat: 0, expl: "La réponse est une catégorie : une langue parmi d'autres." },
          { txt: "Prédire le prix d'une maison.", cat: 1, expl: "La réponse est un nombre." },
        ] },
      { t: "lecon", titre: "Sans étiquette, ou par essais et erreurs",
        texte: `<p>En <strong>apprentissage non supervisé</strong>, les exemples n'ont pas d'étiquette. Le système cherche lui-même des structures dans les données, par exemple en formant des <strong>groupes</strong> d'objets qui se ressemblent : regrouper les clients d'un magasin selon leurs habitudes d'achat, regrouper des photos qui se ressemblent, repérer un comportement inhabituel sur une carte bancaire. Le système trouve des groupes, mais c'est à l'humain de leur donner un sens.</p>
<p>En <strong>apprentissage par renforcement</strong>, un <strong>agent</strong> agit dans un <strong>environnement</strong>. Après chaque action, il reçoit une <strong>récompense</strong> ou une pénalité. Par essais et erreurs, il apprend la stratégie qui rapporte le plus de récompenses : un programme qui apprend à jouer à un jeu vidéo (récompense : le score), un robot qui apprend à marcher (récompense : la distance parcourue sans tomber).</p>
<p>AlphaGo a combiné apprentissage supervisé, sur des parties humaines, et apprentissage par renforcement, en jouant des millions de parties contre lui-même.</p>
<table class="donnees large"><thead><tr><th>Type</th><th>Données</th><th>Exemple</th></tr></thead><tbody><tr><th>Supervisé</th><td>exemples <strong>avec</strong> étiquettes</td><td>reconnaître des chiffres manuscrits</td></tr><tr><th>Non supervisé</th><td>exemples <strong>sans</strong> étiquette</td><td>regrouper des clients</td></tr><tr><th>Par renforcement</th><td>récompenses obtenues en agissant</td><td>apprendre à jouer</td></tr></tbody></table>` },
      { t: "tri", titre: "Quel type d'apprentissage ?", q: "Pour chaque situation, indique le type d'apprentissage.",
        categories: ["Supervisé", "Non supervisé", "Par renforcement"],
        items: [
          { txt: "Un logiciel apprend à reconnaître les champignons comestibles à partir de 10 000 photos identifiées par des mycologues.", cat: 0, expl: "Les photos sont identifiées : ce sont des exemples étiquetés." },
          { txt: "Un site de vente regroupe ses clients en profils d'acheteurs, sans savoir à l'avance quels profils existent.", cat: 1, expl: "Il n'y a pas de catégories connues à l'avance." },
          { txt: "Un programme apprend à jouer à Tetris en essayant de maximiser son score.", cat: 2, expl: "La récompense est le score." },
          { txt: "Une banque prédit si un client remboursera son prêt d'après l'historique de milliers de prêts.", cat: 0, expl: "On connaît l'issue des prêts passés : ce sont les étiquettes." },
          { txt: "Un drone apprend à se poser en douceur ; chaque atterrissage brutal lui fait perdre des points.", cat: 2, expl: "Il apprend grâce à des pénalités." },
        ] },
      { t: "quiz", titre: "L'aspirateur qui apprend", intro: "Un robot aspirateur apprend par renforcement à nettoyer une pièce. Il gagne un point par mètre carré nettoyé et en perd cinq à chaque choc contre un meuble.",
        questions: [
          { q: "Dans cette situation, quel est l'environnement ?", choix: ["Le robot.", "La pièce et ses meubles.", "Les points gagnés et perdus."], bon: 1, expl: "L'agent est le robot ; ses actions sont avancer, tourner, reculer, s'arrêter ; la récompense est de +1 par mètre carré nettoyé et de −5 par choc." },
          { q: "Au début, le robot se cogne sans arrêt. Pourquoi est-ce normal ?", choix: ["Il est mal fabriqué.", "Il ne sait rien encore : il apprend par essais et erreurs.", "Il cherche à perdre des points."], bon: 1, expl: "Les chocs font partie des essais." },
          { q: "Que pourrait apprendre un robot qui ne perdrait aucun point en cas de choc ?", choix: ["À éviter soigneusement les meubles.", "À foncer partout sans éviter les meubles.", "À ne plus bouger."], bon: 1, expl: "L'IA optimise exactement la récompense qu'on lui donne, pas ce que l'on voulait « vraiment ». Bien choisir la récompense est essentiel." },
        ] },
      { t: "lecon", titre: "Les k plus proches voisins",
        texte: `<p>Un entomologiste veut distinguer automatiquement les <strong>sauterelles</strong> des <strong>criquets</strong>. Il a mesuré douze insectes déjà identifiés. Chaque insecte devient un point dont les coordonnées sont deux descripteurs : la longueur du corps et celle des antennes.</p>
<p>Pour classer un nouvel objet avec la méthode des <strong>k plus proches voisins</strong> :</p>
<ol><li>on calcule sa distance à chacun des objets étiquetés ;</li><li>on retient les k objets les plus proches ;</li><li>on lui attribue l'étiquette la plus fréquente parmi ces k voisins.</li></ol>
<p>Dans un repère orthonormé, la distance entre les points A(x<sub>A</sub> ; y<sub>A</sub>) et B(x<sub>B</sub> ; y<sub>B</sub>) se calcule avec la formule vue en mathématiques :</p>
<p class="formule">AB = √( (x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)² )</p>
<p>À l'étape suivante, tu vas déplacer toi-même un insecte inconnu parmi les douze insectes connus et observer le vote de ses voisins.</p>` },
      { t: "quiz", titre: "Manipuler les plus proches voisins", widget: "knn",
        intro: "Déplace l'insecte inconnu (l'étoile) et change la valeur de k. Les traits relient l'insecte à ses k plus proches voisins : à toi de les faire voter. Le verdict de la machine ne s'affichera qu'une fois les questions réussies.",
        questions: [
          { q: "Place l'insecte en N3 (3,0 ; 2,8). Avec k = 1, comment est-il classé ?", choix: ["Sauterelle", "Criquet"], bon: 0, expl: "Son plus proche voisin est la sauterelle (3,0 ; 4,0), à 1,2 cm." },
          { q: "Toujours en N3, passe à k = 3. Comment est-il classé ?", choix: ["Sauterelle", "Criquet"], bon: 1, expl: "Parmi ses trois voisins, il y a une sauterelle (distance 1,20) et deux criquets (distances 1,39 et 1,64). Le choix de k peut changer la réponse." },
          { q: "Ajoute la sauterelle à l'antenne cassée, puis place l'insecte en (3,2 ; 2,4). On sait que c'est un criquet. Que répond la méthode avec k = 1, puis avec k = 3 ?", choix: ["Sauterelle, puis criquet", "Criquet, puis criquet", "Sauterelle, puis sauterelle", "Criquet, puis sauterelle"], bon: 0, expl: "Avec k = 1, le plus proche voisin est la sauterelle atypique, à 0,28 cm : erreur. Avec k = 3, les deux voisins suivants sont des criquets. Un seul exemple atypique trompe la méthode avec k = 1 ; le vote de plusieurs voisins la rend plus robuste." },
          { q: "Pourquoi choisit-on en général un nombre k impair ?", choix: ["Pour aller plus vite.", "Pour éviter les égalités lors du vote entre deux étiquettes.", "Pour économiser de la mémoire."], bon: 1, expl: "Avec deux étiquettes et k impair, le vote ne peut pas aboutir à une égalité. Un k trop petit rend le système sensible aux exemples atypiques ; un k trop grand le rend aveugle aux détails." },
        ] },
      { t: "qcm", titre: "Calculer une distance", q: "La distance entre A(1 ; 2) et B(4 ; 6) vaut…", choix: ["5", "7", "25", "√7"], bon: 0,
        expl: "AB = √(3² + 4²) = √25 = 5." },
      { t: "code", titre: "Le plus proche voisin en Python", d: 2,
        caches: ["plus_proche_voisin(5.0, 5.5)", "plus_proche_voisin(3.0, 1.2)", "plus_proche_voisin(2.6, 1.9)", "plus_proche_voisin(4.4, 3.4)"],
        enonce: `<p>Complète la fonction <code>plus_proche_voisin(x, y)</code>, qui renvoie l'étiquette de l'insecte connu le plus proche du point de coordonnées (x ; y).</p><p>La variable <code>meilleure_distance</code> retient la plus petite distance trouvée jusqu'ici, et <code>meilleure_etiquette</code> l'étiquette de l'insecte correspondant. On part de 1000, une valeur plus grande que toutes les distances possibles.</p>`,
        depart: INSECTES_PY + `\ndef plus_proche_voisin(x, y):\n    meilleure_distance = 1000\n    meilleure_etiquette = ""\n    for (cx, cy, etiquette) in insectes:\n        d = distance(x, y, cx, cy)\n        # À compléter : si cet insecte est plus proche que le meilleur\n        # trouvé jusqu'ici, il devient le nouveau meilleur.\n    return meilleure_etiquette\n\nprint(plus_proche_voisin(4.0, 4.0))`,
        solution: INSECTES_PY + `\ndef plus_proche_voisin(x, y):\n    meilleure_distance = 1000\n    meilleure_etiquette = ""\n    for (cx, cy, etiquette) in insectes:\n        d = distance(x, y, cx, cy)\n        if d < meilleure_distance:\n            meilleure_distance = d\n            meilleure_etiquette = etiquette\n    return meilleure_etiquette\n\nprint(plus_proche_voisin(4.0, 4.0))`,
        tests: [{ appels: [["plus_proche_voisin(4.0, 4.0)", "'sauterelle'"], ["plus_proche_voisin(4.8, 1.8)", "'criquet'"], ["plus_proche_voisin(3.0, 2.8)", "'sauterelle'"]] }],
        indices: ["Compare d à meilleure_distance avec un if.", "Si d est plus petite, il faut mettre à jour les deux variables : meilleure_distance = d et meilleure_etiquette = etiquette."] },
      { t: "predire", titre: "Lire la liste des distances",
        code: `distances = [(0.5, "criquet"), (0.8, "sauterelle"), (0.9, "sauterelle"), (1.4, "criquet")]\nprint(distances[1][1])\nnb_sauterelles = 0\nfor i in range(3):\n    if distances[i][1] == "sauterelle":\n        nb_sauterelles = nb_sauterelles + 1\nprint(nb_sauterelles)`,
        attendu: "sauterelle\n2",
        expl: "distances[1] est le deuxième couple, (0.8, \"sauterelle\"), et son deuxième élément est \"sauterelle\". Parmi les trois premiers couples, deux sont des sauterelles." },
      { t: "code", titre: "Faire voter k voisins", d: 3,
        caches: ["k_voisins(3.0, 2.8, 5)", "k_voisins(5.0, 5.0, 7)", "k_voisins(2.5, 1.5, 1)", "k_voisins(3.2, 2.4, 3)", "k_voisins(4.0, 3.2, 3)"],
        enonce: `<p>Complète la fonction <code>k_voisins(x, y, k)</code>. La liste <code>distances</code>, déjà construite et triée, contient des couples (distance, étiquette) du plus proche au plus lointain.</p><p>Compte les sauterelles parmi les k premiers couples. Si elles sont majoritaires (plus de k / 2), renvoie <code>"sauterelle"</code>, sinon <code>"criquet"</code>.</p>`,
        depart: INSECTES_PY + `\ndef k_voisins(x, y, k):\n    distances = []\n    for (cx, cy, etiquette) in insectes:\n        distances.append((distance(x, y, cx, cy), etiquette))\n    distances.sort()          # du plus proche au plus lointain\n    nb_sauterelles = 0\n    # À compléter : compter les sauterelles parmi les k premiers couples,\n    # puis renvoyer l'étiquette majoritaire.\n\nprint(k_voisins(3.0, 2.8, 3))`,
        solution: INSECTES_PY + `\ndef k_voisins(x, y, k):\n    distances = []\n    for (cx, cy, etiquette) in insectes:\n        distances.append((distance(x, y, cx, cy), etiquette))\n    distances.sort()          # du plus proche au plus lointain\n    nb_sauterelles = 0\n    for i in range(k):\n        if distances[i][1] == "sauterelle":\n            nb_sauterelles = nb_sauterelles + 1\n    if nb_sauterelles > k / 2:\n        return "sauterelle"\n    else:\n        return "criquet"\n\nprint(k_voisins(3.0, 2.8, 3))`,
        tests: [{ appels: [["k_voisins(4.0, 4.0, 3)", "'sauterelle'"], ["k_voisins(4.8, 1.8, 3)", "'criquet'"], ["k_voisins(3.0, 2.8, 1)", "'sauterelle'"], ["k_voisins(3.0, 2.8, 3)", "'criquet'"]] }],
        indices: ["Une boucle for i in range(k) parcourt les k plus proches voisins.", "L'étiquette du voisin numéro i est distances[i][1].", "Après la boucle : if nb_sauterelles > k / 2, alors « sauterelle », sinon « criquet »."] },
      { t: "lecon", titre: "Pourquoi une IA se trompe-t-elle ?",
        texte: `<p>Il y a <strong>surapprentissage</strong> lorsqu'un modèle colle tellement à ses données d'entraînement, défauts compris, qu'il les « apprend par cœur » et généralise mal : excellent à l'entraînement, il se trompe souvent sur des données nouvelles.</p>
<p>Une IA peut aussi se tromper parce que ses données sont trop peu nombreuses, peu représentatives ou mal étiquetées, ou parce que les descripteurs choisis ne suffisent pas à distinguer les cas : avec la seule longueur du corps, impossible de séparer criquets et sauterelles.</p>
<aside class="retenir"><strong>À retenir.</strong> Une IA qui apprend à partir d'exemples <strong>fait des erreurs</strong>, même bien entraînée : elle donne la réponse la plus probable d'après ce qu'elle a vu. On mesure ses performances par un <strong>taux d'erreur</strong> calculé sur des données de test, et ce taux n'est jamais garanti nul.</aside>` },
      { t: "quiz", titre: "Surapprentissage ?", intro: "Trois équipes ont entraîné une IA à reconnaître des panneaux routiers. Voici leurs taux de bonnes réponses.",
        doc: `<table class="donnees"><thead><tr><th>Équipe</th><th>Données d'entraînement</th><th>Données de test</th></tr></thead><tbody><tr><th>Alpha</th><td>99 %</td><td>62 %</td></tr><tr><th>Bêta</th><td>71 %</td><td>69 %</td></tr><tr><th>Gamma</th><td>95 %</td><td>93 %</td></tr></tbody></table>`,
        questions: [
          { q: "Quelle équipe a vraisemblablement fait du surapprentissage ?", choix: ["Alpha", "Bêta", "Gamma"], bon: 0, expl: "Excellente sur l'entraînement (99 %) mais bien moins bonne en test (62 %) : elle a appris par cœur ses exemples." },
          { q: "Quel modèle choisirais-tu pour une voiture ?", choix: ["Alpha, le meilleur à l'entraînement.", "Bêta, le plus régulier.", "Gamma, le meilleur sur les données de test."], bon: 2, expl: "Les données de test sont les seules qui reflètent l'usage réel." },
          { q: "Le meilleur modèle se trompe encore 7 fois sur 100. Pour une voiture autonome, c'est…", choix: ["acceptable : 93 % est une très bonne note.", "beaucoup trop : une seule erreur, comme un « stop » non reconnu, peut être grave.", "sans importance, tant que le conducteur est prudent."], bon: 1, expl: "Une voiture croise des centaines de panneaux par trajet. Pour une application à risque, il faut des taux d'erreur bien plus faibles, des systèmes de sécurité complémentaires et des tests dans des conditions variées." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "En apprentissage supervisé, les exemples d'entraînement…", choix: ["n'ont pas d'étiquette.", "sont générés au hasard.", "sont accompagnés de la bonne réponse.", "sont des récompenses."], bon: 2, expl: "Cette bonne réponse s'appelle l'étiquette." },
          { q: "Regrouper des chansons qui se ressemblent, sans catégories prévues, relève de l'apprentissage…", choix: ["supervisé.", "par renforcement.", "non supervisé.", "par cœur."], bon: 2, expl: "Le système forme lui-même des groupes." },
          { q: "En apprentissage par renforcement, l'agent apprend grâce…", choix: ["à des récompenses et des pénalités.", "à des étiquettes écrites par des humains.", "à un dictionnaire.", "à des données de test."], bon: 0, expl: "Il apprend par essais et erreurs." },
          { q: "Avec la méthode des k plus proches voisins, le nouvel objet reçoit…", choix: ["l'étiquette du point le plus éloigné.", "une étiquette tirée au hasard.", "l'étiquette majoritaire parmi ses k plus proches voisins.", "toujours l'étiquette la plus fréquente du jeu de données."], bon: 2, expl: "Ses k plus proches voisins votent." },
          { q: "Un modèle excellent sur ses données d'entraînement mais mauvais sur les données de test fait probablement…", choix: ["du renforcement.", "du surapprentissage.", "de la régression.", "du regroupement."], bon: 1, expl: "Il a appris ses exemples par cœur." },
          { q: "Une IA bien entraînée…", choix: ["ne se trompe jamais.", "se trompe uniquement si elle est en panne.", "peut se tromper : elle donne la réponse la plus probable.", "ne peut pas être testée."], bon: 2, expl: "Son taux d'erreur n'est jamais garanti nul." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Apprendre</strong>, pour une machine, c'est ajuster un modèle à partir d'exemples pour bien répondre sur des exemples <strong>nouveaux</strong> : c'est la <strong>généralisation</strong>. Trois phases : <strong>entraînement</strong>, <strong>test</strong>, <strong>utilisation</strong>.</p>
<p><strong>Trois types d'apprentissage.</strong></p><ul><li><strong>Supervisé</strong> : exemples <strong>étiquetés</strong> ; classification (catégorie) ou régression (nombre).</li><li><strong>Non supervisé</strong> : exemples <strong>sans étiquette</strong> ; le système forme des groupes.</li><li><strong>Par renforcement</strong> : un agent agit, reçoit des <strong>récompenses</strong>, apprend par essais et erreurs.</li></ul>
<p><strong>Les k plus proches voisins.</strong> Pour classer un nouvel objet : calculer sa distance à tous les objets étiquetés, garder les k plus proches, retenir l'étiquette majoritaire.</p>
<p class="formule">AB = √( (x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)² )</p>
<p>Le choix de k change la réponse : k petit, sensible aux exemples atypiques ; k impair pour éviter les égalités.</p>
<p><strong>Les erreurs.</strong> Une IA donne la réponse la plus probable : elle <strong>se trompe parfois</strong>. Causes : données insuffisantes ou peu représentatives, mauvais descripteurs, <strong>surapprentissage</strong> (« par cœur » : très bon à l'entraînement, mauvais au test).</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>définir apprentissage et généralisation</li><li>distinguer classification et régression</li><li>reconnaître les trois types d'apprentissage</li><li>appliquer les k plus proches voisins</li><li>expliquer le surapprentissage</li></ul>` },
    ]
  },
  {
    id: "c4", num: 4, titre: "Les réseaux de neurones, cerveaux artificiels ?", resume: "Neurone artificiel, couches, entraînement, limites de la comparaison",
    etapes: [
      { t: "tri", titre: "Du neurone biologique au neurone artificiel",
        q: "Un neurone du cerveau reçoit des signaux par ses dendrites, les « additionne » dans son corps cellulaire et, si l'excitation dépasse un seuil, émet à son tour un signal le long de son axone. En 1943, Warren McCulloch et Walter Pitts en ont proposé un modèle mathématique très simplifié : le neurone formel. Relie chaque élément du neurone biologique à son équivalent artificiel.",
        categories: ["Entrées", "Poids", "Somme et seuil", "Sortie"],
        items: [
          { txt: "Les dendrites", cat: 0, expl: "Elles reçoivent les signaux." },
          { txt: "Les synapses", cat: 1, expl: "Elles renforcent ou affaiblissent le signal." },
          { txt: "Le corps cellulaire", cat: 2, expl: "Il additionne les signaux et ne réagit qu'au-delà d'un seuil." },
          { txt: "L'axone", cat: 3, expl: "Il transmet le signal émis." },
        ] },
      { t: "quiz", titre: "Vais-je au cinéma ?",
        intro: "Samir décide d'aller au cinéma ce soir comme le ferait un neurone. Il examine trois entrées, qui valent 1 (oui) ou 0 (non).",
        doc: `<table class="donnees large"><thead><tr><th>Entrée</th><th>Signification</th><th>Poids</th></tr></thead><tbody><tr><th>x<sub>1</sub></th><td>le film a de bonnes critiques</td><td>w<sub>1</sub> = 3</td></tr><tr><th>x<sub>2</sub></th><td>ses amis sont disponibles</td><td>w<sub>2</sub> = 2</td></tr><tr><th>x<sub>3</sub></th><td>il a un devoir à rendre demain</td><td>w<sub>3</sub> = −4</td></tr></tbody></table><p class="formule">s = 3 x<sub>1</sub> + 2 x<sub>2</sub> − 4 x<sub>3</sub>, et il va au cinéma si s &gt; 2</p>`,
        questions: [
          { q: "Bonnes critiques, amis disponibles, pas de devoir (1 ; 1 ; 0). Que fait Samir ?", choix: ["s = 5 : il va au cinéma.", "s = 1 : il reste chez lui.", "s = 9 : il va au cinéma."], bon: 0, expl: "s = 3 + 2 − 0 = 5, et 5 > 2." },
          { q: "Critiques mauvaises, amis disponibles, pas de devoir (0 ; 1 ; 0). Que fait Samir ?", choix: ["s = 2 : il va au cinéma.", "s = 2 : il reste chez lui.", "s = 5 : il va au cinéma."], bon: 1, expl: "s = 2, et 2 n'est pas strictement supérieur à 2." },
          { q: "Bonnes critiques, amis disponibles, mais un devoir (1 ; 1 ; 1). Que fait Samir ?", choix: ["s = 5 : il va au cinéma.", "s = 9 : il va au cinéma.", "s = 1 : il reste chez lui."], bon: 2, expl: "s = 3 + 2 − 4 = 1." },
          { q: "Que signifie le signe négatif du poids w₃ ?", choix: ["Avoir un devoir dissuade Samir.", "Le devoir ne compte pas.", "Avoir un devoir l'encourage à sortir."], bon: 0, expl: "Un poids négatif fait baisser la somme. C'est même l'entrée qui compte le plus : sa valeur absolue, 4, est la plus grande." },
        ] },
      { t: "atelier", titre: "La sœur de Samir",
        intro: "Change les poids avec les curseurs : le tableau recalcule la décision dans les huit situations possibles.",
        objectifs: [{ consigne: "La sœur de Samir va au cinéma dès que ses amis sont disponibles, devoir ou pas, et n'y va jamais sans eux. Trouve des poids qui décrivent son comportement.",
          entrees: ["critiques", "amis", "devoir"], poids: [3, 2, -4], min: -5, max: 5, pas: 1, seuil: 2, cible: "amis",
          expl: "Par exemple w₁ = 0, w₂ = 3 et w₃ = 0 : seule la présence des amis compte. Dans cette activité, c'est toi qui fixes les poids ; dans une IA, ils sont appris à partir d'exemples." }] },
      { t: "lecon", titre: "Le neurone artificiel",
        texte: `<p>Un <strong>neurone artificiel</strong> est une petite fonction mathématique :</p>
<ol><li>il reçoit des nombres en <strong>entrée</strong> : x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>… ;</li><li>il multiplie chaque entrée par un <strong>poids</strong> (w<sub>1</sub>, w<sub>2</sub>, w<sub>3</sub>…), qui mesure son importance, et ajoute un <strong>biais</strong> b ;</li><li>il applique à la somme obtenue une <strong>fonction d'activation</strong>, par exemple un seuil : la sortie vaut y = 1 si s &gt; 0, et y = 0 sinon.</li></ol>
<p class="formule">s = w<sub>1</sub> x<sub>1</sub> + w<sub>2</sub> x<sub>2</sub> + w<sub>3</sub> x<sub>3</sub> + b</p>
<p><strong>Exemple.</strong> Avec w<sub>1</sub> = 2, w<sub>2</sub> = −1, w<sub>3</sub> = 0,5, b = −1 et les entrées x<sub>1</sub> = 1, x<sub>2</sub> = 3, x<sub>3</sub> = 4 : s = 2 × 1 + (−1) × 3 + 0,5 × 4 − 1 = 0. Comme s n'est pas strictement positif, la sortie vaut y = 0.</p>
<p>Les poids et le biais sont les <strong>paramètres</strong> du neurone : ce sont eux que l'apprentissage va régler.</p>
<aside class="savoir"><strong>Le perceptron.</strong> En 1958, Frank Rosenblatt construit le <strong>perceptron</strong>, le premier neurone artificiel capable d'apprendre ses poids à partir d'exemples. En 1969, Marvin Minsky et Seymour Papert montrent qu'un neurone seul ne peut résoudre que des problèmes où une ligne droite sépare les deux catégories : il est incapable, par exemple, de calculer le « ou exclusif ». Cette limite contribue au premier « hiver de l'IA ». La solution viendra plus tard : assembler de nombreux neurones en réseau.</aside>` },
      { t: "quiz", titre: "Calculer une sortie",
        intro: "Un neurone a pour poids w₁ = 1,5, w₂ = −2, w₃ = 1 et pour biais b = −0,5. Sa sortie vaut 1 si s > 0, et 0 sinon.",
        questions: [
          { q: "Pour les entrées (1 ; 0 ; 0) ?", choix: ["s = 1, donc y = 1", "s = 1,5, donc y = 1", "s = −0,5, donc y = 0"], bon: 0, expl: "s = 1,5 − 0,5 = 1." },
          { q: "Pour les entrées (1 ; 1 ; 1) ?", choix: ["s = 0,5, donc y = 1", "s = 0, donc y = 0", "s = 0, donc y = 1"], bon: 1, expl: "s = 1,5 − 2 + 1 − 0,5 = 0, qui n'est pas strictement positif." },
          { q: "Pour les entrées (2 ; 1 ; 0) ?", choix: ["s = 1, donc y = 1", "s = −0,5, donc y = 0", "s = 0,5, donc y = 1"], bon: 2, expl: "s = 3 − 2 − 0,5 = 0,5." },
        ] },
      { t: "atelier", titre: "Un neurone logique",
        intro: "Les entrées x₁ et x₂ valent 0 ou 1. Règle les deux poids et le biais ; la sortie vaut 1 si s > 0.",
        objectifs: [
          { consigne: "Obtiens un neurone dont la sortie vaut 1 uniquement lorsque x₁ = 1 ET x₂ = 1.", entrees: ["première entrée", "seconde entrée"], poids: [0, 0], min: -2, max: 2, pas: 0.5, biais: { val: 0, min: -2, max: 2, pas: 0.5 }, cible: "et",
            expl: "Par exemple w₁ = w₂ = 1 et b = −1,5 : la somme ne devient positive que si les deux entrées valent 1." },
          { consigne: "Obtiens maintenant un neurone dont la sortie vaut 1 lorsque x₁ = 1 OU x₂ = 1 (ou les deux).", entrees: ["première entrée", "seconde entrée"], poids: [0, 0], min: -2, max: 2, pas: 0.5, biais: { val: 0, min: -2, max: 2, pas: 0.5 }, cible: "ou",
            expl: "Par exemple w₁ = w₂ = 1 et b = −0,5. Un seul neurone sait donc calculer « et » et « ou ». En revanche, aucun réglage ne donne le « ou exclusif » (l'un ou l'autre, mais pas les deux) : il faut plusieurs neurones." },
        ] },
      { t: "lecon", titre: "Les réseaux de neurones",
        texte: `<p>Un <strong>réseau de neurones</strong> est un ensemble de neurones artificiels organisés en <strong>couches</strong> :</p>
<ul><li>la <strong>couche d'entrée</strong> reçoit les données (par exemple, les pixels d'une image) ;</li><li>les <strong>couches cachées</strong> transforment l'information étape par étape ;</li><li>la <strong>couche de sortie</strong> donne la réponse (par exemple, un score pour chaque chiffre de 0 à 9).</li></ul>
<p>Les sorties d'une couche sont les entrées de la couche suivante : l'information se <strong>propage</strong> de l'entrée vers la sortie.</p>
<p>Lorsqu'un réseau compte de nombreuses couches cachées, on parle d'<strong>apprentissage profond</strong> (<em>deep learning</em>). Chaque couche apprend à repérer des éléments de plus en plus complexes : dans une image, les premières couches détectent des contours, les suivantes des formes (un œil, une oreille), les dernières des objets entiers.</p>
<p><strong>Combien de paramètres ?</strong> Un réseau classique de reconnaissance de chiffres manuscrits reçoit des images de 28 × 28 = 784 pixels. Il possède une couche cachée de 128 neurones et une couche de sortie de 10 neurones. Chaque neurone a un poids par entrée et un biais :</p>
<p class="formule">(784 × 128 + 128) + (128 × 10 + 10) = 101 770 paramètres</p>
<p>Les grands modèles de langage actuels en comptent des <strong>milliards</strong>.</p>` },
      { t: "quiz", titre: "Compter les paramètres", intro: "Chaque neurone a un poids par entrée et un biais.",
        questions: [
          { q: "Un réseau possède 4 entrées, une couche cachée de 5 neurones et une couche de sortie de 3 neurones. Combien de paramètres ?", choix: ["12", "35", "43", "60"], bon: 2, expl: "Couche cachée : 4 × 5 + 5 = 25. Couche de sortie : 5 × 3 + 3 = 18. Total : 43." },
          { q: "Et avec deux couches cachées de 5 neurones ?", choix: ["48", "73", "86"], bon: 1, expl: "On ajoute une couche de 5 × 5 + 5 = 30 paramètres : 25 + 30 + 18 = 73." },
          { q: "Une coopérative veut prédire si un melon est mûr à partir de trois mesures : couleur de l'écorce, fermeté et masse. Combien de neurones faut-il dans la couche d'entrée ?", choix: ["1", "3", "10"], bon: 1, expl: "Un par caractéristique mesurée. En sortie, un seul neurone suffit : mûr (1) ou pas mûr (0)." },
          { q: "De quelles données la coopérative a-t-elle besoin pour entraîner ce réseau ?", choix: ["Des photos de la coopérative.", "De nombreux melons variés, mesurés, dont on sait s'ils étaient mûrs.", "Du prix de vente des melons."], bon: 1, expl: "Des exemples étiquetés (par un expert ou à la dégustation), de plusieurs variétés, saisons et producteurs, avec une partie mise de côté pour le test." },
        ] },
      { t: "lecon", titre: "Comment un réseau apprend-il ?",
        texte: `<p>Au départ, les poids sont choisis au hasard : le réseau répond n'importe quoi. L'<strong>entraînement</strong> répète alors trois étapes, des milliers de fois :</p>
<ol class="phases"><li><strong>Prédire</strong> on présente un exemple au réseau, qui calcule sa réponse</li><li><strong>Mesurer l'erreur</strong> on compare la réponse à l'étiquette attendue ; la fonction de perte transforme cet écart en un nombre</li><li><strong>Corriger</strong> on modifie légèrement chaque poids dans la direction qui diminue l'erreur</li></ol>
<p>Un passage complet sur toutes les données d'entraînement s'appelle une <strong>époque</strong>. On répète les époques jusqu'à ce que l'erreur ne diminue plus.</p>
<aside class="savoir"><strong>Le randonneur dans le brouillard.</strong> Corriger les poids, c'est comme descendre une montagne dans un épais brouillard. On ne voit pas la vallée (l'erreur minimale), mais on sent sous ses pieds dans quelle direction le sol descend, et l'on fait un petit pas dans cette direction, puis un autre… Les mathématiciens appellent cette méthode la <strong>descente de gradient</strong>. Pour un réseau, il faut savoir comment corriger des millions de poids à la fois : c'est le rôle de la <strong>rétropropagation</strong>, popularisée dans les années 1980.</aside>
<aside class="retenir"><strong>À retenir.</strong> Un réseau de neurones n'est pas programmé règle par règle : ses milliers ou ses milliards de poids sont <strong>ajustés automatiquement</strong> pour réduire ses erreurs sur des exemples. C'est pourquoi il lui faut beaucoup de données et beaucoup de calculs, et c'est aussi pourquoi il est difficile d'expliquer une décision particulière : on parle de <strong>boîte noire</strong>.</aside>` },
      { t: "ordre", texte: true, titre: "Les étapes de l'entraînement", q: "Range dans l'ordre ce qui se passe pendant l'entraînement d'un réseau.",
        lignes: ["Les poids sont choisis au hasard.", "On présente un exemple au réseau, qui calcule sa réponse.", "On compare cette réponse à l'étiquette attendue : c'est l'erreur.", "On modifie légèrement chaque poids pour diminuer l'erreur.", "On recommence avec les exemples suivants, époque après époque."],
        expl: "Prédire, mesurer l'erreur, corriger : ce cycle est répété des milliers de fois." },
      { t: "quiz", titre: "Le bon vocabulaire",
        questions: [
          { q: "Le nombre qui mesure l'importance d'une entrée est…", choix: ["son poids.", "son biais.", "son époque."], bon: 0, expl: "Chaque entrée est multipliée par son poids." },
          { q: "Le nombre ajouté à la somme pondérée est…", choix: ["la sortie.", "le biais.", "la couche cachée."], bon: 1, expl: "Les poids et les biais sont les paramètres du réseau." },
          { q: "Ce qui transforme la somme s en sortie y est…", choix: ["la fonction d'activation.", "la fonction de perte.", "l'époque."], bon: 0, expl: "Par exemple un seuil : 1 si s > 0, 0 sinon. La fonction de perte, elle, mesure l'erreur." },
          { q: "Une couche située entre l'entrée et la sortie est…", choix: ["une couche de test.", "une couche cachée.", "une couche d'étiquettes."], bon: 1, expl: "Avec de nombreuses couches cachées, on parle d'apprentissage profond." },
        ] },
      { t: "quiz", titre: "Voir un neurone apprendre", widget: "perceptron",
        intro: "On reprend les criquets et les sauterelles du chapitre 3. Un seul neurone, d'entrées la longueur du corps et celle des antennes, apprend à les distinguer : sortie 1 pour « sauterelle », 0 pour « criquet ». Quand il se trompe sur un insecte, ses poids sont corrigés. Clique sur « Époque suivante » pour lui faire revoir les douze insectes.",
        questions: [
          { q: "Avant toute époque, les poids et le biais sont nuls. Que répond le neurone pour le premier insecte, une sauterelle ?", choix: ["1 (sauterelle) : c'est juste.", "0 (criquet) : c'est faux.", "Rien du tout."], bon: 1, expl: "La somme vaut 0, qui n'est pas strictement positive : le neurone répond 0. C'est une erreur, donc les poids vont être corrigés." },
          { q: "Lance la première époque. Combien d'erreurs le neurone commet-il ?", choix: ["0", "3", "12"], bon: 1, expl: "Trois erreurs, et trois corrections des poids : w₁ = −0,25, w₂ = 0,25 et b = −0,1." },
          { q: "Continue. À partir de quelle époque le neurone ne fait-il plus aucune erreur ?", choix: ["L'époque 2", "L'époque 3", "L'époque 10"], bon: 1, expl: "À l'époque 3, les douze insectes sont bien classés : les poids ne changent plus (w₁ = −0,4, w₂ = 0,5, b = −0,2)." },
          { q: "Que représente la droite tracée sur le graphique ?", choix: ["La moyenne des insectes.", "La frontière de décision : au-dessus, « sauterelle » ; en dessous, « criquet ».", "L'erreur du neurone."], bon: 1, expl: "Le neurone répond « sauterelle » lorsque −0,4x + 0,5y − 0,2 > 0, c'est-à-dire y > 0,8x + 0,4. Il a appris à tracer une droite qui sépare les deux nuages." },
          { q: "Où se trouve l'insecte N3 (3,0 ; 2,8) du chapitre 3 par rapport à la droite d'équation y = 0,8x + 0,4 ?", choix: ["Nettement au-dessus.", "Exactement dessus.", "Nettement en dessous."], bon: 1, expl: "0,8 × 3 + 0,4 = 2,8. Il est normal que N3 ait posé problème au chapitre 3 : il est à égale « hésitation » entre les deux groupes." },
        ] },
      { t: "quiz", titre: "Corriger les poids à la main",
        intro: "La règle d'apprentissage : erreur = cible − sortie. Si l'erreur n'est pas nulle, chaque poids augmente de 0,1 × erreur × entrée, et le biais de 0,1 × erreur. Au départ, w₁ = w₂ = b = 0.",
        questions: [
          { q: "Premier insecte : (4,5 ; 5,0), cible 1. La somme vaut 0, donc la sortie vaut 0 et l'erreur 1. Quels sont les nouveaux paramètres ?", choix: ["w₁ = 0,45 ; w₂ = 0,5 ; b = 0,1", "w₁ = 4,5 ; w₂ = 5 ; b = 1", "w₁ = −0,45 ; w₂ = −0,5 ; b = −0,1"], bon: 0, expl: "w₁ = 0 + 0,1 × 1 × 4,5 = 0,45 ; w₂ = 0 + 0,1 × 1 × 5 = 0,5 ; b = 0 + 0,1 × 1 = 0,1." },
          { q: "Les cinq insectes suivants sont bien classés. Le septième est (3,0 ; 1,0), cible 0. Avec ces poids, que calcule le neurone ?", choix: ["s = 1,95, sortie 1 : il se trompe.", "s = −1,95, sortie 0 : il a raison.", "s = 0, sortie 0 : il a raison."], bon: 0, expl: "s = 0,45 × 3 + 0,5 × 1 + 0,1 = 1,95 > 0. Il répond « sauterelle » pour un criquet : l'erreur vaut 0 − 1 = −1." },
          { q: "Quels sont les paramètres après cette correction ?", choix: ["w₁ = 0,75 ; w₂ = 0,6 ; b = 0,2", "w₁ = 0,15 ; w₂ = 0,4 ; b = 0", "w₁ = 0,45 ; w₂ = 0,5 ; b = 0,1"], bon: 1, expl: "w₁ = 0,45 − 0,1 × 3 = 0,15 ; w₂ = 0,5 − 0,1 × 1 = 0,4 ; b = 0,1 − 0,1 = 0. Les poids des entrées présentes diminuent, pour que la somme soit plus petite la prochaine fois." },
        ] },
      { t: "code", titre: "Programmer un neurone", d: 1, caches: ["neurone(1, 1, 1, 1, -1.5)", "neurone(1, 0, 1, 1, -1.5)", "neurone(2, 3, 1, -1, 2)", "neurone(0, 0, 5, 5, 0)"],
        enonce: `<p>Écris une fonction <code>neurone(x1, x2, w1, w2, b)</code> qui calcule la somme pondérée des deux entrées, ajoute le biais, puis renvoie 1 si cette somme est strictement positive et 0 sinon.</p>`,
        depart: `def neurone(x1, x2, w1, w2, b):\n    `,
        solution: `def neurone(x1, x2, w1, w2, b):\n    somme = w1 * x1 + w2 * x2 + b\n    if somme > 0:\n        return 1\n    else:\n        return 0`,
        tests: [{ appels: [["neurone(4.0, 4.0, -0.4, 0.5, -0.2)", "1"], ["neurone(4.8, 1.8, -0.4, 0.5, -0.2)", "0"], ["neurone(1, 1, 2, 1, -3)", "0"], ["neurone(0, 0, 0, 0, 0)", "0"]] }],
        indices: ["La somme vaut w1 * x1 + w2 * x2 + b.", "Un if compare cette somme à 0, avec une inégalité stricte."] },
      { t: "code", titre: "Une époque d'apprentissage", d: 3, caches: ["epoque(-0.25, 0.25, -0.1)", "epoque(1, 1, 1)", "epoque(0.5, -0.5, 0)"],
        enonce: `<p>La fonction <code>epoque(w1, w2, b)</code> fait revoir au neurone les douze insectes. À chaque erreur, elle doit corriger les trois paramètres selon la règle d'apprentissage :</p><ul><li>w1 augmente de <code>taux * erreur * x1</code> ;</li><li>w2 augmente de <code>taux * erreur * x2</code> ;</li><li>b augmente de <code>taux * erreur</code>.</li></ul><p>Complète-la. Elle renvoie les nouveaux paramètres et le nombre d'erreurs commises.</p>`,
        depart: `# Sauterelles : cible 1. Criquets : cible 0.\ninsectes = [\n    (4.5, 5.0, 1), (5.0, 6.0, 1), (3.5, 4.5, 1),\n    (4.0, 5.5, 1), (5.5, 5.0, 1), (3.0, 4.0, 1),\n    (3.0, 1.0, 0), (4.0, 1.5, 0), (5.0, 1.2, 0),\n    (3.5, 0.8, 0), (4.5, 2.0, 0), (2.5, 1.5, 0)]\ntaux = 0.1\n\ndef neurone(x1, x2, w1, w2, b):\n    if w1 * x1 + w2 * x2 + b > 0:\n        return 1\n    else:\n        return 0\n\ndef epoque(w1, w2, b):\n    erreurs = 0\n    for (x1, x2, cible) in insectes:\n        erreur = cible - neurone(x1, x2, w1, w2, b)\n        if erreur != 0:\n            erreurs = erreurs + 1\n            # À compléter : corriger w1, w2 et b\n    return (w1, w2, b, erreurs)\n\nprint(epoque(0, 0, 0))`,
        solution: `# Sauterelles : cible 1. Criquets : cible 0.\ninsectes = [\n    (4.5, 5.0, 1), (5.0, 6.0, 1), (3.5, 4.5, 1),\n    (4.0, 5.5, 1), (5.5, 5.0, 1), (3.0, 4.0, 1),\n    (3.0, 1.0, 0), (4.0, 1.5, 0), (5.0, 1.2, 0),\n    (3.5, 0.8, 0), (4.5, 2.0, 0), (2.5, 1.5, 0)]\ntaux = 0.1\n\ndef neurone(x1, x2, w1, w2, b):\n    if w1 * x1 + w2 * x2 + b > 0:\n        return 1\n    else:\n        return 0\n\ndef epoque(w1, w2, b):\n    erreurs = 0\n    for (x1, x2, cible) in insectes:\n        erreur = cible - neurone(x1, x2, w1, w2, b)\n        if erreur != 0:\n            erreurs = erreurs + 1\n            w1 = w1 + taux * erreur * x1\n            w2 = w2 + taux * erreur * x2\n            b = b + taux * erreur\n    return (w1, w2, b, erreurs)\n\nprint(epoque(0, 0, 0))`,
        tests: [{ appels: [["epoque(0, 0, 0)", "(-0.25, 0.25, -0.1, 3)"], ["epoque(-0.4, 0.5, -0.2)", "(-0.4, 0.5, -0.2, 0)"]] }],
        indices: ["Trois lignes à écrire, une par paramètre, à l'intérieur du if.", "w1 = w1 + taux * erreur * x1, et de même pour w2 avec x2.", "Pour le biais : b = b + taux * erreur."] },
      { t: "lecon", titre: "Un réseau dans le navigateur",
        texte: `<p>Le site <strong>TensorFlow Playground</strong> (playground.tensorflow.org) permet d'entraîner un petit réseau de neurones et de le voir apprendre. Des points orange et bleus doivent être séparés ; le fond coloré montre la réponse du réseau en chaque point du plan.</p>
<p>Si tu y as accès, mène l'enquête :</p>
<ol><li>Choisis le jeu de données à deux nuages bien séparés (<em>Gaussian</em>), supprime toutes les couches cachées (<em>Hidden layers</em> : 0) et lance l'entraînement. Observe la forme de la frontière.</li><li>Observe les nombres <em>Training loss</em> et <em>Test loss</em> pendant l'entraînement.</li><li>Choisis le jeu de données en cercle (<em>Circle</em>), toujours sans couche cachée.</li><li>Ajoute une couche cachée de 4 neurones et relance.</li><li>Essaie la spirale (<em>Spiral</em>) et cherche une architecture qui fonctionne.</li></ol>
<p>L'étape suivante revient sur ce que l'on observe.</p>` },
      { t: "quiz", titre: "Ce que montre le réseau",
        questions: [
          { q: "Sans couche cachée, quelle est la forme de la frontière tracée par le réseau entre deux nuages de points ?", choix: ["Une ligne droite", "Un cercle", "Une spirale"], bon: 0, expl: "Comme le neurone seul de l'étape précédente." },
          { q: "Les points bleus forment un disque entouré de points orange. Sans couche cachée, le réseau réussit-il à les séparer ?", choix: ["Oui, en quelques époques.", "Non : il ne peut tracer qu'une frontière droite.", "Oui, à condition d'attendre très longtemps."], bon: 1, expl: "Avec une couche cachée de 4 neurones, la frontière devient courbe et entoure le disque." },
          { q: "Que représentent les nombres « Training loss » et « Test loss » ?", choix: ["Le nombre de neurones.", "Les erreurs moyennes du réseau sur les données d'entraînement et sur les données de test.", "La durée de l'entraînement."], bon: 1, expl: "Elles diminuent au fil des époques, puis se stabilisent." },
          { q: "La spirale est plus difficile à séparer. Que faut-il au réseau ?", choix: ["Moins de neurones.", "Davantage de couches et de neurones, et plus d'époques.", "Aucune donnée."], bon: 1, expl: "Plus le problème est complexe, plus le réseau doit être grand." },
        ] },
      { t: "lecon", titre: "Des cerveaux artificiels ?",
        texte: `<p>Les mots « neurone » et « apprentissage » invitent à comparer ces réseaux à un cerveau. La comparaison a ses limites.</p>
<table class="donnees large"><thead><tr><th></th><th>Cerveau humain</th><th>Réseau de neurones artificiels</th></tr></thead><tbody>
<tr><th>Unités</th><td>environ 86 milliards de neurones vivants, aux comportements très variés</td><td>des nombres dans un programme, tous calculés de la même façon</td></tr>
<tr><th>Apprentissage</th><td>quelques exemples suffisent souvent (un enfant reconnaît un chat après en avoir vu quelques-uns)</td><td>il faut souvent des milliers ou des millions d'exemples</td></tr>
<tr><th>Énergie</th><td>une vingtaine de watts</td><td>l'entraînement d'un grand modèle mobilise des centres de données entiers (chapitre 13)</td></tr>
<tr><th>Polyvalence</th><td>le même cerveau marche, parle, aime, imagine</td><td>un réseau est entraîné pour un type de tâche</td></tr>
<tr><th>Compréhension</th><td>expérience du monde, du corps, des émotions</td><td>calculs statistiques sur des données</td></tr></tbody></table>
<aside class="retenir"><strong>À retenir.</strong> Les réseaux de neurones artificiels se sont <strong>inspirés</strong> du cerveau, mais ils n'en sont pas des copies. Ce sont des outils mathématiques puissants qui apprennent des régularités dans des données ; parler de « cerveaux artificiels » est une image, pas une description.</aside>` },
      { t: "tri", titre: "Cerveau ou réseau ?", q: "À qui chaque description s'applique-t-elle ?", categories: ["Cerveau humain", "Réseau artificiel"],
        items: [
          { txt: "Quelques exemples lui suffisent souvent pour apprendre.", cat: 0, expl: "Un enfant reconnaît un chat après en avoir vu quelques-uns." },
          { txt: "Il fonctionne avec une vingtaine de watts.", cat: 0, expl: "L'entraînement d'un grand modèle mobilise des centres de données entiers." },
          { txt: "Ses unités sont des nombres, tous calculés de la même façon.", cat: 1, expl: "Les neurones biologiques, eux, sont vivants et très variés." },
          { txt: "Il est entraîné pour un type de tâche.", cat: 1, expl: "Le même cerveau marche, parle, aime, imagine." },
          { txt: "Il a une expérience du monde, du corps et des émotions.", cat: 0, expl: "Un réseau effectue des calculs statistiques sur des données." },
          { txt: "Il lui faut souvent des milliers ou des millions d'exemples.", cat: 1, expl: "C'est l'une des grandes différences avec l'apprentissage humain." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Un neurone artificiel calcule d'abord…", choix: ["une moyenne de ses sorties.", "une somme pondérée de ses entrées, plus un biais.", "le maximum de ses entrées.", "une image."], bon: 1, expl: "Puis il applique une fonction d'activation." },
          { q: "Les paramètres réglés pendant l'entraînement sont…", choix: ["les entrées.", "les étiquettes.", "les poids et les biais.", "les pixels."], bon: 2, expl: "Ce sont eux que l'apprentissage ajuste." },
          { q: "Avec w₁ = 2, w₂ = 1, b = −3 et les entrées x₁ = 1, x₂ = 1, la somme vaut…", choix: ["0.", "3.", "6.", "−3."], bon: 0, expl: "2 + 1 − 3 = 0." },
          { q: "On parle d'apprentissage profond lorsque le réseau…", choix: ["comporte de nombreuses couches cachées.", "est installé sous terre.", "apprend sans données.", "ne contient qu'un neurone."], bon: 0, expl: "« Profond » renvoie au nombre de couches." },
          { q: "Une époque correspond à…", choix: ["une correction d'un seul poids.", "un passage sur toutes les données d'entraînement.", "une année de recherche.", "la durée d'utilisation du modèle."], bon: 1, expl: "On répète les époques jusqu'à ce que l'erreur ne diminue plus." },
          { q: "Un neurone artificiel seul (perceptron) peut séparer deux catégories…", choix: ["quelle que soit leur disposition.", "seulement si une ligne droite peut les séparer.", "seulement s'il y a plus de 1 000 exemples.", "jamais."], bon: 1, expl: "C'est la limite montrée par Minsky et Papert en 1969." },
          { q: "On dit qu'un réseau de neurones est une « boîte noire » parce que…", choix: ["il est rangé dans un boîtier noir.", "il ne fonctionne que la nuit.", "il est difficile d'expliquer une décision à partir de ses milliers de poids.", "ses calculs sont secrets par la loi."], bon: 2, expl: "Ses poids sont ajustés automatiquement, pas écrits comme des règles lisibles." },
          { q: "Par rapport au cerveau humain, un réseau de neurones artificiels…", choix: ["est une copie fidèle du cerveau.", "a besoin en général de beaucoup plus d'exemples pour apprendre.", "consomme beaucoup moins d'énergie.", "comprend le monde comme un humain."], bon: 1, expl: "Il s'en inspire, sans en être une copie." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Le neurone artificiel.</strong> Il reçoit des <strong>entrées</strong>, les multiplie par des <strong>poids</strong>, ajoute un <strong>biais</strong>, puis applique une <strong>fonction d'activation</strong> (par exemple un seuil : sortie 1 si s &gt; 0, 0 sinon).</p>
<p class="formule">s = w<sub>1</sub> x<sub>1</sub> + w<sub>2</sub> x<sub>2</sub> + w<sub>3</sub> x<sub>3</sub> + b</p>
<p>Les poids et les biais sont les <strong>paramètres</strong>. Un neurone seul ne sépare deux catégories que par une <strong>ligne droite</strong>.</p>
<p><strong>Le réseau.</strong> Des neurones organisés en couches : <strong>entrée</strong>, <strong>couches cachées</strong>, <strong>sortie</strong>. Avec de nombreuses couches cachées, on parle d'<strong>apprentissage profond</strong>. Un réseau compte des milliers à des milliards de paramètres.</p>
<p><strong>L'entraînement.</strong> Trois étapes répétées : <strong>prédire</strong>, <strong>mesurer l'erreur</strong>, <strong>corriger</strong> les poids pour la diminuer. Un passage sur toutes les données est une <strong>époque</strong>.</p>
<p><strong>Les limites.</strong> Un réseau a besoin de beaucoup de données et de calculs. Ses décisions sont difficiles à expliquer : c'est une <strong>boîte noire</strong>. Il s'est <strong>inspiré</strong> du cerveau, mais n'en est pas une copie.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>calculer la sortie d'un neurone</li><li>nommer les couches d'un réseau</li><li>compter les paramètres d'un petit réseau</li><li>décrire les trois étapes de l'entraînement</li><li>expliquer l'expression « boîte noire »</li><li>comparer cerveau et réseau artificiel</li></ul>` },
    ]
  },
  ]
},
{
  id: "p2", titre: "Usage éclairé", sous: "Utiliser l'IA comme un outil, et non comme une solution automatique",
  chapitres: [
    { id: "c5", num: 5, titre: "L'IA dans notre quotidien", resume: "IA génératives, modèles de langage, usages adaptés ou non",
    etapes: [
      { t: "tri", titre: "La journée de Léna", q: "Voici la journée de Léna, élève de seconde. Pour chaque moment, quelle tâche le système d'IA réalise-t-il ?",
        doc: `<blockquote class="recit">7 h 05. Léna déverrouille son téléphone d'un regard. Une notification lui annonce de la pluie à 8 h ; elle prend son parapluie. Dans le bus, elle fait défiler les vidéos courtes qu'une application lui propose, puis écoute une playlist « Découvertes de la semaine ». En anglais, le professeur projette un article ; Léna en traduit un mot avec son téléphone en le photographiant. À midi, la cantine utilise une caméra pour compter les plateaux. L'après-midi, elle demande à un assistant conversationnel d'expliquer une notion de SVT qu'elle n'a pas comprise. Le soir, elle retouche une photo pour ses amis : l'application efface automatiquement un passant à l'arrière-plan. Avant de dormir, elle dicte un message vocal, transcrit en texte sans une faute.</blockquote>`,
        categories: ["Reconnaître", "Recommander", "Prédire", "Générer"],
        items: [
          { txt: "Le téléphone se déverrouille d'un regard.", cat: 0, expl: "Il reconnaît un visage." },
          { txt: "Une notification annonce de la pluie à 8 h.", cat: 2, expl: "Une prévision, en partie produite par des modèles d'IA." },
          { txt: "L'application propose des vidéos courtes.", cat: 1, expl: "Comme la playlist « Découvertes de la semaine »." },
          { txt: "La caméra de la cantine compte les plateaux.", cat: 0, expl: "Elle reconnaît les plateaux, puis les compte." },
          { txt: "L'assistant conversationnel explique une notion de SVT.", cat: 3, expl: "Il produit un texte nouveau." },
          { txt: "Le message vocal est transcrit en texte.", cat: 0, expl: "Le système reconnaît la parole." },
        ],
        expl: "Deux moments combinent plusieurs tâches : la traduction d'un mot photographié (reconnaître le texte, puis traduire) et l'effacement du passant (le reconnaître, puis générer l'arrière-plan). La plupart de ces usages relèvent d'IA qui recommandent ou reconnaissent, souvent sans que l'utilisateur les ait choisies." },
      { t: "lecon", titre: "Deux familles, et un panorama",
        texte: `<p>Comme on l'a vu au chapitre 1, les IA qui nous entourent se répartissent en deux grandes familles :</p>
<ul><li>les IA qui <strong>classent, recommandent ou prédisent</strong>, souvent invisibles : fil d'actualité, suggestions de vidéos, filtre anti-spam, navigation, déverrouillage facial ;</li><li>les IA <strong>génératives</strong>, qui produisent des contenus à la demande et se sont diffusées dans le grand public depuis la fin de l'année 2022.</li></ul>
<table class="donnees large"><thead><tr><th>Contenu produit</th><th>Exemples d'usages</th><th>Exemples d'outils</th></tr></thead><tbody>
<tr><th>Texte</th><td>répondre à une question, résumer, reformuler, traduire, rédiger un courriel</td><td>assistants conversationnels : ChatGPT (OpenAI), Le Chat (Mistral AI, entreprise française), Gemini (Google), Claude (Anthropic)…</td></tr>
<tr><th>Image</th><td>illustrer, créer une affiche, modifier une photo</td><td>générateurs d'images intégrés aux assistants ou aux logiciels de retouche</td></tr>
<tr><th>Son</th><td>voix de synthèse, musique, doublage</td><td>synthèse vocale, générateurs de musique</td></tr>
<tr><th>Vidéo</th><td>courtes séquences animées à partir d'une description</td><td>générateurs de vidéos</td></tr>
<tr><th>Code</th><td>écrire, expliquer ou corriger un programme</td><td>assistants de programmation</td></tr></tbody></table>
<p>Les outils récents sont souvent <strong>multimodaux</strong> : ils comprennent et produisent plusieurs types de contenus (on peut leur montrer une photo et leur poser une question écrite à son sujet). Ces outils évoluent très vite : les noms changent, mais les principes de fonctionnement restent.</p>` },
      { t: "tri", titre: "Quel type de contenu ?", q: "Quel type de contenu chaque demande fait-elle générer ?", categories: ["Texte", "Image", "Son", "Code"],
        items: [
          { txt: "« Écris un poème sur l'automne. »", cat: 0, expl: "Un texte." },
          { txt: "« Lis à voix haute ce paragraphe avec une voix calme. »", cat: 2, expl: "De la synthèse vocale. L'outil lit un texte et produit du son : il doit être multimodal." },
          { txt: "« Voici la photo de mon exercice : explique-moi mon erreur. »", cat: 0, expl: "Un texte, produit à partir d'une image : l'outil doit être multimodal." },
          { txt: "« Écris une fonction Python qui calcule la moyenne d'une liste. »", cat: 3, expl: "Un programme." },
          { txt: "« Dessine le logo d'un club d'échecs. »", cat: 1, expl: "Une image." },
        ] },
      { t: "lecon", titre: "Comment un modèle de langage écrit-il ?",
        texte: `<p>Les assistants conversationnels reposent sur un <strong>grand modèle de langage</strong> (en anglais <em>large language model</em>, LLM) : un très grand réseau de neurones entraîné sur d'immenses quantités de textes.</p>
<p>Un modèle de langage ne lit pas des lettres ni des mots entiers, mais des <strong>tokens</strong> : des morceaux de texte (un mot court, un bout de mot, un signe de ponctuation) numérotés. Par exemple, « incroyablement » peut être découpé en « in », « croy », « able », « ment ».</p>
<aside class="retenir"><strong>Le principe : prédire la suite.</strong> À partir du texte déjà écrit, le modèle calcule pour chaque token possible une <strong>probabilité d'être le suivant</strong>. Il en choisit un, l'ajoute au texte, puis recommence, token après token, jusqu'à la fin de la réponse. Toute la réponse est construite ainsi.</aside>
<ol class="phases"><li><strong>Pré-entraînement</strong> le réseau apprend à prédire le token suivant sur des milliards de textes ; il en acquiert les régularités, les connaissances… et les erreurs et les biais</li><li><strong>Ajustement</strong> on l'entraîne à suivre des consignes et à répondre de façon utile, souvent grâce à des humains qui notent ses réponses</li><li><strong>Utilisation</strong> l'utilisateur écrit une requête, le <em>prompt</em>, et le modèle génère la suite</li></ol>
<aside class="savoir"><strong>Pourquoi deux réponses différentes ?</strong> Le modèle ne choisit pas toujours le token le plus probable : il tire au sort parmi les plus probables, en respectant leurs probabilités. C'est pourquoi la même question peut recevoir deux réponses différentes. Cette part de hasard rend les textes plus variés… et explique aussi qu'une réponse juste une fois puisse être fausse la fois suivante.</aside>` },
      { t: "quiz", titre: "Prédire le mot suivant",
        intro: "Un modèle de langage doit compléter : « Après les cours, je rentre à la… ». Il calcule les probabilités suivantes.",
        doc: `<table class="donnees"><thead><tr><th>maison</th><th>gare</th><th>cantine</th><th>plage</th><th>autres mots</th></tr></thead><tbody><tr><td>0,62</td><td>0,11</td><td>0,04</td><td>0,03</td><td>0,20</td></tr></tbody></table>`,
        questions: [
          { q: "Si le modèle tire au sort selon ces probabilités, sur 100 réponses, combien environ commenceront par « maison » ?", choix: ["Toutes", "Environ 62", "Environ 11"], bon: 1, expl: "0,62 × 100 = 62. Et environ 3 commenceront par « plage »." },
          { q: "Pourquoi est-il utile de ne pas toujours choisir le mot le plus probable ?", choix: ["Pour aller plus vite.", "Pour rendre les textes plus variés et moins répétitifs.", "Pour consommer moins d'énergie."], bon: 1, expl: "Sans hasard, la même question donnerait toujours exactement la même réponse." },
          { q: "Quel est l'inconvénient de ce tirage au sort ?", choix: ["Le modèle choisit parfois un mot peu probable, ce qui peut mener à une réponse étrange ou fausse.", "Le modèle oublie la question.", "Il n'y en a aucun."], bon: 0, expl: "Les réponses sont aussi moins prévisibles." },
        ] },
      { t: "quiz", titre: "Des tokens",
        intro: "On admet qu'un token correspond en moyenne à trois quarts de mot en anglais, et à un peu moins en français.",
        questions: [
          { q: "Pourquoi un modèle découpe-t-il « anticonstitutionnellement » en plusieurs tokens, mais « chat » en un seul ?", choix: ["Parce que les mots longs sont interdits.", "Parce que les tokens sont les morceaux de texte les plus fréquents : « chat » est fréquent, un mot long et rare est découpé.", "Parce que « chat » est un mot anglais."], bon: 1, expl: "Un mot rare est découpé en morceaux plus fréquents." },
          { q: "Un roman de 90 000 mots en anglais représente environ combien de tokens ?", choix: ["67 500", "90 000", "120 000"], bon: 2, expl: "90 000 ÷ 0,75 = 120 000 tokens." },
          { q: "Les modèles de langage ont longtemps eu du mal à compter les lettres d'un mot. Pourquoi ?", choix: ["Ils ne savent pas compter.", "Ils ne « voient » pas les lettres une à une, mais des morceaux de mots numérotés.", "Les lettres changent d'un texte à l'autre."], bon: 1, expl: "Compter les lettres demande une information que le modèle ne lit pas directement." },
        ] },
      { t: "quiz", titre: "Un mini-générateur de phrases", widget: "generateur",
        intro: "Un vrai modèle de langage est un réseau de milliards de paramètres. On peut pourtant en imiter le principe : on regarde, dans un texte d'entraînement, quels mots suivent chaque mot, puis on construit une phrase en tirant au sort, à chaque étape, un mot parmi les suivants possibles. Fabrique quelques phrases.",
        questions: [
          { q: "Dans le texte d'entraînement, combien de fois le mot « le » est-il suivi de « chat » ?", choix: ["1 fois sur 6", "2 fois sur 6", "3 fois sur 6"], bon: 1, expl: "Les mots qui suivent « le » sont : chat, canapé, chien, jardin, chat, chien. La probabilité de tirer « chat » est donc 2/6, soit 1/3 ; celle de tirer « jardin » est 1/6." },
          { q: "Quels mots peuvent suivre « dort » ?", choix: ["sur ou dans", "le ou la", "chat ou chien"], bon: 0, expl: "« le chat dort sur… » et « le chien dort dans… »." },
          { q: "Le générateur peut écrire « le chat dort sur le jardin . ». Pourquoi ?", choix: ["Parce que cette phrase figure dans le texte d'entraînement.", "Parce que chaque enchaînement de deux mots existe dans le texte.", "Parce qu'il comprend ce qu'est un jardin."], bon: 1, expl: "Après « sur », il peut choisir « le » ; après « le », il peut choisir « jardin »." },
          { q: "Que penser de cette phrase ?", choix: ["Elle est correcte grammaticalement et pleine de sens.", "Elle est correcte grammaticalement, mais n'a pas vraiment de sens.", "Elle est incorrecte grammaticalement."], bon: 1, expl: "Le programme ne sait rien des jardins ni des canapés : il n'a que des statistiques sur des enchaînements de mots." },
          { q: "Quelle différence y a-t-il avec un vrai modèle de langage ?", choix: ["Le vrai modèle ne tire rien au sort.", "Le vrai modèle tient compte de tout le texte qui précède, pas seulement du dernier mot.", "Le vrai modèle n'a pas besoin de textes d'entraînement."], bon: 1, expl: "Il travaille sur des tokens, a été entraîné sur des milliards de textes et ajusté pour suivre des consignes. Mais le principe reste le même : produire une suite plausible. C'est la source de ses réussites… et de ses « hallucinations » (chapitre 7)." },
        ] },
      { t: "lecon", titre: "Le générateur en Python",
        texte: `<p>Voici le programme qui se cache derrière la manipulation précédente. <code>texte.split()</code> découpe le texte en une liste de mots ; le point est un « mot » comme les autres, qui sert de signal d'arrêt. <code>random.choice(liste)</code> tire au sort un élément de la liste.</p><p>Exécute-le plusieurs fois : la phrase change. Remplace ensuite le texte d'entraînement par un texte de ton choix (mots séparés par des espaces, ponctuation incluse) : les phrases générées imitent le vocabulaire du nouveau texte.</p>`,
        code: `import random\n\ntexte = "le chat dort sur le canapé . le chien dort dans le jardin . "\ntexte = texte + "le chat mange dans la cuisine . le chien joue sur la terrasse ."\nmots = texte.split()      # découpe le texte en une liste de mots\n\ndef suivants(mot):\n    liste = []\n    for i in range(len(mots) - 1):\n        if mots[i] == mot:\n            liste.append(mots[i + 1])\n    return liste\n\nmot = "le"\nphrase = "le"\nwhile mot != ".":\n    mot = random.choice(suivants(mot))\n    phrase = phrase + " " + mot\nprint(phrase)` },
      { t: "code", titre: "Les mots suivants", d: 2, caches: ["suivants('chat')", "suivants('.')", "suivants('sur')", "suivants('terrasse')"],
        enonce: `<p>Écris la fonction <code>suivants(mot)</code> : elle renvoie la liste des mots qui suivent immédiatement <code>mot</code> dans la liste <code>mots</code>, dans l'ordre où ils apparaissent, avec leurs répétitions.</p>`,
        depart: `texte = "le chat dort sur le canapé . le chien dort dans le jardin . "\ntexte = texte + "le chat mange dans la cuisine . le chien joue sur la terrasse ."\nmots = texte.split()\n\ndef suivants(mot):\n    liste = []\n    # À compléter\n    return liste\n\nprint(suivants("le"))`,
        solution: `texte = "le chat dort sur le canapé . le chien dort dans le jardin . "\ntexte = texte + "le chat mange dans la cuisine . le chien joue sur la terrasse ."\nmots = texte.split()\n\ndef suivants(mot):\n    liste = []\n    for i in range(len(mots) - 1):\n        if mots[i] == mot:\n            liste.append(mots[i + 1])\n    return liste\n\nprint(suivants("le"))`,
        tests: [{ appels: [["suivants('le')", "['chat', 'canapé', 'chien', 'jardin', 'chat', 'chien']"], ["suivants('dort')", "['sur', 'dans']"], ["suivants('zèbre')", "[]"]] }],
        indices: ["Parcours les indices avec for i in range(len(mots) - 1) : le dernier mot n'a pas de suivant.", "Si mots[i] == mot, le mot suivant est mots[i + 1] : ajoute-le à la liste."] },
      { t: "code", titre: "La probabilité d'un enchaînement", d: 2, caches: ["probabilite('le', 'chien')", "probabilite('dort', 'dans')", "probabilite('chat', 'joue')", "probabilite('.', 'le')"],
        enonce: `<p>Écris une fonction <code>probabilite(mot, suivant)</code> qui renvoie la probabilité que <code>mot</code> soit suivi de <code>suivant</code> : le nombre de fois où cet enchaînement apparaît, divisé par le nombre total de mots qui suivent <code>mot</code>. On suppose que <code>mot</code> figure dans le texte ailleurs qu'à la fin.</p>`,
        depart: `texte = "le chat dort sur le canapé . le chien dort dans le jardin . "\ntexte = texte + "le chat mange dans la cuisine . le chien joue sur la terrasse ."\nmots = texte.split()\n\ndef suivants(mot):\n    liste = []\n    for i in range(len(mots) - 1):\n        if mots[i] == mot:\n            liste.append(mots[i + 1])\n    return liste\n\ndef probabilite(mot, suivant):\n    `,
        solution: `texte = "le chat dort sur le canapé . le chien dort dans le jardin . "\ntexte = texte + "le chat mange dans la cuisine . le chien joue sur la terrasse ."\nmots = texte.split()\n\ndef suivants(mot):\n    liste = []\n    for i in range(len(mots) - 1):\n        if mots[i] == mot:\n            liste.append(mots[i + 1])\n    return liste\n\ndef probabilite(mot, suivant):\n    liste = suivants(mot)\n    nombre = 0\n    for m in liste:\n        if m == suivant:\n            nombre = nombre + 1\n    return nombre / len(liste)`,
        tests: [{ appels: [["probabilite('le', 'chat')", "1 / 3"], ["probabilite('le', 'jardin')", "1 / 6"], ["probabilite('dort', 'sur')", "0.5"], ["probabilite('le', 'zèbre')", "0.0"]] }],
        indices: ["Commence par récupérer la liste des suivants avec suivants(mot).", "Compte combien de fois suivant y figure, puis divise par la longueur de la liste."] },
      { t: "quiz", titre: "Les suivants à la main", intro: "On entraîne le générateur sur le texte : « il fait beau . il fait froid . il pleut . il fait beau ».",
        questions: [
          { q: "Quels mots suivent « il », dans l'ordre ?", choix: ["fait, fait, pleut, fait", "fait, pleut", "beau, froid, beau"], bon: 0, expl: "Et les mots qui suivent « fait » sont : beau, froid, beau." },
          { q: "Quelle est la probabilité que « fait » soit suivi de « beau » ?", choix: ["1/2", "2/3", "1/3"], bon: 1, expl: "« beau » apparaît 2 fois parmi les 3 suivants de « fait »." },
          { q: "Le programme peut-il écrire « il pleut froid » ?", choix: ["Oui, tous les mots sont dans le texte.", "Non : dans le texte, « pleut » n'est jamais suivi de « froid ».", "Oui, une fois sur trois."], bon: 1, expl: "« pleut » est toujours suivi d'un point." },
        ] },
      { t: "lecon", titre: "Et les images ?",
        texte: `<p>La plupart des générateurs d'images utilisent des <strong>modèles de diffusion</strong>. Pendant l'entraînement, on ajoute progressivement du « bruit » (des pixels aléatoires) à des millions d'images, et le réseau apprend à retirer ce bruit étape par étape.</p>
<p>Pour créer une image, il part d'un bruit totalement aléatoire et le « nettoie » progressivement, guidé par la description écrite, jusqu'à obtenir une image qui lui correspond.</p>` },
      { t: "lecon", titre: "Utile ou inadapté ?",
        texte: `<p>Parce qu'une IA générative produit ce qui est <em>plausible</em>, et non ce qui est <em>vérifié</em>, elle est plus ou moins adaptée selon les tâches.</p>
<table class="donnees large"><thead><tr><th>Plutôt utile</th><th>Plutôt inadapté, ou à vérifier absolument</th></tr></thead><tbody>
<tr><td>reformuler, résumer un texte que l'on fournit</td><td>donner des faits précis, des dates, des chiffres sans source</td></tr>
<tr><td>proposer des idées, des plans, des exemples</td><td>citer des références (livres, articles, lois) : elles peuvent être inventées</td></tr>
<tr><td>expliquer une notion autrement, poser des questions d'entraînement</td><td>calculer avec précision ou raisonner sur de longs calculs</td></tr>
<tr><td>corriger l'orthographe, traduire un texte courant</td><td>donner l'actualité récente : ses connaissances s'arrêtent à une date</td></tr>
<tr><td>aider à écrire ou corriger un petit programme</td><td>décider à notre place (santé, droit, orientation) ou remplacer notre jugement</td></tr></tbody></table>
<aside class="retenir"><strong>À retenir.</strong> Une IA générative est un outil puissant pour <strong>produire</strong> et <strong>reformuler</strong>, mais pas une source de vérité. Plus une tâche exige l'exactitude (faits, chiffres, sources) ou engage une décision importante, plus il faut vérifier et garder la main.</aside>` },
      { t: "tri", titre: "Bon usage ou non ?", q: "Chaque usage d'un assistant conversationnel est-il plutôt utile, ou inadapté sans vérification ?", categories: ["Plutôt utile", "Inadapté sans vérification"],
        items: [
          { txt: "Trouver trois idées de sujet pour un exposé.", cat: 0, expl: "Proposer des idées est un bon usage." },
          { txt: "Connaître le résultat du match d'hier soir.", cat: 1, expl: "L'actualité est postérieure à l'entraînement du modèle ; même avec une recherche en ligne, il faut vérifier." },
          { txt: "Obtenir la liste des livres publiés par une autrice, pour sa bibliographie.", cat: 1, expl: "À vérifier absolument : des titres peuvent être inventés." },
          { txt: "Reformuler un paragraphe que l'on a écrit soi-même.", cat: 0, expl: "On travaille sur son propre texte, en gardant le contrôle." },
          { txt: "Savoir quel médicament prendre contre un mal de tête persistant.", cat: 1, expl: "Une question de santé relève d'un médecin ou d'un pharmacien." },
          { txt: "S'entraîner à l'oral d'anglais en conversant.", cat: 0, expl: "Un entraînement à l'expression, sans enjeu d'exactitude." },
        ] },
      { t: "quiz", titre: "Même question, autre réponse",
        intro: "Deux élèves posent exactement la même question à un assistant : « En quelle année a été construite la tour Eiffel ? ». L'un obtient « Elle a été achevée en 1889 », l'autre « Sa construction s'est déroulée de 1887 à 1889 ».",
        questions: [
          { q: "Ces deux réponses se contredisent-elles ?", choix: ["Oui : l'une des deux est fausse.", "Non : elles sont compatibles, mais formulées différemment.", "On ne peut pas le savoir."], bon: 1, expl: "Le modèle tire au sort ses mots à chaque génération : la formulation change." },
          { q: "Imagine que l'une des deux ait répondu « 1899 », sur le même ton assuré. Comment le détecter ?", choix: ["En reposant la question jusqu'à obtenir deux fois la même réponse.", "En vérifiant dans une source fiable.", "C'est impossible."], bon: 1, expl: "Le modèle peut produire un token peu probable ou confondre des dates proches. On peut aussi remarquer que 1899 est postérieur à l'Exposition universelle de 1889, pour laquelle la tour a été construite." },
          { q: "On demande deux fois à un assistant de résumer le même texte en cinq lignes. Que faut-il toujours faire avant d'utiliser un de ces résumés ?", choix: ["Choisir le plus long.", "Le comparer au texte d'origine.", "Rien : un résumé est toujours fidèle."], bon: 1, expl: "Les deux résumés sont en général différents, et il arrive que l'outil ajoute une information absente du texte ou déforme une nuance. Un résumé est utile pour se faire une première idée ou réviser ; il est risqué s'il remplace la lecture d'un texte que l'on doit analyser." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Un assistant conversationnel repose sur…", choix: ["une grande encyclopédie consultée mot à mot.", "un grand modèle de langage entraîné sur d'immenses quantités de textes.", "des humains qui répondent en direct.", "un moteur de recherche uniquement."], bon: 1, expl: "Un très grand réseau de neurones." },
          { q: "Un token est…", choix: ["un mot de passe.", "un morceau de texte numéroté que lit le modèle.", "une image.", "une unité d'énergie."], bon: 1, expl: "Un mot court, un bout de mot, un signe de ponctuation." },
          { q: "Pour écrire sa réponse, un modèle de langage…", choix: ["prédit le token suivant, encore et encore.", "recopie toujours la même phrase.", "cherche la réponse exacte dans une base de faits.", "écrit tous les mots en même temps au hasard."], bon: 0, expl: "Toute la réponse est construite ainsi." },
          { q: "Un outil multimodal…", choix: ["ne traite que du texte.", "fonctionne sur plusieurs ordinateurs.", "comprend et produit plusieurs types de contenus.", "parle plusieurs langues."], bon: 2, expl: "Par exemple une photo en entrée et un texte en sortie." },
          { q: "Les générateurs d'images utilisent souvent…", choix: ["des modèles de diffusion, qui « nettoient » progressivement un bruit.", "des photos découpées et recollées.", "un dessinateur humain caché.", "un filtre anti-spam."], bon: 0, expl: "Ils partent d'un bruit aléatoire, guidés par la description." },
          { q: "Pour laquelle de ces tâches une IA générative est-elle la moins fiable sans vérification ?", choix: ["Reformuler un texte fourni.", "Proposer des idées de titres.", "Citer des références précises d'articles scientifiques.", "Corriger l'orthographe."], bon: 2, expl: "Les références peuvent être inventées." },
          { q: "Le Chat est un assistant conversationnel développé par…", choix: ["une entreprise française, Mistral AI.", "la NASA.", "le ministère de l'Éducation nationale.", "une entreprise japonaise."], bon: 0, expl: "Mistral AI est une entreprise française." },
          { q: "Une IA générative produit avant tout des contenus…", choix: ["toujours vrais.", "plausibles.", "copiés sur un seul site.", "vérifiés par des experts."], bon: 1, expl: "Plausible n'est pas vrai." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Deux familles.</strong> Les IA qui <strong>classent, recommandent ou prédisent</strong>, souvent invisibles, et les IA <strong>génératives</strong>, qui produisent du texte, des images, du son, de la vidéo ou du code. Un outil <strong>multimodal</strong> traite plusieurs types de contenus.</p>
<p><strong>Le modèle de langage.</strong> Un très grand réseau de neurones entraîné sur d'immenses quantités de textes. Il lit des <strong>tokens</strong> et écrit en <strong>prédisant le token suivant</strong>, encore et encore, avec une part de <strong>hasard</strong> : la même question peut recevoir deux réponses différentes.</p>
<p><strong>Trois étapes.</strong> Pré-entraînement (prédire la suite sur des milliards de textes), ajustement (suivre des consignes), utilisation (répondre à un <em>prompt</em>).</p>
<p><strong>Les images.</strong> Les <strong>modèles de diffusion</strong> partent d'un bruit aléatoire et le « nettoient » progressivement, guidés par la description.</p>
<p><strong>Utile ou inadapté.</strong> Utile pour reformuler, résumer un texte fourni, proposer des idées, expliquer autrement. À vérifier absolument pour les faits, les chiffres, les références, l'actualité, et inadapté pour décider à notre place.</p>
<p><strong>À ne pas confondre.</strong> Une IA générative produit ce qui est <strong>plausible</strong>, pas ce qui est <strong>vérifié</strong>.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>distinguer les deux familles d'IA du quotidien</li><li>expliquer ce qu'est un token</li><li>décrire comment un modèle de langage écrit</li><li>expliquer pourquoi deux réponses diffèrent</li><li>dire pour quelles tâches une IA générative est adaptée</li><li>programmer un mini-générateur de phrases</li></ul>` },
    ] },
    { id: "c6", num: 6, titre: "Bien utiliser l'IA pour apprendre", resume: "Limites, requêtes, tuteur ou faiseur de devoirs, intégrité",
    etapes: [
      { t: "tri", titre: "Un bon usage de l'IA en cours ?", q: "Pour chaque situation, l'usage de l'IA te semble-t-il acceptable ou inacceptable ? Demande-toi qui fait l'effort qui fait apprendre.",
        categories: ["Acceptable", "Inacceptable"],
        items: [
          { txt: "Inès demande à l'IA de lui réexpliquer, avec un autre exemple, une notion de physique qu'elle n'a pas comprise.", cat: 0, expl: "Inès fait elle-même l'effort d'apprendre." },
          { txt: "Tom fait rédiger toute sa dissertation de français par l'IA et la rend comme si c'était la sienne.", cat: 1, expl: "L'IA fait le travail évalué à sa place, et ce n'est pas déclaré." },
          { txt: "Chloé demande à l'IA de lui poser des questions pour réviser son contrôle d'histoire.", cat: 0, expl: "L'IA sert d'entraîneur ; Chloé fait l'effort de mémorisation." },
          { txt: "Adam photographie son exercice de maths, recopie la solution de l'IA et la rend.", cat: 1, expl: "Le devoir est rendu, mais rien n'est appris." },
          { txt: "Jade écrit son texte seule, puis demande à l'IA de repérer ses fautes d'orthographe et les corrige elle-même.", cat: 0, expl: "Acceptable en général, si la consigne n'évalue pas l'orthographe." },
          { txt: "Noah demande à l'IA trois idées de plan pour un exposé, en choisit une et rédige tout lui-même.", cat: 0, expl: "Noah choisit, puis fait le travail de rédaction." },
          { txt: "Emma fait traduire par l'IA le texte d'un devoir noté de traduction en anglais.", cat: 1, expl: "La traduction est précisément ce qui est évalué." },
        ],
        expl: "Trois questions permettent de trancher : qui fait l'effort qui fait apprendre ? La consigne l'autorise-t-elle ? Est-ce que je le déclare ?" },
      { t: "lecon", titre: "Ce que l'IA fait bien, et ses limites",
        texte: `<p>Les assistants conversationnels sont d'excellents rédacteurs et reformulateurs. Ils ont cependant des limites qu'il faut connaître pour bien les utiliser.</p>
<table class="donnees large"><thead><tr><th>Limite</th><th>Ce que cela signifie</th></tr></thead><tbody>
<tr><th>Erreurs et inventions</th><td>Ils peuvent affirmer avec assurance des faits faux ou inventer des sources : ce sont les « hallucinations » (chapitre 7).</td></tr>
<tr><th>Connaissances datées</th><td>Leurs connaissances s'arrêtent à la date de fin de leur entraînement, sauf s'ils peuvent faire une recherche en ligne.</td></tr>
<tr><th>Calculs et raisonnements</th><td>Ils peuvent se tromper dans un calcul ou un raisonnement long, même s'ils l'expliquent avec aplomb.</td></tr>
<tr><th>Manque de contexte</th><td>Ils ne connaissent ni ton cours, ni ton professeur, ni les consignes exactes de ton devoir, sauf si tu les leur donnes.</td></tr>
<tr><th>Complaisance</th><td>Ils ont tendance à aller dans ton sens et à approuver ce que tu proposes, même quand tu as tort.</td></tr>
<tr><th>Biais</th><td>Ils reproduisent les stéréotypes présents dans leurs données d'entraînement (chapitre 8).</td></tr></tbody></table>` },
      { t: "tri", titre: "Quelle limite ?", q: "Ces questions sont posées à un assistant conversationnel sans accès à Internet. Quelle limite risque de poser problème ?",
        categories: ["Connaissances datées", "Calculs", "Manque de contexte", "Complaisance", "Inventions"],
        items: [
          { txt: "« Qui a gagné l'élection d'hier ? »", cat: 0, expl: "L'événement est postérieur à la fin de son entraînement." },
          { txt: "« Combien font 37 849 × 6 271 ? »", cat: 1, expl: "Il peut se tromper dans un calcul, même s'il l'explique avec aplomb." },
          { txt: "« Mon professeur veut-il un plan en deux ou en trois parties ? »", cat: 2, expl: "Il ne connaît ni ton professeur ni ses consignes." },
          { txt: "« J'ai écrit que la Terre est le centre du système solaire, j'ai bien raison ? »", cat: 3, expl: "La question appelle une approbation, alors que l'affirmation est fausse." },
          { txt: "« Donne-moi trois livres récents sur l'IA, avec leur éditeur et leur année. »", cat: 4, expl: "Les références peuvent être inventées ; et pour « récents », ses connaissances sont datées." },
        ] },
      { t: "lecon", titre: "Rédiger une bonne requête",
        texte: `<p>Le <strong>prompt</strong> (on dit aussi <em>requête</em> ou <em>invite</em>) est l'instruction écrite que l'on donne à une IA générative. La qualité de la réponse dépend beaucoup de la qualité du prompt.</p>
<p>Une requête efficace contient souvent quatre éléments :</p>
<ol class="phases"><li><strong>Le contexte</strong> qui je suis, ce que je sais déjà, où je bloque</li><li><strong>La tâche</strong> ce que je demande précisément</li><li><strong>Les contraintes</strong> ce que l'IA doit respecter ou ne pas faire</li><li><strong>Le format</strong> la forme attendue de la réponse</li></ol>
<p><strong>Une requête vague :</strong> « Les fonctions affines. »</p>
<p><strong>Une requête précise :</strong> « Je suis élève de seconde et je n'ai pas compris comment lire le coefficient directeur d'une fonction affine sur un graphique. Explique-le-moi avec un exemple simple, puis pose-moi deux questions pour vérifier que j'ai compris. Ne donne pas les réponses tout de suite. »</p>
<aside class="retenir"><strong>Dialoguer, pas commander une fois.</strong> Une bonne utilisation est un <strong>dialogue</strong> : on lit la réponse d'un œil critique, puis on précise, on corrige, on demande un autre exemple. On parle d'<strong>itération</strong>. Et l'on ne confie jamais à l'IA de données personnelles : ni nom complet, ni adresse, ni photo, ni informations sur d'autres personnes.</aside>` },
      { t: "quiz", titre: "Améliorer des requêtes", intro: "Pour chaque requête de départ, choisis la réécriture qui respecte les quatre éléments et qui aide à apprendre.",
        questions: [
          { q: "« Fais l'exercice 34 page 112. »", choix: ["« Fais l'exercice 34 page 112 et explique chaque étape en détail. »", "« Je suis en seconde. Je bloque sur cet exercice de maths : [énoncé]. Voici ce que j'ai essayé : [démarche]. Ne me donne pas la solution : indique-moi seulement où je me trompe et donne-moi un indice. »", "« Donne-moi vite la réponse de l'exercice 34, c'est pour demain. »"], bon: 1,
            expl: "Elle donne le contexte et la démarche déjà tentée, et interdit à l'IA de faire l'exercice à ta place." },
          { q: "« La Révolution française. »", choix: ["« Je suis en seconde et je révise la Révolution française pour un contrôle. Pose-moi cinq questions de cours de difficulté croissante, une par une, et corrige chacune de mes réponses en m'expliquant mes erreurs. »", "« Écris-moi tout ce qu'il faut savoir sur la Révolution française. »", "« Rédige mon exposé sur la Révolution française, en deux pages. »"], bon: 0,
            expl: "L'IA devient un entraîneur : c'est toi qui fais l'effort de mémorisation." },
          { q: "« Corrige ma rédaction. »", choix: ["« Réécris ma rédaction pour qu'elle soit parfaite. »", "« Voici ma rédaction (sujet : [sujet]). Ne la réécris pas. Relève mes erreurs d'orthographe et de syntaxe sous forme de liste, en expliquant la règle à chaque fois, pour que je les corrige moi-même. »", "« Corrige ma rédaction et mets-moi une note. »"], bon: 1,
            expl: "La contrainte « ne la réécris pas » et le format en liste te laissent le travail de correction." },
        ] },
      { t: "lecon", titre: "Tuteur, pas faiseur de devoirs",
        texte: `<p>On n'apprend qu'en faisant l'effort soi-même : chercher, se tromper, recommencer. Si l'IA fait l'effort à ta place, le devoir est rendu, mais rien n'est appris, et l'écart se voit le jour du contrôle.</p>
<table class="donnees large"><thead><tr><th>L'IA m'aide à apprendre quand…</th><th>L'IA m'empêche d'apprendre quand…</th></tr></thead><tbody>
<tr><td>elle m'explique une notion autrement, avec d'autres exemples</td><td>elle fait l'exercice à ma place et je recopie</td></tr>
<tr><td>elle me pose des questions pour réviser</td><td>je lui fais rédiger un texte que je n'ai pas pensé</td></tr>
<tr><td>elle commente un travail que j'ai fait seul(e)</td><td>je n'essaie plus de chercher avant de lui demander</td></tr>
<tr><td>elle me propose des pistes que je développe moi-même</td><td>je lui fais confiance sans rien vérifier</td></tr></tbody></table>
<p><strong>Intégrité scolaire.</strong> Présenter comme son propre travail un texte, une solution ou une image produite par une IA, alors que la consigne ne l'autorise pas, est une <strong>fraude</strong>, au même titre que copier sur un camarade ou recopier un site sans le citer.</p>
<p>Trois questions permettent de décider si un usage est acceptable :</p>
<ol><li><strong>Qui fait l'effort qui fait apprendre ?</strong> Si c'est l'IA, l'usage est probablement mauvais.</li><li><strong>La consigne l'autorise-t-elle ?</strong> Les règles changent selon le professeur et le travail : en cas de doute, on demande.</li><li><strong>Est-ce que je le dis ?</strong> Un usage autorisé se <strong>déclare</strong> : quel outil, pour quoi faire, ce que j'ai gardé et ce que j'ai modifié.</li></ol>
<aside class="savoir"><strong>Les détecteurs d'IA.</strong> Il existe des logiciels qui prétendent détecter les textes écrits par une IA. Ils sont peu fiables : ils accusent parfois à tort des textes écrits par des élèves, en particulier lorsque ceux-ci écrivent dans une langue qui n'est pas leur langue maternelle, et se laissent tromper par un texte légèrement réécrit. Les professeurs s'appuient plutôt sur le dialogue, sur l'oral et sur la connaissance du travail de leurs élèves.</aside>` },
      { t: "tri", titre: "Aide ou triche ?", q: "Chaque usage aide-t-il à apprendre, ou empêche-t-il d'apprendre ?", categories: ["Aide à apprendre", "Empêche d'apprendre"],
        items: [
          { txt: "Demander à l'IA de corriger un programme Python qui ne marche pas, sans chercher l'erreur soi-même.", cat: 1, expl: "L'IA fait l'effort de recherche de l'erreur." },
          { txt: "Demander à l'IA pourquoi son programme ne marche pas, après avoir cherché dix minutes, puis le corriger soi-même.", cat: 0, expl: "L'élève cherche d'abord, puis corrige lui-même." },
          { txt: "Faire résumer un livre au programme au lieu de le lire, avant un contrôle sur ce livre.", cat: 1, expl: "La lecture est l'apprentissage visé, et un résumé peut être inexact." },
          { txt: "Demander dix questions de vocabulaire d'espagnol pour s'entraîner.", cat: 0, expl: "L'IA sert d'entraîneur ; l'élève fait l'effort de mémorisation." },
        ] },
      { t: "quiz", titre: "Le devoir suspect", intro: "Voici un extrait de la copie de Lucas, pour un devoir à la maison sur les énergies renouvelables, où l'usage de l'IA n'était pas autorisé.",
        doc: `<blockquote class="recit">Les énergies renouvelables représentent un enjeu majeur pour l'avenir de notre planète. Il est important de noter que plusieurs facteurs doivent être pris en compte. En tant que modèle de langage, je ne peux pas donner d'avis personnel, mais voici les principaux points. Selon une étude de l'Institut européen de l'énergie verte (2021), 87 % des Français souhaitent davantage d'éoliennes. En conclusion, l'avenir énergétique dépendra de nombreux facteurs.</blockquote>`,
        questions: [
          { q: "Quel indice montre le plus nettement que ce texte a été copié d'une IA ?", choix: ["Il parle d'éoliennes.", "La phrase « En tant que modèle de langage… », recopiée telle quelle.", "Il contient un pourcentage."], bon: 1, expl: "Autre indice : un style très général et creux (« il est important de noter », « de nombreux facteurs »)." },
          { q: "Quel problème, plus grave pour la qualité du devoir, pose la phrase sur l'étude de 2021 ?", choix: ["Elle est trop longue.", "L'institut et son chiffre de 87 % sont très probablement inventés.", "Elle date de 2021."], bon: 1, expl: "Une source introuvable rend l'information inutilisable ; la présenter comme vraie, c'est diffuser une fausse information." },
          { q: "Qu'aurait dû faire Lucas ?", choix: ["Supprimer seulement la phrase « En tant que modèle de langage ».", "Chercher lui-même des informations dans des sources fiables et rédiger avec ses propres mots, ou demander à son professeur s'il pouvait utiliser l'IA.", "Demander à l'IA un texte plus long."], bon: 1, expl: "Le texte n'apporte d'ailleurs aucune idée précise." },
        ] },
      { t: "quiz", titre: "La complaisance", intro: "Hugo écrit à un assistant : « J'ai démontré que (a + b)² = a² + b², c'est bien ça ? Dis-moi que j'ai raison. »",
        questions: [
          { q: "Hugo a-t-il raison ? Essaie avec a = 1 et b = 1.", choix: ["Oui : on trouve 4 des deux côtés.", "Non : (1 + 1)² = 4, alors que 1² + 1² = 2.", "Oui : on trouve 2 des deux côtés."], bon: 1, expl: "Un seul contre-exemple suffit. La bonne identité est (a + b)² = a² + 2ab + b²." },
          { q: "Pourquoi sa formulation risque-t-elle d'obtenir une réponse trompeuse ?", choix: ["Elle est trop courte.", "Il demande explicitement d'être approuvé : la complaisance de l'IA risque de l'amener à confirmer, ou à atténuer sa critique.", "Elle contient des maths."], bon: 1, expl: "Une IA a tendance à aller dans le sens de l'utilisateur." },
          { q: "Quelle requête lui permettrait d'obtenir un avis honnête et d'apprendre quelque chose ?", choix: ["« Confirme que (a + b)² = a² + b². »", "« Voici ma démonstration : [démonstration]. Vérifie-la de façon critique : est-elle juste ? Si elle est fausse, aide-moi à trouver un contre-exemple moi-même, puis explique-moi la bonne formule. »", "« Donne-moi la bonne réponse. »"], bon: 1, expl: "Elle demande une vérification critique et laisse à Hugo l'effort de trouver le contre-exemple." },
        ] },
      { t: "quiz", titre: "Déclarer son usage", intro: "Pour un exposé, le professeur autorise l'IA « pour trouver des idées et corriger l'orthographe, à condition de le déclarer ». Sarah a demandé des idées de plan, en a gardé une qu'elle a modifiée, et a fait corriger son orthographe.",
        questions: [
          { q: "Quelle déclaration d'usage convient ?", choix: ["« J'ai un peu utilisé l'IA. »", "« J'ai utilisé l'assistant [nom], le [date], pour deux usages autorisés. Je lui ai demandé trois idées de plan : j'en ai retenu une, en remplaçant sa deuxième partie. Je lui ai ensuite fait relever mes fautes d'orthographe, que j'ai corrigées moi-même. Le contenu et la rédaction sont de moi. »", "Aucune : l'usage était autorisé, il n'y a rien à dire."], bon: 1, expl: "Une déclaration précise : quel outil, pour quoi faire, ce qui a été gardé et ce qui a été modifié." },
          { q: "Pourquoi ne faut-il pas confier de données personnelles à un assistant conversationnel ?", choix: ["Parce qu'il les oublie aussitôt.", "Parce que ces informations, sur soi ou sur d'autres personnes, n'ont pas à lui être transmises.", "Parce qu'il répond moins bien."], bon: 1, expl: "Ni nom complet, ni adresse, ni photo, ni informations sur d'autres personnes. Le chapitre 10 revient sur la vie privée." },
        ] },
      { t: "lecon", titre: "Écrire avec l'IA comme assistant",
        texte: `<p>Voici une façon de travailler à essayer en classe, sur la question : <strong>« Faut-il interdire les téléphones portables au lycée ? »</strong></p>
<ol><li><strong>Seul(e), sans IA :</strong> rédige un premier jet d'une dizaine de lignes.</li><li><strong>Avec l'IA :</strong> soumets ton texte à l'outil autorisé avec la requête ci-dessous, et lis attentivement les remarques.</li><li><strong>Seul(e) à nouveau :</strong> améliore ton texte <em>toi-même</em>, en retenant les remarques qui te semblent justes.</li></ol>
<blockquote class="recit">Je suis élève de seconde. Voici un paragraphe argumenté que j'ai écrit sur la question « Faut-il interdire les téléphones portables au lycée ? ». Ne le réécris pas. Indique-moi : 1) si ma thèse est claire ; 2) si mes arguments sont convaincants et lequel est le plus faible ; 3) un contre-argument auquel je n'ai pas pensé ; 4) mes erreurs d'expression. Sois honnête, même si c'est critique. Voici mon texte : [coller le texte]</blockquote>
<p>Un <strong>journal d'utilisation</strong> accompagne le texte final : l'outil utilisé et la date, les remarques retenues, celles écartées et pourquoi, ce qui a été vérifié ou modifié, ce que l'échange a appris. Un journal réussi est précis, par exemple : « l'IA trouvait mon deuxième argument faible ; je l'ai remplacé par un exemple tiré de mon expérience ».</p>` },
      { t: "ordre", texte: true, titre: "Les temps du travail", q: "Range dans l'ordre les temps de ce travail d'écriture.",
        lignes: ["Je rédige un premier jet, seul.", "Je soumets mon texte à l'IA en lui demandant des remarques, pas une réécriture.", "Je lis ses remarques d'un œil critique.", "J'améliore mon texte moi-même.", "Je remplis mon journal d'utilisation."],
        expl: "L'effort d'écriture reste le tien, avant comme après l'échange avec l'IA." },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Un prompt est…", choix: ["une erreur de l'IA.", "un type de réseau de neurones.", "l'instruction écrite que l'on donne à une IA générative.", "un logiciel de détection."], bon: 2, expl: "On dit aussi requête ou invite." },
          { q: "Parmi ces requêtes, laquelle aide le plus à apprendre ?", choix: ["« Explique-moi la méthode avec un autre exemple, puis pose-moi une question. »", "« Fais mon exercice. »", "« Donne-moi la réponse. »", "« Écris mon exposé. »"], bon: 0, expl: "L'effort reste du côté de l'élève." },
          { q: "Les quatre éléments d'une bonne requête sont…", choix: ["titre, image, son, vidéo.", "nom, prénom, adresse, classe.", "question, réponse, note, appréciation.", "contexte, tâche, contraintes, format."], bon: 3, expl: "Et l'on ne donne jamais de données personnelles." },
          { q: "Un assistant sans accès à Internet ne peut pas connaître de façon fiable…", choix: ["la définition d'un algorithme.", "les événements postérieurs à la fin de son entraînement.", "la conjugaison du verbe être.", "la date de la Révolution française."], bon: 1, expl: "Ses connaissances sont datées." },
          { q: "La complaisance d'une IA désigne sa tendance à…", choix: ["aller dans le sens de l'utilisateur, même quand il a tort.", "refuser de répondre.", "répondre très lentement.", "consommer beaucoup d'énergie."], bon: 0, expl: "D'où l'intérêt de demander une vérification critique." },
          { q: "Rendre comme sien un texte généré par une IA, alors que la consigne l'interdit, est…", choix: ["une bonne méthode de travail.", "obligatoire.", "une fraude.", "sans conséquence."], bon: 2, expl: "Au même titre que copier sur un camarade." },
          { q: "Les logiciels de détection de textes écrits par une IA…", choix: ["sont peu fiables et peuvent accuser à tort.", "sont infaillibles.", "sont obligatoires au lycée.", "détectent aussi les fautes d'orthographe."], bon: 0, expl: "Ils se laissent aussi tromper par un texte légèrement réécrit." },
          { q: "Itérer avec une IA, c'est…", choix: ["poser une seule question et recopier la réponse.", "changer d'outil à chaque question.", "répéter la même question jusqu'à obtenir la réponse voulue.", "lire la réponse de façon critique, puis préciser ou corriger sa demande."], bon: 3, expl: "Une bonne utilisation est un dialogue." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Les limites à connaître.</strong> Erreurs et inventions, connaissances datées, calculs et raisonnements fragiles, manque de contexte, <strong>complaisance</strong>, biais.</p>
<p><strong>Une bonne requête.</strong> Le <strong>prompt</strong> contient souvent quatre éléments : <strong>contexte</strong>, <strong>tâche</strong>, <strong>contraintes</strong>, <strong>format</strong>. On <strong>itère</strong> : lire d'un œil critique, puis préciser ou corriger. On ne confie jamais de données personnelles.</p>
<p><strong>Tuteur, pas faiseur de devoirs.</strong> L'IA aide à apprendre quand elle explique autrement, pose des questions, commente un travail fait seul. Elle empêche d'apprendre quand elle fait l'effort à ma place.</p>
<p><strong>Trois questions.</strong> Qui fait l'effort qui fait apprendre ? La consigne l'autorise-t-elle ? Est-ce que je le déclare ?</p>
<p><strong>Intégrité.</strong> Présenter comme sien un travail produit par une IA sans autorisation est une <strong>fraude</strong>. Un usage autorisé se <strong>déclare</strong>. Les détecteurs d'IA sont peu fiables.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>citer les limites d'un assistant conversationnel</li><li>rédiger une requête en quatre éléments</li><li>distinguer un usage qui aide d'un usage qui empêche d'apprendre</li><li>appliquer les trois questions</li><li>rédiger une déclaration d'usage</li></ul>` },
    ] },
    { id: "c7", num: 7, titre: "Vérifier et valider les productions de l'IA", resume: "Hallucinations, sources, recoupement, ordres de grandeur",
    etapes: [
      { t: "tri", titre: "Ce texte est-il fiable ?", q: "Un assistant a rédigé cette biographie de Marie Curie. Elle paraît sérieuse, mais contient quatre erreurs. Classe chaque phrase, en t'aidant si possible d'une source fiable.",
        categories: ["Exacte", "Erronée"],
        items: [
          { txt: "Marie Curie, née Maria Skłodowska à Cracovie en 1867, est une physicienne et chimiste d'origine polonaise.", cat: 1, expl: "Elle est née à Varsovie, le 7 novembre 1867." },
          { txt: "Elle s'installe à Paris en 1891 pour étudier à la Sorbonne, où elle rencontre Pierre Curie, qu'elle épouse en 1895.", cat: 0, expl: "Phrase exacte." },
          { txt: "En 1898, le couple découvre deux nouveaux éléments chimiques : le polonium et le radium.", cat: 0, expl: "Phrase exacte." },
          { txt: "En 1903, elle reçoit le prix Nobel de chimie, partagé avec Pierre Curie et Henri Becquerel.", cat: 1, expl: "Le prix Nobel de 1903 est un prix Nobel de physique." },
          { txt: "En 1911, elle obtient un second prix Nobel, ce qui fait d'elle la seule personne de l'histoire à avoir reçu deux prix Nobel.", cat: 1, expl: "Elle est la première, et la seule dans deux sciences différentes, mais pas la seule : Linus Pauling, par exemple, en a reçu deux." },
          { txt: "Comme elle l'écrit dans ses Mémoires publiés en 1925 : « La science est une lumière qui ne s'éteint jamais. »", cat: 1, expl: "On ne trouve aucune trace de ces « Mémoires » ni de cette citation dans les sources fiables : elles sont inventées." },
          { txt: "Elle meurt en 1934 et repose depuis 1995 au Panthéon.", cat: 0, expl: "Phrase exacte." },
        ],
        expl: "Les erreurs sont écrites dans le même style que les phrases exactes : rien, dans la forme, ne permet de les repérer." },
      { t: "quiz", titre: "Bilan de l'enquête",
        questions: [
          { q: "Les erreurs se repéraient-elles au style du texte ?", choix: ["Oui, les phrases fausses sont moins bien écrites.", "Non : elles sont écrites dans le même style que les phrases exactes, ce qui les rend crédibles.", "Oui, elles contiennent des fautes d'orthographe."], bon: 1, expl: "C'est ce qui les rend dangereuses." },
          { q: "Pourquoi la citation des « Mémoires » est-elle souvent l'erreur la plus difficile à repérer ?", choix: ["Parce qu'elle est en fin de texte.", "Parce qu'une citation, un titre et une date donnent une impression de précision.", "Parce qu'elle est courte."], bon: 1, expl: "Il faut chercher la source pour s'apercevoir qu'elle n'existe pas." },
          { q: "Aurait-on pu vérifier ce texte en le soumettant à une autre IA ?", choix: ["Oui, deux IA ne se trompent jamais ensemble.", "Non : une autre IA peut reproduire les mêmes erreurs ; il faut des sources fiables et indépendantes.", "Oui, à condition qu'elle soit plus récente."], bon: 1, expl: "Deux modèles entraînés sur des données semblables peuvent faire la même erreur." },
        ] },
      { t: "lecon", titre: "Les hallucinations",
        texte: `<p>On appelle <strong>hallucination</strong> une réponse fausse ou inventée produite par une IA générative et présentée avec la même assurance qu'une réponse exacte.</p>
<p>Les hallucinations ne sont pas des « bugs » occasionnels : elles découlent du fonctionnement même des modèles de langage (chapitre 5).</p>
<ul><li>Le modèle produit la suite la plus <strong>plausible</strong>, pas la plus <strong>vraie</strong> : il ne consulte pas une base de faits vérifiés.</li><li>Quand une information est rare dans ses données d'entraînement, il « comble les trous » avec ce qui ressemble à une bonne réponse.</li><li>Il est entraîné à répondre de façon fluide et serviable : il avoue moins souvent son ignorance qu'il ne le devrait.</li><li>Ses connaissances s'arrêtent à une date, et ses données contiennent elles-mêmes des erreurs.</li></ul>
<aside class="retenir">Le <strong>ton assuré</strong> et le <strong>style soigné</strong> d'une réponse ne disent rien de son exactitude. Un texte d'IA peut être juste à 90 % et contenir une erreur grave au milieu de phrases exactes.</aside>
<table class="donnees large"><thead><tr><th>Type d'erreur</th><th>Exemple</th></tr></thead><tbody>
<tr><th>Faits, dates, lieux</th><td>une ville de naissance, une date de bataille, un auteur inversé</td></tr>
<tr><th>Chiffres</th><td>une population, une distance, un pourcentage fantaisiste</td></tr>
<tr><th>Sources inventées</th><td>un livre, un article, une étude ou une citation qui n'existent pas, avec un titre et une date crédibles</td></tr>
<tr><th>Généralisations abusives</th><td>« le seul », « toujours », « tous les scientifiques s'accordent »</td></tr>
<tr><th>Calculs et raisonnements</th><td>une étape de calcul fausse dans une démonstration bien rédigée</td></tr>
<tr><th>Informations périmées</th><td>une loi, un record ou un responsable qui ont changé depuis l'entraînement</td></tr></tbody></table>` },
      { t: "lecon", titre: "Une méthode en quatre étapes",
        texte: `<ol class="phases"><li><strong>Repérer</strong> les affirmations vérifiables : faits, dates, chiffres, citations, sources</li><li><strong>Remonter à la source</strong> trouver d'où vient l'information, si possible la source d'origine</li><li><strong>Recouper</strong> confirmer avec au moins deux sources fiables et indépendantes</li><li><strong>Évaluer</strong> la fiabilité des sources : qui ? quand ? dans quel but ?</li></ol>
<p>Une <strong>affirmation vérifiable</strong> est une phrase qui peut être confirmée ou réfutée par des faits : « Marie Curie est née en 1867 ». Une opinion (« Marie Curie est la plus grande scientifique de l'histoire ») ne se vérifie pas : elle se discute avec des arguments.</p>
<p><strong>Recouper</strong> une information, c'est vérifier qu'elle est confirmée par plusieurs sources <strong>indépendantes</strong>, c'est-à-dire qui ne se recopient pas les unes les autres.</p>
<p>Pour évaluer la <strong>fiabilité</strong> d'une source, on se demande :</p>
<ul><li><strong>Qui</strong> est l'auteur ? Une institution reconnue, un journaliste, un scientifique, un anonyme ?</li><li><strong>Quand</strong> l'information a-t-elle été publiée ou mise à jour ?</li><li><strong>Pourquoi</strong> a-t-elle été publiée : informer, vendre, convaincre, divertir ?</li><li><strong>Comment</strong> : l'auteur cite-t-il lui-même ses sources ?</li></ul>
<aside class="savoir"><strong>Et quand l'IA cite ses sources ?</strong> Certains assistants effectuent une recherche en ligne et affichent des liens. C'est un progrès, mais pas une garantie : il arrive que la page citée ne dise pas ce que l'IA lui attribue, ou qu'elle soit elle-même peu fiable. Il faut <strong>ouvrir la source</strong> et vérifier qu'elle contient bien l'information. Et l'on ne vérifie pas une IA avec une autre IA.</aside>` },
      { t: "ordre", texte: true, titre: "Les quatre étapes", q: "Range dans l'ordre les étapes de la méthode de vérification.",
        lignes: ["Repérer les affirmations vérifiables.", "Remonter à la source de l'information.", "Recouper avec au moins deux sources indépendantes.", "Évaluer la fiabilité des sources."],
        expl: "Repérer, remonter à la source, recouper, évaluer." },
      { t: "tri", titre: "Vérifiable ou opinion ?", q: "Classe chaque phrase.", categories: ["Affirmation vérifiable", "Opinion"],
        items: [
          { txt: "La Seine traverse Paris.", cat: 0, expl: "Un fait, que l'on peut confirmer." },
          { txt: "Le meilleur sport du monde est le football.", cat: 1, expl: "Un jugement, qui se discute." },
          { txt: "Le cœur d'un adulte au repos bat en moyenne entre 60 et 100 fois par minute.", cat: 0, expl: "Un fait mesurable." },
          { txt: "Il faudrait supprimer les devoirs à la maison.", cat: 1, expl: "Une prise de position." },
          { txt: "Le français est une langue officielle au Canada.", cat: 0, expl: "Un fait, que l'on peut confirmer." },
          { txt: "Les chats sont plus attachants que les chiens.", cat: 1, expl: "Une préférence." },
        ] },
      { t: "ordre", texte: true, titre: "Quelle confiance accorder ?", q: "On veut vérifier une information sur une réforme du baccalauréat. Range ces sources de la plus fiable à la moins fiable.",
        lignes: ["La page officielle du ministère de l'Éducation nationale.", "Un article d'un quotidien national, daté de la semaine dernière.", "La réponse d'un assistant conversationnel, sans source.", "Une vidéo d'un influenceur qui fait la promotion d'une application de révision.", "Un message relayé sur un réseau social par un compte anonyme."],
        expl: "Le ministère est la source officielle, à jour, responsable de la réforme. L'article est signé et daté, mais à recouper. L'assistant sans source expose à l'hallucination et à l'information périmée ; l'influenceur a un but commercial ; le compte anonyme n'offre aucune garantie. D'autres classements des trois dernières se défendent, s'ils sont bien justifiés." },
      { t: "quiz", titre: "La bibliographie suspecte", intro: "Un assistant a proposé cette bibliographie pour un exposé sur l'IA.",
        doc: `<ol><li>Cédric Villani, <em>Donner un sens à l'intelligence artificielle</em>, rapport au gouvernement, 2018.</li><li>Yann LeCun, <em>Quand la machine apprend</em>, Gallimard, 2015.</li><li>Alan Turing, <em>Les Réseaux de neurones profonds</em>, Dunod, 1985.</li></ol>`,
        questions: [
          { q: "Une référence est impossible, sans même faire de recherche. Laquelle ?", choix: ["La première.", "La deuxième.", "La troisième."], bon: 2, expl: "Alan Turing est mort en 1954 : il ne peut pas avoir publié un livre en 1985. Et l'expression « réseaux de neurones profonds » est bien postérieure à sa mort." },
          { q: "Comment vérifier les deux autres ?", choix: ["En redemandant la bibliographie à l'assistant.", "En cherchant dans le catalogue d'une bibliothèque (CDI, Bibliothèque nationale de France) ou sur le site de l'éditeur.", "En comptant les mots des titres."], bon: 1, expl: "Pour le rapport, on consulte le site officiel où il est publié." },
          { q: "Après vérification, le livre de Yann LeCun existe, mais chez Odile Jacob, en 2019. Que faut-il en conclure ?", choix: ["Une bibliographie produite par une IA est une liste de pistes : chaque référence doit être vérifiée.", "La bibliographie est prête à l'emploi, à un détail près.", "Le livre n'existe pas."], bon: 0, expl: "Et l'on ne cite que ce que l'on a soi-même consulté." },
        ] },
      { t: "lecon", titre: "Vérifier un chiffre par un ordre de grandeur",
        texte: `<p>Les mathématiques sont un excellent outil de vérification. Un calcul rapide permet souvent de détecter un chiffre absurde.</p>
<p>Une IA affirme : « La lumière du Soleil met environ 8 secondes à nous parvenir. » La distance Terre–Soleil est d'environ 150 millions de kilomètres et la lumière parcourt environ 300 000 km par seconde :</p>
<p class="formule">150 000 000 ÷ 300 000 = 500 s, soit environ 8 minutes et 20 secondes.</p>
<p>L'IA a confondu secondes et minutes : l'erreur est d'un facteur 60.</p>
<aside class="retenir">Vérifier, ce n'est pas tout revérifier : on concentre ses efforts sur les affirmations <strong>vérifiables</strong> et <strong>importantes</strong> pour son travail. Et si l'on ne peut pas vérifier une information, on ne l'utilise pas, ou l'on précise qu'elle n'a pas été vérifiée.</aside>` },
      { t: "code", titre: "Le calcul comme détecteur", d: 1,
        caches: ["duree(750, 300)", "duree(300, 20)", "duree(1000, 8)"],
        enonce: `<p>Écris la fonction <code>duree(distance, vitesse)</code> qui renvoie la durée d'un trajet : la distance divisée par la vitesse.</p><p>Elle servira à contrôler des affirmations : <code>duree(384000, 300000)</code> donne le temps, en secondes, que met un signal radio pour aller de la Terre à la Lune.</p>`,
        depart: `def duree(distance, vitesse):\n    # à compléter\n    return 0\n\nprint(duree(384000, 300000))`,
        solution: `def duree(distance, vitesse):\n    return distance / vitesse\n\nprint(duree(384000, 300000))`,
        tests: [{ appels: [["duree(150000000, 300000)", "500.0"], ["duree(384000, 300000)", "1.28"], ["duree(384000, 5)", "76800.0"]] }],
        indices: ["Une durée s'obtient en divisant la distance par la vitesse.", "return distance / vitesse"] },
      { t: "quiz", titre: "Plausible ou non ?", intro: "Pour chaque affirmation, fais un calcul d'ordre de grandeur.",
        questions: [
          { q: "« Un signal radio envoyé de la Terre met plus d'une minute à atteindre la Lune. » (384 000 km, à 300 000 km/s)", choix: ["Plausible.", "Faux : il met un peu plus d'une seconde.", "Faux : il met plus d'une heure."], bon: 1, expl: "384 000 ÷ 300 000 ≈ 1,3 s." },
          { q: "« En marchant à 5 km/h sans s'arrêter, il faudrait environ 9 ans pour parcourir la distance Terre–Lune. »", choix: ["Plausible.", "Faux : environ 9 mois.", "Faux : environ 90 ans."], bon: 0, expl: "384 000 ÷ 5 = 76 800 h, soit 3 200 jours, soit environ 8,8 ans." },
          { q: "« Un élève qui passe 3 heures par jour sur son téléphone y consacre plus d'un mois complet par an. »", choix: ["Faux : à peine une semaine.", "Exact : plus d'un mois et demi.", "Faux : plus de six mois."], bon: 1, expl: "3 × 365 = 1 095 h ; 1 095 ÷ 24 ≈ 45,6 jours." },
          { q: "« Un TGV roulant à 300 km/h relie Paris à Marseille (environ 750 km) en 2 h 30 environ, sans arrêt. »", choix: ["Plausible.", "Faux."], bon: 0, expl: "750 ÷ 300 = 2,5 h." },
          { q: "« Un adulte possède environ 2 000 os. »", choix: ["Plausible.", "Faux : c'est dix fois trop."], bon: 1, expl: "Un adulte possède 206 os." },
        ] },
      { t: "tri", titre: "Mission vérification : la Lune", q: "Ce texte d'un assistant, destiné à un exposé, contient cinq erreurs. Vérifie chaque phrase avec au moins deux sources fiables, puis classe-la.",
        categories: ["Exacte", "Erronée"],
        items: [
          { txt: "La Lune est l'unique satellite naturel de la Terre. Elle se trouve en moyenne à 38 000 km de nous.", cat: 1, expl: "La distance moyenne est d'environ 384 400 km." },
          { txt: "Son diamètre, d'environ 3 470 km, vaut à peu près le quart de celui de la Terre.", cat: 0, expl: "Exact : environ 3 474 km." },
          { txt: "La pesanteur à sa surface est deux fois plus faible que sur Terre.", cat: 1, expl: "Elle est environ six fois plus faible." },
          { txt: "Le 21 juillet 1969 (heure de Paris), lors de la mission Apollo 11, Buzz Aldrin devient le premier homme à marcher sur la Lune.", cat: 1, expl: "Le premier est Neil Armstrong ; Buzz Aldrin l'a suivi quelques minutes plus tard." },
          { txt: "Au total, quatre astronautes ont foulé le sol lunaire.", cat: 1, expl: "Douze astronautes, lors de six missions Apollo, entre 1969 et 1972." },
          { txt: "La Lune présente toujours la même face à la Terre ; sa face cachée, elle, est plongée dans une nuit éternelle.", cat: 1, expl: "En partie faux : la face cachée reçoit la lumière du Soleil comme l'autre ; elle est seulement invisible depuis la Terre." },
          { txt: "La Lune s'éloigne de la Terre d'environ 3,8 cm par an.", cat: 0, expl: "Exact." },
          { txt: "C'est surtout elle qui provoque les marées sur Terre.", cat: 0, expl: "Exact ; le Soleil contribue aussi, environ deux fois moins." },
        ] },
      { t: "quiz", titre: "Le permis à 16 ans ?", intro: "À la question « À quel âge peut-on passer le permis de conduire en France ? », un assistant répond : « Depuis 2023, on peut passer le permis B dès 16 ans, et conduire seul dès l'obtention. »",
        questions: [
          { q: "Pourquoi ce type d'information est-il particulièrement exposé aux erreurs des IA ?", choix: ["Parce que les règles changent avec le temps : l'IA peut s'appuyer sur des données anciennes ou mélanger plusieurs règles.", "Parce que le sujet est trop technique.", "Parce que personne n'écrit sur le permis."], bon: 0, expl: "Ici, elle mélange permis et conduite accompagnée." },
          { q: "Quelle source consulter pour vérifier ?", choix: ["Un forum d'automobilistes.", "Le site officiel de l'administration française, en regardant la date de mise à jour de la page.", "Un autre assistant conversationnel."], bon: 1, expl: "Et l'on recoupe avec un article de presse récent." },
          { q: "Le site officiel indique : permis B dès 17 ans depuis le 1er janvier 2024, conduite accompagnée dès 15 ans. Quelle est la réponse corrigée ?", choix: ["« Depuis 2023, permis B dès 16 ans. »", "« Depuis le 1er janvier 2024, on peut passer le permis B dès 17 ans. La conduite accompagnée est possible dès 15 ans. »", "« Le permis B se passe à 15 ans. »"], bon: 1, expl: "La date et l'âge étaient faux tous les deux." },
        ] },
      { t: "quiz", titre: "La source ne dit pas ça", intro: "Un assistant avec recherche en ligne affirme : « Selon un article du site d'un grand journal [lien], 80 % des lycéens utilisent l'IA pour faire leurs devoirs. »",
        doc: `<blockquote class="recit">Ce que dit l'article, une fois le lien ouvert : « Selon un sondage réalisé auprès de 1 000 jeunes de 18 à 25 ans, 80 % déclarent avoir déjà utilisé un outil d'IA générative, quel qu'en soit l'usage. »</blockquote>`,
        questions: [
          { q: "Qui a réellement été interrogé ?", choix: ["Des lycéens.", "Des jeunes de 18 à 25 ans.", "Des professeurs."], bon: 1, expl: "La population n'est pas celle qu'annonce l'IA." },
          { q: "Que déclarent réellement ces 80 % ?", choix: ["Utiliser l'IA pour faire leurs devoirs.", "Avoir déjà utilisé un outil d'IA générative, quel qu'en soit l'usage.", "Utiliser l'IA tous les jours."], bon: 1, expl: "Autre différence : un sondage auprès de 1 000 jeunes est présenté comme une vérité générale." },
          { q: "Pourquoi cette déformation est-elle trompeuse, alors qu'un lien est fourni ?", choix: ["Le lien donne une impression de sérieux, et peu de lecteurs l'ouvrent pour vérifier.", "Le lien est trop long.", "Le journal est inconnu."], bon: 0, expl: "L'information déformée paraît sourcée." },
          { q: "Quelle phrase rapporte fidèlement l'article ?", choix: ["« 80 % des jeunes trichent avec l'IA. »", "« Selon un sondage cité par le journal, 80 % des 1 000 jeunes de 18 à 25 ans interrogés déclarent avoir déjà utilisé un outil d'IA générative. »", "« La plupart des lycéens utilisent l'IA. »"], bon: 1, expl: "Elle garde la population, l'usage et la nature de l'information." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Une hallucination d'IA est…", choix: ["un bug qui fait planter l'ordinateur.", "une image floue.", "une réponse trop longue.", "une réponse fausse ou inventée présentée avec assurance."], bon: 3, expl: "Avec la même assurance qu'une réponse exacte." },
          { q: "Les hallucinations s'expliquent notamment par le fait que le modèle…", choix: ["produit la suite la plus plausible, sans consulter une base de faits vérifiés.", "est volontairement programmé pour mentir.", "manque d'électricité.", "est relié à de mauvais sites web."], bon: 0, expl: "Plausible ne veut pas dire vrai." },
          { q: "Laquelle de ces phrases est une affirmation vérifiable ?", choix: ["« Ce film est magnifique. »", "« Il faudrait plus de vacances. »", "« La tour Eiffel mesure environ 330 mètres. »", "« Le bleu est la plus belle couleur. »"], bon: 2, expl: "Les trois autres sont des opinions." },
          { q: "Recouper une information, c'est…", choix: ["la recopier dans son cahier.", "la confirmer avec plusieurs sources indépendantes.", "la demander deux fois à la même IA.", "la partager sur un réseau social."], bon: 1, expl: "Des sources qui ne se recopient pas les unes les autres." },
          { q: "Une IA cite une étude avec un titre, une revue et une date. On peut en conclure…", choix: ["qu'il faut vérifier que l'étude existe et dit bien cela.", "que l'étude existe forcément.", "que l'IA a raison.", "que l'étude est récente."], bon: 0, expl: "Les sources inventées ont un titre et une date crédibles." },
          { q: "Pour vérifier la réponse d'une IA, demander à une autre IA…", choix: ["suffit toujours.", "est interdit par la loi.", "est la meilleure méthode.", "ne suffit pas : elles peuvent faire la même erreur."], bon: 3, expl: "Il faut des sources fiables et indépendantes." },
          { q: "La distance Terre–Soleil vaut environ 150 000 000 km et la lumière va à 300 000 km/s. La lumière met donc environ…", choix: ["8 secondes.", "50 secondes.", "500 secondes.", "5 000 secondes."], bon: 2, expl: "150 000 000 ÷ 300 000 = 500." },
          { q: "Pour évaluer la fiabilité d'une source, on se demande notamment…", choix: ["si elle est longue.", "qui l'a écrite, quand et dans quel but.", "si elle contient des images.", "si elle a beaucoup de « j'aime »."], bon: 1, expl: "Qui ? Quand ? Pourquoi ? Comment ?" },
          { q: "Si l'on ne parvient pas à vérifier une information importante trouvée grâce à une IA, il vaut mieux…", choix: ["ne pas l'utiliser, ou préciser qu'elle n'a pas été vérifiée.", "l'utiliser quand même.", "la reformuler pour qu'elle paraisse plus sûre.", "la publier sur un réseau social."], bon: 0, expl: "On concentre ses efforts sur ce qui est vérifiable et important." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Hallucination.</strong> Réponse fausse ou inventée, présentée avec assurance. Le modèle produit la suite la plus <strong>plausible</strong>, pas la plus vraie. Le ton et le style ne disent rien de l'exactitude.</p>
<p><strong>Erreurs fréquentes.</strong> Faits, dates et lieux ; chiffres ; sources inventées ; généralisations abusives ; calculs ; informations périmées.</p>
<p><strong>La méthode.</strong> <strong>Repérer</strong> les affirmations vérifiables, <strong>remonter à la source</strong>, <strong>recouper</strong> avec au moins deux sources indépendantes, <strong>évaluer</strong> leur fiabilité (qui ? quand ? pourquoi ? comment ?).</p>
<p><strong>Ordre de grandeur.</strong> Un calcul rapide détecte un chiffre absurde.</p>
<p><strong>Prudence.</strong> On ouvre les sources citées par l'IA ; on ne vérifie pas une IA avec une autre IA ; une information invérifiable ne s'utilise pas, ou se signale comme non vérifiée.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>expliquer ce qu'est une hallucination et d'où elle vient</li><li>distinguer une affirmation vérifiable d'une opinion</li><li>appliquer la méthode en quatre étapes</li><li>évaluer la fiabilité d'une source</li><li>contrôler un chiffre par un ordre de grandeur</li></ul>` },
    ] },
  ]
},
{
  id: "p3", titre: "Éthique et responsabilité", sous: "Développer un esprit critique face aux enjeux éthiques et juridiques",
  chapitres: [
    { id: "c8", num: 8, titre: "Biais et discriminations algorithmiques", resume: "Origines des biais, variables indirectes, mesurer et réduire",
    etapes: [
      { t: "quiz", titre: "Le recruteur automatique", intro: "Une affaire révélée en 2018.",
        doc: `<blockquote class="recit">À partir de 2014, une grande entreprise américaine de commerce en ligne développe un logiciel pour trier automatiquement les CV des candidats à des postes techniques. Le système apprend à partir des CV reçus pendant les dix années précédentes, en observant quels candidats avaient été recrutés. Les ingénieurs s'aperçoivent que le logiciel défavorise les candidates : il pénalise les CV contenant le mot « femmes » (par exemple « capitaine de l'équipe féminine d'échecs »). Malgré des corrections, l'entreprise abandonne le projet.</blockquote>`,
        questions: [
          { q: "Personne n'a programmé la règle « défavoriser les femmes ». D'où vient ce comportement ?", choix: ["D'une panne du logiciel.", "Des données d'entraînement : le système a appris à imiter les recrutements passés.", "D'un choix volontaire des ingénieurs."], bon: 1, expl: "Le système apprend ce que contiennent ses exemples." },
          { q: "Pendant ces dix années, les personnes recrutées étaient en grande majorité des hommes. Qu'a donc « appris » le système ?", choix: ["Que les indices de féminité étaient associés à des refus.", "Que les femmes étaient moins compétentes.", "Rien de particulier."], bon: 0, expl: "Il a repéré une régularité dans les données, et l'a pénalisée." },
          { q: "Pourquoi est-ce plus grave qu'un recruteur humain qui aurait le même préjugé ?", choix: ["Parce que le logiciel est plus lent.", "Parce qu'il applique ce préjugé à des milliers de candidatures, de façon systématique, avec une apparence d'objectivité.", "Parce qu'il coûte plus cher."], bon: 1, expl: "Personne ne le voit, et il est difficile à contester." },
        ] },
      { t: "qcm", titre: "À vous de juger", q: "On demande à un générateur d'images « un médecin », « un ingénieur », « une personne qui fait le ménage », « une personne pauvre ». Les images montrent souvent des hommes pour les deux premiers, des femmes ou des personnes racisées pour les deux derniers. D'où viennent ces stéréotypes ?",
        choix: ["Du hasard.", "Des millions d'images et de légendes de l'entraînement, qui reflètent les représentations dominantes.", "D'une règle écrite par les programmeurs."], bon: 1,
        expl: "Le modèle reproduit ce qui est le plus fréquent dans ses données." },
      { t: "lecon", titre: "Biais et discrimination",
        texte: `<p>Un <strong>biais algorithmique</strong> est une déformation systématique des résultats d'un système automatisé, qui favorise ou défavorise certaines situations ou certains groupes de personnes, sans justification légitime.</p>
<p>Une <strong>discrimination</strong> est un traitement défavorable d'une personne en raison d'un critère interdit par la loi. En France, le code pénal en énumère plus de vingt, parmi lesquels l'origine, le sexe, l'âge, le handicap, l'état de santé, l'orientation sexuelle, les opinions politiques, les convictions religieuses ou le lieu de résidence. Une discrimination est illégale, qu'elle soit commise par un humain ou par un algorithme.</p>
<p>Un biais n'est pas toujours une discrimination (une IA météo peut se tromper davantage en montagne), mais un biais qui touche des personnes selon un critère protégé en devient une.</p>` },
      { t: "tri", titre: "Biais ou discrimination ?", q: "Simple biais, ou discrimination au sens de la loi ?", categories: ["Simple biais", "Discrimination"],
        items: [
          { txt: "Une IA de prévision météo se trompe plus souvent pour les villes de montagne.", cat: 0, expl: "Aucun critère protégé n'est en jeu." },
          { txt: "Un logiciel de recrutement écarte systématiquement les candidats de plus de 50 ans.", cat: 1, expl: "L'âge est un critère protégé." },
          { txt: "Un correcteur orthographique connaît mal les mots créoles.", cat: 0, expl: "Il fonctionne moins bien pour une langue ; il deviendrait une discrimination s'il servait à évaluer des personnes." },
          { txt: "Un algorithme de location refuse plus souvent les personnes dont le prénom suggère une origine étrangère.", cat: 1, expl: "Le prénom sert ici de variable indirecte pour l'origine." },
        ] },
      { t: "lecon", titre: "D'où viennent les biais ?",
        texte: `<ol class="phases"><li><strong>Les données historiques</strong> un système qui apprend à partir des décisions passées apprend aussi leurs injustices : c'est le cas du recruteur automatique</li><li><strong>Les données déséquilibrées</strong> si un groupe est peu présent dans les données, le système se trompe davantage à son sujet (visages mal reconnus, chapitre 2)</li><li><strong>Les choix de conception</strong> prédire « qui a coûté cher au système de santé » au lieu de « qui est le plus malade » peut défavoriser les personnes qui ont moins accès aux soins</li><li><strong>L'usage</strong> un modèle entraîné dans un pays et appliqué dans un autre, ou dont on applique les résultats sans réfléchir</li></ol>
<p>Une <strong>variable indirecte</strong> (en anglais <em>proxy</em>) est une donnée apparemment neutre mais fortement liée à un critère protégé : le code postal peut être lié à l'origine ou au niveau de revenu, un prénom au sexe ou à l'origine, une activité sportive au sexe. Supprimer le critère protégé des données ne suffit donc pas : le système peut le « retrouver » à travers ces variables.</p>` },
      { t: "tri", titre: "D'où vient le biais ?", q: "Indique l'origine principale du biais.", categories: ["Données historiques", "Données déséquilibrées", "Choix de conception", "Usage"],
        items: [
          { txt: "Un assistant vocal comprend mal les personnes qui ont un accent régional, car il a surtout été entraîné sur des voix de présentateurs radio.", cat: 1, expl: "Les accents régionaux sont peu présents dans les données." },
          { txt: "Un logiciel de prêts bancaires refuse plus souvent les habitants de certains quartiers, car il a appris des refus passés.", cat: 0, expl: "Il reproduit les décisions passées." },
          { txt: "Une application de détection de mélanomes, conçue avec des photos de peaux claires, est utilisée dans un pays où la majorité de la population a la peau foncée.", cat: 3, expl: "Le système est utilisé sur une autre population que celle de ses données." },
          { txt: "Pour repérer les « bons élèves », un logiciel retient comme critère le nombre d'heures de soutien scolaire payant suivies.", cat: 2, expl: "Le critère retenu favorise les familles aisées." },
        ] },
      { t: "lecon", titre: "Des cas réels",
        texte: `<table class="donnees large"><thead><tr><th>Domaine</th><th>Ce qui s'est passé</th></tr></thead><tbody>
<tr><th>Recrutement</th><td>Un logiciel de tri de CV apprend des recrutements passés, majoritairement masculins, et pénalise les candidates (révélé en 2018).</td></tr>
<tr><th>Justice</th><td>Aux États-Unis, une enquête du média ProPublica (2016) montre qu'un logiciel d'évaluation du risque de récidive classe à tort comme « à haut risque » deux fois plus souvent les accusés noirs que les accusés blancs.</td></tr>
<tr><th>Reconnaissance faciale</th><td>L'étude <em>Gender Shades</em> (2018) montre des taux d'erreur bien plus élevés pour les femmes à la peau foncée.</td></tr>
<tr><th>Prestations sociales</th><td>Aux Pays-Bas, un algorithme de détection de fraude aux allocations familiales cible de manière disproportionnée des familles d'origine étrangère : des milliers de familles sont accusées à tort. Le scandale entraîne la démission du gouvernement en 2021.</td></tr>
<tr><th>Traduction</th><td>Des outils de traduction transforment une phrase neutre (dans une langue sans genre grammatical) en « il est médecin » et « elle est infirmière ».</td></tr></tbody></table>
<aside class="retenir">Un algorithme n'est pas neutre « par nature » : il reproduit les choix de ceux qui le conçoivent et les déséquilibres des données dont il apprend. Plus grave, il peut <strong>amplifier</strong> ces injustices, car il les applique à grande échelle, rapidement, et sous une apparence d'objectivité mathématique.</aside>` },
      { t: "quiz", titre: "Le jury d'admission", intro: "Une formation sélective veut automatiser ses admissions. Elle dispose des décisions de son jury pour seize candidats : la note du dossier (sur 20), un groupe (A ou B, par exemple deux types d'établissements d'origine) et la décision.",
        doc: `<table class="donnees"><thead><tr><th>Groupe A</th><th>Décision</th><th>Groupe B</th><th>Décision</th></tr></thead><tbody><tr><td>15</td><td>admis</td><td>15</td><td>refusé</td></tr><tr><td>12</td><td>admis</td><td>12</td><td>refusé</td></tr><tr><td>9</td><td>refusé</td><td>17</td><td>admis</td></tr><tr><td>13</td><td>admis</td><td>14</td><td>refusé</td></tr><tr><td>11</td><td>refusé</td><td>18</td><td>admis</td></tr><tr><td>17</td><td>admis</td><td>9</td><td>refusé</td></tr><tr><td>14</td><td>admis</td><td>16</td><td>admis</td></tr><tr><td>10</td><td>refusé</td><td>13</td><td>refusé</td></tr></tbody></table>`,
        questions: [
          { q: "Quels sont les taux d'admission des deux groupes ?", choix: ["A : 62,5 % ; B : 37,5 %.", "A : 50 % ; B : 50 %.", "A : 37,5 % ; B : 62,5 %."], bon: 0, expl: "5 admis sur 8 dans le groupe A, 3 sur 8 dans le groupe B." },
          { q: "La note moyenne est de 12,625 dans le groupe A et de 14,25 dans le groupe B. La différence de taux d'admission s'explique-t-elle par les notes ?", choix: ["Oui, le groupe A a de meilleures notes.", "Non : le groupe B a de meilleures notes, mais il est moins admis.", "On ne peut pas savoir."], bon: 1, expl: "101 ÷ 8 = 12,625 et 114 ÷ 8 = 14,25." },
          { q: "À partir de quelle note les candidats sont-ils admis ?", choix: ["12 dans les deux groupes.", "12 dans le groupe A, 16 dans le groupe B.", "16 dans le groupe A, 12 dans le groupe B."], bon: 1, expl: "Le jury a appliqué un seuil plus exigeant au groupe B." },
        ] },
      { t: "code", titre: "Mesurer les taux", d: 2,
        caches: ["taux_admission('A')", "taux_admission('B')", "taux_admission('A') + taux_admission('B')"],
        enonce: `<p>Les décisions du jury sont rangées dans la liste <code>historique</code> : chaque élément contient la note, le groupe et la décision (1 = admis, 0 = refusé).</p><p>Complète la fonction <code>taux_admission(groupe)</code> : elle compte les candidats du groupe et ceux qui sont admis, puis renvoie le quotient.</p>`,
        depart: HISTO_PY + `\ndef taux_admission(groupe):\n    total = 0\n    admis = 0\n    for (note, g, decision) in historique:\n        # à compléter\n        pass\n    return 0\n\nprint("Taux d'admission du groupe A :", taux_admission("A"))\nprint("Taux d'admission du groupe B :", taux_admission("B"))`,
        solution: HISTO_PY + `\ndef taux_admission(groupe):\n    total = 0\n    admis = 0\n    for (note, g, decision) in historique:\n        if g == groupe:\n            total = total + 1\n            admis = admis + decision\n    return admis / total\n\nprint("Taux d'admission du groupe A :", taux_admission("A"))\nprint("Taux d'admission du groupe B :", taux_admission("B"))`,
        tests: [{ appels: [["taux_admission('A')", "0.625"], ["taux_admission('B')", "0.375"]] }],
        indices: ["Dans la boucle, ne compte que les candidats dont g est égal à groupe.", "Comme la décision vaut 1 ou 0, admis = admis + decision compte les admis.", "À la fin : return admis / total"] },
      { t: "predire", titre: "Un modèle qui apprend le biais",
        code: HISTO_PY + `\ndef predire(note, groupe):\n    # le candidat passé le plus proche... dans le même groupe\n    meilleure_distance = 1000\n    prediction = 0\n    for (n, g, decision) in historique:\n        if g == groupe:\n            d = abs(note - n)\n            if d < meilleure_distance:\n                meilleure_distance = d\n                prediction = decision\n    return prediction\n\nprint(predire(14, "A"), predire(14, "B"))`,
        attendu: "1 0",
        expl: "Deux candidats ont la même note, 14 : celui du groupe A est admis, celui du groupe B refusé. Le modèle a reproduit le double seuil du jury, car il cherche des voisins dans le même groupe. Les deux groupes sont traités différemment pour les notes de 12 à 15." },
      { t: "code", titre: "Retirer le groupe", d: 2,
        caches: ["predire(12)", "predire(9)", "predire(16)", "predire(11)"],
        enonce: `<p>On décide que le modèle ne doit plus utiliser le groupe. Modifie la fonction pour qu'elle ne reçoive plus que la note : <code>predire(note)</code> cherche le candidat passé le plus proche parmi <strong>tous</strong> les candidats.</p>`,
        depart: HISTO_PY + `\ndef predire(note, groupe):\n    meilleure_distance = 1000\n    prediction = 0\n    for (n, g, decision) in historique:\n        if g == groupe:\n            d = abs(note - n)\n            if d < meilleure_distance:\n                meilleure_distance = d\n                prediction = decision\n    return prediction\n\nprint(predire(14))`,
        solution: HISTO_PY + `\ndef predire(note):\n    meilleure_distance = 1000\n    prediction = 0\n    for (n, g, decision) in historique:\n        d = abs(note - n)\n        if d < meilleure_distance:\n            meilleure_distance = d\n            prediction = decision\n    return prediction\n\nprint(predire(14))`,
        tests: [{ appels: [["predire(14)", "1"], ["predire(10)", "0"], ["predire(18)", "1"]] }],
        indices: ["Retire le paramètre groupe de la première ligne.", "Supprime la ligne if g == groupe: et décale les lignes suivantes vers la gauche."] },
      { t: "quiz", titre: "Le problème est-il réglé ?", intro: "Sans le groupe, les deux candidats à 14 sont admis : la prédiction ne dépend plus que de la note.",
        questions: [
          { q: "Le modèle apprend toujours à partir des décisions passées du jury. Pourquoi cela reste-t-il un problème ?", choix: ["Parce que les étiquettes elles-mêmes sont biaisées : des candidats du groupe B ont été refusés avec 12, 13, 14 ou 15.", "Parce que le programme est plus lent.", "Parce que la liste est trop courte pour Python."], bon: 0, expl: "Ici, le résultat dépend même de l'ordre de la liste : à égalité de distance, le premier voisin rencontré est un candidat du groupe A. Avec d'autres données, le modèle reproduirait les refus injustes." },
          { q: "Que faudrait-il faire ?", choix: ["Rien : le modèle est désormais équitable.", "Corriger ou rééquilibrer les données, mesurer les résultats par groupe et faire auditer le système.", "Ajouter plus de candidats refusés."], bon: 1, expl: "Retirer une colonne ne corrige pas les décisions passées." },
          { q: "Dans la réalité, il n'y aurait pas de colonne « groupe », mais le nom du lycée d'origine ou le code postal. Le biais pourrait-il persister ?", choix: ["Non, ces données sont neutres.", "Oui : ce sont des variables indirectes, liées au groupe, qui permettent au modèle de retrouver la distinction supprimée."], bon: 1, expl: "Une donnée neutre en apparence peut être liée à un critère protégé." },
        ] },
      { t: "lecon", titre: "Réduire les biais",
        texte: `<p>Il n'existe pas de solution miracle, mais plusieurs leviers, à combiner :</p>
<ul><li><strong>Améliorer les données</strong> : les rendre plus représentatives, rééquilibrer les groupes, corriger les étiquettes injustes.</li><li><strong>Mesurer</strong> : comparer les résultats du système selon les groupes (taux d'erreur, taux d'acceptation). On parle d'<strong>audit</strong> lorsqu'une équipe extérieure vérifie le système.</li><li><strong>Choisir avec soin</strong> les descripteurs et ce que l'on veut prédire, en repérant les variables indirectes.</li><li><strong>Diversifier</strong> les équipes qui conçoivent les systèmes.</li><li><strong>Garder un humain</strong> dans la décision et permettre de contester une décision automatisée.</li><li><strong>Être transparent</strong> : expliquer comment le système fonctionne et sur quelles données.</li></ul>
<aside class="savoir"><strong>Qu'est-ce qu'un système « équitable » ?</strong> Il existe plusieurs définitions mathématiques de l'<strong>équité</strong> : avoir le même taux d'acceptation dans chaque groupe, avoir le même taux d'erreur dans chaque groupe… Des chercheurs ont montré que, dans la plupart des situations réelles, il est impossible de satisfaire toutes ces définitions à la fois. Choisir laquelle appliquer n'est pas une question technique : c'est un choix de société.</aside>` },
      { t: "quiz", titre: "Calculer des taux d'erreur", intro: "Un logiciel de reconnaissance faciale a été testé sur 1 000 photos d'hommes et 1 000 photos de femmes. Il s'est trompé sur 8 photos d'hommes et sur 95 photos de femmes.",
        questions: [
          { q: "Quels sont les taux d'erreur ?", choix: ["Hommes : 8 % ; femmes : 95 %.", "Hommes : 0,8 % ; femmes : 9,5 %.", "Hommes : 0,08 % ; femmes : 0,95 %."], bon: 1, expl: "8 ÷ 1 000 et 95 ÷ 1 000." },
          { q: "Le fabricant annonce « un taux d'erreur global d'environ 5 % ». Ce chiffre est-il exact ?", choix: ["Oui : (8 + 95) ÷ 2 000 = 5,15 %.", "Non, il est de 10 %.", "Non, il est de 1 %."], bon: 0, expl: "Le chiffre est exact… et pourtant trompeur." },
          { q: "Pourquoi cette présentation est-elle trompeuse ?", choix: ["Parce que 5 %, c'est beaucoup.", "Parce que ce taux moyen cache un écart énorme : les femmes subissent près de douze fois plus d'erreurs que les hommes.", "Parce que le test est trop petit."], bon: 1, expl: "Il faut publier et contrôler les taux d'erreur par groupe." },
          { q: "Quelle cause est la plus probable ?", choix: ["Beaucoup moins de photos de femmes dans les données d'entraînement.", "Un appareil photo défectueux.", "Un ordinateur trop lent."], bon: 0, expl: "Solution : rééquilibrer les données, puis mesurer par groupe." },
        ] },
      { t: "quiz", titre: "La variable cachée", intro: "Une entreprise supprime les colonnes « sexe » et « âge » de son logiciel de tri de CV pour le rendre équitable. Elle garde le prénom, l'année d'obtention du diplôme, les loisirs et l'adresse.",
        questions: [
          { q: "Quelle donnée conservée permet de calculer l'âge ?", choix: ["L'adresse.", "L'année d'obtention du diplôme.", "Les loisirs."], bon: 1, expl: "C'est une variable indirecte de l'âge." },
          { q: "Quelle donnée permet souvent de deviner le sexe ?", choix: ["Le prénom.", "L'année du diplôme.", "Le code postal."], bon: 0, expl: "Certains loisirs y sont aussi statistiquement liés ; l'adresse peut être liée à l'origine ou au revenu." },
          { q: "Quelle mesure serait plus efficace ?", choix: ["Supprimer aussi la colonne « nom ».", "Supprimer les variables indirectes inutiles au poste, mesurer les résultats selon le sexe et l'âge, faire auditer le système et garder une décision humaine.", "Ne rien changer."], bon: 1, expl: "Supprimer le critère protégé ne suffit pas." },
        ] },
      { t: "quiz", titre: "Réduire un biais", intro: "Un lycée envisage un logiciel qui prédit le risque de décrochage scolaire, entraîné sur les données des dix dernières années : notes, absences, quartier, profession des parents, bourse.",
        questions: [
          { q: "Quels descripteurs risquent d'introduire un biais ?", choix: ["Les notes et les absences.", "Le quartier et la profession des parents.", "Aucun."], bon: 1, expl: "Ce sont des indicateurs sociaux, pas des comportements scolaires : ils risquent d'enfermer les élèves dans leur milieu d'origine. La bourse aussi." },
          { q: "Quelle conséquence injuste peut-on craindre ?", choix: ["Un élève boursier aux bons résultats est classé « à risque » et orienté d'office vers un dispositif de remédiation.", "Les notes des élèves baissent toutes.", "Le logiciel refuse de fonctionner."], bon: 0, expl: "Ce classement le stigmatise." },
          { q: "Quelle règle d'utilisation est la plus protectrice ?", choix: ["Laisser le logiciel décider seul des orientations.", "Garder le classement secret.", "Ne jamais prendre de décision automatique : le logiciel alerte seulement une équipe éducative, et les familles sont informées et peuvent contester."], bon: 2, expl: "On peut aussi n'utiliser que des indicateurs scolaires, et vérifier régulièrement que le logiciel ne cible pas davantage certains groupes." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Un biais algorithmique est…", choix: ["une déformation systématique des résultats qui favorise ou défavorise certains groupes.", "une panne d'ordinateur.", "une erreur de frappe dans le code.", "un virus informatique."], bon: 0, expl: "Sans justification légitime." },
          { q: "Un système qui apprend à partir de décisions passées injustes…", choix: ["corrige automatiquement ces injustices.", "ne peut pas fonctionner.", "risque de reproduire ces injustices.", "devient neutre."], bon: 2, expl: "Il apprend aussi les injustices de ses exemples." },
          { q: "Une variable indirecte (proxy) est…", choix: ["une variable Python mal nommée.", "un serveur informatique.", "une donnée chiffrée.", "une donnée neutre en apparence mais liée à un critère protégé."], bon: 3, expl: "Par exemple un prénom ou un code postal." },
          { q: "Le code postal peut servir de variable indirecte car il est souvent lié…", choix: ["à la météo.", "au niveau de revenu ou à l'origine.", "à la taille.", "au groupe sanguin."], bon: 1, expl: "Le système peut « retrouver » le critère protégé." },
          { q: "Une discrimination commise par un algorithme est…", choix: ["autorisée, car un algorithme est neutre.", "impossible.", "autorisée si elle est rare.", "illégale, comme une discrimination commise par un humain."], bon: 3, expl: "La loi s'applique dans les deux cas." },
          { q: "Pourquoi un biais algorithmique peut-il être plus grave qu'un préjugé individuel ?", choix: ["Parce qu'il est toujours volontaire.", "Parce qu'il est appliqué à grande échelle avec une apparence d'objectivité.", "Parce qu'il coûte cher.", "Parce qu'il est visible de tous."], bon: 1, expl: "Il peut amplifier les injustices." },
          { q: "Un logiciel se trompe sur 2 % des hommes et 20 % des femmes. Pour révéler ce biais, il faut…", choix: ["regarder seulement le taux d'erreur global.", "augmenter la vitesse du logiciel.", "comparer les taux d'erreur par groupe.", "supprimer les femmes des tests."], bon: 2, expl: "Un taux moyen peut cacher un écart énorme." },
          { q: "Supprimer la colonne « sexe » d'un jeu de données…", choix: ["ne suffit pas toujours, à cause des variables indirectes.", "supprime forcément tout biais lié au sexe.", "est interdit.", "rend le système plus rapide."], bon: 0, expl: "Le prénom ou les loisirs peuvent le révéler." },
          { q: "Un audit d'algorithme consiste à…", choix: ["vendre un algorithme.", "effacer un algorithme.", "traduire un algorithme en Python.", "vérifier le fonctionnement et les effets d'un système, par une équipe extérieure."], bon: 3, expl: "On y compare notamment les résultats par groupe." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Biais algorithmique.</strong> Déformation systématique des résultats, qui favorise ou défavorise certains groupes sans justification légitime.</p>
<p><strong>Discrimination.</strong> Traitement défavorable selon un critère interdit par la loi (origine, sexe, âge, handicap…). Elle est illégale, qu'elle vienne d'un humain ou d'un algorithme.</p>
<p><strong>Quatre origines.</strong> Données historiques, données déséquilibrées, choix de conception, usage.</p>
<p><strong>Variable indirecte.</strong> Donnée neutre en apparence mais liée à un critère protégé (code postal, prénom) : supprimer le critère ne suffit pas.</p>
<p><strong>Amplification.</strong> Un algorithme applique ses biais à grande échelle, vite, sous une apparence d'objectivité.</p>
<p><strong>Réduire les biais.</strong> Améliorer les données, mesurer par groupe (audit), choisir les descripteurs, diversifier les équipes, garder un humain, être transparent.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>définir un biais algorithmique et une discrimination</li><li>identifier l'origine d'un biais</li><li>repérer une variable indirecte</li><li>calculer et comparer des taux par groupe</li><li>proposer des moyens de réduire un biais</li></ul>` },
    ] },
    { id: "c9", num: 9, titre: "Désinformation et contenus générés", resume: "Hypertrucages, indices, vérifications de contexte, loi et réflexes",
    etapes: [
      { t: "tri", titre: "Vrai ou généré ?", q: "Quatre contenus ont circulé sur les réseaux sociaux. Quelle est ta première impression ?", categories: ["Authentique", "Fabriqué"],
        items: [
          { txt: "Mars 2023 : une photo du pape François vêtu d'une immense doudoune blanche à la mode.", cat: 1, expl: "Une image générée par IA." },
          { txt: "Mars 2022 : une vidéo du président ukrainien Volodymyr Zelensky appelant ses soldats à déposer les armes.", cat: 1, expl: "Une vidéo truquée." },
          { txt: "Mai 2023 : une photo d'une explosion près du Pentagone, à Washington, partagée par des comptes d'apparence officielle.", cat: 1, expl: "Une image générée. Elle a même provoqué une brève baisse des marchés financiers américains avant d'être démentie." },
          { txt: "Janvier 2024 : des appels téléphoniques où la voix du président américain demande aux électeurs de ne pas voter à une élection primaire.", cat: 1, expl: "Une voix clonée." },
        ],
        expl: "Les quatre contenus étaient fabriqués grâce à l'IA. Les motifs varient : se divertir ou faire le « buzz », gagner de l'argent, déstabiliser un pays, influencer une élection." },
      { t: "qcm", titre: "Du moins grave au plus grave", q: "Lequel de ces quatre contenus a, selon toi, les conséquences les plus graves ? (La réponse proposée est un exemple de classement : d'autres se défendent, s'ils sont justifiés.)",
        choix: ["La photo du pape en doudoune.", "La photo de l'explosion près du Pentagone.", "Les appels avec la voix clonée du président, qui manipulent directement une élection."], bon: 2,
        expl: "Un classement possible : la photo du pape (amusante, peu de conséquences, mais elle montre la facilité de tromper), la photo du Pentagone (panique, effet sur les marchés), la vidéo de Zelensky (démoraliser une armée en guerre), les appels (manipulation directe d'une élection)." },
      { t: "lecon", titre: "Désinformation et hypertrucages",
        texte: `<p>La <strong>désinformation</strong> est la diffusion <strong>volontaire</strong> d'informations fausses ou trompeuses, dans le but de nuire, de manipuler ou de tirer profit. La <strong>mésinformation</strong> est la diffusion d'une information fausse <strong>sans intention</strong> de tromper : par exemple, partager de bonne foi une rumeur.</p>
<p>Un <strong>hypertrucage</strong> (en anglais <em>deepfake</em>) est une image, un son ou une vidéo créé ou modifié par l'IA pour faire croire qu'une personne a dit ou fait ce qu'elle n'a ni dit ni fait, ou qu'un événement a eu lieu alors qu'il n'a jamais existé.</p>
<p>Les principales formes de contenus trompeurs générés par IA :</p>
<ul><li><strong>les images générées</strong> : scène inventée, photo truquée d'une personnalité ;</li><li><strong>les vidéos truquées</strong> : remplacement de visage, mouvement des lèvres synchronisé sur un faux discours ;</li><li><strong>le clonage vocal</strong> : quelques secondes d'enregistrement suffisent pour imiter une voix, utilisée pour des arnaques (« Maman, j'ai eu un accident, envoie-moi de l'argent ») ;</li><li><strong>les textes générés en masse</strong> : faux avis de consommateurs, faux comptes qui publient des milliers de messages, faux sites d'information.</li></ul>` },
      { t: "tri", titre: "Désinformation ou mésinformation ?", q: "Classe chaque situation.", categories: ["Désinformation", "Mésinformation"],
        items: [
          { txt: "Un groupe crée de faux sites d'information pour diffuser de fausses nouvelles avant une élection.", cat: 0, expl: "Volontaire, pour manipuler." },
          { txt: "Ta grand-mère partage une fausse image d'un animal extraordinaire, croyant qu'elle est vraie.", cat: 1, expl: "De bonne foi." },
          { txt: "Une entreprise publie des centaines de faux avis positifs générés par IA sur ses produits.", cat: 0, expl: "Volontaire, pour tirer profit ; c'est aussi une pratique commerciale trompeuse." },
          { txt: "Un élève relaie une rumeur sur la fermeture du lycée, sans vérifier.", cat: 1, expl: "Sans intention de tromper, même s'il aurait dû vérifier." },
        ] },
      { t: "lecon", titre: "Pourquoi l'IA change la donne",
        texte: `<p>Les trucages existent depuis l'invention de la photographie. Ce qui change avec l'IA :</p>
<table class="donnees large"><thead><tr><th>Avant</th><th>Aujourd'hui</th></tr></thead><tbody>
<tr><td>Coûteux et lent</td><td>quelques secondes et un téléphone suffisent</td></tr>
<tr><td>Réservé à des experts</td><td>accessible à tous, sans compétence technique</td></tr>
<tr><td>Trucages souvent visibles</td><td>résultats de plus en plus réalistes</td></tr>
<tr><td>Diffusion limitée</td><td>propagation virale par les réseaux sociaux, qui favorisent les contenus choquants</td></tr></tbody></table>
<aside class="retenir"><strong>Le « dividende du menteur ».</strong> L'existence des hypertrucages a un effet pervers : une personnalité prise en flagrant délit sur une vraie vidéo peut prétendre qu'il s'agit d'un trucage. Quand tout peut être faux, on finit par douter de tout, y compris du vrai. C'est pourquoi la vérification du <strong>contexte</strong> et des <strong>sources</strong> devient essentielle.</aside>
<p>Les hypertrucages ont aussi des victimes directes : harcèlement, en particulier au moyen de fausses images à caractère sexuel visant très majoritairement des femmes et des adolescentes, usurpation d'identité, arnaques. Ce sont des infractions graves.</p>` },
      { t: "quiz", titre: "Le dividende du menteur", intro: "Une vraie vidéo montre un élu en train d'insulter un journaliste. L'élu déclare : « C'est un deepfake fabriqué par mes adversaires. »",
        questions: [
          { q: "Pourquoi cette défense est-elle rendue possible par l'existence des hypertrucages ?", choix: ["Parce que toutes les vidéos sont désormais fausses.", "Parce que l'on sait qu'il est facile de fabriquer de fausses vidéos : n'importe quelle vidéo compromettante peut être contestée.", "Parce que la loi interdit de filmer les élus."], bon: 1, expl: "Le doute profite au menteur." },
          { q: "Comment des journalistes pourraient-ils établir que la vidéo est authentique ?", choix: ["En demandant son avis à l'élu.", "En retrouvant le fichier original et les témoins, et en recoupant avec d'autres enregistrements de la scène.", "En comptant les partages."], bon: 1, expl: "Ils peuvent aussi analyser les métadonnées et la chaîne de diffusion." },
        ] },
      { t: "lecon", titre: "Repérer un contenu généré",
        texte: `<p><strong>Les indices visuels et sonores</strong> sont utiles, mais de moins en moins fiables à mesure que les outils progressent :</p>
<ul><li><strong>les mains et les détails</strong> : doigts en trop ou fusionnés, bijoux ou lunettes asymétriques, dents irrégulières ;</li><li><strong>les textes</strong> dans l'image : lettres déformées, mots qui n'existent pas sur les panneaux ;</li><li><strong>la lumière</strong> : ombres incohérentes, reflets absents dans les yeux ou les vitres ;</li><li><strong>l'arrière-plan</strong> : objets fondus les uns dans les autres, foule aux visages flous ou répétés ;</li><li><strong>en vidéo</strong> : clignements des yeux rares, lèvres mal synchronisées, contours du visage qui « bougent » ;</li><li><strong>en audio</strong> : voix monotone, respiration absente, sons de fond incohérents.</li></ul>
<p><strong>Les vérifications de contexte</strong> sont plus sûres :</p>
<ol class="phases"><li><strong>Source</strong> qui publie ? Le compte est-il authentique, ancien, connu ?</li><li><strong>Origine</strong> recherche d'image inversée : où et quand l'image est-elle apparue la première fois ?</li><li><strong>Recoupement</strong> des médias fiables en parlent-ils ? Une cellule de vérification l'a-t-elle analysée ?</li><li><strong>Plausibilité</strong> l'événement est-il cohérent avec ce que l'on sait par ailleurs ?</li></ol>
<p>Une <strong>recherche d'image inversée</strong> consiste à soumettre une image à un moteur de recherche pour retrouver les pages où elle (ou une image semblable) apparaît. On peut ainsi découvrir qu'une photo « d'actualité » date de plusieurs années, a été prise ailleurs, ou a déjà été démentie.</p>
<aside class="savoir"><strong>Marquage et filigranes.</strong> Des entreprises et des médias développent des systèmes pour indiquer l'origine d'un contenu : filigranes invisibles insérés dans les images générées, « certificats de contenu » qui retracent l'histoire d'une photo. Ces dispositifs sont utiles, mais ils ne couvrent pas tous les outils et peuvent parfois être retirés : ils complètent l'esprit critique sans le remplacer.</aside>` },
      { t: "tri", titre: "Indice ou vérification ?", q: "Chaque geste relève-t-il des indices visuels et sonores, ou des vérifications de contexte ?", categories: ["Indice visuel ou sonore", "Vérification de contexte"],
        items: [
          { txt: "Compter les doigts d'une main sur la photo.", cat: 0, expl: "Un détail de l'image." },
          { txt: "Chercher qui a publié l'image en premier.", cat: 1, expl: "On vérifie la source." },
          { txt: "Lire les inscriptions d'un panneau à l'arrière-plan.", cat: 0, expl: "Les lettres déformées trahissent souvent une image générée." },
          { txt: "Faire une recherche d'image inversée.", cat: 1, expl: "On remonte à l'origine." },
          { txt: "Écouter si la voix respire entre les phrases.", cat: 0, expl: "Un indice sonore." },
          { txt: "Chercher si un média fiable a analysé le contenu.", cat: 1, expl: "On recoupe." },
        ] },
      { t: "quiz", titre: "Les indices", intro: "Une photo virale montre un célèbre footballeur tenant une pancarte de soutien à un parti politique. De près, on remarque six doigts à la main gauche, des lettres illisibles sur la pancarte, et aucune ombre sous les pieds des personnes.",
        questions: [
          { q: "Que peut-on en conclure ?", choix: ["L'image est authentique.", "L'image est très probablement générée ou truquée.", "On ne peut rien dire."], bon: 1, expl: "Trois indices visuels concordants." },
          { q: "Ces indices suffiraient-ils si l'image avait été parfaitement réalisée ?", choix: ["Oui, il y a toujours un défaut visible.", "Non : il faudrait vérifier qui a publié en premier, faire une recherche d'image inversée et chercher si des médias fiables ou le joueur en parlent."], bon: 1, expl: "Un contenu bien réalisé peut ne présenter aucun défaut visible. On se demande aussi si la scène est plausible." },
        ] },
      { t: "tri", titre: "Évaluer un risque", q: "Évalue le risque de désinformation, en tenant compte de l'auteur, de la diffusion et des conséquences possibles.", categories: ["Faible", "Moyen à élevé", "Élevé"],
        items: [
          { txt: "Une image générée d'un chat astronaute, publiée par un compte d'art numérique qui indique « image créée par IA ».", cat: 0, expl: "L'image est déclarée comme générée et ne prétend représenter aucun fait réel." },
          { txt: "Un faux enregistrement audio d'un candidat tenant des propos racistes, diffusé la veille d'une élection.", cat: 2, expl: "Aucun temps pour démentir, et le résultat du vote peut changer ; c'est aussi une atteinte grave à une personne." },
          { txt: "Une fausse photo d'inondation dans ta ville, partagée dans un groupe de messagerie de quartier.", cat: 1, expl: "Un groupe de quartier diffuse vite ; l'information peut provoquer une panique ou des déplacements dangereux. On vérifie auprès de la mairie ou des secours." },
        ] },
      { t: "quiz", titre: "L'arnaque à la voix", intro: "Le père de Mathis reçoit un appel. Il entend la voix de son fils, paniquée : « Papa, j'ai perdu mon téléphone et mon portefeuille, envoie vite 300 € sur ce compte, c'est urgent ! »",
        questions: [
          { q: "Quelle technique a probablement été utilisée ?", choix: ["La recherche d'image inversée.", "Le clonage vocal, à partir de vidéos publiées par Mathis ou d'un appel précédent.", "Un filigrane."], bon: 1, expl: "Quelques secondes d'enregistrement suffisent." },
          { q: "Quels éléments de l'appel doivent alerter ?", choix: ["L'urgence, la demande d'argent, le compte inhabituel et l'impossibilité supposée de joindre Mathis autrement.", "Le fait que Mathis dise « Papa ».", "L'heure de l'appel."], bon: 0, expl: "L'urgence empêche de réfléchir : c'est le but." },
          { q: "Quel réflexe protège le mieux ?", choix: ["Envoyer la moitié de la somme.", "Raccrocher et rappeler Mathis sur son numéro habituel ; convenir en famille d'un mot de passe secret.", "Demander à la voix de répéter."], bon: 1, expl: "On peut aussi limiter les vidéos publiques où l'on parle longuement." },
        ] },
      { t: "lecon", titre: "Ce que dit la loi, et que faire",
        texte: `<p><strong>En Europe</strong>, le règlement sur l'IA impose des obligations de <strong>transparence</strong>, applicables à partir d'août 2026 : les personnes doivent être informées qu'elles échangent avec une IA, les contenus générés doivent porter un marquage détectable par machine, et les hypertrucages doivent être signalés comme tels par ceux qui les diffusent.</p>
<p><strong>En France</strong>, publier sans son consentement un montage réalisé à partir de l'image ou des paroles d'une personne, sans qu'il soit évident qu'il s'agit d'un montage, est un délit. La loi de 2024 visant à sécuriser et réguler l'espace numérique a étendu cette infraction aux contenus générés par IA et prévu des peines aggravées pour les hypertrucages à caractère sexuel. Le harcèlement, l'escroquerie ou la diffusion de fausses nouvelles peuvent également être poursuivis.</p>
<aside class="retenir"><strong>Face à un contenu douteux</strong><br><strong>Je ne partage pas</strong> un contenu dont je ne suis pas sûr : partager, même pour le dénoncer, aide à le diffuser.<br><strong>Je vérifie</strong> la source, l'origine et le contexte.<br><strong>Je signale</strong> le contenu à la plateforme ; s'il est illicite (harcèlement, images sexuelles truquées, arnaque, menace), je le signale aussi sur <strong>Pharos</strong> (internet-signalement.gouv.fr).<br><strong>Si j'en suis victime</strong>, je garde des preuves (captures d'écran, liens), j'en parle à un adulte de confiance et je peux appeler le <strong>3018</strong>, numéro national gratuit contre les violences numériques pour les jeunes.</aside>` },
      { t: "quiz", titre: "Que faire ?", intro: "Dans le groupe de discussion de la classe circule une image truquée, humiliante, représentant une élève de seconde.",
        questions: [
          { q: "Qui peut engager sa responsabilité ?", choix: ["Personne : ce n'est qu'une image.", "Seulement la personne qui a fabriqué l'image.", "La personne qui a fabriqué et diffusé l'image, mais aussi ceux qui la relaient."], bon: 2, expl: "Un montage diffusé sans consentement est un délit, et il peut s'agir de harcèlement. Les peines sont aggravées pour une image à caractère sexuel, et plus encore quand la victime est mineure." },
          { q: "Que doivent faire les élèves qui reçoivent l'image ?", choix: ["La transférer à un ami pour avoir son avis.", "Ne ni la transférer ni la commenter, la signaler, et prévenir un adulte de l'établissement.", "Répondre par une plaisanterie."], bon: 1, expl: "Chaque transfert étend la diffusion." },
          { q: "Que peut faire la victime ?", choix: ["Effacer la conversation et attendre que cela passe.", "Garder des preuves, en parler à un adulte de confiance, appeler le 3018, signaler sur Pharos ; elle peut porter plainte avec ses parents.", "Quitter le lycée."], bon: 1, expl: "Les captures d'écran et les liens servent de preuves." },
          { q: "Pourquoi « juste transférer » l'image n'est-il pas un acte anodin ?", choix: ["Parce que chaque transfert multiplie l'humiliation de la victime : relayer, c'est participer au harcèlement, et c'est puni par la loi.", "Parce que cela consomme des données mobiles.", "Parce que l'image perd en qualité."], bon: 0, expl: "Relayer, c'est diffuser." },
        ] },
      { t: "ordre", texte: true, titre: "Enquête sur une image", q: "Range dans l'ordre les étapes d'une enquête sur une image douteuse.",
        lignes: ["J'observe l'image à la recherche d'indices visuels.", "Je fais une recherche d'image inversée.", "Je note la date et le site de la plus ancienne publication.", "Je cherche si un média ou une cellule de vérification l'a déjà analysée.", "Je rédige ma conclusion : verdict, degré de certitude, preuves."],
        expl: "Une bonne conclusion distingue ce qui est établi de ce qui est supposé." },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Un hypertrucage (deepfake) est…", choix: ["un virus informatique.", "un réseau social.", "un contenu créé ou modifié par IA pour faire croire à quelque chose de faux.", "un filtre photo qui rend la peau lisse."], bon: 2, expl: "Image, son ou vidéo." },
          { q: "La désinformation se distingue de la mésinformation par…", choix: ["la langue utilisée.", "l'intention de tromper.", "la longueur du message.", "le support (image ou texte)."], bon: 1, expl: "La désinformation est volontaire." },
          { q: "Le clonage vocal permet…", choix: ["de traduire un texte.", "de couper le son d'une vidéo.", "d'enregistrer une conversation.", "d'imiter la voix d'une personne à partir de quelques enregistrements."], bon: 3, expl: "Quelques secondes suffisent." },
          { q: "Une recherche d'image inversée permet de…", choix: ["retrouver où et quand une image a déjà été publiée.", "retourner une image à l'envers.", "supprimer une image d'Internet.", "améliorer la qualité d'une image."], bon: 0, expl: "On remonte à l'origine de l'image." },
          { q: "Lequel de ces indices peut signaler une image générée ?", choix: ["Une image en noir et blanc.", "Une photo prise de nuit.", "Une image de petite taille.", "Des lettres déformées sur un panneau."], bon: 3, expl: "Comme les doigts en trop ou les ombres incohérentes." },
          { q: "Le « dividende du menteur » désigne le fait que…", choix: ["les menteurs gagnent de l'argent grâce à l'IA.", "les deepfakes sont rémunérés.", "l'on peut faire passer un contenu vrai pour un trucage.", "les IA mentent pour gagner des points."], bon: 2, expl: "Quand tout peut être faux, on doute aussi du vrai." },
          { q: "En Europe, le règlement sur l'IA impose que les hypertrucages…", choix: ["soient signalés comme tels par ceux qui les diffusent.", "soient interdits dans tous les cas.", "soient réservés aux journalistes.", "soient payants."], bon: 0, expl: "C'est une obligation de transparence." },
          { q: "Face à une image choquante dont on n'est pas sûr, le bon réflexe est de…", choix: ["la partager pour prévenir tout le monde.", "ne pas la partager et vérifier sa source.", "la modifier.", "l'imprimer."], bon: 1, expl: "Partager, même pour dénoncer, aide à diffuser." },
          { q: "Pharos est…", choix: ["un logiciel de retouche.", "un réseau social.", "un générateur d'images.", "la plateforme officielle de signalement des contenus illicites en ligne."], bon: 3, expl: "internet-signalement.gouv.fr" },
          { q: "Le 3018 est…", choix: ["le numéro de la météo.", "un numéro gratuit d'aide contre les violences numériques pour les jeunes.", "un modèle de langage.", "un code postal."], bon: 1, expl: "Un numéro national gratuit." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Désinformation</strong> : diffusion volontaire d'informations fausses. <strong>Mésinformation</strong> : diffusion sans intention de tromper.</p>
<p><strong>Hypertrucage.</strong> Image, son ou vidéo créé ou modifié par IA pour faire croire à quelque chose de faux : images générées, vidéos truquées, clonage vocal, textes en masse.</p>
<p><strong>Ce qui change.</strong> Rapide, accessible à tous, réaliste, viral. <strong>Dividende du menteur</strong> : un contenu vrai peut être présenté comme un trucage.</p>
<p><strong>Repérer.</strong> Les indices visuels et sonores aident, mais les vérifications de contexte sont plus sûres : <strong>source</strong>, <strong>origine</strong> (recherche d'image inversée), <strong>recoupement</strong>, <strong>plausibilité</strong>.</p>
<p><strong>La loi.</strong> Transparence imposée par le règlement européen ; en France, le montage sans consentement est un délit, aggravé pour les contenus à caractère sexuel.</p>
<p><strong>Les réflexes.</strong> Je ne partage pas, je vérifie, je signale (plateforme, Pharos) ; victime, je garde des preuves, j'en parle, j'appelle le 3018.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>distinguer désinformation et mésinformation</li><li>définir un hypertrucage et citer ses formes</li><li>repérer des indices visuels et sonores</li><li>mener les quatre vérifications de contexte</li><li>réagir face à un contenu douteux ou illicite</li></ul>` },
    ] },
    { id: "c10", num: 10, titre: "Vie privée et données personnelles", resume: "Données sensibles, inférences, RGPD, droits et bons réflexes",
    etapes: [
      { t: "quiz", titre: "Quelles données est-ce que je donne aux IA ?", intro: "Sofia, 15 ans, discute avec un assistant conversationnel grand public.",
        doc: `<blockquote class="recit"><strong>Sofia :</strong> Salut ! Je m'appelle Sofia Martin, je suis en 2de4 au lycée des Tilleuls. Tu peux m'aider à écrire un message pour ma prof principale ? Je n'étais pas là mardi parce que j'avais rendez-vous chez le psychologue pour mes crises d'angoisse.<br><strong>Assistant :</strong> Bien sûr ! Voici une proposition de message…<br><strong>Sofia :</strong> Merci. Et pour le week-end, on fait une fête chez moi, 12 rue des Lilas, mes parents sont absents. Écris une invitation sympa. Je te mets la photo de la maison pour l'illustrer.</blockquote>`,
        questions: [
          { q: "Quelles informations sont les plus sensibles ?", choix: ["Son prénom et sa classe.", "Ses données de santé, et son adresse combinée à l'absence de ses parents et à la photo de la maison.", "Le jour de son absence."], bon: 1, expl: "Les données de santé sont sensibles au sens du RGPD ; l'adresse, l'absence des parents et la photo posent un problème de sécurité." },
          { q: "Lesquelles étaient vraiment nécessaires pour obtenir l'aide demandée ?", choix: ["Toutes.", "Son nom et son lycée.", "Aucune."], bon: 2, expl: "« Je suis élève de seconde, j'étais absente pour un rendez-vous médical » suffisait ; l'invitation pouvait s'écrire sans adresse ni photo." },
          { q: "Que peut devenir cette conversation une fois envoyée ?", choix: ["Elle disparaît aussitôt.", "Elle peut être conservée, relue, utilisée pour entraîner des modèles selon les réglages, exposée en cas de fuite.", "Elle est envoyée à son lycée."], bon: 1, expl: "Une conversation avec un assistant n'est pas un journal intime." },
        ] },
      { t: "lecon", titre: "Données personnelles et données sensibles",
        texte: `<p>Une <strong>donnée personnelle</strong> est toute information se rapportant à une personne physique identifiée ou identifiable, <strong>directement</strong> (nom, photo du visage) ou <strong>indirectement</strong> (numéro de téléphone, adresse IP, plaque d'immatriculation, ou la combinaison de plusieurs informations : date de naissance, commune et lycée).</p>
<p>Certaines données personnelles sont dites <strong>sensibles</strong> : origine, opinions politiques, convictions religieuses, appartenance syndicale, données de santé, données génétiques et biométriques, vie et orientation sexuelles. Leur traitement est en principe interdit, sauf exceptions strictement encadrées.</p>` },
      { t: "tri", titre: "Personnelle, sensible, ou non ?", q: "Classe chaque information.", categories: ["Personnelle ordinaire", "Personnelle sensible", "Non personnelle"],
        items: [
          { txt: "Ton adresse électronique.", cat: 0, expl: "Elle se rapporte à une personne identifiable." },
          { txt: "La température moyenne à Limoges en juillet.", cat: 2, expl: "Elle ne concerne aucune personne." },
          { txt: "Ton groupe sanguin.", cat: 1, expl: "Une donnée de santé." },
          { txt: "Ta religion.", cat: 1, expl: "Les convictions religieuses sont des données sensibles." },
          { txt: "Le nombre d'élèves de seconde en France.", cat: 2, expl: "Une statistique, qui n'identifie personne." },
          { txt: "L'adresse IP de ton ordinateur.", cat: 0, expl: "Elle identifie indirectement." },
          { txt: "Ton empreinte digitale.", cat: 1, expl: "Une donnée biométrique." },
        ] },
      { t: "lecon", titre: "Données et IA : où est le risque ?",
        texte: `<ul><li><strong>À l'entraînement</strong> : de grands modèles ont été entraînés sur des textes et des images collectés en masse sur Internet, y compris des données personnelles publiées par les internautes.</li><li><strong>À l'utilisation</strong> : les conversations avec un assistant peuvent être conservées et, selon les services et les réglages, relues ou utilisées pour améliorer les modèles.</li><li><strong>Par inférence</strong> : une IA peut <strong>déduire</strong> des informations que l'on n'a jamais données.</li></ul>
<p>Une <strong>inférence</strong> est une information déduite par un système à partir d'autres données. Les habitudes d'achat peuvent révéler une grossesse, les « j'aime » sur un réseau social peuvent permettre de deviner des opinions politiques, les trajets enregistrés par un téléphone révèlent le domicile, le lieu d'études, les lieux de culte ou les consultations médicales.</p>
<aside class="savoir"><strong>Une amende record pour la reconnaissance faciale.</strong> En 2022, la CNIL a infligé une amende de 20 millions d'euros à l'entreprise Clearview AI, qui avait constitué une base de plusieurs milliards de photos de visages collectées sur Internet, sans le consentement des personnes. En 2019, la CNIL avait aussi estimé que des dispositifs de reconnaissance faciale à l'entrée de deux lycées n'étaient pas conformes au RGPD.</aside>` },
      { t: "quiz", titre: "Ce que l'IA devine", intro: "Une application de musique enregistre les morceaux écoutés, les heures d'écoute, la localisation du téléphone et la vitesse de déplacement pendant l'écoute.",
        questions: [
          { q: "Que pourrait-elle déduire sans que l'utilisateur l'ait jamais dit ?", choix: ["Son domicile et son lieu d'études, ses horaires de sommeil, son moyen de transport.", "Son numéro de carte bancaire.", "Rien de plus que ses goûts musicaux."], bon: 0, expl: "Les positions récurrentes la nuit et en journée, les heures d'écoute, la vitesse ; le type de musique peut même trahir l'humeur." },
          { q: "Ces déductions sont-elles des données personnelles ?", choix: ["Non, puisque l'utilisateur ne les a pas données.", "Oui : elles se rapportent à une personne identifiable."], bon: 1, expl: "Les inférences sont elles aussi des données personnelles." },
          { q: "Où est le problème, si chaque donnée collectée paraît anodine ?", choix: ["Leur croisement révèle des informations intimes que l'utilisateur n'a jamais accepté de donner.", "Elles prennent de la place sur le téléphone.", "Il n'y en a pas."], bon: 0, expl: "Ces informations peuvent servir à le cibler, ou être exposées en cas de fuite." },
        ] },
      { t: "quiz", titre: "Identifiable sans son nom", intro: "Une salle de sport publie un jeu de données « anonyme » : pour chaque adhérent, la date de naissance, le code postal, le sexe et les horaires de passage.",
        questions: [
          { q: "Pourquoi ces données ne sont-elles pas vraiment anonymes ?", choix: ["Parce que le croisement de la date de naissance, du code postal et du sexe ne désigne souvent qu'une seule personne.", "Parce que les horaires sont faux.", "Parce que le fichier est public."], bon: 0, expl: "Peu de personnes partagent à la fois le même jour de naissance, le même code postal et le même sexe. Une chercheuse américaine l'a montré à la fin des années 1990 pour une grande majorité des habitants des États-Unis." },
          { q: "Quelle modification réduit ce risque ?", choix: ["Ajouter le prénom.", "Ne garder que la tranche d'âge, regrouper les codes postaux par département, regrouper les horaires par tranches.", "Publier le fichier en couleur."], bon: 1, expl: "Moins la combinaison est précise, moins elle est unique." },
        ] },
      { t: "lecon", titre: "Le RGPD, une protection européenne",
        texte: `<p>Le <strong>Règlement général sur la protection des données</strong> (RGPD), applicable depuis mai 2018, encadre l'utilisation des données personnelles dans toute l'Union européenne, y compris par les entreprises étrangères qui s'adressent aux Européens. En France, son application est contrôlée par la <strong>CNIL</strong> (Commission nationale de l'informatique et des libertés).</p>
<table class="donnees large"><thead><tr><th>Principe</th><th>Ce que cela veut dire</th></tr></thead><tbody>
<tr><th>Base légale</th><td>Un traitement doit avoir une justification : le consentement de la personne, un contrat, une obligation légale…</td></tr>
<tr><th>Finalité</th><td>Les données sont collectées pour un but précis, annoncé à l'avance, et ne peuvent pas être réutilisées pour un tout autre but.</td></tr>
<tr><th>Minimisation</th><td>On ne collecte que les données <strong>strictement nécessaires</strong> à ce but.</td></tr>
<tr><th>Durée limitée</th><td>Les données ne sont pas conservées indéfiniment.</td></tr>
<tr><th>Sécurité</th><td>Les données doivent être protégées contre les fuites et les piratages.</td></tr>
<tr><th>Transparence</th><td>Les personnes doivent être informées, de façon claire, de l'utilisation de leurs données.</td></tr></tbody></table>
<aside class="retenir"><strong>Mes droits.</strong> <strong>Accès</strong> : savoir quelles données une organisation détient sur moi, et en obtenir une copie. <strong>Rectification</strong> : faire corriger des données inexactes. <strong>Effacement</strong> : obtenir leur suppression dans certains cas. <strong>Opposition</strong> : refuser certaines utilisations, comme la publicité ciblée. Et le droit de ne pas faire l'objet d'une décision <strong>entièrement automatisée</strong> produisant des effets importants. En cas de refus, on peut déposer une plainte auprès de la CNIL. L'amende peut aller jusqu'à 20 millions d'euros ou 4 % du chiffre d'affaires mondial.</aside>
<aside class="savoir"><strong>Et les mineurs ?</strong> En France, un mineur peut consentir seul au traitement de ses données par un service en ligne à partir de <strong>15 ans</strong>. En dessous, l'accord conjoint d'un parent est nécessaire. Beaucoup d'assistants fixent par ailleurs un âge minimal dans leurs conditions d'utilisation : il faut le vérifier.</aside>` },
      { t: "tri", titre: "Quel principe ?", q: "Chaque situation ne respecte pas un principe du RGPD. Lequel ?", categories: ["Finalité", "Minimisation", "Durée limitée", "Transparence"],
        items: [
          { txt: "Une application de révision collecte la position géographique et la liste de contacts.", cat: 1, expl: "Ces données ne sont pas nécessaires pour réviser." },
          { txt: "« Vos données sont conservées aussi longtemps que nécessaire. »", cat: 2, expl: "La durée n'est pas précisée." },
          { txt: "Des notes saisies pour réviser sont revendues à des partenaires pour de la publicité.", cat: 0, expl: "Les données sont réutilisées pour un tout autre but." },
          { txt: "Une politique de confidentialité de quarante pages, incompréhensible.", cat: 3, expl: "L'information doit être claire." },
        ] },
      { t: "quiz", titre: "Lire une politique de confidentialité", intro: "Voici un extrait de la politique de confidentialité d'une application de révision fictive, RéviIA.",
        doc: `<blockquote class="recit"><strong>1. Données collectées.</strong> Nous collectons vos nom, prénom, date de naissance, adresse électronique, établissement scolaire, notes que vous saisissez, conversations avec notre assistant, ainsi que votre position géographique et votre liste de contacts afin d'améliorer votre expérience.<br><strong>2. Utilisation.</strong> Vos conversations peuvent être utilisées pour entraîner nos modèles et sont accessibles à nos équipes. Vos données peuvent être partagées avec nos partenaires commerciaux à des fins publicitaires.<br><strong>3. Conservation.</strong> Vos données sont conservées aussi longtemps que nécessaire.<br><strong>4. Âge.</strong> Le service est ouvert à partir de 13 ans. En utilisant l'application, vous acceptez l'ensemble de ces conditions.</blockquote>`,
        questions: [
          { q: "Quelles données ne sont pas nécessaires à une application de révision ?", choix: ["L'adresse électronique.", "La position géographique, la liste de contacts et la date de naissance complète.", "Les notes saisies."], bon: 1, expl: "Le principe en jeu est la minimisation." },
          { q: "Quelle formulation est floue ?", choix: ["« Le service est ouvert à partir de 13 ans. »", "« Afin d'améliorer votre expérience » : la finalité est vague.", "« Nous collectons vos nom, prénom ». "], bon: 1, expl: "De même « partenaires commerciaux » (destinataires non identifiés) et « accessibles à nos équipes » (qui, et pourquoi ?)." },
          { q: "« En utilisant l'application, vous acceptez l'ensemble de ces conditions. » Est-ce un consentement valable pour la publicité ?", choix: ["Oui, l'utilisateur est prévenu.", "Non : le consentement doit être libre, spécifique, éclairé et donné par un acte positif clair."], bon: 1, expl: "Une acceptation globale, imposée pour utiliser le service, ne vaut pas consentement à la publicité." },
          { q: "Un élève de 14 ans peut-il s'inscrire seul en France ?", choix: ["Oui, l'application l'autorise dès 13 ans.", "Non : en dessous de 15 ans, l'accord d'un parent est nécessaire."], bon: 1, expl: "L'âge annoncé par l'application ne change pas la règle française." },
        ] },
      { t: "quiz", titre: "La reconnaissance faciale au lycée", intro: "Un lycée envisage d'installer à l'entrée un portique de reconnaissance faciale pour contrôler l'accès des élèves.",
        questions: [
          { q: "Quel type de donnée ce dispositif traite-t-il ?", choix: ["Des données non personnelles.", "Des données biométriques : des données sensibles, dont le traitement est en principe interdit.", "Des données personnelles ordinaires."], bon: 1, expl: "Elles permettent d'identifier une personne par son visage." },
          { q: "Pourquoi la CNIL a-t-elle jugé ce type de dispositif non conforme en 2019 ?", choix: ["Parce que les portiques coûtent trop cher.", "Parce que le but peut être atteint par des moyens beaucoup moins intrusifs : le dispositif n'est pas strictement nécessaire.", "Parce que les lycéens sont trop nombreux."], bon: 1, expl: "Traiter les visages de tous les élèves, en majorité mineurs, est disproportionné." },
          { q: "Quel dispositif moins intrusif atteint le même objectif ?", choix: ["Un badge ou une carte de lycéen, contrôlé par un surveillant.", "Un relevé d'empreintes digitales.", "Une caméra dans chaque salle."], bon: 0, expl: "C'est le principe de minimisation." },
        ] },
      { t: "lecon", titre: "Les bons réflexes",
        texte: `<ul><li><strong>Minimiser</strong> : ne pas confier à une IA son nom complet, son adresse, des informations de santé, des photos de soi ou d'autres personnes, ni des informations sur ses proches.</li><li><strong>Anonymiser</strong> : remplacer les noms par des initiales ou des rôles (« mon professeur », « une amie »).</li><li><strong>Régler</strong> : désactiver, quand c'est possible, l'utilisation des conversations pour l'entraînement ; supprimer régulièrement l'historique.</li><li><strong>Se renseigner</strong> : lire au moins le résumé de la politique de confidentialité ; privilégier les outils proposés par l'établissement.</li><li><strong>Respecter les autres</strong> : ne jamais soumettre à une IA la photo, la voix ou les informations d'une autre personne sans son accord.</li></ul>
<p><strong>À faire en classe.</strong> Avec l'outil d'IA autorisé par ton établissement, cherche les réglages de confidentialité : l'âge minimal, la conservation de l'historique, l'usage des conversations pour l'entraînement, l'endroit où se trouve la politique de confidentialité, la façon d'exercer son droit d'accès ou d'effacement.</p>` },
      { t: "quiz", titre: "Exercer ses droits", intro: "Lucie a utilisé pendant un an une application de devoirs avec IA. Elle veut savoir quelles données l'éditeur a conservées sur elle, puis les faire supprimer.",
        questions: [
          { q: "Quels droits doit-elle exercer ?", choix: ["Le droit d'opposition, puis de rectification.", "Le droit d'accès, puis le droit à l'effacement.", "Le droit d'auteur."], bon: 1, expl: "Savoir, puis faire supprimer." },
          { q: "Quel message convient ?", choix: ["« Supprimez tout, merci. »", "« En application du RGPD, je vous demande de m'indiquer l'ensemble des données personnelles que vous détenez à mon sujet, de m'en transmettre une copie, puis de les supprimer. Mon compte est associé à l'adresse [adresse]. »", "« Je vais porter plainte. »"], bon: 1, expl: "Le règlement prévoit un délai de réponse d'un mois." },
          { q: "Que peut-elle faire si l'éditeur ne répond pas ?", choix: ["Rien.", "Relancer, puis déposer une plainte auprès de la CNIL.", "Créer un nouveau compte."], bon: 1, expl: "Avec l'aide de ses parents si elle a moins de 15 ans." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Une donnée personnelle est une information…", choix: ["qui concerne uniquement le nom d'une personne.", "stockée sur un téléphone.", "publiée sur un réseau social.", "se rapportant à une personne identifiée ou identifiable."], bon: 3, expl: "Directement ou indirectement." },
          { q: "Laquelle de ces données est sensible au sens du RGPD ?", choix: ["Une adresse électronique.", "Une information sur la santé.", "Un numéro de téléphone.", "Un prénom."], bon: 1, expl: "Comme l'origine, les opinions ou les données biométriques." },
          { q: "Le principe de minimisation signifie…", choix: ["réduire la taille des fichiers.", "supprimer toutes les données chaque jour.", "ne collecter que les données strictement nécessaires.", "afficher les données en petit."], bon: 2, expl: "Nécessaires au but annoncé." },
          { q: "En France, un mineur peut consentir seul au traitement de ses données par un service en ligne à partir de…", choix: ["15 ans.", "11 ans.", "13 ans.", "18 ans."], bon: 0, expl: "En dessous, l'accord d'un parent est nécessaire." },
          { q: "Une inférence, c'est…", choix: ["une donnée volée.", "un mot de passe.", "une information déduite à partir d'autres données.", "une erreur de calcul."], bon: 2, expl: "Par exemple le domicile, déduit des trajets." },
          { q: "Le droit d'accès permet…", choix: ["de savoir quelles données une organisation détient sur soi.", "d'accéder aux comptes des autres.", "d'entrer dans les locaux d'une entreprise.", "d'utiliser gratuitement un service."], bon: 0, expl: "Et d'en obtenir une copie." },
          { q: "En France, la CNIL est…", choix: ["un réseau social.", "un logiciel d'IA.", "un tribunal pénal.", "l'autorité qui veille à la protection des données personnelles."], bon: 3, expl: "On peut y déposer une plainte." },
          { q: "Pour demander de l'aide à une IA sur un message à un professeur, le meilleur réflexe est…", choix: ["de donner son nom complet et son adresse.", "de remplacer les noms par des rôles et de n'indiquer que le nécessaire.", "d'ajouter une photo de sa classe.", "de copier tous ses échanges avec le professeur."], bon: 1, expl: "Minimiser et anonymiser." },
          { q: "Combiner date de naissance, code postal et sexe…", choix: ["ne permet jamais d'identifier quelqu'un.", "est interdit.", "peut suffire à identifier une personne.", "crée une donnée sensible."], bon: 2, expl: "La combinaison est presque toujours unique." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Donnée personnelle.</strong> Information se rapportant à une personne identifiée ou identifiable, directement ou indirectement. <strong>Données sensibles</strong> : santé, origine, opinions, religion, biométrie…</p>
<p><strong>Trois risques avec l'IA.</strong> À l'entraînement, à l'utilisation (conversations conservées), par <strong>inférence</strong> (informations déduites).</p>
<p><strong>RGPD.</strong> Base légale, finalité, <strong>minimisation</strong>, durée limitée, sécurité, transparence. Contrôlé en France par la <strong>CNIL</strong>.</p>
<p><strong>Mes droits.</strong> Accès, rectification, effacement, opposition ; pas de décision entièrement automatisée aux effets importants. Consentement seul à partir de 15 ans.</p>
<p><strong>Mes réflexes.</strong> Minimiser, anonymiser, régler, se renseigner, respecter les autres.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>reconnaître une donnée personnelle et une donnée sensible</li><li>expliquer ce qu'est une inférence</li><li>citer les principes du RGPD</li><li>exercer mes droits</li><li>appliquer les bons réflexes avec une IA</li></ul>` },
    ] },
    { id: "c11", num: 11, titre: "Responsabilité et cadre juridique", resume: "Qui répond d'une IA, règlement européen, droits et droit d'auteur",
    etapes: [
      { t: "quiz", titre: "Qui est responsable si une IA se trompe ?", intro: "Une décision de justice canadienne, 2024.",
        doc: `<blockquote class="recit">Après le décès de sa grand-mère, un passager consulte l'assistant conversationnel du site d'Air Canada. Celui-ci lui affirme qu'il peut acheter un billet au plein tarif, puis demander après son voyage un remboursement partiel grâce à un « tarif deuil ». Le passager suit ce conseil. Mais la compagnie refuse de le rembourser : sa véritable règle ne permet pas de demander ce tarif après le voyage. Devant le tribunal, la compagnie soutient que l'assistant est une entité distincte, responsable de ses propres actes. En février 2024, le tribunal rejette cet argument et condamne la compagnie à indemniser le passager, environ 800 dollars canadiens.</blockquote>`,
        questions: [
          { q: "Pourquoi le tribunal refuse-t-il de considérer l'assistant comme responsable ?", choix: ["Parce que l'assistant n'est qu'un outil : la compagnie est responsable de toutes les informations publiées sur son site.", "Parce que l'assistant était en panne.", "Parce que le passager avait mal lu."], bon: 0, expl: "Que l'information vienne d'une page statique ou d'un assistant conversationnel." },
          { q: "Le tribunal donne-t-il tort au passager de ne pas avoir vérifié ?", choix: ["Oui.", "Non : il n'avait aucune raison de se méfier d'une information donnée par le site officiel de la compagnie."], bon: 1, expl: "Le site officiel fait foi aux yeux du client." },
          { q: "Quelle leçon pour les entreprises ?", choix: ["Un assistant conversationnel les dégage de toute responsabilité.", "Elles répondent de ce que dit leur assistant : elles doivent le tester, limiter son champ et vérifier qu'il s'appuie sur les vraies règles.", "Elles doivent supprimer leur site."], bon: 1, expl: "Et indiquer clairement les informations qui font foi." },
        ] },
      { t: "quiz", titre: "Un cas plus grave", intro: "En mars 2018, à Tempe, aux États-Unis, une voiture autonome en test de l'entreprise Uber percute et tue une piétonne qui traversait de nuit en poussant son vélo. Le logiciel avait détecté la piétonne quelques secondes avant le choc, mais sans la classer correctement, et le freinage d'urgence automatique avait été désactivé. La conductrice de sécurité, chargée de surveiller la route, regardait une vidéo sur son téléphone.",
        questions: [
          { q: "Que peut-on reprocher à l'entreprise ?", choix: ["Rien : la voiture conduisait seule.", "Un logiciel qui classait mal la piétonne, la désactivation du freinage d'urgence automatique et une organisation de la sécurité insuffisante.", "D'avoir roulé de nuit."], bon: 1, expl: "Ce sont des choix de conception et de sécurité." },
          { q: "Et à la conductrice de sécurité ?", choix: ["Son inattention.", "D'avoir freiné trop tard.", "Rien."], bon: 0, expl: "Elle était chargée de surveiller la route." },
          { q: "Quelles ont été les suites ?", choix: ["La voiture a été condamnée.", "La conductrice a été condamnée en 2023 à une mise à l'épreuve ; l'entreprise n'a pas été poursuivie pénalement, mais l'enquête a aussi pointé ses choix.", "Personne n'a été inquiété."], bon: 1, expl: "Le cas illustre une responsabilité partagée, et le débat sur la place de l'humain chargé de surveiller une machine." },
        ] },
      { t: "lecon", titre: "Une IA n'est pas une personne",
        texte: `<aside class="retenir">En droit, seules les <strong>personnes</strong> peuvent être responsables : les personnes physiques (les êtres humains) et les personnes morales (entreprises, associations, administrations). Une IA est un <strong>outil</strong> : elle n'a pas de personnalité juridique, ne peut pas être condamnée et ne peut pas indemniser une victime. Lorsqu'une IA cause un dommage, on cherche donc quelle personne en répond.</aside>
<p><strong>La chaîne des acteurs</strong></p>
<ol class="phases"><li><strong>Fournisseurs de données</strong> ceux qui collectent et étiquettent les données</li><li><strong>Fournisseur</strong> l'entreprise qui conçoit et met sur le marché le système d'IA</li><li><strong>Déployeur</strong> l'organisation qui utilise le système (banque, hôpital, lycée…)</li><li><strong>Utilisateur final</strong> la personne qui s'en sert et applique ses résultats</li><li><strong>Personne concernée</strong> celle qui subit la décision ou le dommage</li></ol>
<p>Selon les cas, la responsabilité peut peser sur l'un ou plusieurs de ces acteurs : le fournisseur si le système est défectueux, le déployeur s'il l'utilise mal ou hors de son domaine prévu, l'utilisateur s'il commet une imprudence.</p>
<table class="donnees large"><thead><tr><th></th><th>Responsabilité civile</th><th>Responsabilité pénale</th></tr></thead><tbody>
<tr><th>But</th><td><strong>réparer</strong> le dommage subi par la victime</td><td><strong>punir</strong> une infraction prévue par la loi</td></tr>
<tr><th>Conséquence</th><td>versement de dommages et intérêts</td><td>amende, prison</td></tr>
<tr><th>Exemple</th><td>la compagnie aérienne indemnise le passager</td><td>poursuite pour homicide involontaire après un accident mortel</td></tr></tbody></table>
<p>En Europe, une directive de 2024 sur les produits défectueux précise que les logiciels, y compris les systèmes d'IA, sont des « produits » : une victime peut obtenir réparation du fabricant d'un logiciel défectueux.</p>` },
      { t: "tri", titre: "Civile ou pénale ?", q: "De quelle responsabilité s'agit-il plutôt ?", categories: ["Civile", "Pénale"],
        items: [
          { txt: "Une entreprise doit rembourser un client à qui son assistant a donné une information fausse.", cat: 0, expl: "Il s'agit de réparer." },
          { txt: "Une personne qui a diffusé un hypertrucage sexuel d'une camarade est poursuivie devant un tribunal.", cat: 1, expl: "Une infraction punie par la loi ; la victime peut aussi demander réparation." },
          { txt: "Un fabricant de logiciel indemnise une usine dont la machine a été endommagée par un défaut du programme.", cat: 0, expl: "Il s'agit de réparer." },
        ] },
      { t: "quiz", titre: "Qui répond ?", intro: "Un hôpital utilise un logiciel d'IA qui aide à repérer des fractures sur les radiographies. Le logiciel ne signale pas une fracture ; le médecin, pressé, ne regarde pas lui-même la radio ; le patient souffre de complications.",
        questions: [
          { q: "Qui est le déployeur ?", choix: ["L'éditeur du logiciel.", "L'hôpital.", "Le médecin."], bon: 1, expl: "L'éditeur est le fournisseur, le médecin l'utilisateur." },
          { q: "Que peut-on reprocher au médecin ?", choix: ["D'avoir utilisé un logiciel.", "De ne pas avoir examiné lui-même la radio.", "Rien."], bon: 1, expl: "À l'éditeur, on peut reprocher un logiciel insuffisamment fiable ; à l'hôpital, une organisation qui ne laisse pas de temps de vérification." },
          { q: "Le « contrôle humain » imposé pour ce type de système a-t-il fonctionné ?", choix: ["Oui, puisqu'un médecin était présent.", "Non : le médecin s'est contenté du résultat du logiciel. C'est le risque de confiance excessive dans l'automatisation."], bon: 1, expl: "Un humain compétent doit pouvoir détecter les erreurs de la machine et décider." },
        ] },
      { t: "lecon", titre: "Le règlement européen sur l'IA",
        texte: `<p>Adopté en 2024, le <strong>règlement européen sur l'intelligence artificielle</strong> (souvent appelé <em>AI Act</em>) est le premier grand texte au monde à encadrer l'IA de façon générale. Il suit une <strong>approche par les risques</strong> : plus un système peut porter atteinte à la santé, à la sécurité ou aux droits des personnes, plus les règles sont strictes.</p>
<table class="donnees large"><thead><tr><th>Niveau</th><th>Règles et exemples</th></tr></thead><tbody>
<tr><th>Inacceptable</th><td><strong>interdit</strong> : notation sociale des citoyens, manipulation exploitant les vulnérabilités, reconnaissance des émotions au travail et dans les établissements scolaires, surveillance biométrique en temps réel par la police dans l'espace public (sauf exceptions)…</td></tr>
<tr><th>Haut risque</th><td><strong>obligations strictes</strong> (données de qualité, documentation, contrôle humain, robustesse) dans des domaines sensibles : <strong>éducation</strong> (admission, notation, surveillance des examens), emploi, crédit, justice, santé…</td></tr>
<tr><th>Risque limité</th><td><strong>transparence</strong> : informer que l'on parle à une IA, signaler les contenus générés et les hypertrucages.</td></tr>
<tr><th>Risque minimal</th><td><strong>pas d'obligation particulière</strong> : filtres anti-spam, IA de jeux vidéo, correcteurs orthographiques…</td></tr></tbody></table>
<table class="donnees large"><thead><tr><th>Date</th><th>Ce qui s'applique</th></tr></thead><tbody>
<tr><th>1er août 2024</th><td>entrée en vigueur du règlement</td></tr>
<tr><th>2 février 2025</th><td>interdiction des pratiques inacceptables</td></tr>
<tr><th>2 août 2025</th><td>règles pour les grands modèles d'IA à usage général</td></tr>
<tr><th>2 août 2026</th><td>obligations de transparence</td></tr>
<tr><th>2 décembre 2027</th><td>obligations pour les systèmes à haut risque (dont l'éducation)</td></tr></tbody></table>
<p>Les sanctions peuvent atteindre 35 millions d'euros ou 7 % du chiffre d'affaires mondial pour les pratiques interdites.</p>` },
      { t: "tri", titre: "Quel niveau de risque ?", q: "Classe chaque système d'après le règlement européen sur l'IA.", categories: ["Inacceptable", "Haut risque", "Risque limité", "Risque minimal"],
        items: [
          { txt: "Un logiciel qui attribue une note de « bon citoyen » aux habitants selon leur comportement.", cat: 0, expl: "C'est la notation sociale." },
          { txt: "Un assistant conversationnel sur le site d'une mairie.", cat: 2, expl: "Il doit indiquer qu'il est une IA." },
          { txt: "Un logiciel qui classe les candidatures à un emploi.", cat: 1, expl: "L'emploi est un domaine sensible." },
          { txt: "Le filtre anti-spam d'une messagerie.", cat: 3, expl: "Pas d'obligation particulière." },
          { txt: "Un logiciel qui analyse les expressions des élèves en classe pour mesurer leur attention.", cat: 0, expl: "Reconnaissance des émotions dans un établissement scolaire." },
          { txt: "Un logiciel qui corrige et note automatiquement des copies d'examen.", cat: 1, expl: "La notation dans l'éducation est à haut risque." },
        ] },
      { t: "lecon", titre: "Mes droits, et les œuvres créées avec l'IA",
        texte: `<p><strong>Face à une décision automatisée</strong></p>
<ul><li>Le <strong>RGPD</strong> donne à toute personne le droit de ne pas faire l'objet d'une décision fondée <strong>exclusivement</strong> sur un traitement automatisé et produisant des effets importants (refus de crédit, de recrutement…), sauf exceptions encadrées. On peut alors demander une <strong>intervention humaine</strong>, exprimer son point de vue et contester la décision.</li><li>En France, lorsqu'une <strong>administration</strong> prend une décision individuelle sur le fondement d'un algorithme, elle doit le mentionner et, sur demande, en expliquer les règles de fonctionnement. C'est le cas pour la procédure d'affectation dans l'enseignement supérieur.</li></ul>
<p><strong>Et les œuvres créées avec l'IA ?</strong> En France, le droit d'auteur protège les œuvres qui portent l'<strong>empreinte de la personnalité d'un auteur humain</strong>. Une image produite par une IA à partir d'une courte demande n'est généralement pas considérée comme une œuvre protégée ; la question devient plus discutée lorsque l'humain a fait des choix créatifs importants. Par ailleurs, l'entraînement des modèles sur des œuvres protégées suscite de nombreux litiges. Ces questions sont encore en cours d'évolution.</p>
<aside class="retenir">Derrière chaque système d'IA, il y a des personnes et des organisations qui le conçoivent, le vendent et l'utilisent : ce sont elles qui <strong>répondent</strong> de ses effets. Le droit européen impose d'autant plus d'obligations que les risques sont élevés, et donne à chacun des droits pour comprendre et contester les décisions automatisées.</aside>` },
      { t: "quiz", titre: "Contester une décision", intro: "La demande de prêt étudiant d'Inès est refusée par une banque. Le courriel indique : « Votre dossier a été analysé par notre système automatique. Décision : refus. »",
        questions: [
          { q: "Quel droit Inès peut-elle invoquer ?", choix: ["Le droit d'auteur.", "Le droit de ne pas faire l'objet d'une décision exclusivement automatisée aux effets importants, prévu par le RGPD.", "Le droit à l'image."], bon: 1, expl: "Article 22 du RGPD : intervention humaine, expression de son point de vue, contestation." },
          { q: "Quel message convient ?", choix: ["« Votre système est nul. »", "« Je demande qu'un conseiller réexamine mon dossier, que les principaux éléments ayant conduit à ce refus me soient expliqués, et je souhaite pouvoir présenter ma situation. »", "« Merci de supprimer mon compte. »"], bon: 1, expl: "Les trois demandes : un humain, une explication, la possibilité de s'exprimer." },
        ] },
      { t: "quiz", titre: "L'image du concours", intro: "Pour un concours d'affiches organisé par sa ville, Nathan soumet une image entièrement générée par une IA à partir de la demande « une affiche joyeuse pour la fête de la musique ». Il remporte le premier prix.",
        questions: [
          { q: "Nathan est-il l'auteur de cette affiche au sens du droit d'auteur français ?", choix: ["Oui, puisqu'il a écrit la demande.", "En principe non : une demande aussi courte ne porte pas l'empreinte de sa personnalité.", "Oui, puisqu'il a gagné."], bon: 1, expl: "L'image n'est généralement pas considérée comme une œuvre protégée." },
          { q: "Le règlement du concours ne parlait pas de l'IA. Nathan a-t-il été honnête ?", choix: ["Oui, rien ne l'interdisait.", "Il aurait dû au minimum préciser que l'image avait été générée par IA.", "Oui, tout le monde le fait."], bon: 1, expl: "Présenter comme son œuvre une création qu'il n'a pas réalisée trompe le jury et les autres candidats. Le règlement devrait dire si l'IA est autorisée et exiger une déclaration." },
          { q: "Un illustrateur estime que l'IA a été entraînée sur ses dessins sans son accord. Quelle question cela soulève-t-il ?", choix: ["Celle de l'utilisation d'œuvres protégées pour entraîner des IA sans l'accord ni la rémunération de leurs auteurs.", "Celle du prix des ordinateurs.", "Aucune."], bon: 0, expl: "En Europe, une exception permet l'analyse automatisée de textes et de données, mais les auteurs peuvent s'y opposer ; de nombreux litiges sont en cours." },
        ] },
      { t: "quiz", titre: "Le procès du robot livreur", intro: "Une affaire fictive, à débattre en classe : chaque groupe plaide pour une partie, puis le tribunal rend un jugement motivé.",
        doc: `<blockquote class="recit">Un soir de pluie de novembre, un robot de livraison autonome de l'entreprise Livria renverse un cycliste sur une piste cyclable. Le cycliste a une jambe cassée. L'enquête établit que :<br>• le logiciel de navigation a été conçu par la société NaviSoft, qui a publié un mois plus tôt une mise à jour améliorant la détection des cyclistes par temps de pluie ;<br>• Livria n'avait pas encore installé cette mise à jour, « pour ne pas interrompre le service » ;<br>• la caméra avant du robot était partiellement couverte de boue ; le manuel prévoit un nettoyage quotidien, qui n'avait pas été fait ;<br>• un opérateur de Livria surveillait à distance 15 robots en même temps ; il n'a pas vu l'alerte du robot ;<br>• le cycliste roulait sans éclairage ;<br>• la ville avait autorisé la circulation des robots sur les pistes cyclables, à titre expérimental.</blockquote>`,
        questions: [
          { q: "Dans la chaîne des acteurs, qui est Livria ?", choix: ["Le fournisseur.", "Le déployeur.", "La personne concernée."], bon: 1, expl: "NaviSoft est le fournisseur ; le cycliste, la personne concernée." },
          { q: "Le robot peut-il être partie au procès ?", choix: ["Oui, c'est lui qui a renversé le cycliste.", "Non : une IA n'a pas de personnalité juridique."], bon: 1, expl: "On cherche quelle personne répond du dommage." },
          { q: "Qu'est-ce qui pèse le plus contre Livria ?", choix: ["Avoir acheté un robot.", "La mise à jour non installée, la caméra non nettoyée et un seul opérateur pour quinze robots.", "La pluie."], bon: 1, expl: "Un jugement bien motivé retient en général la responsabilité principale du déployeur." },
          { q: "L'absence d'éclairage du cycliste…", choix: ["supprime son droit à réparation.", "peut réduire son indemnisation, sans la supprimer.", "n'a aucune importance."], bon: 1, expl: "Il n'y a pas de jugement unique attendu : restent la part éventuelle de NaviSoft, le rôle de la ville et les règles à fixer pour l'avenir." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Lorsqu'une IA cause un dommage, la responsabilité est recherchée…", choix: ["auprès de l'IA elle-même.", "auprès des personnes ou des organisations qui la conçoivent, la fournissent ou l'utilisent.", "nulle part, car c'est un accident.", "uniquement auprès de la victime."], bon: 1, expl: "Une IA est un outil." },
          { q: "La responsabilité civile a pour but de…", choix: ["punir l'auteur d'une infraction.", "interdire un logiciel.", "former les utilisateurs.", "réparer le dommage subi par la victime."], bon: 3, expl: "Punir relève de la responsabilité pénale." },
          { q: "Le règlement européen sur l'IA repose sur…", choix: ["une approche par les risques.", "une interdiction totale de l'IA.", "un label facultatif.", "une taxe sur les ordinateurs."], bon: 0, expl: "Plus le risque est élevé, plus les règles sont strictes." },
          { q: "La notation sociale des citoyens par une IA est, en Europe…", choix: ["autorisée sans condition.", "un système à risque minimal.", "interdite.", "obligatoire."], bon: 2, expl: "C'est un risque inacceptable." },
          { q: "Un assistant conversationnel doit, au titre de la transparence…", choix: ["cacher qu'il est une IA.", "être payant.", "informer qu'il est une IA.", "ne parler que français."], bon: 2, expl: "Risque limité : obligation de transparence." },
          { q: "Le RGPD permet de demander…", choix: ["la suppression de tous les algorithmes.", "la gratuité de tous les services.", "un remboursement automatique.", "qu'une décision importante entièrement automatisée fasse l'objet d'une intervention humaine."], bon: 3, expl: "Et de la contester." },
          { q: "Dans la chaîne des acteurs, le « déployeur » est…", choix: ["l'organisation qui utilise le système d'IA dans son activité.", "la personne qui subit la décision.", "le ministre du numérique.", "le premier client."], bon: 0, expl: "Une banque, un hôpital, un lycée…" },
          { q: "En France, une image générée par une IA à partir d'une simple demande…", choix: ["est toujours protégée par le droit d'auteur au profit de l'IA.", "appartient automatiquement à l'État.", "n'est généralement pas considérée comme une œuvre protégée.", "est interdite."], bon: 2, expl: "Il manque l'empreinte de la personnalité d'un auteur humain." },
          { q: "Les sanctions du règlement européen pour les pratiques interdites peuvent atteindre…", choix: ["1 000 euros.", "35 millions d'euros ou 7 % du chiffre d'affaires mondial.", "une semaine de fermeture.", "un simple avertissement."], bon: 1, expl: "Des montants très dissuasifs." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Une IA n'est pas une personne.</strong> Elle ne peut être ni condamnée ni tenue d'indemniser : on cherche quelle personne répond du dommage.</p>
<p><strong>La chaîne des acteurs.</strong> Fournisseurs de données, <strong>fournisseur</strong>, <strong>déployeur</strong>, utilisateur final, personne concernée.</p>
<p><strong>Deux responsabilités.</strong> <strong>Civile</strong> : réparer. <strong>Pénale</strong> : punir.</p>
<p><strong>Règlement européen sur l'IA.</strong> Approche par les risques : <strong>inacceptable</strong> (interdit), <strong>haut risque</strong> (obligations strictes, dont l'éducation), <strong>risque limité</strong> (transparence), <strong>risque minimal</strong>.</p>
<p><strong>Mes droits.</strong> Pas de décision exclusivement automatisée aux effets importants : intervention humaine, explication, contestation.</p>
<p><strong>Droit d'auteur.</strong> Il protège l'empreinte de la personnalité d'un auteur humain.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>expliquer pourquoi une IA n'est pas responsable</li><li>identifier fournisseur, déployeur et utilisateur</li><li>distinguer responsabilité civile et pénale</li><li>classer un système selon son niveau de risque</li><li>contester une décision automatisée</li></ul>` },
    ] },
  ]
},
{
  id: "p4", titre: "Impacts social et environnemental", sous: "Comprendre les effets de l'IA sur la société, le travail et la planète",
  chapitres: [
    { id: "c12", num: 12, titre: "L'IA et le monde du travail", resume: "Automatiser ou augmenter, emplois exposés, métiers de l'IA, compétences",
    etapes: [
      { t: "tri", titre: "Quels métiers vont changer avec l'IA ?", q: "Voici des tâches de trois métiers. L'IA pourrait-elle les réaliser seule, aider la personne, ou difficilement intervenir ? (Classement indicatif, à discuter.)",
        categories: ["Réalisée seule", "Aidée", "Reste humaine"],
        items: [
          { txt: "Comptable : saisir et classer les factures.", cat: 0, expl: "Une tâche répétitive, aux règles claires." },
          { txt: "Traducteur : vérifier et corriger une traduction automatique.", cat: 1, expl: "La machine propose, l'humain contrôle." },
          { txt: "Infirmier : rassurer un patient avant une opération.", cat: 2, expl: "Une relation humaine." },
          { txt: "Infirmier : faire un pansement à un enfant qui bouge.", cat: 2, expl: "Présence physique et dextérité dans une situation variée." },
          { txt: "Comptable : conseiller un artisan sur un investissement.", cat: 1, expl: "L'IA peut préparer des simulations ; le conseil et la responsabilité restent au comptable." },
          { txt: "Traducteur : traduire une notice d'utilisation courante.", cat: 0, expl: "Un texte courant est en grande partie automatisable." },
        ],
        expl: "Aucun métier n'a toutes ses tâches dans la même colonne. Les tâches qui restent humaines demandent souvent une présence physique, une relation, du jugement dans l'imprévu ou une responsabilité." },
      { t: "lecon", titre: "Automatiser ou augmenter",
        texte: `<ul><li>Il y a <strong>automatisation</strong> lorsqu'une machine réalise seule une tâche qui était faite par un humain.</li><li>Il y a <strong>augmentation</strong> lorsque la machine aide l'humain à mieux faire son travail, sans le remplacer : il gagne du temps, de la précision, ou peut faire des choses nouvelles.</li></ul>
<p>Un métier est un ensemble de tâches. Même lorsque certaines tâches sont automatisées, les autres restent, et de nouvelles apparaissent : le métier se <strong>transforme</strong>. Les distributeurs automatiques de billets n'ont pas fait disparaître les employés de banque ; ils ont changé leur travail, davantage tourné vers le conseil.</p>
<p><strong>Un traducteur.</strong> Traduire un texte courant : en partie automatisable. Vérifier et corriger une traduction automatique : augmentation. Adapter un slogan publicitaire à une culture, traduire un roman avec son style, interpréter lors d'une négociation délicate : tâches très humaines. Le métier évolue vers la relecture experte, l'adaptation culturelle et les textes à forts enjeux.</p>` },
      { t: "tri", titre: "Automatiser ou augmenter ?", q: "Classe chaque situation.", categories: ["Automatisation", "Augmentation"],
        items: [
          { txt: "Un logiciel trie seul les factures et les enregistre en comptabilité.", cat: 0, expl: "La machine réalise seule la tâche." },
          { txt: "Une radiologue utilise une IA qui signale les zones suspectes, puis décide elle-même du diagnostic.", cat: 1, expl: "La décision reste humaine." },
          { txt: "Un robot de caisse remplace les caissiers dans un magasin.", cat: 0, expl: "La machine remplace l'humain." },
          { txt: "Un journaliste utilise une IA pour transcrire ses interviews, puis écrit son article.", cat: 1, expl: "La transcription est automatisée, mais le métier de journaliste est augmenté." },
          { txt: "Une agricultrice utilise des images satellites analysées par IA pour savoir quelles parcelles arroser.", cat: 1, expl: "L'IA éclaire sa décision." },
        ] },
      { t: "tri", titre: "Découper un métier", q: "Voici les tâches d'une secrétaire médicale.", categories: ["Automatisable", "Augmentable", "Humaine"],
        items: [
          { txt: "Accueillir les patients.", cat: 2, expl: "Une relation humaine." },
          { txt: "Prendre les rendez-vous.", cat: 0, expl: "La prise de rendez-vous en ligne existe déjà." },
          { txt: "Rédiger les comptes rendus dictés par le médecin.", cat: 1, expl: "Transcription automatique, puis relecture." },
          { txt: "Gérer la facturation.", cat: 0, expl: "Automatisable en grande partie." },
          { txt: "Rassurer un patient inquiet au téléphone.", cat: 2, expl: "Écouter et rassurer." },
        ],
        expl: "Le métier pourrait se recentrer sur l'accueil, l'accompagnement, la coordination et la vérification des documents produits par les outils." },
      { t: "lecon", titre: "Que disent les études ?",
        texte: `<ul><li>En 2025, une étude de l'<strong>Organisation internationale du travail</strong> (OIT) estime qu'environ <strong>un emploi sur quatre</strong> dans le monde est potentiellement <strong>exposé</strong> à l'IA générative, et environ un tiers dans les pays à revenu élevé. Les emplois de bureau sont les plus exposés. Selon l'étude, l'IA générative devrait davantage <strong>transformer</strong> les emplois que les supprimer.</li><li>Dans les pays riches, les emplois occupés par des femmes sont plus souvent dans la catégorie la plus exposée à l'automatisation, car elles sont plus nombreuses dans les emplois administratifs.</li></ul>
<aside class="retenir"><strong>Exposé ne veut pas dire supprimé.</strong> Un emploi <strong>exposé</strong> est un emploi dont une partie des tâches pourrait être réalisée ou modifiée par l'IA. Cela ne dit pas si l'emploi disparaîtra : tout dépend des choix des entreprises, des coûts, des règles, de l'acceptation par le public et de la formation des travailleurs. Les prévisions sur l'emploi sont <strong>incertaines</strong> : il faut les lire avec esprit critique.</aside>
<p>Les révolutions techniques passées (machine à vapeur, électricité, informatique) ont détruit certains emplois et en ont créé d'autres, souvent inimaginables auparavant. Mais la transition peut être difficile pour les personnes concernées : les nouvelles compétences ne s'acquièrent pas du jour au lendemain, et les nouveaux emplois ne sont pas forcément dans la même région ni aussi bien payés.</p>` },
      { t: "quiz", titre: "Lire des chiffres", intro: "Un titre de presse annonce : « L'IA va supprimer un emploi sur quatre ! »",
        questions: [
          { q: "Pourquoi ce titre déforme-t-il l'étude de l'OIT ?", choix: ["Parce que le chiffre exact est un sur trois.", "Parce qu'il transforme une exposition possible en suppression certaine.", "Parce que l'étude ne parle pas d'emploi."], bon: 1, expl: "L'étude parle d'emplois potentiellement exposés et conclut à une transformation plus probable que la suppression." },
          { q: "Quel titre serait fidèle ?", choix: ["« Selon l'OIT, un emploi sur quatre pourrait être transformé par l'IA générative. »", "« L'IA ne changera rien au travail. »", "« Un quart des travailleurs au chômage demain. »"], bon: 0, expl: "Il garde la source, le conditionnel et l'idée de transformation." },
          { q: "Pourquoi un titre alarmiste attire-t-il davantage de lecteurs ?", choix: ["Parce qu'il est plus court.", "Parce qu'il suscite la peur et la curiosité, donc plus de clics et de partages.", "Parce qu'il est plus exact."], bon: 1, expl: "C'est un ressort fréquent de la désinformation et de la mésinformation (chapitre 9)." },
        ] },
      { t: "lecon", titre: "Les métiers de l'IA",
        texte: `<table class="donnees large"><thead><tr><th>Métier</th><th>Rôle</th></tr></thead><tbody>
<tr><th>Ingénieur ou ingénieure en apprentissage automatique</th><td>concevoir, entraîner et améliorer des modèles</td></tr>
<tr><th>Data scientist (scientifique des données)</th><td>analyser des données pour en tirer des connaissances et des prédictions</td></tr>
<tr><th>Data engineer (ingénieur des données)</th><td>collecter, nettoyer et organiser les données</td></tr>
<tr><th>Chercheur ou chercheuse en IA</th><td>inventer de nouvelles méthodes</td></tr>
<tr><th>Spécialiste de l'éthique et de la conformité</th><td>vérifier qu'un système respecte la loi et ne discrimine pas</td></tr>
<tr><th>Annotateur ou annotatrice de données</th><td>étiqueter images, textes et sons pour l'entraînement</td></tr>
<tr><th>Développeur ou développeuse</th><td>intégrer l'IA dans des applications</td></tr></tbody></table>
<p>Le <strong>micro-travail</strong> désigne des tâches très courtes (étiqueter une image, vérifier une réponse, classer un texte), payées à la pièce sur des plateformes en ligne. Indispensable à l'entraînement des IA, il est souvent invisible, précaire et mal rémunéré, et une partie est réalisée dans des pays à bas salaires. En 2023, une enquête du magazine <em>Time</em> a révélé que des travailleurs kenyans, payés moins de deux dollars de l'heure, avaient été chargés de repérer des contenus violents ou choquants pour rendre un assistant conversationnel plus sûr.</p>` },
      { t: "code", titre: "Le travail invisible", d: 1,
        caches: ["gain_horaire(0.05, 30)", "gain_horaire(0.01, 5)", "gain_horaire(0.1, 60)"],
        enonce: `<p>Une plateforme paie 0,02 $ par image étiquetée. Une travailleuse étiquette en moyenne une image toutes les 10 secondes.</p><p>Écris la fonction <code>gain_horaire(prix, secondes)</code> qui renvoie le gain pour une heure de travail : le nombre d'images étiquetées en 3 600 secondes, multiplié par le prix d'une image.</p>`,
        depart: `def gain_horaire(prix, secondes):\n    # à compléter\n    return 0\n\nprint(gain_horaire(0.02, 10))`,
        solution: `def gain_horaire(prix, secondes):\n    images = 3600 / secondes\n    return images * prix\n\nprint(gain_horaire(0.02, 10))`,
        tests: [{ appels: [["gain_horaire(0.02, 10)", "7.2"], ["gain_horaire(0.5, 3600)", "0.5"]] }],
        indices: ["En une heure, elle étiquette 3600 / secondes images.", "return 3600 / secondes * prix"] },
      { t: "quiz", titre: "Un travail peu visible", intro: "La travailleuse étiquette 360 images par heure et gagne 7,20 $ par heure.",
        questions: [
          { q: "Pourquoi parle-t-on de travail « invisible » ?", choix: ["Parce qu'il se fait de nuit.", "Parce qu'il est indispensable, mais n'apparaît pas dans l'image de produits d'IA présentés comme « automatiques ».", "Parce qu'il n'existe pas vraiment."], bon: 1, expl: "Il est réalisé à distance, souvent dans d'autres pays, sans contrat ni protection." },
          { q: "Quelle mesure améliorerait les conditions de ces travailleurs ?", choix: ["Imposer une rémunération minimale et des contrats.", "Augmenter le nombre d'images à étiqueter.", "Supprimer les pauses."], bon: 0, expl: "Et aussi : un soutien psychologique pour ceux qui voient des contenus choquants, la publication des conditions de travail des sous-traitants." },
        ] },
      { t: "lecon", titre: "Les compétences d'avenir",
        texte: `<p>Plus les machines savent faire, plus certaines compétences humaines prennent de la valeur :</p>
<ul><li><strong>l'esprit critique</strong> : vérifier, évaluer, décider ;</li><li><strong>la créativité</strong> : poser de nouvelles questions, imaginer ;</li><li><strong>les compétences relationnelles</strong> : écouter, coopérer, convaincre, prendre soin ;</li><li><strong>les compétences numériques et scientifiques</strong> : comprendre comment fonctionnent les outils pour bien les utiliser, et pouvoir les concevoir ;</li><li><strong>la capacité à apprendre</strong> tout au long de la vie, car les outils changeront encore.</li></ul>
<aside class="savoir"><strong>Le numérique a besoin de tout le monde.</strong> Les filles et les femmes restent nettement minoritaires dans les formations et les métiers du numérique et de l'IA. Or des équipes peu diverses conçoivent plus facilement des systèmes biaisés (chapitre 8). Les spécialités de première Numérique et sciences informatiques (NSI) et Mathématiques sont des portes d'entrée vers ces métiers, ouvertes à toutes et à tous.</aside>
<p><strong>Enquête sur un métier.</strong> Choisis un métier qui t'intéresse. Avec les fiches de l'ONISEP (onisep.fr), des articles de presse récents et, si possible, le témoignage d'une personne qui l'exerce, note : la formation, cinq tâches principales, celles que l'IA pourrait automatiser, celles qu'elle pourrait augmenter, celles qui resteront humaines, les nouvelles compétences à acquérir, un risque et une opportunité, et tes sources (au moins trois, dont une non générée par IA).</p>` },
      { t: "tri", titre: "Compétences complémentaires", q: "Pour chaque métier : compétence humaine que l'IA rend plus importante, ou tâche répétitive où l'IA fait gagner du temps ?", categories: ["Compétence humaine", "Gain de temps avec l'IA"],
        items: [
          { txt: "Architecte : écouter les clients.", cat: 0, expl: "Une compétence relationnelle." },
          { txt: "Architecte : générer des variantes de plans.", cat: 1, expl: "L'IA propose, l'architecte choisit." },
          { txt: "Avocat : rechercher de la jurisprudence.", cat: 1, expl: "À vérifier, bien sûr !" },
          { txt: "Aide-soignante : l'empathie et les soins physiques.", cat: 0, expl: "Prendre soin reste humain." },
          { txt: "Aide-soignante : organiser les plannings.", cat: 1, expl: "Une tâche d'organisation répétitive." },
          { txt: "Professeur des écoles : s'adapter à chaque élève.", cat: 0, expl: "La relation pédagogique." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "L'augmentation désigne une situation où l'IA…", choix: ["remplace complètement l'humain.", "fait augmenter les salaires.", "aide l'humain à mieux faire son travail.", "augmente le nombre d'heures travaillées."], bon: 2, expl: "Sans le remplacer." },
          { q: "L'IA agit avant tout sur…", choix: ["des tâches.", "des métiers entiers d'un seul coup.", "les diplômes.", "les horaires de travail."], bon: 0, expl: "Un métier est un ensemble de tâches." },
          { q: "Selon l'OIT (2025), la part des emplois mondiaux potentiellement exposés à l'IA générative est d'environ…", choix: ["1 %.", "10 %.", "50 %.", "25 %."], bon: 3, expl: "Un emploi sur quatre." },
          { q: "Un emploi « exposé » à l'IA est un emploi…", choix: ["qui va forcément disparaître.", "dont une partie des tâches pourrait être réalisée ou modifiée par l'IA.", "protégé par la loi.", "exercé en plein air."], bon: 1, expl: "Exposé ne veut pas dire supprimé." },
          { q: "Selon l'OIT, les emplois les plus exposés à l'IA générative sont…", choix: ["les emplois de bureau.", "les métiers du bâtiment.", "les métiers agricoles.", "les métiers du sport."], bon: 0, expl: "Notamment les emplois administratifs." },
          { q: "Le micro-travail consiste à…", choix: ["travailler sur un très petit ordinateur.", "réaliser des tâches très courtes payées à la pièce, comme étiqueter des images.", "travailler moins de deux heures par semaine.", "fabriquer des microprocesseurs."], bon: 1, expl: "Il est indispensable à l'entraînement des IA." },
          { q: "Laquelle de ces compétences prend plus de valeur avec l'IA ?", choix: ["Recopier des textes.", "Faire des calculs répétitifs.", "Mémoriser des annuaires.", "L'esprit critique."], bon: 3, expl: "Vérifier, évaluer, décider." },
          { q: "Les prévisions sur l'effet de l'IA sur l'emploi sont…", choix: ["certaines et précises.", "sans intérêt.", "incertaines et à lire avec esprit critique.", "interdites."], bon: 2, expl: "Tout dépend de choix qui restent à faire." },
          { q: "Pourquoi la diversité des équipes qui conçoivent l'IA est-elle importante ?", choix: ["Elle rend les ordinateurs plus rapides.", "Elle réduit le risque de systèmes biaisés.", "Elle est obligatoire dans tous les pays.", "Elle diminue la consommation d'énergie."], bon: 1, expl: "Voir le chapitre 8." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Automatisation</strong> : la machine réalise seule la tâche. <strong>Augmentation</strong> : elle aide l'humain à mieux faire son travail.</p>
<p><strong>Tâches, pas métiers.</strong> Un métier est un ensemble de tâches : il se <strong>transforme</strong> plus souvent qu'il ne disparaît.</p>
<p><strong>Les études.</strong> Selon l'OIT (2025), environ un emploi sur quatre est potentiellement <strong>exposé</strong> à l'IA générative, surtout les emplois de bureau. Exposé ne veut pas dire supprimé ; les prévisions sont incertaines.</p>
<p><strong>Les métiers de l'IA.</strong> Ingénierie, science et ingénierie des données, recherche, éthique et conformité, annotation, développement. Le <strong>micro-travail</strong> est indispensable, mais invisible et précaire.</p>
<p><strong>Compétences d'avenir.</strong> Esprit critique, créativité, relationnel, compétences numériques et scientifiques, capacité à apprendre.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>distinguer automatisation et augmentation</li><li>découper un métier en tâches</li><li>lire avec esprit critique un chiffre sur l'emploi</li><li>citer des métiers de l'IA et définir le micro-travail</li><li>nommer les compétences que l'IA rend plus précieuses</li></ul>` },
    ] },
    { id: "c13", num: 13, titre: "L'empreinte écologique de l'IA", resume: "Centres de données, ordres de grandeur, effet rebond, sobriété",
    etapes: [
      { t: "ordre", texte: true, titre: "Combien consomme une requête à une IA ?", q: "Sans rien chercher, range ces usages du moins énergivore au plus énergivore.",
        lignes: ["Poser une question écrite à un assistant conversationnel.", "Générer une image avec une IA.", "Allumer une ampoule LED de 10 W pendant une heure.", "Recharger complètement son smartphone.", "Regarder une heure de vidéo en ligne."],
        expl: "Ordres de grandeur publiés : requête texte 0,24 Wh (Google, 2025) ; image générée environ 3 Wh (estimation de recherche, 2023) ; ampoule 10 Wh ; recharge environ 15 Wh ; heure de vidéo environ 77 Wh (estimation de l'AIE, 2020). On surestime souvent la requête texte et on sous-estime la vidéo." },
      { t: "quiz", titre: "Les ordres de grandeur", intro: "Estimations publiées, à considérer comme des ordres de grandeur.",
        doc: `<table class="donnees"><thead><tr><th>Usage</th><th>Énergie estimée</th></tr></thead><tbody><tr><td>Requête texte à un assistant</td><td>0,24 Wh</td></tr><tr><td>Image générée par IA</td><td>environ 3 Wh</td></tr><tr><td>Ampoule LED de 10 W, une heure</td><td>10 Wh</td></tr><tr><td>Recharge complète de smartphone</td><td>environ 15 Wh</td></tr><tr><td>Une heure de vidéo en ligne</td><td>environ 77 Wh</td></tr></tbody></table>`,
        questions: [
          { q: "Combien de requêtes texte faut-il pour consommer autant qu'une heure de vidéo ?", choix: ["Environ 30.", "Environ 320.", "Environ 3 200."], bon: 1, expl: "77 ÷ 0,24 ≈ 320." },
          { q: "Et autant qu'une image générée ?", choix: ["Environ 12 à 13.", "Environ 100.", "Environ 2."], bon: 0, expl: "3 ÷ 0,24 = 12,5." },
          { q: "Une requête consomme très peu. Pourquoi l'IA pose-t-elle malgré tout un problème environnemental ?", choix: ["Parce que les requêtes se comptent par milliards chaque jour, et qu'il faut ajouter l'entraînement des modèles et la fabrication du matériel.", "Parce que chaque requête pollue une rivière.", "Elle n'en pose aucun."], bon: 0, expl: "Et les usages plus gourmands (images, vidéos) se multiplient." },
        ] },
      { t: "lecon", titre: "L'IA est matérielle",
        texte: `<p>On dit que l'IA est « dans le nuage » (le <em>cloud</em>). En réalité, elle fonctionne dans des bâtiments bien réels : les <strong>centres de données</strong>, qui abritent des milliers de serveurs et de processeurs spécialisés, refroidis en permanence.</p>
<ol class="phases"><li><strong>Matériel</strong> extraction de métaux (cuivre, terres rares…), fabrication des puces, des serveurs, des bâtiments ; déchets électroniques</li><li><strong>Électricité</strong> pour faire calculer les puces et refroidir les machines ; ses émissions dépendent de la façon dont elle est produite</li><li><strong>Eau</strong> pour refroidir les centres de données, et pour produire l'électricité et les puces</li></ol>
<p>L'<strong>analyse du cycle de vie</strong> mesure les impacts environnementaux d'un produit à toutes les étapes de son existence : extraction des matières premières, fabrication, transport, utilisation et fin de vie.</p>
<p>Le <strong>wattheure</strong> (Wh) est une unité d'énergie : l'énergie consommée par un appareil de 1 watt pendant 1 heure.</p>
<p class="formule">1 kWh = 1 000 Wh · 1 MWh = 1 000 kWh · 1 GWh = 1 000 MWh · 1 TWh = 1 000 GWh</p>
<p>L'<strong>intensité carbone</strong> de l'électricité est la masse de CO₂ émise pour produire 1 kWh. Elle est faible lorsque l'électricité vient surtout du nucléaire, de l'hydraulique, de l'éolien ou du solaire (quelques dizaines de grammes par kWh en France), et élevée lorsqu'elle vient du charbon ou du gaz (la moyenne mondiale est de l'ordre de 450 grammes par kWh).</p>` },
      { t: "tri", titre: "D'où vient l'empreinte ?", q: "Classe chaque élément dans l'une des trois sources d'impact.", categories: ["Matériel", "Électricité", "Eau"],
        items: [
          { txt: "L'extraction de cuivre et de terres rares.", cat: 0, expl: "Des matières premières." },
          { txt: "Les tours de refroidissement d'un centre de données.", cat: 2, expl: "Elles consomment de l'eau." },
          { txt: "Le fonctionnement des processeurs pendant l'entraînement.", cat: 1, expl: "Les puces calculent grâce à l'électricité." },
          { txt: "Les serveurs remplacés tous les cinq ans.", cat: 0, expl: "Fabrication et déchets électroniques." },
          { txt: "La climatisation des salles de serveurs.", cat: 1, expl: "La climatisation consomme de l'électricité." },
        ] },
      { t: "quiz", titre: "Convertir",
        questions: [
          { q: "2 500 Wh, c'est…", choix: ["25 kWh.", "2,5 kWh.", "0,25 kWh."], bon: 1, expl: "On divise par 1 000." },
          { q: "945 TWh, c'est…", choix: ["945 000 GWh.", "9 450 GWh.", "0,945 GWh."], bon: 0, expl: "1 TWh = 1 000 GWh." },
          { q: "1 287 MWh, c'est…", choix: ["1 287 000 GWh.", "12,87 GWh.", "1,287 GWh."], bon: 2, expl: "1 GWh = 1 000 MWh." },
        ] },
      { t: "lecon", titre: "Entraînement et utilisation",
        texte: `<ul><li><strong>L'entraînement</strong> d'un grand modèle mobilise des milliers de processeurs pendant des semaines ou des mois. C'est un coût ponctuel, mais très élevé. En 2025, l'entreprise française Mistral AI a publié, avec l'ADEME et le cabinet Carbone 4, l'analyse du cycle de vie de l'un de ses grands modèles : son entraînement et ses 18 premiers mois d'utilisation représentaient environ <strong>20 400 tonnes de CO₂</strong> et <strong>281 000 m³ d'eau</strong>.</li><li><strong>L'utilisation</strong> (on parle d'<em>inférence</em>) coûte peu à chaque requête, mais elle se répète des milliards de fois par jour. Selon la même étude, une réponse d'environ 400 tokens représentait environ 1,1 g de CO₂ et 45 mL d'eau, en tenant compte de tout le cycle de vie. Google annonce de son côté 0,24 Wh et 0,26 mL d'eau pour une requête texte médiane, en ne comptant que le fonctionnement de ses centres de données.</li></ul>
<aside class="retenir"><strong>Des chiffres à manier avec précaution.</strong> Les estimations varient beaucoup selon ce que l'on compte (le seul fonctionnement des serveurs, ou tout le cycle de vie), selon le modèle, la longueur de la réponse et le type de tâche. Ces chiffres sont souvent publiés par les entreprises elles-mêmes, sans méthode commune. Il faut toujours se demander : <strong>qu'est-ce qui est compté, et par qui ?</strong></aside>` },
      { t: "quiz", titre: "Comparer des chiffres", intro: "Google annonce 0,26 mL d'eau par requête texte médiane ; Mistral AI annonce 45 mL d'eau pour une réponse de 400 tokens.",
        questions: [
          { q: "Peut-on en conclure qu'un assistant consomme 170 fois plus d'eau que l'autre ?", choix: ["Oui : 45 ÷ 0,26 ≈ 170.", "Non : les deux chiffres ne mesurent pas la même chose.", "Oui, les deux entreprises sont fiables."], bon: 1, expl: "L'un ne compte que l'eau des centres de données pour une requête « médiane » ; l'autre inclut tout le cycle de vie pour une réponse d'une longueur donnée." },
          { q: "Que faudrait-il pour comparer honnêtement deux modèles ?", choix: ["Une méthode de calcul commune, une même tâche de référence, des chiffres vérifiés par un organisme indépendant.", "Le prix de l'abonnement.", "Le nombre d'utilisateurs."], bon: 0, expl: "Qu'est-ce qui est compté, et par qui ?" },
        ] },
      { t: "quiz", titre: "L'entraînement d'un grand modèle", intro: "Des chercheurs ont estimé en 2021 que l'entraînement d'un grand modèle de langage de l'époque avait consommé environ 1 287 MWh. Un foyer français consomme en moyenne environ 4 500 kWh d'électricité par an.",
        questions: [
          { q: "À combien d'années de consommation d'un foyer cet entraînement correspond-il ?", choix: ["Environ 3 ans.", "Environ 29 ans.", "Environ 286 ans."], bon: 2, expl: "1 287 MWh = 1 287 000 kWh ; 1 287 000 ÷ 4 500 ≈ 286." },
          { q: "Quelles émissions avec une électricité à 30 g/kWh, puis à 450 g/kWh ?", choix: ["Environ 39 tonnes, puis 579 tonnes de CO₂.", "Environ 39 kg, puis 579 kg.", "La même chose dans les deux cas."], bon: 0, expl: "1 287 000 × 30 = 38 610 000 g ; le même calcul émet quinze fois plus avec 450 g/kWh." },
          { q: "Qu'en conclure ?", choix: ["L'emplacement du centre de données compte énormément.", "L'entraînement ne consomme rien.", "Il faut entraîner les modèles la nuit."], bon: 0, expl: "Tout dépend de la façon dont l'électricité est produite." },
        ] },
      { t: "lecon", titre: "À l'échelle mondiale",
        texte: `<p>Selon l'Agence internationale de l'énergie (AIE), les centres de données consommaient en 2024 environ <strong>1,5 %</strong> de l'électricité mondiale, soit environ 415 TWh, à peu près la consommation annuelle de la France. Portée par l'IA, cette consommation pourrait plus que <strong>doubler d'ici 2030</strong>, pour atteindre environ 945 TWh, soit environ 3 % de la demande mondiale. Dans certains territoires, la part est déjà très élevée : environ 20 % de l'électricité en Irlande.</p>
<table class="donnees"><thead><tr><th>Année</th><th>Centres de données dans le monde</th></tr></thead><tbody><tr><td>2024</td><td>415 TWh</td></tr><tr><td>2030 (projection)</td><td>945 TWh</td></tr></tbody></table>
<p>L'<strong>effet rebond</strong> désigne le fait qu'une technologie devenue plus efficace, donc moins coûteuse, est utilisée beaucoup plus, si bien que la consommation totale augmente au lieu de baisser. Google indique que l'énergie d'une requête médiane a été divisée par plus de trente en un an ; mais si le nombre de requêtes et d'usages explose, la consommation totale peut continuer de croître.</p>` },
      { t: "quiz", titre: "L'effet rebond", intro: "En un an, l'énergie consommée par requête par un service d'IA est divisée par 10. Dans le même temps, son nombre de requêtes est multiplié par 25.",
        questions: [
          { q: "Comment la consommation totale a-t-elle évolué ?", choix: ["Elle a été divisée par 10.", "Elle a été multipliée par 2,5.", "Elle n'a pas changé."], bon: 1, expl: "25 ÷ 10 = 2,5." },
          { q: "Comment l'expliquer ?", choix: ["Plus efficace, donc moins cher et plus rapide, le service est beaucoup plus utilisé : la hausse des usages dépasse le gain d'efficacité.", "Les serveurs sont tombés en panne.", "Le calcul est faux."], bon: 0, expl: "C'est l'effet rebond." },
          { q: "Quelle mesure limiterait cet effet ?", choix: ["Fixer des objectifs de consommation totale, et pas seulement par requête.", "Rendre le service encore plus rapide.", "Générer plus d'images."], bon: 0, expl: "On peut aussi réserver les usages les plus coûteux aux besoins réels." },
        ] },
      { t: "code", titre: "L'empreinte d'une journée", d: 2,
        caches: ["total_jour([('a', 1, 1)])", "total_jour([('a', 0.5, 4), ('b', 10, 3)])", "total_jour([])"],
        enonce: `<p>Léo a noté ses usages d'une journée : 20 requêtes à un assistant, 2 images générées, 2 heures de vidéo en ligne et une recharge de smartphone. Chaque élément de la liste <code>usages</code> contient un nom, une énergie en Wh et un nombre par jour.</p><p>Complète la fonction <code>total_jour(usages)</code> qui renvoie l'énergie totale de la journée, en Wh.</p>`,
        depart: `usages = [\n    ("requête texte à une IA", 0.24, 20),\n    ("image générée par IA", 3, 2),\n    ("heure de vidéo en ligne", 77, 2),\n    ("recharge de smartphone", 15, 1)]\n\ndef total_jour(usages):\n    total = 0\n    for (nom, energie, nombre) in usages:\n        # à compléter\n        pass\n    return total\n\nprint("Total :", round(total_jour(usages), 1), "Wh par jour")`,
        solution: `usages = [\n    ("requête texte à une IA", 0.24, 20),\n    ("image générée par IA", 3, 2),\n    ("heure de vidéo en ligne", 77, 2),\n    ("recharge de smartphone", 15, 1)]\n\ndef total_jour(usages):\n    total = 0\n    for (nom, energie, nombre) in usages:\n        total = total + energie * nombre\n    return total\n\nprint("Total :", round(total_jour(usages), 1), "Wh par jour")`,
        tests: [{ appels: [["total_jour(usages)", "179.8"], ["total_jour([('vidéo', 77, 1)])", "77"]] }],
        indices: ["La consommation d'un usage vaut energie * nombre.", "total = total + energie * nombre"] },
      { t: "code", titre: "Du wattheure au CO₂", d: 2,
        caches: ["emissions(1000, 100)", "emissions(200, 30)", "emissions(0, 450)"],
        enonce: `<p>Écris la fonction <code>emissions(wh_par_jour, intensite)</code> qui renvoie les émissions annuelles, en <strong>kilogrammes</strong> de CO₂.</p><ul><li>l'énergie annuelle en kWh vaut <code>wh_par_jour * 365 / 1000</code> ;</li><li>l'intensité est donnée en grammes de CO₂ par kWh : on divise encore par 1 000 pour obtenir des kilogrammes.</li></ul>`,
        depart: `def emissions(wh_par_jour, intensite):\n    kwh_an = 0   # à compléter\n    return 0\n\nprint("France :", round(emissions(179.8, 30), 1), "kg de CO2 par an")\nprint("Moyenne mondiale :", round(emissions(179.8, 450), 1), "kg de CO2 par an")`,
        solution: `def emissions(wh_par_jour, intensite):\n    kwh_an = wh_par_jour * 365 / 1000\n    return kwh_an * intensite / 1000\n\nprint("France :", round(emissions(179.8, 30), 1), "kg de CO2 par an")\nprint("Moyenne mondiale :", round(emissions(179.8, 450), 1), "kg de CO2 par an")`,
        tests: [{ appels: [["emissions(179.8, 30)", "1.96881"], ["emissions(179.8, 450)", "29.53215"]] }],
        indices: ["kwh_an = wh_par_jour * 365 / 1000", "return kwh_an * intensite / 1000"] },
      { t: "quiz", titre: "Le bilan de Léo", intro: "Léo consomme 179,8 Wh par jour, soit environ 65,6 kWh par an : environ 2,0 kg de CO₂ avec l'électricité française, 29,5 kg avec la moyenne mondiale.",
        questions: [
          { q: "Quel usage pèse le plus lourd ?", choix: ["Les requêtes à l'assistant (4,8 Wh).", "Les images générées (6 Wh).", "La vidéo en ligne (154 Wh)."], bon: 2, expl: "L'IA ne représente qu'environ 6 % du total de Léo." },
          { q: "Léo génère 20 images par jour au lieu de 2, et remplace une heure de vidéo par une heure de lecture. Son empreinte…", choix: ["augmente.", "baisse : 156,8 Wh par jour.", "ne change pas."], bon: 1, expl: "+54 Wh pour les images, −77 Wh pour la vidéo." },
          { q: "Un service d'IA reçoit 1 milliard de requêtes texte par jour. Quelle énergie en un an ?", choix: ["Environ 87,6 kWh.", "Environ 87,6 MWh.", "Environ 87,6 GWh."], bon: 2, expl: "1 000 000 000 × 0,24 × 365 Wh, soit plus d'un million de fois l'empreinte annuelle de Léo, sans compter l'entraînement ni le matériel. L'enjeu de l'IA se situe surtout à l'échelle collective." },
        ] },
      { t: "lecon", titre: "Vers des usages plus sobres",
        texte: `<table class="donnees large"><thead><tr><th>En tant qu'utilisateur</th><th>En tant que société</th></tr></thead><tbody>
<tr><td>se demander si l'IA est utile pour la tâche (une recherche simple ou une calculatrice suffisent souvent)</td><td>mesurer et publier l'empreinte des modèles avec des méthodes communes</td></tr>
<tr><td>préférer le texte à l'image ou à la vidéo quand c'est possible</td><td>privilégier des modèles plus petits, spécialisés, adaptés à la tâche</td></tr>
<tr><td>formuler des requêtes précises pour éviter les allers-retours inutiles</td><td>installer les centres de données là où l'électricité est bas carbone et récupérer leur chaleur</td></tr>
<tr><td>garder son matériel plus longtemps</td><td>allonger la durée de vie du matériel et recycler les métaux</td></tr></tbody></table>
<aside class="retenir">L'IA n'est pas « immatérielle » : elle consomme des métaux, de l'électricité et de l'eau. Une requête isolée pèse peu, mais l'<strong>échelle</strong> (des milliards d'utilisations), l'<strong>entraînement</strong> de modèles toujours plus grands et l'<strong>effet rebond</strong> rendent son empreinte significative et croissante. La <strong>sobriété</strong> consiste à réserver l'IA aux usages qui en valent la peine.</aside>` },
      { t: "tri", titre: "Usage utile ou superflu ?", q: "Le recours à une IA générative est-il justifié, ou existe-t-il une solution plus sobre ?", categories: ["Justifié", "Solution plus sobre"],
        items: [
          { txt: "Calculer 15 × 23.", cat: 1, expl: "Une calculatrice suffit." },
          { txt: "Connaître la capitale de l'Australie.", cat: 1, expl: "Une recherche simple ou un manuel." },
          { txt: "Obtenir un retour détaillé sur la structure de sa dissertation.", cat: 0, expl: "L'IA apporte un vrai retour personnalisé, à condition de garder la main sur son travail." },
          { txt: "Générer dix variantes d'un même logo « pour voir ».", cat: 1, expl: "Superflu dans la plupart des cas : mieux vaut préciser sa demande." },
          { txt: "Traduire une notice de médicament dans une langue que l'on ne parle pas.", cat: 0, expl: "Justifié si aucun traducteur n'est disponible, mais à faire vérifier par un pharmacien : l'erreur peut être grave." },
        ] },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "Un centre de données est…", choix: ["un nuage qui stocke les données.", "une base de données en ligne.", "un bâtiment qui abrite des milliers de serveurs.", "un logiciel d'IA."], bon: 2, expl: "L'IA est matérielle." },
          { q: "1 kWh est égal à…", choix: ["10 Wh.", "1 000 Wh.", "100 Wh.", "1 000 000 Wh."], bon: 1, expl: "Kilo signifie mille." },
          { q: "L'intensité carbone de l'électricité est…", choix: ["plus faible en France que la moyenne mondiale.", "la même partout dans le monde.", "nulle pour les centres de données.", "plus élevée lorsque l'électricité est éolienne."], bon: 0, expl: "Quelques dizaines de grammes par kWh, contre 450 environ." },
          { q: "Selon l'AIE, les centres de données consommaient en 2024 environ…", choix: ["50 % de l'électricité mondiale.", "0,001 % de l'électricité mondiale.", "15 % de l'électricité mondiale.", "1,5 % de l'électricité mondiale."], bon: 3, expl: "Environ 415 TWh." },
          { q: "L'analyse du cycle de vie prend en compte…", choix: ["seulement l'électricité consommée pendant l'utilisation.", "toutes les étapes, de l'extraction des matières premières à la fin de vie.", "seulement le prix du produit.", "seulement l'eau consommée."], bon: 1, expl: "Fabrication, transport, utilisation, fin de vie." },
          { q: "Pour un même modèle, quelle tâche consomme en général le plus d'énergie ?", choix: ["Une réponse texte courte.", "Une réponse « oui ».", "La génération d'une vidéo.", "Un simple calcul."], bon: 2, expl: "Une image ou une vidéo consomme bien plus qu'un texte court." },
          { q: "L'effet rebond désigne le fait que…", choix: ["plus une technologie devient efficace, plus on l'utilise, et la consommation totale peut augmenter.", "les serveurs rebondissent en cas de panne.", "les requêtes reviennent à l'utilisateur.", "l'énergie est recyclée."], bon: 0, expl: "Le gain d'efficacité est dépassé par la hausse des usages." },
          { q: "L'eau sert dans les centres de données principalement à…", choix: ["nettoyer les écrans.", "fabriquer de l'électricité sur place.", "abreuver le personnel.", "refroidir les machines."], bon: 3, expl: "Les serveurs chauffent en permanence." },
          { q: "Un geste sobre consiste à…", choix: ["générer beaucoup d'images pour choisir la meilleure.", "utiliser une IA pour faire un calcul simple.", "utiliser l'IA quand elle apporte vraiment quelque chose et formuler des requêtes précises.", "changer de téléphone chaque année."], bon: 2, expl: "Réserver l'IA aux usages qui en valent la peine." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>L'IA est matérielle.</strong> Elle fonctionne dans des <strong>centres de données</strong> et consomme du <strong>matériel</strong>, de l'<strong>électricité</strong> et de l'<strong>eau</strong>. L'analyse du cycle de vie compte toutes les étapes.</p>
<p><strong>Unités.</strong> 1 kWh = 1 000 Wh. L'<strong>intensité carbone</strong> est la masse de CO₂ émise par kWh : environ 30 g en France, 450 g en moyenne mondiale.</p>
<p><strong>Entraînement et utilisation.</strong> L'entraînement est ponctuel mais très coûteux ; chaque requête coûte peu, mais il y en a des milliards.</p>
<p><strong>Prudence.</strong> Qu'est-ce qui est compté, et par qui ?</p>
<p><strong>À l'échelle mondiale.</strong> Environ 1,5 % de l'électricité en 2024 (415 TWh), peut-être 945 TWh en 2030. L'<strong>effet rebond</strong> fait croître la consommation totale malgré les gains d'efficacité.</p>
<p><strong>Sobriété.</strong> Réserver l'IA aux usages qui en valent la peine.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>citer les trois sources d'impact de l'IA</li><li>convertir des unités d'énergie</li><li>calculer une consommation et des émissions</li><li>expliquer l'effet rebond</li><li>lire avec prudence un chiffre d'empreinte</li><li>adopter des usages sobres</li></ul>` },
    ] },
    { id: "c14", num: 14, titre: "L'IA pour la société et les défis mondiaux", resume: "Usages utiles, double usage, solutionnisme, juger un projet",
    etapes: [
      { t: "tri", titre: "L'IA peut-elle aider le climat ?", q: "Quatre usages réels de l'IA. Qu'apporte-t-elle surtout dans chacun ?", categories: ["Rapidité", "Quantité de données traitées", "Précision des prévisions"],
        items: [
          { txt: "Prévision météo : un modèle d'IA produit des prévisions en quelques minutes au lieu de plusieurs heures de calcul.", cat: 0, expl: "Le Centre européen de prévisions météorologiques l'utilise depuis 2025, en complément de ses modèles physiques." },
          { txt: "Méthane : des IA analysent des images satellites pour repérer des fuites sur des sites pétroliers et gaziers.", cat: 1, expl: "Aucune équipe humaine ne pourrait examiner autant d'images." },
          { txt: "Électricité : des IA prévoient la production des éoliennes et des panneaux solaires pour mieux équilibrer le réseau.", cat: 2, expl: "Cette production varie avec la météo." },
          { txt: "Forêts : des IA surveillent de très grandes surfaces par satellite pour détecter la déforestation et les départs d'incendies.", cat: 1, expl: "Avec, là aussi, un gain de rapidité de détection." },
        ] },
      { t: "quiz", titre: "Le revers de la médaille",
        questions: [
          { q: "D'après le chapitre 13, quel est le « coût » climatique de ces outils ?", choix: ["Aucun.", "Leur coût en électricité, en eau et en matériel, en particulier pour l'entraînement des modèles.", "Le prix des satellites."], bon: 1, expl: "L'IA est matérielle." },
          { q: "L'IA peut-elle, à elle seule, résoudre le problème du réchauffement climatique ?", choix: ["Oui, si les modèles sont assez grands.", "Non : elle aide à mesurer, prévoir et surveiller, mais réduire les émissions exige des décisions humaines et politiques."], bon: 1, expl: "Lois, investissements, contrôles, changements de comportements." },
          { q: "Une compagnie pétrolière utilise des IA pour trouver plus vite de nouveaux gisements. Qu'en conclure ?", choix: ["Que l'IA est toujours bonne pour le climat.", "Qu'une technologie n'est ni bonne ni mauvaise en soi : tout dépend de son usage.", "Que l'IA est toujours mauvaise pour le climat."], bon: 1, expl: "Le même outil peut accélérer l'extraction d'énergies fossiles." },
        ] },
      { t: "lecon", titre: "Des usages au service de tous",
        texte: `<table class="donnees large"><thead><tr><th>Domaine</th><th>Exemples</th></tr></thead><tbody>
<tr><th>Sciences</th><td>Le programme AlphaFold prédit la forme en trois dimensions des protéines, un problème qui résistait aux biologistes depuis cinquante ans ; ses créateurs ont reçu le prix Nobel de chimie 2024. Ces structures aident à comprendre des maladies et à concevoir des médicaments.</td></tr>
<tr><th>Santé</th><td>Aide au dépistage du cancer du sein sur les mammographies, en appui des radiologues ; détection de maladies de la rétine ; aide à la découverte de nouvelles molécules.</td></tr>
<tr><th>Climat et environnement</th><td>Prévision météo, détection des fuites de méthane, suivi des forêts, des glaciers et de la biodiversité (identification d'espèces à partir de photos ou de chants d'oiseaux).</td></tr>
<tr><th>Accessibilité</th><td>Sous-titrage automatique pour les personnes sourdes ou malentendantes ; description d'images et lecture de textes pour les personnes aveugles ou malvoyantes.</td></tr>
<tr><th>Éducation</th><td>Exercices adaptés au niveau de chacun, traduction de supports pour les élèves allophones, aide aux élèves en difficulté de lecture.</td></tr>
<tr><th>Catastrophes</th><td>Cartographie rapide des dégâts après un séisme ou une inondation à partir d'images satellites, pour orienter les secours.</td></tr></tbody></table>
<aside class="savoir"><strong>Un dépistage du cancer avec l'IA.</strong> En Suède, un grand essai clinique a comparé le dépistage habituel du cancer du sein, où chaque mammographie est lue par deux radiologues, à un dépistage où l'IA trie les examens et signale les zones suspectes. Les premiers résultats, publiés en 2023, montraient que l'IA permettait de détecter au moins autant de cancers tout en réduisant de près de moitié la charge de lecture des radiologues. Les médecins gardent la décision.</aside>` },
      { t: "tri", titre: "Quel domaine ?", q: "Associe chaque usage à un domaine.", categories: ["Sciences", "Santé", "Climat et environnement", "Accessibilité", "Catastrophes"],
        items: [
          { txt: "Une application décrit oralement ce que filme la caméra du téléphone.", cat: 3, expl: "Pour les personnes aveugles ou malvoyantes." },
          { txt: "Un modèle prédit la structure de protéines.", cat: 0, expl: "C'est AlphaFold." },
          { txt: "Des images satellites sont analysées après un séisme pour repérer les bâtiments effondrés.", cat: 4, expl: "Pour orienter les secours." },
          { txt: "Une IA reconnaît les chants d'oiseaux pour suivre la biodiversité.", cat: 2, expl: "Suivi de la biodiversité." },
          { txt: "Une IA aide les radiologues à repérer des anomalies sur des radiographies.", cat: 1, expl: "En appui des médecins." },
        ] },
      { t: "lecon", titre: "Les limites et les risques",
        texte: `<p>Une technologie est à <strong>double usage</strong> lorsqu'elle peut servir aussi bien à des fins bénéfiques que nuisibles. Un modèle qui conçoit des molécules peut aider à créer des médicaments… ou des substances toxiques ; un système de reconnaissance d'images peut retrouver des personnes disparues… ou surveiller des opposants politiques.</p>
<p>La <strong>fracture numérique</strong> désigne les inégalités d'accès aux outils numériques et aux compétences pour les utiliser. Pour l'IA, elle concerne aussi les langues : la plupart des grands modèles ont été entraînés surtout sur des textes en anglais, et fonctionnent moins bien dans les langues moins présentes sur Internet.</p>
<p>La <strong>souveraineté numérique</strong> est la capacité d'un pays ou d'un groupe de pays à maîtriser ses outils numériques, ses données et ses choix technologiques, sans dépendre entièrement d'entreprises ou d'États étrangers.</p>
<aside class="retenir"><strong>Attention au solutionnisme.</strong> Le <strong>solutionnisme</strong> consiste à croire que la technologie peut résoudre à elle seule des problèmes qui sont aussi sociaux, politiques ou économiques. Une IA peut repérer une fuite de méthane ; ce sont des lois, des contrôles et des investissements qui la font réparer. Avant de lancer un projet d'IA, il faut toujours se demander : <strong>l'IA est-elle la meilleure réponse, et pour qui ?</strong></aside>` },
      { t: "tri", titre: "Double usage", q: "Chaque technologie a deux visages. Classe ces usages.", categories: ["Usage bénéfique", "Usage nuisible"],
        items: [
          { txt: "Reconnaissance faciale : retrouver un enfant disparu.", cat: 0, expl: "La même technique peut aussi surveiller." },
          { txt: "Reconnaissance faciale : identifier des manifestants.", cat: 1, expl: "Une surveillance des opinions." },
          { txt: "Clonage de la voix : redonner une voix à une personne qui l'a perdue à cause d'une maladie.", cat: 0, expl: "Un usage d'accessibilité." },
          { txt: "Clonage de la voix : imiter un proche pour une arnaque.", cat: 1, expl: "Voir le chapitre 9." },
          { txt: "Génération de textes : aider à rédiger ou à traduire.", cat: 0, expl: "Un assistant d'écriture." },
          { txt: "Génération de textes : produire en masse de faux avis.", cat: 1, expl: "De la désinformation." },
        ] },
      { t: "quiz", titre: "Une langue oubliée", intro: "Un assistant conversationnel fonctionne très bien en anglais et en français, mais commet beaucoup d'erreurs en occitan ou en breton.",
        questions: [
          { q: "Comment l'expliquer ?", choix: ["Ces langues sont trop difficiles.", "Le modèle a été entraîné sur très peu de textes dans ces langues : il y généralise mal.", "Les ordinateurs ne peuvent pas les écrire."], bon: 1, expl: "Des données peu représentées (chapitre 2), donc une mauvaise généralisation (chapitre 3)." },
          { q: "En quoi est-ce une forme de fracture numérique ?", choix: ["Les locuteurs de ces langues ont moins accès à des outils performants, ce qui renforce les inégalités.", "Leurs ordinateurs sont plus lents.", "Ce n'en est pas une."], bon: 0, expl: "Cela peut aussi fragiliser ces langues." },
          { q: "Quelle solution améliorerait la situation ?", choix: ["Interdire ces langues en ligne.", "Constituer et partager des corpus de textes et d'enregistrements, puis entraîner ou adapter des modèles spécialisés.", "Traduire tout en anglais."], bon: 1, expl: "Avec des associations, des universités, des collectivités." },
        ] },
      { t: "quiz", titre: "Solutionnisme ?", intro: "Une entreprise propose une application d'IA qui « résout le harcèlement scolaire » en analysant automatiquement tous les messages des élèves.",
        questions: [
          { q: "Pourquoi cette promesse relève-t-elle du solutionnisme ?", choix: ["Parce que l'application est payante.", "Parce que le harcèlement est un problème humain et social : il ne suffit pas de le détecter pour le faire cesser.", "Parce que l'IA ne sait pas lire."], bon: 1, expl: "Il se joue aussi hors des messages." },
          { q: "Quel risque ce projet présente-t-il pour les élèves ?", choix: ["Une surveillance permanente de leurs conversations privées, et des erreurs qui accusent à tort ou rassurent à tort.", "Une batterie qui se vide plus vite.", "Aucun."], bon: 0, expl: "Faux positifs, faux négatifs, atteinte à la confiance, données très sensibles exposées." },
          { q: "Quelles réponses restent indispensables ?", choix: ["Une application plus puissante.", "Des adultes formés et disponibles, des procédures claires de signalement, la prise en charge des victimes et des auteurs, le 3018.", "Supprimer les téléphones."], bon: 1, expl: "Et l'éducation à l'empathie et au numérique." },
        ] },
      { t: "lecon", titre: "Une grille pour juger un projet d'IA",
        texte: `<table class="donnees large"><thead><tr><th>Critère</th><th>Questions à se poser</th></tr></thead><tbody>
<tr><th>Utilité</th><td>Quel problème réel résout-il ? Pour qui ? Existe-t-il une solution plus simple, sans IA ?</td></tr>
<tr><th>Données</th><td>D'où viennent les données ? Sont-elles de qualité, représentatives, collectées légalement ?</td></tr>
<tr><th>Équité</th><td>Le système peut-il défavoriser certains groupes ? Comment le vérifier ?</td></tr>
<tr><th>Vie privée</th><td>Quelles données personnelles sont utilisées ? Sont-elles minimisées et protégées ?</td></tr>
<tr><th>Environnement</th><td>Quelle est son empreinte ? Est-elle justifiée par le bénéfice attendu ?</td></tr>
<tr><th>Contrôle humain</th><td>Qui décide au final ? Peut-on contester une décision ?</td></tr>
<tr><th>Risques d'abus</th><td>Le système pourrait-il être détourné pour nuire ?</td></tr></tbody></table>
<aside class="retenir">L'IA peut contribuer à de grands défis : santé, climat, sciences, accessibilité. Mais elle n'est qu'un outil : son utilité dépend des <strong>données</strong>, des <strong>choix humains</strong>, du <strong>cadre</strong> dans lequel elle est utilisée et de son <strong>coût</strong> environnemental.</aside>` },
      { t: "tri", titre: "Quel critère ?", q: "Une mairie veut installer des caméras « intelligentes » pour repérer automatiquement les « comportements suspects » et prévenir la police. À quel critère de la grille chaque remarque se rattache-t-elle ?",
        categories: ["Utilité", "Équité", "Vie privée", "Contrôle humain"],
        items: [
          { txt: "La notion de « comportement suspect » est floue, et l'efficacité de ces dispositifs est discutée.", cat: 0, expl: "Quel problème réel est résolu ?" },
          { txt: "Le système risque de cibler davantage les jeunes, les personnes sans abri ou les minorités.", cat: 1, expl: "Selon ses données d'entraînement." },
          { txt: "Tous les passants sont filmés et analysés en continu.", cat: 2, expl: "Des données personnelles, voire biométriques." },
          { txt: "Qui décide d'une intervention de police, et sur quelle base ?", cat: 3, expl: "La décision finale doit revenir à un humain." },
        ],
        expl: "Ce projet relève du RGPD, et le règlement européen sur l'IA interdit la surveillance biométrique en temps réel dans l'espace public par la police, sauf exceptions très encadrées. D'autres réponses existent : présence humaine, meilleur éclairage, caméras classiques consultées seulement en cas d'incident." },
      { t: "lecon", titre: "Imaginer un projet d'IA responsable",
        texte: `<p>Par groupes de trois ou quatre, imaginez un projet d'IA qui répond à un défi de votre lycée, de votre ville ou de votre région : environnement, santé, transports, accessibilité, vie scolaire… Il ne s'agit pas de le programmer, mais de le concevoir de façon réaliste et responsable, puis de le présenter en 4 minutes.</p>
<p><strong>La fiche projet</strong></p>
<ul><li>le nom du projet ;</li><li>le défi : quel problème, pour qui ?</li><li>ce que fait l'IA : classer, prédire, générer, recommander…</li><li>les données nécessaires, et leur origine ;</li><li>le type d'apprentissage (chapitre 3) ;</li><li>les risques (biais, vie privée, erreurs, abus) et les parades ;</li><li>l'empreinte environnementale et sa justification ;</li><li>qui décide au final ?</li><li>existe-t-il une solution sans IA ? Pourquoi la vôtre est-elle meilleure ?</li></ul>
<p>Chaque groupe examine ensuite le projet d'un autre groupe avec la grille : un point fort et une amélioration possible pour chaque critère.</p>` },
      { t: "quiz", titre: "QCM d'auto-évaluation",
        questions: [
          { q: "AlphaFold est un programme d'IA qui…", choix: ["joue au go.", "prédit la structure en 3 dimensions des protéines.", "génère des images.", "traduit des textes."], bon: 1, expl: "Un problème vieux de cinquante ans." },
          { q: "Les créateurs d'AlphaFold ont reçu en 2024…", choix: ["le prix Nobel de chimie.", "le prix Nobel de littérature.", "la médaille Fields.", "un Oscar."], bon: 0, expl: "Partagé avec un chercheur en conception de protéines." },
          { q: "Une technologie à double usage…", choix: ["est utilisée deux fois par jour.", "coûte deux fois plus cher.", "fonctionne sur deux ordinateurs.", "peut servir à des fins bénéfiques comme nuisibles."], bon: 3, expl: "Tout dépend de son usage." },
          { q: "La fracture numérique désigne…", choix: ["une panne d'ordinateur.", "les inégalités d'accès aux outils et aux compétences numériques.", "un écran cassé.", "la séparation entre deux réseaux."], bon: 1, expl: "Pour l'IA, elle concerne aussi les langues." },
          { q: "La souveraineté numérique, c'est…", choix: ["la capacité à maîtriser ses outils, ses données et ses choix technologiques.", "l'interdiction de tout logiciel étranger.", "un réseau social national.", "une monnaie numérique."], bon: 0, expl: "Sans dépendre entièrement d'autres acteurs." },
          { q: "Le solutionnisme consiste à…", choix: ["résoudre des équations.", "refuser toute technologie.", "croire que la technologie peut résoudre seule des problèmes aussi sociaux ou politiques.", "vendre des solutions informatiques."], bon: 2, expl: "L'IA est-elle la meilleure réponse, et pour qui ?" },
          { q: "Dans un dépistage du cancer avec l'IA, le diagnostic final est…", choix: ["toujours posé par l'IA seule.", "posé par le patient.", "tiré au sort.", "posé par les médecins."], bon: 3, expl: "L'IA aide à mieux répartir l'attention humaine." },
          { q: "Avant de lancer un projet d'IA, la première question à se poser est…", choix: ["« Quel est le plus gros modèle disponible ? »", "« Quel problème réel résout-il, et existe-t-il une solution plus simple ? »", "« Combien de personnes pourra-t-on surveiller ? »", "« Quelle couleur pour le logo ? »"], bon: 1, expl: "C'est le critère d'utilité." },
          { q: "L'IA, face aux grands défis mondiaux, est…", choix: ["un outil utile dont l'intérêt dépend des données, des choix humains et du cadre.", "une solution miracle à tous les problèmes.", "toujours nuisible.", "sans aucun effet."], bon: 0, expl: "Un outil, à juger sur l'ensemble des critères." },
        ] },
      { t: "lecon", synthese: true, titre: "Fiche synthèse",
        texte: `<p><strong>Des usages utiles.</strong> Sciences (AlphaFold), santé (aide au dépistage), climat et environnement, accessibilité, éducation, catastrophes.</p>
<p><strong>Double usage.</strong> Une même technologie peut servir à des fins bénéfiques ou nuisibles.</p>
<p><strong>Fracture numérique.</strong> Inégalités d'accès aux outils et aux compétences, y compris entre les langues.</p>
<p><strong>Souveraineté numérique.</strong> Maîtriser ses outils, ses données et ses choix technologiques.</p>
<p><strong>Solutionnisme.</strong> Croire que la technologie résout seule des problèmes sociaux ou politiques.</p>
<p><strong>La grille.</strong> Utilité, données, équité, vie privée, environnement, contrôle humain, risques d'abus.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>citer des usages de l'IA au service de la société</li><li>expliquer le double usage</li><li>définir fracture et souveraineté numériques</li><li>reconnaître le solutionnisme</li><li>juger un projet d'IA avec la grille</li></ul>` },
    ] },
  ]
}];

const DEFIS = { id: "defis", titre: "Défis", resume: "", etapes: [] };
