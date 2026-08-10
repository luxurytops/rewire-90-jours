"use strict";

document.documentElement.dataset.jsReady = "true";

const diagnosticForm = document.querySelector("#rewireDiagnostic");
const diagnosticResult = document.querySelector("#diagnosticResult");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const diagnosticStatus = document.querySelector("#diagnosticStatus");

function interpretationFor(score) {
  if (score <= 6) {
    return {
      title: "Des bases déjà présentes",
      text: "Vos réponses indiquent peu de freins récurrents. Identifiez une habitude utile et choisissez une preuve simple pour continuer à l’installer."
    };
  }

  if (score <= 14) {
    return {
      title: "Des schémas à observer",
      text: "Certaines situations semblent freiner votre passage à l’action. Commencez par repérer un déclencheur récurrent et l’action concrète que vous souhaitez lui substituer."
    };
  }

  return {
    title: "Un besoin de démarche structurée",
    text: "Vos réponses font apparaître plusieurs freins récurrents. Une progression étape par étape — observer, interrompre, construire puis répéter — peut vous aider à transformer une intention en comportement observable."
  };
}

function showDiagnosticResult(event) {
  event.preventDefault();
  if (!diagnosticForm || !diagnosticResult || !resultTitle || !resultText || !diagnosticStatus) return;

  if (!diagnosticForm.reportValidity()) {
    diagnosticStatus.textContent = "Répondez aux six questions pour afficher votre orientation.";
    return;
  }

  const answers = new FormData(diagnosticForm);
  const score = [...answers.values()].reduce((total, value) => total + Number(value), 0);
  const interpretation = interpretationFor(score);

  resultTitle.textContent = interpretation.title;
  resultText.textContent = interpretation.text;
  diagnosticStatus.textContent = "Votre orientation est prête. Aucune réponse n’a été enregistrée.";
  diagnosticResult.hidden = false;
  diagnosticResult.focus();
}

if (diagnosticForm) {
  diagnosticForm.addEventListener("submit", showDiagnosticResult);
}

const methodsList = document.querySelector("#methodsList");
const methodsStatus = document.querySelector("#methodsStatus");

function setMethodsStatus(message, state) {
  if (!methodsStatus || !methodsList) return;
  methodsStatus.textContent = message;
  methodsStatus.className = `data-status is-${state}`;
  methodsList.setAttribute("aria-busy", String(state === "loading"));
}

function createMethodCard(method) {
  const article = document.createElement("article");
  const number = document.createElement("b");
  const title = document.createElement("h3");
  const description = document.createElement("p");

  article.dataset.methodId = method.id;
  number.textContent = method.number;
  title.textContent = method.title;
  description.textContent = method.description;
  article.append(number, title, description);
  return article;
}

function isValidMethod(method) {
  return method
    && typeof method.id === "string"
    && typeof method.number === "string"
    && typeof method.title === "string"
    && typeof method.description === "string";
}

function renderMethods(methods) {
  if (!methodsList) return;
  methodsList.replaceChildren();

  if (methods.length === 0) {
    setMethodsStatus("Aucun contenu n’est disponible pour le moment.", "empty");
    return;
  }

  const fragment = document.createDocumentFragment();
  methods.forEach((method) => fragment.append(createMethodCard(method)));
  methodsList.append(fragment);
  setMethodsStatus(`${methods.length} mouvements chargés avec succès.`, "success");
}

async function loadMethods() {
  if (!methodsList || !methodsStatus) return;
  setMethodsStatus("Chargement du contenu…", "loading");

  const testState = new URLSearchParams(window.location.search).get("data-state");
  if (testState === "loading") return;

  const dataPath = testState === "error" ? "./data/fichier-absent.json" : "./data/data.json";

  try {
    const response = await fetch(dataPath);
    if (!response.ok) throw new Error(`Réponse HTTP ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data.methods)) throw new TypeError("La collection methods doit être un tableau.");

    const methods = testState === "empty" ? [] : data.methods;
    if (!methods.every(isValidMethod)) throw new TypeError("Une méthode contient des champs absents ou invalides.");
    renderMethods(methods);
  } catch (error) {
    methodsList.replaceChildren();
    setMethodsStatus("Le contenu n’a pas pu être chargé. Le reste de la page demeure disponible.", "error");
    console.error("Échec du chargement des méthodes REWIRE :", error.message);
  }
}

loadMethods();

const pwaStatus = document.querySelector("#pwaStatus");

function showPwaStatus(message) {
  if (!pwaStatus) return;
  pwaStatus.textContent = message;
  pwaStatus.hidden = false;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    showPwaStatus("Préparation des ressources hors connexion…");

    try {
      await navigator.serviceWorker.register("./service-worker.js", { scope: "./" });
      await navigator.serviceWorker.ready;
      showPwaStatus("Ressources hors connexion préparées sur cet appareil.");
    } catch (error) {
      showPwaStatus("Le mode hors connexion n’est pas disponible pour le moment.");
      console.error("Échec de l’enregistrement du service worker :", error.message);
    }
  });
}
