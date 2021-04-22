import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettings1618927796925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "settings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "chat",
            type: "boolean",
            default: true,
          },
          {
            name: "updated_at",
            type: "timestamps",
            default: "now()",
          },
          {
            name: "created_at",
            type: "timestamps",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("settings");
	}
}
