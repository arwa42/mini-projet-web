
// Fonctions de contrôle demandées dans le sujet.
function messageErreur(message, champ) {
  alert(message);
  if (champ) {
    champ.focus();
    if (typeof champ.select === "function") champ.select();
  }
}

function verif1() {
  const categorie = document.getElementById("categorie");
  const description = document.getElementById("description");
  const prix = document.getElementById("prix");
  const tailles = document.getElementsByName("taille");

  if (categorie.value === "") {
    messageErreur("Veuillez sélectionner une catégorie.", categorie);
    return false;
  }

  const desc = description.value.trim();
  if (desc.length < 10 || desc.length > 100) {
    messageErreur("La description doit contenir entre 10 et 100 caractères.", description);
    return false;
  }

  // Le premier et le dernier caractère doivent être des lettres.
  const lettres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÄÇÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜŸàáâäçèéêëìíîïòóôöùúûüÿ";
  if (lettres.indexOf(desc.charAt(0)) === -1 ||
      lettres.indexOf(desc.charAt(desc.length - 1)) === -1) {
    messageErreur("La description doit commencer et se terminer par une lettre.", description);
    return false;
  }

  let tailleChoisie = false;
  for (let i = 0; i < tailles.length; i++) {
    if (tailles[i].checked) tailleChoisie = true;
  }
  if (!tailleChoisie) {
    alert("Veuillez sélectionner une taille.");
    return false;
  }

  const montant = Number(prix.value);
  if (prix.value.trim() === "" || !Number.isFinite(montant) || montant < 100 || montant > 2000) {
    messageErreur("Le prix de location doit être un nombre entre 100 et 2000 DT.", prix);
    return false;
  }

  alert("Habit ajouté avec succès !");
  document.getElementById("formAjout").reset();
  return false; // Site statique : aucune base de données n'est connectée.
}

function verif2() {
  const code = document.getElementById("code");
  const cin = document.getElementById("cin");
  const duree = document.getElementById("duree");

  const codeHabit = Number(code.value);
  if (code.value.trim() === "" || !Number.isInteger(codeHabit) || codeHabit < 1) {
    messageErreur("Le code habit doit être un entier supérieur ou égal à 1.", code);
    return false;
  }

  // Huit chiffres exactement, le premier étant 0 ou 1.
  const numeroCin = cin.value.trim();
  if (numeroCin.length !== 8 ||
      (numeroCin.charAt(0) !== "0" && numeroCin.charAt(0) !== "1") ||
      !estComposeDeChiffres(numeroCin)) {
    messageErreur("La CIN doit être une chaîne de 8 chiffres qui commence par 0 ou 1.", cin);
    return false;
  }

  const nbJours = Number(duree.value);
  if (duree.value.trim() === "" || !Number.isInteger(nbJours) || nbJours < 1 || nbJours > 4) {
    messageErreur("La durée de location doit être un chiffre entre 1 et 4.", duree);
    return false;
  }

  alert("Demande de location enregistrée avec succès !");
  document.getElementById("formLocation").reset();
  return false; // Site statique : aucune base de données n'est connectée.
}

function estComposeDeChiffres(chaine) {
  for (let i = 0; i < chaine.length; i++) {
    if (chaine.charAt(i) < "0" || chaine.charAt(i) > "9") return false;
  }
  return true;
}