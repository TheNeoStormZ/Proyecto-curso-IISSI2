from silence.decorators import endpoint
from werkzeug.security import generate_password_hash

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)
def get_by_id():
    pass
###############################################################################

@endpoint(
   route="/users/$userId",
    method="PUT",
    sql="UPDATE Users SET firstName = $firstName, lastName = $lastName, secondSurname = $secondSurname, email = $email, username = $username, avatarUrl=avatarUrl WHERE userId = $userId",
    description="Updates an existing user",
    auth_required=True,
)
def update(firstName, lastName,secondSurname, email, username,avatarUrl):
    pass
