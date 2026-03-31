const fs = require('fs');

async function updateMenuWithImages() {
  const categories = [
    { query: 'gourmet burger', id: 'Burgers' },
    { query: 'artisanal pizza', id: 'Pizzas' },
    { query: 'gourmet gelato ice cream', id: 'Ice Cream' },
    { query: 'cold pressed organic juice glass', id: 'Juices' },
    { query: 'specialty coffee latte art espresso', id: 'Coffee' }
  ];

  let menuMap = {};

  for (const cat of categories) {
    try {
      const resp = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(cat.query)}&per_page=9`);
      const data = await resp.json();
      const urls = data.results.map(r => r.urls.regular);
      menuMap[cat.id] = urls;
      console.log(`Fetched 9 images for ${cat.id}`);
    } catch (e) {
      console.error(`Failed ${cat.id}`, e.message);
    }
  }

  const filePath = 'src/app/menu/page.jsx';
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace each loremflickr URL individually based on category
  let cIndex = { "Burgers": 0, "Pizzas": 0, "Ice Cream": 0, "Juices": 0, "Coffee": 0 };

  const finalContent = content.replace(/img: "(https:\/\/loremflickr\.com[^"]+)"/g, (match, url) => {
    let cat = "";
    if (url.includes("burger")) cat = "Burgers";
    else if (url.includes("pizza")) cat = "Pizzas";
    else if (url.includes("gelato")) cat = "Ice Cream";
    else if (url.includes("juice")) cat = "Juices";
    else if (url.includes("coffee")) cat = "Coffee";
    
    if (menuMap[cat] && menuMap[cat][cIndex[cat]]) {
       let newUrl = menuMap[cat][cIndex[cat]];
       cIndex[cat]++;
       return `img: "${newUrl}"`;
    }
    return match; // Fallback
  });

  fs.writeFileSync(filePath, finalContent);
  console.log('Successfully updated page.jsx with Unsplash images.');
}

updateMenuWithImages();
