# Synapse — comprendre l'IA en SNT

Site statique d'entraînement pour la Seconde, adapté du livret « L'intelligence artificielle en SNT » :
leçons courtes, questions, classements, manipulations interactives et exercices Python corrigés
automatiquement (Python réel dans le navigateur, grâce à Pyodide). Aucun serveur, aucun compte,
aucune donnée transmise. Le moteur est celui du site Mue (stexsnt/python-lycee).

Les évaluations du livret et leurs corrigés ne sont volontairement pas publiés sur le site.

## Lexique et fiches de révision

`js/lexique.js` contient les termes du cours (terme, définition, chapitre). La page Lexique les affiche avec
une recherche et les propose en fiches recto verso, avec une répétition espacée à cinq boîtes. Les fiches
d'un chapitre s'ouvrent dès qu'une étape y est validée. Ajouter une ligne au fichier crée un terme et sa fiche.

## État

Les quatre parties sont complètes : 14 chapitres, 237 étapes. Les évaluations du livret
et leurs corrigés ne sont pas publiés.

## Mise en ligne sur GitHub Pages

Déposer le contenu de ce dossier à la racine d'un dépôt public, puis, dans Settings > Pages,
choisir « Deploy from a branch », branche `main`, dossier `/ (root)`.

## Modifier le contenu

Tout le contenu est dans `js/contenu.js` ; le format de chaque type d'étape est décrit en tête de
fichier. Une nouvelle étape s'ajoute à la fin, ou au milieu avec `numero: n` (règle décrite en tête de `js/contenu.js`). Avant de publier :

    cd tests && npm install pyodide && node verifier.js

## Suivi de classe

Dans sa page Profil, l'élève génère un « code pour mon professeur ». La page `prof.html`
(lien « Espace professeur ») range les codes collés par classe (un onglet par classe, comparaison, progrès, export CSV).

## Confort d'usage

- `js/confort.js` (identique sur Mue, Synapse, Périple et Sésame) : message plus clair pendant le chargement de Python,
  bouton « Réessayer » en cas d'échec, et rappel de sauvegarde quand huit étapes ont été validées depuis la dernière sauvegarde.
- `manifest.webmanifest` et `icones/` : le site peut être installé sur l'écran d'accueil d'un téléphone ou d'une tablette.
- Toutes les polices sont dans `polices/` : le site n'appelle aucun service externe.
- Le pied de page renvoie vers le portail https://stexsnt.github.io/ et les trois autres sites.
- `js/prof-plus.js` et `js/qrcode.min.js` (espace professeur) : QR code du lien de classe, à projeter, et impression du tableau de classe.
- Sur téléphone, le profil propose « Envoyer mon code » par le menu de partage.
- Python (Pyodide) est chargé en priorité depuis `https://stexsnt.github.io/pyodide/`, copie partagée par les quatre sites et rangée dans un cache commun : un élève ne le télécharge qu'une fois. Le dossier `pyodide/` du dépôt reste la copie de secours.
- Chaque étape a un numéro stable (voir `numeros` dans `js/bilan.js`) : on peut insérer une étape au milieu d'un chapitre sans décaler la progression des élèves ni les codes déjà reçus par le professeur.
- Python ne démarre que lorsqu'une page affiche un éditeur de code ou lance une exécution (`Moteur.preparer` dans `js/moteur.js`) : les leçons et les questions s'ouvrent sans lui. Le service worker continue de le mettre en cache en arrière-plan pour le mode hors connexion.
- `documents/livret-eleve.pdf` : le livret de l'élève, lié depuis l'accueil et le pied de page. Il ne contient aucun corrigé. Le guide de l'enseignant, qui contient les réponses, n'est volontairement pas publié. Remplacer ce fichier quand le livret est mis à jour.

## Publication automatique

Le site en ligne est servi depuis la branche `gh-pages`. À chaque envoi sur `main`, `.github/workflows/publier.yml` lance
`tests/verifier.js`, puis recopie `main` sur `gh-pages`. Si une vérification échoue, rien n'est publié : le détail
se lit dans l'onglet « Actions » du dépôt. Une modification faite sur GitHub avec l'icône crayon est donc publiée toute seule.
- `documents/guide-prise-en-main.pdf` : guide de prise en main pour l'enseignant, lié depuis l'espace professeur et le pied de page. Il est tiré du guide complet, dont on retire le contenu intégral et tous les corrigés ; le guide complet ne doit pas être publié.
