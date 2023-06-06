/* formato con guión sin puntos, ejemplo 17633772-9 */
function validarRUT(rutCompleto) {
    rutCompleto = rutCompleto.replace("‐", "-");
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';

    return (dv(rut) == digv);
}

function dv(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}

function validarut(rut) {
    if (rut.length < 9)
        return (false)
    i1 = rut.indexOf('-')
    dv = rut.substr(i1 + 1)
    dv = dv.toUpperCase()
    nu = rut.substr(0, i1)
    cnt = 0
    suma = 0
    for (i = nu.length - 1; i >= 0; i--) {
        dig = nu.substr(i, 1)
        fc = cnt + 2
        suma += parseInt(dig) * fc
        cnt = (cnt + 1) % 6
    }
    dvok = 11 - (suma % 11)
    if (dvok == 11) dvokstr = '0'
    if (dvok == 10) dvokstr = 'K'
    if ((dvok != 11) && (dvok != 10)) dvokstr = '' + dvok
    if (dvokstr == dv)
        return (true)
    else
        return (false)
}


function formato_rut(texto, activo) {
    var invertido = ''
    var dtexto = ''
    var cnt = 0
    var i = 0
    var j = 0
    var largo = ''
    if (activo) {
        texto = formato_rut(texto, false)
        largo = texto.length
        for (i = (largo - 1), j = 0; i >= 0; i--, j++)
            invertido = invertido + texto.charAt(i)
        dtexto = dtexto + invertido.charAt(0)
        dtexto = dtexto + '-'
        for (i = 1, j = 2; i < largo; i++, j++) {
            if (cnt == 3) {
                dtexto = dtexto + ''
                j++
                dtexto = dtexto + invertido.charAt(i)
                cnt = 1
            } else {
                dtexto = dtexto + invertido.charAt(i)
                cnt++
            }
        }
        invertido = ''
        for (i = (dtexto.length - 1), j = 0; i >= 0; i--, j++)
            invertido = invertido + dtexto.charAt(i)
        if (invertido == '-') invertido = ''
        texto = invertido
    } else {
        var tmpstr = ''
        for (i = 0; i < texto.length; i++)
            if (texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-')
                tmpstr = tmpstr + texto.charAt(i)
        texto = tmpstr
    }
    return texto
}


function letrasRut(e) {
    tecla = (document.all) ? e.keyCode : e.which
    if (tecla == 8 || tecla == 107 || tecla == 75) return true
    patron = /\d/
    te = String.fromCharCode(tecla)
    return patron.test(te)
}