<cfcomponent displayname='clientes.cfc' output=true>

<!--PARAMETROS-->


<!--METODOS-->
<cffunction name='guardarMetodo' output="yes" returntype='struct' access='remote'>

	<cfset Salida['success'] = 'true'>
	<cfset Salida['msg'] = 'Se Guardo el Cliente #cli_nombre# Correctamente.'>

	<cfreturn Salida>
</cffunction>


<cffunction name='listarClientesJSON' output="yes" returntype='struct' access='remote'>

<cfset clientes = {
	CONSULTAS = [
       {
       	'cli_nombre' = 'Jesus',
       	'cli_rfc' = 'ALA160426HF5',
       	'cli_direccion_fiscal' = 'Linares',
       	'cli_credito' = '20'
       }, {
       	'cli_nombre' = 'Betuel',
       	'cli_rfc' = 'JBGS05071983',
       	'cli_direccion_fiscal' = 'Linares',
       	'cli_credito' = '10'
       }
	]
}>

<cfreturn clientes>

</cffunction>



<!----------------------------------------------------------------
Nota: gt 0 valida que su longitud sea mayor a cero del campo
       ------------------------------------------------------------------>   
<cffunction name="listarClientes" hint="Listar los Clientes" output="true" returntype="any" access="remote">
<cftry>
       <cfset Servidor= CreateObject("component","generales.sistema.sqlserver")>
       <cfset Parametros= Servidor.sqlParametros(prm_sp='GetClientes',prm_data="datasource_dicex")>
       <cfset Ordenar = Servidor.sqlSort(sqlParams = Parametros, property = '')>

       <cfif isDefined('bus_nombre') and len(bus_nombre) gt 0> 
              <cfset Parametros['@nombre'].valor = trim(bus_nombre)/>
       </cfif>

       <cfif isDefined('bus_rfc') and len(bus_rfc) gt 0>
              <cfset Parametros['@rfc'].valor = trim(bus_rfc)/>
       </cfif>

       <cfif isDefined('bus_direccion') and len(bus_direccion) gt 0>
              <cfset Parametros['@direccion'].valor = trim(bus_direccion)/>
       </cfif>

       <cfif isDefined('bus_tipo_persona') and val(bus_tipo_persona) gt 0>
              <cfset Parametros['@tipo_persona'].valor = bus_tipo_persona/>
       </cfif>
                     
       <cfset Resultados = Servidor.sqlEjecucion(prm_sp = 'GetClientes',prm_params = Parametros,prm_data="datasource_dicex")/>
       <cfset Salida= {CONSULTAS=Servidor.sqlStruct(prm_query= Resultados, prm_fucase= false),NUMREGISTROS=Resultados.NUMREGISTROS}>

       <cfreturn Salida>

       <cfcatch>
              <cfdump var ="#cfcatch.message##cfcatch.detail#">
       </cfcatch>
</cftry>
</cffunction>



<cffunction name="guardarClientes" hint="Guardar los Clientes" output="true" returntype="any" access="remote">
<cftry>
       <cfset Servidor= CreateObject("component","generales.sistema.sqlserver")>
       <cfset Parametros= Servidor.sqlParametros(prm_sp='SaveClientes',prm_data="datasource_dicex")>

       <cfif isDefined('cli_id') and val(cli_id) gt 0> 
              <cfset Parametros['@Id'].valor = cli_id/>
       </cfif>

       <cfif isDefined('cli_nombre') and len(cli_nombre) gt 0> 
              <cfset Parametros['@nombre'].valor = trim(cli_nombre)/>
       </cfif>

       <cfif isDefined('cli_rfc') and len(cli_rfc) gt 0>
              <cfset Parametros['@rfc'].valor = trim(cli_rfc)/>
       </cfif>

       <cfif isDefined('cli_direccion') and len(cli_direccion) gt 0>
              <cfset Parametros['@direccion'].valor = trim(cli_direccion)/>
       </cfif>

       <cfif isDefined('cli_pais') and len(cli_pais) gt 0>
              <cfset Parametros['@pais'].valor = trim(cli_pais)/>
       </cfif>

       <cfif isDefined('cli_credito') and val(cli_credito) gt 0>
              <cfset Parametros['@credito'].valor = cli_credito/>
       </cfif>

       <cfif isDefined('cli_fecha') and val(cli_fecha) gt 0>
              <cfset Parametros['@fecha'].valor = cli_fecha/>
       </cfif>

       <cfif isDefined('cli_tipo_persona') and val(cli_tipo_persona) gt 0>
              <cfset Parametros['@tipo_persona'].valor = cli_tipo_persona/>
       </cfif>

       <cfif isDefined('cli_tipo_sucursal') and val(cli_tipo_sucursal) gt 0>
              <cfset Parametros['@sucursal'].valor = cli_tipo_sucursal/>
       </cfif>
                     
       <cfset Resultados = Servidor.sqlEjecucion(prm_sp = 'SaveClientes',prm_params = Parametros,prm_data="datasource_dicex")/>

       <cfset Salida['msg'] = Resultados.msg />
       <cfset Salida['error'] = Resultados.error />
       <cfset Salida['success'] = Resultados.success />
       <cfreturn Salida>

       <cfcatch>
              <cfdump var ="#cfcatch.message##cfcatch.detail#">
       </cfcatch>
</cftry>
</cffunction>



