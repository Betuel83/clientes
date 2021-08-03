Ext.define('combo.pais', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.combo.pais',
    fieldLabel: 'Pais',
    valueField: 'pais',
    displayField: 'pais',
    loadingText: 'Cargando...',
    queryMode: 'remote',
    msgTarget: 'side',
    forceSelection: true,
    editable: true,
    initComponent: function() {
        this.store = general.nuevoStore({
            fields: [{
                name: "Id",
                type: "int"
            }, {
                name: 'pais',
                type: "string"
            }],
            autoLoad: true,
            type: 'ajax',
            rtype: 'json',
            root: 'CONSULTAS',
            idProperty: 'Id',
            url: '../../../cfc/clientes.cfc',
            extraParams: {
                method: 'listarPaises',
                returnFormat: 'json'
            }
        });

        this.callParent(arguments);
    }
});