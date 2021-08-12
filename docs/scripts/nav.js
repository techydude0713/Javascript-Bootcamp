var sync = false
async function render()
{
  if (document.getElementById("totd"))
    spawnOneTOTD();
  else if (document.getElementById("cards"))
    spawnProjects();
  else if(document.getElementById("big_thought"))
  {
    spawnTOTD();
  }
  /*
  // Light or Dark mode
  if (window.matchMedia)
  {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
      document.getElementById('nav_palate').className = "navbar navbar-expand-lg navbar-dark bg-dark";
    }
    else
    {
      document.getElementById('nav_palate').className = "navbar navbar-expand-lg navbar-light bg-light";
    }
  }
  else
  {
    document.getElementById('nav_palate').className = "navbar navbar-expand-lg navbar-light bg-light";
  }
  */
  //Get current project files
  const url = './data/projects.json';
  const response = await fetch(url);
  const json = await response.json();


  document.getElementById('project1').innerText = json.p1[0];
  document.getElementById('project2').innerText = json.p2[0];
  document.getElementById('project3').innerText = json.p3[0];

  document.getElementById('project1').href = json.p1[1];
  document.getElementById('project2').href = json.p2[1];
  document.getElementById('project3').href = json.p3[1];
}

function safety_e()
{

  let a = "";
  let b = "";
  let c = 0;
  let d = [100, 65, 90, 81, 89, 119, 97, 65, 101, 81, 90, 65, 100, 81, 90, 65, 90, 81, 77, 119, 81, 65, 89, 81, 98, 119, 98, 65, 76, 103, 89, 119, 98, 119, 98, 81];
  for (let i = 0; i<d.length;i++)
  {
    a+=String.fromCharCode(d[i]);
    (c % 2) && ((b+=decodeURIComponent(escape(window.atob( a+"==" )))) && (a=""));
    c++;
  }
  document.getElementById("email").innerHTML = `<strong><a href=mailto:${b}>${b}</a></strong>`;
}


async function spawnProjects()
{
  const url = 'data/all_projects.json';
  const response = await fetch(url);
  const json = await response.json();

  const short = 'data/projects.json';
  const short_response = await fetch(short);
  const main_projects = await short_response.json();
  let cards = document.getElementById("cards");
  for (let info of json)
  {
    let description = "<i>No description available...</i>"
    let hyperlink = ""
    let repolink = ""
    let image = ""
    let popular_check = ""

    if (info.repolink)
      repolink = `<a href=\"${info.repolink}\" class=\"card-link\">Repo</a>\n      `
    if(info.url)
      hyperlink = `<a href=\"${info.url}\" class=\"card-link\">Run!</a>\n      `
    if(info.imagepath)
      image = `<img src=\"data/images/${info.imagepath}\" class=\"card-img-top\" alt=\"${info.name}\">\n      `
    if (info.description)
      description = info.description

    if (info.url == main_projects.p1[1] || info.url == main_projects.p2[1] || info.url == main_projects.p3[1])
    {
      popular_check = "bg-warning"
    }


    let data = `\n    <div class=\"card ${popular_check}\" style=\"width: 18rem;\">\n    <div class=\"card-body\">\n      ${image}<h5 class=\"card-title\">${info.name}</h5>\n      <h6 class=\"card-subtitle mb-2 text-muted\">${info.year}</h6>\n      <p class=\"card-text\">${description}</p>\n      ${hyperlink}${repolink}</div>\n  </div>\n  `;
    ///cards.innerHTML +=`\n    <div class=\"card\" style=\"width: 18rem;\">\n    <div class=\"card-body\">\n      <img src=\"data/images/${info.imagepath}\" class=\"card-img-top\" alt=\"${info.name}\">\n      <h5 class=\"card-title\">${info.name}</h5>\n      <h6 class=\"card-subtitle mb-2 text-muted\">${info.year}</h6>\n      <p class=\"card-text\">${info.description}</p>\n      <a href=\"${info.url}\" class=\"card-link\">Run</a>\n      </div>\n  </div>\n  `
    cards.innerHTML += data;
    /*
    if(info.imagepath)
    {
      cards.innerHTML += `<img src=\"data/images/${info.imagepath}\" class=\"card-img-top\" alt=\"${info.name}\">\n      `
    }
    cards.innerHTML += `<h5 class=\"card-title\">${info.name}</h5>\n      <h6 class=\"card-subtitle mb-2 text-muted\">${info.year}</h6>\n      <p class=\"card-text\">${info.description}</p>\n      <a href=\"#\" class=\"card-link\">${info.url}</a>\n      </div>\n  </div>\n  `
    */
  }
  //`\n    <div class=\"card\" style=\"width: 18rem;\">\n    <div class=\"card-body\">\n      <img src=\"data/images/${imagepath}\" class=\"card-img-top\" alt=\"${name}\">\n      <h5 class=\"card-title\">${name}</h5>\n      <h6 class=\"card-subtitle mb-2 text-muted\">${year}</h6>\n      <p class=\"card-text\">${description}</p>\n      <a href=\"#\" class=\"card-link\">${url}</a>\n      </div>\n  </div>\n  `
  //`\n    <div class=\"card\" style=\"width: 18rem;\">\n    <div class=\"card-body\">\n      <img src=\"data/images/${info.imagepath}\" class=\"card-img-top\" alt=\"${info.name}\">\n      <h5 class=\"card-title\">${info.name}</h5>\n      <h6 class=\"card-subtitle mb-2 text-muted\">${info.year}</h6>\n      <p class=\"card-text\">${info.description}</p>\n      <a href=\"${info.url}\" class=\"card-link\">Run</a>\n      </div>\n  </div>\n  `
}

