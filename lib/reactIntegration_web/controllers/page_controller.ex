defmodule ReactIntegrationWeb.PageController do
  use ReactIntegrationWeb, :controller
  alias ReactIntegration.Todo

  def index(conn, _params) do
    tasks = Todo.list_tasks()
    render(
      conn,
      "index.html",
      props: Poison.encode!(%{tasks: tasks})
    )
  end
end
