defmodule ReactIntegration.Repo do
  use Ecto.Repo,
    otp_app: :reactIntegration,
    adapter: Ecto.Adapters.Postgres
end
