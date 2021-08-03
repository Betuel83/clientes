//Agregar Cliente
let funAgregarCliente = function() {
	let agregar = Ext.getCmp('win_clientes');
	forma = agregar.down('form').getForm();
	agregar.setTitle('Agregar Nuevo Cliente');
	boton_guardar = agregar.down('#boton_guardar');
	boton_guardar.setText('Guardar');
	forma.reset();
	agregar.show().center();
};


let funCrearQR = function() {
	let ventana = Ext.getCmp('win_generar_qr');
	grid = Ext.getCmp('grid_clientes');
	seleccion = grid.getSelection();

	try {

		if (seleccion.length === 0) {
			libTL.popup.info('Aviso', 'Seleccione al menos un cliente');
		} else {

			//validamos si el cliente esta habilitado o deshabilitado
			if (seleccion[0].data.cli_deshabilitado === 0) {
				let valor_qr = seleccion[0].data.cli_nombre;
				ventana.setTitle(`QR ${valor_qr}`);
				ventana.show().center();
				new QRCode(document.getElementById("qrcode"), valor_qr);

			} else {
				libTL.popup.info('Aviso', 'No se puede generar el QR de este cliente, tiene que volver a habilitarlo');
			}
		}
	} catch (error) {
		ventana.hide();
		ventana.setLoading(false);
		libTL.popup.error('Error', error);
	}
};



let funEditarCliente = function() {
	let ventana = Ext.getCmp('win_clientes');
	forma = ventana.down('form').getForm();
	grid = Ext.getCmp('grid_clientes');
	boton_guardar = ventana.down('#boton_guardar');
	checkbox_default_cdmx = ventana.down("#cli_tipo_sucursal_cdmx");
	checkbox_default_mty = ventana.down("#cli_tipo_sucursal_mty");
	checkbox_default_qro = ventana.down("#cli_tipo_sucursal_qro");
	checkbox_default_gdl = ventana.down("#cli_tipo_sucursal_gdl");

	radio_default_fisica = ventana.down("#cli_tipo_persona_fisica");
	radio_default_moral = ventana.down("#cli_tipo_persona_moral");
	seleccion = grid.getSelection();

	try {

		if (seleccion.length === 0) {
			libTL.popup.info('Aviso', 'Seleccione al menos un cliente');
		} else {

			//validamos si el cliente esta habilitado o deshabilitado
			if (seleccion[0].data.cli_deshabilitado === 0) {
				ventana.setTitle('Editar Cliente');
				ventana.show().center();
				forma.setValues(seleccion[0].data);
				checkbox_default_cdmx.setValue(seleccion[0].data.cli_tipo_sucursal == 1 ? true : false);
				checkbox_default_mty.setValue(seleccion[0].data.cli_tipo_sucursal == 2 ? true : false);
				checkbox_default_qro.setValue(seleccion[0].data.cli_tipo_sucursal == 3 ? true : false);
				checkbox_default_gdl.setValue(seleccion[0].data.cli_tipo_sucursal == 4 ? true : false);

				radio_default_fisica.setValue(seleccion[0].data.cli_tipo_persona == 1 ? true : false);
				radio_default_moral.setValue(seleccion[0].data.cli_tipo_persona == 2 ? true : false);
				boton_guardar.setText('Actualizar');
			} else {
				libTL.popup.info('Aviso', 'No se puede editar este cliente, tiene que volver a habilitarlo');
			}
		}
	} catch (error) {
		ventana.hide();
		ventana.setLoading(false);
		libTL.popup.error('Error', error);
	}
};



