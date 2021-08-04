-- Create a new table called '[clientes]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[clientes]', 'U') IS NOT NULL
DROP TABLE [dbo].[clientes]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[clientes]
(
    [Id] INT NOT NULL IDENTITY (1,1) PRIMARY KEY, -- Primary Key column
    [nombre] VARCHAR(50) NOT NULL,
    [rfc] VARCHAR(25) NOT NULL,
    [direccion] VARCHAR(150) NOT NULL,
    [pais] VARCHAR(30) NOT NULL,
    [credito] INT NOT NULL,
    [fecha] DATETIME NOT NULL,
    [tipo_persona] INT NOT NULL,
    [sucursal] INT NOT NULL
    -- Specify more columns here
);
GO