async function spawnOneTOTD()
{
  const url = 'data/totd.json';
  const response = await fetch(url);
  const json = await response.json();
  const json_sorted = json.sort((a,b) => {
    return Date.parse(b.date)-Date.parse(a.date);
  });
  const content = json[0];
  const element = document.getElementById("totd");
  let date = `<h1>${content.date}</h1>`;
  let story = content.story;
  let media = "";

  if (content.marqueeSize)
  {
    console.log("test")
    story = story.replace("<marquee",`<marquee width="${content.marqueeSize}"`);
    console.log(story)
  }

  if(content.media)
  {
    switch(content.media)
    {
      case ("youtube"):
      {
        let set = "";
        if (content.ytQSsettings)
          set = content.ytQSsettings;
        media = `<div class=text-center><iframe id="ytplayer" type="text/html" width="720" height="405"
        src="https://www.youtube.com/embed/${content.location}?${set}"
        frameborder="0" allowfullscreen></iframe></div>`
        break;
      }
      case ("image"):
      {
        let style = ""
        if (content.imgpos)
        {
          style=` width=${content.imgpos};height=${content.imgpos}`
        }
        media = `<img src=${content.location}${style}>`
        break;
      }
    }

  }
  element.innerHTML = `${date}${story}<br><br>${media}`

  //document.getElementById("totd") = json[0];<h1>
}

async function spawnTOTD()
{
  const url = 'data/totd.json';
  const response = await fetch(url);
  const json = await response.json();
  const json_sorted = json.sort((a,b) => {
    return Date.parse(b.date)-Date.parse(a.date);
  });
  const element = document.getElementById("big_thought");
  let first = true;
  for (let a of json_sorted)
  {
    let width = 332.39
    let date = a.date;
    let story = a.story;
    let media = "";
    let todate = "";

    if (first)
    {
      todate = " bg-warning";
      first=false;
    }

    //element.innerHTML+=`\n    <div class=\"card\" style=\"width: 18rem;\">\n    <div class=\"card-body\">\n      <h5 class=\"card-title\">${name}</h5>\n      <h6 class=\"card-subtitle mb-2 text-muted\">${year}</h6>\n      <p class=\"card-text\">${description}</p>\n      <a href=\"#\" class=\"card-link\">${url}</a>\n      </div>\n  </div>\n  `
    if (a.media)
    {
      switch(a.media)
      {
        case ("youtube"):
        {
          let set = "";
          if (a.ytQSsettings)
            set = a.ytQSsettings;
          media = `<div class=bs-card-video><iframe id="ytplayer" type="text/html"
          src="https://www.youtube.com/embed/${a.location}?${set}"
          frameborder="0" allowfullscreen></iframe></div>\n      `
          break;
        }
        case ("image"):
        {
          let style = ""
          if (a.imgpos)
          {
            style=` width=${a.imgpos};height=${a.imgpos}`
          }
          media = `<img class=\"card-img-top\" src=${a.location}${style}>\n      `
          break;
        }
      }
    }
    element.innerHTML += `\n    <div class=\"card${todate}\" style=\"width: ${width}px;\">\n    <div class=\"card-body\">\n      ${media}<h5 class=\"card-title\">${date}</h5>\n      <p class=\"card-text\">${story}</p>\n    </div>\n  </div>\n  `
    //`\n    <div class=\"card\" style=\"width: 18rem;\">\n    <div class=\"card-body\">\n      <img src=\"...\" class=\"card-img-top\" alt=\"...\">\n      <h5 class=\"card-title\">${date}</h5>\n      <p class=\"card-text\">${story}</p>\n    </div>\n  </div>\n  `

  }
}
