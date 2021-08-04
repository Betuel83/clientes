SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_insert_empleado]
@nombre VARCHAR(50), 
@rfc VARCHAR(50)
AS 
INSERT INTO dbo.[clientes] ([nombre],[rfc])
VALUES ('fit', 'fit') 

EXEC [dbo].[sp_insert_empleado] 1,2
GO
