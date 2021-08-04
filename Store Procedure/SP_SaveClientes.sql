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
    @sucursal                   INT,
    @eliminado                  INT,
    @deshabilitado              INT
    -- add more stored procedure parameters here

AS
BEGIN

    SET NOCOUNT ON;

    Begin Tran GuardarCliente

    Begin Try

    -- body of the stored procedure
if @Id = 0 begin
    INSERT INTO dbo.clientes(
        nombre,
        rfc,
        direccion,
        pais,
        credito,
        fecha,
        tipo_persona,
        sucursal,
        eliminado,
        deshabilitado
    )VALUES(
        @nombre,
        @rfc,
        @direccion,
        @pais,
        @credito,
        @fecha,
        @tipo_persona,
        @sucursal,
        0,
        0
    )

end
else begin 

        UPDATE
			dbo.clientes
		SET
			nombre = @nombre,
            rfc = @rfc,
            direccion = @direccion,
            pais = @pais,
            credito = @credito,
            fecha = @fecha,
            tipo_persona = @tipo_persona,
            sucursal = @sucursal
		WHERE
			Id = @Id

end


        SET @error		= 0
        SET @msg = 'Datos guardados correctamente.'
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
