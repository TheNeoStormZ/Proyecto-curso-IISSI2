from silence.decorators import endpoint

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM Category"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Category (categoryName) VALUES ($categoryName)"
)
def get_by_id(categoryName):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/categories",
    method="POST",
    sql="INSERT INTO photocategories (categoryId, photoId) VALUES ($categoryId, $photoId)"
)
def add_category_photo(categoryId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/categories",
    method="GET",
    sql="SELECT * FROM photocategories WHERE photoId = $photoId"
)
def add_category_photo():
   pass

###############################################################################
@endpoint(
    route="/photos/$photoId/categories",
    method="DELETE",
    sql="DELETE FROM photocategories WHERE photoId = $photoId",
)
def add_category_photo():
   pass

###############################################################################