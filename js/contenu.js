/* ============================================================
   CONTENU PÉDAGOGIQUE — adapté du livret « L'intelligence artificielle en SNT ».
   Les évaluations du livret et leurs corrigés ne figurent PAS sur le site.

   Types d'étapes :
     lecon   : { t, titre, texte (HTML), code? (exemple exécutable), synthese? }
     qcm     : { t, titre?, q, doc? (HTML), code?, choix:[...], bon | bons:[...], expl, retours?:[...] }
     tri     : { t, titre, q, doc?, categories:[...], items:[{ txt, cat, expl }], expl? }
     ordre   : { t, titre?, q, lignes:[...dans le bon ordre], attendu?, texte?: true, expl? }
               (texte: true = phrases à ranger, validées par leur ordre ; sinon programme exécuté)
     quiz    : { t, titre, intro?, doc?, code?, widget?: "knn" | "pixels" | "perceptron", questions:[{ q, choix, bon, expl }] }
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
    { id: "c5", num: 5, titre: "L'IA dans notre quotidien", resume: "Bientôt disponible", etapes: [] },
    { id: "c6", num: 6, titre: "Bien utiliser l'IA pour apprendre", resume: "Bientôt disponible", etapes: [] },
    { id: "c7", num: 7, titre: "Vérifier et valider les productions de l'IA", resume: "Bientôt disponible", etapes: [] },
  ]
},
{
  id: "p3", titre: "Éthique et responsabilité", sous: "Développer un esprit critique face aux enjeux éthiques et juridiques",
  chapitres: [
    { id: "c8", num: 8, titre: "Biais et discriminations algorithmiques", resume: "Bientôt disponible", etapes: [] },
    { id: "c9", num: 9, titre: "Désinformation et contenus générés", resume: "Bientôt disponible", etapes: [] },
    { id: "c10", num: 10, titre: "Vie privée et données personnelles", resume: "Bientôt disponible", etapes: [] },
    { id: "c11", num: 11, titre: "Responsabilité et cadre juridique", resume: "Bientôt disponible", etapes: [] },
  ]
},
{
  id: "p4", titre: "Impacts social et environnemental", sous: "Comprendre les effets de l'IA sur la société, le travail et la planète",
  chapitres: [
    { id: "c12", num: 12, titre: "L'IA et le monde du travail", resume: "Bientôt disponible", etapes: [] },
    { id: "c13", num: 13, titre: "L'empreinte écologique de l'IA", resume: "Bientôt disponible", etapes: [] },
    { id: "c14", num: 14, titre: "L'IA pour la société et les défis mondiaux", resume: "Bientôt disponible", etapes: [] },
  ]
}];

const DEFIS = { id: "defis", titre: "Défis", resume: "", etapes: [] };
