SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
ALTER PROCEDURE [dbo].[GetClientes]

    -- PARAMETROS DEFAULTS
	@tipoRegistro				VARCHAR(50),
	@page						INT,
	@start						INT,
	@limit						INT,
	@property					VARCHAR(200),
	@direction					CHAR(4),
    @BRFC                       INT,
    @Id                         INT,
    @nombre                     VARCHAR(50),
    @rfc                        VARCHAR(25), 
    @direccion                  VARCHAR(150),
    @pais                       VARCHAR(30),
    @credito                    INT,
    @fecha                      DATETIME,
    @tipo_persona               INT,
    @sucursal                   INT,
    @eliminado                  INT,
    @deshabilitado              INT
    -- add more stored procedure parameters here

AS
BEGIN

    -- body of the stored procedure
    SELECT TOP (@limit) *
	FROM(
    
    SELECT c.Id as cli_id, c.deshabilitado as cli_deshabilitado, c.sucursal as cli_tipo_sucursal, c.tipo_persona as cli_tipo_persona, c.nombre as cli_nombre, c.rfc as cli_rfc, c.direccion as cli_direccion, 
    c.pais as cli_pais, c.fecha as cli_fecha, c.credito as cli_credito, COUNT(c.Id) OVER() AS NUMREGISTROS, ROW_NUMBER() OVER(ORDER BY c.nombre ASC) AS ROWID
    FROM dbo.clientes c
    WHERE c.nombre LIKE '%' + @nombre + '%' AND
    c.rfc LIKE '%' + @rfc + '%' AND
    c.direccion LIKE '%' + @direccion + '%' AND
    c.tipo_persona = @tipo_persona AND
    c.eliminado = 0

) AS TBL_RSULT
WHERE ROWID BETWEEN (@start+1) AND ((@start + @limit))

END

GO
