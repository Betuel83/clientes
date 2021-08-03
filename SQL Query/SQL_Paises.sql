-- Create a new table called '[clientes]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[paises]', 'U') IS NOT NULL
DROP TABLE [dbo].[clientes]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[paises]
(
    [Id] INT NOT NULL IDENTITY (1,1) PRIMARY KEY, -- Primary Key column
    [pais] VARCHAR(30) NOT NULL,
    [activo] INT NOT NULL
    -- Specify more columns here
);
GO