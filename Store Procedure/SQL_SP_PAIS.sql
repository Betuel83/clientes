-- Create a new stored procedure called 'GetPais' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'GetPais'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.GetPais
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.GetPais
    @param1 /*parameter name*/ int /*datatype_for_param1*/ = 0, /*default_value_for_param1*/
    @param2 /*parameter name*/ int /*datatype_for_param1*/ = 0 /*default_value_for_param2*/
-- add more stored procedure parameters here
AS
BEGIN
    -- body of the stored procedure
    SELECT @param1, @param2
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.GetPais 1 /*value_for_param1*/, 2 /*value_for_param2*/
GO