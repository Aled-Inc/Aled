using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aled.Migrations
{
    /// <inheritdoc />
    public partial class AddQuantityToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "AppProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);
            
            migrationBuilder.Sql(
                @"
            CREATE TRIGGER UpdateProductOccurrences
            ON AppProducts
            AFTER INSERT, UPDATE
            AS
            BEGIN
                UPDATE AppProducts
                SET Quantity = (
                    SELECT COUNT(*)
                    FROM AppProducts p2
                    WHERE p2.Code = AppProducts.Code
                    AND p2.InventoryId = AppProducts.InventoryId
                )
                FROM inserted
                WHERE AppProducts.Code = inserted.Code
                AND AppProducts.InventoryId = inserted.InventoryId;
            END"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "AppProducts");
            
            migrationBuilder.Sql(
                "DROP TRIGGER IF EXISTS UpdateProductOccurrences;"
            );
        }
    }
}
