// ==UserScript==
// @name         Ajustements Azure DevOps
// @namespace    rvallet.isagri.fr
// @version      1.2
// @description  Effectue des ajustements dans Azure DevOps
// @author       Romain Vallet
// @match        https://dev.azure.com/*
// @grant        GM_addStyle
// ==/UserScript==

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
})();