/* utility functions */
const validateAlias = (str) => {
    // Check if the string contains numbers and letters, and is at least 6 characters long
    var regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(str);
}

const validateEmail = (email) => {
    //check for email@domain.ext format
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//sweetalert loader utility
const showLoader = () => {
    Swal.fire({
        title: 'Espere un momento...',
        html: 'Cargando datos desde el servidor',
        allowOutsideClick: false,
        showConfirmButton: 0,
        didOpen: () => {
            Swal.showLoading()
        },
    });
}
const hideLoader = () => swal.close();

//input visual cue 
const fieldIsValid = (input, isValid) => {
    if (isValid) {
        input.classList.remove('is-invalid')
    } else {
        input.classList.add('is-invalid')
    }
}


/* Event Handlers */
const aliasOnBlurHandler = (event) => {
    fieldIsValid(event.target, validateAlias(event.target.value));
}

const rutOnBlurHandler = (event) => {
    fieldIsValid(event.target, validarRUT(event.target.value));
}

const emailOnBlurHandler = (event) => {
    fieldIsValid(event.target, validateEmail(event.target.value));
}

const fetchRegionesHandler = async () => {
    showLoader();
    const response = await fetch('backend/api.php?api_function=getRegiones');
    const regiones = await response.json();
    regiones.map((region) => {
        const option = document.createElement('option');
        option.setAttribute('value', region.id);
        option.appendChild(document.createTextNode(region.nombre_region));
        document.getElementById('select-region').appendChild(option);
    });
    document.getElementById('form-votacion').reset();
    hideLoader();
}

const fetchComunasHandler = async (event) => {
    showLoader();
    const id_region = event.target.value;
    const response = await fetch(`backend/api.php?api_function=getComunas&id_region=${id_region}`);
    const comunas = await response.json();
    document.getElementById('select-comuna').innerHTML = '<option value="" disabled selected>--Seleccione comuna--</option>';
    comunas.map((comuna) => {
        const option = document.createElement('option');
        option.setAttribute('value', comuna.id);
        option.appendChild(document.createTextNode(comuna.nombre_comuna));
        document.getElementById('select-comuna').appendChild(option);
    });
    hideLoader();
}

const fetchCandidatosHandler = async (event) => {
    showLoader();
    const id_comuna = event.target.value;
    const response = await fetch(`backend/api.php?api_function=getCandidatos&id_comuna=${id_comuna}`);
    const candidatos = await response.json();
    document.getElementById('select-candidato').innerHTML = '<option value="" disabled selected>--Seleccione Candidato--</option>';
    candidatos.map((candidato) => {
        const option = document.createElement('option');
        option.setAttribute('value', candidato.id);
        option.appendChild(document.createTextNode(candidato.nombre_candidato));
        document.getElementById('select-candidato').appendChild(option);
    });
    hideLoader();
}

const submitVotacionHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    /* validate fields */

    // Alias
    if (!validateAlias(data.get('alias'))) {
        Swal.fire({
            icon: 'error',
            title: 'Error de formato',
            html:'El campo "Alias" debe contener números, letras y un mínimo de 6 caracteres, intentelo nuevamente',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // RUT
    if (!validarRUT(data.get('rut'))) {
        console.log('invalid rut');
        Swal.fire({
            icon: 'error',
            title: 'Rut inválido',
            html:'El RUT ingresado no es valido, intentelo nuevamente',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Email
    if (!validateEmail(data.get('email'))) {
        console.log('invalid email');
        Swal.fire({
            icon: 'error',            
            title: 'Error de formato',
            html:'Ingrese una dirección de email valida',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    //opciones checkbox    
    let checkbox_count = 0;
    document.getElementById('checkbox-web').checked && checkbox_count++;
    document.getElementById('checkbox-tv').checked && checkbox_count++;
    document.getElementById('checkbox-sociales').checked && checkbox_count++;
    document.getElementById('checkbox-amigo').checked && checkbox_count++;
    if (checkbox_count < 2) {
        console.log('check at least 2 boxes');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            html:'Debe seleccionar un minimo de 2 opciones del campo "Como se enteró de nosotros"',
            confirmButtonText: 'Aceptar'
        });
        return
    }

    data.append('api_function', 'saveVoto');
    const response = await fetch('backend/api.php', {
        method: 'POST',
        body: data
    });
    const voteData = await response.json();

    Swal.fire({
        icon: voteData.status,
        title: voteData.status === 'success' ? 'Exito':'Error',
        html: voteData.message,
        showConfirmButton: 1,
        confirmButtonText: 'Aceptar'
    }).then(() => {
        if (voteData.status === 'success') {
            event.target.reset();
        }
    });
}

//event listeners
window.addEventListener("load", fetchRegionesHandler);
document.getElementById('input-alias').addEventListener('blur', aliasOnBlurHandler)
document.getElementById('input-rut').addEventListener('blur', rutOnBlurHandler)
document.getElementById('input-email').addEventListener('blur', emailOnBlurHandler)
document.getElementById('select-region').addEventListener('change', fetchComunasHandler);
document.getElementById('select-comuna').addEventListener('change', fetchCandidatosHandler);
document.getElementById('form-votacion').addEventListener('submit', submitVotacionHandler);