let funEliminarCliente = function(boton) {
	let ventana = Ext.getCmp('win_clientes');
	forma = ventana.down('form').getForm();
	grid = Ext.getCmp('grid_clientes');
	//boton_eliminar = grid.down('#boton_eliminar');
	//seleccion = general.funGridSeleccionRecords('grid_clientes')[0];
	seleccion = grid.getSelection();


	try {

		if (seleccion.length === 0) {
			libTL.popup.info('Aviso', 'Seleccione al menos un cliente');
		} else {

			libTL.popup.confirm('Confirmacion', '¿Esta seguro que desea eliminar el cliente?', function(valor) {

				if (valor === 'yes') {

					boton.setDisabled(true);

					Ext.Ajax.request({
						url: '../../../cfc/clientes.cfc',
						params: {
							method: 'eliminarClientes',
							returnFormat: 'json',
							cli_id: seleccion[0].data.cli_id
						},

						success: function(response) {
							let res = Ext.JSON.decode(response.responseText);
							if (res.error === 0) {
								let store = grid.getStore();
								let forma_buscar = Ext.getCmp('frm_clientes_buscar');
								libTL.toast.info('Aviso', res.msg, 't');
								store.loadPage(1, {
									callback: function() {
										grid.setLoading(false);
									}
								});
							} else {
								libTL.popup.error('Error', res.msg, 't');
								grid.setLoading(false);
							}

							boton.setDisabled(false);
						},
						failure: function(response) {
							ventana.setLoading(false);
							let res = Ext.JSON.decode(response.responseText);
							libTL.popup.error('Error', res.msg);
						}
					});


				}
			});



		}
	} catch (error) {
		ventana.hide();
		ventana.setLoading(false);
		libTL.popup.error('Error', error);
	}
};



let fundeshabilitarCliente = function(boton) {
	let ventana = Ext.getCmp('win_clientes');
	forma = ventana.down('form').getForm();
	grid = Ext.getCmp('grid_clientes');
	seleccion = grid.getSelection();


	try {

		if (seleccion.length === 0) {
			libTL.popup.info('Aviso', 'Seleccione al menos un cliente');
		} else {

			//validamos si el cliente esta habilitado o deshabilitado
			if (seleccion[0].data.cli_deshabilitado === 0) {

				libTL.popup.confirm('Confirmacion', '¿Esta seguro que desea deshabilitar el cliente?', function(valor) {

					if (valor === 'yes') {

						boton.setDisabled(true);

						Ext.Ajax.request({
							url: '../../../cfc/clientes.cfc',
							params: {
								method: 'deshabilitarClientes',
								returnFormat: 'json',
								cli_deshabilitado: seleccion[0].data.cli_deshabilitado,
								cli_id: seleccion[0].data.cli_id
							},

							success: function(response) {
								let res = Ext.JSON.decode(response.responseText);
								if (res.error === 0) {
									let store = grid.getStore();
									let forma_buscar = Ext.getCmp('frm_clientes_buscar');
									libTL.toast.info('Aviso', res.msg, 't');
									store.loadPage(1, {
										callback: function() {
											grid.setLoading(false);
										}
									});
								} else {
									libTL.popup.error('Error', res.msg, 't');
									grid.setLoading(false);
								}

								boton.setDisabled(false);
							},
							failure: function(response) {
								ventana.setLoading(false);
								let res = Ext.JSON.decode(response.responseText);
								libTL.popup.error('Error', res.msg);
							}
						});


					}
				});

			} else {


				libTL.popup.confirm('Confirmacion', '¿Esta seguro que desea habilitar el cliente?', function(valor) {

					if (valor === 'yes') {

						boton.setDisabled(true);

						Ext.Ajax.request({
							url: '../../../cfc/clientes.cfc',
							params: {
								method: 'deshabilitarClientes',
								returnFormat: 'json',
								cli_deshabilitado: seleccion[0].data.cli_deshabilitado,
								cli_id: seleccion[0].data.cli_id
							},

							success: function(response) {
								let res = Ext.JSON.decode(response.responseText);
								if (res.error === 0) {
									let store = grid.getStore();
									let forma_buscar = Ext.getCmp('frm_clientes_buscar');
									libTL.toast.info('Aviso', res.msg, 't');
									store.loadPage(1, {
										callback: function() {
											grid.setLoading(false);
										}
									});
								} else {
									libTL.popup.error('Error', res.msg, 't');
									grid.setLoading(false);
								}

								boton.setDisabled(false);
							},
							failure: function(response) {
								ventana.setLoading(false);
								let res = Ext.JSON.decode(response.responseText);
								libTL.popup.error('Error', res.msg);
							}
						});


					}
				});

			} //fin de la validación de habilitado o deshabilitado



		}
	} catch (error) {
		ventana.hide();
		ventana.setLoading(false);
		libTL.popup.error('Error', error);
	}
};



