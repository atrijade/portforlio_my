var typed = new Typed('#element', {
    strings: ['Engineer', 'Front-End developer'],
    typeSpeed: 50,
});
document.querySelector('.navbar::after').addEventListener('click', function () {
    document.querySelector('.navbar').classList.toggle('open');
});
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "0px" || sidebar.style.width === "") {
        sidebar.style.width = "250px";
    } else {
        sidebar.style.width = "0px";
    }
}