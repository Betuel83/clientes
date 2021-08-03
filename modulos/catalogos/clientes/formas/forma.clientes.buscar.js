//Campos
let frm_campos = [{
  xtype: 'textfield',
  fieldLabel: 'Nombre',
  name: 'bus_nombre',
  itemId: 'bus_nombre',
  columnWidth: 0.33
}, {
  xtype: 'textfield',
  fieldLabel: 'RFC',
  name: 'bus_rfc',
  itemId: 'bus_rfc',
  columnWidth: 0.33
}, {
  xtype: 'textfield',
  fieldLabel: 'Dirección',
  name: 'bus_direccion',
  itemId: 'bus_direccion',
  columnWidth: 0.33
}, {
  fieldLabel: 'Persona',
  column: 1,
  vertical: true,
  defaults: {
    margin: 5
  },
  xtype: 'radiogroup',
  items: [{
    boxLabel: 'Fisica',
    name: 'bus_tipo_persona',
    inputValue: '1',
    checked: true
  }, {
    boxLabel: 'Moral',
    name: 'bus_tipo_persona',
    inputValue: '2'
  }]
}];


//Botones
let frm_botones = [{
  text: 'Buscar',
  handler: function() {
    buscarGrid();
  }
}, {
  text: 'Limpiar',
  handler: function() {
    funlimpiarCampos();
  }
}, {
  text: 'Exportar',
  handler: function() {
    funExportar();
  }
}];


//Definición de la Forma
Ext.define('forma.frm_clientes_buscar', {
  extend: 'Ext.form.Panel',
  alias: 'widget.forma.frm_clientes_buscar',
  title: 'Parámetros de Búsqueda',
  items: frm_campos,
  buttons: frm_botones,
  bodyPadding: 5,
  defaults: {
    margin: 5
  },
  layout: 'column',
  buttonAlign: 'left',
  frame: true,

  initComponent: function() {
    this.callParent(arguments);
  }
});