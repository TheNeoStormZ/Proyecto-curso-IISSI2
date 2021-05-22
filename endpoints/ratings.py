from silence.decorators import endpoint

@endpoint(
    route="/ratings",
    method="GET",
    sql="SELECT * FROM ratings"
)
def get_all():
    pass

###############################################################################


@endpoint(
    route="/ratings/$photoId",
    method="GET",
    sql="SELECT * FROM ratings WHERE photoId = $photoId"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/ratings/$photoId/$userId",
    method="GET",
    sql="SELECT * FROM ratings WHERE photoId = $photoId AND userId = $userId"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO ratings (`photoId`, `userId`, `rating`) VALUES ($photoId, $userId, $rating)",
    auth_required=True,
)
def create(photoId, userId,rating):
    pass

###############################################################################

@endpoint(
    route="/ratings",
    method="PUT",
    sql="UPDATE ratings SET rating = $rating WHERE userId= $userId AND photoId = $photoId",
    auth_required=True,
)
def create(photoId, userId, rating):
    pass

###############################################################################