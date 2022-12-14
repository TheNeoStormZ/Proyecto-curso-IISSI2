###############################################################################
# Project-specific settings
###############################################################################

# Shows debug messages while Silence is running
DEBUG_ENABLED = False

#SECRET_KEY = "Change this to any random string"
SECRET_KEY = "g8vLqD2UbvQa!Su$58&jsy@GFK7"
# Database connection details
DB_CONN = {
    "host": "127.0.0.1",
    "port": 3306,
    "username": "iissi_user",
    "password": "iissi$user",
    "database": "bd2",
}

# The sequence of SQL scripts located in the sql/ folder that must
# be ran when the 'silence createdb' command is issued
SQL_SCRIPTS = [
    "create_tables.sql",
    "create_views.sql",
    "populate_database.sql",
    "restrictions.sql"
]

# The port in which the API and the web server will be deployed
HTTP_PORT = 8080

# The URL prefix for all API endpoints
API_PREFIX = "/api/v1"

# Table and fields that are used for both login and register
# Uncomment this and set up your own table and columns:

USER_AUTH_DATA = {
    "table": "Users",
    "identifier": "username",
    "password": "password",
}
