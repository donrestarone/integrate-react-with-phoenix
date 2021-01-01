defmodule ReactIntegrationWeb.Api.TaskView do
  use ReactIntegrationWeb, :view
  alias ReactIntegrationWeb.Api.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      body: task.body}
  end
end
