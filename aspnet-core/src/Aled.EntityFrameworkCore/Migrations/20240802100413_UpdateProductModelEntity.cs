using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aled.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProductModelEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "AppProducts",
                newName: "ProductName");

            migrationBuilder.AddColumn<string>(
                name: "Allergens",
                table: "AppProducts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Brands",
                table: "AppProducts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageFrontUrl",
                table: "AppProducts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IngredientsText",
                table: "AppProducts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Allergens",
                table: "AppProducts");

            migrationBuilder.DropColumn(
                name: "Brands",
                table: "AppProducts");

            migrationBuilder.DropColumn(
                name: "ImageFrontUrl",
                table: "AppProducts");

            migrationBuilder.DropColumn(
                name: "IngredientsText",
                table: "AppProducts");

            migrationBuilder.RenameColumn(
                name: "ProductName",
                table: "AppProducts",
                newName: "Name");
        }
    }
}
