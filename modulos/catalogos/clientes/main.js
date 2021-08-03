// fwk
// ========================================================
head.load(conf.fwk.path + conf.fwk.ext + '/build/ext-all.js');

// theme
// ========================================================
head.load(conf.fwk.path + conf.fwk.ext + '/build/' + conf.fwk.build + '/theme-' + conf.fwk.theme + '/resources/theme-' + conf.fwk.theme + '-all.css');
head.load(conf.fwk.path + conf.fwk.ext + '/build/' + conf.fwk.build + '/theme-' + conf.fwk.theme + '/theme-' + conf.fwk.theme + '.js');

// librerias
// ========================================================
head.load(conf.path.root + 'libTL.js');
head.load(conf.path.generales + 'scripts/trunk/libGeneral.ext4.1.js');
head.load(conf.path.generales + 'scripts/trunk/libFunciones.js');
head.load(conf.path.generales + 'componentes/trunk/windows/windows.general.js');

// require
// ========================================================
//Nota: Las funciones van en la primera posición de todos los require
head.load('combos/combo.pais.js');
head.load('funciones/fun.constantes.js');
head.load('funciones/fun.clientes.js');
head.load('formas/forma.clientes.buscar.js');
head.load('grids/grid.clientes.js');
head.load('windows/window.clientes.js');
head.load('formas/forma.clientes.js');
head.load('formas/forma.generar.qr.js');

// app
//=========================================================
head.load('app.js');