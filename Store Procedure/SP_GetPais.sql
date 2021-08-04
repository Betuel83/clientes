SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
ALTER PROCEDURE [dbo].[GetPais]

    -- PARAMETROS DEFAULTS
	@page						INT,
	@start						INT,
	@limit						INT,
	@property					VARCHAR(200),
	@direction					CHAR(4),
    @Id                         INT,
    @pais                       VARCHAR(30)
    -- add more stored procedure parameters here

AS
BEGIN

    -- body of the stored procedure
    
    SELECT Id, pais FROM dbo.paises

END

GO
