# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :reactIntegration,
  ecto_repos: [ReactIntegration.Repo]

# Configures the endpoint
config :reactIntegration, ReactIntegrationWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "d6JBfHrvgfPllOcC8A/+27xc2tjX7INOEdVN4veLYGuSuLEKdGY9kFBX2TFpkFJh",
  render_errors: [view: ReactIntegrationWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: ReactIntegration.PubSub,
  live_view: [signing_salt: "m1sz6Ptc"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