let funlimpiarCampos = function() {
	let ventana = Ext.getCmp('forma_buscar_clientes');
	ventana.down('#bus_nombre').setValue('');
	ventana.down('#bus_rfc').setValue('');
	ventana.down('#bus_direccion').setValue('');
};



let funCancelar = function() {
	let ventana = Ext.getCmp('win_clientes');
	ventana.hide();
};


let funCancelarQR = function() {
	let ventana = Ext.getCmp('win_generar_qr');

	//removemos el div creado antes de cerrar la ventana emergente, para poder generar el nuevo qr
	let eliminar_div = document.getElementById("qrcode");
	while (eliminar_div.firstChild) {
		eliminar_div.removeChild(eliminar_div.firstChild);
	}

	ventana.hide();
};


let funGuardar = function() {
	let ventana = Ext.getCmp('win_clientes'),
		formaGuardar = ventana.down('form').getForm();
	grid = Ext.getCmp('grid_clientes');

	try {
		//validamos la forma
		if (formaGuardar.isValid()) {
			ventana.setLoading({
				msg: 'Guardando...'
			});
			formaGuardar.submit({
				method: 'POST',
				url: '../../../cfc/clientes.cfc',
				params: {
					method: 'guardarClientes',
					returnFormat: 'json'
				},
				//waitMsg: 'Guardando...',
				success: function(frm, action, response) {
					let res = Ext.JSON.decode(action.response.responseText);
					if (res.error === 0) {
						formaGuardar.reset();
						ventana.hide();
						let store = grid.getStore();
						let forma_buscar = Ext.getCmp('frm_clientes_buscar');
						libTL.toast.info('Aviso', res.msg, 't');
						ventana.setLoading(false);
						store.loadPage(1, {
							callback: function() {
								grid.setLoading(false);
							}
						});
					} else {
						libTL.popup.error('Error', res.msg, 't');
						ventana.setLoading(false);
						grid.setLoading(false);
					}
				},
				failure: function(frm, action, response) {
					ventana.setLoading(false);
					let res = Ext.JSON.decode(action.response.responseText);
					libTL.popup.error('Error', res.msg);
				}
			});
		}
	} catch (error) {
		ventana.hide();
		ventana.setLoading(false);
		libTL.popup.error('ERROR', error);
	}
};



let funExportar = function() {
	try {

		let formabusqueda = Ext.getCmp('forma_buscar_clientes');
		let parametrosDeBusqueda = formabusqueda.getForm().getValues();

		let formatemp = Ext.create('Ext.form.Panel', {
			url: '../../../cfc/clientes.cfc',
			standardSubmit: true
		});

		formatemp.getForm().submit({
			target: '_blank',
			params: {
				method: 'listarClientesExportar',
				...parametrosDeBusqueda

			}
		});
	} catch (error) {
		libTL.popup.error('ERROR', error);
	}
};



let buscarGrid = function() {
	let buscarClientes = Ext.getCmp('forma_buscar_clientes');
	let gridClientes = Ext.getCmp('grid_clientes');
	let parametrosDeBusqueda = buscarClientes.getForm().getValues();

	let store = gridClientes.getStore();
	store.getProxy().setExtraParams({
		...paramsClientes,
		...parametrosDeBusqueda
	});

	store.load();
};