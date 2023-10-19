{ pkgs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  env = {
    PRISMA_MIGRATION_ENGINE_BINARY =
      "${pkgs.prisma-engines}/bin/migration-engine";
    PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
    PRISMA_QUERY_ENGINE_LIBRARY =
      "${pkgs.prisma-engines}/lib/libquery_engine.node";
    PRISMA_INTROSPECTION_ENGINE_BINARY =
      "${pkgs.prisma-engines}/bin/introspection-engine";
    PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
  };

  # https://devenv.sh/packages/
  packages = [ pkgs.hello pkgs.git pkgs.prisma-engines ];

  enterShell = ''
    git --version
  '';

  services.postgres = {
    enable = true;
    extensions = extensions: [ extensions.pgvector ];

    listen_addresses = "127.0.0.1";
    initialDatabases = [{ name = "postgres"; }];
    initialScript = ''
      CREATE USER postgres SUPERUSER LOGIN;
    '';
  };

  # https://devenv.sh/languages/
  languages.javascript.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";

  # See full reference at https://devenv.sh/reference/options/
}
