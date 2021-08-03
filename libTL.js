var libTL = libTL || {};
libTL = (function() {
    var validarParametros = function(titulo, mensaje, alineacion) {
        var error = '';
        try {
            if (Ext.isEmpty(titulo)) {
                throw ('El titulo no fue definido, verifique');
            }
            if (Ext.isEmpty(mensaje)) {
                throw ('El mensaje no ha sido definido');
            }
            if (!Ext.isEmpty(alineacion)) {
                if (!libTL.toast.alineacion[alineacion]) {
                    throw ("La alineaciÃ³n no estÃ¡ definida correctamente, usa la propiedad libTL.toast.alineacion.");
                }
            }
        } catch (error) {
            console.error(error);
            return false;
        }
        return true;
    };

    var obtenerObjPopup = function(argumentos) {
        try {
            var obj = {
                titulo: '',
                mensaje: '',
                fn: function() {

                }
            };
            if (argumentos.length == 0) {
                throw ("No se definieron argumentos");
                return false;
            }
            if (typeof(argumentos[0]) === "object") {
                if (!obj.titulo || !obj.mensaje) {
                    throw ("Los parÃ¡metros titulo y mensaje son obligatorios");
                }
            } else if (!Ext.isEmpty(argumentos[0])) {
                obj.titulo = argumentos[0];
                obj.mensaje = argumentos[1];
                obj.fn = argumentos[2] || function() {};
                obj.titulo = (argumentos[1] == undefined) ? 'Mensaje' : argumentos[0];
                obj.mensaje = (argumentos[1] == undefined) ? argumentos[0] : argumentos[1];
                console.log(">>>", argumentos);
            } else {
                throw ("OcurriÃ³ un error al crear el popup");
                return false;
            }
            return obj;
        } catch (error) {
            console.error(error);
        }
    };

    var generarPopup = function(obj, icono, buttons, fn) {
        return Ext.Msg.prompt({
            msg: obj.mensaje,
            title: obj.titulo,
            icon: icono,
            buttons: buttons,
            fn: fn
        });
    };

    return {
        grid: {
            rowColor: {
                ROJO: {
                    cls: 'grid-row-rojo',
                    css: 'color: #a72d2d; font-weight: 600;background-color: #ff9a9a;'
                },
                VERDE: {
                    cls: 'grid-row-verde',
                    css: 'color: #0c670c; font-weight: 600;background-color: #6fdc6f;'
                },
                GRIS: {
                    cls: 'grid-row-gris',
                    css: 'color: #848484; font-weight: 600;background-color: #bbbbbb;'
                },
                AZUL: {
                    cls: 'grid-row-azul',
                    css: 'color: #306796; font-weight: 600;background-color: #79b9f1;'
                },
                AMARILLO: {
                    cls: 'grid-row-presalida',
                    css: 'color: #848429; font-weight: 600;background-color: #ffffb8;'
                }
            }
        },
        toast: {
            alineacion: {
                'tr': 'tr',
                'tl': 'tl',
                't': 't',
                'br': 'br',
                'bl': 'bl',
                'b': 'b'
            },
            error: function(titulo, mensaje, alineacion = 't') {
                if (!validarParametros(titulo, mensaje, alineacion)) {
                    return false;
                }
                var msg = '';
                msg += "<h4>" + titulo + "</h4>";
                msg += "<p>" + mensaje + "</p>";

                Ext.toast({
                    html: msg,
                    align: alineacion,
                    minWidth: 200,
                    maxWidth: 400,
                    style: 'border: 2px solid #f5c6cb; color:#721c24; border-radius: .25rem;',
                    bodyStyle: 'background-color: #f8d7da'
                });
            },
            info: function(titulo, mensaje, alineacion) {
                if (!validarParametros(titulo, mensaje, alineacion)) {
                    return false;
                }
                var msg = '';
                msg += "<h4>" + titulo + "</h4>";
                msg += "<p>" + mensaje + "</p>";

                Ext.toast({
                    html: msg,
                    align: alineacion,
                    minWidth: 200,
                    maxWidth: 400,
                    style: 'border: 2px solid #bee5eb; color:#0c5460; border-radius: .25rem;',
                    bodyStyle: 'background-color: #d1ecf1'
                });
            },
            alerta: function(titulo, mensaje, alineacion) {
                if (!validarParametros(titulo, mensaje, alineacion)) {
                    return false;
                }
                var msg = '';
                msg += "<h4>" + titulo + "</h4>";
                msg += "<p>" + mensaje + "</p>";

                Ext.toast({
                    html: msg,
                    align: alineacion,
                    minWidth: 200,
                    maxWidth: 400,
                    style: 'border: 2px solid #ffeeba; color:#856404; border-radius: .25rem;',
                    bodyStyle: 'background-color: #fff3cd'
                });
            }
        },
        popup: {
            error: function(titulo, mensaje, fn) {
                var obj = obtenerObjPopup(arguments);
                if (obj) {
                    generarPopup(obj, Ext.Msg.ERROR, Ext.Msg.OK, obj.fn);
                } else {
                    console.error("OcurriÃ³ un error al generar el popup");
                }
            },
            info: function(titulo, mensaje, fn) {
                var obj = obtenerObjPopup(arguments);
                if (obj) {
                    generarPopup(obj, Ext.Msg.INFO, Ext.Msg.OK, obj.fn);
                } else {
                    console.error("OcurriÃ³ un error al generar el popup");
                }
            },
            alerta: function(titulo, mensaje, fn) {
                var obj = obtenerObjPopup(arguments);
                if (obj) {
                    generarPopup(obj, Ext.Msg.WARNING, Ext.Msg.OK, obj.fn);
                } else {
                    console.error("OcurriÃ³ un error al generar el popup");
                }
            },
            confirm: function(titulo, mensaje, fn) {
                var obj = obtenerObjPopup(arguments);
                if (obj) {
                    Ext.MessageBox.buttonText.yes = 'SÃ­';

                    generarPopup(obj, Ext.Msg.QUESTION, Ext.Msg.YESNO, obj.fn);
                } else {
                    console.error("OcurriÃ³ un error al generar el popup");
                }
            }
        },
        exportar: {

            excel: function(objParams) {
                try {
                    if (!Ext.Object.isEmpty(objParams)) {

                        if (objParams.url == '' || objParams.url == undefined) {
                            throw ("Faltan argumentos.");
                            return false;
                        }
                        if (Ext.Object.isEmpty(objParams.params) || objParams.params == undefined) {
                            throw ("Faltan argumentos.");
                            return false;
                        }

                        var nameIframe = 'arc_ifr_dow';
                        var nameForma = 'arc_frm_dow';

                        var urlCfc = '';
                        urlCfc = document.location.href + objParams.url

                        var arc_frm_dow = general.nuevoForma({
                            id: nameIframe,
                            url: urlCfc,
                            standardSubmit: true,
                            errorReader: false
                        });

                        var nBody = Ext.getBody();
                        nBody.createChild({
                            tag: 'iframe',
                            cls: 'x-hidden',
                            id: nameIframe,
                            name: nameIframe
                        });

                        arc_frm_dow.submit({
                            params: objParams.params,
                            target: nameIframe,
                            method: "POST"
                        });

                    } else {
                        throw ("No se enviaron los parametros para exportar el archivo de excel.");
                        return false;
                    }
                } catch (error) {
                    throw ("ERROR. " + error);
                    return false;
                }

            }

        },
        simpleStoreToXML: function(data, nodeName) {
            var xml_salida = '';
            data.each(function(record, _) {
                var key_array = Object.keys(record.data);
                xml_salida += '<' + nodeName + '>';
                for (var i in key_array) {
                    var data = record.data[key_array[i]];
                    if (data != null && !Ext.isEmpty(data)) {
                        xml_salida += `<${key_array[i]}>${data}</${key_array[i]}>`;
                    }
                }
                xml_salida += '</' + nodeName + '>';
            });

            xml_salida = xml_salida.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');

            return xml_salida;
        },
        simpleStoreToXMLv2: function(data, nodeName) {
            var xml_salida = '';
            data.each(function(record, _) {
                var key_array = Object.keys(record.data);
                xml_salida += '<' + nodeName + '>';
                for (var i in key_array) {
                    var data = record.data[key_array[i]];
                    console.log(record.data.ind_hora);
                    console.log(data);
                    console.log(key_array);
                    if (data != null && !Ext.isEmpty(data)) {
                        var dataTime = record.data.ind_hora;
                        var dataTimeStr = String(dataTime)
                        if (dataTimeStr.includes("(hora estÃ¡ndar central)")) {
                            var dataTimeSubS = dataTimeStr.substring(24, 16);

                            if (key_array[i] == 'ind_hora') {
                                xml_salida += `<${key_array[i]}>${dataTimeSubS}</${key_array[i]}>`;

                            } else {

                                xml_salida += `<${key_array[i]}>${data}</${key_array[i]}>`;
                            }

                        } else {
                            xml_salida += `<${key_array[i]}>${data}</${key_array[i]}>`;
                            console.log(data);
                        }
                    }
                }
                xml_salida += '</' + nodeName + '>';
                console.log(xml_salida);
            });

            xml_salida = xml_salida.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');

            return xml_salida;
        },

        simpleSelectionToXML: function(sel, nodeName = 'tag') {
            let xml = '';

            try {
                sel.forEach((el, index) => {
                    let keys = Object.keys(el.data);

                    xml += `<${nodeName}>`;

                    keys.forEach((key, index) => {
                        let data = el.data[key];
                        xml += `<${key}>${data}</${key}>`;
                    });

                    xml += `</${nodeName}>`;
                });
            } catch (err) {
                console.error(err);
                xml = '';
            }

            return xml;
        },
        bodyMask: function(bMask, sMessage) {
            try {
                let body = Ext.getBody(document.body);
                if (bMask) {
                    body.mask(sMessage);
                } else {
                    body.unmask();
                }
            } catch (err) {
                console.log('FUNCTION == bodyMask == OcurriÃ³ un error : ', err);
            }
        },

        checkCookies: function({
            cookieName,
            cookieValue,
            cookieTimer,
            callbackSuccess,
            callbackError
        }) {
            if (libTL.getCookie(cookieName) != null && libTL.getCookie(cookieName) != '') {
                if (libTL.getCookie(cookieName) == cookieValue) {
                    clearInterval(cookieTimer);
                    libTL.deleteCookie(cookieName);
                    callbackSuccess();
                } else if (libTL.getCookie(cookieName).indexOf('ERROR') == 0) {
                    clearInterval(cookieTimer);
                    libTL.deleteCookie(cookieName);
                    callbackError(libTL.getCookie(cookieName));
                }
            }
        },

        getCookie: function(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        },

        deleteCookie: function(name) {
            document.cookie = name + "= ; Path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        },

        funSelectValueCmb: function(cmb, value, elementoStore) {
            store = cmb.getStore();
            store.loadData([elementoStore]);
            cmb.setValue(value);
        },
    }
})();