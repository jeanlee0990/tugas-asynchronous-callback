function createTable(columns, data) {
    const tableContainer = document.getElementById("table-container");

    const table = document.createElement("table");
    table.className = "table table-striped table-bordered";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    columns.forEach(col => {
        const th = document.createElement("th");
        th.innerText = col;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(row => {
        const rowElement = document.createElement("tr");
        columns.forEach(col => {
            const cell = document.createElement("td");
            cell.innerText = row[col];
            rowElement.appendChild(cell);
        });
        tbody.appendChild(rowElement);
    });
    table.appendChild(tbody);

    tableContainer.appendChild(table);
}

async function fetchUserData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        const columns = ["ID", "Name", "Username", "Email", "Address", "Company"];
        const data = users.map(user => ({
            ID: user.id,
            Name: user.name,
            Username: user.username,
            Email: user.email,
            Address: `${user.address.street}, ${user.address.suite}, ${user.address.city}`,
            Company: user.company.name
        }));

        createTable(columns, data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchUserData();
