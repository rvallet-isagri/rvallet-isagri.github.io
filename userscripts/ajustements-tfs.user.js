// ==UserScript==
// @name         Ajustements Azure DevOps
// @namespace    rvallet.isagri.fr
// @version      1.3
// @description  Effectue des ajustements dans Azure DevOps
// @author       Romain Vallet
// @match        https://dev.azure.com/*
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

const wiTypes = {
    "Feature": "ft",
    "User Story": "us",
    "Enabler": "en",
    "Enabler Story": "es",
    "Epic": "ep",
    "Bug": "bg",
};

(function() {
    'use strict';
    GM_addStyle(`
        .kanban-board-row.expanded .kanban-board-row-header .text-ellipsis
        {
            overflow: visible !important;
            max-width: max-content !important;
            min-width: 10em;
        }
    `);

    const observerOptions = {
        childList: true,
        subtree: true
    };

    let observer = new MutationObserver(mutations => {
        observer.disconnect();
        addKlaxoonCopyButtons();
        observer.observe(document, observerOptions);
    });

    observer.observe(document, observerOptions);

})();

// Ajoute les boutons pour copier dans le presse-papier le titre du work item, à coller dans une idée Klaxoon
function addKlaxoonCopyButtons() {
    let parents = document.querySelectorAll('.work-item-form-header .secondary-text div:first-child:not(.has-klaxoon-button)');

    for (let parent of parents) {
        let wiId = parent.lastChild?.textContent?.replace(/\D/g, "");
        let klaxoonCopyButton = GM_addElement(parent, "button", {class: "bolt-button icon-only", style: "padding: 0 3px; margin-left: 5px", title: "Copier en tant qu'idée Klaxoon"});
        GM_addElement(klaxoonCopyButton, "span", {class:"fluent-icons-enabled ms-Icon--Copy"});
        klaxoonCopyButton.addEventListener("click", () => {
            let cbText = "";
            let ariaLabelled = parent.querySelector('[aria-label]');
            let wiType = wiTypes[ariaLabelled.ariaLabel];
            if (wiType) {
                cbText += "https://www.kantum.com/isa/co2/" + wiType + ".php?id=" + wiId + "\n";
            }
            let titleInput = document.querySelector('[aria-label="Title field"]');
            if (titleInput) {
                cbText += titleInput.value;
            }
            if (cbText.length) {
                GM_setClipboard(cbText);
            }
        });
        parent.classList.add("has-klaxoon-button");
    }
}