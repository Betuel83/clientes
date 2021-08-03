SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
ALTER PROCEDURE [dbo].[SaveClientes]

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
    @sucursal                   INT
    -- add more stored procedure parameters here

AS
BEGIN

    SET NOCOUNT ON;

    Begin Tran GuardarCliente

    Begin Try

    -- body of the stored procedure
    INSERT INTO dbo.clientes(
        nombre,
        rfc,
        direccion,
        pais,
        credito,
        fecha,
        tipo_persona,
        sucursal
    )VALUES(
        @nombre,
        @rfc,
        @direccion,
        @pais,
        @credito,
        @fecha,
        @tipo_persona,
        @sucursal
    )
        
        SET @error		= 0
        SET @msg = 'El cliente se registro correctamente.'
        SET @success	= 1

        COMMIT TRAN GuardarCliente

    End try
    Begin Catch

        SET @error		= 0
		SET @msg		= ERROR_MESSAGE()
		SET @success	= 1
        
        Rollback TRAN GuardarCliente

    End Catch

    SELECT
	@error		AS error,
	@msg		AS msg,
	@success	AS success

END


GO
