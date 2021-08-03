//Columnas
let gri_columnas = [{
    header: 'Deshabilitado',
    dataIndex: 'cli_deshabilitado',
    type: 'int',
    minWidth: 30,
    hidden: true
}, {
    header: '#',
    dataIndex: 'cli_id',
    type: 'int',
    minWidth: 30,
    hidden: true
}, {
    header: 'Nombre',
    dataIndex: 'cli_nombre',
    type: 'string',
    minWidth: 200
}, {
    header: 'RFC',
    dataIndex: 'cli_rfc',
    type: 'string',
    minWidth: 200
}, {
    header: 'Dirección Fiscal',
    dataIndex: 'cli_direccion',
    type: 'string',
    minWidth: 500
}, {
    header: 'País',
    dataIndex: 'cli_pais',
    type: 'string',
    minWidth: 200
}, {
    header: 'Días de Crédito',
    dataIndex: 'cli_credito',
    type: 'int',
    minWidth: 150,
}, {
    header: 'Fecha',
    dataIndex: 'cli_fecha',
    type: 'date',
    minWidth: 100
}, {
    header: 'Sucursal',
    dataIndex: 'cli_tipo_sucursal',
    type: 'int',
    itemId: 'cli_tipo_sucursal',
    minWidth: 30,
    hidden: true
}, {
    header: 'Tipo de Persona',
    dataIndex: 'cli_tipo_persona',
    type: 'int',
    itemId: 'cli_tipo_persona',
    minWidth: 30,
    hidden: true
}];

//Campos
let gri_campos = [];
Ext.each(gri_columnas, function(value, key) {
    gri_campos[key] = {
        name: value.dataIndex,
        type: value.type
    };
});

//Modelo
let gri_modelo = Ext.define('modelo.gri_clientes', {
    extend: 'Ext.data.Model',
    alias: 'widget.modelo.gri_clientes',
    fields: gri_campos
});

//Store
let items_por_pagina = 7;

let gri_store = Ext.create('Ext.data.Store', {
    id: 'gri_store',
    model: 'modelo.gri_clientes',
    pageSize: items_por_pagina,
    proxy: {
        type: 'ajax',
        url: urlClientes, //se manda llamar del archivo fun.constantes.js
        reader: {
            type: 'json',
            rootProperty: 'CONSULTAS', //se manda los datos contenidos en el cfset del archivo clientes.cfc
            totalProperty: 'NUMREGISTROS'
            //autoLoad: false
        }
    }
});


//Toolbar
let gri_toolbar = [{
    text: 'Agregar',
    handler: function() {
        funAgregarCliente();
    }
}, {
    text: 'Editar',
    handler: function() {
        funEditarCliente();
    }
}, {
    text: 'Des / habilitar',
    handler: function() {
        fundeshabilitarCliente(this);
    }
}, {
    text: 'Generar QR',
    handler: function() {
        funCrearQR(this);
    }
}, '->', {
    text: 'Eliminar',
    handler: function() {
        funEliminarCliente(this);
    }
}];


//Definición del Grid
let gri_clientes = Ext.define('grid.gri_clientes', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.grid.gri_clientes',
    columns: gri_columnas,
    store: gri_store,
    title: 'Clientes',
    frame: true,
    tbar: gri_toolbar,
    viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
            if (record.get('cli_deshabilitado') === 1)
                return 'rowDeshabilitado';
            else if (record.get('cli_deshabilitado') === 0)
                return 'rowHabilitado';
        }
    },
    initComponent: function() {
        this.callParent(arguments);
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'gri_store',
        dock: 'bottom',
        displayInfo: false
    }]
});