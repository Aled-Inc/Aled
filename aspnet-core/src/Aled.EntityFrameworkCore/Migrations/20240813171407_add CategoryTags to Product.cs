using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aled.Migrations
{
    /// <inheritdoc />
    public partial class addCategoryTagstoProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CategoryTags",
                table: "AppProducts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryTags",
                table: "AppProducts");
        }
    }
}
