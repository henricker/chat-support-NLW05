import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessages1619013660816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "messages",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generated_v4()"
					},
					{
						name: "admin_id",
						type: "uuid",
						isNullable: true
					},
					{
						name: "user_id",
						type: "uuid"
					},
					{
						name: "text",
						type: "varchar"
					},
					{
						name: "created_at",
						type: "timestamps",
						default: "now()"
					}
				],
				foreignKeys: [
					{
						name: "FKUser",
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						columnNames: ["user_id"],
						onDelete: "SET NULL",
						onUpdate: "SET NULL"
					}
				]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("messages");
	}
}
