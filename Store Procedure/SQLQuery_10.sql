SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
ALTER PROCEDURE [dbo].[DeshabilitarClientes]
     -- PARAMETROS DEFAULTS
    @str_json	                VARCHAR(MAX),
    @msg                        VARCHAR(100),
    @error		                SMALLINT = 0,
	@success	                TINYINT	= 0,
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
    SET NOCOUNT ON;

    Begin Tran DeshabilitarCliente

    Begin Try

    if @deshabilitado = 0 begin

    UPDATE dbo.clientes set deshabilitado=1 WHERE Id = @Id
    
    end
    else begin

    UPDATE dbo.clientes set deshabilitado=0 WHERE Id = @Id
    
    end

        SET @error		= 0
        SET @msg = 'El cliente se actualizo correctamente.'
        SET @success	= 1

    COMMIT TRAN DeshabilitarCliente

    End try
    Begin Catch

        SET @error		= 0
		SET @msg		= ERROR_MESSAGE()
		SET @success	= 1
        
    Rollback TRAN DeshabilitarCliente

    End Catch

    SELECT
	@error		AS error,
	@msg		AS msg,
	@success	AS success

END







GO
