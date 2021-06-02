from silence.decorators import endpoint

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM photos p  WHERE p.visibility='Public' ORDER BY date DESC"
)
def get_all():
    pass


###############################################################################
@endpoint(
    route="/photosusers",
    method="GET",
    sql="SELECT * FROM photoswithusers ORDER BY date DESC"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM Photos WHERE photoId = $photoId ORDER BY date DESC"
)
def get_by_id():
    pass

###############################################################################


@endpoint(
    route="/users/$userId/photos",
    method="GET",
    sql="SELECT * FROM Photos  p  WHERE p.visibility='Public' AND userId = $userId  ORDER BY date DESC"
)
def get_by_user_id():
    pass

###############################################################################

@endpoint(
    route="/users/$userId/myphotos",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId = $userId  ORDER BY date DESC"
)
def get_by_user_id_all():
    pass

###############################################################################

@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, url, visibility, userId) VALUES ($title, $description, $url, $visibility, $userId)",
    description="Creates a new photo",
    auth_required=True,
)
def create(title, description, url, visibility, userId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET userId=$userId, title = $title, description = $description, url = $url, visibility = $visibility WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=True,
)
def update(title, description, url, visibility,userId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass
