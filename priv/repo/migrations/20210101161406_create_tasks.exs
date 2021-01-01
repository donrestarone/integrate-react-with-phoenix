defmodule ReactIntegration.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :body, :text

      timestamps()
    end

  end
end
