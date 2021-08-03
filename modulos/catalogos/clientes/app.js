Ext.onReady(function() {

  Ext.create('Ext.Viewport', {
    layout: 'border',
    defaults: {
      border: 1,
      margin: 5
    },
    items: [{
      xtype: 'forma.frm_clientes_buscar',
      region: 'north',
      id: 'forma_buscar_clientes'
    }, {
      xtype: 'grid.gri_clientes',
      region: 'center',
      id: 'grid_clientes'
    }]
  });

});