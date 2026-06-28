/* =============================================================================
 * dpia-badges.js
 * Bollini di conformità GDPR/AI Act per il portale Acerio (acerio.vercel.app)
 * 
 * Generato automaticamente da DPIA Studio il 2026-06-16 — aggiornato il 2026-06-25
 * 145 app interne + 0 servizi terzi
 * 
 * Ogni link nel portale che corrisponde a un'app classificata riceve un piccolo
 * badge colorato accanto al nome, indicante il cluster di rischio.
 * 
 * Cluster:
 *   A = Profilazione studenti (ALTO)
 *   B = Monitoraggio comportamentale (ALTO-MEDIO)
 *   C = IA generativa (MEDIO)
 *   D = Senza dati personali (MINIMO)
 *   E = Raccolta dati studenti (BASSO-MEDIO)
 *   F = Strumenti professionali docenti (BASSO)
 * ============================================================================= */

(function() {
  'use strict';
  
  const URL_MAP = {
  "https://sondaggiostudenti.vercel.app": {
    "cluster": "D",
    "name": "TI ASCOLTO!"
  },
  "https://calibro.neocities.org": {
    "cluster": "F",
    "name": "Calibro"
  },
  "https://pattodigitale.neocities.org": {
    "cluster": "D",
    "name": "Patto Digitale di Famiglia"
  },
  "https://genitori.neocities.org": {
    "cluster": "D",
    "name": "Guida per Genitori"
  },
  "https://scuolaipad.neocities.org": {
    "cluster": "D",
    "name": "Scuola Digitale"
  },
  "https://chatbotai.neocities.org": {
    "cluster": "D",
    "name": "Didattica e AI"
  },
  "https://ineai.neocities.org": {
    "cluster": "D",
    "name": "IN + IA"
  },
  "https://guglielmoildentone.neocities.org": {
    "cluster": "D",
    "name": "L'Occhio Critico"
  },
  "https://manipolazione.neocities.org": {
    "cluster": "D",
    "name": "Riconosci la Manipolazione"
  },
  "https://socialschool.neocities.org": {
    "cluster": "D",
    "name": "Social sotto la Lente"
  },
  "https://comportamentismo.neocities.org": {
    "cluster": "E",
    "name": "Sei un Piccione?"
  },
  "https://aiconsumi.vercel.app": {
    "cluster": "D",
    "name": "Quanto consuma l'AI?"
  },
  "https://sicofante.vercel.app": {
    "cluster": "D",
    "name": "Il Sicofante Digitale"
  },
  "https://famiglia-accorti.vercel.app": {
    "cluster": "D",
    "name": "Famiglia Accorti"
  },
  "https://socialguide.neocities.org": {
    "cluster": "D",
    "name": "Navigare Sicuri"
  },
  "https://pizzeriagoogle.neocities.org": {
    "cluster": "D",
    "name": "Pizzeria Google"
  },
  "https://securepassword.neocities.org": {
    "cluster": "D",
    "name": "Generatore di Password"
  },
  "https://cyberbullismo.neocities.org": {
    "cluster": "D",
    "name": "Stop Cyberbullismo"
  },
  "https://missionedigitale.neocities.org": {
    "cluster": "D",
    "name": "Indagine Digitale 2026"
  },
  "https://cyberescape.neocities.org": {
    "cluster": "D",
    "name": "CyberEscape"
  },
  "https://truffa-ballerina.vercel.app": {
    "cluster": "D",
    "name": "Il Voto che Ruba"
  },
  "https://attacchinformatici.neocities.org": {
    "cluster": "D",
    "name": "Cyber Sentinel"
  },
  "https://polizia-postale.vercel.app": {
    "cluster": "D",
    "name": "Commissariato Digitale"
  },
  "https://mattoncini.neocities.org": {
    "cluster": "D",
    "name": "I Mattoncini del Testo"
  },
  "https://errore.neocities.org": {
    "cluster": "D",
    "name": "Trasformiamo l'Errore in Opportunita"
  },
  "https://fattopinione.vercel.app": {
    "cluster": "D",
    "name": "Fatto o Opinione?"
  },
  "https://scrivere.neocities.org": {
    "cluster": "D",
    "name": "Le 3 Forme del Testo"
  },
  "https://laboratorioscrittura2.neocities.org": {
    "cluster": "D",
    "name": "Testo Descrittivo"
  },
  "https://immagine.neocities.org": {
    "cluster": "D",
    "name": "Scrivere con le Immagini"
  },
  "https://insegnareapensare.vercel.app": {
    "cluster": "D",
    "name": "La Bottega dell'Argomentazione"
  },
  "https://laboratorioscrittura.neocities.org": {
    "cluster": "D",
    "name": "Testo Argomentativo"
  },
  "https://argomentor.vercel.app": {
    "cluster": "D",
    "name": "ArgoMentor"
  },
  "https://ascolto.neocities.org": {
    "cluster": "D",
    "name": "Scrivere dall'Ascolto"
  },
  "https://mentalcoach.neocities.org": {
    "cluster": "D",
    "name": "Mental Coaching"
  },
  "https://shorts-video-acerio.vercel.app": {
    "cluster": "D",
    "name": "Video Shorts"
  },
  "https://schooldebate.neocities.org": {
    "cluster": "D",
    "name": "Debate in Classe"
  },
  "https://laboscrittura.vercel.app": {
    "cluster": "E",
    "name": "BottegaScrivi"
  },
  "https://tracciatema.neocities.org": {
    "cluster": "D",
    "name": "ScriviMeglio"
  },
  "https://fakehunter.neocities.org": {
    "cluster": "D",
    "name": "Fake Hunter"
  },
  "https://truffe.neocities.org": {
    "cluster": "D",
    "name": "Truffe & Phishing"
  },
  "https://stampa3d.neocities.org": {
    "cluster": "D",
    "name": "Stampa 3D"
  },
  "https://keyboardmac.neocities.org": {
    "cluster": "D",
    "name": "Scorciatoie Mac"
  },
  "https://glossarioinfo.neocities.org": {
    "cluster": "D",
    "name": "Glossario Digitale"
  },
  "https://typegame.neocities.org": {
    "cluster": "D",
    "name": "Sfida di Videoscrittura"
  },
  "https://tastiera.neocities.org": {
    "cluster": "D",
    "name": "Allenamento Tastiera"
  },
  "https://pesodigitale.neocities.org": {
    "cluster": "D",
    "name": "La Scala Digitale"
  },
  "https://barscuola.neocities.org": {
    "cluster": "D",
    "name": "Bar della Scuola"
  },
  "https://genalfa.neocities.org": {
    "cluster": "D",
    "name": "Algoritmi e Reti Neurali"
  },
  "https://escapecity.vercel.app": {
    "cluster": "D",
    "name": "Guarda Due Volte"
  },
  "https://geografiamaps.neocities.org": {
    "cluster": "D",
    "name": "Gite Virtuali"
  },
  "https://sacrafamiglialabinfo.neocities.org": {
    "cluster": "D",
    "name": "Ciro il Dinosauro"
  },
  "https://dinosauri.neocities.org": {
    "cluster": "D",
    "name": "Il Mondo dei Dinosauri"
  },
  "https://apparati.neocities.org": {
    "cluster": "D",
    "name": "Il Corpo Umano"
  },
  "https://pontremoli.neocities.org": {
    "cluster": "D",
    "name": "Pontremoli - Tesina"
  },
  "https://esame.neocities.org": {
    "cluster": "D",
    "name": "Esame di Stato"
  },
  "https://invalsi.neocities.org": {
    "cluster": "D",
    "name": "Missione INVALSI 2026"
  },
  "https://debaterrore.neocities.org": {
    "cluster": "D",
    "name": "Debate sull'Errore"
  },
  "https://notebooklmstyle.neocities.org": {
    "cluster": "D",
    "name": "Infografiche con Notebook LM"
  },
  "https://teamdebate.neocities.org": {
    "cluster": "D",
    "name": "Arena del Pensiero"
  },
  "https://labinfo.my.canva.site/canto3": {
    "cluster": "D",
    "name": "Canto III - Divina Commedia"
  },
  "https://garagevalley.neocities.org": {
    "cluster": "D",
    "name": "I Geni della Tecnologia"
  },
  "https://labscienze.vercel.app": {
    "cluster": "D",
    "name": "Laboratorio Scientifico"
  },
  "https://100anni.neocities.org": {
    "cluster": "D",
    "name": "100 Anni di Storia in Musica"
  },
  "https://sfida.neocities.org": {
    "cluster": "D",
    "name": "Il Gioco delle Case"
  },
  "https://autovalutazione.neocities.org": {
    "cluster": "D",
    "name": "Autovalutazione Lezione"
  },
  "https://sacrafamiglia.neocities.org": {
    "cluster": "D",
    "name": "Le Mascotte delle Case"
  },
  "https://santapaola.neocities.org": {
    "cluster": "D",
    "name": "S. Paola Elisabetta"
  },
  "https://quizzonespaola.neocities.org": {
    "cluster": "D",
    "name": "Quizzone S. Paola"
  },
  "https://randomecase.neocities.org": {
    "cluster": "D",
    "name": "Consegna alle Case"
  },
  "https://studiomusicale.neocities.org": {
    "cluster": "D",
    "name": "Studio Musicale"
  },
  "https://giamaica.neocities.org": {
    "cluster": "D",
    "name": "Cool Runnings"
  },
  "https://labinfo.my.canva.site/c17sxqtedy2jyaw7": {
    "cluster": "D",
    "name": "Milano Cortina"
  },
  "https://olimpictech.neocities.org": {
    "cluster": "D",
    "name": "Tech & Olimpiadi"
  },
  "https://milanocortina.neocities.org": {
    "cluster": "D",
    "name": "Milano-Cortina 2026"
  },
  "https://sacrafamigliatornei.neocities.org": {
    "cluster": "E",
    "name": "Gestione Tornei"
  },
  "https://sacrafamigliagames.neocities.org": {
    "cluster": "D",
    "name": "Word Games"
  },
  "https://profemon.neocities.org": {
    "cluster": "D",
    "name": "Profemon"
  },
  "https://harrypotter-2.vercel.app": {
    "cluster": "D",
    "name": "Harry Potter e la Camera dei Segreti"
  },
  "https://ventimila-leghe.vercel.app": {
    "cluster": "D",
    "name": "Ventimila Leghe sotto i Mari"
  },
  "https://pinocchio-mauve.vercel.app": {
    "cluster": "D",
    "name": "Le Avventure di Pinocchio"
  },
  "https://unonessunocentomila.vercel.app": {
    "cluster": "D",
    "name": "Uno, Nessuno e Centomila"
  },
  "https://pennutispennati.vercel.app": {
    "cluster": "D",
    "name": "Pennuti Spennati"
  },
  "https://agnellorimbalzello.vercel.app": {
    "cluster": "E",
    "name": "L'Agnello Rimbalzello"
  },
  "https://gerisgame.vercel.app": {
    "cluster": "D",
    "name": "La Mossa di Geri"
  },
  "https://parzialmentenuvoloso.vercel.app": {
    "cluster": "D",
    "name": "Le Nuvole di Gus"
  },
  "https://cignoappiccica.vercel.app": {
    "cluster": "D",
    "name": "Il Cigno Appiccica"
  },
  "https://treporcellini.vercel.app": {
    "cluster": "D",
    "name": "I Tre Porcellini"
  },
  "https://pifferaio.vercel.app": {
    "cluster": "D",
    "name": "Il Pifferaio Magico"
  },
  "https://dragoleprotto.vercel.app": {
    "cluster": "D",
    "name": "Il Drago e il Leprotto"
  },
  "https://farelatesina.vercel.app": {
    "cluster": "D",
    "name": "Costruisci la tua Tesina"
  },
  "https://gancioxcolloquio.vercel.app": {
    "cluster": "D",
    "name": "Il Lab del Gancio"
  },
  "https://indirizzo-url.vercel.app": {
    "cluster": "D",
    "name": "L'Indirizzo Digitale"
  },
  "https://homoavdventure.vercel.app": {
    "cluster": "D",
    "name": "Il Viaggio dell'Uomo"
  },
  "https://calcio-one.vercel.app": {
    "cluster": "D",
    "name": "Storia del Calcio"
  },
  "https://masterchef-iota.vercel.app": {
    "cluster": "D",
    "name": "Master Chef"
  },
  "https://acerio.vercel.app/metodologie.html": {
    "cluster": "D",
    "name": "Metodologie"
  },
  "https://acerio.vercel.app/laboratorio.html": {
    "cluster": "D",
    "name": "Laboratorio"
  },
  "https://acerio.vercel.app/scuolafutura.html": {
    "cluster": "D",
    "name": "Percorsi Scuola Futura"
  },
  "https://dizionario-musicale.vercel.app": {
    "cluster": "D",
    "name": "Vocabolario d'Autore"
  },
  "https://ciparisso.vercel.app": {
    "cluster": "D",
    "name": "Il Mito di Ciparisso"
  },
  "https://lost-in-translation-phi.vercel.app": {
    "cluster": "D",
    "name": "Lost in Translation"
  },
  "https://la-macchina-per-fare-i-compiti.vercel.app": {
    "cluster": "D",
    "name": "La Macchina per Fare i Compiti"
  },
  "https://euro-capitali.vercel.app": {
    "cluster": "D",
    "name": "Euro Capitali"
  },
  "https://feedback-fine-anno-scolastico.vercel.app": {
    "cluster": "D",
    "name": "FINE ANNO\n                    autovalutazione"
  },
  "https://bottega-delle-app.vercel.app": {
    "cluster": "D",
    "name": "La Bottega delle App"
  },
  "https://family-dash-two.vercel.app": {
    "cluster": "D",
    "name": "FamilyDash"
  },
  "https://dopamina-loop.vercel.app": {
    "cluster": "D",
    "name": "Mystery Drop"
  },
  "https://cyber-security-ex9b.vercel.app": {
    "cluster": "D",
    "name": "Cyber Security"
  },
  "https://cybersicurezza-figli-genitori.vercel.app": {
    "cluster": "D",
    "name": "Cybersicurezza Figli & Genitori"
  },
  "https://controcorrente-lilac.vercel.app": {
    "cluster": "D",
    "name": "ControCorrente"
  },
  "https://roccacifrata.vercel.app": {
    "cluster": "D",
    "name": "Rocca Cifrata"
  },
  "https://fontaniere-coding.vercel.app": {
    "cluster": "D",
    "name": "Il Fontaniere"
  },
  "https://basket-sacrafamiglia.vercel.app": {
    "cluster": "D",
    "name": "Basket Coding"
  },
  "https://pollice-verde-rho.vercel.app": {
    "cluster": "D",
    "name": "Pollice Verde"
  },
  "https://identit-digitale.vercel.app": {
    "cluster": "D",
    "name": "Identità Digitale"
  },
  "https://anti-alibi.vercel.app": {
    "cluster": "D",
    "name": "Anti-Alibi"
  },
  "https://ipad-carta.vercel.app": {
    "cluster": "D",
    "name": "iPad e Carta"
  },
  "https://excel-basic-lesson.vercel.app": {
    "cluster": "D",
    "name": "Excel Basic"
  },
  "https://magnifica-humanitas-nu.vercel.app": {
    "cluster": "D",
    "name": "Magnifica Humanitas"
  },
  "https://ai-nuovo-mondo.vercel.app": {
    "cluster": "D",
    "name": "AI, il Nuovo Mondo"
  },
  "https://pizzeria-sacrafamiglia-iepo.vercel.app": {
    "cluster": "D",
    "name": "Pizzeria delle Frazioni"
  },
  "https://ai-video-azure.vercel.app": {
    "cluster": "D",
    "name": "AI Video"
  },
  "https://storia-new.vercel.app": {
    "cluster": "D",
    "name": "Viaggio nella Storia"
  },
  "https://albo-doro-case.vercel.app": {
    "cluster": "D",
    "name": "Albo d'Oro delle Case"
  },
  "https://crescerecittadinidigitali.neocities.org": {
    "cluster": "D",
    "name": "Crescere Cittadini Digitali"
  },
  "https://fontana-algoritmica.vercel.app": {
    "cluster": "D",
    "name": "Fontana Algoritmica"
  },
  "https://attacchi-hacker-2026.vercel.app": {
    "cluster": "D",
    "name": "Attacchi Hacker 2026"
  },
  "https://steve-jobs-lab.vercel.app": {
    "cluster": "D",
    "name": "Steve Jobs Lab"
  },
  "https://usa-la-testa.vercel.app": {
    "cluster": "D",
    "name": "Usa la Testa"
  },
  "https://glossario-ipad26.vercel.app": {
    "cluster": "D",
    "name": "Glossario iPad"
  },
  "https://quadriappesi.vercel.app": {
    "cluster": "D",
    "name": "Quadri Appesi"
  },
  "https://acquedotto-mini.vercel.app/index.html": {
    "cluster": "D",
    "name": "Acquedotto Mini"
  },
  "https://droni-algoritmici.vercel.app": {
    "cluster": "D",
    "name": "Droni Algoritmici"
  },
  "https://braone-rampante.vercel.app": {
    "cluster": "D",
    "name": "Il Barone Rampante"
  },
  "https://harrypotter-1.vercel.app": {
    "cluster": "D",
    "name": "Harry Potter e la Pietra Filosofale"
  },
  "https://rosso-malpelo.vercel.app": {
    "cluster": "D",
    "name": "Rosso Malpelo"
  },
  "https://sintesiproteica.vercel.app": {
    "cluster": "D",
    "name": "Sintesi Proteica"
  },
  "https://cavi-e-porte.vercel.app": {
    "cluster": "D",
    "name": "Cavi e Porte"
  },
  "https://coding-lesson-five.vercel.app": {
    "cluster": "D",
    "name": "Primi Passi nel Coding"
  },
  "https://ipad-regolamento.vercel.app": {
    "cluster": "D",
    "name": "Regolamento iPad"
  },
  "https://ipad-tutorial.vercel.app": {
    "cluster": "D",
    "name": "Tutorial iPad"
  },
  "https://patentino-genitori.vercel.app": {
    "cluster": "D",
    "name": "Patentino Digitale"
  },
  "https://domande-snack.vercel.app": {
    "cluster": "D",
    "name": "Domande Snack"
  },
  "https://icone-apple.vercel.app": {
    "cluster": "D",
    "name": "Icone Apple"
  },
  "https://infografiche-notebook.vercel.app": {
    "cluster": "D",
    "name": "Officina dei Prompt"
  }
};
  
  const CLUSTER_META = {
  "A": {
    "label": "A",
    "name": "Profilazione studenti",
    "risk": "ALTO",
    "color": "#8B4A3C",
    "bg": "#F4E6E2",
    "desc": "Questa applicazione costruisce profili dettagliati degli studenti per analizzarne competenze e comportamenti nel tempo. Richiede consenso esplicito delle famiglie e supervisione costante.",
    "legalRef": "Trattamento ad alto rischio ex GDPR art. 35 e AI Act art. 26 (Allegato III). DPIA + FRIA obbligatorie."
  },
  "B": {
    "label": "B",
    "name": "Monitoraggio comportamentale",
    "risk": "ALTO-MEDIO",
    "color": "#B8860B",
    "bg": "#FBF3DC",
    "desc": "Questa applicazione osserva il comportamento degli studenti durante l'uso (tempi, scelte, attenzione). I dati possono restare nel browser o essere trasmessi alla scuola.",
    "legalRef": "GDPR art. 35 e AI Act Allegato III. Uso solo formativo, mai sommativo."
  },
  "C": {
    "label": "C",
    "name": "IA generativa",
    "risk": "MEDIO",
    "color": "#1E4A8A",
    "bg": "#E4EAF3",
    "desc": "Questa applicazione utilizza intelligenza artificiale per generare risposte e contenuti. Le richieste degli studenti sono inviate al fornitore del servizio IA.",
    "legalRef": "GDPR art. 28 e AI Act art. 50 (obbligo di trasparenza). Uso supervisionato dal docente."
  },
  "D": {
    "label": "D",
    "name": "Senza dati personali",
    "risk": "MINIMO",
    "color": "#6B7280",
    "bg": "#EDEFF2",
    "desc": "Questa applicazione non raccoglie alcun dato personale degli studenti. Funziona interamente nel browser senza inviare informazioni a server esterni.",
    "legalRef": "GDPR art. 30 par. 5 (registro semplificato). Principio di minimizzazione applicato."
  },
  "E": {
    "label": "E",
    "name": "Raccolta dati studenti",
    "risk": "BASSO-MEDIO",
    "color": "#4A5160",
    "bg": "#F1F3F7",
    "desc": "Questa applicazione raccoglie alcuni dati degli studenti (nickname, risposte, scelte didattiche) e li salva in fogli di lavoro accessibili solo al docente di classe.",
    "legalRef": "GDPR art. 5 (minimizzazione) e art. 30. Workspace for Education DPA."
  },
  "F": {
    "label": "F",
    "name": "Strumenti professionali docenti",
    "risk": "BASSO",
    "color": "#2C5F8D",
    "bg": "#E4EAF3",
    "desc": "Questa applicazione è accessibile soltanto ai docenti tramite area riservata. I dati trattati sono analoghi a quelli del registro elettronico.",
    "legalRef": "GDPR art. 6.1.e (interesse pubblico) e art. 9.2.g. D.Lgs. 297/1994."
  }
};
  
  // Inietta CSS dei badge
  function injectStyles() {
    if (document.getElementById('dpia-badges-style')) return;
    const css = `
      .dpia-badge {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        margin-left: 6px;
        font-family: 'IBM Plex Sans Condensed', system-ui, sans-serif;
        font-size: 10.5px;
        font-weight: 700;
        letter-spacing: 0.04em;
        border-radius: 3px;
        vertical-align: 1px;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        border: none;
        outline: none;
      }
      .dpia-badge:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 6px rgba(0,0,0,0.12);
      }
      .dpia-badge:focus-visible {
        outline: 2px solid #1E4A8A;
        outline-offset: 2px;
      }
      
      /* Tooltip CSS al hover (desktop) */
      .dpia-badge[data-tooltip]::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%) translateY(4px);
        background: #142E5A;
        color: #FFFFFF;
        padding: 7px 10px;
        border-radius: 3px;
        font-family: 'IBM Plex Sans', system-ui, sans-serif;
        font-size: 11.5px;
        font-weight: 500;
        letter-spacing: 0.01em;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease, transform 0.15s ease;
        z-index: 9998;
        box-shadow: 0 4px 12px rgba(20, 46, 90, 0.25);
      }
      .dpia-badge[data-tooltip]::before {
        content: '';
        position: absolute;
        bottom: calc(100% + 3px);
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #142E5A;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease;
        z-index: 9998;
      }
      @media (hover: hover) and (pointer: fine) {
        .dpia-badge[data-tooltip]:hover::after,
        .dpia-badge[data-tooltip]:hover::before {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
      
      /* Pop-out informativo al click */
      .dpia-popout {
        position: absolute;
        background: #FFFFFF;
        border: 1px solid #DDE1E7;
        border-radius: 4px;
        padding: 16px 18px;
        font-family: 'IBM Plex Sans', system-ui, sans-serif;
        font-size: 13px;
        line-height: 1.55;
        color: #1A1D23;
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        z-index: 10000;
        max-width: 340px;
        min-width: 280px;
        opacity: 0;
        transform: translateY(4px);
        transition: opacity 0.18s ease, transform 0.18s ease;
        pointer-events: none;
      }
      .dpia-popout.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      .dpia-popout-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #EDEFF2;
      }
      .dpia-popout-header .dpia-badge {
        margin-left: 0;
        cursor: default;
        pointer-events: none;
      }
      .dpia-popout-cluster-name {
        font-family: 'IBM Plex Sans Condensed', system-ui, sans-serif;
        font-size: 13.5px;
        font-weight: 600;
        color: #142E5A;
        flex-grow: 1;
      }
      .dpia-popout-risk {
        font-size: 10.5px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-weight: 600;
        color: #5A6270;
      }
      .dpia-popout-desc {
        margin: 0 0 8px 0;
        color: #4A5160;
        font-size: 12.5px;
        line-height: 1.6;
      }
      .dpia-popout-legal {
        margin: 0 0 12px 0;
        padding: 6px 10px;
        background: #F8F9FB;
        border-left: 2px solid #DDE1E7;
        color: #8A92A0;
        font-size: 10.5px;
        line-height: 1.5;
        font-style: italic;
        border-radius: 0 2px 2px 0;
      }
      .dpia-popout-app {
        margin: 0 0 14px 0;
        padding: 8px 10px;
        background: #F7F5EE;
        border-radius: 3px;
        font-size: 12px;
        color: #5A4600;
      }
      .dpia-popout-app strong {
        color: #142E5A;
      }
      .dpia-popout-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .dpia-popout-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;
        font-family: inherit;
        font-size: 11.5px;
        font-weight: 500;
        background: #FFFFFF;
        color: #1E4A8A;
        border: 1px solid #DDE1E7;
        border-radius: 3px;
        cursor: pointer;
        text-decoration: none;
        transition: background 0.12s ease, border-color 0.12s ease;
      }
      .dpia-popout-btn:hover {
        background: #F3F6FB;
        border-color: #1E4A8A;
      }
      .dpia-popout-btn.primary {
        background: #1E4A8A;
        color: #FFFFFF;
        border-color: #1E4A8A;
      }
      .dpia-popout-btn.primary:hover {
        background: #142E5A;
      }
      .dpia-popout-close {
        position: absolute;
        top: 6px;
        right: 8px;
        background: none;
        border: none;
        color: #5A6270;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        padding: 4px 6px;
        border-radius: 2px;
      }
      .dpia-popout-close:hover {
        color: #142E5A;
        background: #EDEFF2;
      }
      .dpia-popout-footer {
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px dotted #EDEFF2;
        font-size: 10.5px;
        color: #8A92A0;
        font-style: italic;
      }
      
      /* Mobile: pop-out diventa centrato in basso */
      @media (max-width: 600px) {
        .dpia-popout {
          position: fixed;
          left: 50% !important;
          top: auto !important;
          bottom: 16px;
          transform: translateX(-50%) translateY(8px);
          max-width: calc(100vw - 32px);
          width: calc(100vw - 32px);
        }
        .dpia-popout.visible {
          transform: translateX(-50%) translateY(0);
        }
      }
      .dpia-A { background: #F4E6E2; color: #8B4A3C; }
      .dpia-B { background: #FBF3DC; color: #B8860B; }
      .dpia-C { background: #E4EAF3; color: #1E4A8A; }
      .dpia-D { background: #EDEFF2; color: #6B7280; }
      .dpia-E { background: #F1F3F7; color: #4A5160; }
      .dpia-F { background: #E4EAF3; color: #2C5F8D; }
      
      /* Legenda fissa in basso a destra */
      .dpia-legend {
        position: fixed;
        bottom: 16px;
        right: 16px;
        background: #FFFFFF;
        border: 1px solid #DDE1E7;
        border-radius: 4px;
        padding: 12px 14px;
        font-family: 'IBM Plex Sans', system-ui, sans-serif;
        font-size: 11.5px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        z-index: 9999;
        max-width: 280px;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.2s, transform 0.2s;
      }
      .dpia-legend.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .dpia-legend-toggle {
        position: fixed;
        bottom: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        background: #1E4A8A;
        color: #fff;
        border: none;
        border-radius: 50%;
        font-family: 'IBM Plex Sans Condensed', system-ui, sans-serif;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 9999;
        transition: transform 0.15s ease, background 0.15s;
      }
      .dpia-legend-toggle:hover { background: #142E5A; transform: scale(1.05); }
      .dpia-legend-toggle.hidden { display: none; }
      .dpia-legend-title {
        font-weight: 700;
        color: #142E5A;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid #DDE1E7;
      }
      .dpia-legend-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
        line-height: 1.4;
      }
      .dpia-legend-row:last-child { margin-bottom: 0; }
      .dpia-legend-close {
        position: absolute;
        top: 6px;
        right: 8px;
        background: none;
        border: none;
        color: #5A6270;
        font-size: 16px;
        cursor: pointer;
        line-height: 1;
        padding: 2px 6px;
      }
      .dpia-legend-close:hover { color: #1E4A8A; }
      .dpia-legend-footer {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px dotted #DDE1E7;
        font-size: 10px;
        color: #5A6270;
        font-style: italic;
      }
    `;
    const style = document.createElement('style');
    style.id = 'dpia-badges-style';
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  // Normalizza URL per il match
  function normalizeUrl(url) {
    return url.replace(/\/$/, '').toLowerCase();
  }
  
  // Inietta il badge accanto al testo
  function injectBadge(linkElement, cluster, appName, appUrl) {
    const meta = CLUSTER_META[cluster];
    if (!meta) return;
    
    // Cerca il contenitore del nome (gestisce diverse strutture HTML del portale)
    const nameEl = linkElement.querySelector('.link-name') || linkElement;
    
    // Evita doppi badge
    if (nameEl.querySelector('.dpia-badge')) return;
    
    const badge = document.createElement('button');
    badge.type = 'button';
    badge.className = 'dpia-badge dpia-' + cluster;
    badge.textContent = meta.label;
    
    // Tooltip CSS-only via data-attribute (mostrato su :hover desktop)
    const tooltipText = 'Cluster ' + cluster + ': ' + meta.name + ' — Rischio ' + meta.risk + ' · clicca per dettagli';
    badge.setAttribute('data-tooltip', tooltipText);
    badge.setAttribute('aria-label', 'Bollino conformità ' + cluster + ': ' + meta.name + '. Clicca per maggiori informazioni.');
    
    // Click apre il pop-out
    badge.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      showPopout(badge, cluster, appName, appUrl);
    });
    
    nameEl.appendChild(badge);
  }
  
  // Pop-out informativo al click sul badge
  let activePopout = null;
  
  function showPopout(badge, cluster, appName, appUrl) {
    // Se c'è già un pop-out aperto su questo badge, lo chiudo
    if (activePopout && activePopout.dataset.badgeKey === badge.getAttribute('aria-label')) {
      hidePopout();
      return;
    }
    
    hidePopout();
    
    const meta = CLUSTER_META[cluster];
    const popout = document.createElement('div');
    popout.className = 'dpia-popout';
    popout.dataset.badgeKey = badge.getAttribute('aria-label');
    
    const isThirdparty = !appUrl || appUrl.indexOf('vercel.app') < 0 && appUrl.indexOf('neocities.org') < 0 && appUrl.indexOf('github.io') < 0;
    
    let actionsHtml = '';
    if (isThirdparty) {
      actionsHtml += '<span class="dpia-popout-btn" style="background:#F7F5EE;color:#5A4600;border-color:#E8D9B0;cursor:default;font-style:italic">Servizio terzo</span>';
    }
    
    popout.innerHTML = 
      '<button class="dpia-popout-close" aria-label="Chiudi">×</button>' +
      '<div class="dpia-popout-header">' +
        '<span class="dpia-badge dpia-' + cluster + '">' + meta.label + '</span>' +
        '<span class="dpia-popout-cluster-name">' + meta.name + '</span>' +
        '<span class="dpia-popout-risk">' + meta.risk + '</span>' +
      '</div>' +
      (appName ? '<div class="dpia-popout-app"><strong>App:</strong> ' + escapeForHtml(appName) + '</div>' : '') +
      '<p class="dpia-popout-desc">' + meta.desc + '</p>' +
      (meta.legalRef ? '<p class="dpia-popout-legal">' + meta.legalRef + '</p>' : '') +
      (actionsHtml ? '<div class="dpia-popout-actions">' + actionsHtml + '</div>' : '') +
      '<div class="dpia-popout-footer">Classificazione DPIA Studio · GDPR + AI Act</div>';
    
    document.body.appendChild(popout);
    activePopout = popout;
    
    // Posizionamento (solo desktop, mobile usa CSS fixed)
    if (window.innerWidth > 600) {
      const rect = badge.getBoundingClientRect();
      const popRect = popout.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      
      // Default: sotto il badge, allineato a sinistra
      let top = rect.bottom + scrollY + 8;
      let left = rect.left + scrollX;
      
      // Se va oltre il bordo destro, allineo a destra
      if (left + popRect.width > window.innerWidth - 16) {
        left = window.innerWidth - popRect.width - 16 + scrollX;
      }
      // Se va oltre il fondo viewport, mostralo SOPRA il badge
      if (rect.bottom + popRect.height + 16 > window.innerHeight) {
        top = rect.top + scrollY - popRect.height - 8;
      }
      
      popout.style.top = top + 'px';
      popout.style.left = left + 'px';
    }
    
    // Forza reflow per attivare la transizione
    popout.offsetHeight;
    popout.classList.add('visible');
    
    // Bind chiusura
    const closeBtn = popout.querySelector('.dpia-popout-close');
    if (closeBtn) closeBtn.addEventListener('click', hidePopout);
  }
  
  function hidePopout() {
    if (activePopout) {
      activePopout.classList.remove('visible');
      const p = activePopout;
      activePopout = null;
      setTimeout(function() { if (p && p.parentNode) p.parentNode.removeChild(p); }, 200);
    }
  }
  
  function escapeForHtml(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c];
    });
  }
  
  // Click outside e ESC chiudono il pop-out
  document.addEventListener('click', function(e) {
    if (activePopout && !activePopout.contains(e.target) && !e.target.classList.contains('dpia-badge')) {
      hidePopout();
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') hidePopout();
  });
  
  // Crea legenda flottante
  function createLegend() {
    const counts = {};
    Object.values(URL_MAP).forEach(item => {
      counts[item.cluster] = (counts[item.cluster] || 0) + 1;
    });
    
    const toggle = document.createElement('button');
    toggle.className = 'dpia-legend-toggle';
    toggle.textContent = 'i';
    toggle.title = 'Legenda bollini conformità';
    toggle.setAttribute('aria-label', 'Mostra legenda bollini DPIA');
    
    const legend = document.createElement('div');
    legend.className = 'dpia-legend';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'dpia-legend-close';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Chiudi legenda');
    
    const title = document.createElement('div');
    title.className = 'dpia-legend-title';
    title.textContent = 'Bollini conformità GDPR / AI Act';
    
    legend.appendChild(closeBtn);
    legend.appendChild(title);
    
    Object.keys(CLUSTER_META).forEach(cluster => {
      if (!counts[cluster]) return;
      const row = document.createElement('div');
      row.className = 'dpia-legend-row';
      const badge = document.createElement('span');
      badge.className = 'dpia-badge dpia-' + cluster;
      badge.textContent = cluster;
      const text = document.createElement('span');
      text.textContent = CLUSTER_META[cluster].name + ' (' + counts[cluster] + ')';
      row.appendChild(badge);
      row.appendChild(text);
      legend.appendChild(row);
    });
    
    const footer = document.createElement('div');
    footer.className = 'dpia-legend-footer';
    footer.textContent = 'Aggiornato al 2026-06-19 — ' + Object.keys(URL_MAP).length + ' applicazioni';
    legend.appendChild(footer);
    
    document.body.appendChild(toggle);
    document.body.appendChild(legend);
    
    toggle.addEventListener('click', () => {
      legend.classList.add('visible');
      toggle.classList.add('hidden');
    });
    closeBtn.addEventListener('click', () => {
      legend.classList.remove('visible');
      toggle.classList.remove('hidden');
    });
  }
  
  // Funzione principale: scansiona i link del portale e inietta i badge
  function applyBadges() {
    injectStyles();
    
    let injected = 0;
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('http')) return;
      
      const norm = normalizeUrl(href);
      const item = URL_MAP[norm];
      if (item) {
        injectBadge(link, item.cluster, item.name, href);
        injected++;
      }
    });
    
    if (injected > 0) {
      createLegend();
    }
    
    console.log('[DPIA Badges] ' + injected + ' bollini iniettati su ' + Object.keys(URL_MAP).length + ' app classificate');
  }
  
  // Inizializza al DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyBadges);
  } else {
    applyBadges();
  }
})();
