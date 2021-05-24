from silence.decorators import endpoint

@endpoint(
    route="/photos/$photoId/comments",
    method="GET",
    sql="SELECT * FROM Comments WHERE photoId = $photoId ORDER BY date ASC"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/comments/$commentId",
    method="GET",
    sql="SELECT * FROM Comments WHERE photoId = $photoId AND commentId= $commentId ORDER BY date ASC"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/comments",
    method="POST",
    sql="INSERT INTO Comments (photoId, userId, commentText) VALUES ($photoId, $userId, $commentText)"
)
def get_by_id(userId,commentText):
    pass

###############################################################################