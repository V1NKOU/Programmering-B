// Dine genbrugelige API-funktioner kommer her.


//Skal bruge et HTML element med id="toast"
function showToast(txt, timeout=2000, type="notify"){
    const toast = document.getElementById('toast')
    toast.classList.add('toastShown')
    toast.classList.add(type)
    toast.textContent = txt
    setTimeout(() => {
        toast.classList.remove('toastShown')
    }, timeout)
}