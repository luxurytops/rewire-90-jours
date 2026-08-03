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
