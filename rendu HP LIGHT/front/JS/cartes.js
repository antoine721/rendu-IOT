async function fetchCard() {
    let url = new URLSearchParams(window.location.search);
    let slug = url.get('id');
    const response = await fetch('https://hp-api.lainocs.fr/characters/' + slug);
    const data = await response.json();
    return data; 
}

async function displayCard() {
    let profil = document.querySelector('.profilCard');
    let card = await fetchCard();
    profil.innerHTML = '';
    profil.innerHTML += `
        <img src = `+ card.image +` alt = "image de ` + card.name + `" >
        <h2>` + card.name + `</h2>
        <h3>Maison: ` + card.house + `</h3>
        <h3>Acteur: ` + card.actor + `</h3>
        <h3>Anniversaire: ` + card.birthday + `</h3>
        <h3>Role: ` + card.role + `</h3>

    `;
    switch (card.house) {
        case 'Gryffindor':
            profil.style.backgroundColor = '#ae0001';
            profil.style.border = '2px solid #740001';
            break;
        case 'Hufflepuff':
            profil.style.backgroundColor = '#f0c75e';
            profil.style.border = '2px solid #ecb939';
            break;
        case 'Ravenclaw':
            profil.style.backgroundColor = '#222f5b';
            profil.style.border = '2px solid #0e1a40';
            break;
        case 'Slytherin':
            profil.style.backgroundColor = '#2a623d';
            profil.style.border = '2px solid #1a472a';
            break;
        default:
            profil.style.backgroundColor = '#4d35c4';
            profil.style.border = '2px solid #231ea5';
    }
    return card;
}

async function UpdateColor() {
    const persoColor = await displayCard();
    const response = await fetch('/Color', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            house: persoColor.house 
        }),
    });
    const data = await response.json();
}

UpdateColor();

displayCard();