from silence.decorators import endpoint

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
    sql="UPDATE Users SET firstName = $firstName, lastName = $lastName, email = $email, username = $username, password = $password, avatarUrl=avatarUrl WHERE userId = $userId",
    description="Updates an existing user",
    auth_required=True,
)
def update(firstName, lastName, email, username, password,avatarUrl):
    pass
