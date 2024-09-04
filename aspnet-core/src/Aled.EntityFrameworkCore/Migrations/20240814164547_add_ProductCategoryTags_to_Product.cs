using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aled.Migrations
{
    /// <inheritdoc />
    public partial class add_ProductCategoryTags_to_Product : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductCategoryTag",
                table: "AppProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductCategoryTag",
                table: "AppProducts");
        }
    }
}
