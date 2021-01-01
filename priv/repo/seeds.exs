# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     ReactIntegration.Repo.insert!(%ReactIntegration.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias ReactIntegration.Todo

Enum.each(0..35, fn i -> Todo.create_task(%{body: Faker.Lorem.paragraph()})end)
