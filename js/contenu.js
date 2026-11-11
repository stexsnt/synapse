/* ============================================================
   CONTENU PÉDAGOGIQUE — adapté du livret « L'intelligence artificielle en SNT ».
   Les évaluations du livret et leurs corrigés ne figurent PAS sur le site.

   Types d'étapes :
     lecon   : { t, titre, texte (HTML), code? (exemple exécutable), synthese? }
     qcm     : { t, titre?, q, doc? (HTML), code?, choix:[...], bon | bons:[...], expl, retours?:[...] }
     tri     : { t, titre, q, doc?, categories:[...], items:[{ txt, cat, expl }], expl? }
     ordre   : { t, titre?, q, lignes:[...dans le bon ordre], attendu?, texte?: true, expl? }
               (texte: true = phrases à ranger, validées par leur ordre ; sinon programme exécuté)
     quiz    : { t, titre, intro?, doc?, code?, widget?: "knn", questions:[{ q, choix, bon, expl }] }
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
  { id: "c2", num: 2, titre: "Les données, matière première de l'IA", resume: "Bientôt disponible", etapes: [] },
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
        intro: "Déplace l'insecte inconnu (l'étoile) et change la valeur de k. Les traits relient l'insecte à ses k plus proches voisins.",
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
  { id: "c4", num: 4, titre: "Les réseaux de neurones, cerveaux artificiels ?", resume: "Bientôt disponible", etapes: [] },
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
