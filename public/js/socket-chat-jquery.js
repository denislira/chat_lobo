var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');

//referencias de jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

//Funciones para renderizar usuarios
function renderizarUsuarios(personas) { //[{},{},{}]
    console.log(personas);
    var html = '';
    html += '<li>';
    html += '     <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';


    for (var i = 0; i < personas.length; i++) {
        if (personas[i].nombre == 'Denis') { foto = 'lobo_preto';}else if (personas[i].nombre == 'Marquito'){foto = 'lobo_amarelo';   }else
        if(personas[i].nombre == 'Marcelo') { foto = 'lobo_verde';}else{foto = 'lobo_cinza';}

        html += '<li>';
        html += '   <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/'+ foto +'.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
       
    }

    divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Denis') {
        adminClass = 'success';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box-msg bg-white">' + mensaje.mensaje + '</div>';
        html += '</div>';
         if (mensaje.nombre == 'Denis') {
            html += '<div class="chat-img"><img src="assets/images/users/lobo_preto.jpg" alt="user" /></div>';
        }else if(mensaje.nombre == 'Marquito'){
             html += '<div class="chat-img"><img src="assets/images/users/lobo_amarelo.jpg" alt="user" /></div>';
         }else if(mensaje.nombre == 'Marcelo'){
             html += '<div class="chat-img"><img src="assets/images/users/lobo_verde.jpg" alt="user" /></div>';
         }else{
        html += '<div class="chat-img"><img src="assets/images/users/lobo_cinza.jpg" alt="user" /></div>';
         }
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        

        if (mensaje.nombre == 'Marcelo') {
            html += '<div class="chat-img"><img src="assets/images/users/lobo_verde.jpg" alt="user" /></div>';
        }else
        if (mensaje.nombre == 'Denis') {
            html += '<div class="chat-img"><img src="assets/images/users/lobo_preto.jpg" alt="user" /></div>';
        }else
        if (mensaje.nombre == 'Marquito') {
            html += '<div class="chat-img"><img src="assets/images/users/lobo_amarelo.jpg" alt="user" /></div>';
        }else{
             html += '<div class="chat-img"><img src="assets/images/users/lobo_cinza.jpg" alt="user" /></div>';
        }

        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += ' </div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }
    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listener
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    console.log(id);

});

formEnviar.on('submit', function(e) {
    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        //console.log('respuesta server: ', resp);
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });



});