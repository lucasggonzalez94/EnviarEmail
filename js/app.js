// Variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail')

// Variables para campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListeners()
function eventListeners(){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)

    // Campos del fomulario
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    // Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario)

    // Enviar email
    formulario.addEventListener('submit', enviarEmail)
}

// Funciones
function iniciarApp(){
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

// Valida el formulario
function validarFormulario(e) {
    if (e.target.value.length > 0) {
        e.target.style.borderBottomColor = 'green'
        // Elimina los mensajes de error
        const error = document.querySelector('.error')
        if(error){
            formulario.removeChild(error)
        }
    }else{
        e.target.style.borderBottomColor = 'red'
        mostrarError('Todos los campos son obligatorios')
    }

    if (e.target.type === 'email') {
        if (er.test(e.target.value)) {
            e.target.style.borderBottomColor = 'green'
            // Elimina los mensajes de error
            const error = document.querySelector('.error')
            if(error){
                formulario.removeChild(error)
            }
        }else{
            e.target.style.borderBottomColor = 'red'
            mostrarError('Email no válido')
        }
    }

    // Valida que todos los campos sean validos y activa el boton de submit
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje){
    const error = document.querySelector('.error')
    if(error){
        formulario.removeChild(error)
    }
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')

    const errores = document.querySelectorAll('.error')
    if (errores.length === 0) {
        formulario.appendChild(mensajeError)
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'))
    }
}

// Envia el email
function enviarEmail(e){
    e.preventDefault()

    // Mostrar el spinner
    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex'

    // Despues de 3 seg ocultar el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none'

        // Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p')
        parrafo.textContent = 'Enviado correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner)

        setTimeout( () => {
            parrafo.remove() //Elima el mensaje de exito
            resetearFormulario()
        }, 3000)
    }, 3000)
}

// Funcion que resetea el formulario
function resetearFormulario(e){
    e.preventDefault()

    formulario.reset()

    iniciarApp()
}