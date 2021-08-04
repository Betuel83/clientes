SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
ALTER PROCEDURE [dbo].[UpdateClientes]

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

    Begin Tran ActualizarCliente

    Begin Try

        UPDATE
			dbo.clientes
		SET
			nombre = @nombre,
            rfc = @rfc,
            direccion = @direccion,
            pais = @pais,
            credito = @credito,
            fecha = @fecha
		WHERE
			Id = @Id

        SET @error		= 0
        SET @msg = 'El cliente se actualizo correctamente.'
        SET @success	= 1

        COMMIT TRAN ActualizarCliente

    End try
    Begin Catch

        SET @error		= 0
		SET @msg		= ERROR_MESSAGE()
		SET @success	= 1
        
        Rollback TRAN ActualizarCliente

    End Catch

    SELECT
	@error		AS error,
	@msg		AS msg,
	@success	AS success

END


GO
