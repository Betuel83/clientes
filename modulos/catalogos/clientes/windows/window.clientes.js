Ext.onReady(function() {
	Ext.create('Ext.window.Window', {
		title: 'Nuevo Cliente',
		id: 'win_clientes',
		name: 'win_clientes',
		minWidth: 600,
		minHeight: 400,
		maximizable: true,
		modal: true,
		resizable: false,
		closeAction: 'hide',
		layout: 'fit',
		items: [{
			xtype: 'forma.frm_clientes',
			region: 'center',
			//html: '<div id="mydiv" width="40px" height="40px">Hi there</div>'
		}]

	});



	Ext.create('Ext.window.Window', {
		title: 'Buscar Cliente',
		id: 'win_clientes_buscar',
		name: 'win_clientes_buscar',
		minWidth: 600,
		minHeight: 400,
		maximizable: true,
		modal: true,
		resizable: false,
		closeAction: 'hide',
		layout: 'fit',
		items: [{
			xtype: 'forma.frm_clientes_buscar',
			region: 'center'
		}]

	});



	Ext.create('Ext.window.Window', {
		title: 'Generar QR',
		id: 'win_generar_qr',
		name: 'win_generar_qr',
		closable: false, //no muestra el botón de "x" en la ventana
		minWidth: 280,
		minHeight: 400,
		maximizable: true,
		modal: true,
		resizable: false,
		closeAction: 'hide',
		layout: 'fit',
		items: [{
			xtype: 'forma.frm_generar_qr',
			region: 'center',
			html: '<div id="qrcode" width="50px" height="50px"></div>'
		}]

	});
});