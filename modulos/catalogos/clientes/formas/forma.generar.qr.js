//Botones
let frm_botones_cli_2 = [{
  text: 'Cerrar',
  xtype: 'button',
  handler: function() {
    funCancelarQR();
  }
}];


//Definición de la Forma
Ext.define('forma.frm_generar_qr', {
  extend: 'Ext.form.Panel',
  alias: 'widget.forma.frm_generar_qr',
  buttons: frm_botones_cli_2,
  bodyPadding: 5,
  defaults: {
    margin: 5
  },
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  initComponent: function() {
    this.callParent(arguments);
  }
});