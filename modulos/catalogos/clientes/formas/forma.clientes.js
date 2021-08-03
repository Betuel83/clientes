//Campos
let frm_campos_cli = [{
  xtype: 'numberfield',
  fieldLabel: 'Id',
  name: 'cli_id',
  minValue: 0,
  value: '0',
  hidden: true,
  //es para hacer que el campo sea requerido
  allowBlank: false
}, {
  xtype: 'textfield',
  fieldLabel: 'Nombre',
  name: 'cli_nombre',
  //es para hacer que el campo sea requerido
  allowBlank: false,
  msgTarget: 'side'
}, {
  xtype: 'textfield',
  fieldLabel: 'RFC',
  name: 'cli_rfc',
  //es para hacer que el campo sea requerido
  allowBlank: false,
  msgTarget: 'side'
}, {
  xtype: 'textareafield',
  fieldLabel: 'Dirección',
  name: 'cli_direccion',
  flex: 1,
  //es para hacer que el campo sea requerido
  allowBlank: false,
  msgTarget: 'side'
}, {
  xtype: 'combo.pais',
  name: 'cli_pais',
  fieldLabel: 'Pais',
  allowBlank: false,
  msgTarget: 'side'
}, {
  xtype: 'numberfield',
  fieldLabel: 'Credito (días)',
  name: 'cli_credito',
  maxValue: 99,
  minValue: 0,
  //es para hacer que el campo sea requerido
  allowBlank: false,
  msgTarget: 'side'
}, {
  xtype: 'datefield',
  fieldLabel: 'Fecha',
  name: 'cli_fecha',
  //es para hacer que el campo sea requerido
  allowBlank: false,
  msgTarget: 'side'
}, {
  fieldLabel: 'Persona',
  column: 1,
  vertical: true,
  //es para hacer que el campo sea requerido
  allowBlank: false,
  msgTarget: 'side',
  defaults: {
    margin: 5
  },
  xtype: 'radiogroup',
  items: [{
    boxLabel: 'Fisica',
    name: 'cli_tipo_persona',
    id: 'cli_tipo_persona_fisica',
    inputValue: '1',
    checked: true
  }, {
    boxLabel: 'Moral',
    name: 'cli_tipo_persona',
    id: 'cli_tipo_persona_moral',
    inputValue: '2'
  }]
}, {
  fieldLabel: 'Sucursal',
  column: 1,
  vertical: true,
  itemId: 'cli_tipo_sucursal',
  //es para hacer que el campo sea requerido
  allowBlank: false,
  msgTarget: 'side',
  defaults: {
    margin: 5
  },
  xtype: 'checkboxgroup',
  items: [{
    boxLabel: 'CDMX',
    name: 'cli_tipo_sucursal',
    id: 'cli_tipo_sucursal_cdmx',
    inputValue: '1',
    checked: true
  }, {
    boxLabel: 'MTY',
    name: 'cli_tipo_sucursal',
    id: 'cli_tipo_sucursal_mty',
    inputValue: '2'
  }, {
    boxLabel: 'QRO',
    name: 'cli_tipo_sucursal',
    id: 'cli_tipo_sucursal_qro',
    inputValue: '3'
  }, {
    boxLabel: 'GDL',
    name: 'cli_tipo_sucursal',
    id: 'cli_tipo_sucursal_gdl',
    inputValue: '4'
  }]
}];


//Botones
let frm_botones_cli = [{
  text: 'Guardar',
  xtype: 'button',
  itemId: 'boton_guardar',
  handler: function(button) {
    funGuardar(button);
  }
}, {
  text: 'Cancelar',
  xtype: 'button',
  handler: function() {
    funCancelar();
  }
}];


//Definición de la Forma
Ext.define('forma.frm_clientes', {
  extend: 'Ext.form.Panel',
  alias: 'widget.forma.frm_clientes',
  items: frm_campos_cli,
  buttons: frm_botones_cli,
  bodyPadding: 5,
  defaults: {
    margin: 5
  },
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  // items: [{
  //   html: '<div id="mydiv" width="50px" height="50px"></div>'
  // }],
  //buttonAlign: 'right',
  //frame: false,

  initComponent: function() {
    this.callParent(arguments);
  }
});