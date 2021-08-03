Ext.define('grid.resultado.base', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.grid.resultado.base',
	title: 'Resultados',
	iconCls: 'x-fa fa-table',
	columnLines: true,

	//////Propiedades////////
	url: '',
	paginado: true,
	extraParams: '',
	pageSize: 100,
	autoLoad: false,
	seleccionable: true,
	rowColor: [],
	groupField: '',
	//Si SelModel recibe un true, crea un por default, si recibe un false no crea nada
	selModel: false,
	//////Propiedades que raramente serán cambiadas///////
	totalProperty: 'NUMREGISTROS',
	root: 'CONSULTA',
	type: 'ajax',
	rtype: 'json',
	dockedItems: [],
	store: null,
	initComponent: function() {
		var me = this;
		try {
			//Validaciones***************************************
			if (Ext.isEmpty(this.columns)) {
				throw ("No se recibió el array de columnas, verifique");
			}
			if (Ext.isEmpty(this.url) && Ext.isEmpty(this.store)) {
				throw ("No se recibió la propiedad Url, url hace referencia al CFC");
			}
			if (!this.pageSize && Ext.isEmpty(this.store)) {
				throw ("La propiedad pageSize debe contener un valor mayor a 0");
			}
			if (Ext.isEmpty(this.extraParams) && Ext.isEmpty(this.store)) {
				throw ("No se recibió el valor de extraParams");
			}
			if (this.selModel == true) {
				this.selModel = Ext.create('Ext.selection.CheckboxModel', {
					allowDeselect: true
				});
			}

			//Generar el Store**************************************************
			if (Ext.isEmpty(this.store)) {
				var gri_campos = [];
				Ext.each(this.columns, (val, key) => {
					gri_campos[key] = {
						name: val.dataIndex,
						type: val.type
					};
				});
				var modelo = Ext.create('Ext.data.Model', {
					alias: '',
					fields: gri_campos
				});

				var store = general.nuevoStore({
					model: modelo,
					url: this.url,
					extraParams: this.extraParams,
					type: this.type,
					rtype: this.rtype,
					root: this.root,
					totalProperty: this.totalProperty,
					pageSize: this.pageSize,
					autoLoad: this.autoLoad,
					groupField: this.groupField
				});

				this.store = store;
			}

			//Generar paginado***************************************
			if (this.paginado) {
				if (!Ext.isEmpty(this.store)) {
					this.dockedItems = general.nuevoPaging({
						store: this.store,
						pageSize: this.store.pageSize
					});
				} else {
					throw ("El store no ha sido definido, no se puede crear la paginación ");
				}
			}

			if (Ext.isEmpty(this.viewConfig)) {
				//Seteando colores de los rows***************************************

				this.rowColor = this.rowColor || [];
				if (this.rowColor.length > 0) {
					var columnas_grid = [];
					var clases = [];
					if (!Ext.isEmpty(this.rowColor[0].cli_deshabilitado)) {
						var flecha = (this.tbar.indexOf('->') > -1 ? '' : '->');
						this.tbar.push(flecha, {
							xtype: 'label',
							html: '<span style="cursor: pointer; margin-right:5px; color: #cecece; font-size:30px;" class="x-fa fa-info-circle" id="desc"></span>',
							listeners: {
								render: () => {
									var html_content = '';
									Ext.each(this.rowColor, function(item) {
										if (!Ext.isEmpty(item.cli_deshabilitado)) {
											html_content += `
												<li style="list-style-type: none;margin-bottom: 10px;">
												    <div style="width:100%;background-color:transparent;margin-right:20px;">
														${item.cli_deshabilitado}
												      <div class="${item.style.cls}" style="margin-left:-40px; margin-right:10px; float:left; width:30px;"> 
												         <span style="color:transparent;">aaa<span>
												      </div>
												    </div>
												  </li>`;
										}

									});

									html_content = `<ul style="list-style-type: none; margin-top:10px;">${html_content}</ul>`
									new Ext.tip.ToolTip({
										target: document.getElementById('desc'),
										html: html_content
									});
								}
							}
						})
					}
					Ext.each(this.columns, function(col) {
						columnas_grid.push(col.dataIndex);
					});

					Ext.each(this.rowColor, (col) => {
						if (!Ext.isEmpty(col.descripcion)) {

						}
						if (!columnas_grid.includes(col.dataIndex)) {
							console.warn("dataIndex :" + col.dataIndex + " recibido en la propiedad rowColor no Existe en el grid, verifique");
						} else {
							if (Ext.isEmpty(col.style) ||
								Ext.isEmpty(col.style.cls) ||
								Ext.isEmpty(col.style.css)) {
								console.warn("El objeto recibido para el estilo de la fila es invalido: ", col.style);
							}
							Ext.util.CSS.createStyleSheet(
								`.${col.style.cls}{${col.style.css} }
								.${col.style.cls}:hover { opacity: 0.8; }`
							);
						}
					});

					this.viewConfig = {
						getRowClass: function(record, index) {
							var grid = Ext.getCmp(me.id);
							// console.log(grid.getView().getRow(0));
							var clase = '';
							Ext.each(me.rowColor, function(row_color) {
								if (typeof(row_color.value) === 'function') {
									if (row_color.value(record.data[row_color.dataIndex], record)) {
										clase = row_color.style.cls;
									}
								} else if (record.data[row_color.dataIndex] == row_color.value) {
									clase = row_color.style.cls;
								}
							});
							return clase;
						}
					};
				}
			} else {
				//Si está definido pues lo usa
				this.viewConfig = this.viewConfig;
			}
			//TextSelection******************************************
			this.viewConfig = this.viewConfig || {};
			this.viewConfig['enableTextSelection'] = this.enableTextSelection || this.seleccionable;
			///Generar los toolbars
		} catch (error) {
			console.error("Error en la generación del grid: ", error);
			return;
		}
		this.callParent(arguments);

	}
});