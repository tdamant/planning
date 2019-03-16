document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("/example");
    const data = await response.json();
    console.log(data);
});
