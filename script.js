fetch('menu.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-placeholder').innerHTML = html;

    const currentLangSpan = document.getElementById('current-lang');
    const switchLink = document.getElementById('switch-lang');

    // treat root (empty) as index.html
    const path = location.pathname.split('/').pop()|| 'index.html';
    const isCZ = !['index-en.html','news.html','download.html','help.html','contact.html'].includes(path);
    let lang = isCZ ? 'cz' : 'en';

    currentLangSpan.textContent = lang === 'cz' ? '🇨🇿 CZ' : '🇬🇧 EN';
    switchLink.textContent = lang === 'cz' ? 'EN' : 'CZ';

    // Přepnutí jazyka
    switchLink.addEventListener('click', e => {
      e.preventDefault();
      let newPage;
      if(lang === 'cz') {
        if(path === 'index.html') newPage = 'index-en.html';
        else if(path === 'novinky.html') newPage = 'news.html';
        else if(path === 'stazeni.html') newPage = 'download.html';
        else if(path === 'napoveda.html') newPage = 'help.html';
        else if(path === 'kontakt.html') newPage = 'contact.html';
      } else {
        if(path === 'index-en.html') newPage = 'index.html';
        else if(path === 'news.html') newPage = 'novinky.html';
        else if(path === 'download.html') newPage = 'stazeni.html';
        else if(path === 'help.html') newPage = 'napoveda.html';
        else if(path === 'contact.html') newPage = 'kontakt.html';
      }
      if(newPage) location.href = newPage;
    });

    // Aktualizace textů menu a href podle jazyka
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(a => {
      a.textContent = lang === 'cz' ? a.dataset.cz : a.dataset.en;

      // Upravené href podle vašich názvů EN souborů
      let href = a.getAttribute('href');
      if(lang === 'en') {
        switch(href) {
          case 'index.html': a.setAttribute('href', 'index-en.html'); break;
          case 'novinky.html': a.setAttribute('href', 'news.html'); break;
          case 'stazeni.html': a.setAttribute('href', 'download.html'); break;
          case 'napoveda.html': a.setAttribute('href', 'help.html'); break;
          case 'kontakt.html': a.setAttribute('href', 'contact.html'); break;
        }
      } else {
        switch(href) {
          case 'index-en.html': a.setAttribute('href', 'index.html'); break;
          case 'news.html': a.setAttribute('href', 'novinky.html'); break;
          case 'download.html': a.setAttribute('href', 'stazeni.html'); break;
          case 'help.html': a.setAttribute('href', 'napoveda.html'); break;
          case 'contact.html': a.setAttribute('href', 'kontakt.html'); break;
        }
      }
    });
  });
