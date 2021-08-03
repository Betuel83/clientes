SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
ALTER PROCEDURE [dbo].[SaveClientes]

    -- PARAMETROS DEFAULTS
    @str_json	                VARCHAR(MAX),
    @Id                         INT,
    @nombre                     VARCHAR(50),
    @rfc                        VARCHAR(25), 
    @direccion                  VARCHAR(50),
    @pais                       VARCHAR(30),
    @credito                    INT,
    @fecha                      DATETIME,
    @tipo_persona               INT,
    @sucursal                   VARCHAR(10)
    -- add more stored procedure parameters here

AS
BEGIN
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
        'Yudith',
        'DAV091987',
        'Linares',
        'Mexico',
        20,
        GETDATE(),
        1,
        'MTY'
    );
END

GO
