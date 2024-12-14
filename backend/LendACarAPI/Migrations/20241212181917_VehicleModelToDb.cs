using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LendACarAPI.Migrations
{
    /// <inheritdoc />
    public partial class VehicleModelToDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleModels_VehicleBrand_VehicleBrandId",
                table: "VehicleModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleBrand",
                table: "VehicleBrand");

            migrationBuilder.RenameTable(
                name: "VehicleBrand",
                newName: "VehicleBrands");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleBrands",
                table: "VehicleBrands",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleModels_VehicleBrands_VehicleBrandId",
                table: "VehicleModels",
                column: "VehicleBrandId",
                principalTable: "VehicleBrands",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleModels_VehicleBrands_VehicleBrandId",
                table: "VehicleModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleBrands",
                table: "VehicleBrands");

            migrationBuilder.RenameTable(
                name: "VehicleBrands",
                newName: "VehicleBrand");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleBrand",
                table: "VehicleBrand",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleModels_VehicleBrand_VehicleBrandId",
                table: "VehicleModels",
                column: "VehicleBrandId",
                principalTable: "VehicleBrand",
                principalColumn: "Id");
        }
    }
}
