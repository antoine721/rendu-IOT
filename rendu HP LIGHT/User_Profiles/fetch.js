const profilUser = document.getElementById('Pcontainer');

async function fetchData(){
    const token = localStorage.getItem('token');
    const response = await fetch("/getMyProfile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
    const data = await response.json();
    console.log(data);
    profilUser.innerHTML = `
        <h1>Pseudo: ${data.name}</h1>
        <p>Email: ${data.email}</p>
        <p>Created at: ${data.createdAt}</p>
        <p>Updated at: ${data.updatedAt}</p>
    `
}

fetchData();