<cffunction name="eliminarClientes" hint="Eliminar los Clientes" output="true" returntype="any" access="remote">
<cftry>
       <cfset Servidor= CreateObject("component","generales.sistema.sqlserver")>
       <cfset Parametros= Servidor.sqlParametros(prm_sp='DeleteClientes',prm_data="datasource_dicex")>

       <cfif isDefined('cli_id') and val(cli_id) gt 0> 
              <cfset Parametros['@Id'].valor = cli_id/>
       </cfif>
                     
       <cfset Resultados = Servidor.sqlEjecucion(prm_sp = 'DeleteClientes',prm_params = Parametros,prm_data="datasource_dicex")/>

       <cfset Salida['msg'] = Resultados.msg />
       <cfset Salida['error'] = Resultados.error />
       <cfset Salida['success'] = Resultados.success />
       <cfreturn Salida>

       <cfcatch>
              <cfdump var ="#cfcatch.message##cfcatch.detail#">
       </cfcatch>
</cftry>
</cffunction>



<cffunction name="deshabilitarClientes" hint="Deshabilitar los Clientes" output="true" returntype="any" access="remote">
<cftry>
       <cfset Servidor= CreateObject("component","generales.sistema.sqlserver")>
       <cfset Parametros= Servidor.sqlParametros(prm_sp='DeshabilitarClientes',prm_data="datasource_dicex")>

       <cfif isDefined('cli_id') and val(cli_id) gt 0> 
              <cfset Parametros['@Id'].valor = cli_id/>
       </cfif>

       <cfif isDefined('cli_deshabilitado') and val(cli_deshabilitado) gt 0> 
              <cfset Parametros['@deshabilitado'].valor = cli_deshabilitado/>
       </cfif>
                     
       <cfset Resultados = Servidor.sqlEjecucion(prm_sp = 'DeshabilitarClientes',prm_params = Parametros,prm_data="datasource_dicex")/>

       <cfset Salida['msg'] = Resultados.msg />
       <cfset Salida['error'] = Resultados.error />
       <cfset Salida['success'] = Resultados.success />
       <cfreturn Salida>

       <cfcatch>
              <cfdump var ="#cfcatch.message##cfcatch.detail#">
       </cfcatch>
</cftry>
</cffunction>



<cffunction name="listarClientesExportar" hint="Lista de Clientes en Excel" output="true" returntype="any" access="remote">
<cftry>
       <cfset Servidor= CreateObject("component","generales.sistema.sqlserver")>
       <cfset Parametros= Servidor.sqlParametros(prm_sp='GetClientes',prm_data="datasource_dicex")>
      <!--- <cfset Ordenar = Servidor.sqlSort(sqlParams = Parametros, property = '')> --->

       <cfif isDefined('bus_nombre') and len(bus_nombre) gt 0> 
              <cfset Parametros['@nombre'].valor = trim(bus_nombre)/>
       </cfif>

       <cfif isDefined('bus_rfc') and len(bus_rfc) gt 0>
              <cfset Parametros['@rfc'].valor = trim(bus_rfc)/>
       </cfif>

       <cfif isDefined('bus_direccion') and len(bus_direccion) gt 0>
              <cfset Parametros['@direccion'].valor = trim(bus_direccion)/>
       </cfif>

       <cfif isDefined('bus_tipo_persona') and val(bus_tipo_persona) gt 0>
              <cfset Parametros['@tipo_persona'].valor = bus_tipo_persona/>
       </cfif>
       

       <cfset Resultados = Servidor.sqlEjecucion(prm_sp = 'GetClientes',prm_params = Parametros,prm_data="datasource_dicex")/>
         
<!--- <cfdump var="#Resultados#"><cfabort> --->
          <!--- <cfset Salida= {CONSULTAS=Servidor.sqlStruct(prm_query= Resultados, prm_fucase= false),NUMREGISTROS=Resultados.NUMREGISTROS}>--->
       <!--- <cfreturn Salida> --->
     

              <cfset ruta = GetTempDirectory()>
              <cfset ruta &= "RepExcel\#YEAR(Now())#\#DateFormat(Now(),"MM")#\">

              <cfif DirectoryExists(ruta) IS 0>
                     <cfdirectory action = "create" directory = "#ruta#" mode="777">
              </cfif>

              <cfset archivo = "Clientes-"&"#DateFormat(now(),'YYYYMMDD')#"&#TimeFormat(Now(),"HHmmss")#&".xls">
              <cfset pathArchivo = "#ruta##archivo#">


              <cfset arreglo_datatype = ["STRING"]>
              <cfset hoja = SpreadsheetNew()>
              <cfset spreadsheetAddRows(hoja,Resultados,1,1,true,arreglo_datatype,true)>

              <cfscript>
                     formatoEncabezado=structNew();
                     formatoEncabezado.fontsize="12";
                     formatoEncabezado.bold="true";
              </cfscript>
              
              <cfset spreadsheetFormatRow(hoja, formatoEncabezado, 1)>

              <cfspreadsheet action="write" name="hoja" filename="#pathArchivo#" overwrite="true" password="">

              <cfheader name="content-disposition" value="attachment; filename=#archivo#" />
              <cfcontent file="#pathArchivo#" />

       

       <cfcatch>
              <cfdump var ="#cfcatch.message##cfcatch.detail#">
       </cfcatch>
</cftry>
</cffunction>



<cffunction name="listarPaises" returntype="Any" access="remote">
       <cfset Servidor= CreateObject("component","generales.sistema.sqlserver")>
       <cfset Parametros= Servidor.sqlParametros(prm_sp='GetPais',prm_data="datasource_dicex")>                 
       <cfset Resultados = Servidor.sqlEjecucion(prm_sp = 'GetPais',prm_params = Parametros,prm_data="datasource_dicex")/>
       <cfset Salida = {CONSULTAS = Servidor.sqlStruct(prm_query = Resultados, prm_fucase = false)}>
       <cfreturn Salida>
</cffunction>
 
</cfcomponent>