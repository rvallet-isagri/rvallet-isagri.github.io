// ==UserScript==
// @name         Ajustements TFS
// @namespace    rvallet.isagri.fr
// @version      1.1
// @description  Effectue des ajustements dans TFS
// @author       Romain Vallet
// @match        http://tfs:8080/tfs/*
// @match        https://azdo.groupeisagri.com/tfs/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(`
        .swimlane-collapsed .swimlane-header-title {
            overflow: hidden !important
        }
        .swimlane-header-title {
            overflow: visible !important;
            max-width: max-content !important;
            min-width: 10em;
        }
    `);
})();